import {Injectable, OnDestroy} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSAppInfrastructureManagerService} from './anyopsos-app-infrastructure-manager.service';

import {ImTreeNode} from '../types/im-tree-node';
import {ImDataObject} from '../types/im-data-object';
import {ConnectionNetapp} from '../types/connections/connection-netapp';
import {ConnectionVmware} from '../types/connections/connection-vmware';
import {ConnectionKubernetes} from '../types/connections/connection-kubernetes';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerTreeDataService implements OnDestroy {

  private destroySubject$: Subject<void> = new Subject();

  private $treeData: BehaviorSubject<ImTreeNode[]>;
  private dataStore: {  // This is where we will store our data in memory
    treeData: ImTreeNode[]
  };
  treeData: Observable<any>;

  constructor(private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
    this.dataStore = {
      treeData: []
    };

    this.$treeData = new BehaviorSubject(this.dataStore.treeData);
    this.treeData = this.$treeData.asObservable();

    // Subscribe to Connections
    this.InfrastructureManager.connections.pipe(takeUntil(this.destroySubject$)).subscribe(() => {

      // Every time a connection is modified, check if new treeData has to be emitted
      if (JSON.stringify(this.dataStore.treeData) !== JSON.stringify(this.getTreeData())) {
        this.dataStore.treeData = this.getTreeData();

        // broadcast data to subscribers if treeData has changed as well
        this.$treeData.next(Object.assign({}, this.dataStore).treeData);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  /**
   * Extract all connections data and prepares an object usable by MatTreeFlatDataSource
   */
  getTreeData(): ImTreeNode[] {
    const treeData: ImTreeNode[] = [
      {
        name: 'Virtual',
        type: 'virtual',
        uuid: 'virtual',
        info: null,
        children: []
      },
      {
        name: 'Container',
        type: 'container',
        uuid: 'container',
        info: null,
        children: []
      },
      {
        name: 'Storage',
        type: 'storage',
        uuid: 'storage',
        info: null,
        children: []
      },
      {
        name: 'Standalone',
        type: 'standalone',
        uuid: 'standalone',
        info: null,
        children: [
          {
            name: 'Linux',
            type: 'linux',
            uuid: 'linux',
            info: null,
            children: []
          },
          {
            name: 'Windows',
            type: 'windows',
            uuid: 'windows',
            info: null,
            children: []
          },
          {
            name: 'SNMP',
            type: 'snmp',
            uuid: 'snmp',
            info: null,
            children: []
          }
        ]
      }
    ];

    this.setTreeDataByType(treeData, 'vmware', 'virtual');
    this.setTreeDataByType(treeData, 'kubernetes', 'container');
    this.setTreeDataByType(treeData, 'netapp', 'storage');

    return treeData;
  }

  setTreeDataByType(treeData, connectionType: 'netapp' | 'vmware' | 'kubernetes', treeType: 'storage' | 'virtual' | 'container') {
    // Recursively for data
    const getChildren = (connection: ConnectionVmware | ConnectionKubernetes | ConnectionNetapp, current): void => {
      current.uuid = current.info.uuid;
      current.children = JSON.parse(JSON.stringify(
        connection.data.Data.filter((obj: ImDataObject) => {
          return (obj.info.parent && obj.info.parent.name === current.info.obj.name && obj.info.parent.type === current.info.obj.type) || (obj.info.data.parentVApp && obj.info.data.parentVApp.name === current.info.obj.name);
        }).sort((a, b) => a.type === 'Folder' ? -1 : 1)
      ));

      // Recursively get children
      current.children.forEach((child) => {
        getChildren(connection, child);
      });

    };

    let mainObj;

    // Set treeData
    this.InfrastructureManager.getConnectionsByType(connectionType).forEach((conObj: ConnectionVmware | ConnectionKubernetes | ConnectionNetapp, sindex: number) => {
      const name = (conObj.type === 'vmware' ? conObj.host : conObj.type === 'kubernetes' ? conObj.clusterName : conObj.type === 'netapp' ? conObj.host : '');
      const connectionObject: ImTreeNode = {
        name,
        info: {
          uuid: conObj.uuid
        },
        uuid: conObj.uuid,
        type: connectionType
      };

      // return if connection not initialized. Nothing else to look for
      if (!conObj.data.Data || conObj.data.Data.length === 0) {
        return treeData.find((obj) => {
          return obj.type === treeType;
        }).children[sindex] = connectionObject;
      }

      // Get 'new instance' of Main parent object/s and set it as Children of connection
      if (connectionType === 'vmware') {
        mainObj = conObj.data.Data.find((obj: ImDataObject) => {
          return obj.info.parent === null;
        });

        connectionObject.children = [JSON.parse(JSON.stringify(mainObj))];
        // Get all children in a loop
        getChildren(conObj, connectionObject.children[0]);
      }

      if (connectionType === 'kubernetes') {
        mainObj = conObj.data.Data.filter((obj: ImDataObject) => {
          return obj.info.parent === null;
        }).sort((a, b) => a.type === 'Folder' ? -1 : 1);

        connectionObject.children = JSON.parse(JSON.stringify(mainObj));
        connectionObject.children.forEach((obj: ImDataObject) => {

          // Get all children in a loop
          getChildren(conObj, obj);
        });
      }

      if (connectionType === 'netapp') {
        mainObj = conObj.data.Data.filter((obj: ImDataObject) => {
          return obj.type === 'vserver';
        });

        connectionObject.children = JSON.parse(JSON.stringify(mainObj));
        connectionObject.children.forEach((obj: ImDataObject) => {

          // Get all children in a loop
          getChildren(conObj, obj);
        });
      }

      // Set final results for Storage connection
      return treeData.find((obj) => {
        return obj.type === treeType;
      }).children[sindex] = connectionObject;
    });
  }
}

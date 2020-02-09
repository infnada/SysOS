import {Injectable, OnDestroy, OnInit} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelpersService} from '@anyopsos/lib-vmware';
import {AnyOpsOSLibNetappHelpersService} from '@anyopsos/lib-netapp';
import {AnyOpsOSLibDockerHelpersService} from '@anyopsos/lib-docker';
import {AnyOpsOSLibKubernetesHelpersService} from '@anyopsos/lib-kubernetes';
import {AnyOpsOSLibLinuxHelpersService} from '@anyopsos/lib-linux';
import {AnyOpsOSLibSnmpHelpersService} from '@anyopsos/lib-snmp';
import {ConnectionTypes} from '@anyopsos/backend/app/types/connection-types';
import {DataObject} from '@anyopsos/backend/app/types/data-object';

import {AnyOpsOSAppInfrastructureManagerService} from './anyopsos-app-infrastructure-manager.service';
import {ImTreeNode} from '../types/im-tree-node';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerTreeDataService implements OnDestroy, OnInit {
  private readonly destroySubject$: Subject<void> = new Subject();

  private readonly $treeData: BehaviorSubject<ImTreeNode[]>;
  private dataStore: {  // This is where we will store our data in memory
    treeData: ImTreeNode[]
  };
  readonly treeData: Observable<ImTreeNode[]>;

  constructor(private readonly LibVmwareHelpers: AnyOpsOSLibVmwareHelpersService,
              private readonly LibNetappHelpers: AnyOpsOSLibNetappHelpersService,
              private readonly LibDockerHelpers: AnyOpsOSLibDockerHelpersService,
              private readonly LibKubernetesHelpers: AnyOpsOSLibKubernetesHelpersService,
              private readonly LibSnmpHelpers: AnyOpsOSLibSnmpHelpersService,
              private readonly LibLinuxHelpers: AnyOpsOSLibLinuxHelpersService,

              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
    this.dataStore = { treeData: [] };

    this.$treeData = new BehaviorSubject(this.dataStore.treeData);
    this.treeData = this.$treeData.asObservable();
  }

  ngOnInit(): void {

    // Listen for connections changes
    this.LibVmwareHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibNetappHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibDockerHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibKubernetesHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibSnmpHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibLinuxHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  /**
   * Set new tree data if needed
   */
  private async onConnectionsChange() {
    // Every time a connection is modified, check if new treeData has to be emitted
    if (JSON.stringify(this.dataStore.treeData) !== JSON.stringify(this.getTreeData())) {
      this.dataStore.treeData = await this.getTreeData();

      // broadcast data to subscribers if treeData has changed as well
      this.$treeData.next(Object.assign({}, this.dataStore).treeData);
    }
  }

  /**
   * Extract all connections data and prepares an object usable by MatTreeFlatDataSource
   */
  async getTreeData(): Promise<ImTreeNode[]> {
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

    await this.setTreeDataByType(treeData, 'vmware', 'virtual');
    await this.setTreeDataByType(treeData, 'kubernetes', 'container');
    await this.setTreeDataByType(treeData, 'netapp', 'storage');

    return treeData;
  }

  async setTreeDataByType(treeData, connectionType: 'netapp' | 'vmware' | 'kubernetes', treeType: 'storage' | 'virtual' | 'container'): Promise<void> {
    // Recursively for data
    const getChildren = (connection: ConnectionTypes, current): void => {
      current.uuid = current.info.uuid;
      current.children = JSON.parse(JSON.stringify(
        connection.data.Data.filter((obj: DataObject) => {
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
    const connections: ConnectionTypes[] = await this.InfrastructureManager.getConnectionsByType(connectionType);
    connections.forEach((conObj: ConnectionTypes, sindex: number) => {
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
        mainObj = conObj.data.Data.find((obj: DataObject) => {
          return obj.info.parent === null;
        });

        connectionObject.children = [JSON.parse(JSON.stringify(mainObj))];
        // Get all children in a loop
        getChildren(conObj, connectionObject.children[0]);
      }

      if (connectionType === 'kubernetes') {
        mainObj = conObj.data.Data.filter((obj: DataObject) => {
          return obj.info.parent === null;
        }).sort((a, b) => a.type === 'Folder' ? -1 : 1);

        connectionObject.children = JSON.parse(JSON.stringify(mainObj));
        connectionObject.children.forEach((obj: DataObject) => {

          // Get all children in a loop
          getChildren(conObj, obj);
        });
      }

      if (connectionType === 'netapp') {
        mainObj = conObj.data.Data.filter((obj: DataObject) => {
          return obj.type === 'vserver';
        });

        connectionObject.children = JSON.parse(JSON.stringify(mainObj));
        connectionObject.children.forEach((obj: DataObject) => {

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

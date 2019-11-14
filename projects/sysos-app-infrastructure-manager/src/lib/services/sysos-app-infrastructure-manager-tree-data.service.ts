import {Injectable, OnDestroy} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';

import {ImTreeNode} from '../types/im-tree-node';
import {ImConnection} from '../types/im-connection';
import {ImDataObject} from '../types/im-data-object';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureManagerTreeDataService implements OnDestroy {

  private destroySubject$: Subject<void> = new Subject();

  private $treeData: BehaviorSubject<ImTreeNode[]>;
  private dataStore: {  // This is where we will store our data in memory
    treeData: ImTreeNode[]
  };
  treeData: Observable<any>;

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService) {
    this.dataStore = {
      treeData: []
    };

    this.$treeData = new BehaviorSubject([]) as BehaviorSubject<ImTreeNode[]>;
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
        name: 'Storage',
        type: 'storage',
        info: null,
        children: []
      },
      {
        name: 'Virtual',
        type: 'virtual',
        info: null,
        children: []
      },
      {
        name: 'Standalone',
        type: 'standalone',
        info: null,
        children: [
          {
            name: 'Linux',
            type: 'linux',
            info: null,
            children: []
          },
          {
            name: 'Windows',
            type: 'windows',
            info: null,
            children: []
          },
          {
            name: 'SNMP',
            type: 'snmp',
            info: null,
            children: []
          }
        ]
      }
    ];

    // Recursively for data
    const getChildren = (connection: ImConnection, current): void => {
      current.children = JSON.parse(JSON.stringify(
        connection.data.Data.filter(obj => {
          return obj.info.parent && obj.info.parent.name === current.info.obj.name || obj.info.data.parentVApp && obj.info.data.parentVApp.name === current.info.obj.name;
        })
      ));

      // Recursively get children
      current.children.forEach((child) => {
        getChildren(connection, child);
      });

    };

    // Set treeData for storage
    this.InfrastructureManager.getConnectionsByType('netapp').forEach((storage, sindex) => {
      const storageObject: ImTreeNode = {
        name: storage.host,
        info: {
          uuid: storage.uuid
        },
        type: 'netapp'
      };

      // return if Storage connection not initialized. Nothing else to look for
      if (!storage.data.Data || storage.data.Data.length === 0) {
        return treeData.find((obj) => {
          return obj.type === 'storage';
        }).children[sindex] = storageObject;
      }

      // Get 'new instance' of Main parent object/s and set it as Children of Storage connection
      const mainObj = storage.data.Data.filter((obj: ImDataObject) => {
        return obj.type === 'vserver';
      });
      storageObject.children = JSON.parse(JSON.stringify(mainObj));

      storageObject.children.forEach((obj: ImDataObject) => {

        // Get all children in a loop
        getChildren(storage, obj);
      });

      // Set final results for Storage connection
      return treeData.find((obj) => {
        return obj.type === 'storage';
      }).children[sindex] = storageObject;
    });

    // Set treeData for virtual
    this.InfrastructureManager.getConnectionsByType('vmware').forEach((virtual, vindex) => {
      const virtualObject: ImTreeNode = {
        name: virtual.host,
        info: {
          uuid: virtual.uuid
        },
        type: 'vmware'
      };

      // return if Virtual connection not initialized. Nothing else to look for
      if (!virtual.data.Data || virtual.data.Data.length === 0) {
        return treeData.find((obj) => {
          return obj.type === 'virtual';
        }).children[vindex] = virtualObject;
      }

      // Get 'new instance' of Main parent object and set it as Children of Virtual connection
      const mainObj = virtual.data.Data.find((obj: ImDataObject) => {
        return obj.info.parent === null;
      });
      virtualObject.children = [JSON.parse(JSON.stringify(mainObj))];

      // Get all children in a loop
      getChildren(virtual, virtualObject.children[0]);

      // Set final results for Virtual connection
      return treeData.find((obj) => {
        return obj.type === 'virtual';
      }).children[vindex] = virtualObject;
    });

    return treeData;
  }
}

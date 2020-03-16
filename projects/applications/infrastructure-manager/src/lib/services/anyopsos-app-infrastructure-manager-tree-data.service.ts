import {Injectable, OnDestroy} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibNodeHelpersService} from '@anyopsos/lib-node';
import {AnyOpsOSLibNodeVmwareHelpersService} from '@anyopsos/lib-node-vmware';
import {AnyOpsOSLibNodeNetappHelpersService} from '@anyopsos/lib-node-netapp';
import {AnyOpsOSLibNodeDockerHelpersService} from '@anyopsos/lib-node-docker';
import {AnyOpsOSLibNodeKubernetesHelpersService} from '@anyopsos/lib-node-kubernetes';
import {AnyOpsOSLibNodeLinuxHelpersService} from '@anyopsos/lib-node-linux';
import {AnyOpsOSLibNodeSnmpHelpersService} from '@anyopsos/lib-node-snmp';
import {ConnectionTypes} from '@anyopsos/backend-core/app/types/connection-types';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {AnyOpsOSAppInfrastructureManagerService} from './anyopsos-app-infrastructure-manager.service';
import {ImTreeNode} from '../types/im-tree-node';


/**
 * This is a One Time Service. Make sure only one component loads it.
 */
@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerTreeDataService implements OnDestroy {
  private readonly destroySubject$: Subject<void> = new Subject();

  private readonly $treeData: BehaviorSubject<ImTreeNode[]>;
  private dataStore: {  // This is where we will store our data in memory
    treeData: ImTreeNode[]
  };
  readonly treeData: Observable<ImTreeNode[]>;

  constructor(private readonly LibNodeHelpers: AnyOpsOSLibNodeHelpersService,
              private readonly LibNodeVmwareHelpers: AnyOpsOSLibNodeVmwareHelpersService,
              private readonly LibNodeNetappHelpers: AnyOpsOSLibNodeNetappHelpersService,
              private readonly LibNodeDockerHelpers: AnyOpsOSLibNodeDockerHelpersService,
              private readonly LibNodeKubernetesHelpers: AnyOpsOSLibNodeKubernetesHelpersService,
              private readonly LibNodeSnmpHelpers: AnyOpsOSLibNodeSnmpHelpersService,
              private readonly LibNodeLinuxHelpers: AnyOpsOSLibNodeLinuxHelpersService,

              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
    this.dataStore = { treeData: [] };

    this.$treeData = new BehaviorSubject(this.dataStore.treeData);
    this.treeData = this.$treeData.asObservable();

    // Init connections for 1st time
    this.onConnectionsChange();

    // Listen for connections changes
    this.LibNodeVmwareHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibNodeNetappHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibNodeDockerHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibNodeKubernetesHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibNodeSnmpHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());
    this.LibNodeLinuxHelpers.getAllConnectionsObserver().pipe(takeUntil(this.destroySubject$)).subscribe(() => this.onConnectionsChange());

  }

  ngOnDestroy(): void {

    console.log('destroy');

    // Remove all listeners
    this.destroySubject$.next();
  }

  /**
   * Set new tree data if needed
   */
  private onConnectionsChange(): void {
    this.InfrastructureManager.connectionsUpdated();

    // Every time a connection is modified, check if new treeData has to be emitted
    const newTreeData: ImTreeNode[] = this.getTreeData();

    console.log(newTreeData);

    if (JSON.stringify(this.dataStore.treeData) !== JSON.stringify(newTreeData)) {
      this.dataStore.treeData = newTreeData;

      // broadcast data to subscribers if treeData has changed as well
      this.$treeData.next(Object.assign({}, this.dataStore).treeData);
    }
  }

  /**
   * Extract all connections data and prepares an object usable by MatTreeFlatDataSource
   */
  private getTreeData(): ImTreeNode[] {
    const treeData: ImTreeNode[] = [
      {
        name: 'Virtual',
        type: 'virtual',
        info: {
          uuid: 'virtual',
          obj: {
            type: 'root',
            name: 'root-virtual'
          },
          parent: null,
          data: null
        },
        children: []
      },
      {
        name: 'Container',
        type: 'container',
        info: {
          uuid: 'container',
          obj: {
            type: 'root',
            name: 'root-container'
          },
          parent: null,
          data: null
        },
        children: []
      },
      {
        name: 'Storage',
        type: 'storage',
        info: {
          uuid: 'storage',
          obj: {
            type: 'root',
            name: 'root-storage'
          },
          parent: null,
          data: null
        },
        children: []
      },
      {
        name: 'Standalone',
        type: 'standalone',
        info: {
          uuid: 'standalone',
          obj: {
            type: 'root',
            name: 'root-standalone'
          },
          parent: null,
          data: null
        },
        children: [
          {
            name: 'Linux',
            type: 'linux',
            info: {
              uuid: 'linux',
              obj: {
                type: 'root',
                name: 'root-linux'
              },
              parent: null,
              data: null
            },
            children: []
          },
          {
            name: 'Windows',
            type: 'windows',
            info: {
              uuid: 'windows',
              obj: {
                type: 'root',
                name: 'root-windows'
              },
              parent: null,
              data: null
            },
            children: []
          },
          {
            name: 'SNMP',
            type: 'snmp',
            info: {
              uuid: 'snmp',
              obj: {
                type: 'root',
                name: 'root-snmp'
              },
              parent: null,
              data: null
            },
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

  private setTreeDataByType(treeData: ImTreeNode[], connectionType: ConnectionTypes['type'], treeType: 'storage' | 'virtual' | 'container'): void {

    // Recursively for data
    const getChildren = (connection: ConnectionTypes, current: ImTreeNode): void => {

      current.children = JSON.parse(JSON.stringify(
        connection.data.Data.filter((obj: DataObject) => {

          return (
            obj.info.parent &&
            obj.info.parent.name === current.info.obj.name &&
            obj.info.parent.type === current.info.obj.type
          ) || (

            // VMWare specific
            obj.info.data.parentVApp &&
            obj.info.data.parentVApp.name === current.info.obj.name
          );

        }).sort((a, b) => a.type === 'Folder' ? -1 : 1)
      ));

      // Recursively get children
      current.children
        .forEach((child: DataObject) => getChildren(connection, child));

    };

    let mainObj;

    // Set treeData
    const connections: ConnectionTypes[] = this.LibNodeHelpers.getConnectionsByType(connectionType);
    connections.forEach((conObj: ConnectionTypes, cindex: number) => {
      const name = (conObj.type === 'vmware' ? conObj.host : conObj.type === 'kubernetes' ? conObj.clusterName : conObj.type === 'netapp' ? conObj.host : '');
      const connectionObject: ImTreeNode = {
        name,
        type: connectionType,
        info: {
          uuid: conObj.uuid,
          obj: {
            type: conObj.type,
            name: conObj.description
          },
          parent: null,
          data: null
        }
      };

      // return if connection not initialized. Nothing else to look for
      if (!conObj.data.Data || conObj.data.Data.length === 0) {
        return treeData
          .find((obj) => obj.type === treeType).children[cindex] = connectionObject;
      }

      // Get 'new instance' of Main parent object/s and set it as Children of connection
      if (connectionType === 'vmware') {
        mainObj = conObj.data.Data
          .find((obj: DataObject) => obj.info.parent === null);

        // Make a copy of the DataObject
        connectionObject.children = [JSON.parse(JSON.stringify(mainObj))];

        // Get all children in a loop
        getChildren(conObj, connectionObject.children[0]);
      }

      if (connectionType === 'kubernetes') {
        mainObj = conObj.data.Data
          .filter((obj: DataObject) => obj.info.parent === null)
          .sort((a, b) => a.type === 'Folder' ? -1 : 1);

        // Make a copy of the DataObject
        connectionObject.children = JSON.parse(JSON.stringify(mainObj));

        // Get all children in a loop
        connectionObject.children
          .forEach((obj: DataObject) => getChildren(conObj, obj));
      }

      if (connectionType === 'netapp') {
        mainObj = conObj.data.Data
          .filter((obj: DataObject) => obj.type === 'vserver');

        // Make a copy of the DataObject
        connectionObject.children = JSON.parse(JSON.stringify(mainObj));

        // Get all children in a loop
        connectionObject.children.forEach((obj: DataObject) => getChildren(conObj, obj));
      }

      // Set final results for Storage connection
      return treeData
        .find((obj: ImTreeNode) => obj.type === treeType).children[cindex] = connectionObject;
    });
  }
}

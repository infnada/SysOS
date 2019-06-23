import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatMenuTrigger} from '@angular/material';

import {Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';

import {SysosLibsApplicationService, Application} from '@sysos/libs-application';
import {ContextMenuItem} from '@sysos/libs-types';

import {SysosAppInfrastructureManagerService} from '../services/sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureNetappService} from '../services/sysos-app-infrastructure-netapp.service';
import {SysosAppInfrastructureVmwareService} from '../services/sysos-app-infrastructure-vmware.service';
import {IMConnection} from '../types/imconnection';
import {IMNode} from '../types/imnode';

interface InfrastructureManagerFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  type: string;
}


@Component({
  selector: 'saim-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenuTree: MatMenuTrigger;
  @Input() application: Application;

  private connectGetDataSubscription: Subscription;

  activeConnection: string;

  viewSide: boolean = true;
  contextMenuPosition = {x: '0px', y: '0px'};
  svContextMenu: ContextMenuItem[];
  volumeContextMenu: ContextMenuItem[];
  snapshotContextMenu: ContextMenuItem[];
  VMContextMenu: ContextMenuItem[];
  datastoreContextMenu: ContextMenuItem[];

  treeControl = new FlatTreeControl<InfrastructureManagerFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: InfrastructureManagerFlatNode) => node.expandable;

  constructor(private logger: NGXLogger,
              private Applications: SysosLibsApplicationService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureManagerNetApp: SysosAppInfrastructureNetappService,
              private InfrastructureManagerVMWare: SysosAppInfrastructureVmwareService) {

    /**
     * @description Required to avoid circular dependency
     * @link{SysosAppInfrastructureManagerService#getObserverConnectGetData}
     */
    this.connectGetDataSubscription = this.InfrastructureManager.getObserverConnectGetData().subscribe((connection) => {
      if (connection.type === 'netapp') this.InfrastructureManagerNetApp.getNetAppData(connection);
      if (connection.type === 'vmware') this.InfrastructureManagerVMWare.getVMWareData(connection);
    });

  }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.subscribe(activeConnection => this.activeConnection = activeConnection);
    this.InfrastructureManager.treeData.subscribe(data => {
      this.dataSource.data = data;
    });

    this.svContextMenu = [
      {
        id: 0, text: '<i class="fa fa-pencil"></i> Edit Connection', action: (node: IMNode) => {
          console.log(node);
          this.InfrastructureManager.editConnection(node.data.uuid);
        }
      },
      {
        id: 1, text: '<i class="fa fa-refresh"></i> Rescan', action: (node: IMNode) => {
          this.InfrastructureManager.refreshConnection(node.data.uuid);
        }
      },
      {
        id: 2, text: '<i class="fa fa-trash text-danger"></i> Delete Connection', action: (node: IMNode) => {
          this.InfrastructureManager.deleteConnection(node.data.uuid);
        }
      }
    ];

    this.volumeContextMenu = [
      {
        id: 1, text: '<i class="fa fa-file"></i> Show datastore files', action: (node: IMNode) => {
          this.openDatastoreBrowser(node.data.uuid, node.data.datastore);
        }
      },
      {
        id: 2, text: '<i class="fa fa-database"></i> Create Storage Snapshot', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.createStorageSnapShot(node.data.uuid, node.data.volume);
        }
      },
      {id: 3, text: 'divider'},
      {
        id: 4, text: '<i class="fa fa-file"></i> Rescan Volume', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.getVolumeData(node.data.uuid, node.data.volume);
        }
      }
    ];

    this.snapshotContextMenu = [
      {
        id: 0, text: '<i class="fa fa-database"></i> Mount as Datastore', action: (node: IMNode) => {
          /*
          $log.debug('Infrastructure Manager [%s] -> Ask for mount storage snapshot into a datastore -> snapshot [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

            smanagerFactory.setActiveConnection($itemScope.snapshot['snapshot-instance-uuid']);

            // Wait for next digest circle before continue
            $timeout(function () {
                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                    {
                        title: function () {
                            return 'Mount Snapshot as Datastore';
                        },
                        text: function () {
                            return 'Do you want to mount the Storage Snapshot to an ESXi host?';
                        }
                    }
                );
                modalInstance.result.then(function (res) {

                    if (res !== true) return;
                    ApplicationsFactory.openApplication('backupsm').then(function () {

                        // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                        $timeout(function () {
                            ApplicationsFactory.toggleApplication('backupsm');

                            $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for mounting storage snapshot into a datastore ->
                            snapshot [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

                            var snapshots = _this.getActiveConnection(1).snapshots;
                            if (!Array.isArray(snapshots)) snapshots = [snapshots];

                            $rootScope.$broadcast('backupsm__mount_restore_datastore', {
                                storage: _this.getActiveConnection(3),
                                vserver: _this.getActiveConnection(2),
                                volume: _this.getActiveConnection(1),
                                snapshots: snapshots,
                                snapshot: $itemScope.snapshot['snapshot-instance-uuid'],
                                ESXihosts: smanagerFactory.getESXihosts()
                            });
                        }, 0, false);
                    });
                });
            }, 0, false);
          */
        }
      },
      {
        id: 1, text: '<i class="fa fa-file"></i> Restore Datastore files', action: (node: IMNode) => {
          /*
          $log.debug('Infrastructure Manager [%s] -> Ask for mount storage snapshot into a datastore to restore files -> snapshot [%s]',
          $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

            smanagerFactory.setActiveConnection($itemScope.snapshot['snapshot-instance-uuid']);

            // Wait for next digest circle before continue
            $timeout(function () {
                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                    {
                        title: function () {
                            return 'Restore Datastore Files';
                        },
                        text: function () {
                            return 'Do you want to mount the Storage Snapshot to an ESXi host and restore datastore files?';
                        }
                    }
                );
                modalInstance.result.then(function (res) {

                    if (res !== true) return;
                    ApplicationsFactory.openApplication('backupsm').then(function () {

                        // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                        $timeout(function () {
                            ApplicationsFactory.toggleApplication('backupsm');

                            $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for restoring a volume files -> snapshot [%s]',
                            $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

                            var snapshots = _this.getActiveConnection(1).snapshots;
                            if (!Array.isArray(snapshots)) snapshots = [snapshots];

                            $rootScope.$broadcast('backupsm__restore_datastore_files', {
                                storage: _this.getActiveConnection(3),
                                vserver: _this.getActiveConnection(2),
                                volume: _this.getActiveConnection(1),
                                snapshots: snapshots,
                                snapshot: $itemScope.snapshot['snapshot-instance-uuid'],
                                ESXihosts: smanagerFactory.getESXihosts()
                            });
                        }, 0, false);
                    });
                });
            }, 0, false);
           */
        }
      },
      {
        id: 2, text: '<i class="fa fa-trash"></i> Delete Storage SnapShot', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.deleteStorageSnapShot(node.data.uuid, node.data.volume, node.data.snapshot);
        }
      }
    ];

    this.VMContextMenu = [
      {
        id: 0, text: '<i class="fa fa-power-off"></i> Power', subMenu: (): ContextMenuItem[] => {
          return [
            {
              id: 0,
              text: '<i class="fa fa-play text-success"></i> Power On',
              action: (node: IMNode) => {
                this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data.vm, 'powerOn');
              }
            },
            {
              id: 1,
              text: '<i class="fa fa-stop text-danger"></i> Power Off',
              action: (node: IMNode) => {
                this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data.vm, 'powerOff');
              }
            },
            {
              id: 2,
              text: '<i class="fa fa-pause text-warning"></i> Suspend',
              action: (node: IMNode) => {
                this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data.vm, 'suspend');
              }
            },
            {
              id: 4,
              text: '<i class="fa fa-refresh"></i> Reset',
              action: (node: IMNode) => {
                this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data.vm, 'reset');
              }
            },
            {id: 5, text: 'divider'},
            {
              id: 6,
              text: '<i class="fa fa-stop text-danger"></i> Shut Down Guest OS',
              action: (node: IMNode) => {
                this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data.vm, 'powerOffGuestOS');
              }
            },
            {
              id: 7,
              text: '<i class="fa fa-refresh"></i> Restart Guest OS',
              action: (node: IMNode) => {
                this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data.vm, 'restartGuestOS');
              }
            },
          ];
        }
      },
      {
        id: 1, text: '<i class="fa fa-television"></i> Open Remote Console', action: (node: IMNode) => {
          this.openRemoteConsole(node.data.uuid, node.data.vm);
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 3, text: '<i class="fa fa-server"></i> Restore', subMenu: (): ContextMenuItem[] => {
          return [
            {
              id: 0,
              text: '<i class="fa fa-server"></i> Instant VM',
              action: (node: IMNode) => {

              }
            },
            {
              id: 1,
              text: '<i class="fa fa-server"></i> Restore entire VM',
              action: (node: IMNode) => {

              }
            },
            {
              id: 2,
              text: '<i class="fa fa-server"></i> Restore Guest Files',
              action: (node: IMNode) => {

              }
            }
          ];
        }
      },
      {
        id: 4, text: '<i class="fa fa-server"></i> Backup', action: (node: IMNode) => {

        }
      },
      {id: 5, text: 'divider'},
      {
        id: 6, text: '<i class="fa fa-refresh"></i> Refresh', action: (node: IMNode) => {
          this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data.vm, 'refresh');
        }
      },
    ];

    this.datastoreContextMenu = [
      {
        id: 0, text: '<i class="fa fa-file"></i> Show datastore files', action: (node: IMNode) => {
          this.openDatastoreBrowser(node.data.uuid, node.data.datastore);
        }
      }
    ];
  }

  private transformer(node: IMNode, level: number)  {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      data: node.data,
      level
    };
  }

  /**
   * ContextMenu
   */
  treeContextMenuItems(item: IMNode) {
    if (item.type === 'netapp' || item.type === 'vmware') return this.svContextMenu;
    if (item.type === 'volume') return this.volumeContextMenu;
    if (item.type === 'snapshot') return this.snapshotContextMenu;
    if (item.type === 'VirtualMachine') return this.VMContextMenu;
  }

  onTreeContextMenu(event: MouseEvent, node: IMNode): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuTree.menuData = { item: node };
    this.contextMenuTree.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem): boolean {
    if (item.disabled) return item.disabled();
    return false;
  }

  contextToText(item: ContextMenuItem, file?: any): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }
  // End contextMenu

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: IMConnection): void {
    this.InfrastructureManager.setActiveConnection(connection.uuid);
  }

  getActiveConnection(): IMConnection {
    return this.InfrastructureManager.getActiveConnection();
  }

  openRemoteConsole(connectionUuid, vm): void {
    this.logger.debug('Infrastructure Manager [%s] -> Opening Remote Console APP -> vm [%s]', vm.vm, vm.name);

    this.Applications.openApplication('wmks', {
      data: {
        vm: vm.vm,
        credential: this.InfrastructureManager.getConnectionByUuid(connectionUuid).credential,
        host: this.InfrastructureManager.getConnectionByUuid(connectionUuid).host,
        port: this.InfrastructureManager.getConnectionByUuid(connectionUuid).port
      }
    });
  }

  openDatastoreBrowser(connectionUuid, datastore) {
    this.logger.debug('Infrastructure Manager [%s] -> Opening Remote Console APP -> datastore [%s]', datastore.uuid, datastore.name);

    this.Applications.openApplication('wmks', {
      data: {
        uuid: datastore.uuid,
        name: datastore.name,
        credential: this.InfrastructureManager.getConnectionByUuid(connectionUuid).credential,
        host: this.InfrastructureManager.getConnectionByUuid(connectionUuid).host,
        port: this.InfrastructureManager.getConnectionByUuid(connectionUuid).port
      }
    });
  }
}

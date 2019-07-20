import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatMenuTrigger} from '@angular/material';

import {Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';

import {SysosLibApplicationService, Application} from '@sysos/lib-application';
import {ContextMenuItem} from '@sysos/lib-types';

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
  volumeSnapshotContextMenu: ContextMenuItem[];
  volumeVMSnapshotContextMenu: ContextMenuItem[];
  VMContextMenu: ContextMenuItem[];
  datastoreContextMenu: ContextMenuItem[];

  treeControl = new FlatTreeControl<InfrastructureManagerFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: InfrastructureManagerFlatNode) => node.expandable;

  constructor(private logger: NGXLogger,
              private Applications: SysosLibApplicationService,
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
      this.treeControl.expandAll();
    });

    // Storage & Virtual
    this.svContextMenu = [
      {
        id: 0, text: '<i class="fa fa-pencil"></i> Edit Connection', action: (node: IMNode) => {
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
          this.openDatastoreExplorer(node.data.uuid, 'netapp', {
            volume: node.data.volume
          });
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

    this.volumeSnapshotContextMenu = [
      {
        id: 0, text: '<i class="fa fa-database"></i> Mount as Datastore', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.mountSnapShotAsDatastore(node.data.uuid, node.data.vserver, node.data.volume, node.data.snapshot);
        }
      },
      {
        id: 1, text: '<i class="fa fa-file"></i> Restore Volume files', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.restoreVolumeFiles(node.data.uuid, node.data.vserver, node.data.volume, node.data.snapshot);
        }
      },
      {
        id: 2, text: '<i class="fa fa-trash"></i> Delete Storage SnapShot', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.deleteStorageSnapShot(node.data.uuid, node.data.volume, node.data.snapshot);
        }
      }
    ];

    this.volumeVMSnapshotContextMenu = [
      {
        id: 0, text: '<i class="fa fa-server"></i> Instant VM', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.instantVM(node.data.uuid, null, node.data.vserver, node.data.volume, node.data.snapshot, node.data);
        }
      },
      {
        id: 1, text: '<i class="fa fa-server"></i> Restore entire VM', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.restoreVM(node.data.uuid, null, node.data.vserver, node.data.volume, node.data.snapshot, node.data);
        }
      },
      {
        id: 2, text: '<i class="fa fa-files"></i> Restore Guest files', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.restoreGuestFiles(node.data.uuid, node.data.vserver, node.data.volume, node.data.snapshot, node.data);
        }
      }
    ];

    this.VMContextMenu = [
      {
        id: 0, text: '<i class="fa fa-power-off"></i> Power', subMenu: [
          {
            id: 0,
            text: '<i class="fa fa-play text-success"></i> Power On',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data, 'powerOn');
            }
          },
          {
            id: 1,
            text: '<i class="fa fa-stop text-danger"></i> Power Off',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data, 'powerOff');
            }
          },
          {
            id: 2,
            text: '<i class="fa fa-pause text-warning"></i> Suspend',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data, 'suspend');
            }
          },
          {
            id: 4,
            text: '<i class="fa fa-refresh"></i> Reset',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data, 'reset');
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 6,
            text: '<i class="fa fa-stop text-danger"></i> Shut Down Guest OS',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data, 'powerOffGuestOS');
            }
          },
          {
            id: 7,
            text: '<i class="fa fa-refresh"></i> Restart Guest OS',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data, 'restartGuestOS');
            }
          }
        ]
      },
      {
        id: 1, text: '<i class="fa fa-television"></i> Open Remote Console', action: (node: IMNode) => {
          this.openRemoteConsole(node.data.uuid, node.data);
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 3, text: '<i class="fa fa-server"></i> Restore', subMenu: [
          {
            id: 0,
            text: '<i class="fa fa-server"></i> Instant VM',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.instantVM(node.data.uuid, node.data);
            }
          },
          {
            id: 1,
            text: '<i class="fa fa-server"></i> Restore entire VM',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.restoreVM(node.data.uuid, node.data);
            }
          },
          {
            id: 2,
            text: '<i class="fa fa-server"></i> Restore Guest Files',
            action: (node: IMNode) => {
              this.InfrastructureManagerNetApp.restoreGuestFiles(node.data.uuid, node.data.vserver, node.data.volume, node.data.snapshot, node.data);
            }
          }
        ]
      },
      {
        id: 4, text: '<i class="fa fa-server"></i> Backup', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.backupVM(node.data.uuid, node.data);
        }
      },
      {id: 5, text: 'divider'},
      {
        id: 6, text: '<i class="fa fa-refresh"></i> Refresh', action: (node: IMNode) => {
          this.InfrastructureManagerVMWare.doWithVM(node.data.uuid, node.data, 'refresh');
        }
      },
    ];

    this.datastoreContextMenu = [
      {
        id: 0, text: '<i class="fa fa-file"></i> Show datastore files', action: (node: IMNode) => {
          this.openDatastoreExplorer(node.data.uuid, 'vmware', {
            datastore: node.data.datastore
          });
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
    if (item.type === 'snapshot') return this.volumeSnapshotContextMenu;
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
      vm: vm.vm,
      credential: this.InfrastructureManager.getConnectionByUuid(connectionUuid).credential,
      host: this.InfrastructureManager.getConnectionByUuid(connectionUuid).host,
      port: this.InfrastructureManager.getConnectionByUuid(connectionUuid).port
    });
  }

  openDatastoreExplorer(connectionUuid, type, data) {
    this.logger.debug('Infrastructure Manager [%s] -> Opening Datastore Explorer APP -> datastore [%s]', connectionUuid, type);

    this.Applications.openApplication('datastore-explorer', {
      credential: this.InfrastructureManager.getConnectionByUuid(connectionUuid).credential,
      host: this.InfrastructureManager.getConnectionByUuid(connectionUuid).host,
      port: this.InfrastructureManager.getConnectionByUuid(connectionUuid).port,
      data,
      type
    });
  }
}

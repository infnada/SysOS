import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSAppInfrastructureManagerService} from './anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureNetappService} from './netapp/anyopsos-app-infrastructure-netapp.service';
import {AnyOpsOSAppInfrastructureVmwareService} from './vmware/anyopsos-app-infrastructure-vmware.service';
import {AnyOpsOSAppInfrastructureNetappBackupService} from './netapp/anyopsos-app-infrastructure-netapp-backup.service';
import {AnyOpsOSAppInfrastructureVmwareBackupService} from './vmware/anyopsos-app-infrastructure-vmware-backup.service';
import {AnyOpsOSAppInfrastructureNetappNodeActionsService} from './netapp/anyopsos-app-infrastructure-netapp-node-actions.service';
import {AnyOpsOSAppInfrastructureVmwareNodeActionsService} from './vmware/anyopsos-app-infrastructure-vmware-node-actions.service';

import {ImTreeNode} from '../types/im-tree-node';
import {ConnectionVmware} from '../types/connections/connection-vmware';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerContextMenusService {

  constructor(private logger: AnyOpsOSLibLoggerService,
              private Applications: AnyOpsOSLibApplicationService,
              private Modal: AnyOpsOSLibModalService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerNetApp: AnyOpsOSAppInfrastructureNetappService,
              private InfrastructureManagerVMWare: AnyOpsOSAppInfrastructureVmwareService,
              private InfrastructureManagerNetAppBackup: AnyOpsOSAppInfrastructureNetappBackupService,
              private InfrastructureManagerVMWareBackup: AnyOpsOSAppInfrastructureVmwareBackupService,
              private InfrastructureManagerNetappNodeActions: AnyOpsOSAppInfrastructureNetappNodeActionsService,
              private InfrastructureManagerVMWareNodeActions: AnyOpsOSAppInfrastructureVmwareNodeActionsService) {
  }

  // Kubernetes
  get kubernetesContextMenu() {
    return [
      {
        id: 0, text: '<i class="fas fa-pencil"></i> Edit ImConnection', action: (node: ImTreeNode) => {
          this.InfrastructureManager.editConnection(node.info.uuid);
        }
      },
      {
        id: 1, text: '<i class="fas fa-sync-alt"></i> Rescan', action: (node: ImTreeNode) => {
          this.InfrastructureManager.refreshConnection(node.info.uuid);
        }
      },
      {
        id: 2, text: '<i class="fas fa-trash text-danger"></i> Delete ImConnection', action: (node: ImTreeNode) => {
          this.InfrastructureManager.deleteConnection(node.info.uuid);
        }
      }
    ];
  }

  // Storage
  get netappContextMenu() {
    return [
      {
        id: 0, text: '<i class="fas fa-pencil"></i> Edit ImConnection', action: (node: ImTreeNode) => {
          this.InfrastructureManager.editConnection(node.info.uuid);
        }
      },
      {
        id: 1, text: '<i class="fas fa-sync-alt"></i> Rescan', action: (node: ImTreeNode) => {
          this.InfrastructureManager.refreshConnection(node.info.uuid);
        }
      },
      {
        id: 2, text: '<i class="fas fa-trash text-danger"></i> Delete ImConnection', action: (node: ImTreeNode) => {
          this.InfrastructureManager.deleteConnection(node.info.uuid);
        }
      }
    ];
  }

  get volumeContextMenu() {
    return [
      {
        id: 1, text: '<i class="fas fa-file"></i> Show datastore files', action: (node: ImTreeNode) => {
          this.openDatastoreExplorer(node.info.uuid, 'netapp', {
            volume: node.info.volume
          });
        }
      },
      {
        id: 1, text: '<i class="fas fa-file"></i> Restore Volume files', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetAppBackup.restoreVolumeFiles(node);
        }
      },
      {
        id: 2, text: '<i class="fas fa-database"></i> Create Storage Snapshot', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetappNodeActions.createStorageSnapShot(node);
        }
      },
      {id: 3, text: 'divider'},
      {
        id: 4, text: '<i class="fas fa-file"></i> Rescan Volume', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetApp.getVolumeData(node);
        }
      }
    ];
  }

  get volumeSnapshotContextMenu() {
    return [
      {
        id: 0, text: '<i class="fas fa-database"></i> Mount as Datastore', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetAppBackup.mountSnapShotAsDatastore(node);
        }
      },
      {
        id: 1, text: '<i class="fas fa-file"></i> Restore Volume files', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetAppBackup.restoreVolumeFiles(node);
        }
      },
      {
        id: 2, text: '<i class="fas fa-trash"></i> Delete Storage SnapShot', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetappNodeActions.deleteStorageSnapShot(node);
        }
      }
    ];
  }

  get volumeVMSnapshotContextMenu() {
    return [
      {
        id: 0, text: '<i class="fas fa-server"></i> Instant VM', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetAppBackup.instantVM(node, node);
        }
      },
      {
        id: 1, text: '<i class="fas fa-server"></i> Restore entire VM', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetAppBackup.restoreVM(node, node);
        }
      },
      {
        id: 2, text: '<i class="fas fa-file-import"></i> Restore Guest files', action: (node: ImTreeNode) => {
          this.InfrastructureManagerNetAppBackup.restoreGuestFiles(node, node);
        }
      }
    ];
  }

  get vmwareContextMenu() {
    return [
      {
        id: 0, text: '<i class="fas fa-pencil"></i> Edit ImConnection', action: (node: ImTreeNode) => {
          this.InfrastructureManager.editConnection(node.info.uuid);
        }
      },
      {
        id: 1, text: '<i class="fas fa-sync-alt"></i> Rescan', action: (node: ImTreeNode) => {
          this.InfrastructureManager.refreshConnection(node.info.uuid);
        }
      },
      {
        id: 2, text: '<i class="fas fa-trash text-danger"></i> Delete ImConnection', action: (node: ImTreeNode) => {
          this.InfrastructureManager.deleteConnection(node.info.uuid);
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: '<i class="vs-icon vsphere-icon-datacenter"></i> New Datacenter...',
        action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-datacenter', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 1, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Distributed Switch', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon network-lib-ui-icon-dvPortGroupNew"></i> New Distributed Port Group...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-distributed-port-group', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Export System Logs...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-export-system-logs', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: '<i class="vs-icon vsphere-icon-assign_license"></i> Assign License...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-assign-license', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Check Compliance',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remediation-pre-check', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      }
    ];
  }

  get folderDatacenterContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-datacenter"></i> New Datacenter...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-datacenter', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> Rename', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Check Compliance',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remediation-pre-check', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      }
    ];
  }

  get folderDatastoreContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vx-icon-new-ds-cluster"></i> New Datastore Cluster...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-datastore-cluster', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon storage-ui-icon-create-datastore"></i> New Datastore...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-datastore', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> Rename', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: ImTreeNode) => {
        }
      }
    ];
  }

  get folderVMContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-virtual-machine', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-deploy-ovf-template', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> Rename', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Upgrade VMware Tools to Match Host',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Upgrade VM Hardware to Match Host',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
    ];
  }

  get folderNetworkContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon network-lib-ui-icon-dvsNew"></i> New Distributed Switch...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-distributes-switch', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Import Distributed Switch...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-import-distributes-switch', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> Rename', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: ImTreeNode) => {
        }
      }
    ];
  }

  get datacenterContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-Add_Host"></i> Add Host...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vx-icon-new-cluster"></i> New Cluster...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-cluster', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-folder-add"></i> New Host and Cluster Folder...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-folder-add"></i> New Network Folder...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-folder-add"></i> New Storage Folder...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-folder-add"></i> New VM and Template Folder...', action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'Distributed Switch', subMenu: [
          {
            id: 0, text: '<i class="vs-icon network-lib-ui-icon-dvsNew"></i> New Distributed Switch...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-distributed-switch', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0, text: '<i class="vs-icon network-lib-ui-icon-dvPortGroupNew"></i> New Distributed Port Group...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-distributed-port-group', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0, text: 'Import Distributed Switch...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-import-distributed-switch', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
        ]
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-virtual-machine', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-deploy-ovf-template', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Storage', subMenu: [
          {
            id: 0, text: '<i class="vs-icon storage-ui-icon-create-datastore"></i> New Datastore', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-datastore', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-new-ds-cluster"></i> New Datastore Cluster...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-datastore-cluster', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-rescan-storage"></i> Rescan Storage...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-rescan-storage', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Edit Default VM Compatibility...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-edit-default-vm-compatibility', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon network-lib-ui-icon-vmMigrate"></i> Migrate VMs to Another Network...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-migrate-vms-another-network', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Rename...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vx-icon-removeIcon"></i> Delete', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Check Compliance',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remediation-pre-check', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      }
    ];
  }

  get VMContextMenu() {
    return [
      {
        id: 0, text: '<i class="fas fa-power-off text-primary"></i> Power', subMenu: [
          {
            id: 0,
            text: '<i class="fas fa-play text-success"></i> Power On',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareNodeActions.doWithVM(node.info.mainUuid, node, 'powerOn');
            },
            disabled: (node: ImTreeNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOn';
            }
          },
          {
            id: 1,
            text: '<i class="fas fa-stop text-danger"></i> Power Off',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareNodeActions.doWithVM(node.info.mainUuid, node, 'powerOff');
            },
            disabled: (node: ImTreeNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOff';
            }
          },
          {
            id: 2,
            text: '<i class="fas fa-pause text-warning"></i> Suspend',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareNodeActions.doWithVM(node.info.mainUuid, node, 'suspend');
            },
            disabled: (node: ImTreeNode) => {
              return node.info.data['runtime.powerState'] === 'suspended';
            }
          },
          {
            id: 4,
            text: '<i class="fas fa-sync-alt"></i> Reset',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareNodeActions.doWithVM(node.info.mainUuid, node, 'reset');
            },
            disabled: (node: ImTreeNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOff';
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 6,
            text: '<i class="fas fa-stop text-danger"></i> Shut Down Guest OS',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareNodeActions.doWithVM(node.info.mainUuid, node, 'powerOffGuestOS');
            },
            disabled: (node: ImTreeNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOff';
            }
          },
          {
            id: 7,
            text: '<i class="fas fa-sync-alt"></i> Restart Guest OS',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareNodeActions.doWithVM(node.info.mainUuid, node, 'restartGuestOS');
            },
            disabled: (node: ImTreeNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOff';
            }
          }
        ]
      },
      {
        id: 0, text: 'Guest OS', subMenu: [
          {
            id: 0,
            text: 'Answer Question...',
            action: (node: ImTreeNode) => {
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 0,
            text: 'Install VMware Tools...',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Upgrade VMware Tools...',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Unmount VMware Tools Installer',
            action: (node: ImTreeNode) => {
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 0,
            text: 'Customize Guest OS',
            action: (node: ImTreeNode) => {
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 0,
            text: 'Guest User Mappings',
            action: (node: ImTreeNode) => {
            }
          },
        ]
      },
      {
        id: 0, text: 'Snapshots', subMenu: [
          {
            id: 0,
            text: 'Take Snapshot...',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Manage Snapshots',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Revert to Latest Snapshot',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Consolidate',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Delete All Snapshots',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {
        id: 1, text: '<i class="fas fa-television text-primary"></i> Open Remote Console', action: (node: ImTreeNode) => {
          this.openRemoteConsole(node.info.mainUuid, node.info);
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Migrate...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Clone', subMenu: [
          {
            id: 0,
            text: 'Clone to Virtual Machine...',
            action: (node: ImTreeNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Clone to Template',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Clone as Template to Library...',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Fault Tolerance', subMenu: [
          {
            id: 0,
            text: 'Turn On Fault Tolerance',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Turn Off Fault Tolerance',
            action: (node: ImTreeNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Resume Fault Tolerance',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Suspend Fault Tolerance',
            action: (node: ImTreeNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Migrate Secondary...',
            action: (node: ImTreeNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Test Failover',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Test Restart Secondary',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'VM Policies', subMenu: [
          {
            id: 0,
            text: 'Edit VM Storage Policies...',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Check VM Storage Policy Compliance',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Reapply VM Storage Policy',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Templates', subMenu: [
          {
            id: 0,
            text: 'Convert to Template',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Export OVF Template',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'Compatibility', subMenu: [
          {
            id: 0,
            text: 'Upgrade VM Compatibility...',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Schedule VM Compatibility Upgrade...',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Cancel Schedule VM Upgrade',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Export System Logs...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-export-system-logs', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Edit Settings...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Move to folder...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 1, text: 'Rename...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 1, text: 'Edit Notes...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Remove from Inventory', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 1, text: 'Delete from Disk', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Upgrade VMware Tools to Match Host',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Upgrade VM Hardware to Match Host',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'vSAN', subMenu: [
          {
            id: 0,
            text: 'No actions available',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 3, text: '<i class="fas fa-server text-primary"></i> Restore', subMenu: [
          {
            id: 0,
            text: '<i class="fas fa-server"></i> Instant VM',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareBackup.instantVM(node);
            }
          },
          {
            id: 1,
            text: '<i class="fas fa-server"></i> Restore entire VM',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareBackup.restoreVM(node);
            }
          },
          {
            id: 2,
            text: '<i class="fas fa-server"></i> Restore Guest Files',
            action: (node: ImTreeNode) => {
              this.InfrastructureManagerVMWareBackup.restoreGuestFiles(node);
            }
          }
        ]
      },
      {
        id: 4, text: '<i class="fas fa-server text-primary"></i> Backup', action: (node: ImTreeNode) => {
          this.InfrastructureManagerVMWareBackup.backupVM(node);
        }
      },
      {id: 5, text: 'divider'},
      {
        id: 6, text: '<i class="fas fa-sync-alt text-primary"></i> Refresh', action: (node: ImTreeNode) => {
          this.InfrastructureManagerVMWareNodeActions.doWithVM(node.info.mainUuid, node, 'refresh');
        }
      },
    ];
  }

  get datastoreContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-virtual-machine', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="fas fa-file"></i> Browse Files', action: (node: ImTreeNode) => {
          console.log(node);
          this.openDatastoreExplorer(node.info.mainUuid, 'vmware', {
            datastore: node
          });
        }
      },
      {
        id: 0, text: 'Register VM...', action: (node: ImTreeNode) => {
          this.openDatastoreExplorer(node.info.mainUuid, 'vmware', {
            datastore: node
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Configure Storage I/O Control...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Refresh Capacity Information', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Maintenance Mode', subMenu: [
          {
            id: 0,
            text: 'Enter Maintenance Mode',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Exit Maintenance Mode',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Rename...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Mount Datastore to Additional Hosts...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Unmount Datastore...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
    ];
  }

  get datastoreClusterContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-virtual-machine', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="fas fa-file"></i> Browse Files', action: (node: ImTreeNode) => {
          console.log(node);
          this.openDatastoreExplorer(node.info.mainUuid, 'vmware', {
            datastore: node
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Rename...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vx-icon-removeIcon"></i> Delete', action: (node: ImTreeNode) => {
        }
      },
    ];
  }

  get clusterComputeResourceContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-Add_Host"></i> Add Hosts...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-virtual-machine', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vx-icon-rpNew"></i> New Resource Pool...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template....', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-deploy-ovf-template', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vapp-add"></i> New vApp...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Storage', subMenu: [
          {
            id: 0, text: '<i class="vs-icon storage-ui-icon-create-datastore"></i> New Datastore...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-datastore', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-rescan-storage"></i> Rescan Storage...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-rescan-storage', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Host Profiles', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile_association"></i> Attach Host Profile...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile_association"></i> Change Host Profile...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-remediate"></i> Remediate...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-detach_host_profile"></i> Detach', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-hostCompliance"></i> Check Host Profile Compliance', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-export_host_customizations"></i> Export Host Customizations...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-edit_host_customizations"></i> Edit Host Customizations...', action: (node: ImTreeNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Edit Default VM Compatibility...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-edit-default-vm-compatibility', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-assign_license"></i> Assign License...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-assign-license', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Settings', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Rename...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vx-icon-removeIcon"></i> Delete', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Check Compliance',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remediation-pre-check', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {
        id: 0, text: 'vSAN', subMenu: [
          {
            id: 0,
            text: 'Configure...',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      }
    ];
  }

  get hostSystemContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-virtual-machine', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-deploy-ovf-template', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vx-icon-rpNew"></i> New Resource Pool...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vapp-add"></i> New vApp...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Maintenance Mode', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Maintenance_Mode_Enter"></i> Enter Maintenance Mode', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Maintenance_Mode_Exit"></i> Exit Maintenance Mode', action: (node: ImTreeNode) => {
            }
          },
        ]
      },
      {
        id: 0, text: 'Connection', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Connect"></i> Connect', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Disconnect"></i> Disconnect', action: (node: ImTreeNode) => {
            }
          },
        ]
      },
      {
        id: 0, text: 'Power', subMenu: [
          {
            id: 0, text: '<i class="vs-icon host-ui-icon-poweron"></i> Power On', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon host-ui-icon-standby"></i> Enter Standby Mode', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon host-ui-icon-shutdown"></i> Shut Down', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Reboot"></i> Reboot', action: (node: ImTreeNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Certificates', subMenu: [
          {
            id: 0, text: '<i class="vs-icon host-ui-icon-renewCertificate"></i> Renew Certificate', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: 'Refresh CA Certificates', action: (node: ImTreeNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Storage', subMenu: [
          {
            id: 0, text: '<i class="vs-icon storage-ui-icon-create-datastore"></i> New Datastore...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-datastore', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-rescan-storage"></i> Rescan Storage...', action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-rescan-storage', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon network-lib-ui-icon-networkAdd"></i> Add Networking...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Host Profiles', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile"></i> Extract Host Profile...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile_association"></i> Attach Host Profile...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile_association"></i> Change Host Profile...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-remediate"></i> Remediate...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-detach_host_profile"></i> Detach Host Profile', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-hostCompliance"></i> Check Host Profile Compliance', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: 'Reset Host Customizations', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-export_host_customizations"></i> Export Host Customizations...', action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-edit_host_customizations"></i> Edit Host Customizations...', action: (node: ImTreeNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Export System Logs...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-export-system-logs', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Reconfigure for vSphere HA', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-assign_license"></i> Assign License...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-assign-license', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Settings', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Check Compliance',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remediation-pre-check', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      }
    ];
  }

  get resourcePoolContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-new-virtual-machine', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-deploy-ovf-template', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: '<i class="vs-icon vx-icon-rpNew"></i> New Resource Pool...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vapp-add"></i> New vApp...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Edit Resource Settings...', action: (node: ImTreeNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Rename', action: (node: ImTreeNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-assign-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-remove-tag', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-edit-custom-attributes', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: ImTreeNode) => {
          this.Modal.openRegisteredModal('infrastructure-manager-add-permission', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
            modalInstance.result.then(() => {

            });
          });
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: ImTreeNode) => {
              this.Modal.openRegisteredModal('infrastructure-manager-new-alarm-definition', '.window--infrastructure-manager .window__main', {}).then((modalInstance) => {
                modalInstance.result.then(() => {

                });
              });
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: ImTreeNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vx-icon-removeIcon"></i> Delete', action: (node: ImTreeNode) => {
        }
      }
    ];
  }

  private openRemoteConsole(connectionUuid: string, vm: any): void {
    this.logger.debug('Infrastructure Manager', 'Opening Remote Console APP', arguments);

    const connection: ConnectionVmware = this.InfrastructureManager.getConnectionByUuid(connectionUuid) as ConnectionVmware;

    this.Applications.openApplication('wmks', {
      connectionUuid,
      vm: vm.vm,
      credential: connection.credential,
      host: connection.host,
      port: connection.port
    });
  }

  private openDatastoreExplorer(connectionUuid: string, type: 'vmware' | 'netapp', data: any): void {
    this.logger.debug('Infrastructure Manager', 'Opening Datastore Explorer APP', arguments);

    this.Applications.openApplication('datastore-explorer', {
      connectionUuid,
      data,
      type
    });
  }
}

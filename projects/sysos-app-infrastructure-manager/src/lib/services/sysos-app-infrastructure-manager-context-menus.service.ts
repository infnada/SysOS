import {Injectable} from '@angular/core';

import {NGXLogger} from 'ngx-logger';

import {SysosLibApplicationService} from '@sysos/lib-application';

import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureNetappService} from './sysos-app-infrastructure-netapp.service';
import {SysosAppInfrastructureVmwareService} from './sysos-app-infrastructure-vmware.service';
import {IMNode} from '../types/imnode';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureManagerContextMenusService {

  constructor(private logger: NGXLogger,
              private Applications: SysosLibApplicationService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureManagerNetApp: SysosAppInfrastructureNetappService,
              private InfrastructureManagerVMWare: SysosAppInfrastructureVmwareService) {
  }

  // Storage & Virtual
  get svContextMenu() {
    return [
      {
        id: 0, text: '<i class="fa fa-pencil"></i> Edit Connection', action: (node: IMNode) => {
          this.InfrastructureManager.editConnection(node.info.uuid);
        }
      },
      {
        id: 1, text: '<i class="fa fa-refresh"></i> Rescan', action: (node: IMNode) => {
          this.InfrastructureManager.refreshConnection(node.info.uuid);
        }
      },
      {
        id: 2, text: '<i class="fa fa-trash text-danger"></i> Delete Connection', action: (node: IMNode) => {
          this.InfrastructureManager.deleteConnection(node.info.uuid);
        }
      }
    ];
  }

  get volumeContextMenu() {
    return [
      {
        id: 1, text: '<i class="fa fa-file"></i> Show datastore files', action: (node: IMNode) => {
          this.openDatastoreExplorer(node.info.uuid, 'netapp', {
            volume: node.info.volume
          });
        }
      },
      {
        id: 2, text: '<i class="fa fa-database"></i> Create Storage Snapshot', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.createStorageSnapShot(node.info.uuid, node.info.volume);
        }
      },
      {id: 3, text: 'divider'},
      {
        id: 4, text: '<i class="fa fa-file"></i> Rescan Volume', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.getVolumeData(node.info.uuid, node.info.volume);
        }
      }
    ];
  }

  get volumeSnapshotContextMenu() {
    return [
      {
        id: 0, text: '<i class="fa fa-database"></i> Mount as Datastore', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.mountSnapShotAsDatastore(node.info.uuid, node.info.vserver, node.info.volume, node.info.snapshot);
        }
      },
      {
        id: 1, text: '<i class="fa fa-file"></i> Restore Volume files', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.restoreVolumeFiles(node.info.uuid, node.info.vserver, node.info.volume, node.info.snapshot);
        }
      },
      {
        id: 2, text: '<i class="fa fa-trash"></i> Delete Storage SnapShot', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.deleteStorageSnapShot(node.info.uuid, node.info.volume, node.info.snapshot);
        }
      }
    ];
  }

  get volumeVMSnapshotContextMenu() {
    return [
      {
        id: 0, text: '<i class="fa fa-server"></i> Instant VM', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.instantVM(node.info.uuid, null, node.info.vserver, node.info.volume, node.info.snapshot, node.info);
        }
      },
      {
        id: 1, text: '<i class="fa fa-server"></i> Restore entire VM', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.restoreVM(node.info.uuid, null, node.info.vserver, node.info.volume, node.info.snapshot, node.info);
        }
      },
      {
        id: 2, text: '<i class="fa fa-files"></i> Restore Guest files', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.restoreGuestFiles(node.info.uuid, node.info.vserver, node.info.volume, node.info.snapshot, node.info);
        }
      }
    ];
  }

  get vmwareContextMenu() {
    return [
      {
        id: 0, text: '<i class="fa fa-pencil"></i> Edit Connection', action: (node: IMNode) => {
          this.InfrastructureManager.editConnection(node.info.uuid);
        }
      },
      {
        id: 1, text: '<i class="fa fa-refresh"></i> Rescan', action: (node: IMNode) => {
          this.InfrastructureManager.refreshConnection(node.info.uuid);
        }
      },
      {
        id: 2, text: '<i class="fa fa-trash text-danger"></i> Delete Connection', action: (node: IMNode) => {
          this.InfrastructureManager.deleteConnection(node.info.uuid);
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: '<i class="vs-icon vsphere-icon-datacenter"></i> New Datacenter...', action: (node: IMNode) => {
        }
      },
      {
        id: 1, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Distributed Switch', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon network-lib-ui-icon-dvPortGroupNew"></i> New Distributed Port Group...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Export System Logs...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: '<i class="vs-icon vsphere-icon-assign_license"></i> Assign License...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Add Permission...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
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
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: IMNode) => {
            }
          }
        ]
      }
    ];
  }

  get folderDatacenterContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-datacenter"></i> New Datacenter...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> Rename', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
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
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Check Compliance',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: IMNode) => {
            }
          }
        ]
      }
    ];
  }

  get folderDatastoreContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vx-icon-new-ds-cluster"></i> New Datastore Cluster...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon storage-ui-icon-create-datastore"></i> New Datastore...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> ', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: IMNode) => {
        }
      }
    ];
  }

  get folderVMContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> Rename', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Upgrade VMware Tools to Match Host',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Upgrade VM Hardware to Match Host',
            action: (node: IMNode) => {
            }
          }
        ]
      },
    ];
  }

  get folderNetworkContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon network-lib-ui-icon-dvsNew"></i> New Distributed Switch...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Import Distributed Switch...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> Rename', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: IMNode) => {
        }
      }
    ];
  }

  get datacenterContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-Add_Host"></i> Add Host...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vx-icon-new-cluster"></i> New Cluster...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-folder"></i> New Folder', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-folder-add"></i> New Host and Cluster Folder...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-folder-add"></i> New Network Folder...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-folder-add"></i> New Storage Folder...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-folder-add"></i> New VM and Template Folder...', action: (node: IMNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'Distributed Switch', subMenu: [
          {
            id: 0, text: '<i class="vs-icon network-lib-ui-icon-dvsNew"></i> New Distributed Switch...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon network-lib-ui-icon-dvPortGroupNew"></i> New Distributed Port Group...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: 'Import Distributed Switch...', action: (node: IMNode) => {
            }
          },
        ]
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Storage', subMenu: [
          {
            id: 0, text: '<i class="vs-icon storage-ui-icon-create-datastore"></i> New Datastore', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-new-ds-cluster"></i> New Datastore Cluster...', action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-rescan-storage"></i> Rescan Storage...', action: (node: IMNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Edit Default VM Compatibility...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon network-lib-ui-icon-vmMigrate"></i> Migrate VMs to Another Network...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Rename...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permission...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vx-icon-removeIcon"></i> Delete', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Check Compliance',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: IMNode) => {
            }
          }
        ]
      }
    ];
  }

  get VMContextMenu() {
    return [
      {
        id: 0, text: '<i class="fa fa-power-off text-primary"></i> Power', subMenu: [
          {
            id: 0,
            text: '<i class="fa fa-play text-success"></i> Power On',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.info.uuid, node, 'powerOn');
            },
            disabled: (node: IMNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOn';
            }
          },
          {
            id: 1,
            text: '<i class="fa fa-stop text-danger"></i> Power Off',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.info.uuid, node, 'powerOff');
            },
            disabled: (node: IMNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOff';
            }
          },
          {
            id: 2,
            text: '<i class="fa fa-pause text-warning"></i> Suspend',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.info.uuid, node, 'suspend');
            },
            disabled: (node: IMNode) => {
              return node.info.data['runtime.powerState'] === 'suspended';
            }
          },
          {
            id: 4,
            text: '<i class="fa fa-refresh"></i> Reset',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.info.uuid, node, 'reset');
            },
            disabled: (node: IMNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOff';
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 6,
            text: '<i class="fa fa-stop text-danger"></i> Shut Down Guest OS',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.info.uuid, node, 'powerOffGuestOS');
            },
            disabled: (node: IMNode) => {
              return node.info.data['runtime.powerState'] === 'poweredOff';
            }
          },
          {
            id: 7,
            text: '<i class="fa fa-refresh"></i> Restart Guest OS',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.doWithVM(node.info.uuid, node, 'restartGuestOS');
            },
            disabled: (node: IMNode) => {
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
            action: (node: IMNode) => {
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 0,
            text: 'Install VMware Tools...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Upgrade VMware Tools...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Unmount VMware Tools Installer',
            action: (node: IMNode) => {
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 0,
            text: 'Customize Guest OS',
            action: (node: IMNode) => {
            }
          },
          {id: 5, text: 'divider'},
          {
            id: 0,
            text: 'Guest User Mappings',
            action: (node: IMNode) => {
            }
          },
        ]
      },
      {
        id: 0, text: 'Snapshots', subMenu: [
          {
            id: 0,
            text: 'Take Snapshot...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Manage Snapshots',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Revert to Latest Snapshot',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Consolidate',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Delete All Snapshots',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {
        id: 1, text: '<i class="fa fa-television text-primary"></i> Open Remote Console', action: (node: IMNode) => {
          this.openRemoteConsole(node.info.uuid, node.info);
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Migrate...', action: (node: IMNode) => {
          this.openRemoteConsole(node.info.uuid, node.info);
        }
      },
      {
        id: 0, text: 'Clone', subMenu: [
          {
            id: 0,
            text: 'Clone to Virtual Machine...',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Clone to Template',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Clone as Template to Library...',
            action: (node: IMNode) => {
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
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Turn Off Fault Tolerance',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Resume Fault Tolerance',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Suspend Fault Tolerance',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Migrate Secondary...',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Test Failover',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Test Restart Secondary',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'VM Policies', subMenu: [
          {
            id: 0,
            text: 'Edit VM Storage Policies...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Check VM Storage Policy Compliance',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Reapply VM Storage Policy',
            action: (node: IMNode) => {
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
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Export OVF Template',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'Compatibility', subMenu: [
          {
            id: 0,
            text: 'Upgrade VM Compatibility...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Schedule VM Compatibility Upgrade...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Cancel Schedule VM Upgrade',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Export System Logs...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Edit Settings...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Move to folder...', action: (node: IMNode) => {
        }
      },
      {
        id: 1, text: 'Rename...', action: (node: IMNode) => {
        }
      },
      {
        id: 1, text: 'Edit Notes...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Add Permission...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 1, text: 'Remove from Inventory', action: (node: IMNode) => {
        }
      },
      {
        id: 1, text: 'Delete from Disk', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Upgrade VMware Tools to Match Host',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Upgrade VM Hardware to Match Host',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'vSAN', subMenu: [
          {
            id: 0,
            text: 'No actions available',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 3, text: '<i class="fa fa-server text-primary"></i> Restore', subMenu: [
          {
            id: 0,
            text: '<i class="fa fa-server"></i> Instant VM',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.instantVM(node.info.uuid, node);
            }
          },
          {
            id: 1,
            text: '<i class="fa fa-server"></i> Restore entire VM',
            action: (node: IMNode) => {
              this.InfrastructureManagerVMWare.restoreVM(node.info.uuid, node);
            }
          },
          {
            id: 2,
            text: '<i class="fa fa-server"></i> Restore Guest Files',
            action: (node: IMNode) => {
              this.InfrastructureManagerNetApp.restoreGuestFiles(node.info.uuid, node.info.vserver, node.info.volume, node.info.snapshot, node.info);
            }
          }
        ]
      },
      {
        id: 4, text: '<i class="fa fa-server text-primary"></i> Backup', action: (node: IMNode) => {
          this.InfrastructureManagerNetApp.backupVM(node.info.uuid, node.info);
        }
      },
      {id: 5, text: 'divider'},
      {
        id: 6, text: '<i class="fa fa-refresh text-primary"></i> Refresh', action: (node: IMNode) => {
          this.InfrastructureManagerVMWare.doWithVM(node.info.uuid, node, 'refresh');
        }
      },
    ];
  }

  get datastoreContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="fa fa-file"></i> Browse Files', action: (node: IMNode) => {
          console.log(node);
          this.openDatastoreExplorer(node.info.uuid, 'vmware', {
            datastore: node
          });
        }
      },
      {
        id: 0, text: 'Register VM...', action: (node: IMNode) => {
          this.openDatastoreExplorer(node.info.uuid, 'vmware', {
            datastore: node
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Configure Storage I/O Control...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Refresh Capacity Information', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Maintenance Mode', subMenu: [
          {
            id: 0,
            text: 'Enter Maintenance Mode',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Exit Maintenance Mode',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Rename...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Mount Datastore to Additional Hosts...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Unmount Datastore...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permissions...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
    ];
  }

  get datastoreClusterContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="fa fa-file"></i> Browse Files', action: (node: IMNode) => {
          console.log(node);
          this.openDatastoreExplorer(node.info.uuid, 'vmware', {
            datastore: node
          });
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Rename...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permissions...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vx-icon-removeIcon"></i> Delete', action: (node: IMNode) => {
        }
      },
    ];
  }

  get clusterComputeResourceContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-Add_Host"></i> Add Hosts...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vx-icon-rpNew"></i> New Resource Pool...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template....', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vapp-add"></i> New vApp...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Storage', subMenu: [
          {
            id: 0, text: '<i class="vs-icon storage-ui-icon-create-datastore"></i> New Datastore...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-rescan-storage"></i> Rescan Storage...', action: (node: IMNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Host Profiles', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile_association"></i> Attach Host Profile...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile_association"></i> Change Host Profile...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-remediate"></i> Remediate...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-detach_host_profile"></i> Detach', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-hostCompliance"></i> Check Host Profile Compliance', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-export_host_customizations"></i> Export Host Customizations...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-edit_host_customizations"></i> Edit Host Customizations...', action: (node: IMNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Edit Default VM Compatibility...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-assign_license"></i> Assign License...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Settings', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Rename...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permissions...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vx-icon-removeIcon"></i> Delete', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Update Manager', subMenu: [
          {
            id: 0,
            text: 'Check Compliance',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {
        id: 0, text: 'vSAN', subMenu: [
          {
            id: 0,
            text: 'Configure...',
            action: (node: IMNode) => {
            }
          }
        ]
      }
    ];
  }

  get hostSystemContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vx-icon-rpNew"></i> New Resource Pool...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vapp-add"></i> New vApp...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Maintenance Mode', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Maintenance_Mode_Enter"></i> Enter Maintenance Mode', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Maintenance_Mode_Exit"></i> Exit Maintenance Mode', action: (node: IMNode) => {
            }
          },
        ]
      },
      {
        id: 0, text: 'Connection', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Connect"></i> Connect', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Disconnect"></i> Disconnect', action: (node: IMNode) => {
            }
          },
        ]
      },
      {
        id: 0, text: 'Power', subMenu: [
          {
            id: 0, text: '<i class="vs-icon host-ui-icon-poweron"></i> Power On', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon host-ui-icon-standby"></i> Enter Standby Mode', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon host-ui-icon-shutdown"></i> Shut Down', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-Host_Reboot"></i> Reboot', action: (node: IMNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Certificates', subMenu: [
          {
            id: 0, text: '<i class="vs-icon host-ui-icon-renewCertificate"></i> Renew Certificate', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: 'Refresh CA Certificates', action: (node: IMNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Storage', subMenu: [
          {
            id: 0, text: '<i class="vs-icon storage-ui-icon-create-datastore"></i> New Datastore...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vsphere-icon-rescan-storage"></i> Rescan Storage...', action: (node: IMNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon network-lib-ui-icon-networkAdd"></i> Add Networking...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Host Profiles', subMenu: [
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile"></i> Extract Host Profile...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile_association"></i> Attach Host Profile...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-host_profile_association"></i> Change Host Profile...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-remediate"></i> Remediate...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-detach_host_profile"></i> Detach Host Profile', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-hostCompliance"></i> Check Host Profile Compliance', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: 'Reset Host Customizations', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon hostprofile-ui-icon-export_host_customizations"></i> Export Host Customizations...', action: (node: IMNode) => {
            }
          },
          {
            id: 0, text: '<i class="vs-icon vx-icon-edit_host_customizations"></i> Edit Host Customizations...', action: (node: IMNode) => {
            }
          },
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Export System Logs...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Reconfigure for vSphere HA', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-assign_license"></i> Assign License...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Settings', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Remove from Inventory', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permissions...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
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
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Pre-check Remediation',
            action: (node: IMNode) => {
            }
          }
        ]
      }
    ];
  }

  get resourcePoolContextMenu() {
    return [
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vm-add"></i> New Virtual Machine...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-ovf-deploy"></i> Deploy OVF Template...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vx-icon-rpNew"></i> New Resource Pool...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: '<i class="vs-icon vsphere-icon-vapp-add"></i> New vApp...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Edit Resource Settings...', action: (node: IMNode) => {
        }
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Move To...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Rename', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Tags & Custom Attributes', subMenu: [
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_assign"></i> Assign Tag...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: '<i class="vs-icon vx-icon-tag_remove"></i> Remove Tag',
            action: (node: IMNode) => {
            }
          },
          {id: 1, text: 'divider'},
          {
            id: 0,
            text: 'Edit Custom Attributes...',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: 'Add Permissions...', action: (node: IMNode) => {
        }
      },
      {
        id: 0, text: 'Alarms', subMenu: [
          {
            id: 0,
            text: 'New Alarm Definition...',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Enable Alarm Actions',
            action: (node: IMNode) => {
            }
          },
          {
            id: 0,
            text: 'Disable Alarm Actions',
            action: (node: IMNode) => {
            }
          }
        ]
      },
      {id: 1, text: 'divider'},
      {
        id: 0, text: '<i class="vs-icon vx-icon-removeIcon"></i> Delete', action: (node: IMNode) => {
        }
      }
    ];
  }

  private openRemoteConsole(connectionUuid: string, vm: any): void {
    this.logger.debug('Infrastructure Manager [%s] -> Opening Remote Console APP -> vm [%s]', vm.vm, vm.name);

    this.Applications.openApplication('wmks', {
      connectionUuid,
      vm: vm.vm,
      credential: this.InfrastructureManager.getConnectionByUuid(connectionUuid).credential,
      host: this.InfrastructureManager.getConnectionByUuid(connectionUuid).host,
      port: this.InfrastructureManager.getConnectionByUuid(connectionUuid).port
    });
  }

  private openDatastoreExplorer(connectionUuid: string, type: 'vmware' | 'netapp', data: any): void {
    this.logger.debug('Infrastructure Manager [%s] -> Opening Datastore Explorer APP -> datastore [%s]', connectionUuid, type);

    this.Applications.openApplication('datastore-explorer', {
      connectionUuid,
      data,
      type
    });
  }
}

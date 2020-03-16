import {Extension} from '@anyopsos/sdk-vmware/src/lib/types/data/extension';
import {PropertyFilterSpec} from '@anyopsos/sdk-vmware/src/lib/types/data/property-filter-spec';
import {TraversalSpec} from '@anyopsos/sdk-vmware/src/lib/types/data/traversal-spec';

export function anyOpsOSExtension(): Extension {
  return {
    description: {
      label: 'anyOpsOS Management',
      summary: 'anyOpsOS management extension for VMware vSphere'
    },
    key: 'com.anyopsos.management',
    company: 'anyOpsOS',
    version: '1.0',
    subjectName: 'anyOpsOS Management',
    client: [{
      version: '1.0',
      description: {
        label: 'anyOpsOS Management',
        summary: 'anyOpsOS management extension for VMware vSphere'
      },
      company: 'anyOpsOS',
      type: 'com.vmware.vim.viClientScripts',
      url: 'https://github.com/anyOpsOS/anyOpsOS'
    }],
    taskList: [
      {
        taskID: 'com.anyopsos.management.backup'
      }
    ],
    resourceList: [
      {
        locale: 'en',
        module: 'task',
        data: [
          {
            key: 'com.anyopsos.management.backup.label',
            value: 'anyOpsOS Create Backup'
          }
        ]
      },
      {
        locale: 'en_US',
        module: 'task',
        data: [
          {
            key: 'com.anyopsos.management.backup.label',
            value: 'anyOpsOS Create Backup'
          }
        ]
      }
    ],
    lastHeartbeatTime: new Date().toISOString()
  };
}

export function allBasicDataFilter(): PropertyFilterSpec {
  return {
    propSet: [
      {
        type: 'ManagedEntity',
        all: false,
        pathSet: ['name', 'parent']
      },
      {
        type: 'Folder',
        all: false,
        pathSet: ['name', 'parent', 'childType']
      },
      {
        type: 'Network',
        all: true
      },
      {
        type: 'VmwareDistributedVirtualSwitch',
        all: true
      },
      {
        type: 'DistributedVirtualSwitch',
        all: true
      },
      {
        type: 'DistributedVirtualPortgroup',
        all: true
      },
      {
        type: 'VirtualMachine',
        all: false,
        pathSet: ['name', 'parent', 'guest', 'runtime.powerState', 'runtime.connectionState', 'runtime.faultToleranceState',
          'config.uuid', 'summary.quickStats.guestMemoryUsage', 'summary.config.memorySizeMB', 'summary.quickStats.overallCpuUsage', 'summary.runtime.maxCpuUsage',
          'summary.config.vmPathName', 'summary.config.template', 'datastore', 'layout', 'config.files.logDirectory',
          'config.hardware.device', 'resourcePool', 'runtime.host', 'config.version', 'config.changeTrackingEnabled', 'config.ftInfo',
          'config.hardware.numCPU', 'config.hardware.memoryMB', 'config.files.snapshotDirectory', 'config.extraConfig', 'storage.perDatastoreUsage',
          'snapshot', 'layoutEx', 'config.guestId', 'config.annotation', 'customValue', 'parentVApp', 'runtime.consolidationNeeded',
          'config.flags.faultToleranceType', 'config.forkConfigInfo', 'config.files.vmPathName'
        ]
      },
      {
        type: 'Datacenter',
        all: false,
        pathSet: ['datastore', 'vmFolder']
      },
      {
        type: 'HostSystem',
        all: false,
        pathSet: ['vm', 'datastore', 'hardware.cpuInfo.numCpuPackages', 'hardware.cpuFeature', 'hardware.cpuInfo.hz', 'hardware.systemInfo.uuid',
          'config.product.productLineId', 'summary.config.product.fullName', 'summary.config.product.version', 'summary.config.product.apiVersion',
          'configManager.storageSystem', 'hardware.cpuInfo.numCpuCores', 'hardware.cpuInfo.numCpuThreads', 'runtime', 'config.vsanHostConfig.clusterInfo'
        ]
      },
      /*{
        type: 'HostStorageSystem',
        all: false,
        pathSet: ['storageDeviceInfo', 'fileSystemVolumeInfo']
      },*/
      {
        type: 'Datastore',
        all: false,
        pathSet: ['info', 'host', 'summary.accessible', 'summary.capacity', 'summary.freeSpace', 'summary.multipleHostAccess', 'vm', 'capability', 'summary.type']
      },
      {
        type: 'ResourcePool',
        all: false,
        pathSet: ['vm', 'name', 'parent', 'resourcePool']
      },
      {
        type: 'ClusterComputeResource',
        all: false,
        pathSet: ['configuration.drsConfig', 'summary', 'configurationEx.spbmEnabled']
      },
      {
        type: 'ComputeResource',
        all: false,
        pathSet: ['summary', 'configurationEx.spbmEnabled']
      },
      {
        type: 'VirtualApp',
        all: false,
        pathSet: ['vm', 'name', 'parent', 'parentFolder', 'resourcePool']
      },
      {
        type: 'StoragePod',
        all: false,
        pathSet: ['name', 'parent', 'summary.capacity', 'summary.freeSpace', 'podStorageDrsEntry.storageDrsConfig.podConfig.enabled',
          'podStorageDrsEntry.storageDrsConfig.podConfig.defaultVmBehavior'
        ]
      }
    ],
    objectSet: [
      {
        obj: {
          $type: 'Folder',
          _value: 'group-d1'
        },
        skip: false,
        selectSet: [
          ({
            '$xsi:type': 'TraversalSpec',
            name: 'resourcepool',
            type: 'ResourcePool',
            path: 'resourcePool',
            skip: false,
            selectSet: [
              {
                name: 'resourcepool'
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'ResourcePool',
                path: 'vm',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'runtime.host',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ClusterComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'datastore',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'Datastore',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'datastore',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'Datastore',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'VirtualApp',
                path: 'vm',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'runtime.host',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ClusterComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'datastore',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'Datastore',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'datastore',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'Datastore',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'vm_to_respool'
                  }
                ]
              },
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'ComputeResource',
            path: 'resourcePool',
            skip: false,
            selectSet: [
              {
                name: 'resourcepool'
              }
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            name: 'folder_to_parent',
            type: 'Folder',
            path: 'parent',
            skip: false,
            selectSet: [
              {
                '$xsi:type': 'TraversalSpec',
                type: 'Datacenter',
                path: 'parent',
                skip: false,
                selectSet: [
                  {
                    name: 'folder_to_parent'
                  }
                ]
              },
              {
                name: 'folder_to_parent'
              }
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'Datacenter',
            path: 'parent',
            skip: false,
            selectSet: [
              {
                name: 'folder_to_parent'
              }
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'Datastore',
            path: 'parent',
            skip: false,
            selectSet: [
              {
                name: 'folder_to_parent'
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'StoragePod',
                path: 'childEntity',
                skip: false
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'StoragePod',
                path: 'childEntity',
                skip: false,
                selectSet: [
                  {
                    name: 'folder_to_parent'
                  }
                ]
              }
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            name: 'folder_to_content',
            type: 'Folder',
            path: 'childEntity',
            skip: false,
            selectSet: [
              {
                name: 'folder_to_content',
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'ClusterComputeResource',
                path: 'host',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'HostSystem',
                    path: 'vm',
                    skip: false
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'HostSystem',
                    path: 'datastore',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'Datastore',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'ComputeResource',
                path: 'host',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'HostSystem',
                    path: 'vm',
                    skip: false
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'HostSystem',
                    path: 'datastore',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'Datastore',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'HostSystem',
                    path: 'configManager.storageSystem',
                    skip: false
                  }
                ]
              },
              {
                name: 'folder_to_parent'
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'ComputeResource',
                path: 'resourcePool',
                skip: false,
                selectSet: [
                  {
                    name: 'resourcepool'
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'Datacenter',
                path: 'hostFolder',
                skip: false,
                selectSet: [
                  {
                    name: 'folder_to_content'
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'Datacenter',
                path: 'networkFolder',
                skip: false,
                selectSet: [
                  {
                    name: 'folder_to_content'
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'Datacenter',
                path: 'vmFolder',
                skip: false,
                selectSet: [
                  {
                    name: 'folder_to_content'
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'VirtualApp',
                path: 'resourcePool',
                skip: false,
                selectSet: [
                  {
                    name: 'resourcepool'
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'ResourcePool',
                    path: 'vm',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'VirtualMachine',
                        path: 'runtime.host',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'HostSystem',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'ClusterComputeResource',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'ComputeResource',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'HostSystem',
                            path: 'datastore',
                            skip: false,
                            selectSet: [
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'Datastore',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  },
                                  {
                                    '$xsi:type': 'TraversalSpec',
                                    type: 'StoragePod',
                                    path: 'childEntity',
                                    skip: false,
                                  },
                                  {
                                    '$xsi:type': 'TraversalSpec',
                                    type: 'StoragePod',
                                    path: 'childEntity',
                                    skip: false,
                                    selectSet: [
                                      {
                                        name: 'folder_to_parent'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'VirtualMachine',
                        path: 'datastore',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'Datastore',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualApp',
                    path: 'vm',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'VirtualMachine',
                        path: 'runtime.host',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'HostSystem',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'ClusterComputeResource',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'ComputeResource',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'HostSystem',
                            path: 'datastore',
                            skip: false,
                            selectSet: [
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'Datastore',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  },
                                  {
                                    '$xsi:type': 'TraversalSpec',
                                    type: 'StoragePod',
                                    path: 'childEntity',
                                    skip: false,
                                  },
                                  {
                                    '$xsi:type': 'TraversalSpec',
                                    type: 'StoragePod',
                                    path: 'childEntity',
                                    skip: false,
                                    selectSet: [
                                      {
                                        name: 'folder_to_parent'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'VirtualMachine',
                        path: 'datastore',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'Datastore',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name: 'vm_to_respool'
                      }
                    ]
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'VirtualApp',
                path: 'vm',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'runtime.host',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ClusterComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'datastore',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'Datastore',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'datastore',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'Datastore',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'vm_to_respool'
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'Datacenter',
                path: 'datastoreFolder',
                skip: false,
                selectSet: [
                  {
                    name: 'folder_to_content'
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'VirtualMachine',
                path: 'runtime.host',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'HostSystem',
                    path: 'parent',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'ClusterComputeResource',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'ComputeResource',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'HostSystem',
                    path: 'datastore',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'Datastore',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'vm_to_respool'
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'Datastore',
                path: 'vm',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'runtime.host',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ClusterComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'datastore',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'Datastore',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'vm_to_respool'
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'StoragePod',
                path: 'childEntity',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'Datastore',
                    path: 'vm',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'VirtualMachine',
                        path: 'runtime.host',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'HostSystem',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'ClusterComputeResource',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'ComputeResource',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'HostSystem',
                            path: 'datastore',
                            skip: false,
                            selectSet: [
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'Datastore',
                                path: 'parent',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  },
                                  {
                                    '$xsi:type': 'TraversalSpec',
                                    type: 'StoragePod',
                                    path: 'childEntity',
                                    skip: false,
                                  },
                                  {
                                    '$xsi:type': 'TraversalSpec',
                                    type: 'StoragePod',
                                    path: 'childEntity',
                                    skip: false,
                                    selectSet: [
                                      {
                                        name: 'folder_to_parent'
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name: 'vm_to_respool'
                      }
                    ]
                  }
                ]
              }
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'Datacenter',
            path: 'hostFolder',
            skip: false,
            selectSet: [
              {
                name: 'folder_to_content'
              }
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'ClusterComputeResource',
            path: 'host',
            skip: false,
            selectSet: [
              {
                '$xsi:type': 'TraversalSpec',
                type: 'HostSystem',
                path: 'vm',
                skip: false
              },
              ({
                '$xsi:type': 'TraversalSpec',
                type: 'HostSystem',
                path: 'datastore',
                skip: false,
                selectSet: [
                  ({
                    '$xsi:type': 'TraversalSpec',
                    type: 'Datastore',
                    path: 'parent',
                    skip: false,
                    selectSet: [
                      {
                        name: 'folder_to_parent'
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'StoragePod',
                        path: 'childEntity',
                        skip: false,
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'StoragePod',
                        path: 'childEntity',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          }
                        ]
                      }
                    ]
                  } as TraversalSpec)
                ]
              } as TraversalSpec)
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'ComputeResource',
            path: 'host',
            skip: false,
            selectSet: [
              {
                '$xsi:type': 'TraversalSpec',
                type: 'HostSystem',
                path: 'vm',
                skip: false
              },
              ({
                '$xsi:type': 'TraversalSpec',
                type: 'HostSystem',
                path: 'datastore',
                skip: false,
                selectSet: [
                  ({
                    '$xsi:type': 'TraversalSpec',
                    type: 'Datastore',
                    path: 'parent',
                    skip: false,
                    selectSet: [
                      {
                        name: 'folder_to_parent'
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'StoragePod',
                        path: 'childEntity',
                        skip: false,
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'StoragePod',
                        path: 'childEntity',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          }
                        ]
                      }
                    ]
                  } as TraversalSpec)
                ]
              } as TraversalSpec),
              {
                '$xsi:type': 'TraversalSpec',
                type: 'HostSystem',
                path: 'configManager.storageSystem',
                skip: false
              }
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'VirtualMachine',
            path: 'runtime.host',
            skip: false,
            selectSet: [
              {
                '$xsi:type': 'TraversalSpec',
                type: 'HostSystem',
                path: 'parent',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'ClusterComputeResource',
                    path: 'parent',
                    skip: false,
                    selectSet: [
                      {
                        name: 'folder_to_parent'
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'ComputeResource',
                    path: 'parent',
                    skip: false,
                    selectSet: [
                      {
                        name: 'folder_to_parent'
                      }
                    ]
                  }
                ]
              },
              ({
                '$xsi:type': 'TraversalSpec',
                type: 'HostSystem',
                path: 'datastore',
                skip: false,
                selectSet: [
                  ({
                    '$xsi:type': 'TraversalSpec',
                    type: 'Datastore',
                    path: 'parent',
                    skip: false,
                    selectSet: [
                      {
                        name: 'folder_to_parent'
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'StoragePod',
                        path: 'childEntity',
                        skip: false
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'StoragePod',
                        path: 'childEntity',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          }
                        ]
                      }
                    ]
                  } as TraversalSpec)
                ]
              } as TraversalSpec)
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'VirtualMachine',
            path: 'datastore',
            skip: false,
            selectSet: [
              ({
                '$xsi:type': 'TraversalSpec',
                type: 'Datastore',
                path: 'parent',
                skip: false,
                selectSet: [
                  {
                    name: 'folder_to_parent'
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'StoragePod',
                    path: 'childEntity',
                    skip: false
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'StoragePod',
                    path: 'childEntity',
                    skip: false,
                    selectSet: [
                      {
                        name: 'folder_to_parent'
                      }
                    ]
                  }
                ]
              } as TraversalSpec)
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            name: 'vm_to_respool',
            type: 'VirtualMachine',
            path: 'resourcePool',
            skip: false,
            selectSet: [
              ({
                '$xsi:type': 'TraversalSpec',
                name: 'respool_parent',
                type: 'ResourcePool',
                path: 'parent',
                skip: false,
                selectSet: [
                  {
                    name: 'respool_parent'
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'ComputeResource',
                    path: 'parent',
                    skip: false,
                    selectSet: [
                      {
                        name: 'folder_to_parent'
                      }
                    ]
                  }
                ]
              } as TraversalSpec)
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'VirtualMachine',
            path: 'parent',
            skip: false,
            selectSet: [
              {
                name: 'folder_to_parent'
              }
            ]
          } as TraversalSpec),
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'VirtualApp',
            path: 'resourcePool',
            skip: false,
            selectSet: [
              {
                name: 'resourcepool'
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'ResourcePool',
                path: 'vm',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'runtime.host',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ClusterComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'datastore',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'Datastore',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'datastore',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'Datastore',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                '$xsi:type': 'TraversalSpec',
                type: 'VirtualApp',
                path: 'vm',
                skip: false,
                selectSet: [
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'runtime.host',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ClusterComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'ComputeResource',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'HostSystem',
                        path: 'datastore',
                        skip: false,
                        selectSet: [
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'Datastore',
                            path: 'parent',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                              },
                              {
                                '$xsi:type': 'TraversalSpec',
                                type: 'StoragePod',
                                path: 'childEntity',
                                skip: false,
                                selectSet: [
                                  {
                                    name: 'folder_to_parent'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    '$xsi:type': 'TraversalSpec',
                    type: 'VirtualMachine',
                    path: 'datastore',
                    skip: false,
                    selectSet: [
                      {
                        '$xsi:type': 'TraversalSpec',
                        type: 'Datastore',
                        path: 'parent',
                        skip: false,
                        selectSet: [
                          {
                            name: 'folder_to_parent'
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                          },
                          {
                            '$xsi:type': 'TraversalSpec',
                            type: 'StoragePod',
                            path: 'childEntity',
                            skip: false,
                            selectSet: [
                              {
                                name: 'folder_to_parent'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: 'vm_to_respool'
                  }
                ]
              }
            ]
          } as TraversalSpec)
        ]
      }
    ]
  };
}

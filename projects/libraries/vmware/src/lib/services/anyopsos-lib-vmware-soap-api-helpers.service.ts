import {Injectable} from '@angular/core';

import {TraversalSpec} from '@anyopsos/sdk-vmware/src/lib/types/data/traversal-spec';

import {AnyOpsOSLibVmwareSoapApiService} from './anyopsos-lib-vmware-soap-api.service';


@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareSoapApiHelpersService {

  constructor(private readonly LibVmwareSoapApiService: AnyOpsOSLibVmwareSoapApiService) {
  }

  /**
   * Tasks
   */
  private getTaskResults(connectionUuid: string, taskId: string): Promise<any> {

    // @ts-ignore TODO
    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'Task',
          all: false,
          pathSet: [
            'info'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'Task',
            _value: taskId
          }
        }]
      }]
    });

  }

  getTaskStatus(connectionUuid: string, taskId: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'Task',
          all: false,
          pathSet: [
            'info.progress',
            'info.state',
            'info.cancelable'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'Task',
            _value: taskId
          }
        }]
      }]
    });

  }

  /**
   * Host
   */
  getComputeResource(connectionUuid: string, computeResource: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'ComputeResource',
          all: true
        }],
        objectSet: [{
          obj: {
            $type: 'ComputeResource',
            _value: computeResource
          },
          skip: false
        }]
      }]
    });

  }

  getClusterComputeResource(connectionUuid: string, clusterComputeResource: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'ClusterComputeResource',
          all: true
        }],
        objectSet: [{
          obj: {
            $type: 'ClusterComputeResource',
            _value: clusterComputeResource
          },
          skip: false
        }]
      }]
    });

  }

  getResourcePool(connectionUuid: string, resourcePool: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'ResourcePool',
          all: true
        }],
        objectSet: [{
          obj: {
            $type: 'ResourcePool',
            _value: resourcePool
          },
          skip: false
        }]
      }]
    });

  }

  getHosts(connectionUuid: string, datacenterFolder: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostSystem',
          all: true
        }],
        objectSet: [{
          obj: {
            $type: 'Folder',
            _value: datacenterFolder
          },
          skip: false,
          selectSet: [
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'folderTraversalSpec',
              type: 'Folder',
              path: 'childEntity',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                },
                {
                  name: 'datacenterHostTraversalSpec'
                },
                {
                  name: 'datacenterVmTraversalSpec'
                },
                {
                  name: 'datacenterDatastoreTraversalSpec'
                },
                {
                  name: 'datacenterNetworkTraversalSpec'
                },
                {
                  name: 'computeResourceRpTraversalSpec'
                },
                {
                  name: 'computeResourceHostTraversalSpec'
                },
                {
                  name: 'hostVmTraversalSpec'
                },
                {
                  name: 'resourcePoolVmTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'datacenterDatastoreTraversalSpec',
              type: 'Datacenter',
              path: 'datastoreFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'datacenterNetworkTraversalSpec',
              type: 'Datacenter',
              path: 'networkFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'datacenterVmTraversalSpec',
              type: 'Datacenter',
              path: 'vmFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'datacenterHostTraversalSpec',
              type: 'Datacenter',
              path: 'hostFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'computeResourceHostTraversalSpec',
              type: 'ComputeResource',
              path: 'host',
              skip: false
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'computeResourceRpTraversalSpec',
              type: 'ComputeResource',
              path: 'resourcePool',
              skip: false,
              selectSet: [
                {
                  name: 'resourcePoolTraversalSpec'
                },
                {
                  name: 'resourcePoolVmTraversalSpec'
                }
              ]
            }as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'resourcePoolTraversalSpec',
              type: 'ResourcePool',
              path: 'resourcePool',
              skip: false,
              selectSet: [
                {
                  name: 'resourcePoolTraversalSpec'
                },
                {
                  name: 'resourcePoolVmTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'hostVmTraversalSpec',
              type: 'HostSystem',
              path: 'vm',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'resourcePoolVmTraversalSpec',
              type: 'ResourcePool',
              path: 'vm',
              skip: false
            } as TraversalSpec)
          ]
        }]
      }]
    });

  }

  getHost(connectionUuid: string, esxiHost: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostSystem',
          all: true
        }],
        objectSet: [{
          obj: {
            $type: 'HostSystem',
            _value: esxiHost
          },
          skip: false,
          selectSet: [
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'folderTraversalSpec',
              type: 'Folder',
              path: 'childEntity',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                },
                {
                  name: 'datacenterHostTraversalSpec'
                },
                {
                  name: 'datacenterVmTraversalSpec'
                },
                {
                  name: 'datacenterDatastoreTraversalSpec'
                },
                {
                  name: 'datacenterNetworkTraversalSpec'
                },
                {
                  name: 'computeResourceRpTraversalSpec'
                },
                {
                  name: 'computeResourceHostTraversalSpec'
                },
                {
                  name: 'hostVmTraversalSpec'
                },
                {
                  name: 'resourcePoolVmTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'datacenterDatastoreTraversalSpec',
              type: 'Datacenter',
              path: 'datastoreFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'datacenterNetworkTraversalSpec',
              type: 'Datacenter',
              path: 'networkFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'datacenterVmTraversalSpec',
              type: 'Datacenter',
              path: 'vmFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'datacenterHostTraversalSpec',
              type: 'Datacenter',
              path: 'hostFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'computeResourceHostTraversalSpec',
              type: 'ComputeResource',
              path: 'host',
              skip: false
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'computeResourceRpTraversalSpec',
              type: 'ComputeResource',
              path: 'resourcePool',
              skip: false,
              selectSet: [
                {
                  name: 'resourcePoolTraversalSpec'
                },
                {
                  name: 'resourcePoolVmTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'resourcePoolTraversalSpec',
              type: 'ResourcePool',
              path: 'resourcePool',
              skip: false,
              selectSet: [
                {
                  name: 'resourcePoolTraversalSpec'
                },
                {
                  name: 'resourcePoolVmTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'hostVmTraversalSpec',
              type: 'HostSystem',
              path: 'vm',
              skip: false,
              selectSet: [
                {
                  name: 'folderTraversalSpec'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'resourcePoolVmTraversalSpec',
              type: 'ResourcePool',
              path: 'vm',
              skip: false
            } as TraversalSpec)
          ]
        }]
      }]
    });

  }

  getHostStorageSystem(connectionUuid: string, esxiHost: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostSystem',
          all: false,
          pathSet: [
            'configManager.storageSystem'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostSystem',
            _value: esxiHost
          }
        }]
      }]
    });

  }

  getHostFirewallSystem(connectionUuid: string, esxiHost: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostSystem',
          all: false,
          pathSet: [
            'configManager.firewallSystem'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostSystem',
            _value: esxiHost
          }
        }]
      }]
    });

  }

  getHostFirewallRules(connectionUuid: string, esxiHost: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostSystem',
          all: false,
          pathSet: [
            'config.firewall'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostSystem',
            _value: esxiHost
          }
        }]
      }]
    });

  }

  getHostStorageSystemData(connectionUuid: string, storageSystem: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostStorageSystem',
          all: false,
          pathSet: [
            'storageDeviceInfo',
            'fileSystemVolumeInfo'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostStorageSystem',
            _value: storageSystem
          },
          skip: false
        }]
      }]
    });

  }

  getHostConnectionState(connectionUuid: string, esxiHost: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostSystem',
          all: false,
          pathSet: [
            'runtime.connectionState'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostSystem',
            _value: esxiHost
          }
        }]
      }]
    });

  }

  getHostConfigManagerNetworkSystem(connectionUuid: string, esxiHost: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostSystem',
          all: false,
          pathSet: [
            'configManager.networkSystem'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostSystem',
            _value: esxiHost
          }
        }]
      }]
    });

  }

  getHostConfigManagerDatastoreSystem(connectionUuid: string, esxiHost: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostSystem',
          all: false,
          pathSet: [
            'configManager.datastoreSystem'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostSystem',
            _value: esxiHost
          }
        }]
      }]
    });

  }

  getHostNetworkInfoVnic(connectionUuid: string, networkSystem: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostNetworkSystem',
          all: false,
          pathSet: [
            'networkInfo.vnic'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostNetworkSystem',
            _value: networkSystem
          }
        }]
      }]
    });

  }

  getHostNetworkInfoConsoleVnic(connectionUuid: string, networkSystem: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'HostNetworkSystem',
          all: false,
          pathSet: [
            'networkInfo.consoleVnic'
          ]
        }],
        objectSet: [{
          obj: {
            $type: 'HostNetworkSystem',
            _value: networkSystem
          }
        }]
      }]
    });

  }

  /**
   * Datastore
   */
  getDatastores(connectionUuid: string, datacenterFolder: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'Datastore',
          all: true
        }],
        objectSet: [{
          obj: {
            $type: 'Folder',
            _value: datacenterFolder
          },
          skip: true,
          selectSet: [
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'Folder',
              path: 'childEntity',
              skip: true,
              selectSet: [
                ({
                  type: 'Datacenter',
                  path: 'datastore',
                  skip: false
                } as TraversalSpec)
              ]
            } as TraversalSpec)
          ]
        }]
      }]
    });

  }

  getDatastoreProps(connectionUuid: string, datastore: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'Datastore',
          all: true
        }],
        objectSet: [{
          obj: {
            $type: 'Datastore',
            _value: datastore
          },
          skip: false
        }]
      }]
    });

  }

  getDatastoresWithVMsData(connectionUuid: string, datacenterFolder: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [
          {
            type: 'Datastore',
            all: false,
            pathSet: ['info', 'host', 'vm']
          },
          {
            type: 'VirtualMachine',
            all: false,
            pathSet: ['config', 'layout', 'runtime']
          }
        ],
        objectSet: [{
          obj: {
            $type: 'Folder',
            _value: datacenterFolder
          },
          skip: true,
          selectSet: [
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'visitFolders',
              type: 'Folder',
              path: 'childEntity',
              skip: true,
              selectSet: [
                {
                  name: 'visitFolders'
                },
                {
                  type: 'Datacenter',
                  path: 'datastore',
                  skip: false,
                  selectSet: [
                    {
                      type: 'Datacenter',
                      path: 'vm',
                      skip: false
                    }
                  ]
                },
                {
                  type: 'Datastore',
                  path: 'vm',
                  skip: false
                }
              ]
            } as TraversalSpec)
          ]
        }]
      }]
    });

  }

  getVMFileDataFromDatastore(connectionUuid: string, datastore: string, datastoreName: string, path: string, vmxFile: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'SearchDatastore_Task', {
      _this: {
        $type: 'HostDatastoreBrowser',
        _value: datastore
      },
      datastorePath: `[${datastoreName}] ${path}`,
      searchSpec: {
        details: {
          fileType: true,
          fileSize: true,
          modification: true,
          fileOwner: false
        },
        matchPattern: [vmxFile]
      }
    });

  }

  getFilesDataFromDatastore(connectionUuid: string, datastore: string, datastoreName: string, path: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'SearchDatastore_Task', {
      _this: {
        $type: 'HostDatastoreBrowser',
        _value: datastore
      },
      datastorePath: `[${datastoreName}] ${path}`,
      searchSpec: {
        details: {
          fileType: true,
          fileSize: true,
          modification: true,
          fileOwner: false
        }
      }
    });

  }

  /**
   * VM
   */
  getVMs(connectionUuid: string, datacenterFolder: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [
          {
            type: 'VirtualMachine',
            all: true
          }
        ],
        objectSet: [{
          obj: {
            $type: 'Folder',
            _value: datacenterFolder
          },
          skip: true,
          selectSet: [
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'visitFolders',
              type: 'Folder',
              path: 'childEntity',
              skip: true,
              selectSet: [
                {
                  name: 'visitFolders'
                },
                {
                  type: 'Datacenter',
                  path: 'datastore',
                  skip: false,
                  selectSet: [
                    {
                      type: 'Datacenter',
                      path: 'vm',
                      skip: false
                    }
                  ]
                },
                {
                  type: 'Datastore',
                  path: 'vm',
                  skip: false
                }
              ]
            } as TraversalSpec)
          ]
        }]
      }]
    });

  }

  getVM(connectionUuid: string, vm: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'VirtualMachine',
          all: true
        }],
        objectSet: [{
          obj: {
            $type: 'VirtualMachine',
            _value: vm
          },
          skip: false
        }]
      }]
    });

  }

  getVMPath(connectionUuid: string, vm: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'VirtualMachine',
          all: false,
          pathSet: ['config.files.vmPathName']
        }],
        objectSet: [{
          obj: {
            $type: 'VirtualMachine',
            _value: vm
          },
          skip: false
        }]
      }]
    });

  }

  getVMRuntime(connectionUuid: string, vm: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [{
          type: 'VirtualMachine',
          all: false,
          pathSet: ['runtime']
        }],
        objectSet: [{
          obj: {
            $type: 'VirtualMachine',
            _value: vm
          },
          skip: false
        }]
      }]
    });

  }

  getVMSnapshots(connectionUuid: string, vm: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'RetrieveProperties', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'propertyCollector'
      },
      specSet: [{
        propSet: [
          {
            type: 'VirtualMachine',
            all: false,
            pathSet: ['snapshot']
          }
        ],
        objectSet: [{
          obj: {
            $type: 'VirtualMachine',
            _value: vm
          },
          skip: false
        }]
      }]
    });

  }

  searchIndexVM(connectionUuid: string, vmUuid: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'FindByUuid', {
      _this: {
        $type: 'SearchIndex',
        _value: 'SearchIndex'
      },
      uuid: vmUuid,
      vmSearch: true,
      instanceUuid: true
    });

  }

  queryVMEvents(connectionUuid: string, vm: string): Promise<any> {

    return this.LibVmwareSoapApiService.callSoapApi(connectionUuid, 'QueryEvents', {
      _this: {
        $type: 'EventManager',
        _value: 'EventManager'
      },
      filter: {
        entity: {
          entity: {
            $type: 'VirtualMachine',
            _value: vm
          },
          recursion: 'all'
        }
      }
    });

  }

  /**
   * Ticket
   */
  /*acquireNFCTicket(connectionUuid: string, esxiHost, datastore): Promise<any> {
    const xml = `<?xml version='1.0' encoding='UTF-8'?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/'
                   xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:vim='urn:internalvim25'>
  <SOAP-ENV:Body>
    <vim:NfcFileManagement xsi:type='vim:NfcFileManagementRequestType'>
      <vim:_this xsi:type='vim:ManagedObjectReference' type='NfcService'>nfcService</vim:_this>
      <vim:ds xsi:type='vim:ManagedObjectReference' type='Datastore'>${datastore}</vim:ds>
      <vim:hostForAccess xsi:type='vim:ManagedObjectReference' type='HostSystem'>${esxiHost}</vim:hostForAccess>
    </vim:NfcFileManagement>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(data.NfcFileManagementResponse[0].returnval[0]);
    }));
  }*/
}

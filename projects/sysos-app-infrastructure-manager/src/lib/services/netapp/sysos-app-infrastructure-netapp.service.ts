import {Injectable} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {ToastrService} from 'ngx-toastr';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibNetappService} from '@sysos/lib-netapp';
import {SysosLibVmwareService} from '@sysos/lib-vmware';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';

import {SysosAppInfrastructureManagerService} from '../sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureVmwareService} from '../vmware/sysos-app-infrastructure-vmware.service';
import {IMConnection} from '../../types/imconnection';
import {NetAppVolume} from '../../types/netapp-volume';
import {NetAppSnapshot} from '../../types/netapp-snapshot';


@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureNetappService {
  constructor(private logger: SysosLibLoggerService,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private NetApp: SysosLibNetappService,
              private VMWare: SysosLibVmwareService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureManagerVmware: SysosAppInfrastructureVmwareService) {
  }

  /**
   * @description
   * Get all data from NetApp node
   */
  getNetAppData(connection: IMConnection): void {
    const loggerArgs = arguments;

    const mainPromises = [];
    const vsPromises = [];
    const shPromises = [];
    const shDataPromises = [];

    /* TODO: GET netappinfo from SNMP OID:
     1.3.6.1.4.1.789.1.1.2.0
     1.3.6.1.2.1.1.5.0
     1.3.6.1.4.1.789.1.1.7.0
     */

    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to NetApp...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

      // Get NetApp Version
      return this.NetApp.getSystemVersion(connection.credential, connection.host, connection.port);
    }).then((systemVersionResult) => {
      if (systemVersionResult.status === 'error') {
        throw {
          error: systemVersionResult.error,
          description: 'Failed to get NetApp System Version'
        };
      }

      // TODO: check if version is

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base = {
        buildtimestamp: systemVersionResult.data.build_timestamp,
        isclustered: systemVersionResult.data.is_clustered,
        version: systemVersionResult.data.version,
        versiontuple: systemVersionResult.data.version_tuple
      };

      this.Modal.changeModalText('Getting data...', '.window--infrastructure-manager .window__main');

      // Get interfaces
      // Get cluster data
      // Get vServers
      mainPromises.push(this.NetApp.getNetInterfaces(connection.credential, connection.host, connection.port));
      mainPromises.push(this.NetApp.getFcpInterfaces(connection.credential, connection.host, connection.port));
      mainPromises.push(this.NetApp.getFcpAdapters(connection.credential, connection.host, connection.port));
      mainPromises.push(this.NetApp.getMetrocluster(connection.credential, connection.host, connection.port));
      mainPromises.push(this.NetApp.getClusterIdentity(connection.credential, connection.host, connection.port));
      mainPromises.push(this.NetApp.getLicenses(connection.credential, connection.host, connection.port));
      mainPromises.push(this.NetApp.getOntapiVersion(connection.credential, connection.host, connection.port));
      mainPromises.push(this.NetApp.getVservers(connection.credential, connection.host, connection.port));

      return Promise.all(mainPromises);

    }).then((res) => {
      if (res[0].status === 'error') {
        throw {
          error: res[0].error,
          description: 'Failed to get NetApp Network Interfaces'
        };
      }
      if (res[1].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp FCP Interfaces'};
      if (res[2].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp FCP Adapters'};
      if (res[3].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Metrocluster data'};
      if (res[4].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Cluster Identity'};
      if (res[5].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Licenses'};
      if (res[6].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Ontapi Version'};
      if (res[7].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Vservers'};

      // Set interfaces
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Ifaces = {};
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Ifaces.netifaces = res[0].data;
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Ifaces.fcpifaces = res[1].data;
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Ifaces.fcpadapters = res[2].data;

      // Set cluster data
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base.metrocluster = res[3].data;
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base.cluster = res[4].data;
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base.licenses = res[5].data;
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base.ontapi_version = res[6].data;

      // Set vServers
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers = res[7].data;

      // Set new uuid to match internal node uuid
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).uuid = res[4].data.cluster_uuid;
      connection.uuid = res[4].data.cluster_uuid;

      // Set new uuid as activeConnection
      this.InfrastructureManager.setActiveConnection(res[4].data.cluster_uuid);

      this.Modal.changeModalText('Getting Vservers data...', '.window--infrastructure-manager .window__main');

      Object.entries(res[7].data).forEach(([key, vserver]) => {

        if (vserver['vserver-type'] === 'admin') this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base.name = vserver['vserver-name'];

        // GET Volumes per vServer
        if (vserver['vserver-type'] === 'data') {

          // Get qtrees
          vsPromises.push(this.NetApp.getQtrees(connection.credential, connection.host, connection.port, vserver['vserver-name']).then((qtreesResult) => {
            if (qtreesResult.status === 'error') {
              throw {
                error: qtreesResult.error,
                description: 'Failed to get NetApp Qtrees'
              };
            }

            this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Qtrees = qtreesResult.data;
          }));

          vsPromises.push(this.NetApp.getVolumes(connection.credential, connection.host, connection.port, vserver['vserver-name']).then((volumesResult) => {
            if (volumesResult.status === 'error') {
              throw {
                error: volumesResult.error,
                description: 'Failed to get NetApp Volumes'
              };
            }

            this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Volumes = volumesResult.data;

            // For each Volume
            Object.entries(volumesResult.data).forEach(([v, volume]) => {

              // Get all LUNS
              shPromises.push(this.NetApp.getLuns(connection.credential, connection.host, connection.port, vserver['vserver-name'], volume['volume-id-attributes'].name).then((lunsResult) => {
                if (lunsResult.status === 'error') {
                  throw {
                    error: lunsResult.error,
                    description: 'Failed to get NetApp LUNs'
                  };
                }

                this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Volumes[v].Luns = lunsResult.data;
              }));

              // Get all Snapshots
              shPromises.push(this.NetApp.getSnapshots(
                connection.credential,
                connection.host,
                connection.port,
                vserver['vserver-name'],
                volume['volume-id-attributes'].name
              ).then((snapshotsResult) => {
                if (snapshotsResult.status === 'error') {
                  throw {
                    error: snapshotsResult.error,
                    description: 'Failed to get NetApp LUNs'
                  };
                }

                this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Volumes[v].Snapshots = snapshotsResult.data;

                // For each snapshot
                Object.entries(snapshotsResult.data).forEach(([s, snapshot]: any) => {

                  // Get snapshot creation date
                  shDataPromises.push(this.NetApp.getSnapshotFileInfo(
                    connection.credential, connection.host, connection.port,
                    vserver['vserver-name'],
                    volume['volume-id-attributes'].name,
                    snapshot.name
                  ).then((snapshotFileResult) => {
                    if (snapshotFileResult.status === 'error') {
                      throw {
                        error: snapshotFileResult.error,
                        description: 'Failed to get NetApp Snapshot creation date'
                      };
                    }

                    this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Volumes[v].Snapshots[s].Data = snapshotFileResult.data;
                  }));

                  return Promise.all(shDataPromises);

                });
              }));
            });

            return Promise.all(shPromises);

          }));
        }

      });

      return Promise.all(vsPromises);
    }).then(() => {

      return this.InfrastructureManager.checkLinkBetweenManagedNodes('netapp', connection.uuid);

    }).then(() => {
      this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');

      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid)).then(() => {
        this.Modal.closeModal('.window--infrastructure-manager .window__main');
        this.Toastr.success('NetApp connection added successfully');
      });

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();

    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getting NetApp data', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      this.InfrastructureManager.setActiveConnection(null);
      this.InfrastructureManager.deleteConnection(connection.uuid);

      this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from NetApp');

      throw e;
    });
  }

  /**
   * @description
   * Refresh NetApp volume data
   */
  getVolumeData(connectionUuid: string, volume: NetAppVolume): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'getVolumeData', arguments);
    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    const vserverIndex = this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers.findIndex((item) => {
      return item['vserver-name'] === volume['volume-id-attributes']['owning-vserver-name'];
    });
    const volumeIndex = this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[vserverIndex].Volumes.findIndex((item) => {
      return item['volume-id-attributes'].name === volume['volume-id-attributes'].name;
    });

    this.Modal.openLittleModal('PLEASE WAIT', 'Getting NetApp Volume data...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

      return this.NetApp.getSnapshots(
        connection.credential,
        connection.host,
        connection.port,
        volume['volume-id-attributes']['owning-vserver-name'],
        volume['volume-id-attributes'].name
      );

    }).then((snapshotsResult) => {
      if (snapshotsResult.status === 'error') {
        throw {
          error: snapshotsResult.error,
          description: 'Failed to get NetApp Snapshots'
        };
      }

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots = snapshotsResult.data;

      this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');
      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid)).then(() => {
        this.Modal.closeModal('.window--infrastructure-manager .window__main');
      });

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();
    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getVolumeData', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }

  /**
   * @description
   * Fetch NetApp SnapShots
   */
  getSnapshotFiles(connectionUuid: string, host: string, vserver: string, volume: string, snapshot: string) {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'getSnapshotFiles', arguments);

    let link;
    let datastoreIndex;
    let datastoreVM;
    let esxiHost;

    const vserverIndex = this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers.findIndex((item) => {
      return item['vserver-name'] === vserver;
    });
    const volumeIndex = this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers[vserverIndex].Volumes.findIndex((item) => {
      return item['volume-id-attributes'].name === volume;
    });
    const snapshotIndex = this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots.findIndex((item) => {
      return item.name === snapshot;
    });

    // Already fetched files from storage, don't ask for it again
    if (this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots[snapshotIndex].Files) return Promise.resolve();
    this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots[snapshotIndex].VMs = [];

    this.Modal.openLittleModal('PLEASE WAIT', 'Getting Snapshot data...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

      return this.NetApp.getSnapshotFiles(
        this.InfrastructureManager.getConnectionByUuid(connectionUuid).credential,
        host,
        this.InfrastructureManager.getConnectionByUuid(connectionUuid).port,
        vserver,
        volume,
        snapshot
      );

    }).then((snapshotFilesResult) => {
      if (snapshotFilesResult.status === 'error') {
        throw {
          error: snapshotFilesResult.error,
          description: 'Failed to get NetApp Snapshot files'
        };
      }

      this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots[snapshotIndex].Files = snapshotFilesResult.data;

      // Check every file
      snapshotFilesResult.data.forEach(file => {

        // VM found
        if (!file.hasOwnProperty('name')) {
          console.log(file);
          return;
        }
        if (file.name.substr(file.name.length - 4) === '.vmx') {

          // Reset esxiHost
          esxiHost = '';

          // Get vCenter Link by Storage Junction Path
          link = this.InfrastructureManager.getLinkByStorageJunctionPath(
            connectionUuid,
            this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers[vserverIndex].Volumes[volumeIndex]['volume-id-attributes'].uuid,
            this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers[vserverIndex].Volumes[volumeIndex]['volume-id-attributes']['junction-path']
          );

          if (link) {

            // Get datastoreIndex using returned link
            datastoreIndex = this.InfrastructureManager.getConnectionByUuid(link.virtual).data.Datastores.findIndex((item) => {
              return item.obj.name === link.esxi_datastore;
            });

            // Make the $filter only if VMs found in this datastore
            if (this.InfrastructureManager.getConnectionByUuid(link.virtual).data.Datastores[datastoreIndex].vm.hasOwnProperty('ManagedObjectReference')) {

              // Search for VM using returned Storage file .vmx path
              datastoreVM = this.InfrastructureManager.getConnectionByUuid(link.virtual).data.VMs.filter((obj) => {
                return obj.vm === this.InfrastructureManager.getConnectionByUuid(link.virtual).data.Datastores[datastoreIndex].vm.ManagedObjectReference.name &&
                  obj.datastore.ManagedObjectReference.name === link.esxi_datastore &&
                  obj.files.vmPathName === '[' + this.InfrastructureManager.getConnectionByUuid(link.virtual).data.Datastores[datastoreIndex].name + '] ' +
                  '' + file.path.substring(1) + '/' + file.name;
              })[0];

              // if datastoreVM is undefinned means that VM no longer exists or is in other datastore
              if (datastoreVM) {
                // Get Host name by host Id
                esxiHost = this.InfrastructureManagerVmware.getESXihosts().filter((obj) => {
                  return obj.virtual.host === this.InfrastructureManager.getConnectionByUuid(link.virtual).host &&
                    obj.host.host === datastoreVM.runtime.host.name;
                })[0];
              }

            }
          }

          this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots[snapshotIndex].VMs.push({
            name: (datastoreVM ? datastoreVM.name : file.name.slice(0, -4)),
            host: (esxiHost ? esxiHost.name : 'Unknown'),
            state: (datastoreVM ? datastoreVM.runtime.powerState : 'Unknown'),
            size: (datastoreVM ? datastoreVM.storage.perDatastoreUsage.unshared : 'Unknown'),
            path: file.path + '/' + file.name,
            virtual: (link ? link.virtual : ''),
            vm: (datastoreVM ? datastoreVM : null)
          });

        }

      });

      this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');
      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connectionUuid)).then(() => {
        this.Modal.closeModal('.window--infrastructure-manager .window__main');
      });

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();
    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'getSnapshotFiles', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }

  createStorageSnapShot(connectionUuid: string, volume: NetAppVolume): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for create storage snapshot', arguments);
    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Create storage snapshot',
        text: `Do you want to create a Storage snapshot for ${volume['volume-id-attributes'].name} volume?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true) return;

        this.logger.debug('Infrastructure Manager', 'Creating storage snapshot', loggerArgs);
        this.Modal.openLittleModal('PLEASE WAIT', 'Creating volume snapshot', '.window--infrastructure-manager .window__main', 'plain').then(() => {

          return this.NetApp.createSnapshot(
            connection.credential,
            connection.host,
            connection.port,
            volume['volume-id-attributes']['owning-vserver-name'],
            volume['volume-id-attributes'].name
          );

        }).then((createSnapshotResult) => {
          if (createSnapshotResult.status === 'error') {
            throw {
              error: createSnapshotResult.error,
              description: 'Failed to get NetApp Volume Snapshot'
            };
          }

          this.logger.info('Infrastructure Manager', 'Storage snapshot created successfully', loggerArgs);
          this.Modal.changeModalType('success', '.window--infrastructure-manager .window__main');
          this.Modal.changeModalText(`Snapshot created successfully for volume ${volume['volume-id-attributes'].name}`, '.window--infrastructure-manager .window__main');

          // Refresh volume data to fetch the new snapshot
          return this.getVolumeData(connectionUuid, volume);
        });

      });

    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'createStorageSnapShot', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }

  deleteStorageSnapShot(connectionUuid: string, volume: NetAppVolume, snapshot: NetAppSnapshot): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for delete storage snapshot', arguments);
    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Delete storage snapshot',
        text: `Do you want to delete the storage snapshot ${snapshot.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true) return;

        this.logger.debug('Infrastructure Manager', 'Deleting storage snapshot', loggerArgs);
        this.Modal.openLittleModal('PLEASE WAIT', 'Deleting volume snapshot', '.window--infrastructure-manager .window__main', 'plain').then(() => {

          return this.NetApp.deleteSnapshot(
            connection.credential,
            connection.host,
            connection.port,
            volume['volume-id-attributes']['owning-vserver-name'],
            volume['volume-id-attributes'].name,
            snapshot.name,
            snapshot['snapshot-instance-uuid']
          );

        }).then((deleteSnapshotResult) => {
          if (deleteSnapshotResult.status === 'error') {
            throw {
              error: deleteSnapshotResult.error,
              description: 'Failed to delete NetApp Volume Snapshot'
            };
          }

          this.logger.info('Infrastructure Manager', 'Storage snapshot deleted successfully', loggerArgs);
          this.Modal.changeModalType('success', '.window--infrastructure-manager .window__main');
          this.Modal.changeModalText(`Snapshot ${snapshot.name} deleted successfully for volume ${volume['volume-id-attributes'].name}`, '.window--infrastructure-manager .window__main');

          // Refresh volume data to fetch the new snapshot
          return this.getVolumeData(connectionUuid, volume);
        });

      });

    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'deleteStorageSnapShot', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }



  registerFileSystemUiHandlers(): void {
    this.FileSystemUi.createHandler('folder', 'netapp', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Creating folder...', data.selector, 'plain').then(() => {

        return this.VMWare.MakeDirectory(
          data.connection,
          data.connection.name,
          data.currentPath + data.name,
          {$type: 'Datacenter', _value: data.connection.datacenter},
          true
        );

      }).then((createFolderResult) => {
        if (createFolderResult.status === 'error') throw {error: createFolderResult.error, description: 'Failed to create folder to VMWare'};

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'createFolderToDatastore', null, e.description);

        this.Modal.changeModalType('danger', data.selector);
        this.Modal.changeModalText(e.description, data.selector);

        throw e;
      });
    });

    this.FileSystemUi.createHandler('rename', 'netapp', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Moving file...', data.selector, 'plain').then(() => {

        return this.VMWare.MoveDatastoreFile_Task(
          data.connection,
          data.connection.name,
          data.currentPath + data.file.filename, // original file name
          {$type: 'Datacenter', _value: data.connection.datacenter},
          data.connection.name,
          data.currentPath + data.name, // new file name
          {$type: 'Datacenter', _value: data.connection.datacenter},
          false,
          true
        );

      }).then((renameFileResult) => {
        if (renameFileResult.status === 'error') throw {error: renameFileResult.error, description: 'Failed to rename file to VMWare'};

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'moveFileFromDatastore', null, e.description);

        this.Modal.changeModalType('danger', data.selector);
        this.Modal.changeModalText(e.description, data.selector);

        throw e;
      });
    });

    this.FileSystemUi.createHandler('delete', 'netapp', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Deleting file...', data.selector, 'plain').then(() => {

        return this.VMWare.DeleteDatastoreFile_Task(
          data.connection,
          data.connection.name,
          data.currentPath + data.file.filename,
          {$type: 'Datacenter', _value: data.connection.datacenter},
          true
        );

      }).then((deleteFileResult) => {
        if (deleteFileResult.status === 'error') throw {error: deleteFileResult.error, description: 'Failed to delete file to VMWare'};

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'deleteFileFromDatastore', null, e.description);

        this.Modal.changeModalType('danger', data.selector);
        this.Modal.changeModalText(e.description, data.selector);

        throw e;
      });
    });
  }
}

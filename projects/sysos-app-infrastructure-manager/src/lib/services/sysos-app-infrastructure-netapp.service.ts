import {Injectable} from '@angular/core';

import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibNetappService} from '@sysos/lib-netapp';
import {SysosLibVmwareService} from '@sysos/lib-vmware';

import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureVmwareService} from './sysos-app-infrastructure-vmware.service';
import {IMConnection} from '../types/imconnection';
import {NetAppVolume} from '../types/netapp-volume';
import {NetAppSnapshot} from '../types/netapp-snapshot';
import {NetAppVserver} from '../types/netapp-vserver';
import {VMWareVM} from '../types/vmware-vm';
import {VMWareObject} from '../types/vmware-object';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureNetappService {
  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
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
      this.logger.error(`Infrastructure Manager [${connection.uuid}] -> Error while getting NetApp data -> host [${connection.host}] -> ${e.description}`);

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
    this.logger.debug(`Infrastructure Manager [${connectionUuid}] -> getVolumeData -> volumeUuid [${volume['volume-id-attributes'].uuid}], volume [${volume['volume-id-attributes'].name}]`);
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
      this.logger.error(`Infrastructure Manager [${connectionUuid}] -> Error while getVolumeData -> volumeUuid [${volume['volume-id-attributes'].uuid}],
       volume [${volume['volume-id-attributes'].name}] -> ${e.description}`);

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
    this.logger.debug(`Infrastructure Manager [${connectionUuid}] -> getSnapshotFiles -> vserver [${vserver}], volume [${volume}, snapshot [${snapshot}]]`);

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
      this.logger.error(`Infrastructure Manager [${connectionUuid}] -> getSnapshotFiles -> volumeUuid [${volume['volume-id-attributes'].uuid}],
       volume [${volume['volume-id-attributes'].name}] -> ${e.description}`);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }

  createStorageSnapShot(connectionUuid: string, volume: NetAppVolume): void {
    this.logger.debug(`Infrastructure Manager [${connectionUuid}] -> Ask for create storage snapshot -> volumeUuid [${volume['volume-id-attributes'].uuid}],
     volume [${volume['volume-id-attributes'].name}]`);
    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Create storage snapshot',
        text: `Do you want to create a Storage snapshot for ${volume['volume-id-attributes'].name} volume?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true) return;

        this.logger.debug(`Infrastructure Manager [${connectionUuid}] -> Creating storage snapshot -> volumeUuid [${volume['volume-id-attributes'].uuid}],
         volume [${volume['volume-id-attributes'].name}]`);
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

          this.logger.info(`Infrastructure Manager [${connectionUuid}] -> Storage snapshot created successfully -> volumeUuid [${volume['volume-id-attributes'].uuid}],
           volume [${volume['volume-id-attributes'].name}`);
          this.Modal.changeModalType('success', '.window--infrastructure-manager .window__main');
          this.Modal.changeModalText(`Snapshot created successfully for volume ${volume['volume-id-attributes'].name}`, '.window--infrastructure-manager .window__main');

          // Refresh volume data to fetch the new snapshot
          return this.getVolumeData(connectionUuid, volume);
        });

      });

    }).catch((e) => {
      this.logger.error(`Infrastructure Manager [${connectionUuid}] -> createStorageSnapShot -> volumeUuid [${volume['volume-id-attributes'].uuid}],
       volume [${volume['volume-id-attributes'].name}] -> ${e.description}`);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }

  deleteStorageSnapShot(connectionUuid: string, volume: NetAppVolume, snapshot: NetAppSnapshot): void {
    this.logger.debug(`Infrastructure Manager [${connectionUuid}] -> Ask for delete storage snapshot -> volume [${volume['volume-id-attributes'].name}],
     snapshotUuid [${snapshot['snapshot-instance-uuid']}], snapshot [${snapshot.name}]`);
    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Delete storage snapshot',
        text: `Do you want to delete the storage snapshot ${snapshot.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true) return;

        this.logger.debug(`Infrastructure Manager [${connectionUuid}] -> Deleting storage snapshot -> volume [${volume['volume-id-attributes'].name}],
         snapshotUuid [${snapshot['snapshot-instance-uuid']}], snapshot [${snapshot.name}]`);
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

          this.logger.info(`Infrastructure Manager [${connectionUuid}] -> Storage snapshot deleted successfully -> volume [${volume['volume-id-attributes'].name}],
           snapshotUuid [${snapshot['snapshot-instance-uuid']}], snapshot [${snapshot.name}]`);
          this.Modal.changeModalType('success', '.window--infrastructure-manager .window__main');
          this.Modal.changeModalText(`Snapshot ${snapshot.name} deleted successfully for volume ${volume['volume-id-attributes'].name}`, '.window--infrastructure-manager .window__main');

          // Refresh volume data to fetch the new snapshot
          return this.getVolumeData(connectionUuid, volume);
        });

      });

    }).catch((e) => {
      this.logger.error(`Infrastructure Manager [${connectionUuid}] -> deleteStorageSnapShot -> volumeUuid [${volume['volume-id-attributes'].uuid}],
       volume [${volume['volume-id-attributes'].name}], snapshot [${snapshot.name}] -> ${e.description}`);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }

  /**
   * Storage Volume Snapshots Backup/Restore
   */
  mountSnapShotAsDatastore(storageUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot): void {
    this.logger.debug(`Infrastructure Manager [${snapshot['snapshot-instance-uuid']}] -> Ask for mount storage snapshot into a datastore -> snapshot [${snapshot.name}]`);

    if (!Array.isArray(vserver['allowed-protocols'].protocol) ||
      (!vserver['allowed-protocols'].protocol.includes('nfs') &&
        !vserver['allowed-protocols'].protocol.includes('iscsi') &&
        !vserver['allowed-protocols'].protocol.includes('fcp'))
    ) {
      this.Modal.openLittleModal(
        'UNABLE TO PROCEED',
        'The selected Snapshot belongs to a Vserver without any supported protocol (NFS, FC/FCoE, iSCSI) configured.',
        '.window--infrastructure-manager .window__main',
        'plain'
      ).then();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Mount Snapshot as Datastore',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug(`Infrastructure Manager ${snapshot['snapshot-instance-uuid']} -> Launching Backups Manager for mounting storage snapshot into a datastore -> snapshot [${snapshot.name}]`);

          this.InfrastructureManager.openBackupsManager(storageUuid, 'mount_restore_datastore', {
            storage: this.InfrastructureManager.getConnectionByUuid(storageUuid),
            vserver,
            volume,
            snapshot
          });

        }
      });
    });
  }

  restoreVolumeFiles(storageUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot): void {
    this.logger.debug(`Infrastructure Manager [${snapshot['snapshot-instance-uuid']}] -> Ask for mount storage snapshot into a datastore to restore files -> snapshot [${snapshot.name}]`);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore Datastore Files',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host and restore datastore files?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug(`Infrastructure Manager [${snapshot['snapshot-instance-uuid']}] -> Launching Backups Manager for restoring a volume files -> snapshot [${snapshot.name}]`);

          this.InfrastructureManager.openBackupsManager(storageUuid, 'restore_datastore_files', {
            storage: this.InfrastructureManager.getConnectionByUuid(storageUuid),
            vserver,
            volume,
            snapshot
          });

        }
      });
    });
  }

  instantVM(storageUuid: string, virtualUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot, vm: VMWareObject & { info: { data: VMWareVM } }): void {
    if (storageUuid === null) {
      console.log(vm);
      this.VMWare.getVMState(
        this.InfrastructureManager.getConnectionByUuid(virtualUuid).credential,
        this.InfrastructureManager.getConnectionByUuid(virtualUuid).host,
        this.InfrastructureManager.getConnectionByUuid(virtualUuid).port,
        vm.info.obj.name,
        true).then((vmData) => {
          console.log(vmData);
      });
      return;
    }
    // Not linked VM
    /*if (!vm.data) {

      vm.data = {
        name: vm.name,
        summary: {
          config: {
            vmPathName: `[${volume['volume-id-attributes'].name}] ${vm.path}`
          }
        }
      };
    }*/

    this.logger.debug(`Infrastructure Manager [${vm.info.obj.name}] -> Ask for Instant VM recovery -> vm [${vm.name}]`);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Instant VM recovery',
        text: `Do you want to perform an Instant VM recovery of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug(`Infrastructure Manager [${vm.info.obj.name}] -> Launching Backups Manager for Instant VM recovery -> vm [${vm.name}]`);

          this.InfrastructureManager.openBackupsManager(storageUuid, 'vm_instant_recovery', {
            storage: this.InfrastructureManager.getConnectionByUuid(storageUuid),
            virtual: this.InfrastructureManager.getConnectionByUuid(virtualUuid),
            vserver,
            volume,
            snapshot,
            vm
          });

        }
      });
    });
  }

  restoreVM(storageUuid: string, virtualUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot, vm: VMWareObject & { info: { data: VMWareVM } }): void {
    this.logger.debug(`Infrastructure Manager [${vm.info.obj.name}] -> Ask for restore entire VM -> vm [${vm.name}]`);

    if (!vm.info.data) {
      this.Modal.openLittleModal(
        'Error while restoring Backup',
        `Not found any linked VirtualMachine for ${vm.name}, maybe original VM was deleted from vCenter. Try doing an Instant VM restore`,
        '.window--infrastructure-manager .window__main',
        'plain'
      ).then();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore entire VM',
        text: `Do you want to perform a entire VM restore of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug(`Infrastructure Manager [${vm.info.obj.name}] -> Launching Backups Manager for restore entire VM -> vm [${vm.name}]`);

          this.InfrastructureManager.openBackupsManager(storageUuid, 'restore_vm', {
            storage: this.InfrastructureManager.getConnectionByUuid(storageUuid),
            virtual: this.InfrastructureManager.getConnectionByUuid(virtualUuid),
            vserver,
            volume,
            snapshot,
            vm,
          });

        }
      });
    });
  }

  restoreGuestFiles(storageUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot, vm: VMWareObject & { info: { data: VMWareVM } }): void {
    this.logger.debug(`Infrastructure Manager [${vm.info.obj.name}] -> Ask for recovery VM Guest Files -> vm [${vm.name}]`);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore guest files',
        text: `Do you want to perform a VM Guest Files recovery of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug(`Infrastructure Manager [${vm.info.obj.name}] -> Launching Backups Manager for restore entire VM -> vm [${vm.name}]`);

          this.InfrastructureManager.openBackupsManager(storageUuid, 'restore_vm_guest_files', {
            storage: storageUuid,
            vserver,
            volume,
            snapshot,
            vm
          });

        }
      });
    });
  }

  backupVM(connectionUuid: string, vm: VMWareObject & { info: { data: VMWareVM } }): void {
    this.logger.debug(`Infrastructure Manager [${vm.info.obj.name}] -> Launching VM Backup -> vm [${vm.name}]`);

    // TODO: ManagedObjectReference is an array even if all VM files are in same datastore
    if (!this.InfrastructureManager.getLinkByVMwareDatastore(connectionUuid, vm.info.data.datastore.ManagedObjectReference[0].name)) {
      this.Modal.openLittleModal(
        'Error while creating Backup',
        'Not found any compatible NetApp storage. Make sure VMs that you want to backup are inside a NetApp volume and this is managed by SysOS.',
        '.window--infrastructure-manager .window__main',
        'plain'
      ).then();
      return;
    }

    this.InfrastructureManager.openBackupsManager(connectionUuid, 'backup_vm', {
      vm
    });

  }
}

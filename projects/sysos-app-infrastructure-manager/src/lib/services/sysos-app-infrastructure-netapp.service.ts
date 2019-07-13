import {Injectable} from '@angular/core';

import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';

import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibNetappService} from '@sysos/lib-netapp';

import {IMConnection} from '../types/imconnection';
import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureVmwareService} from './sysos-app-infrastructure-vmware.service';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureNetappService {
  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private Applications: SysosLibApplicationService,
              private NetApp: SysosLibNetappService,
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
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get NetApp System Version');

      // TODO: check if version is

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base = {
        buildtimestamp: res.data.build_timestamp,
        isclustered: res.data.is_clustered,
        version: res.data.version,
        versiontuple: res.data.version_tuple
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

      Object.entries(res[7].data).forEach(([key, vserver]) => {

        if (vserver['vserver-type'] === 'admin') this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base.name = vserver['vserver-name'];

        // GET Volumes per vServer
        if (vserver['vserver-type'] === 'data') {

          // Get qtrees
          vsPromises.push(this.NetApp.getQtrees(connection.credential, connection.host, connection.port, vserver['vserver-name']).then((qtrees) => {
            if (qtrees.status === 'error') throw new Error('Failed to get qtrees');

            this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Qtrees = qtrees.data;
          }));

          vsPromises.push(this.NetApp.getVolumes(connection.credential, connection.host, connection.port, vserver['vserver-name']).then((volumes) => {
            if (volumes.status === 'error') throw new Error('Failed to get volumes');

            this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Volumes = volumes.data;

            // For each Volume
            Object.entries(volumes.data).forEach(([v, volume]) => {

              // Get all LUNS
              shPromises.push(this.NetApp.getLuns(connection.credential, connection.host, connection.port, vserver['vserver-name'], volume['volume-id-attributes'].name).then((luns) => {
                if (luns.status === 'error') throw new Error('Failed to get LUNs');

                this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Volumes[v].Luns = luns.data;
              }));

              // Get all Snapshots
              shPromises.push(this.NetApp.getSnapshots(connection.credential, connection.host, connection.port, vserver['vserver-name'], volume['volume-id-attributes'].name).then((snapshots) => {
                if (snapshots.status === 'error') throw new Error('Failed to get snapshots');

                this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Volumes[v].Snapshots = snapshots.data;

                // For each snapshot
                Object.entries(snapshots.data).forEach(([s, snapshot]: any) => {

                  // Get snapshot creation date
                  shDataPromises.push(this.NetApp.getSnapshotFileInfo(
                    connection.credential, connection.host, connection.port,
                    vserver['vserver-name'],
                    volume['volume-id-attributes'].name,
                    snapshot.name
                  ).then((snapRes) => {
                    if (snapRes.status === 'error') throw new Error('Failed to get Snapshot creation date');

                    this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Volumes[v].Snapshots[s].Data = snapRes.data;
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

      // TODO: Check if any volume is mounted to a managed virtual node and link it.
      return this.InfrastructureManager.checkLinkBetweenManagedNodes('netapp', connection.uuid);

    }).then(() => {
      this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');

      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid));
      this.Modal.closeModal('.window--infrastructure-manager .window__main');

      this.Toastr.success('NetApp connection added successfully');

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();

    }).catch((e) => {
      this.Modal.closeModal('.window--infrastructure-manager .window__main');
      this.InfrastructureManager.setActiveConnection(null);

      this.InfrastructureManager.deleteConnection(connection.uuid);

      if (e.message === 'ENOTFOUND') {
        return this.Toastr.error(`Host not found (${connection.host})`, 'Error trying to connect to NetApp');
      }

      if (e.message === 'ETIMEDOUT') {
        return this.Toastr.error(`Timeout while connecting to ${connection.host}`, 'Error trying to connect to NetApp');
      }

      this.Toastr.error(e.message, 'Error getting data from NetApp');
      throw new Error(e);
    });
  }

  /**
   * @description
   * Refresh NetApp volume data
   */
  getVolumeData(connectionUuid: string, volume: {[key: string]: any}): void {
    this.logger.debug('Infrastructure Manager [%s] -> getVolumeData -> volume [%s]', volume['volume-id-attributes'].uuid, volume['volume-id-attributes'].name);
    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    const vserverIndex = this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers.findIndex((item) => {
      return item['vserver-name'] === volume['volume-id-attributes']['owning-vserver-name'];
    });
    const volumeIndex = this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[vserverIndex].Volumes.findIndex((item) => {
      return item['volume-id-attributes'].name === volume['volume-id-attributes'].name;
    });

    this.Modal.openLittleModal('PLEASE WAIT', 'Getting NetApp Volume data...', '.window--infrastructure-manager .window__main', 'plain');

    this.NetApp.getSnapshots(
      connection.credential,
      connection.host,
      connection.port,
      volume['volume-id-attributes']['owning-vserver-name'],
      volume['volume-id-attributes'].name
    ).then((res) => {
      if (res.status === 'error') {
        this.logger.error('Infrastructure Manager [%s] -> Error creating storage snapshot -> volume [%s] -> ',
          volume['volume-id-attributes'].uuid, volume['volume-id-attributes'].name, res.error.reason);

        this.Toastr.error(res.error.reason, 'Create Volume Snapshot');
        throw new Error('Failed to get snapshots');
      }

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots = res.data;

      this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');
      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid));

      this.Modal.closeModal('.window--infrastructure-manager .window__main');

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();
    }).catch((e) => {
      this.Modal.closeModal('.window--infrastructure-manager .window__main');
      throw e;
    });
  }

  /**
   * @description
   * Fetch NetApp SnapShots
   */
  getSnapshotFiles(uuid: string, host: string, vserver: string, volume: string, snapshot: string) {
    let link;
    let datastoreIndex;
    let datastoreVM;
    let esxiHost;

    const vserverIndex = this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers.findIndex((item) => {
      return item['vserver-name'] === vserver;
    });
    const volumeIndex = this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers[vserverIndex].Volumes.findIndex((item) => {
      return item['volume-id-attributes'].name === volume;
    });
    const snapshotIndex = this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots.findIndex((item) => {
      return item.name === snapshot;
    });

    // Already fetched files from storage, don't ask for it again
    if (this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots[snapshotIndex].Files) return Promise.resolve();
    this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots[snapshotIndex].VMs = [];

    this.Modal.openLittleModal('PLEASE WAIT', 'Getting Snapshot data...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

      return this.NetApp.getSnapshotFiles(this.InfrastructureManager.getConnectionByUuid(uuid).credential, host, this.InfrastructureManager.getConnectionByUuid(uuid).port, vserver, volume, snapshot);

    }).then((files) => {
      if (files.status === 'error') throw new Error('Failed to get Snapshot files');

      this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots[snapshotIndex].Files = files.data;

      // Check every file
      files.data.forEach(file => {

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
            uuid,
            this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers[vserverIndex].Volumes[volumeIndex]['volume-id-attributes'].uuid,
            this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers[vserverIndex].Volumes[volumeIndex]['volume-id-attributes']['junction-path']
          );

          if (link) {

            // Get datastoreIndex using returned link
            datastoreIndex = this.InfrastructureManager.getConnectionByUuid(link.virtual).data.Datastores.findIndex((item) => {
              return item.obj.name === link.esxi_datastore;
            });

            // Make the $filter only if VMs found in this datastore
            if (this.InfrastructureManager.getConnectionByUuid(link.virtual).data.Datastores[datastoreIndex].vm.hasOwnProperty('ManagedObjectReference')) {

              // Search for VM using returned Storage file .vmx path
              datastoreVM  = this.InfrastructureManager.getConnectionByUuid(link.virtual).data.VMs.filter((obj) => {
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

          this.InfrastructureManager.getConnectionByUuid(uuid).data.Vservers[vserverIndex].Volumes[volumeIndex].Snapshots[snapshotIndex].VMs.push({
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

      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(uuid));

      this.Modal.closeModal('.window--infrastructure-manager .window__main');

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();
    }).catch((e) => {
      this.Modal.closeModal('.window--infrastructure-manager .window__main');
      throw e;
    });
  }

  createStorageSnapShot(connectionUuid: string, volume: {[key: string]: any}): void {
    this.logger.debug('Infrastructure Manager [%s] -> Ask for create storage snapshot -> volume [%s]', volume['volume-id-attributes'].uuid, volume['volume-id-attributes'].name);
    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Create storage snapshot',
        text: `Do you want to create a Storage snapshot for ${volume['volume-id-attributes'].name} volume?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true)  return;

        this.logger.debug('Infrastructure Manager [%s] -> Creating storage snapshot -> volume [%s]', volume['volume-id-attributes'].uuid, volume['volume-id-attributes'].name);

        this.Modal.openLittleModal('PLEASE WAIT', 'Creating volume snapshot', '.window--infrastructure-manager .window__main', 'plain');

        return this.NetApp.createSnapshot(
          connection.credential,
          connection.host,
          connection.port,
          volume['volume-id-attributes']['owning-vserver-name'],
          volume['volume-id-attributes'].name
        ).then((res) => {
          if (res.status === 'error') {
            this.logger.error('Infrastructure Manager [%s] -> Error creating storage snapshot -> volume [%s] -> ',
              volume['volume-id-attributes'].uuid, volume['volume-id-attributes'].name, res.error.reason);

            this.Toastr.error(res.error.reason, 'Create Volume Snapshot');
            throw new Error('Failed to create Volume Snapshot');
          }

          this.logger.debug('Infrastructure Manager [%s] -> Storage snapshot created successfully -> volume [%s]',
            volume['volume-id-attributes'].uuid, volume['volume-id-attributes'].name);

          this.Modal.closeModal('.window--infrastructure-manager .window__main');
          this.Toastr.success(`Snapshot created successfully for volume ${volume['volume-id-attributes'].name}`, 'Create Volume Snapshot');

          // Refresh volume data to fetch the new snapshot
          return this.getVolumeData(connectionUuid, volume);
        });

      });

    }).catch((e) => {
      this.Modal.closeModal('.window--infrastructure-manager .window__main');
      throw e;
    });
  }

  deleteStorageSnapShot(connectionUuid: string, volume: {[key: string]: any}, snapshot: {[key: string]: any}): void {
    this.logger.debug('Infrastructure Manager [%s] -> Ask for delete storage snapshot -> snapshot [%s]', snapshot['snapshot-instance-uuid'], snapshot.name);
    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Delete storage snapshot',
        text: `Do you want to delete the storage snapshot ${snapshot.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true)  return;

        this.logger.debug('Infrastructure Manager [%s] -> Deleting storage snapshot -> snapshot [%s]', snapshot['snapshot-instance-uuid'], snapshot.name);

        this.Modal.openLittleModal('PLEASE WAIT', 'Deleting volume snapshot', '.window--infrastructure-manager .window__main', 'plain');

        return this.NetApp.deleteSnapshot(
          connection.credential,
          connection.host,
          connection.port,
          volume['volume-id-attributes']['owning-vserver-name'],
          volume['volume-id-attributes'].name,
          snapshot.name,
          snapshot['snapshot-instance-uuid']
        ).then((res) => {
          if (res.status === 'error') {
            this.logger.error('Infrastructure Manager [%s] -> Error deleting storage snapshot -> snapshot [%s], volume [%s] -> ',
              snapshot['snapshot-instance-uuid'], snapshot.name, volume['volume-id-attributes'].name, res.error.reason);

            this.Toastr.error(res.error.reason, 'Delete Volume Snapshot');
            throw new Error('Failed to delete Volume Snapshot');
          }

          this.logger.debug('Infrastructure Manager [%s] -> Storage snapshot deleted successfully -> napshot [%s], volume [%s]',
            snapshot['snapshot-instance-uuid'], snapshot.name, volume['volume-id-attributes'].name);

          this.Modal.closeModal('.window--infrastructure-manager .window__main');
          this.Toastr.success(`Snapshot ${snapshot.name} deleted successfully for volume ${volume['volume-id-attributes'].name}`, 'Create Volume Snapshot');

          // Refresh volume data to fetch the new snapshot
          return this.getVolumeData(connectionUuid, volume);
        });

      });

    }).catch((e) => {
      this.Modal.closeModal('.window--infrastructure-manager .window__main');
      throw e;
    });
  }

  openBackupsManager(connectionUuid: string, type: string, data: {[key: string]: any}) {
    this.logger.debug('Infrastructure Manager [%s] -> Opening Backups Manager APP', connectionUuid);

    this.Applications.openApplication('backups-manager', {
      data,
      type,
      credential: this.InfrastructureManager.getConnectionByUuid(connectionUuid).credential,
      host: this.InfrastructureManager.getConnectionByUuid(connectionUuid).host,
      port: this.InfrastructureManager.getConnectionByUuid(connectionUuid).port
    });
  }

  /**
   * Storage Volume Snapshots
   */
  mountSnapShotAsDatastore(connectionUuid: string, vserver: {[key: string]: any}, volume: {[key: string]: any}, snapshot: {[key: string]: any}): void {
    this.logger.debug('Infrastructure Manager [%s] -> Ask for mount storage snapshot into a datastore -> snapshot [%s]', snapshot['snapshot-instance-uuid'], snapshot.name);

    console.log(vserver);

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
      );
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

          this.logger.debug(`Infrastructure Manager ${snapshot['snapshot-instance-uuid']} -> Launching Backups Manager for mounting storage snapshot into a datastore -> snapshot ${snapshot.name}`);

          this.openBackupsManager(connectionUuid, 'mount_restore_datastore', {
            storage: this.InfrastructureManager.getConnectionByUuid(connectionUuid),
            vserver,
            volume,
            snapshot
          });

        }
      });
    });
  }

  restoreVolumeFiles(connectionUuid: string, vserver: {[key: string]: any}, volume: {[key: string]: any}, snapshot: {[key: string]: any}): void {
    this.logger.debug('Infrastructure Manager [%s] -> Ask for mount storage snapshot into a datastore to restore files -> snapshot [%s]', snapshot['snapshot-instance-uuid'], snapshot.name);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore Datastore Files',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host and restore datastore files?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager [%s] -> Launching Backups Manager for restoring a volume files -> snapshot [%s]', snapshot['snapshot-instance-uuid'], snapshot.name);

          this.openBackupsManager(connectionUuid, 'restore_datastore_files', {
            storage: this.InfrastructureManager.getConnectionByUuid(connectionUuid),
            vserver,
            volume,
            snapshot
          });

        }
      });
    });
  }

  instantVM(connectionUuid: string, vserver: {[key: string]: any}, volume: {[key: string]: any}, snapshot: {[key: string]: any}, vm: {[key: string]: any}): void {
    // Not linked VM
    if (vm.vm === null) {

      vm.vm = {
        vm: 'unknown',
        name: vm.name,
        summary: {
          config: {
            vmPathName: `[${volume['volume-id-attributes'].name}] ${vm.path}`
          }
        }
      };
    }

    this.logger.debug('Infrastructure Manager [%s] -> Ask for Instant VM recovery -> vm [%s]', vm.vm.vm, vm.name);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Instant VM recovery',
        text: `Do you want to perform an Instant VM recovery of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager [%s] -> Launching Backups Manager for Instant VM recovery -> vm [%s]', vm.vm.vm, vm.name);

          this.openBackupsManager(connectionUuid, 'vm_instant_recovery', {
            storage: this.InfrastructureManager.getConnectionByUuid(connectionUuid),
            vserver,
            volume,
            snapshot,
            vm: vm.vm
          });

        }
      });
    });
  }

  restoreVM(connectionUuid: string, vserver: {[key: string]: any}, volume: {[key: string]: any}, snapshot: {[key: string]: any}, vm: {[key: string]: any}): void {
    this.logger.debug('Infrastructure Manager [%s] -> Ask for restore entire VM -> vm [%s]', vm.vm.vm, vm.name);

    if (vm.vm === null) {
      this.Modal.openLittleModal(
        'Error while restoring Backup',
        `Not found any linked VirtualMachine for ${vm.name}, maybe original VM was deleted from vCenter. Try doing an Instant VM restore`,
        '.window--smanager .window__main',
        'plain'
      );
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

          this.logger.debug('Infrastructure Manager [%s] -> Launching Backups Manager for restore entire VM -> vm [%s]', vm.vm.vm, vm.name);

          this.openBackupsManager(connectionUuid, 'restore_vm', {
            storage: this.InfrastructureManager.getConnectionByUuid(connectionUuid),
            vserver,
            volume,
            snapshot,
            vm: vm.vm,
            virtual: vm.virtual
          });

        }
      });
    });
  }

  restoreGuestFiles(connectionUuid: string, vserver: {[key: string]: any}, volume: {[key: string]: any}, snapshot: {[key: string]: any}, vm: {[key: string]: any}): void {
    this.logger.debug('Infrastructure Manager [%s] -> Ask for recovery VM Guest Files -> vm [%s]', vm.vm.vm, vm.name);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore guest files',
        text: `Do you want to perform a VM Guest Files recovery of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager [%s] -> Launching Backups Manager for restore entire VM -> vm [%s]', vm.vm.vm, vm.name);

          this.openBackupsManager(connectionUuid, 'restore_vm_guest_files', {
            storage: connectionUuid,
            vserver,
            volume,
            snapshot,
            vm: vm.vm
          });

        }
      });
    });
  }

  backupVM(connectionUuid: string, vm: {[key: string]: any}): void {
    this.logger.debug('Infrastructure Manager [%s] -> Launching VM Backup -> vm [%s]', vm.vm, vm.name);

    if (!this.InfrastructureManager.getLinkByVMwareDatastore(connectionUuid, vm.datastore.ManagedObjectReference.name)) {
      this.Modal.openLittleModal(
        'Error while creating Backup',
        'Not found any compatible NetApp storage. Make sure VMs that you want to backup are inside a NetApp volume and this is managed by SysOS.',
        '.window--infrastructure-manager .window__main',
        'plain'
      );
      return;
    }

    this.openBackupsManager(connectionUuid, 'backup_vm', {
      vm: vm.vm
    });

  }
}

import {Injectable} from '@angular/core';

import {ToastrService} from 'ngx-toastr';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibNetappService} from '@anyopsos/lib-netapp';
import {AnyOpsOSLibVmwareService} from '@anyopsos/lib-vmware';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSAppInfrastructureManagerService} from '../anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerObjectHelperService} from '../anyopsos-app-infrastructure-manager-object-helper.service';
import {AnyOpsOSAppInfrastructureManagerNodeLinkService} from '../anyopsos-app-infrastructure-manager-node-link.service';

import {ConnectionNetapp} from '../../types/connections/connection-netapp';
import {ImDataObject} from '../../types/im-data-object';
import {NetAppVolume} from '../../types/netapp-volume';
import {NetAppSnapshot} from '../../types/netapp-snapshot';
import {NetAppVserver} from '../../types/netapp-vserver';
import {VMWareDatastore} from '../../types/vmware-datastore';
import {VMWareVM} from '../../types/vmware-vm';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureNetappService {
  constructor(private logger: AnyOpsOSLibLoggerService,
              private Toastr: ToastrService,
              private Modal: AnyOpsOSLibModalService,
              private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private NetApp: AnyOpsOSLibNetappService,
              private VMWare: AnyOpsOSLibVmwareService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelper: AnyOpsOSAppInfrastructureManagerObjectHelperService,
              private InfrastructureManagerNodeLink: AnyOpsOSAppInfrastructureManagerNodeLinkService) {
  }

  /**
   * Get all data from NetApp node
   */
  getNetAppData(connection: ConnectionNetapp): void {
    const loggerArgs = arguments;

    /* TODO: GET netappinfo from SNMP OID:
     1.3.6.1.4.1.789.1.1.2.0
     1.3.6.1.2.1.1.5.0
     1.3.6.1.4.1.789.1.1.7.0
     */

    // On initial connection the modal will be already open, on connection Refresh, the modal will be closed
    if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
      this.Modal.changeModalText('Connecting to NetApp...', '.window--infrastructure-manager .window__main');
    } else {
      this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to NetApp...', '.window--infrastructure-manager .window__main', 'plain');
    }

    this.NetApp.getSystemVersion(connection.credential, connection.host, connection.port).then((systemVersionResult) => {
      if (systemVersionResult.status === 'error') {
        throw {error: systemVersionResult.error, description: 'Failed to get NetApp System Version'};
      }

      // TODO: check if version is compatible with anyOpsOS

      (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionNetapp).data.Base = {
        ...(this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionNetapp).data.Base,
        buildtimestamp: systemVersionResult.data.build_timestamp,
        isclustered: systemVersionResult.data.is_clustered,
        version: systemVersionResult.data.version,
        versiontuple: systemVersionResult.data.version_tuple
      };

      this.Modal.changeModalText('Getting NetApp data...', '.window--infrastructure-manager .window__main');

      // Get interfaces and basic data
      return Promise.all([
        this.NetApp.getNetInterfaces(connection.credential, connection.host, connection.port),
        this.NetApp.getFcpInterfaces(connection.credential, connection.host, connection.port),
        this.NetApp.getFcpAdapters(connection.credential, connection.host, connection.port),
        this.NetApp.getMetrocluster(connection.credential, connection.host, connection.port),
        this.NetApp.getClusterIdentity(connection.credential, connection.host, connection.port),
        this.NetApp.getLicenses(connection.credential, connection.host, connection.port),
        this.NetApp.getOntapiVersion(connection.credential, connection.host, connection.port)
      ]);

    }).then((res) => {
      if (res[0].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Network Interfaces'};
      if (res[1].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp FCP Interfaces'};
      if (res[2].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp FCP Adapters'};
      if (res[3].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Metrocluster data'};
      if (res[4].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Cluster Identity'};
      if (res[5].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Licenses'};
      if (res[6].status === 'error') throw {error: res[0].error, description: 'Failed to get NetApp Ontapi Version'};

      // Reset data array
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Data = [];

      // Set interfaces
      this.parseObjects(connection, 'netiface', res[0].data);
      this.parseObjects(connection, 'fcpiface', res[1].data);
      this.parseObjects(connection, 'fcpadapter', res[2].data);

      // Set cluster data
      (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionNetapp).data.Base.metrocluster = res[3].data;
      (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionNetapp).data.Base.cluster = res[4].data;
      (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionNetapp).data.Base.licenses = res[5].data;
      (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionNetapp).data.Base.ontapi_version = res[6].data;

      this.Modal.changeModalText('Getting NetApp vServers...', '.window--infrastructure-manager .window__main');

      return this.NetApp.getVservers(connection.credential, connection.host, connection.port);
    }).then((vServersResult) => {
      if (vServersResult.status === 'error') throw {error: vServersResult.error, description: 'Failed to get NetApp Vservers'};

      // Set vServers
      this.parseObjects(connection, 'vserver', vServersResult.data);

      this.Modal.changeModalText('Getting NetApp vServers data...', '.window--infrastructure-manager .window__main');

      const vServers: (ImDataObject & { info: { data: NetAppVserver } })[] = this.InfrastructureManagerObjectHelper.getObjectsByType(connection.uuid, 'vserver');
      return Promise.all(vServers.map(async (vServer: ImDataObject & { info: { data: NetAppVserver } }) => {

        // This is the main vServer
        if (vServer.info.data['vserver-type'] === 'admin') (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionNetapp).data.Base.name = vServer.name;

        // GET Volumes per vServer
        if (vServer.info.data['vserver-type'] === 'data') {
          await this.getQtrees(connection, vServer);
          await this.getVolumes(connection, vServer);
        }
      }));

    }).then(() => {
      this.saveNewData(connection).then(() => {
        this.Toastr.success('NetApp connection added successfully');

        // Set connection as Good
        this.InfrastructureManager.getConnectionByUuid(connection.uuid).state = 'connected';
      });

    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getting NetApp data', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText((e.description ? e.description : e.message), '.window--infrastructure-manager .window__main');
      }

      this.InfrastructureManager.setActiveConnection(null);

      this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from NetApp');

      throw e;
    });
  }

  private saveNewData(connection: ConnectionNetapp): Promise<void> {
    this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');

    return this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid)).then(() => {
      this.Modal.closeModal('.window--infrastructure-manager .window__main');

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();
    });
  }

  private getVolumes(connection: ConnectionNetapp, vServer: ImDataObject & { info: { data: NetAppVserver } }): Promise<void> {

    this.Modal.changeModalText('Getting NetApp Volume data...', '.window--infrastructure-manager .window__main');

    // Get Volumes
    return this.NetApp.getVolumes(
      connection.credential, connection.host, connection.port,
      vServer.name
    ).then(async (volumesResult) => {
      if (volumesResult.status === 'error') {
        throw {error: volumesResult.error, description: 'Failed to get NetApp Volumes'};
      }

      // Set Volumes
      const volumeParent: { type: string; name: string; } = vServer.info.obj;
      this.parseObjects(connection, 'volume', volumesResult.data, volumeParent);

      // Get Luns and Snapshots from each volume
      const volumes: (ImDataObject & { info: { data: NetAppVolume } })[] = this.InfrastructureManagerObjectHelper.getObjectsByType(connection.uuid, 'volume');
      await Promise.all(volumes.map(async (volume: ImDataObject & { info: { data: NetAppVolume } }) => {

        await Promise.all([
          this.getVolumeLuns(connection, vServer, volume),
          this.getVolumeSnapshots(connection, vServer, volume)
        ]);

      }));

    });
  }

  private getVolumeLuns(connection: ConnectionNetapp, vServer: ImDataObject & { info: { data: NetAppVserver } }, volume: ImDataObject & { info: { data: NetAppVolume } }): Promise<void> {

    return this.NetApp.getLuns(
      connection.credential, connection.host, connection.port,
      vServer.name,
      volume.name
    ).then((lunsResult) => {
      if (lunsResult.status === 'error') {
        throw {error: lunsResult.error, description: 'Failed to get NetApp LUNs'};
      }

      // Set Luns
      const lunParent: { type: string; name: string; } = volume.info.obj;
      this.parseObjects(connection, 'lun', lunsResult.data, lunParent);
    });
  }

  private getVolumeSnapshots(connection: ConnectionNetapp, vServer: ImDataObject & { info: { data: NetAppVserver } }, volume: ImDataObject & { info: { data: NetAppVolume } }): Promise<void> {

    this.Modal.changeModalText('Getting NetApp Volume Snapshot data...', '.window--infrastructure-manager .window__main');

    return this.NetApp.getSnapshots(
      connection.credential, connection.host, connection.port,
      vServer.name,
      volume.name
    ).then(async (snapshotsResult) => {
      if (snapshotsResult.status === 'error') {
        throw {error: snapshotsResult.error, description: 'Failed to get NetApp LUNs'};
      }

      // Set Snapshots
      const snapshotParent: { type: string; name: string; } = volume.info.obj;
      this.parseObjects(connection, 'snapshot', snapshotsResult.data, snapshotParent);

      // Get information of each snapshot
      const snapshots: (ImDataObject & { info: { data: NetAppSnapshot } })[] = this.InfrastructureManagerObjectHelper.getObjectsByType(connection.uuid, 'snapshot');
      await Promise.all(snapshots.map(async (snapshot: ImDataObject & { info: { data: NetAppSnapshot } }) => {

        await this.NetApp.getSnapshotFileInfo(
          connection.credential, connection.host, connection.port,
          vServer.name,
          volume.name,
          snapshot.name
        ).then((snapshotFileResult) => {
          if (snapshotFileResult.status === 'error') {
            throw {error: snapshotFileResult.error, description: 'Failed to get NetApp Snapshot creation date'};
          }

          snapshot.info.data.extraData = snapshotFileResult.data;
        });
      })); // each snapshot
    });
  }

  private getQtrees(connection: ConnectionNetapp, vServer: ImDataObject): Promise<void> {

    return this.NetApp.getQtrees(connection.credential, connection.host, connection.port, vServer.name).then((qtreesResult) => {
      if (qtreesResult.status === 'error') {
        throw {
          error: qtreesResult.error,
          description: 'Failed to get NetApp Qtrees'
        };
      }

      // TODO
      // this.parseObjects(connection, 'qtree', qtreesResult.data);

      // this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Vservers[key].Qtrees = qtreesResult.data;
    });
  }

  /**
   * Set each returned object in an anyOpsOS readable way
   */
  private parseObjects(connection: ConnectionNetapp, type: string, objects: any[], parent: { type: string; name: string; } = null): void {
    objects.forEach((obj) => {
      return this.parseObject(connection, type, obj, parent);
    });
  }

  private parseObject(connection: ConnectionNetapp, type: string, object: any, parent: { type: string; name: string; }): void {
    let name: string = '';
    let idName: string = '';

    if (type === 'netiface') {
      name = object['interface-name'];
      idName = object['lif-uuid'];
    }

    if (type === 'fcpiface') {
      name = object['interface-name'];
      idName = object['lif-uuid'];
    }

    if (type === 'fcpadapter') {
      name = object['info-name'];
      idName = object.adapter;
    }

    if (type === 'vserver') {
      name = object['vserver-name'];
      idName = object.uuid;
    }

    if (type === 'volume') {
      name = object['volume-id-attributes'].name;
      idName = object['volume-id-attributes'].uuid;
    }

    if (type === 'lun') {
      name = object.uuid; // TODO
      idName = object.uuid;
    }

    if (type === 'snapshot') {
      name = object.name;
      idName = object['snapshot-instance-uuid'];
    }

    const obj = {
      type,
      name: idName
    };

    this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Data.push({
      name,
      type: obj.type,
      info: {
        uuid: `${connection.uuid};\u003c${obj.name}:${obj.type}\u003e`,
        mainUuid: connection.uuid,
        parent,
        obj,
        data: object
      }
    } as ImDataObject);
  }

  /**
   * Refresh NetApp volume data. This is called from context-menu
   */
  getVolumeData(volume: ImDataObject & { info: { data: NetAppVolume } }): Promise<void> {
    const loggerArgs = arguments;

    const connection: ConnectionNetapp = this.InfrastructureManager.getConnectionByUuid(volume.info.mainUuid) as ConnectionNetapp;
    const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connection.uuid, 'vserver', volume.info.parent);

    // Deleting or creating a Volume Snapshot will launch this function, and Modal will be already opened
    if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
      this.Modal.changeModalText('Getting NetApp data...', '.window--infrastructure-manager .window__main');
    } else {
      this.Modal.openLittleModal('PLEASE WAIT', 'Getting NetApp data...', '.window--infrastructure-manager .window__main', 'plain');
    }

    return this.getVolumeSnapshots(connection, vServer, volume).then(() => {
      return this.saveNewData(connection);
    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getVolumeData', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText((e.description ? e.description : e.message), '.window--infrastructure-manager .window__main');
      }

      this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from NetApp');

      throw e;
    });
  }

  /**
   * Fetch NetApp SnapShots
   */
  getSnapshotFiles(snapshot: ImDataObject & { info: { data: NetAppSnapshot } }) {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'getSnapshotFiles', arguments);

    if (snapshot.info.data.Files) return;
    snapshot.info.data.VMs = [];

    const connection: ConnectionNetapp = this.InfrastructureManager.getConnectionByUuid(snapshot.info.mainUuid) as ConnectionNetapp;
    const volume: ImDataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connection.uuid, 'volume', snapshot.info.parent);
    const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connection.uuid, 'vserver', volume.info.parent);
    const linkedDatastores: (ImDataObject & { info: { data: VMWareDatastore } })[] = this.InfrastructureManagerNodeLink.checkStorageVolumeLinkWithManagedVMWareDatastore(volume);

    this.Modal.openLittleModal('PLEASE WAIT', 'Getting Snapshot data...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

      // Get snapshot files on root path
      return this.NetApp.getSnapshotFiles(
        connection.credential,
        connection.host,
        connection.port,
        vServer,
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

      snapshot.info.data.Files = snapshotFilesResult.data;

      // Check every file
      snapshotFilesResult.data.forEach(file => {

        // Is not a VM
        if (file.name.substr(file.name.length - 4) !== '.vmx') return;

        // No link with Snapshot Volume found
        if (linkedDatastores.length === 0) {
          return snapshot.info.data.VMs.push({
            path: file.path + '/' + file.name
          });
        }

        // Search VM matching vmx file in linked Datastores
        linkedDatastores.forEach((datastoreObj) => {

          const matchingVMs = [];

          // Get matching VMs on linkedDatastores
          if (datastoreObj.info.data.vm && datastoreObj.info.data.vm[0].ManagedObjectReference) {

            if (Array.isArray(datastoreObj.info.data.vm[0].ManagedObjectReference)) {
              Array.isArray(datastoreObj.info.data.vm[0].ManagedObjectReference.forEach((vmData) => {

                const currentVM: ImDataObject & { info: { data: VMWareVM } } = this.InfrastructureManagerObjectHelper.getObjectByUuid(
                  datastoreObj.info.mainUuid,
                  `${datastoreObj.info.mainUuid};\u003c${vmData.name}:${vmData.type}\u003e`
                );
                if (currentVM.info.data.files.vmPathName === `[${datastoreObj.name}] ${file.path.substring(1)}/${file.name}`) matchingVMs.push(currentVM);

              }));
            } else {

              const currentVM: ImDataObject & { info: { data: VMWareVM } } = this.InfrastructureManagerObjectHelper.getObjectByUuid(
                datastoreObj.info.mainUuid,
                `${datastoreObj.info.mainUuid};\u003c${datastoreObj.info.data.vm[0].ManagedObjectReference.name}:${datastoreObj.info.data.vm[0].ManagedObjectReference.type}\u003e`
              );
              if (currentVM.info.data.files.vmPathName === `[${datastoreObj.name}] ${file.path.substring(1)}/${file.name}`) matchingVMs.push(currentVM);

            }
          }

          if (matchingVMs) {
            snapshot.info.data.VMs.push(...matchingVMs);

          // No matching VM found. VM not inside this Datastore anymore (erased or moved to another Datastore)
          } else {
            snapshot.info.data.VMs.push({
              path: file.path + '/' + file.name
            });
          }
        });

        this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');
        this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid)).then(() => {
          this.Modal.closeModal('.window--infrastructure-manager .window__main');
        });

        // Tell InfrastructureManager that we changed connections data
        this.InfrastructureManager.connectionsUpdated();
      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'getSnapshotFiles', loggerArgs, e.description);

        if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
          this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
          this.Modal.changeModalText((e.description ? e.description : e.message), '.window--infrastructure-manager .window__main');
        }

        throw e;
      });

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
        this.Modal.changeModalText((e.description ? e.description : e.message), data.selector);

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
        this.Modal.changeModalText((e.description ? e.description : e.message), data.selector);

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
        this.Modal.changeModalText((e.description ? e.description : e.message), data.selector);

        throw e;
      });
    });
  }
}

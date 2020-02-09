import {Injectable} from '@angular/core';

import {ConnectionNetapp} from '@anyopsos/module-netapp';
import {DataObject} from '@anyopsos/backend/app/types/data-object';

import {AnyOpsOSLibNetappSoapApiService} from './anyopsos-lib-netapp-soap-api.service';
import {NetAppSnapshot, NetAppVolume, NetAppVserver} from '@anyopsos/module-netapp/src';
import {VMWareDatastore, VMWareVM} from '@anyopsos/module-vmware/src';
import {map} from 'rxjs/operators';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNetappSoapApiHelpersService {

  constructor(private readonly LibNetappSoapApiService: AnyOpsOSLibNetappSoapApiService) {
  }

  /**
   * Refresh NetApp volume data. This is called from context-menu
   */
  async getVolumeData(volume: DataObject & { info: { data: NetAppVolume } }): Promise<void> {

    /*const connection: ConnectionNetapp = this.InfrastructureManager.getConnectionByUuid(volume.info.mainUuid) as ConnectionNetapp;
    const vServer: DataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connection.uuid, 'vserver', volume.info.parent);

    // Deleting or creating a Volume Snapshot will launch this function, and Modal will be already opened
    if (this.LibModal.isModalOpened('.window--infrastructure-manager .window__main')) {
      this.LibModal.changeModalText('Getting NetApp data...', '.window--infrastructure-manager .window__main');
    } else {
      this.LibModal.openLittleModal('PLEASE WAIT', 'Getting NetApp data...', '.window--infrastructure-manager .window__main', 'plain');
    }

    return this.getVolumeSnapshots(connection, vServer, volume).then(() => {
      return this.saveNewData(connection);
    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getVolumeData from NetApp', loggerArgs, e.description);

      if (this.LibModal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.LibModal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.LibModal.changeModalText((e.description ? e.description : e.message), '.window--infrastructure-manager .window__main');
      }

      throw e;
    });*/
  }

  /**
   * Fetch NetApp SnapShots
   */
  /*getSnapshotFiles(snapshot: DataObject & { info: { data: NetAppSnapshot } }) {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'getSnapshotFiles', arguments);

    if (snapshot.info.data.Files) return;
    snapshot.info.data.VMs = [];

    const connection: ConnectionNetapp = this.InfrastructureManager.getConnectionByUuid(snapshot.info.mainUuid) as ConnectionNetapp;
    const volume: DataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connection.uuid, 'volume', snapshot.info.parent);
    const vServer: DataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connection.uuid, 'vserver', volume.info.parent);
    const linkedDatastores: (DataObject & { info: { data: VMWareDatastore } })[] = this.InfrastructureManagerNodeLink.checkStorageVolumeLinkWithManagedVMWareDatastore(volume);

    this.LibModal.openLittleModal('PLEASE WAIT', 'Getting Snapshot data...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

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

                const currentVM: DataObject & { info: { data: VMWareVM } } = this.InfrastructureManagerObjectHelper.getObjectByUuid(
                  datastoreObj.info.mainUuid,
                  `${datastoreObj.info.mainUuid}#vmware;\u003c${vmData.name}:${vmData.type}\u003e`
                );
                if (currentVM.info.data.files.vmPathName === `[${datastoreObj.name}] ${file.path.substring(1)}/${file.name}`) matchingVMs.push(currentVM);

              }));
            } else {

              const currentVM: DataObject & { info: { data: VMWareVM } } = this.InfrastructureManagerObjectHelper.getObjectByUuid(
                datastoreObj.info.mainUuid,
                `${datastoreObj.info.mainUuid}#vmware;\u003c${datastoreObj.info.data.vm[0].ManagedObjectReference.name}:${datastoreObj.info.data.vm[0].ManagedObjectReference.type}\u003e`
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

        this.LibModal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');
        this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid)).then(() => {
          this.LibModal.closeModal('.window--infrastructure-manager .window__main');
        });

        // Tell InfrastructureManager that we changed connections data
        this.InfrastructureManager.connectionsUpdated();
      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'getSnapshotFiles', loggerArgs, e.description);

        if (this.LibModal.isModalOpened('.window--infrastructure-manager .window__main')) {
          this.LibModal.changeModalType('danger', '.window--infrastructure-manager .window__main');
          this.LibModal.changeModalText((e.description ? e.description : e.message), '.window--infrastructure-manager .window__main');
        }

        throw e;
      });

    });
  }


  getSnapshotFiles(connectionUuid, volume, snapshot, path = '', results = [], nextTag = null): any {
    const diPromises = [];
    const xml = `
<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
  <file-list-directory-iter>
    <path>/vol/${volume}/.snapshot/${snapshot}${path}</path>
    ${nextTag ? '<tag>' + nextTag + '</tag>' : ''}
  </file-list-directory-iter>
</netapp>`;

    return this.doCall(credentialUuid, host, port, xml).pipe(map((snapshotFilesResult: BackendResponse) => {
      if (snapshotFilesResult.status === 'error') return snapshotFilesResult;

      // attributes-list could be 0 length on second+ iteration caused by max-results and next-tag.
      if (snapshotFilesResult.data['attributes-list']) {

        // For each file found
        snapshotFilesResult.data['attributes-list'][0]['file-info'].forEach(file => {
          file = this.parseNetAppObject(file);
          if (file.name === '.' || file.name === '..') return;

          file.path = path;
          results.push(file);

          // Get directories
          if (file['file-type'] === 'directory') {
            diPromises.push(this.getSnapshotFiles(credentialUuid, host, port, vfiler, volume, snapshot, path + '/' + file.name, results));
          }
        });

        // if directory found
        if (diPromises.length > 0) {

          // Get all files in each found directory
          return Promise.all(diPromises).then(res => {

            res = res[0].data;

            if (snapshotFilesResult.data['next-tag']) {
              nextTag = snapshotFilesResult.data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
              return this.getSnapshotFiles(credentialUuid, host, port, vfiler, volume, snapshot, path, res, nextTag);
            }

            return this.validResponse(res);

          });
        }

        if (snapshotFilesResult.data['next-tag']) {
          nextTag = snapshotFilesResult.data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return this.getSnapshotFiles(credentialUuid, host, port, vfiler, volume, snapshot, path, results, nextTag);
        }
      }

      return this.validResponse(results);
    })).toPromise();
  }*/

}

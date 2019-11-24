import {Injectable} from '@angular/core';

import {ToastrService} from 'ngx-toastr';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibVmwareService} from '@anyopsos/lib-vmware';

import {AnyOpsOSAppInfrastructureManagerService} from '../anyopsos-app-infrastructure-manager.service';
import {ImDataObject} from '../../types/im-data-object';
import {ConnectionVmware} from '../../types/connections/connection-vmware';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureVmwareService {
  constructor(private logger: AnyOpsOSLibLoggerService,
              private Toastr: ToastrService,
              private Modal: AnyOpsOSLibModalService,
              private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private VMWare: AnyOpsOSLibVmwareService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  /**
   * Gets all data from a vCenter
   */
  getVMWareData(connection: ConnectionVmware): void {
    const loggerArgs = arguments;

    // On initial connection the modal will be already open, on connection Refresh, the modal will be closed
    if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
      this.Modal.changeModalText('Connecting to vCenter/ESXi...', '.window--infrastructure-manager .window__main');
    } else {
      this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter/ESXi...', '.window--infrastructure-manager .window__main', 'plain');
    }

    this.VMWare.connectvCenterSoap(connection).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') throw {error: connectSoapResult.error, description: 'Failed to connect to VMWare'};

      // Get client version
      return this.VMWare.getClientVersion(connection);
    }).then((clientVersionResult) => {
      if (clientVersionResult.status === 'error') throw {error: clientVersionResult.error, description: 'Failed to connect to VMWare'};

      if (clientVersionResult.data.version[0] < 6) throw new Error('VMWare version not compatible');

      (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionVmware).data.Base = {
        ...(this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionVmware).data.Base,
        apiVersion: clientVersionResult.data.apiVersion[0],
        downloadUrl: clientVersionResult.data.downloadUrl[0],
        exactVersion: clientVersionResult.data.exactVersion[0],
        flexClientVersion: clientVersionResult.data.flexClientVersion[0],
        patchVersion: clientVersionResult.data.patchVersion[0],
        version: clientVersionResult.data.version[0],
        authdPort: (clientVersionResult.data.authdPort ? clientVersionResult.data.authdPort[0] : null),
        type: (clientVersionResult.data.authdPort ? 'ESXi' : 'vCenter')
      };

      this.Modal.changeModalText('Checking anyOpsOS extension...', '.window--infrastructure-manager .window__main');

      // Get anyOpsOS management extension
      return this.VMWare.FindExtension(
        connection,
        'com.anyopsos.management'
      );
    }).then((findExtensionResult: any) => {
      if (findExtensionResult.status === 'error') throw {error: findExtensionResult.error, description: 'Failed to get anyOpsOS extension to VMWare'};

      // anyOpsOS extension if not registered
      // TODO: only if user accept to install the extension
      if (!findExtensionResult.data.returnval) return this.VMWare.registeranyOpsOSExtension(connection);

    }).then(() => {

      this.Modal.changeModalText('Getting data...', '.window--infrastructure-manager .window__main');

      return this.VMWare.createAllBasicDataFilter(connection);
    }).then((dataFilterResult) => {
      if (dataFilterResult.status === 'error') throw {error: dataFilterResult.error, description: 'Failed to set data filter to VMWare'};

      // Reset data array
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Data = [];

      return this.getWaitForUpdatesEx(connection);
    }).then(() => {

      // Set connection as Good
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).state = 'connected';

      this.Modal.closeModal('.window--infrastructure-manager .window__main');
      this.Toastr.success('VMWare connection added successfully');

    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getting VMWare data', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText((e.description ? e.description : e.message), '.window--infrastructure-manager .window__main');
      }

      this.InfrastructureManager.setActiveConnection(null);

      this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from VMWare');

      throw e;
    });
  }

  /**
   * Gets and prepares vmware objects data (VMs, Hosts, Networks....)
   */
  private getWaitForUpdatesEx(connection: ConnectionVmware): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Updating VMWare data', arguments);

    const haveNextVersion: number = (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionVmware).data.nextVersion;

    return this.VMWare.WaitForUpdatesEx(
      connection,
      { maxWaitSeconds: 0 },
      (haveNextVersion ? haveNextVersion : null)
    ).then((getWaitForUpdateResult) => {
      // TODO merge new data
      // Save connection
      console.log(getWaitForUpdateResult);
      if (getWaitForUpdateResult.status === 'error') throw {error: getWaitForUpdateResult.error, description: 'Failed to get data from VMWare'};

      (this.InfrastructureManager.getConnectionByUuid(connection.uuid) as ConnectionVmware).data.nextVersion = getWaitForUpdateResult.data.returnval[0].version;

      this.parseObjects(connection, getWaitForUpdateResult.data.returnval[0].filterSet[0].objectSet);

      // Modal will be opened on 1st iteration by @getVMWareData
      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');
      }

      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid));

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();
    }).then(() => {

      // Update VMWare data each minute
      setTimeout(() => {
        return this.getWaitForUpdatesEx(connection);
      }, 60000);
    });
  }

  /**
   * Set each returned object in an anyOpsOS readable way
   */
  private parseObjects(connection: ConnectionVmware, objects: any[]): void {
    objects.forEach((obj) => {
      return this.parseObject(connection, obj);
    });
  }

  private parseObject(connection: ConnectionVmware, object: any): void {

    // Is a modification of existing object
    if (object.kind === 'modify') {
      const existingObject: ImDataObject = this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Data.find((obj: ImDataObject) => {
        return obj.info.uuid === `${connection.uuid};\u003c${object.obj.name}:${object.obj.type}\u003e`;
      });

      console.log(JSON.parse(JSON.stringify(existingObject)));

      existingObject.info.data[object.changeSet.name] = { ...existingObject.info.data[object.changeSet.name], ...object.changeSet.val };

      console.log(JSON.parse(JSON.stringify(existingObject)));
    }

    // New object
    if (object.kind === 'enter') {

      // Set basic object data
      const newObj: any = {
        type: object.obj.type,
        info: {
          uuid: `${connection.uuid};\u003c${object.obj.name}:${object.obj.type}\u003e`,
          mainUuid: connection.uuid,
          obj: object.obj,
          data: {}
        }
      };

      // Check changeSet
      object.changeSet.forEach((obj) => {

        // Assign new properties
        if (obj.op === 'assign') {

          if (obj.name === 'name') {
            newObj.name = obj.val;
          } else if (obj.name === 'parent') {
            newObj.info[obj.name] = (obj.val ? obj.val : null);
          } else {
            newObj.info.data[obj.name] = (obj.hasOwnProperty('val') ? obj.val : null);
          }

        }
      });

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Data.push(newObj as ImDataObject);
    }
  }

  /**
   * Register File handlers. What to do when create/delate/rename file/folders.....
   */
  registerFileSystemUiHandlers(): void {
    this.FileSystemUi.createHandler('folder', 'vmware', (data) => {
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

    this.FileSystemUi.createHandler('rename', 'vmware', (data) => {
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

    this.FileSystemUi.createHandler('delete', 'vmware', (data) => {
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

import {Injectable} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {ToastrService} from 'ngx-toastr';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysosLibVmwareService} from '@sysos/lib-vmware';

import {SysosAppInfrastructureManagerService} from '../sysos-app-infrastructure-manager.service';
import {IMConnection} from '../../types/imconnection';
import {IMESXiHost} from '../../types/imesxi-hosts';
import {VMWareVM} from '../../types/vmware-vm';
import {VMWareObject} from '../../types/vmware-object';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureVmwareService {
  constructor(private logger: SysosLibLoggerService,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private VMWare: SysosLibVmwareService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {
  }

  /**
   * Gets all data from a vCenter
   */
  getVMWareData(connection: IMConnection): void {
    const loggerArgs = arguments;

    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter/ESXi...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

      // Login to SOAP vmware
      return this.VMWare.connectvCenterSoap(connection);
    }).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') throw {error: connectSoapResult.error, description: 'Failed to connect to VMWare'};

      // Get client version
      return this.VMWare.getClientVersion(connection);
    }).then((clientVersionResult) => {
      if (clientVersionResult.status === 'error') throw {error: clientVersionResult.error, description: 'Failed to connect to VMWare'};

      if (clientVersionResult.data.version[0] < 6) throw new Error('VMWare version not compatible');

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base = {
        apiVersion: clientVersionResult.data.apiVersion[0],
        downloadUrl: clientVersionResult.data.downloadUrl[0],
        exactVersion: clientVersionResult.data.exactVersion[0],
        flexClientVersion: clientVersionResult.data.flexClientVersion[0],
        patchVersion: clientVersionResult.data.patchVersion[0],
        version: clientVersionResult.data.version[0],
        authdPort: (clientVersionResult.data.authdPort ? clientVersionResult.data.authdPort[0] : null),
        type: (clientVersionResult.data.authdPort ? 'ESXi' : 'vCenter')
      };

      this.Modal.changeModalText('Checking SysOS extension...', '.window--infrastructure-manager .window__main');

      // Get SysOS management extension
      return this.VMWare.FindExtension(
        connection,
        'com.sysos.management'
      );
    }).then((findExtensionResult: any) => {
      if (findExtensionResult.status === 'error') throw {error: findExtensionResult.error, description: 'Failed to get SysOS extension to VMWare'};

      // SysOS extension if not registered
      if (!findExtensionResult.data.returnval) return this.VMWare.registerSysOSExtension(connection);

    }).then(() => {

      this.Modal.changeModalText('Getting data...', '.window--infrastructure-manager .window__main');

      return this.VMWare.createAllBasicDataFilter(connection);
    }).then((dataFilterResult) => {
      if (dataFilterResult.status === 'error') throw {error: dataFilterResult.error, description: 'Failed to set data filter to VMWare'};

      return this.VMWare.WaitForUpdatesEx(
        connection,
        { maxWaitSeconds: 0 }
      );
    }).then((getWaitForUpdateResult) => {
      if (getWaitForUpdateResult.status === 'error') throw {error: getWaitForUpdateResult.error, description: 'Failed to get data from VMWare'};

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Data = getWaitForUpdateResult.data.returnval.filterSet.objectSet;

      // Check if any datastore is from a managed storage system and link it.
      return this.InfrastructureManager.checkLinkBetweenManagedNodes('vmware', connection.uuid);
    }).then(() => {

      // Set connection as Good
      this.InfrastructureManager.getConnectionByUuid(connection.uuid).state = 'connected';

      this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');

      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid)).then(() => {
        this.Modal.closeModal('.window--infrastructure-manager .window__main');
        this.Toastr.success('VMWare connection added successfully');
      });

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();

    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getting VMWare data', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      this.InfrastructureManager.setActiveConnection(null);
      this.InfrastructureManager.deleteConnection(connection.uuid);

      this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from VMWare');

      throw e;
    });
  }

  /**
   * Gets all ESXi hosts from all existing vCenter connections
   */
  getESXihosts(): IMESXiHost[] {
    const connections = this.InfrastructureManager.getConnectionsByType('vmware');
    const ESXihosts: IMESXiHost[] = [];

    connections.forEach((vCenter: IMConnection) => {

      const hosts = vCenter.data.Data.filter(obj => {
        return obj.type === 'HostSystem';
      });

      // TODO: create host type
      hosts.forEach((host: VMWareObject & { info: { data: any } }) => {

        // Setup basic connection information required for "Backups Manager" application
        ESXihosts.push({
          virtual: {
            uuid: vCenter.uuid,
            credential: vCenter.credential,
            host: vCenter.host,
            port: vCenter.port,
          },
          host: {
            connectionState: host.info.data.runtime.connectionState,
            host: host.info.obj.name,
            name: host.info.name,
            powerState: host.info.data.runtime.powerState
          }
        });

      });
    });

    return ESXihosts;
  }

  /**
   * Perform basic VM operations
   */
  doWithVM(connectionUuid: string, vm: VMWareObject & { info: { data: VMWareVM } }, action: 'powerOn'|'powerOff'|'suspend'|'reset'|'powerOffGuestOS'|'restartGuestOS'|'refresh'): void {

    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.VMWare.connectvCenterSoap(connection).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') throw {error: connectSoapResult.error, description: 'Failed to connect to VMWare'};

      return this.VMWare.getVMRuntime(
        connection,
        vm.info.obj.name
      );
    }).then((vmRuntimeResult) => {
      if (vmRuntimeResult.status === 'error') throw {error: vmRuntimeResult.error, description: 'Failed to get VM runtime'};

      // powerOn
      if (action === 'powerOn') {
        if (vmRuntimeResult.data.propSet.runtime.powerState === 'poweredOn') return vmRuntimeResult;
        return this.VMWare.PowerOnVM_Task(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name},
          {$type: 'HostSystem', _value: vmRuntimeResult.data.propSet.runtime.host.name},
          true
        );
      }

      // powerOff
      if (action === 'powerOff') {
        if (vmRuntimeResult.data.propSet.runtime.powerState === 'poweredOff') return vmRuntimeResult;
        return this.VMWare.PowerOffVM_Task(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name},
          true
        );
      }

      // suspend
      if (action === 'suspend') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.SuspendVM_Task(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name},
          true
        );
      }

      // reset
      if (action === 'reset') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.ResetVM_Task(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name},
          true
        );
      }

      // powerOffGuestOS
      if (action === 'powerOffGuestOS') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.ShutdownGuest(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name}
        );
      }

      // restartGuestOS
      if (action === 'restartGuestOS') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.RebootGuest(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name}
        );
      }

      // refresh
      if (action === 'refresh') {
        // TODO: still needed?
      }

    }).then((vmActionResult) => {
      if (vmActionResult.status === 'error') throw {error: vmActionResult.error, description: `Failed to ${action} off VM`};
    }).catch((e) => {
      this.Toastr.error((e.description ? e.description : e.message), `Error while ${action} on VMWare VM`);

      throw e;
    });

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
        this.Modal.changeModalText(e.description, data.selector);

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
        this.Modal.changeModalText(e.description, data.selector);

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
        this.Modal.changeModalText(e.description, data.selector);

        throw e;
      });
    });
  }

}
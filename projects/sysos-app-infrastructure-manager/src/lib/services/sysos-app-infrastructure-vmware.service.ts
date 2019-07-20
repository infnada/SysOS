import {Injectable} from '@angular/core';

import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysosLibVmwareService} from '@sysos/lib-vmware';

import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';
import {IMConnection} from '../types/imconnection';
import {IMESXiHost} from '../types/imesxi-hosts';
import {VMWareVM} from "../types/vmware-vm";
import {VMWareObject} from "../types/vmware-object";
import {NetAppVserver} from "../types/netapp-vserver";
import {NetAppVolume} from "../types/netapp-volume";
import {NetAppSnapshot} from "../types/netapp-snapshot";

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureVmwareService {
  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private VMWare: SysosLibVmwareService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {
  }

  getVMWareData(connection: IMConnection): void {

    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter/ESXi...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

      // Login to SOAP vmware
      return this.VMWare.connectvCenterSoap(connection.credential, connection.host, connection.port);
    }).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') throw {error: connectSoapResult.error, description: 'Failed to connect to VMWare'};

      // Get client version
      return this.VMWare.getClientVersion(connection.host, connection.port);
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
      return this.VMWare.findSysOSExtension(connection.credential, connection.host, connection.port);
    }).then((findExtensionResult) => {
      if (findExtensionResult.status === 'error') throw {error: findExtensionResult.error, description: 'Failed to get SysOS extension to VMWare'};

      // SysOS extension if not registered
      if (!findExtensionResult.data.returnval) return this.VMWare.registerExtension(connection.credential, connection.host, connection.port);

    }).then(() => {

      this.Modal.changeModalText('Getting data...', '.window--infrastructure-manager .window__main');

      return this.VMWare.createAllBasicDataFilter(connection.credential, connection.host, connection.port);
    }).then((dataFilterResult) => {
      if (dataFilterResult.status === 'error') throw {error: dataFilterResult.error, description: 'Failed to set data filter to VMWare'};

      return this.VMWare.getWaitForUpdatesEx(connection.credential, connection.host, connection.port);
    }).then((getWaitForUpdateResult) => {
      if (getWaitForUpdateResult.status === 'error') throw {error: getWaitForUpdateResult.error, description: 'Failed to set data filter to VMWare'};

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Data = getWaitForUpdateResult.data.returnval.filterSet.objectSet;

      // Check if any datastore is from a managed storage system and link it.
      return this.InfrastructureManager.checkLinkBetweenManagedNodes('vmware', connection.uuid);
    }).then(() => {

      this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');

      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid)).then(() => {
        this.Modal.closeModal('.window--infrastructure-manager .window__main');
        this.Toastr.success('VMWare connection added successfully');
      });

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();

    }).catch((e) => {
      this.logger.error(`Infrastructure Manager [${connection.uuid}] -> Error while getting VMWare data -> host [${connection.host}] -> ${e.description}`);

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
   * @description
   * Gets all ESXi hosts from all existing vCenter connections
   */
  getESXihosts(): IMESXiHost[] {
    const connections = this.InfrastructureManager.getConnectionsByType('vmware');
    const ESXihosts: IMESXiHost[] = [];

    connections.forEach((vCenter: IMConnection) => {

      const hosts = vCenter.data.Data.filter(obj => {
        return obj.type === 'HostSystem';
      });

      hosts.forEach(host => {

        // Setup basic connection information required for "Backups Manager" application
        ESXihosts.push({
          virtual: {
            uuid: vCenter.uuid,
            credential: vCenter.credential,
            host: vCenter.host,
            port: vCenter.port,
          },
          host: {
            connectionState: host.runtime.connectionState,
            host: host.obj.name,
            name: host.name,
            powerState: host.runtime.powerState
          }
        });

      });
    });

    return ESXihosts;
  }

  doWithVM(connectionUuid: string, vm: VMWareObject & { data: VMWareVM }, action: 'powerOn'|'powerOff'|'suspend'|'reset'|'powerOffGuestOS'|'restartGuestOS'|'refresh'): void {

    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.VMWare.connectvCenterSoap(connection.credential, connection.host, connection.port).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') throw {error: connectSoapResult.error, description: 'Failed to connect to VMWare'};

      return this.VMWare.getVMRuntime(connection.credential, connection.host, connection.port, vm.obj.name);
    }).then((vmRuntimeResult) => {
      if (vmRuntimeResult.status === 'error') throw {error: vmRuntimeResult.error, description: 'Failed to get VM runtime'};

      // powerOn
      if (action === 'powerOn') {
        if (vmRuntimeResult.data.propSet.runtime.powerState === 'poweredOn') return vmRuntimeResult;
        return this.VMWare.powerOnVM(connection.credential, connection.host, connection.port, vmRuntimeResult.data.propSet.runtime.host.name, vm.obj.name);
      }

      // powerOff
      if (action === 'powerOff') {
        if (vmRuntimeResult.data.propSet.runtime.powerState === 'poweredOff') return vmRuntimeResult;
        return this.VMWare.powerOffVM(connection.credential, connection.host, connection.port, vm.obj.name);
      }

      // suspend
      if (action === 'suspend') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.suspendVM(connection.credential, connection.host, connection.port, vm.obj.name);
      }

      // reset
      if (action === 'reset') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.resetVM(connection.credential, connection.host, connection.port, vm.obj.name);
      }

      // powerOffGuestOS
      if (action === 'powerOffGuestOS') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.shutdownGuest(connection.credential, connection.host, connection.port, vm.obj.name);
      }

      // restartGuestOS
      if (action === 'restartGuestOS') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.rebootGuest(connection.credential, connection.host, connection.port, vm.obj.name);
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
   * Get Parent object by object type
   */
  getParentObjectByType(connectionUuid: string, type: string, ofParent: string) {
    const parentObject = this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.find((vmwareObj: VMWareObject) => {
      return vmwareObj.obj.name === ofParent;
    });

    if (parentObject.type === type) return parentObject.obj.name;
    return this.getParentObjectByType(connectionUuid, type, parentObject.parent.name);
  }

  /**
   * Returns all VMWare objects by specific type
   */
  getObjectByType(connectionUuid: string, type: string): VMWareObject & { data: any }[] {
    return this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.filter((vmwareObj: VMWareObject) => {
      return vmwareObj.type === type;
    });
  }

  /**
   * Returns VMWare object by specific id
   */
  getObjectById(connectionUuid: string, objectId: string): VMWareObject & { data: any } {
    return this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.find((vmwareObj: {} & { data: VMWareObject }) => {
      return vmwareObj.data.obj.name === objectId;
    }).data;
  }

  registerFileSystemUiHandlers(): void {
    this.FileSystemUi.createHandler('folder', 'vmware', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Creating folder...', data.selector, 'plain').then(() => {

        return this.VMWare.createFolderToDatastore(
          data.connection.credential,
          data.connection.host,
          data.connection.port,
          data.connection.name,
          data.currentPath + data.name,
          data.connection.datacenter
        );

      }).then((createFolderResult) => {
        if (createFolderResult.status === 'error') throw {error: createFolderResult.error, description: 'Failed to create folder to VMWare'};

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((e) => {
        this.logger.error(`Infrastructure Manager [${data.connection.uuid}] -> createFolderToDatastore -> host [${data.connection.host}] -> ${e.description}`);

        this.Modal.changeModalType('danger', data.selector);
        this.Modal.changeModalText(e.description, data.selector);

        throw e
      });
    });

    this.FileSystemUi.createHandler('rename', 'vmware', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Moving file...', data.selector, 'plain').then(() => {

        return this.VMWare.moveFileFromDatastore(
          data.connection.credential,
          data.connection.host,
          data.connection.port,
          data.connection.name,
          data.currentPath + data.file.filename, // original file name
          data.connection.datacenter,
          data.connection.name,
          data.currentPath + data.name, // new file name
          data.connection.datacenter
        );

      }).then((renameFileResult) => {
        if (renameFileResult.status === 'error') throw {error: renameFileResult.error, description: 'Failed to rename file to VMWare'};

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((e) => {
        this.logger.error(`Infrastructure Manager [${data.connection.uuid}] -> moveFileFromDatastore -> host [${data.connection.host}] -> ${e.description}`);

        this.Modal.changeModalType('danger', data.selector);
        this.Modal.changeModalText(e.description, data.selector);

        throw e
      });
    });

    this.FileSystemUi.createHandler('delete', 'vmware', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Deleting file...', data.selector, 'plain').then(() => {

        return this.VMWare.deleteFileFromDatastore(
          data.connection.credential,
          data.connection.host,
          data.connection.port,
          data.connection.name,
          data.currentPath + data.file.filename,
          data.connection.datacenter
        );

      }).then((deleteFileResult) => {
        if (deleteFileResult.status === 'error') throw {error: deleteFileResult.error, description: 'Failed to delete file to VMWare'};

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((e) => {
        this.logger.error(`Infrastructure Manager [${data.connection.uuid}] -> deleteFileFromDatastore -> host [${data.connection.host}] -> ${e.description}`);

        this.Modal.changeModalType('danger', data.selector);
        this.Modal.changeModalText(e.description, data.selector);

        throw e
      });
    });
  }

  /**
   * VM Backup/Restore
   */
  instantVM(virtualUuid: string, vm: VMWareObject & { data: VMWareVM }): void {
    this.logger.debug(`Infrastructure Manager [${vm.obj.name}] -> Ask for Instant VM recovery -> vm [${vm.name}]`);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Instant VM recovery',
        text: `Do you want to perform an Instant VM recovery of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug(`Infrastructure Manager [${vm.obj.name}] -> Launching Backups Manager for Instant VM recovery -> vm [${vm.name}]`);

          this.InfrastructureManager.openBackupsManager(virtualUuid, 'vm_instant_recovery', {
            virtual: this.InfrastructureManager.getConnectionByUuid(virtualUuid),
            vm
          });

        }
      });
    });
  }

  restoreVM(virtualUuid: string, vm: VMWareObject & { data: VMWareVM }): void {
    this.logger.debug(`Infrastructure Manager [${vm.obj.name}] -> Ask for restore entire VM -> vm [${vm.name}]`);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore entire VM',
        text: `Do you want to perform a entire VM restore of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug(`Infrastructure Manager [${vm.obj.name}] -> Launching Backups Manager for restore entire VM -> vm [${vm.name}]`);

          this.InfrastructureManager.openBackupsManager(virtualUuid, 'restore_vm', {
            virtual: this.InfrastructureManager.getConnectionByUuid(virtualUuid),
            vm
          });

        }
      });
    });
  }
}

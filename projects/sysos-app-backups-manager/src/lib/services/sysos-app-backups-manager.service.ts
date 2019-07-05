import {Injectable} from '@angular/core';

import {NGXLogger} from "ngx-logger";
import {ToastrService} from "ngx-toastr";
import {v4 as uuidv4} from 'uuid';

import {SysosLibFileSystemService} from "@sysos/lib-file-system";
import {IMESXiHost} from "@sysos/app-infrastructure-manager";
import {SysosLibModalService} from "@sysos/lib-modal";
import {SysosLibApplicationService} from "@sysos/lib-application";

import {SysosAppBackupsManagerHelpersService} from "./sysos-app-backups-manager-helpers.service";

@Injectable({
  providedIn: 'root'
})
export class SysosAppBackupsManagerService {

  private restores;
  private backups;

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private Applications: SysosLibApplicationService,
              private FileSystem: SysosLibFileSystemService,
              private BackupManagerHelpers: SysosAppBackupsManagerHelpersService) {
  }

  initBackups() {
    this.FileSystem.getConfigFile('applications/backups-manager/backups.json').subscribe(
    (res) => {
      this.logger.info('Backups Manager Factory -> Get backups successfully');

      this.backups(res.data);
    },
    error => {
      this.logger.error('Backups Manager Factory -> Error while getting backups -> ', error);
      return this.Toastr.error('Error getting backups.', 'Backups Manager');
    });
  }

  initRestores() {
    this.FileSystem.getConfigFile('applications/backups-manager/restores.json').subscribe(
    (res) => {
      this.logger.info('Backups Manager Factory -> Get restores successfully');

      this.restores(res.data);
    },
    error => {
      this.logger.error('Backups Manager Factory -> Error while getting restores -> ', error);
      return this.Toastr.error('Error getting restores.', 'Backups Manager');
    });
  }

  mountRestoreDatastore(data) {
    this.logger.debug('Backups Manager [%s] -> Received event [%s] -> Initializing mount of datastore [%s] from -> storage [%s], vserver [%s], snapshot [%s]', data.uuid, event.name, data.volume['volume-id-attributes'].name, data.netapp_host, data.vserver['vserver-name'], data.snapshot);

    data.type = 'mount_restore_datastore';
    data.restore_name = 'Datastore mount (' + data.volume['volume-id-attributes'].name + ')';
    data.uuid = uuidv4();

    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.netapp_credential = data.storage.credential;
    data.netapp_host = data.storage.host;
    data.netapp_port = data.storage.port;
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });
    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('ESXiSelectable', '.window--backups-manager .window__main',
      {
        title: 'Select ESXi host',
        ESXihosts: data.ESXihosts
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: IMESXiHost) => {

        data.esxi_credential = result.connection_credential;
        data.esxi_address = result.connection_address;
        data.esxi_port = result.connection_port;
        data.esxi_host = result.host;
        data.esxi_datacenter = result.datacenter;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host', data.uuid, result.host);

        this.Modal.openLittleModal('PLEASE WAIT', `Mounting ${data.volume['volume-id-attributes'].name} from Snapshot...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.mountRestoreSnapshotDatastore(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to mount datastore snapshot');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully', data.uuid);

          this.Modal.closeModal('.window--backups-manager .window__main');
          return backupsmFactory.setRestoreStatus(data, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });
  }

  restoreDatastoreFiles(data) {
    this.logger.debug('Backups Manager [%s] -> Received event [%s] -> Initializing restore of datastore files [%s] from -> storage [%s], vserver [%s], snapshot [%s]', data.uuid, event.name, data.volume['volume-id-attributes'].name, data.netapp_host, data.vserver['vserver-name'], data.snapshot);

    data.type = 'restore_datastore_files';
    data.restore_name = 'Datastore restore (' + data.volume['volume-id-attributes'].name + ')';
    data.uuid = uuidv4();

    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.netapp_credential = data.storage.credential;
    data.netapp_host = data.storage.host;
    data.netapp_port = data.storage.port;
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });
    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('ESXiSelectable', '.window--backups-manager .window__main',
      {
        title: 'Select ESXi host',
        ESXihosts: data.ESXihosts
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: IMESXiHost) => {

        data.esxi_credential = result.connection_credential;
        data.esxi_address = result.connection_address;
        data.esxi_port = result.connection_port;
        data.esxi_host = result.host;
        data.esxi_datacenter = result.datacenter;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host', data.uuid, result.host);

        this.Modal.openLittleModal('PLEASE WAIT', 'Restoring ' + data.volume['volume-id-attributes'].name + ' files from Snapshot...', '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotDatastoreFiles(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into datastore files');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully', data.uuid);

          // Open Datastore Brower application
          ApplicationsFactory.openApplication('datastoreexplorer').then(function () {
            // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
            $timeout(function () {
              ApplicationsFactory.toggleApplication('datastoreexplorer');
            }, 0, false);
          });

          $timeout(function () {
            $rootScope.$broadcast('datastoreexplorer__restore_datastore_files', {
              credential: data.esxi_credential,
              host: data.esxi_address,
              port: data.esxi_port,
              id: data.esxi_datastore,
              name: data.esxi_datastore_name,
              original_datastore: data.volume['volume-id-attributes'].name
            });
          }, 100);

          this.Modal.closeModal('.window--backups-manager .window__main');
          return backupsmFactory.setRestoreStatus(data, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  restoreVmGuestFiles(data) {
    this.logger.debug('Backups Manager [%s] -> Received event [%s] -> Initializing restore of VM guest files [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]', data.uuid, event.name, data.vm.name, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, data.snapshot);

    //TODO: folder.folder & resource_pool.resource_pool are required to publish the VM

    data.type = 'restore_vm_guest_files';
    data.restore_name = 'VM guest files (' + data.vm.name + ')';
    data.uuid = uuidv4();

    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.netapp_credential = data.storage.credential;
    data.netapp_host = data.storage.host;
    data.netapp_port = data.storage.port;
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });
    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('ESXiSelectable', '.window--backups-manager .window__main',
      {
        title: 'Select ESXi host',
        ESXihosts: data.ESXihosts
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: IMESXiHost) => {

        data.esxi_credential = result.connection_credential;
        data.esxi_address = result.connection_address;
        data.esxi_port = result.connection_port;
        data.esxi_host = result.host;
        data.esxi_datacenter = result.datacenter;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host', data.uuid, result.host);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} guest files from Snapshot...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotVMGuestFiles(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into VM guest files');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully', data.uuid);

          this.Modal.closeModal('.window--backups-manager .window__main');
          return backupsmFactory.setRestoreStatus(data, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  vmInstantRecovery(data) {
    this.logger.debug('Backups Manager [%s] -> Received event [%s] -> Initializing restore of VM [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]', data.uuid, event.name, data.vm.name, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, data.snapshot);

    data.type = 'vm_instant_recovery';
    data.restore_name = 'VM instant recovery (' + data.vm.name + ')';

    data.uuid = uuidv4();
    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.netapp_credential = data.storage.credential;
    data.netapp_host = data.storage.host;
    data.netapp_port = data.storage.port;
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });

    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('recoveryWizard', '.window--backups-manager .window__main',
      {
        title: `Select required data for Instant VM (${data.vm.name})`,
        data
      }
    ).then((modalInstance) => {
      modalInstance.result.then((res) => {

        data.esxi_credential = res.host.connection_credential;
        data.esxi_address = res.host.connection_address;
        data.esxi_port = res.host.connection_port;
        data.esxi_host = res.host.host;
        data.folder = res.folder.folder;
        data.resource_pool = res.resource_pool.obj.name;
        data.vm.name = res.vm_name;
        data.vm_power_on = res.vm_power_on;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal as new location -> esxi_host [%s], folder [%s], resource_pool [%s], vm_name [%s], vm_power_on [%s]', data.uuid, res.host.host, res.folder.folder, res.resource_pool.resource_pool, res.vm_name, res.vm_power_on);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} from Snapshot...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotIntoInstantVM(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into Instant VM');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully -> instant_vm [%s]', data.uuid, data.vm.vm);

          this.Modal.closeModal('.window--backups-manager .window__main');
          return backupsmFactory.setRestoreStatus(data, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  restoreVm(data) {
    this.logger.debug('Backups Manager [%s] -> Received event [%s] -> Initializing restore of VM [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]', data.uuid, event.name, data.vm.name, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, data.snapshot);

    data.type = 'restore_vm';
    data.restore_name = 'VM restore (' + data.vm.name + ')';
    data.uuid = uuidv4();

    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.netapp_credential = data.storage.credential;
    data.netapp_host = data.storage.host;
    data.netapp_port = data.storage.port;
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });
    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid)

    this.Modal.openRegisteredModal('recoveryWizard', '.window--backups-manager .window__main',
      {
        title: `Select required data for Restore VM (${data.vm.name})`,
        data
      }
    ).then((modalInstance) => {
      modalInstance.result.then((res) => {

        data.esxi_credential = data.current_location.credential;
        data.esxi_address = data.current_location.host;
        data.esxi_port = data.current_location.port;
        data.vm_power_on = res.vm_power_on;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal as Original location -> instant_vm [%s]', data.uuid, data.vm_power_on);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} from Snapshot...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotIntoVM(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into VM');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully -> vm [%s]', data.uuid, data.vm.vm);

          this.Modal.closeModal('.window--backups-manager .window__main');
          return backupsmFactory.setRestoreStatus(data, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  backupVm(data) {
    this.logger.debug('Backups Manager [%s] -> Received event [%s] -> Initializing backup', data.uuid, event.name);

    data.type = 'backup_vm';
    data.backup_name = 'VM backup (' + data.vm.name + ')';
    data.uuid = uuidv4();

    backupsmFactory.setBackup(data);
    backupsmFactory.setBackupStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('backupWizard', '.window--backups-manager .window__main',
      {
        title: 'Backup Wizard',
        backupObject: data.vm
      }
    ).then((modalInstance) => {
      modalInstance.result.then((res) => {

        data.backup_name = `VM backup (${res.backupName})`;
        res.uuid = data.uuid;

        this.logger.debug('Backups Manager [%s] -> Received backup data from Modal -> name [%s]', data.uuid, res.backupName);

        this.Modal.openLittleModal('PLEASE WAIT', `Backing up ${res.backupName}...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.startVMBackup(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to backup VM');

          this.logger.debug('Backups Manager [%s] -> Backup finished successfully', data.uuid);

          this.Modal.closeModal('.window--backups-manager .window__main');
          return backupsmFactory.setRestoreStatus(data, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

}

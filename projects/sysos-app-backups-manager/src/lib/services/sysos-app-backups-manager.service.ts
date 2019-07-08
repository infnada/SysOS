import {Injectable} from '@angular/core';

import {NGXLogger} from "ngx-logger";
import {ToastrService} from "ngx-toastr";
import {v4 as uuidv4} from 'uuid';

import {SysosLibFileSystemService} from "@sysos/lib-file-system";
import {SysosLibModalService} from "@sysos/lib-modal";
import {SysosLibApplicationService} from "@sysos/lib-application";
import {IMESXiHost, IMConnection} from "@sysos/app-infrastructure-manager";

import {SysosAppBackupsManagerHelpersService} from "./sysos-app-backups-manager-helpers.service";

export interface NetAppVolume {
  'volume-id-attributes': {
    name: string;
    node: string;
    'junction-path': string;
  }
}

export interface NetAppVserver {
  'vserver-name': string;
}

export interface mountRestoreDatastore {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: string;
  uuid?: string;
  virtual?: IMESXiHost['virtual'];
  host?: IMESXiHost['host'];
  volumeName?: string;
  datastorePath?: string;
}

export interface restoreDatastoreFiles {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: string;
  uuid?: string;
  virtual?: IMESXiHost['virtual'];
  host?: IMESXiHost['host'];
  esxi_datastore_name?: string;
  volumeName?: string;
  datastorePath?: string;
}

export interface restoreVmGuestFiles {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: string;
  vm: {
    vm: string;
    name: string;
  };
  uuid?: string;
  virtual?: IMESXiHost['virtual'];
  host?: IMESXiHost['host'];
  volumeName?: string;
  datastorePath?: string;
}

export interface vmInstantRecovery {
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: string;
  vm: {
    vm: string;
    name: string;
    powerOn: boolean;
  };
  uuid?: string;
  virtual?: IMESXiHost['virtual'];
  host?: IMESXiHost['host'] & {
    folder: string;
    resource_pool: string;
  };
  volumeName?: string;
  datastorePath?: string;
}

export interface restoreVm {
  virtual: IMESXiHost['virtual'];
  storage: IMConnection;
  vserver: NetAppVserver;
  volume: NetAppVolume;
  snapshot: string;
  vm: {
    vm: string;
    name: string;
    powerOn: boolean;
  };
  uuid?: string;
}

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

  mountRestoreDatastore(data: mountRestoreDatastore) {
    data.uuid = uuidv4();

    this.logger.debug('Backups Manager [%s] -> Received event mountRestoreDatastore -> Initializing mount of datastore [%s] from -> storage [%s], vserver [%s], snapshot [%s]', data.uuid, data.volume['volume-id-attributes'].name, data.storage.host, data.vserver['vserver-name'], data.snapshot);

    data.restore_name = 'Datastore mount (' + data.volume['volume-id-attributes'].name + ')';
    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);
    data.netapp_nfs_ip = $filter('filter')(data.storage.data.Data.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('esxi-selectable', '.window--backups-manager .window__main',
      {}
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData: IMESXiHost) => {

        data.virtual = selectedData.virtual;
        data.host = selectedData.host;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host [%s]', data.uuid, data.host.host);

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

  restoreDatastoreFiles(data: restoreDatastoreFiles) {
    data.uuid = uuidv4();
    data.esxi_datastore_name = 'SysOS_' + data.volume['volume-id-attributes']['junction-path'].substr(1);

    this.logger.debug('Backups Manager [%s] -> Received event restoreDatastoreFiles -> Initializing restore of datastore files [%s] from -> storage [%s], vserver [%s], snapshot [%s]', data.uuid, data.volume['volume-id-attributes'].name, data.storage.host, data.vserver['vserver-name'], data.snapshot);

    data.restore_name = 'Datastore restore (' + data.volume['volume-id-attributes'].name + ')';
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('esxi-selectable', '.window--backups-manager .window__main',
      {}
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData: IMESXiHost) => {

        data.virtual = selectedData.virtual;
        data.host = selectedData.host;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host [%s] ', data.uuid, data.host.host);

        this.Modal.openLittleModal('PLEASE WAIT', 'Restoring ' + data.volume['volume-id-attributes'].name + ' files from Snapshot...', '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotDatastoreFiles(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into datastore files');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully', data.uuid);

          // Open Datastore Brower application
          this.Applications.openApplication('datastore-explorer', {
            data: {
              uuid: datastore.uuid,
              name: data.esxi_datastore_name,
              credential: data.selectedHost.virtual.credential,
              host: data.selectedHost.virtual.host,
              port: data.selectedHost.virtual.port,
              id: data.esxi_datastore,
              original_datastore: data.volume['volume-id-attributes'].name
            }
          });

          this.Modal.closeModal('.window--backups-manager .window__main');
          return backupsmFactory.setRestoreStatus(data, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  restoreVmGuestFiles(data: restoreVmGuestFiles) {
    data.uuid = uuidv4();

    this.logger.debug('Backups Manager [%s] -> Received event restoreVmGuestFiles -> Initializing restore of VM guest files [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]', data.uuid, data.vm.name, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, data.snapshot);

    //TODO: folder.folder & resource_pool.resource_pool are required to publish the VM

    data.restore_name = 'VM guest files (' + data.vm.name + ')';
    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('esxi-selectable', '.window--backups-manager .window__main',
      {}
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData: IMESXiHost) => {

        data.virtual = selectedData.virtual;
        data.host = selectedData.host;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host [%s]', data.uuid, data.host.host);

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

  vmInstantRecovery(data: vmInstantRecovery) {
    data.uuid = uuidv4();

    this.logger.debug('Backups Manager [%s] -> Received event vmInstantRecovery -> Initializing restore of VM [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]', data.uuid, data.vm.name, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, data.snapshot);

    data.restore_name = 'VM instant recovery (' + data.vm.name + ')';
    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });

    backupsmFactory.setRestore(data);
    backupsmFactory.setRestoreStatus(data, 'init');
    backupsmFactory.setActive(data.uuid);

    this.Modal.openRegisteredModal('recovery-wizard', '.window--backups-manager .window__main',
      {
        title: `Select required data for Instant VM (${data.vm.name})`,
        data
      }
    ).then((modalInstance) => {
      modalInstance.result.then((res) => {

        data.virtual = {
          uuid: res.virtual.uuid,
          credential: res.virtual.credential,
          host: res.virtual.host,
          port: res.virtual.port,
        };

        data.host = {
          host: res.host.host,
          folder: res.folder.folder,
          resource_pool: res.resource_pool.obj.name
        };

        data.vm.name = res.vm_name;
        data.vm.powerOn = res.vm_power_on;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal as new location -> esxi_host [%s], folder [%s], resource_pool [%s], vm_name [%s], vm_power_on [%s]', data.uuid, data.host.host, data.host.folder, data.host.resource_pool, data.vm.name, data.vm.powerOn);

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

  restoreVm(data: restoreVm) {
    data.uuid = uuidv4();

    this.logger.debug('Backups Manager [%s] -> Received event restoreVm -> Initializing restore of VM [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]', data.uuid, data.vm.name, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, data.snapshot);

    data.restore_name = 'VM restore (' + data.vm.name + ')';
    data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);
    data.volume_junction = data.volume['volume-id-attributes']['junction-path'];
    data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
      vserver: data.vserver['vserver-name'],
      'current-node': data.volume['volume-id-attributes'].node
    });

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

        data.vm.powerOn = res.vm_power_on;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal as Original location -> instant_vm [%s]', data.uuid, data.vm.powerOn);

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
    this.logger.debug('Backups Manager [%s] -> Received event backupVm -> Initializing backup', data.uuid);

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

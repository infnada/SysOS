import {Injectable} from '@angular/core';

import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';
import {v4 as uuidv4} from 'uuid';

import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {IMESXiHost, NetAppIface} from '@sysos/app-infrastructure-manager';

import {SysosAppBackupsManagerHelpersService} from './sysos-app-backups-manager-helpers.service';
import {RestoreDatastoreFiles} from '../types/restore-datastore-files';
import {MountRestoreDatastore} from '../types/mount-restore-datastore';
import {RestoreVmGuestFiles} from '../types/restore-vm-guest-files';
import {VmInstantRecovery} from '../types/vm-instant-recovery';
import {RestoreVm} from '../types/restore-vm';
import {BackupVm} from '../types/backup-vm';

@Injectable({
  providedIn: 'root'
})
export class SysosAppBackupsManagerService {

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private Applications: SysosLibApplicationService,
              private FileSystem: SysosLibFileSystemService,
              private BackupManagerHelpers: SysosAppBackupsManagerHelpersService) {
  }

  setActive(uuid: string): void {

  }

  initBackups(): void {
    this.FileSystem.getConfigFile('applications/backups-manager/backups.json').subscribe(
    (res) => {
      this.logger.info('Backups Manager Factory -> Get backups successfully');

      // TODO this.BackupManagerHelpers.setBackup();
    },
    error => {
      this.logger.error('Backups Manager Factory -> Error while getting backups -> ', error);
      return this.Toastr.error('Error getting backups.', 'Backups Manager');
    });
  }

  initRestores(): void {
    this.FileSystem.getConfigFile('applications/backups-manager/restores.json').subscribe(
    (res) => {
      this.logger.info('Backups Manager Factory -> Get restores successfully');

      // TODO this.BackupManagerHelpers.setRestore();
    },
    error => {
      this.logger.error('Backups Manager Factory -> Error while getting restores -> ', error);
      return this.Toastr.error('Error getting restores.', 'Backups Manager');
    });
  }

  mountRestoreDatastore(data: MountRestoreDatastore): void {
    data.uuid = uuidv4();

    this.logger.debug('Backups Manager [%s] -> Received event mountRestoreDatastore -> Initializing mount of datastore [%s] from -> storage [%s], vserver [%s], snapshot [%s]',
      data.uuid, data.volume['volume-id-attributes'].name, data.storage.host, data.vserver['vserver-name'], data.snapshot.name);

    this.BackupManagerHelpers.setRestore(data.uuid, {
      name: `Datastore mount (${data.volume['volume-id-attributes'].name})`,
      data,
      state: [
        'init'
      ],
      log: []
    });
    this.setActive(data.uuid);

    this.Modal.openRegisteredModal('esxi-selectable', '.window--backups-manager .window__main',
      {
        storage: data.storage,
        vserver: data.vserver,
        volume: data.volume
      }
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData: { selectedHost: IMESXiHost, selectedIface: NetAppIface }) => {
        if (!selectedData) return;

        console.log(data);

        data.virtual = selectedData.selectedHost.virtual;
        data.host = selectedData.selectedHost.host;
        data.iface = selectedData.selectedIface;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host [%s]', data.uuid, data.host.host);

        this.Modal.openLittleModal('PLEASE WAIT', `Mounting ${data.volume['volume-id-attributes'].name} from Snapshot...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.mountRestoreSnapshotDatastore(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to mount datastore snapshot');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully', data.uuid);

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setRestoreState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });
  }

  restoreDatastoreFiles(data: RestoreDatastoreFiles) {
    data.uuid = uuidv4();
    data.esxi_datastore_name = 'SysOS_' + data.volume['volume-id-attributes']['junction-path'].substr(1);

    this.logger.debug('Backups Manager [%s] -> Received event restoreDatastoreFiles -> Initializing restore of datastore files [%s] from -> storage [%s], vserver [%s], snapshot [%s]',
      data.uuid, data.volume['volume-id-attributes'].name, data.storage.host, data.vserver['vserver-name'], data.snapshot);

    this.BackupManagerHelpers.setRestore(data.uuid, {
      name: `Datastore restore (${data.volume['volume-id-attributes'].name})`,
      data,
      state: [
        'init'
      ],
      log: []
    });
    this.setActive(data.uuid);

    this.Modal.openRegisteredModal('esxi-selectable', '.window--backups-manager .window__main',
      {
        storage: data.storage,
        vserver: data.vserver,
        volume: data.volume
      }
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData: { selectedHost: IMESXiHost, selectedIface: NetAppIface }) => {
        if (!selectedData) return;

        data.virtual = selectedData.selectedHost.virtual;
        data.host = selectedData.selectedHost.host;
        data.iface = selectedData.selectedIface;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host [%s] ', data.uuid, data.host.host);

        this.Modal.openLittleModal('PLEASE WAIT', 'Restoring ' + data.volume['volume-id-attributes'].name + ' files from Snapshot...', '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotDatastoreFiles(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into datastore files');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully', data.uuid);

          // Open Datastore Brower application
          this.Applications.openApplication('datastore-explorer', {
              credential: data.virtual.credential,
              host: data.virtual.host,
              port: data.virtual.port,
              type: 'vmware',
              data: {},
              original_datastore: data.volume['volume-id-attributes'].name
          });

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setRestoreState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  restoreVmGuestFiles(data: RestoreVmGuestFiles) {
    data.uuid = uuidv4();

    this.logger.debug('Backups Manager [%s] -> Received event restoreVmGuestFiles -> Initializing restore of VM guest files [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]',
      data.uuid, data.vm.name, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, data.snapshot);

    this.BackupManagerHelpers.setRestore(data.uuid, {
      name: `VM guest files (${data.vm.name})`,
      data,
      state: [
        'init'
      ],
      log: []
    });
    this.setActive(data.uuid);

    // TODO: folder.folder & resource_pool.resource_pool are required to publish the VM

    this.Modal.openRegisteredModal('esxi-selectable', '.window--backups-manager .window__main',
      {
        storage: data.storage,
        vserver: data.vserver,
        volume: data.volume
      }
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData: { selectedHost: IMESXiHost, selectedIface: NetAppIface }) => {
        if (!selectedData) return;

        data.virtual = selectedData.selectedHost.virtual;
        // TODO!!!
        data.host = {
          ...selectedData.selectedHost.host,
          folder: 'na',
          resource_pool: 'na'
        };
        data.iface = selectedData.selectedIface;


        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal -> esxi_host [%s]', data.uuid, data.host.host);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} guest files from Snapshot...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotVMGuestFiles(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into VM guest files');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully', data.uuid);

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setRestoreState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  vmInstantRecovery(data: VmInstantRecovery) {
    data.uuid = uuidv4();

    this.logger.debug(`Backups Manager [${data.uuid}] -> Received event vmInstantRecovery -> Initializing restore of VM [${data.vm.name}] from -> virtual [${data.virtual.host}]`);

    this.BackupManagerHelpers.setRestore(data.uuid, {
      name: `VM instant recovery (${data.vm.name})`,
      data,
      state: [
        'init'
      ],
      log: []
    });
    this.setActive(data.uuid);

    this.Modal.openRegisteredModal('recovery-wizard', '.window--backups-manager .window__main',
      {
        type: 'vm_instant_recovery',
        title: `Select required data for Instant VM (${data.vm.name})`,
        data
      }
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData) => {
        if (!selectedData) return;

        data.virtual = selectedData.virtual;
        data.host = {
          ...selectedData.host,
          folder: selectedData.folder.folder,
          resource_pool: selectedData.resource_pool.obj.name
        };
        data.iface = selectedData.selectedIface;
        data.vm.name = selectedData.vmName;
        data.vm.powerOn = selectedData.powerOn;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal as new location -> esxi_host [%s], folder [%s], resource_pool [%s], vm_name [%s], vm_power_on [%s]',
          data.uuid, data.host.host, data.host.folder, data.host.resource_pool, data.vm.name, data.vm.powerOn);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} from Snapshot...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotIntoInstantVM(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into Instant VM');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully -> instant_vm [%s]', data.uuid, data.vm.obj.name);

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setRestoreState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  restoreVm(data: RestoreVm) {
    data.uuid = uuidv4();

    this.logger.debug(`Backups Manager [${data.uuid}] -> Received event restoreVm -> Initializing restore of VM [${data.vm.name}] from -> virtual [${data.virtual.host}]`);

    this.BackupManagerHelpers.setRestore(data.uuid, {
      name: `VM restore (${data.vm.name})`,
      data,
      state: [
        'init'
      ],
      log: []
    });
    this.setActive(data.uuid);

    this.Modal.openRegisteredModal('recovery-wizard', '.window--backups-manager .window__main',
      {
        type: 'restore_vm',
        title: `Select required data for Restore VM (${data.vm.name})`,
        data
      }
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData) => {
        if (!selectedData) return;

        data.virtual = selectedData.virtual;
        data.host = {
          ...selectedData.host,
          folder: selectedData.folder.folder,
          resource_pool: selectedData.resource_pool.obj.name
        };
        data.vm.powerOn = selectedData.powerOn;

        this.logger.debug('Backups Manager [%s] -> Received restore data from Modal as Original location -> instant_vm [%s]', data.uuid, data.vm.powerOn);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} from Snapshot...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.restoreSnapshotIntoVM(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into VM');

          this.logger.debug('Backups Manager [%s] -> Restore finished successfully -> vm [%s]', data.uuid, data.vm.obj.name);

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setRestoreState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  backupVm(data: BackupVm) {
    data.uuid = uuidv4();

    this.logger.debug('Backups Manager [%s] -> Received event backupVm -> Initializing backup', data.uuid);

    this.BackupManagerHelpers.setBackup(data.uuid, {
      name: `VM backup (${data.vm.name})`,
      data,
      state: [
        'init'
      ],
      log: []
    });
    this.setActive(data.uuid);

    this.Modal.openRegisteredModal('backup-wizard', '.window--backups-manager .window__main',
      {
        title: 'Backup Wizard',
        backupObject: data.vm
      }
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData) => {
        if (!selectedData) return;

        data.backupName = `VM backup (${selectedData.backupName})`;

        this.logger.debug('Backups Manager [%s] -> Received backup data from Modal -> name [%s]', data.uuid, selectedData.backupName);

        this.Modal.openLittleModal('PLEASE WAIT', `Backing up ${selectedData.backupName}...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.startVMBackup(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to backup VM');

          this.logger.debug('Backups Manager [%s] -> Backup finished successfully', data.uuid);

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setBackupState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

}

import {Injectable} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {ToastrService} from 'ngx-toastr';
import {v4 as uuidv4} from 'uuid';

import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {
  ImConnection,
  ImDataObject,
  NetAppIface,
  NetAppVserver,
  NetAppVolume,
  NetAppSnapshot,
  VMWareHost,
  VMWareResourcePool,
  VMWareFolder,
  VMWareVM,
} from '@sysos/app-infrastructure-manager';

import {SysosAppBackupsManagerHelpersService} from './sysos-app-backups-manager-helpers.service';
import {RestoreVolumeFiles} from '../types/restore-volume-files';
import {MountVolumeSnapshot} from '../types/mount-volume-snapshot';
import {RestoreVmGuestFiles} from '../types/restore-vm-guest-files';
import {VmInstantRecovery} from '../types/vm-instant-recovery';
import {RestoreVm} from '../types/restore-vm';
import {BackupVm} from '../types/backup-vm';


@Injectable({
  providedIn: 'root'
})
export class SysosAppBackupsManagerService {

  private InfrastructureManager;
  private InfrastructureManagerObjectHelper;

  constructor(private logger: SysosLibLoggerService,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private serviceInjector: SysosLibServiceInjectorService,
              private Applications: SysosLibApplicationService,
              private FileSystem: SysosLibFileSystemService,
              private BackupManagerHelpers: SysosAppBackupsManagerHelpersService) {

    this.InfrastructureManager = this.serviceInjector.get('SysosAppInfrastructureManagerService');
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('SysosAppInfrastructureManagerObjectHelperService');
  }

  setActive(uuid: string): void {

  }

  initBackups(): void {
    this.FileSystem.getConfigFile('applications/backups-manager/backups.json').subscribe(
    (res) => {
      this.logger.info('Backups Manager', 'Got backups successfully');

      // TODO this.BackupManagerHelpers.setBackup();
    },
    error => {
      this.logger.error('Backups Manager', 'Error while getting backups', null, error);
      return this.Toastr.error('Error getting backups.', 'Backups Manager');
    });
  }

  initRestores(): void {
    this.FileSystem.getConfigFile('applications/backups-manager/restores.json').subscribe(
    (res) => {
      this.logger.info('Backups Manager', 'Got restores successfully');

      // TODO this.BackupManagerHelpers.setRestore();
    },
    error => {
      this.logger.error('Backups Manager', 'Error while getting restores', null, error);
      return this.Toastr.error('Error getting restores.', 'Backups Manager');
    });
  }

  mountVolumeSnapshot(dataObj: { snapshot: ImDataObject & { info: { data: NetAppSnapshot } } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Backups Manager', 'Received event mountVolumeSnapshot -> Initializing mount of Volume', arguments);

    this.Modal.openRegisteredModal('recovery-wizard', '.window--backups-manager .window__main',
      {
        type: 'mount_volume_snapshot',
        title: `Select required data to Mount a Volume Snapshot`,
        data: dataObj
      }
    ).then((modalInstance) => {
      modalInstance.result.then((
        selectedData: {
          selectedSnapshot: ImDataObject & { info: { data: NetAppSnapshot } };
          selectedIface: ImDataObject & { info: { data: NetAppIface } };
          selectedHost: ImDataObject & { info: { data: VMWareHost } };
        }) => {
        if (!selectedData) return;

        this.logger.debug('Backups Manager', 'Received restore data from Modal', loggerArgs);

        const virtual: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedHost.info.mainUuid);
        const storage: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedSnapshot.info.mainUuid);
        const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'vserver', selectedData.selectedSnapshot.info.parent.name);
        const volume: ImDataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'volume', selectedData.selectedSnapshot.info.parent.name);

        const data: MountVolumeSnapshot = {
          uuid: uuidv4(),
          storage: storage,
          vserver: vServer,
          volume: volume,
          snapshot: selectedData.selectedSnapshot,
          virtual: virtual,
          host: selectedData.selectedHost,
          iface: selectedData.selectedIface,
        };

        this.BackupManagerHelpers.setRestore(data.uuid, {
          name: `Datastore mount (${data.volume.name})`,
          data,
          state: ['init'],
          log: []
        });
        this.setActive(data.uuid);

        return this.Modal.openLittleModal('PLEASE WAIT', `Mounting ${data.volume.name} from Snapshot...`, '.window--backups-manager .window__main', 'plain').then(() => {

          return this.BackupManagerHelpers.mountRestoreSnapshotDatastore(data);
        }).then((res) => {
          if (res instanceof Error) throw new Error('Failed to mount Volume Snapshot');

          this.logger.debug('Backups Manager', 'Restore finished successfully', loggerArgs);

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setRestoreState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });
  }

  restoreVolumeFiles(dataObj: { snapshot?: ImDataObject & { info: { data: NetAppSnapshot } }, volume?: ImDataObject & { info: { data: NetAppVolume } }  }) {
    const loggerArgs = arguments;

    this.logger.debug('Backups Manager', 'Received event RestoreVolumeFiles -> Initializing restore of datastore files', arguments);

    this.Modal.openRegisteredModal('recovery-wizard', '.window--backups-manager .window__main',
      {
        type: 'restore_volume_files',
        title: `Select required data to Restore Volume Files`,
        data: dataObj
      }
    ).then((modalInstance) => {
      modalInstance.result.then((
        selectedData: {
          selectedSnapshot: ImDataObject & { info: { data: NetAppSnapshot } };
          selectedIface: ImDataObject & { info: { data: NetAppIface } };
          selectedHost: ImDataObject & { info: { data: VMWareHost } };
        }) => {
        if (!selectedData) return;

        this.logger.debug('Backups Manager', 'Received restore data from Modal', loggerArgs);

        const virtual: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedHost.info.mainUuid);
        const storage: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedSnapshot.info.mainUuid);
        const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'vserver', selectedData.selectedSnapshot.info.parent.name);
        const volume: ImDataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'volume', selectedData.selectedSnapshot.info.parent.name);

        const data: RestoreVolumeFiles = {
          uuid: uuidv4(),
          storage: storage,
          vserver: vServer,
          volume: volume,
          snapshot: selectedData.selectedSnapshot,
          virtual: virtual,
          host: selectedData.selectedHost,
          iface: selectedData.selectedIface,
          esxiDatastoreName: 'SysOS_' + volume['volume-id-attributes']['junction-path'].substr(1)
        };

        this.BackupManagerHelpers.setRestore(data.uuid, {
          name: `Datastore restore (${data.volume['volume-id-attributes'].name})`,
          data,
          state: ['init'],
          log: []
        });
        this.setActive(data.uuid);

        this.Modal.openLittleModal('PLEASE WAIT', 'Restoring ' + data.volume.name + ' files from Snapshot...', '.window--backups-manager .window__main', 'plain').then(() => {

          return this.BackupManagerHelpers.restoreSnapshotDatastoreFiles(data);
        }).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into datastore files');

          this.logger.debug('Backups Manager', 'Restore finished successfully', loggerArgs);

          // Open Datastore Brower application
          this.Applications.openApplication('datastore-explorer', {
              credential: data.virtual.credential,
              host: data.virtual.host,
              port: data.virtual.port,
              type: 'vmware',
              data: {},
              original_datastore: data.volume.name
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

  restoreVmGuestFiles(dataObj: { vm: ImDataObject & { info: { data: VMWareVM } }, snapshot?: ImDataObject & { info: { data: NetAppSnapshot } } }) {
    const loggerArgs = arguments;

    this.logger.debug('Backups Manager', `Received event restoreVmGuestFiles -> Initializing restore of VM guest files [${dataObj.vm.name}]`, arguments);

    this.Modal.openRegisteredModal('recovery-wizard', '.window--backups-manager .window__main',
      {
        type: 'restore_vm_guest_files',
        title: `Select required data to Restore VM (${dataObj.vm.name}) Guest Files`,
        data: dataObj
      }
    ).then((modalInstance) => {
      modalInstance.result.then((
        selectedData: {
          selectedSnapshot: ImDataObject & { info: { data: NetAppSnapshot } };
          selectedIface: ImDataObject & { info: { data: NetAppIface } };
          selectedHost: ImDataObject & { info: { data: VMWareHost } };
          selectedFolder: ImDataObject & { info: { data: VMWareFolder } };
          selectedResourcePool: ImDataObject & { info: { data: VMWareResourcePool } };
        }) => {
        if (!selectedData) return;

        this.logger.debug('Backups Manager', 'Received restore data from Modal', loggerArgs);

        const virtual: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedHost.info.mainUuid);
        const storage: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedSnapshot.info.mainUuid);
        const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'vserver', selectedData.selectedSnapshot.info.parent.name);
        const volume: ImDataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'volume', selectedData.selectedSnapshot.info.parent.name);

        // TODO: folder.folder & resource_pool.resource_pool are required to publish the VM
        const data: RestoreVmGuestFiles = {
          uuid: uuidv4(),
          storage: storage,
          vserver: vServer,
          volume: volume,
          snapshot: selectedData.selectedSnapshot,
          virtual: virtual,
          host: selectedData.selectedHost,
          iface: selectedData.selectedIface,
          vm: dataObj.vm,
          folder: selectedData.selectedFolder,
          resourcePool: selectedData.selectedResourcePool,
        };

        this.BackupManagerHelpers.setRestore(data.uuid, {
          name: `VM guest files (${data.vm.name})`,
          data,
          state: ['init'],
          log: []
        });
        this.setActive(data.uuid);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} guest files from Snapshot...`, '.window--backups-manager .window__main', 'plain').then(() => {

          return this.BackupManagerHelpers.restoreSnapshotVMGuestFiles(data);
        }).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into VM guest files');

          this.logger.debug('Backups Manager', 'Restore finished successfully', loggerArgs);

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setRestoreState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  vmInstantRecovery(dataObj: { vm: ImDataObject & { info: { data: VMWareVM } }, snapshot?: ImDataObject & { info: { data: NetAppSnapshot } } }) {
    const loggerArgs = arguments;

    this.logger.debug('Backups Manager', `Received event vmInstantRecovery -> Initializing restore of VM [${dataObj.vm.name}]`, arguments);

    this.Modal.openRegisteredModal('recovery-wizard', '.window--backups-manager .window__main',
      {
        type: 'vm_instant_recovery',
        title: `Select required data to perform an Instant VM (${dataObj.vm.name})`,
        data: dataObj
      }
    ).then((modalInstance) => {
      modalInstance.result.then((
        selectedData: {
          selectedSnapshot: ImDataObject & { info: { data: NetAppSnapshot } };
          selectedIface: ImDataObject & { info: { data: NetAppIface } };
          selectedHost: ImDataObject & { info: { data: VMWareHost } };
          selectedFolder: ImDataObject & { info: { data: VMWareFolder } };
          selectedResourcePool: ImDataObject & { info: { data: VMWareResourcePool } };
          vmName: string;
          powerOnVm: boolean;
        }) => {
        if (!selectedData) return;

        const virtual: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedHost.info.mainUuid);
        const storage: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedSnapshot.info.mainUuid);
        const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'vserver', selectedData.selectedSnapshot.info.parent.name);
        const volume: ImDataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'volume', selectedData.selectedSnapshot.info.parent.name);

        const data: VmInstantRecovery = {
          uuid: uuidv4(),
          storage: storage,
          vserver: vServer,
          volume: volume,
          snapshot: selectedData.selectedSnapshot,
          virtual: virtual,
          host: selectedData.selectedHost,
          iface: selectedData.selectedIface,
          vm: dataObj.vm,
          folder: selectedData.selectedFolder,
          resourcePool: selectedData.selectedResourcePool,
          vmName: selectedData.vmName,
          powerOnVm: selectedData.powerOnVm
        };

        this.BackupManagerHelpers.setRestore(data.uuid, {
          name: `VM instant recovery (${data.vm.name})`,
          data,
          state: ['init'],
          log: []
        });
        this.setActive(data.uuid);

        this.logger.debug('Backups Manager', 'Received restore data from Modal as new location', loggerArgs);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} from Snapshot...`, '.window--backups-manager .window__main', 'plain').then(() => {

          return this.BackupManagerHelpers.restoreSnapshotIntoInstantVM(data);
        }).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into Instant VM');

          this.logger.debug('Backups Manager', 'Restore finished successfully', loggerArgs);

          this.Modal.closeModal('.window--backups-manager .window__main');
          this.BackupManagerHelpers.setRestoreState(data.uuid, 'end');
        }).catch((e) => {
          this.Modal.closeModal('.window--backups-manager .window__main');
          return this.Applications.errorHandler(e.message);
        });

      });
    });

  }

  restoreVm(dataObj: { vm: ImDataObject & { info: { data: VMWareVM } }, snapshot?: ImDataObject & { info: { data: NetAppSnapshot } } }) {
    const loggerArgs = arguments;

    this.logger.debug('Backups Manager', `Received event restoreVm -> Initializing restore of VM [${dataObj.vm.name}]`, arguments);

    this.Modal.openRegisteredModal('recovery-wizard', '.window--backups-manager .window__main',
      {
        type: 'restore_vm',
        title: `Select required data to Restore VM (${dataObj.vm.name})`,
        data: dataObj
      }
    ).then((modalInstance) => {
      modalInstance.result.then((selectedData: {
        selectedSnapshot: ImDataObject & { info: { data: NetAppSnapshot } };
        selectedIface: ImDataObject & { info: { data: NetAppIface } };
        selectedHost: ImDataObject & { info: { data: VMWareHost } };
        selectedFolder: ImDataObject & { info: { data: VMWareFolder } };
        selectedResourcePool: ImDataObject & { info: { data: VMWareResourcePool } };
        powerOnVm: boolean;
      }) => {
        if (!selectedData) return;

        const virtual: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedHost.info.mainUuid);
        const storage: ImConnection = this.InfrastructureManager.getConnectionByUuid(selectedData.selectedSnapshot.info.mainUuid);
        const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'vserver', selectedData.selectedSnapshot.info.parent.name);
        const volume: ImDataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(storage.uuid, 'volume', selectedData.selectedSnapshot.info.parent.name);

        const data: RestoreVm = {
          uuid: uuidv4(),
          storage: storage,
          vserver: vServer,
          volume: volume,
          snapshot: selectedData.selectedSnapshot,
          virtual: virtual,
          host: selectedData.selectedHost,
          vm: dataObj.vm,
          folder: selectedData.selectedFolder,
          resourcePool: selectedData.selectedResourcePool,
          powerOnVm: selectedData.powerOnVm
        };

        this.BackupManagerHelpers.setRestore(data.uuid, {
          name: `VM restore (${data.vm.name})`,
          data,
          state: ['init'],
          log: []
        });
        this.setActive(data.uuid);

        this.logger.debug('Backups Manager', 'Received restore data from Modal as Original location', loggerArgs);

        this.Modal.openLittleModal('PLEASE WAIT', `Restoring ${data.vm.name} from Snapshot...`, '.window--backups-manager .window__main', 'plain').then(() => {

          return this.BackupManagerHelpers.restoreSnapshotIntoVM(data);
        }).then((res) => {
          if (res instanceof Error) throw new Error('Failed to restore snapshot into VM');

          this.logger.debug('Backups Manager', 'Restore finished successfully', loggerArgs);

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
    const loggerArgs = arguments;

    data.uuid = uuidv4();

    this.logger.debug('Backups Manager', 'Received event backupVm -> Initializing backup', arguments);

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

        this.logger.debug('Backups Manager', 'Received backup data from Modal', loggerArgs);

        this.Modal.openLittleModal('PLEASE WAIT', `Backing up ${selectedData.backupName}...`, '.window--backups-manager .window__main', 'plain');

        return this.BackupManagerHelpers.startVMBackup(data).then((res) => {
          if (res instanceof Error) throw new Error('Failed to backup VM');

          this.logger.debug('Backups Manager', 'Backup finished successfully', loggerArgs);

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

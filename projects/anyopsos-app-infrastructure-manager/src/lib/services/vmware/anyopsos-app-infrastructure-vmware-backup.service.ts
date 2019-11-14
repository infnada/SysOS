import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSAppInfrastructureManagerService} from '../anyopsos-app-infrastructure-manager.service';

import {VMWareVM} from '../../types/vmware-vm';
import {ImDataObject} from '../../types/im-data-object';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureVmwareBackupService {

  constructor(private logger: AnyOpsOSLibLoggerService,
              private Modal: AnyOpsOSLibModalService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  restoreGuestFiles(obj: ImDataObject & { info: { data: VMWareVM } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for recovery VM Guest Files', arguments);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore guest files',
        text: `Do you want to perform a VM Guest Files recovery of ${obj.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM', loggerArgs);

          // Open Backups Manager Application
          this.InfrastructureManager.openBackupsManager('restore_vm_guest_files', {
            vm: obj
          });
        }
      });
    });
  }

  /**
   * Performs an instant VM recovery from storage snapshot
   */
  instantVM(obj: ImDataObject & { info: { data: VMWareVM } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for Instant VM recovery', arguments);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Instant VM recovery',
        text: `Do you want to perform an Instant VM recovery of ${obj.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for Instant VM recovery', loggerArgs);

          this.InfrastructureManager.openBackupsManager('vm_instant_recovery', {
            vm: obj
          });
        }
      });
    });
  }

  /**
   * Performs a full VM recovery from storage snapshot
   */
  restoreVM(obj: ImDataObject & { info: { data: VMWareVM } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for restore entire VM', arguments);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore entire VM',
        text: `Do you want to perform a entire VM restore of ${obj.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM', loggerArgs);

          this.InfrastructureManager.openBackupsManager('restore_vm', {
            vm: obj
          });

        }
      });
    });
  }

  backupVM(obj: ImDataObject & { info: { data: VMWareVM } }): void {
    this.logger.debug('Infrastructure Manager', 'Launching VM Backup', arguments);

    // TODO: ManagedObjectReference is an array even if all VM files are in same datastore
    /*if (!this.InfrastructureManager.getLinkByVMwareDatastore(connectionUuid, vm.info.data.datastore.ManagedObjectReference[0].name)) {
      this.Modal.openLittleModal(
        'Error while creating Backup',
        'Not found any compatible NetApp storage. Make sure VMs that you want to backup are inside a NetApp volume and this is managed by anyOpsOS.',
        '.window--infrastructure-manager .window__main',
        'plain'
      ).then();
      return;
    }*/

    this.InfrastructureManager.openBackupsManager('backup_vm', {
      vm: obj
    });

  }
}

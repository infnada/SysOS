import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {DataObject} from '@anyopsos/backend/app/types/data-object';
import {VMWareVM} from '@anyopsos/module-vmware/src';

import {AnyOpsOSAppInfrastructureManagerService} from '../anyopsos-app-infrastructure-manager.service';
import {MatDialogRef} from '@anyopsos/lib-angular-material';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureVmwareBackupService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  async restoreGuestFiles(obj: DataObject & { info: { data: VMWareVM } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for recovery VM Guest Files');

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Restore guest files',
        text: `Do you want to perform a VM Guest Files recovery of ${obj.name}?`,
        yes: 'Restore',
        no: 'Cancel'
      }
    );

    modalInstance.afterClosed().subscribe((result: boolean): Promise<void> => {
      if (!result) return;

      this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM');

      this.InfrastructureManager.openBackupsManager('restore_vm_guest_files', {
        vm: obj
      });
    });
  }

  /**
   * Performs an instant VM recovery from storage snapshot
   */
  async instantVM(obj: DataObject & { info: { data: VMWareVM } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for Instant VM recovery');

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Instant VM recovery',
        text: `Do you want to perform an Instant VM recovery of ${obj.name}?`,
        yes: 'Restore',
        no: 'Cancel'
      }
    );

    modalInstance.afterClosed().subscribe((result: boolean): Promise<void> => {
      if (!result) return;

      this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for Instant VM recovery');

      this.InfrastructureManager.openBackupsManager('vm_instant_recovery', {
        vm: obj
      });
    });
  }

  /**
   * Performs a full VM recovery from storage snapshot
   */
  async restoreVM(obj: DataObject & { info: { data: VMWareVM } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for restore entire VM');

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Restore entire VM',
        text: `Do you want to perform a entire VM restore of ${obj.name}?`,
        yes: 'Restore',
        no: 'Cancel'
      }
    );

    modalInstance.afterClosed().subscribe((result: boolean): Promise<void> => {
      if (!result) return;

      this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM');

      this.InfrastructureManager.openBackupsManager('restore_vm', {
        vm: obj
      });
    });
  }

  backupVM(obj: DataObject & { info: { data: VMWareVM } }): void {
    this.logger.debug('Infrastructure Manager', 'Launching VM Backup', arguments);

    // TODO: ManagedObjectReference is an array even if all VM files are in same datastore
    /*if (!this.InfrastructureManager.getLinkByVMwareDatastore(connectionUuid, vm.info.data.datastore.ManagedObjectReference[0].name)) {
      this.LibModal.openLittleModal(
        'Error while creating Backup',
        'Not found any compatible NetApp storage. Make sure VMs that you want to backup are inside a NetApp volume and this is managed by anyOpsOS.',
        this.InfrastructureManager.getBodyContainerRef()
      ).then();
      return;
    }*/

    this.InfrastructureManager.openBackupsManager('backup_vm', {
      vm: obj
    });

  }
}

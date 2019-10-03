import {Injectable} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosAppInfrastructureManagerService} from '../sysos-app-infrastructure-manager.service';

import {VMWareObject} from '../../types/vmware-object';
import {VMWareVM} from '../../types/vmware-vm';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureVmwareBackupService {

  constructor(private logger: SysosLibLoggerService,
              private Modal: SysosLibModalService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {
  }

  /**
   * Performs an instant VM recovery from storage snapshot
   */
  instantVM(virtualUuid: string, vm: VMWareObject & { info: { data: VMWareVM } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for Instant VM recovery', arguments);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Instant VM recovery',
        text: `Do you want to perform an Instant VM recovery of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for Instant VM recovery', loggerArgs);

          this.InfrastructureManager.openBackupsManager(virtualUuid, 'vm_instant_recovery', {
            virtual: this.InfrastructureManager.getConnectionByUuid(virtualUuid),
            vm
          });

        }
      });
    });
  }

  /**
   * Performs a full VM recovery from storage snapshot
   */
  restoreVM(virtualUuid: string, vm: VMWareObject & { info: { data: VMWareVM } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for restore entire VM', arguments);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore entire VM',
        text: `Do you want to perform a entire VM restore of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM', loggerArgs);

          this.InfrastructureManager.openBackupsManager(virtualUuid, 'restore_vm', {
            virtual: this.InfrastructureManager.getConnectionByUuid(virtualUuid),
            vm
          });

        }
      });
    });
  }
}

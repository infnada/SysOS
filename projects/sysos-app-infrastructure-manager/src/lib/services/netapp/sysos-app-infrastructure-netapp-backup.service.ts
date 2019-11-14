import {Injectable} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibVmwareService} from '@sysos/lib-vmware';

import {SysosAppInfrastructureManagerService} from '../sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureManagerObjectHelperService} from '../sysos-app-infrastructure-manager-object-helper.service';

import {ImDataObject} from '../../types/im-data-object';
import {NetAppVolume} from '../../types/netapp-volume';
import {NetAppSnapshot} from '../../types/netapp-snapshot';
import {VMWareVM} from '../../types/vmware-vm';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureNetappBackupService {

  constructor(private logger: SysosLibLoggerService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelper: SysosAppInfrastructureManagerObjectHelperService,) {
  }

  /**
   * Checks if the vServers have allowed any of the available protocols
   */
  private checkProtocols(obj: ImDataObject & { info: { data: NetAppSnapshot | NetAppVolume } }): boolean {
    const vServer = this.InfrastructureManagerObjectHelper.getParentObjectByType(obj.info.mainUuid, 'vserver', obj.info.parent.name);

    if (!Array.isArray(vServer.info.data['allowed-protocols'].protocol) ||
      (!vServer.info.data['allowed-protocols'].protocol.includes('nfs') &&
        !vServer.info.data['allowed-protocols'].protocol.includes('iscsi') &&
        !vServer.info.data['allowed-protocols'].protocol.includes('fcp'))
    ) {
      this.Modal.openLittleModal(
        'UNABLE TO PROCEED',
        'The selected Snapshot belongs to a Vserver without any supported protocol (NFS, FC/FCoE, iSCSI) configured.',
        '.window--infrastructure-manager .window__main',
        'plain'
      );
      return false;
    }

    return true;
  }

  /**
   * Storage Volume Snapshots Backup/Restore
   */
  mountSnapShotAsDatastore(obj: ImDataObject & { info: { data: NetAppSnapshot } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for mount storage snapshot into a datastore', arguments);

    if (!this.checkProtocols(obj)) return;

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Mount Snapshot as Datastore',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for mounting storage snapshot into a datastore', loggerArgs);

          // Open Backups Manager Application
          this.InfrastructureManager.openBackupsManager('mount_volume_snapshot', {
            snapshot: obj
          });
        }
      });
    });
  }

  restoreVolumeFiles(obj: ImDataObject & { info: { data: NetAppSnapshot | NetAppVolume } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for mount storage snapshot into a datastore to restore files', arguments);

    if (!this.checkProtocols(obj)) return;

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore Datastore Files',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host and restore Volume files?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restoring a volume files', loggerArgs);

          // Open Backups Manager Application
          this.InfrastructureManager.openBackupsManager('restore_volume_files', (obj.type === 'volume' ? {
            volume: obj
          } : {
            snapshot: obj
          }));
        }
      });
    });
  }

  restoreGuestFiles(vm: ImDataObject & { info: { data: VMWareVM } }, snapshot: ImDataObject & { info: { data: NetAppSnapshot } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for recovery VM Guest Files', arguments);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore guest files',
        text: `Do you want to perform a VM Guest Files recovery of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM', loggerArgs);

          // Open Backups Manager Application
          this.InfrastructureManager.openBackupsManager('restore_vm_guest_files', {
            vm,
            snapshot
          });
        }
      });
    });
  }

  instantVM(vm: ImDataObject & { info: { data: VMWareVM } }, snapshot?: ImDataObject & { info: { data: NetAppSnapshot } }): void {
    const loggerArgs = arguments;

    // Not linked VM
    /*if (!vm.data) {

      vm.data = {
        name: vm.name,
        summary: {
          config: {
            vmPathName: `[${volume['volume-id-attributes'].name}] ${vm.path}`
          }
        }
      };
    }*/

    this.logger.debug('Infrastructure Manager', 'Ask for Instant VM recovery ', arguments);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Instant VM recovery',
        text: `Do you want to perform an Instant VM recovery of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for Instant VM recovery', loggerArgs);

          this.InfrastructureManager.openBackupsManager('vm_instant_recovery', {
            snapshot,
            vm
          });

        }
      });
    });
  }

  restoreVM(snapshot: ImDataObject & { info: { data: NetAppSnapshot } }, vm: ImDataObject & { info: { data: VMWareVM } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for restore entire VM', arguments);

    if (!vm.info.data) {
      this.Modal.openLittleModal(
        'Error while restoring Backup',
        `Not found any linked VirtualMachine for ${vm.name}, maybe original VM was deleted from vCenter. Try doing an Instant VM restore`,
        '.window--infrastructure-manager .window__main',
        'plain'
      ).then();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore entire VM',
        text: `Do you want to perform a entire VM restore of ${vm.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM', loggerArgs);

          this.InfrastructureManager.openBackupsManager('restore_vm', {
            snapshot,
            vm
          });

        }
      });
    });
  }

}

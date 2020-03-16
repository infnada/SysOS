import {Injectable} from '@angular/core';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibNodeHelpersService} from '@anyopsos/lib-node';
import {VMWareVM} from '@anyopsos/module-node-vmware';
import {NetAppSnapshot, NetAppVolume, NetAppVserver} from '@anyopsos/module-node-netapp';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {AnyOpsOSAppInfrastructureManagerService} from '../anyopsos-app-infrastructure-manager.service';


@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureNetappBackupService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibNodeHelpers: AnyOpsOSLibNodeHelpersService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  /**
   * Checks if the vServers have allowed any of the available protocols
   */
  private async checkProtocols(obj: DataObject & { info: { data: NetAppSnapshot | NetAppVolume } }): Promise<boolean> {
    const vServer: DataObject & { info: { data: NetAppVserver } } = this.LibNodeHelpers.getParentObjectByType(obj.info.mainUuid, 'netapp', 'vserver', obj.info.parent);

    if (!Array.isArray(vServer.info.data['allowed-protocols'].protocol) ||
      (!vServer.info.data['allowed-protocols'].protocol.includes('nfs') &&
        !vServer.info.data['allowed-protocols'].protocol.includes('iscsi') &&
        !vServer.info.data['allowed-protocols'].protocol.includes('fcp'))
    ) {

      await this.LibModal.openLittleModal(
        this.InfrastructureManager.getBodyContainerRef(),
        'UNABLE TO PROCEED',
        'The selected Snapshot belongs to a Vserver without any supported protocol (NFS, FC/FCoE, iSCSI) configured.'
      );

      return false;
    }

    return true;
  }

  /**
   * Storage Volume Snapshots Backup/Restore
   */
  async mountSnapShotAsDatastore(obj: DataObject & { info: { data: NetAppSnapshot } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for mount storage snapshot into a datastore');

    if (!await this.checkProtocols(obj)) return;

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Mount Snapshot as Datastore',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host?',
        yes: 'Mount',
        no: 'Cancel'
      }
    );

    modalInstance.afterClosed().subscribe((result: boolean): Promise<void> => {
      if (!result) return;

      this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for mounting storage snapshot into a datastore');

      // Open Backups Manager Application
      this.InfrastructureManager.openBackupsManager('mount_volume_snapshot', {
        snapshot: obj
      });
    });
  }

  async restoreVolumeFiles(obj: DataObject & { info: { data: NetAppSnapshot | NetAppVolume } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for mount storage snapshot into a datastore to restore files');

    if (!await this.checkProtocols(obj)) return;

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Restore Datastore Files',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host and restore Volume files?',
        yes: 'Restore',
        no: 'Cancel'
      }
    );

    modalInstance.afterClosed().subscribe((result: boolean): Promise<void> => {
      if (!result) return;

        this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restoring a volume files');

        // Open Backups Manager Application
        this.InfrastructureManager.openBackupsManager('restore_volume_files', (obj.type === 'volume' ? {
          volume: obj
        } : {
          snapshot: obj
        }));
    });
  }

  async restoreGuestFiles(vm: DataObject & { info: { data: VMWareVM } }, snapshot: DataObject & { info: { data: NetAppSnapshot } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for recovery VM Guest Files');

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Restore guest files',
        text: `Do you want to perform a VM Guest Files recovery of ${vm.name}?`,
        yes: 'Restore',
        no: 'Cancel'
      }
    );

    modalInstance.afterClosed().subscribe((result: boolean): Promise<void> => {
      if (!result) return;

      this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM');

      // Open Backups Manager Application
      this.InfrastructureManager.openBackupsManager('restore_vm_guest_files', {
        vm,
        snapshot
      });
    });
  }

  async instantVM(vm: DataObject & { info: { data: VMWareVM } }, snapshot?: DataObject & { info: { data: NetAppSnapshot } }): Promise<void> {
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

    this.logger.debug('Infrastructure Manager', 'Ask for Instant VM recovery ');

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Instant VM recovery',
        text: `Do you want to perform an Instant VM recovery of ${vm.name}?`,
        yes: 'Restore',
        no: 'Cancel'
      }
    );

    modalInstance.afterClosed().subscribe((result: boolean): Promise<void> => {
      if (!result) return;

      this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for Instant VM recovery');

      this.InfrastructureManager.openBackupsManager('vm_instant_recovery', {
        snapshot,
        vm
      });
    });
  }

  async restoreVM(snapshot: DataObject & { info: { data: NetAppSnapshot } }, vm: DataObject & { info: { data: VMWareVM } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for restore entire VM');

    if (!vm.info.data) {
      this.LibModal.openLittleModal(
        this.InfrastructureManager.getBodyContainerRef(),
        'Error while restoring Backup',
        `Not found any linked VirtualMachine for ${vm.name}, maybe original VM was deleted from vCenter. Try doing an Instant VM restore`
      ).then();
      return;
    }

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(),
      {
        title: 'Restore entire VM',
        text: `Do you want to perform a entire VM restore of ${vm.name}?`,
        yes: 'Restore',
        no: 'Cancel'
      }
    );

    modalInstance.afterClosed().subscribe((result: boolean): Promise<void> => {
      if (!result) return;

      this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restore entire VM');

      this.InfrastructureManager.openBackupsManager('restore_vm', {
        snapshot,
        vm
      });
    });
  }

}

import {Injectable} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibVmwareService} from '@sysos/lib-vmware';

import {SysosAppInfrastructureManagerService} from '../sysos-app-infrastructure-manager.service';

import {NetAppVserver} from '../../types/netapp-vserver';
import {NetAppVolume} from '../../types/netapp-volume';
import {NetAppSnapshot} from '../../types/netapp-snapshot';
import {VMWareObject} from '../../types/vmware-object';
import {VMWareVM} from '../../types/vmware-vm';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureNetappBackupService {

  constructor(private logger: SysosLibLoggerService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {
  }

  /**
   * Storage Volume Snapshots Backup/Restore
   */
  mountSnapShotAsDatastore(storageUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for mount storage snapshot into a datastore', arguments);

    if (!Array.isArray(vserver['allowed-protocols'].protocol) ||
      (!vserver['allowed-protocols'].protocol.includes('nfs') &&
        !vserver['allowed-protocols'].protocol.includes('iscsi') &&
        !vserver['allowed-protocols'].protocol.includes('fcp'))
    ) {
      this.Modal.openLittleModal(
        'UNABLE TO PROCEED',
        'The selected Snapshot belongs to a Vserver without any supported protocol (NFS, FC/FCoE, iSCSI) configured.',
        '.window--infrastructure-manager .window__main',
        'plain'
      ).then();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Mount Snapshot as Datastore',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for mounting storage snapshot into a datastore', loggerArgs);

          this.InfrastructureManager.openBackupsManager(storageUuid, 'mount_restore_datastore', {
            storage: this.InfrastructureManager.getConnectionByUuid(storageUuid),
            vserver,
            volume,
            snapshot
          });

        }
      });
    });
  }

  restoreVolumeFiles(storageUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for mount storage snapshot into a datastore to restore files', arguments);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Restore Datastore Files',
        text: 'Do you want to mount the Storage Snapshot to an ESXi host and restore datastore files?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Launching Backups Manager for restoring a volume files', loggerArgs);

          this.InfrastructureManager.openBackupsManager(storageUuid, 'restore_datastore_files', {
            storage: this.InfrastructureManager.getConnectionByUuid(storageUuid),
            vserver,
            volume,
            snapshot
          });

        }
      });
    });
  }

  instantVM(storageUuid: string, virtualUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot, vm: VMWareObject & { info: { data: VMWareVM } }): void {
    const loggerArgs = arguments;

    if (storageUuid === null) {
      console.log(vm);
      this.VMWare.getVM(
        this.InfrastructureManager.getConnectionByUuid(virtualUuid),
        vm.info.obj.name
      ).then((vmData) => {
        console.log(vmData);
      });
      return;
    }
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

          this.InfrastructureManager.openBackupsManager(storageUuid, 'vm_instant_recovery', {
            storage: this.InfrastructureManager.getConnectionByUuid(storageUuid),
            virtual: this.InfrastructureManager.getConnectionByUuid(virtualUuid),
            vserver,
            volume,
            snapshot,
            vm
          });

        }
      });
    });
  }

  restoreVM(storageUuid: string, virtualUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot, vm: VMWareObject & { info: { data: VMWareVM } }): void {
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

          this.InfrastructureManager.openBackupsManager(storageUuid, 'restore_vm', {
            storage: this.InfrastructureManager.getConnectionByUuid(storageUuid),
            virtual: this.InfrastructureManager.getConnectionByUuid(virtualUuid),
            vserver,
            volume,
            snapshot,
            vm,
          });

        }
      });
    });
  }

  restoreGuestFiles(storageUuid: string, vserver: NetAppVserver, volume: NetAppVolume, snapshot: NetAppSnapshot, vm: VMWareObject & { info: { data: VMWareVM } }): void {
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

          this.InfrastructureManager.openBackupsManager(storageUuid, 'restore_vm_guest_files', {
            storage: storageUuid,
            vserver,
            volume,
            snapshot,
            vm
          });

        }
      });
    });
  }

  backupVM(connectionUuid: string, vm: VMWareObject & { info: { data: VMWareVM } }): void {
    this.logger.debug('Infrastructure Manager', 'Launching VM Backup', arguments);

    // TODO: ManagedObjectReference is an array even if all VM files are in same datastore
    /*if (!this.InfrastructureManager.getLinkByVMwareDatastore(connectionUuid, vm.info.data.datastore.ManagedObjectReference[0].name)) {
      this.Modal.openLittleModal(
        'Error while creating Backup',
        'Not found any compatible NetApp storage. Make sure VMs that you want to backup are inside a NetApp volume and this is managed by SysOS.',
        '.window--infrastructure-manager .window__main',
        'plain'
      ).then();
      return;
    }*/

    this.InfrastructureManager.openBackupsManager(connectionUuid, 'backup_vm', {
      vm
    });

  }
}

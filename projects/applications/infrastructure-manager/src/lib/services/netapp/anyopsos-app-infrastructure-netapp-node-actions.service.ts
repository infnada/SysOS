import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibNetappSoapApiService, AnyOpsOSLibNetappSoapApiHelpersService} from '@anyopsos/lib-netapp';
import {ConnectionNetapp, NetAppSnapshot, NetAppVolume, NetAppVserver} from '@anyopsos/module-netapp';
import {DataObject} from '@anyopsos/backend/app/types/data-object';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSAppInfrastructureManagerService} from '../anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerObjectHelperService} from '../anyopsos-app-infrastructure-manager-object-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureNetappNodeActionsService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibNetappSoapApiService: AnyOpsOSLibNetappSoapApiService,
              private readonly LibNetappSoapApiHelpersService: AnyOpsOSLibNetappSoapApiHelpersService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private readonly InfrastructureManagerObjectHelper: AnyOpsOSAppInfrastructureManagerObjectHelperService) {
  }

  /**
   * Creates a NetApp Snapshot for a Volume
   */
  async createStorageSnapShot(volume: DataObject & { info: { data: NetAppVolume } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for create storage snapshot', arguments);

    const connection: ConnectionNetapp = await this.InfrastructureManager.getConnectionByUuid(volume.info.mainUuid, 'netapp') as ConnectionNetapp;
    const vServer: DataObject & { info: { data: NetAppVserver } } = await this.InfrastructureManagerObjectHelper.getParentObjectByType(connection.uuid, 'netapp', 'vserver', volume.info.parent);

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(), {
      title: 'Create storage snapshot',
      text: `Do you want to create a Storage snapshot for ${volume['volume-id-attributes'].name} volume?`,
      yes: 'Create',
      no: 'Cancel'
    });

    modalInstance.afterClosed().subscribe(async (result: boolean) => {
      if (result !== true) return;

      this.logger.debug('Infrastructure Manager', 'Creating storage snapshot');
      const littleModalRef: MatDialogRef<any> = await this.LibModal.openLittleModal(this.InfrastructureManager.getBodyContainerRef(), 'PLEASE WAIT', 'Creating volume snapshot');

      const snapshotName = vServer.name + '_anyOpsOS__' + new Date().toISOString().split('.')[0].replace(/:/g, '');
      return this.LibNetappSoapApiService.callSoapApi(connection.uuid, 'snapshot-create', {
        async: false,
        snapshot: snapshotName,
        volume: volume.name
      }).then((createSnapshotResult: BackendResponse) => {
        if (createSnapshotResult.status === 'error') {
          throw {
            error: createSnapshotResult.data,
            description: 'Failed to get NetApp Volume Snapshot'
          };
        }

        this.logger.info('Infrastructure Manager', 'Storage snapshot created successfully');
        this.LibModal.changeModalType(littleModalRef.id, 'success');
        this.LibModal.changeModalText(littleModalRef.id, `Snapshot created successfully for volume ${volume.name}`);

        // Refresh volume data to fetch the new snapshot
        return this.LibNetappSoapApiHelpersService.getVolumeData(volume);

      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'createStorageSnapShot', null, e.description);

        if (littleModalRef && this.LibModal.isModalOpened(littleModalRef.id)) {
          this.LibModal.changeModalType(littleModalRef.id, 'danger');
          this.LibModal.changeModalText(littleModalRef.id, (e.description ? e.description : e.message));
        }

        throw e;
      });
    });
  }

  /**
   * Deletes a NetApp Snapshot from a Volume
   */
  async deleteStorageSnapShot(snapshot: DataObject & { info: { data: NetAppSnapshot } }): Promise<void> {
    this.logger.debug('Infrastructure Manager', 'Ask for delete storage snapshot', arguments);

    const connection: ConnectionNetapp = await this.InfrastructureManager.getConnectionByUuid(snapshot.info.mainUuid, 'netapp') as ConnectionNetapp;
    const volume: DataObject & { info: { data: NetAppVolume } } = await this.InfrastructureManagerObjectHelper.getParentObjectByType(connection.uuid, 'netapp', 'volume', snapshot.info.parent);

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.InfrastructureManager.getBodyContainerRef(), {
      title: 'Delete storage snapshot',
      text: `Do you want to delete the storage snapshot ${snapshot.name}?`,
      yes: 'Delete',
      yesClass: 'warn',
      no: 'Cancel',
      boxContent: 'This action is permanent.',
      boxClass: 'text-danger',
      boxIcon: 'warning'
    });

    modalInstance.afterClosed().subscribe(async (result: boolean) => {
      if (result !== true) return;

      this.logger.debug('Infrastructure Manager', 'Deleting storage snapshot');
      const littleModalRef: MatDialogRef<any> = await this.LibModal.openLittleModal(this.InfrastructureManager.getBodyContainerRef(), 'PLEASE WAIT', 'Deleting volume snapshot');

      return this.LibNetappSoapApiService.callSoapApi(connection.uuid, 'snapshot-delete', {
        async: false,
        snapshot: snapshot.name,
        'snapshot-instance-uuid': snapshot.info.obj.name,
        volume: volume.name
      }).then((deleteSnapshotResult: BackendResponse) => {
        if (deleteSnapshotResult.status === 'error') {
          throw {
            error: deleteSnapshotResult.data,
            description: 'Failed to delete NetApp Volume Snapshot'
          };
        }

        this.logger.info('Infrastructure Manager', 'Storage snapshot deleted successfully');
        this.LibModal.changeModalType(littleModalRef.id, 'success');
        this.LibModal.changeModalText(littleModalRef.id, `Snapshot ${snapshot.name} deleted successfully for volume ${volume.name}`);

        // Refresh volume data to fetch the new snapshot
        return this.LibNetappSoapApiHelpersService.getVolumeData(volume);

      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'deleteStorageSnapShot', null, e.description);

        if (littleModalRef && this.LibModal.isModalOpened(littleModalRef.id)) {
          this.LibModal.changeModalType(littleModalRef.id, 'danger');
          this.LibModal.changeModalText(littleModalRef.id, (e.description ? e.description : e.message));
        }

        throw e;
      });
    });
  }
}

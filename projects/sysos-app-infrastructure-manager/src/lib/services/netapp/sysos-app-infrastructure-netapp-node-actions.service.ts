import {Injectable} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibNetappService} from '@sysos/lib-netapp';

import {SysosAppInfrastructureManagerService} from '../sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureNetappService} from './sysos-app-infrastructure-netapp.service';
import {SysosAppInfrastructureManagerObjectHelperService} from '../sysos-app-infrastructure-manager-object-helper.service';
import {NetAppVolume} from '../../types/netapp-volume';
import {NetAppSnapshot} from '../../types/netapp-snapshot';
import {ImDataObject} from '../../types/im-data-object';
import {ImConnection} from '../../types/im-connection';
import {NetAppVserver} from '../../types/netapp-vserver';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureNetappNodeActionsService {

  constructor(private logger: SysosLibLoggerService,
              private Modal: SysosLibModalService,
              private NetApp: SysosLibNetappService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelper: SysosAppInfrastructureManagerObjectHelperService,
              private InfrastructureManagerNetApp: SysosAppInfrastructureNetappService) {
  }

  /**
   * Creates a NetApp Snapshot for a Volume
   */
  createStorageSnapShot(connectionUuid: string, volume: ImDataObject & { info: { data: NetAppVolume } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for create storage snapshot', arguments);

    const connection: ImConnection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);
    const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connectionUuid, 'vserver', volume.info.obj.name);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Create storage snapshot',
        text: `Do you want to create a Storage snapshot for ${volume['volume-id-attributes'].name} volume?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true) return;

        this.logger.debug('Infrastructure Manager', 'Creating storage snapshot', loggerArgs);
        this.Modal.openLittleModal('PLEASE WAIT', 'Creating volume snapshot', '.window--infrastructure-manager .window__main', 'plain').then(() => {

          return this.NetApp.createSnapshot(
            connection.credential,
            connection.host,
            connection.port,
            vServer.name,
            volume.name
          );

        }).then((createSnapshotResult) => {
          if (createSnapshotResult.status === 'error') {
            throw {
              error: createSnapshotResult.error,
              description: 'Failed to get NetApp Volume Snapshot'
            };
          }

          this.logger.info('Infrastructure Manager', 'Storage snapshot created successfully', loggerArgs);
          this.Modal.changeModalType('success', '.window--infrastructure-manager .window__main');
          this.Modal.changeModalText(`Snapshot created successfully for volume ${volume.name}`, '.window--infrastructure-manager .window__main');

          // Refresh volume data to fetch the new snapshot
          return this.InfrastructureManagerNetApp.getVolumeData(connectionUuid, volume);
        });

      });

    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'createStorageSnapShot', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }

  /**
   * Deletes a NetApp Snapshot from a Volume
   */
  deleteStorageSnapShot(connectionUuid: string, volume: ImDataObject & { info: { data: NetAppVolume } }, snapshot: ImDataObject & { info: { data: NetAppSnapshot } }): void {
    const loggerArgs = arguments;

    this.logger.debug('Infrastructure Manager', 'Ask for delete storage snapshot', arguments);

    const connection: ImConnection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);
    const vServer: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getParentObjectByType(connectionUuid, 'vserver', volume.info.obj.name);

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: 'Delete storage snapshot',
        text: `Do you want to delete the storage snapshot ${snapshot.name}?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result !== true) return;

        this.logger.debug('Infrastructure Manager', 'Deleting storage snapshot', loggerArgs);
        this.Modal.openLittleModal('PLEASE WAIT', 'Deleting volume snapshot', '.window--infrastructure-manager .window__main', 'plain').then(() => {

          return this.NetApp.deleteSnapshot(
            connection.credential,
            connection.host,
            connection.port,
            vServer.name,
            volume.name,
            snapshot.name,
            snapshot.info.obj.name
          );

        }).then((deleteSnapshotResult) => {
          if (deleteSnapshotResult.status === 'error') {
            throw {
              error: deleteSnapshotResult.error,
              description: 'Failed to delete NetApp Volume Snapshot'
            };
          }

          this.logger.info('Infrastructure Manager', 'Storage snapshot deleted successfully', loggerArgs);
          this.Modal.changeModalType('success', '.window--infrastructure-manager .window__main');
          this.Modal.changeModalText(`Snapshot ${snapshot.name} deleted successfully for volume ${volume.name}`, '.window--infrastructure-manager .window__main');

          // Refresh volume data to fetch the new snapshot
          return this.InfrastructureManagerNetApp.getVolumeData(connectionUuid, volume);
        });

      });

    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'deleteStorageSnapShot', loggerArgs, e.description);

      if (this.Modal.isModalOpened('.window--infrastructure-manager .window__main')) {
        this.Modal.changeModalType('danger', '.window--infrastructure-manager .window__main');
        this.Modal.changeModalText(e.description, '.window--infrastructure-manager .window__main');
      }

      throw e;
    });
  }
}

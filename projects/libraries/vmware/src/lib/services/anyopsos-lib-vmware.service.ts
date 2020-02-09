import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {ConnectionVmware} from '@anyopsos/module-vmware';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSLibVmwareConnectionsStateService} from './anyopsos-lib-vmware-connections-state.service';
import {AnyOpsOSLibVmwareHelpersService} from './anyopsos-lib-vmware-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareService {

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly LibVmwareConnectionsState: AnyOpsOSLibVmwareConnectionsStateService,
              private readonly LibVmwarehHelpers: AnyOpsOSLibVmwareHelpersService) {
  }


  /**
   * Initialize Vmware connection with Backend
   */
  async sendConnect(connectionUuid: string): Promise<void> {
    this.logger.debug('LibVmware', 'sendConnect -> Connecting...');

    const currentConnection: ConnectionVmware = await this.LibVmwarehHelpers.getConnectionByUuid(connectionUuid);
    if (currentConnection.state === 'connected') throw new Error('already_connected');

    // Start current connection
    await this.socketConnectServer(currentConnection);
  }

  /**
   * Send a message to Backend and setups the connection
   */
  private socketConnectServer(connection: ConnectionVmware): Promise<any> {
    const loggerArgs = arguments;
    this.logger.info('LibVmware', 'Connecting to socket', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new Vmware session
      this.socket.emit('[vmware-session]', {
        connectionUuid: connection.uuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibVmware', 'Error while emitting [vmware-session]', loggerArgs, data.data);
          await this.LibVmwareConnectionsState.patchConnection(connection.uuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibVmwareConnectionsState.patchConnection(connection.uuid, 'state', 'connected');
        await this.LibVmwareConnectionsState.patchConnection(connection.uuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibVmware', 'Disconnecting connection', loggerArgs);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionVmware = await this.LibVmwarehHelpers.getConnectionByUuid(connectionUuid);
      if (currentConnection.state === 'disconnected') throw new Error('already_disconnected');

      this.socket.emit('[vmware-disconnect]', {
        connectionUuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibVmware', 'Error while emitting [vmware-disconnect]', loggerArgs, data.data);
          await this.LibVmwareConnectionsState.patchConnection(connectionUuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibVmwareConnectionsState.patchConnection(connectionUuid, 'state', 'disconnected');
        await this.LibVmwareConnectionsState.patchConnection(connectionUuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Deletes a connection
   */
  deleteConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibVmware', 'Deleting connection', arguments);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionVmware = await this.LibVmwarehHelpers.getConnectionByUuid(connectionUuid);
      if (!currentConnection) {
        this.logger.error('LibVmware', 'deleteConnection -> Resource invalid', loggerArgs);
        throw new Error('resource_invalid');
      }

      if (currentConnection.state === 'connected') await this.disconnectConnection(connectionUuid);

      this.LibVmwareConnectionsState.deleteConnection(connectionUuid).then(() => {
        return resolve();
      }).catch((e: any) => {
        return reject(e);
      });
    });
  }
}

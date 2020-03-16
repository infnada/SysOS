import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {ConnectionVmware} from '@anyopsos/module-node-vmware';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSLibNodeVmwareConnectionsStateService} from './anyopsos-lib-node-vmware-connections-state.service';
import {AnyOpsOSLibNodeVmwareHelpersService} from './anyopsos-lib-node-vmware-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeVmwareService {

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly LibNodeVmwareConnectionsState: AnyOpsOSLibNodeVmwareConnectionsStateService,
              private readonly LibNodeVmwarehHelpers: AnyOpsOSLibNodeVmwareHelpersService) {
  }


  /**
   * Initialize Vmware connection with Backend
   */
  async sendConnect(connectionUuid: string): Promise<void> {
    this.logger.debug('LibNodeVmware', 'sendConnect -> Connecting...');

    const currentConnection: ConnectionVmware = await this.LibNodeVmwarehHelpers.getConnectionByUuid(connectionUuid);
    if (currentConnection.state === 'connected') throw new Error('already_connected');

    // Start current connection
    await this.socketConnectServer(currentConnection);
  }

  /**
   * Send a message to Backend and setups the connection
   */
  private socketConnectServer(connection: ConnectionVmware): Promise<any> {
    const loggerArgs = arguments;
    this.logger.info('LibNodeVmware', 'Connecting to socket', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new Vmware session
      this.socket.emit('[vmware-session]', {
        connectionUuid: connection.uuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibNodeVmware', 'Error while emitting [vmware-session]', loggerArgs, data.data);
          await this.LibNodeVmwareConnectionsState.patchConnection(connection.uuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibNodeVmwareConnectionsState.patchConnection(connection.uuid, 'state', 'connected');
        await this.LibNodeVmwareConnectionsState.patchConnection(connection.uuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibNodeVmware', 'Disconnecting connection', loggerArgs);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionVmware = await this.LibNodeVmwarehHelpers.getConnectionByUuid(connectionUuid);
      if (currentConnection.state === 'disconnected') throw new Error('already_disconnected');

      this.socket.emit('[vmware-disconnect]', {
        connectionUuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibNodeVmware', 'Error while emitting [vmware-disconnect]', loggerArgs, data.data);
          await this.LibNodeVmwareConnectionsState.patchConnection(connectionUuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibNodeVmwareConnectionsState.patchConnection(connectionUuid, 'state', 'disconnected');
        await this.LibNodeVmwareConnectionsState.patchConnection(connectionUuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Deletes a connection
   */
  deleteConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibNodeVmware', 'Deleting connection', arguments);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionVmware = await this.LibNodeVmwarehHelpers.getConnectionByUuid(connectionUuid);
      if (!currentConnection) {
        this.logger.error('LibNodeVmware', 'deleteConnection -> Resource invalid', loggerArgs);
        throw new Error('resource_invalid');
      }

      if (currentConnection.state === 'connected') await this.disconnectConnection(connectionUuid);

      this.LibNodeVmwareConnectionsState.deleteConnection(connectionUuid).then(() => {
        return resolve();
      }).catch((e: any) => {
        return reject(e);
      });
    });
  }
}

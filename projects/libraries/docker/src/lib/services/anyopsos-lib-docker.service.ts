import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {AnyOpsOSLibSshHelpersService, AnyOpsOSLibSshService} from '@anyopsos/lib-ssh';
import {ConnectionDocker} from '@anyopsos/module-docker';
import {ConnectionSsh} from '@anyopsos/module-ssh';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSLibDockerConnectionsStateService} from './anyopsos-lib-docker-connections-state.service';
import {AnyOpsOSLibDockerHelpersService} from './anyopsos-lib-docker-helpers.service';


@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDockerService {

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly LibDockerConnectionsState: AnyOpsOSLibDockerConnectionsStateService,
              private readonly LibDockerhHelpers: AnyOpsOSLibDockerHelpersService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly LibSsh: AnyOpsOSLibSshService) {
  }

  /**
   * Initialize Docker connection with Backend
   */
  async sendConnect(connectionUuid: string): Promise<void> {
    this.logger.debug('LibDocker', 'sendConnect -> Connecting...');

    const currentConnection: ConnectionDocker = await this.LibDockerhHelpers.getConnectionByUuid(connectionUuid);
    if (currentConnection.state === 'connected') throw new Error('already_connected');

    // If current connection have hopServerUuid, make sure it's Online and then Start the current connection
    if (currentConnection.hopServerUuid) {
      await this.LibSsh.sendConnect(currentConnection.hopServerUuid);
      const hopServer: ConnectionSsh = await this.LibSshHelpers.getConnectionByUuid(currentConnection.hopServerUuid, 'ssh') as ConnectionSsh;
      if (hopServer.state === 'disconnected') await this.LibSsh.sendConnect(currentConnection.hopServerUuid);
    }

    // Start current connection
    await this.socketConnectServer(currentConnection);
  }

  /**
   * Send a message to Backend and setups the connection
   */
  private socketConnectServer(connection: ConnectionDocker): Promise<any> {
    const loggerArgs = arguments;
    this.logger.info('LibDocker', 'Connecting to socket', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new Docker session
      this.socket.emit('[docker-session]', {
        connectionUuid: connection.uuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibDocker', 'Error while emitting [docker-session]', loggerArgs, data.data);
          await this.LibDockerConnectionsState.patchConnection(connection.uuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibDockerConnectionsState.patchConnection(connection.uuid, 'state', 'connected');
        await this.LibDockerConnectionsState.patchConnection(connection.uuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibDocker', 'Disconnecting connection', loggerArgs);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionDocker = await this.LibDockerhHelpers.getConnectionByUuid(connectionUuid);
      if (currentConnection.state === 'disconnected') throw new Error('already_disconnected');

      this.socket.emit('[docker-disconnect]', {
        connectionUuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibDocker', 'Error while emitting [docker-disconnect]', loggerArgs, data.data);
          await this.LibDockerConnectionsState.patchConnection(connectionUuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibDockerConnectionsState.patchConnection(connectionUuid, 'state', 'disconnected');
        await this.LibDockerConnectionsState.patchConnection(connectionUuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Deletes a connection
   */
  deleteConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibDocker', 'Deleting connection', arguments);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionDocker = await this.LibDockerhHelpers.getConnectionByUuid(connectionUuid);
      if (!currentConnection) {
        this.logger.error('LibDocker', 'deleteConnection -> Resource invalid', loggerArgs);
        throw new Error('resource_invalid');
      }

      if (currentConnection.state === 'connected') await this.disconnectConnection(connectionUuid);

      this.LibDockerConnectionsState.deleteConnection(connectionUuid).then(() => {
        return resolve();
      }).catch((e: any) => {
        return reject(e);
      });
    });
  }
}

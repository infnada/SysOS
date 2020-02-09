import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {AnyOpsOSLibSshHelpersService, AnyOpsOSLibSshService} from '@anyopsos/lib-ssh';
import {ConnectionKubernetes} from '@anyopsos/module-kubernetes';
import {ConnectionSsh} from '@anyopsos/module-ssh';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSLibKubernetesConnectionsStateService} from './anyopsos-lib-kubernetes-connections-state.service';
import {AnyOpsOSLibKubernetesHelpersService} from './anyopsos-lib-kubernetes-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibKubernetesService {

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly LibKubernetesConnectionsState: AnyOpsOSLibKubernetesConnectionsStateService,
              private readonly LibKuberneteshHelpers: AnyOpsOSLibKubernetesHelpersService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly LibSsh: AnyOpsOSLibSshService) {
  }

  /**
   * Initialize Kubernetes connection with Backend
   */
  async sendConnect(connectionUuid: string): Promise<void> {
    this.logger.debug('LibKubernetes', 'sendConnect -> Connecting...');

    const currentConnection: ConnectionKubernetes = await this.LibKuberneteshHelpers.getConnectionByUuid(connectionUuid);
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
  private socketConnectServer(connection: ConnectionKubernetes): Promise<any> {
    const loggerArgs = arguments;
    this.logger.info('LibKubernetes', 'Connecting to socket', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new Kubernetes session
      this.socket.emit('[kubernetes-session]', {
        connectionUuid: connection.uuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibKubernetes', 'Error while emitting [kubernetes-session]', loggerArgs, data.data);
          await this.LibKubernetesConnectionsState.patchConnection(connection.uuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibKubernetesConnectionsState.patchConnection(connection.uuid, 'state', 'connected');
        await this.LibKubernetesConnectionsState.patchConnection(connection.uuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibKubernetes', 'Disconnecting connection', loggerArgs);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionKubernetes = await this.LibKuberneteshHelpers.getConnectionByUuid(connectionUuid);
      if (currentConnection.state === 'disconnected') throw new Error('already_disconnected');

      this.socket.emit('[kubernetes-disconnect]', {
        connectionUuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibKubernetes', 'Error while emitting [kubernetes-disconnect]', loggerArgs, data.data);
          await this.LibKubernetesConnectionsState.patchConnection(connectionUuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibKubernetesConnectionsState.patchConnection(connectionUuid, 'state', 'disconnected');
        await this.LibKubernetesConnectionsState.patchConnection(connectionUuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Deletes a connection
   */
  deleteConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibKubernetes', 'Deleting connection', arguments);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionKubernetes = await this.LibKuberneteshHelpers.getConnectionByUuid(connectionUuid);
      if (!currentConnection) {
        this.logger.error('LibKubernetes', 'deleteConnection -> Resource invalid', loggerArgs);
        throw new Error('resource_invalid');
      }

      if (currentConnection.state === 'connected') await this.disconnectConnection(connectionUuid);

      this.LibKubernetesConnectionsState.deleteConnection(connectionUuid).then(() => {
        return resolve();
      }).catch((e: any) => {
        return reject(e);
      });
    });
  }
}

import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {ConnectionSsh, ConnectionSftp} from '@anyopsos/module-ssh';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSLibSshConnectionsStateService} from './anyopsos-lib-ssh-connections-state.service';
import {AnyOpsOSLibSshHelpersService} from './anyopsos-lib-ssh-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibSshService {

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly LibSshConnectionsState: AnyOpsOSLibSshConnectionsStateService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService) {
  }

  /**
   * Initialize SSH connection with Backend
   */
  async sendConnect(connectionUuid: string): Promise<void> {
    this.logger.debug('LibSsh', 'sendConnect -> Connecting...');

    const currentConnection: ConnectionSsh | ConnectionSftp = await this.LibSshHelpers.getConnectionByUuid(connectionUuid);
    if (currentConnection.state === 'connected') throw new Error('already_connected');

    // If current connection have hopServerUuid, make sure it's Online and then Start the current connection
    if (currentConnection.hopServerUuid) {
      const hopServer: ConnectionSsh = await this.LibSshHelpers.getConnectionByUuid(currentConnection.hopServerUuid, 'ssh') as ConnectionSsh;

      if (hopServer.state === 'disconnected') await this.socketConnectServer(hopServer);
    }

    // Start current connection
    await this.socketConnectServer(currentConnection);
  }

  /**
   * Send a message to Backend and setups the connection
   */
  private socketConnectServer(connection: ConnectionSsh | ConnectionSftp): Promise<any> {
    const loggerArgs = arguments;
    this.logger.info('LibSsh', 'Connecting to socket', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new SSH session
      this.socket.emit('[ssh-session]', {
        connectionUuid: connection.uuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibSsh', 'Error while emitting [ssh-session]', loggerArgs, data.data);
          await this.LibSshConnectionsState.patchConnection(connection.uuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibSshConnectionsState.patchConnection(connection.uuid, 'state', 'connected');
        await this.LibSshConnectionsState.patchConnection(connection.uuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Creates a Ssh Shell
   */
  socketCreateShell(connectionUuid: string, terminalUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.info('LibSsh', 'Creating Shell', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new SSH Shell
      this.socket.emit('[ssh-shell]', {
        connectionUuid,
        terminalUuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (shellState: BackendResponse) => {
        if (shellState.status === 'error') {
          this.logger.error('LibSsh', 'Error while emitting [ssh-shell]', loggerArgs, shellState.data);
          return reject(shellState.data);
        }

        await this.LibSshConnectionsState.patchConnection(connectionUuid, 'state', 'ready');

        return resolve();
      });
    });
  }

  /**
   * Creates a Ssh Sftp
   */
  socketCreateSftpWrapper(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.info('LibSsh', 'Creating Sftp Wrapper', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new SSH Shell
      this.socket.emit('[ssh-sftp]', {
          connectionUuid,
          workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
        }, async (sftpState: BackendResponse) => {
        if (sftpState.status === 'error') {
          this.logger.error('LibSsh', 'Error while emitting [ssh-sftp]', loggerArgs, sftpState.data);
          return reject(sftpState.data);
        }

        await this.LibSshConnectionsState.patchConnection(connectionUuid, 'state', 'ready');

        return resolve();
      });
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibSsh', 'Disconnecting connection', loggerArgs);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionSsh | ConnectionSftp = await this.LibSshHelpers.getConnectionByUuid(connectionUuid);
      if (currentConnection.state === 'disconnected') throw new Error('already_disconnected');

      this.socket.emit('[ssh-disconnect]', {
        connectionUuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibSsh', 'Error while emitting [ssh-disconnect]', loggerArgs, data.data);
          await this.LibSshConnectionsState.patchConnection(connectionUuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibSshConnectionsState.patchConnection(connectionUuid, 'state', 'disconnected');
        await this.LibSshConnectionsState.patchConnection(connectionUuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Deletes a connection
   */
  deleteConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibSsh', 'Deleting connection', arguments);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionSsh | ConnectionSftp = await this.LibSshHelpers.getConnectionByUuid(connectionUuid);
      if (!currentConnection) {
        this.logger.error('LibSsh', 'deleteConnection -> Resource invalid', loggerArgs);
        throw new Error('resource_invalid');
      }

      if (currentConnection.state === 'connected') await this.disconnectConnection(connectionUuid);

      this.LibSshConnectionsState.deleteConnection(connectionUuid).then(() => {
        return resolve();
      }).catch((e: any) => {
        return reject(e);
      });
    });
  }
}

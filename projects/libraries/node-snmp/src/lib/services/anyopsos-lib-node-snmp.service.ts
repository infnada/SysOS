import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {AnyOpsOSLibSshHelpersService, AnyOpsOSLibSshService} from '@anyopsos/lib-ssh';
import {ConnectionSnmp} from '@anyopsos/module-node-snmp';
import {ConnectionSsh} from '@anyopsos/module-ssh';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSLibNodeSnmpConnectionsStateService} from './anyopsos-lib-node-snmp-connections-state.service';
import {AnyOpsOSLibNodeSnmpHelpersService} from './anyopsos-lib-node-snmp-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeSnmpService {

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly LibNodeSnmpConnectionsState: AnyOpsOSLibNodeSnmpConnectionsStateService,
              private readonly LibNodeSnmphHelpers: AnyOpsOSLibNodeSnmpHelpersService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly LibSsh: AnyOpsOSLibSshService) {
  }

  /**
   * Initialize Snmp connection with Backend
   */
  async sendConnect(connectionUuid: string): Promise<void> {
    this.logger.debug('LibNodeSnmp', 'sendConnect -> Connecting...');

    const currentConnection: ConnectionSnmp = this.LibNodeSnmphHelpers.getConnectionByUuid(connectionUuid);
    if (currentConnection.state === 'connected') throw new Error('already_connected');

    // If current connection have hopServerUuid, make sure it's Online and then Start the current connection
    if (currentConnection.hopServerUuid) {
      await this.LibSsh.sendConnect(currentConnection.hopServerUuid);
      const hopServer: ConnectionSsh = this.LibSshHelpers.getConnectionByUuid(currentConnection.hopServerUuid, 'ssh') as ConnectionSsh;
      if (hopServer.state === 'disconnected') await this.LibSsh.sendConnect(currentConnection.hopServerUuid);
    }

    // Start current connection
    await this.socketConnectServer(currentConnection);
  }

  /**
   * Send a message to Backend and setups the connection
   */
  private socketConnectServer(connection: ConnectionSnmp): Promise<any> {
    const loggerArgs = arguments;
    this.logger.info('LibNodeSnmp', 'Connecting to socket', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new Snmp session
      this.socket.emit('[snmp-session]', {
        connectionUuid: connection.uuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibNodeSnmp', 'Error while emitting [snmp-session]', loggerArgs, data.data);
          await this.LibNodeSnmpConnectionsState.patchConnection(connection.uuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibNodeSnmpConnectionsState.patchConnection(connection.uuid, 'state', 'connected');
        await this.LibNodeSnmpConnectionsState.patchConnection(connection.uuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibNodeSnmp', 'Disconnecting connection', loggerArgs);

    return new Promise((resolve, reject) => {

      const currentConnection: ConnectionSnmp = this.LibNodeSnmphHelpers.getConnectionByUuid(connectionUuid);
      if (currentConnection.state === 'disconnected') throw new Error('already_disconnected');

      this.socket.emit('[snmp-disconnect]', {
        connectionUuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibNodeSnmp', 'Error while emitting [snmp-disconnect]', loggerArgs, data.data);
          await this.LibNodeSnmpConnectionsState.patchConnection(connectionUuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibNodeSnmpConnectionsState.patchConnection(connectionUuid, 'state', 'disconnected');
        await this.LibNodeSnmpConnectionsState.patchConnection(connectionUuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Deletes a connection
   */
  deleteConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibNodeSnmp', 'Deleting connection', arguments);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionSnmp = this.LibNodeSnmphHelpers.getConnectionByUuid(connectionUuid);
      if (!currentConnection) {
        this.logger.error('LibNodeSnmp', 'deleteConnection -> Resource invalid', loggerArgs);
        throw new Error('resource_invalid');
      }

      if (currentConnection.state === 'connected') await this.disconnectConnection(connectionUuid);

      this.LibNodeSnmpConnectionsState.deleteConnection(connectionUuid).then(() => {
        return resolve();
      }).catch((e: any) => {
        return reject(e);
      });
    });
  }
}

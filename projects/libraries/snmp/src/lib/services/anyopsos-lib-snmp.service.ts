import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {AnyOpsOSLibSshHelpersService, AnyOpsOSLibSshService} from '@anyopsos/lib-ssh';
import {ConnectionSnmp} from '@anyopsos/module-snmp';
import {ConnectionSsh} from '@anyopsos/module-ssh';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSLibSnmpConnectionsStateService} from './anyopsos-lib-snmp-connections-state.service';
import {AnyOpsOSLibSnmpHelpersService} from './anyopsos-lib-snmp-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibSnmpService {

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly LibSnmpConnectionsState: AnyOpsOSLibSnmpConnectionsStateService,
              private readonly LibSnmphHelpers: AnyOpsOSLibSnmpHelpersService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly LibSsh: AnyOpsOSLibSshService) {
  }

  /**
   * Initialize Snmp connection with Backend
   */
  async sendConnect(connectionUuid: string): Promise<void> {
    this.logger.debug('LibSnmp', 'sendConnect -> Connecting...');

    const currentConnection: ConnectionSnmp = await this.LibSnmphHelpers.getConnectionByUuid(connectionUuid);
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
  private socketConnectServer(connection: ConnectionSnmp): Promise<any> {
    const loggerArgs = arguments;
    this.logger.info('LibSnmp', 'Connecting to socket', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new Snmp session
      this.socket.emit('[snmp-session]', {
        connectionUuid: connection.uuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibSnmp', 'Error while emitting [snmp-session]', loggerArgs, data.data);
          await this.LibSnmpConnectionsState.patchConnection(connection.uuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibSnmpConnectionsState.patchConnection(connection.uuid, 'state', 'connected');
        await this.LibSnmpConnectionsState.patchConnection(connection.uuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibSnmp', 'Disconnecting connection', loggerArgs);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionSnmp = await this.LibSnmphHelpers.getConnectionByUuid(connectionUuid);
      if (currentConnection.state === 'disconnected') throw new Error('already_disconnected');

      this.socket.emit('[snmp-disconnect]', {
        connectionUuid,
        workspaceUuid: this.LibWorkspace.getCurrentWorkspaceUuid()
      }, async (data: BackendResponse) => {

        if (data.status === 'error') {
          this.logger.error('LibSnmp', 'Error while emitting [snmp-disconnect]', loggerArgs, data.data);
          await this.LibSnmpConnectionsState.patchConnection(connectionUuid, 'error', data.data);

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        await this.LibSnmpConnectionsState.patchConnection(connectionUuid, 'state', 'disconnected');
        await this.LibSnmpConnectionsState.patchConnection(connectionUuid, 'error', null);

        return resolve();
      });
    });
  }

  /**
   * Deletes a connection
   */
  deleteConnection(connectionUuid: string): Promise<void> {
    const loggerArgs = arguments;
    this.logger.debug('LibSnmp', 'Deleting connection', arguments);

    return new Promise(async (resolve, reject) => {

      const currentConnection: ConnectionSnmp = await this.LibSnmphHelpers.getConnectionByUuid(connectionUuid);
      if (!currentConnection) {
        this.logger.error('LibSnmp', 'deleteConnection -> Resource invalid', loggerArgs);
        throw new Error('resource_invalid');
      }

      if (currentConnection.state === 'connected') await this.disconnectConnection(connectionUuid);

      this.LibSnmpConnectionsState.deleteConnection(connectionUuid).then(() => {
        return resolve();
      }).catch((e: any) => {
        return reject(e);
      });
    });
  }
}

import {Injectable} from '@angular/core';

import {take} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionSsh, ConnectionSftp} from '@anyopsos/module-ssh';

import {AnyOpsOSLibSshConnectionsStateService} from './anyopsos-lib-ssh-connections-state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibSshHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibSshConnectionsState: AnyOpsOSLibSshConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  async getConnectionByUuid(connectionUuid: string, type?: 'ssh' | 'sftp'): Promise<ConnectionSsh | ConnectionSftp> {
    const connections: (ConnectionSsh | ConnectionSftp)[] = await this.getAllConnections();

    const currentConnection: ConnectionSsh | ConnectionSftp = connections.find((connection: ConnectionSsh | ConnectionSftp) => {
      return connection.uuid === connectionUuid && (type ? connection.type === type : true);
    });

    if (!currentConnection) {
      this.logger.error('LibSsh', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  async getAllConnections(): Promise<(ConnectionSsh | ConnectionSftp)[]> {
    return this.LibSshConnectionsState.connections.pipe(take(1)).toPromise();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<(ConnectionSsh | ConnectionSftp)[]> {
    return this.LibSshConnectionsState.connections;
  }
}

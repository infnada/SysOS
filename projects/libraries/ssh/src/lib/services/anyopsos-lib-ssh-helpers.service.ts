import {Injectable} from '@angular/core';

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
  getConnectionByUuid(connectionUuid: string, type?: 'ssh' | 'sftp'): ConnectionSsh | ConnectionSftp {
    const connections: (ConnectionSsh | ConnectionSftp)[] = this.getAllConnections();

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
  getAllConnections(): (ConnectionSsh | ConnectionSftp)[] {
    return this.LibSshConnectionsState.$connections.getValue();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<(ConnectionSsh | ConnectionSftp)[]> {
    return this.LibSshConnectionsState.connections;
  }
}

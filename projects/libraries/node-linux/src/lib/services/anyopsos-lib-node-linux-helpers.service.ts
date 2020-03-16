import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionLinux} from '@anyopsos/module-node-linux';

import {AnyOpsOSLibNodeLinuxConnectionsStateService} from './anyopsos-lib-node-linux-connections-state.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeLinuxHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibNodeLinuxConnectionsState: AnyOpsOSLibNodeLinuxConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  getConnectionByUuid(connectionUuid: string): ConnectionLinux {
    const connections: ConnectionLinux[] = this.getAllConnections();

    const currentConnection: ConnectionLinux = connections.find((connection: ConnectionLinux) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibNodeLinux', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  getAllConnections(): ConnectionLinux[] {
    return this.LibNodeLinuxConnectionsState.$connections.getValue();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionLinux[]> {
    return this.LibNodeLinuxConnectionsState.connections;
  }
}

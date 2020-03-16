import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionDocker} from '@anyopsos/module-node-docker';

import {AnyOpsOSLibNodeDockerConnectionsStateService} from './anyopsos-lib-node-docker-connections-state.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeDockerHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibNodeDockerConnectionsState: AnyOpsOSLibNodeDockerConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  getConnectionByUuid(connectionUuid: string): ConnectionDocker {
    const connections: ConnectionDocker[] = this.getAllConnections();

    const currentConnection: ConnectionDocker = connections.find((connection: ConnectionDocker) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibNodeDocker', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  getAllConnections(): ConnectionDocker[] {
    return this.LibNodeDockerConnectionsState.$connections.getValue();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionDocker[]> {
    return this.LibNodeDockerConnectionsState.connections;
  }
}

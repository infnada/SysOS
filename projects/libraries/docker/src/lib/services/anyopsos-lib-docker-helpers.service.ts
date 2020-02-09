import {Injectable} from '@angular/core';

import {take} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionDocker} from '@anyopsos/module-docker';

import {AnyOpsOSLibDockerConnectionsStateService} from './anyopsos-lib-docker-connections-state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDockerHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibDockerConnectionsState: AnyOpsOSLibDockerConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  async getConnectionByUuid(connectionUuid: string): Promise<ConnectionDocker> {
    const connections: ConnectionDocker[] = await this.getAllConnections();

    const currentConnection: ConnectionDocker = connections.find((connection: ConnectionDocker) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibDocker', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  async getAllConnections(): Promise<ConnectionDocker[]> {
    return this.LibDockerConnectionsState.connections.pipe(take(1)).toPromise();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionDocker[]> {
    return this.LibDockerConnectionsState.connections;
  }
}

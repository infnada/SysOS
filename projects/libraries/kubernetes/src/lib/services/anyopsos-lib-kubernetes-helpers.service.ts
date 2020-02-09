import {Injectable} from '@angular/core';

import {take} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionKubernetes} from '@anyopsos/module-kubernetes';

import {AnyOpsOSLibKubernetesConnectionsStateService} from './anyopsos-lib-kubernetes-connections-state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibKubernetesHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibKubernetesConnectionsState: AnyOpsOSLibKubernetesConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  async getConnectionByUuid(connectionUuid: string): Promise<ConnectionKubernetes> {
    const connections: ConnectionKubernetes[] = await this.getAllConnections();

    const currentConnection: ConnectionKubernetes = connections.find((connection: ConnectionKubernetes) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibKubernetes', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  async getAllConnections(): Promise<ConnectionKubernetes[]> {
    return this.LibKubernetesConnectionsState.connections.pipe(take(1)).toPromise();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionKubernetes[]> {
    return this.LibKubernetesConnectionsState.connections;
  }
}

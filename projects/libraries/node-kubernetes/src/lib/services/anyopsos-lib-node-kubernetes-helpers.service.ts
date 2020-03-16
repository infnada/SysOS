import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionKubernetes} from '@anyopsos/module-node-kubernetes';

import {AnyOpsOSLibNodeKubernetesConnectionsStateService} from './anyopsos-lib-node-kubernetes-connections-state.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeKubernetesHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibNodeKubernetesConnectionsState: AnyOpsOSLibNodeKubernetesConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  getConnectionByUuid(connectionUuid: string): ConnectionKubernetes {
    const connections: ConnectionKubernetes[] = this.getAllConnections();

    const currentConnection: ConnectionKubernetes = connections.find((connection: ConnectionKubernetes) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibNodeKubernetes', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  getAllConnections(): ConnectionKubernetes[] {
    return this.LibNodeKubernetesConnectionsState.$connections.getValue();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionKubernetes[]> {
    return this.LibNodeKubernetesConnectionsState.connections;
  }
}

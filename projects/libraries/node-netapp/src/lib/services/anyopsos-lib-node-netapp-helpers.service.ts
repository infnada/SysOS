import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionNetapp} from '@anyopsos/module-node-netapp';

import {AnyOpsOSLibNodeNetappConnectionsStateService} from './anyopsos-lib-node-netapp-connections-state.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeNetappHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibNodeNetappConnectionsState: AnyOpsOSLibNodeNetappConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  getConnectionByUuid(connectionUuid: string): ConnectionNetapp {
    const connections: ConnectionNetapp[] = this.getAllConnections();

    const currentConnection: ConnectionNetapp = connections.find((connection: ConnectionNetapp) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibNodeNetapp', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  getAllConnections(): ConnectionNetapp[] {
    return this.LibNodeNetappConnectionsState.$connections.getValue();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionNetapp[]> {
    return this.LibNodeNetappConnectionsState.connections;
  }
}

import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionSnmp} from '@anyopsos/module-node-snmp';

import {AnyOpsOSLibNodeSnmpConnectionsStateService} from './anyopsos-lib-node-snmp-connections-state.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeSnmpHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibNodeSnmpConnectionsState: AnyOpsOSLibNodeSnmpConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  getConnectionByUuid(connectionUuid: string): ConnectionSnmp {
    const connections: ConnectionSnmp[] = this.getAllConnections();

    const currentConnection: ConnectionSnmp = connections.find((connection: ConnectionSnmp) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibNodeSnmp', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  getAllConnections(): ConnectionSnmp[] {
    return this.LibNodeSnmpConnectionsState.$connections.getValue();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionSnmp[]> {
    return this.LibNodeSnmpConnectionsState.connections;
  }
}

import {Injectable} from '@angular/core';

import {take} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionSnmp} from '@anyopsos/module-snmp';

import {AnyOpsOSLibSnmpConnectionsStateService} from './anyopsos-lib-snmp-connections-state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibSnmpHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibSnmpConnectionsState: AnyOpsOSLibSnmpConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  async getConnectionByUuid(connectionUuid: string): Promise<ConnectionSnmp> {
    const connections: ConnectionSnmp[] = await this.getAllConnections();

    const currentConnection: ConnectionSnmp = connections.find((connection: ConnectionSnmp) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibSnmp', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  async getAllConnections(): Promise<ConnectionSnmp[]> {
    return this.LibSnmpConnectionsState.connections.pipe(take(1)).toPromise();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionSnmp[]> {
    return this.LibSnmpConnectionsState.connections;
  }
}

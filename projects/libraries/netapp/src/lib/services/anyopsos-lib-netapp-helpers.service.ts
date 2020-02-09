import {Injectable} from '@angular/core';

import {take} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionNetapp} from '@anyopsos/module-netapp';

import {AnyOpsOSLibNetappConnectionsStateService} from './anyopsos-lib-netapp-connections-state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNetappHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibNetappConnectionsState: AnyOpsOSLibNetappConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  async getConnectionByUuid(connectionUuid: string): Promise<ConnectionNetapp> {
    const connections: ConnectionNetapp[] = await this.getAllConnections();

    const currentConnection: ConnectionNetapp = connections.find((connection: ConnectionNetapp) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibNetapp', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  async getAllConnections(): Promise<ConnectionNetapp[]> {
    return this.LibNetappConnectionsState.connections.pipe(take(1)).toPromise();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionNetapp[]> {
    return this.LibNetappConnectionsState.connections;
  }
}

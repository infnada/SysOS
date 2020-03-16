import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionVmware} from '@anyopsos/module-node-vmware';

import {AnyOpsOSLibNodeVmwareConnectionsStateService} from './anyopsos-lib-node-vmware-connections-state.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeVmwareHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibNodeVmwareConnectionsState: AnyOpsOSLibNodeVmwareConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  getConnectionByUuid(connectionUuid: string): ConnectionVmware {
    const connections: ConnectionVmware[] = this.getAllConnections();

    const currentConnection: ConnectionVmware = connections.find((connection: ConnectionVmware) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibNodeVmware', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  getAllConnections(): ConnectionVmware[] {
    return this.LibNodeVmwareConnectionsState.$connections.getValue();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionVmware[]> {
    return this.LibNodeVmwareConnectionsState.connections;
  }
}

import {Injectable} from '@angular/core';

import {take} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ConnectionVmware} from '@anyopsos/module-vmware';

import {AnyOpsOSLibVmwareConnectionsStateService} from './anyopsos-lib-vmware-connections-state.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHelpersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibVmwareConnectionsState: AnyOpsOSLibVmwareConnectionsStateService) {
  }

  /**
   * Gets a connection state by given connectionUuid
   */
  async getConnectionByUuid(connectionUuid: string): Promise<ConnectionVmware> {
    const connections: ConnectionVmware[] = await this.getAllConnections();

    const currentConnection: ConnectionVmware = connections.find((connection: ConnectionVmware) => {
      return connection.uuid === connectionUuid;
    });

    if (!currentConnection) {
      this.logger.error('LibVmware', 'getConnectionByUuid -> Resource invalid');
      throw new Error('resource_invalid');
    }
    return currentConnection;
  }

  /**
   * Returns all connections
   */
  async getAllConnections(): Promise<ConnectionVmware[]> {
    return this.LibVmwareConnectionsState.connections.pipe(take(1)).toPromise();
  }

  /**
   * Returns all connections as Observable
   */
  getAllConnectionsObserver(): Observable<ConnectionVmware[]> {
    return this.LibVmwareConnectionsState.connections;
  }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {ConnectionNetapp} from '@anyopsos/module-netapp';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

// TODO extract it from '@anyopsos/module-netapp'
const NETAPP_CONFIG_FILE = 'netapp.json';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNetappConnectionsStateService {
  private connectionsInitialized: boolean = false;

  private readonly $connections: BehaviorSubject<ConnectionNetapp[]>;
  private dataStore: {
    connections: ConnectionNetapp[];
  };
  readonly connections: Observable<ConnectionNetapp[]>;

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService) {

    this.dataStore = { connections: [] };
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.connections = this.$connections.asObservable();

    this.socket
      .fromEvent('[netapp-data]')
      .subscribe((sockData: { op: 'put' | 'patch' | 'delete'; uuid: string; data?: any; }) => {
        console.log(sockData);
      });
  }

  /**
   * Setter & Getter of connectionsInitialized
   * This variable ensures Netapp connections are loaded only once
   */
  setConnectionsInitialized(): void {
    if (this.connectionsInitialized === true) {

      this.logger.error('LibNetapp', 'setConnectionsInitialized -> Connections already initialized');
      throw new Error('already_initialized');
    }

    this.connectionsInitialized = true;
  }

  getConnectionsInitialized(): boolean {
    return this.connectionsInitialized;
  }

  /**
   * Called by Module when the library loads.
   * Sets the initial state.
   */
  initConnections(): void {
    if (this.getConnectionsInitialized()) throw new Error('connections_already_initialized');

    this.LibFileSystem.getConfigFile(NETAPP_CONFIG_FILE)
      .subscribe((connectionsData: BackendResponse & { data: ConnectionNetapp[]; }) => {
        if (connectionsData.status === 'error') {
          this.logger.error('LibNetapp', 'Error while initializing connections', null, connectionsData.data);
          throw connectionsData.data;
        }

        this.setConnectionsInitialized();

        // Update state
        connectionsData.data.forEach((connection: ConnectionNetapp) => this.putConnection(connection, false));
      },
      async (error) => {

        // If config file not exist, create a new one and try again
        if (error.data === 'resource_not_found') {

          await this.LibFileSystem.putConfigFile([], NETAPP_CONFIG_FILE).subscribe((res: BackendResponse) => {
            if (res.status === 'error') throw res.data;

            return this.initConnections();
          },
          error => {
            this.logger.error('LibNetapp', 'Error while getting connections', null, error);
            this.logger.error('LibNetapp', 'Error while creating configuration file', null, error);
          });
        } else {
          this.logger.error('LibNetapp', 'Error while getting connections', null, error);
        }

      });

  }

  /**
   * Updates the current state with a new connection
   */
  putConnection(connection: ConnectionNetapp, saveConnection: boolean = true): Promise<void> {
    this.logger.debug('LibNetapp', 'New connection received', arguments);

    const connectionExists: ConnectionNetapp = this.dataStore.connections.find((conn: ConnectionNetapp) => conn.uuid === connection.uuid);
    if (connectionExists) {
      this.logger.error('LibNetapp', 'putConnection -> Resource already exists', arguments);
      throw new Error('resource_already_exists');
    }

    if (!connection.data) {
      connection.data = {
        Base: {
          name: connection.host
        },
        Data: []
      }
    }

    this.dataStore.connections.push(connection);

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    if (!saveConnection) return;
    return this.saveBackend(connection, 'put');
  }

  /**
   * Updates a connection state
   */
  patchConnection(connectionUuid: string, param: string, data: any): Promise<void> {
    const connectionIndex: number = this.dataStore.connections.findIndex((conn: ConnectionNetapp) => conn.uuid === connectionUuid);
    if (connectionIndex === -1) {
      this.logger.error('LibNetapp', 'patchConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections[connectionIndex][param] = data;

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(this.dataStore.connections[connectionIndex], 'patch');
  }

  patchFullConnection(connection: ConnectionNetapp): Promise<void> {
    const connectionIndex: number = this.dataStore.connections.findIndex((conn: ConnectionNetapp) => conn.uuid === connection.uuid);
    if (connectionIndex === -1) {
      this.logger.error('LibNetapp', 'patchFullConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections[connectionIndex] = connection;

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(this.dataStore.connections[connectionIndex], 'patch');
  }

  /**
   * Deletes a connection from state
   */
  deleteConnection(connectionUuid: string): Promise<void> {
    const currentConnection: ConnectionNetapp = this.dataStore.connections.find((connection: ConnectionNetapp) => connection.uuid === connectionUuid);
    if (!currentConnection) {
      this.logger.error('LibNetapp', 'deleteConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections = this.dataStore.connections.filter((connection: ConnectionNetapp) => connection.uuid !== connectionUuid);

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(currentConnection, 'delete');
  }

  /**
   * Saves current state persistently
   */
  private saveBackend(currentConnection: ConnectionNetapp, type: 'put' | 'patch' | 'delete'): Promise<void> {
    const loggerArgs = arguments;

    return new Promise(async (resolve, reject) => {

      let fileSystemObservable: Observable<Object>;

      if (type === 'put') fileSystemObservable = this.LibFileSystem.putConfigFile(currentConnection, NETAPP_CONFIG_FILE, currentConnection.uuid);
      if (type === 'patch') fileSystemObservable = this.LibFileSystem.patchConfigFile(currentConnection, NETAPP_CONFIG_FILE, currentConnection.uuid);
      if (type === 'delete') fileSystemObservable = this.LibFileSystem.deleteConfigFile(NETAPP_CONFIG_FILE, currentConnection.uuid);

      fileSystemObservable.subscribe((res: BackendResponse) => {
          if (res.status === 'error') {
            this.logger.error('LibNetapp', 'Error while saving connection', null, res.data);
            return reject(res.data);
          }

          this.logger.debug('LibNetapp', 'Saved connection successfully', loggerArgs);
          return resolve(res.data);
        },
        error => {
          this.logger.error('LibNetapp', 'Error while saving connection', loggerArgs, error);
          return reject(error);
        });
    });
  }

}

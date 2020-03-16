import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {ConnectionLinux} from '@anyopsos/module-node-linux';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';


// TODO extract it from '@anyopsos/module-node-linux'
const LINUX_CONFIG_FILE = 'linux.json';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeLinuxConnectionsStateService {
  private connectionsInitialized: boolean = false;

  readonly $connections: BehaviorSubject<ConnectionLinux[]>;
  private dataStore: {
    connections: ConnectionLinux[];
  };
  readonly connections: Observable<ConnectionLinux[]>;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService) {

    this.dataStore = { connections: [] };
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.connections = this.$connections.asObservable();
  }

  /**
   * Setter & Getter of connectionsInitialized
   * This variable ensures Linux connections are loaded only once
   */
  setConnectionsInitialized(): void {
    if (this.connectionsInitialized === true) {

      this.logger.error('LibNodeLinux', 'setConnectionsInitialized -> Connections already initialized');
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

    this.LibFileSystem.getConfigFile(LINUX_CONFIG_FILE)
      .subscribe((connectionsData: BackendResponse & { data: ConnectionLinux[]; }) => {
        if (connectionsData.status === 'error') {
          this.logger.error('LibNodeLinux', 'Error while initializing connections', null, connectionsData.data);
          throw connectionsData.data;
        }

        this.setConnectionsInitialized();

        // Update state
        connectionsData.data.forEach((connection: ConnectionLinux) => this.putConnection(connection, false));
      },
      async (error) => {

        // If config file not exist, create a new one and try again
        if (error.data === 'resource_not_found') {

          await this.LibFileSystem.putConfigFile([], LINUX_CONFIG_FILE).subscribe((res: BackendResponse) => {
            if (res.status === 'error') throw res.data;

            return this.initConnections();
          },
          error => {
            this.logger.error('LibNodeLinux', 'Error while getting connections', null, error);
            this.logger.error('LibNodeLinux', 'Error while creating configuration file', null, error);
          });
        } else {
          this.logger.error('LibNodeLinux', 'Error while getting connections', null, error);
        }

      });

  }

  /**
   * Updates the current state with a new connection
   */
  putConnection(connection: ConnectionLinux, saveConnection: boolean = true): Promise<void> {
    this.logger.debug('LibNodeLinux', 'New connection received', arguments);

    const connectionExists: ConnectionLinux = this.dataStore.connections.find((conn: ConnectionLinux) => conn.uuid === connection.uuid);
    if (connectionExists) {
      this.logger.error('LibNodeLinux', 'putConnection -> Resource already exists', arguments);
      throw new Error('resource_already_exists');
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
    const connectionIndex: number = this.dataStore.connections.findIndex((conn: ConnectionLinux) => conn.uuid === connectionUuid);
    if (connectionIndex === -1) {
      this.logger.error('LibNodeLinux', 'patchConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections[connectionIndex][param] = data;

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(this.dataStore.connections[connectionIndex], 'patch');
  }

  patchFullConnection(connection: ConnectionLinux): Promise<void> {
    const connectionIndex: number = this.dataStore.connections.findIndex((conn: ConnectionLinux) => conn.uuid === connection.uuid);
    if (connectionIndex === -1) {
      this.logger.error('LibNodeLinux', 'patchFullConnection -> Resource invalid', arguments);
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
    const currentConnection: ConnectionLinux = this.dataStore.connections.find((connection: ConnectionLinux) => connection.uuid === connectionUuid);
    if (!currentConnection) {
      this.logger.error('LibNodeLinux', 'deleteConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections = this.dataStore.connections.filter((connection: ConnectionLinux) => connection.uuid !== connectionUuid);

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(currentConnection, 'delete');
  }

  /**
   * Saves current state persistently
   */
  private saveBackend(currentConnection: ConnectionLinux, type: 'put' | 'patch' | 'delete'): Promise<void> {
    const loggerArgs = arguments;

    return new Promise(async (resolve, reject) => {

      let fileSystemObservable: Observable<Object>;

      if (type === 'put') fileSystemObservable = this.LibFileSystem.putConfigFile(currentConnection, LINUX_CONFIG_FILE, currentConnection.uuid);
      if (type === 'patch') fileSystemObservable = this.LibFileSystem.patchConfigFile(currentConnection, LINUX_CONFIG_FILE, currentConnection.uuid);
      if (type === 'delete') fileSystemObservable = this.LibFileSystem.deleteConfigFile(LINUX_CONFIG_FILE, currentConnection.uuid);

      fileSystemObservable.subscribe((res: BackendResponse) => {
          if (res.status === 'error') {
            this.logger.error('LibNodeLinux', 'Error while saving connection', null, res.data);
            return reject(res.data);
          }

          this.logger.debug('LibNodeLinux', 'Saved connection successfully', loggerArgs);
          return resolve(res.data);
        },
        error => {
          this.logger.error('LibNodeLinux', 'Error while saving connection', loggerArgs, error);
          return reject(error);
        });
    });
  }

}

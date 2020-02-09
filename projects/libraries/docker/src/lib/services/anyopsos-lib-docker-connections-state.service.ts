import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {ConnectionDocker} from '@anyopsos/module-docker';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

// TODO extract it from '@anyopsos/module-docker'
const DOCKER_CONFIG_FILE = 'docker.json';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDockerConnectionsStateService {
  private connectionsInitialized: boolean = false;

  private readonly $connections: BehaviorSubject<ConnectionDocker[]>;
  private dataStore: {
    connections: ConnectionDocker[];
  };
  readonly connections: Observable<ConnectionDocker[]>;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService) {

    this.dataStore = { connections: [] };
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.connections = this.$connections.asObservable();
  }

  /**
   * Setter & Getter of connectionsInitialized
   * This variable ensures Docker connections are loaded only once
   */
  setConnectionsInitialized(): void {
    if (this.connectionsInitialized === true) {

      this.logger.error('LibDocker', 'setConnectionsInitialized -> Connections already initialized');
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

    this.LibFileSystem.getConfigFile(DOCKER_CONFIG_FILE)
      .subscribe((connectionsData: BackendResponse & { data: ConnectionDocker[]; }) => {
        if (connectionsData.status === 'error') {
          this.logger.error('LibDocker', 'Error while initializing connections', null, connectionsData.data);
          throw connectionsData.data;
        }

        this.setConnectionsInitialized();

        // Update state
        connectionsData.data.forEach((connection: ConnectionDocker) => this.putConnection(connection, false));
      },
      async (error) => {

        // If config file not exist, create a new one and try again
        if (error.data === 'resource_not_found') {

          await this.LibFileSystem.putConfigFile([], DOCKER_CONFIG_FILE).subscribe((res: BackendResponse) => {
            if (res.status === 'error') throw res.data;

            return this.initConnections();
          },
          error => {
            this.logger.error('LibDocker', 'Error while getting connections', null, error);
            this.logger.error('LibDocker', 'Error while creating configuration file', null, error);
          });
        } else {
          this.logger.error('LibDocker', 'Error while getting connections', null, error);
        }

      });

  }

  /**
   * Updates the current state with a new connection
   */
  putConnection(connection: ConnectionDocker, saveConnection: boolean = true): Promise<void> {
    this.logger.debug('LibDocker', 'New connection received', arguments);

    const connectionExists: ConnectionDocker = this.dataStore.connections.find((conn: ConnectionDocker) => conn.uuid === connection.uuid);
    if (connectionExists) {
      this.logger.error('LibDocker', 'putConnection -> Resource already exists', arguments);
      throw new Error('resource_already_exists');
    }

    if (!connection.data) {
      connection.data = {
        Base: {
          name: connection.clusterName
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
    const connectionIndex: number = this.dataStore.connections.findIndex((conn: ConnectionDocker) => conn.uuid === connectionUuid);
    if (connectionIndex === -1) {
      this.logger.error('LibDocker', 'patchConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections[connectionIndex][param] = data;

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(this.dataStore.connections[connectionIndex], 'patch');
  }

  patchFullConnection(connection: ConnectionDocker): Promise<void> {
    const connectionIndex: number = this.dataStore.connections.findIndex((conn: ConnectionDocker) => conn.uuid === connection.uuid);
    if (connectionIndex === -1) {
      this.logger.error('LibDocker', 'patchFullConnection -> Resource invalid', arguments);
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
    const currentConnection: ConnectionDocker = this.dataStore.connections.find((connection: ConnectionDocker) => connection.uuid === connectionUuid);
    if (!currentConnection) {
      this.logger.error('LibDocker', 'deleteConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections = this.dataStore.connections.filter((connection: ConnectionDocker) => connection.uuid !== connectionUuid);

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(currentConnection, 'delete');
  }

  /**
   * Saves current state persistently
   */
  private saveBackend(currentConnection: ConnectionDocker, type: 'put' | 'patch' | 'delete'): Promise<void> {
    const loggerArgs = arguments;

    return new Promise(async (resolve, reject) => {

      let fileSystemObservable: Observable<Object>;

      if (type === 'put') fileSystemObservable = this.LibFileSystem.putConfigFile(currentConnection, DOCKER_CONFIG_FILE, currentConnection.uuid);
      if (type === 'patch') fileSystemObservable = this.LibFileSystem.patchConfigFile(currentConnection, DOCKER_CONFIG_FILE, currentConnection.uuid);
      if (type === 'delete') fileSystemObservable = this.LibFileSystem.deleteConfigFile(DOCKER_CONFIG_FILE, currentConnection.uuid);

      fileSystemObservable.subscribe((res: BackendResponse) => {
          if (res.status === 'error') {
            this.logger.error('LibDocker', 'Error while saving connection', null, res.data);
            return reject(res.data);
          }

          this.logger.debug('LibDocker', 'Saved connection successfully', loggerArgs);
          return resolve(res.data);
        },
        error => {
          this.logger.error('LibDocker', 'Error while saving connection', loggerArgs, error);
          return reject(error);
        });
    });
  }

}

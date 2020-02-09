import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, timer} from 'rxjs';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {ConnectionKubernetes} from '@anyopsos/module-kubernetes';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';


// TODO extract it from '@anyopsos/module-kubernetes'
const KUBERNETES_CONFIG_FILE = 'kubernetes.json';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibKubernetesConnectionsStateService {
  private connectionsInitialized: boolean = false;

  private readonly $connections: BehaviorSubject<ConnectionKubernetes[]>;
  private dataStore: {
    connections: ConnectionKubernetes[];
  };
  readonly connections: Observable<ConnectionKubernetes[]>;

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService) {

    this.dataStore = { connections: [] };
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.connections = this.$connections.asObservable();

    this.socket
      .fromEvent('[kubernetes-data]')
      .subscribe((sockData: { op: 'put' | 'patch' | 'delete'; uuid: string; data?: any; }) => {
        console.log(sockData);

        // TODO
        // Tell InfrastructureManager that we changed connections data
        /*if (this.subTimeout) this.subTimeout.unsubscribe();
        this.subTimeout = timer(1000).subscribe(() => {
          this.InfrastructureManager.connectionsUpdated();
        });*/
      });
  }

  /**
   * Setter & Getter of connectionsInitialized
   * This variable ensures Kubernetes connections are loaded only once
   */
  setConnectionsInitialized(): void {
    if (this.connectionsInitialized === true) {

      this.logger.error('LibKubernetes', 'setConnectionsInitialized -> Connections already initialized');
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

    this.LibFileSystem.getConfigFile(KUBERNETES_CONFIG_FILE)
      .subscribe((connectionsData: BackendResponse & { data: ConnectionKubernetes[]; }) => {
        if (connectionsData.status === 'error') {
          this.logger.error('LibKubernetes', 'Error while initializing connections', null, connectionsData.data);
          throw connectionsData.data;
        }

        this.setConnectionsInitialized();

        // Update state
        connectionsData.data.forEach((connection: ConnectionKubernetes) => this.putConnection(connection, false));
      },
      async (error) => {

        // If config file not exist, create a new one and try again
        if (error.data === 'resource_not_found') {

          await this.LibFileSystem.putConfigFile([], KUBERNETES_CONFIG_FILE).subscribe((res: BackendResponse) => {
            if (res.status === 'error') throw res.data;

            return this.initConnections();
          },
          error => {
            this.logger.error('LibKubernetes', 'Error while getting connections', null, error);
            this.logger.error('LibKubernetesº', 'Error while creating configuration file', null, error);
          });
        } else {
          this.logger.error('LibKubernetes', 'Error while getting connections', null, error);
        }

      });

  }

  /**
   * Updates the current state with a new connection
   */
  putConnection(connection: ConnectionKubernetes, saveConnection: boolean = true): Promise<void> {
    this.logger.debug('LibKubernetes', 'New connection received', arguments);

    const connectionExists: ConnectionKubernetes = this.dataStore.connections.find((conn: ConnectionKubernetes) => conn.uuid === connection.uuid);
    if (connectionExists) {
      this.logger.error('LibKubernetes', 'putConnection -> Resource already exists', arguments);
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
    const connectionIndex: number = this.dataStore.connections.findIndex((conn: ConnectionKubernetes) => conn.uuid === connectionUuid);
    if (connectionIndex === -1) {
      this.logger.error('LibKubernetes', 'patchConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections[connectionIndex][param] = data;

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(this.dataStore.connections[connectionIndex], 'patch');
  }

  patchFullConnection(connection: ConnectionKubernetes): Promise<void> {
    const connectionIndex: number = this.dataStore.connections.findIndex((conn: ConnectionKubernetes) => conn.uuid === connection.uuid);
    if (connectionIndex === -1) {
      this.logger.error('LibKubernetes', 'patchFullConnection -> Resource invalid', arguments);
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
    const currentConnection: ConnectionKubernetes = this.dataStore.connections.find((connection: ConnectionKubernetes) => connection.uuid === connectionUuid);
    if (!currentConnection) {
      this.logger.error('LibKubernetes', 'deleteConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.connections = this.dataStore.connections.filter((connection: ConnectionKubernetes) => connection.uuid !== connectionUuid);

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return this.saveBackend(currentConnection, 'delete');
  }

  /**
   * Saves current state persistently
   */
  private saveBackend(currentConnection: ConnectionKubernetes, type: 'put' | 'patch' | 'delete'): Promise<void> {
    const loggerArgs = arguments;

    return new Promise(async (resolve, reject) => {

      let fileSystemObservable: Observable<Object>;

      if (type === 'put') fileSystemObservable = this.LibFileSystem.putConfigFile(currentConnection, KUBERNETES_CONFIG_FILE, currentConnection.uuid);
      if (type === 'patch') fileSystemObservable = this.LibFileSystem.patchConfigFile(currentConnection, KUBERNETES_CONFIG_FILE, currentConnection.uuid);
      if (type === 'delete') fileSystemObservable = this.LibFileSystem.deleteConfigFile(KUBERNETES_CONFIG_FILE, currentConnection.uuid);

      fileSystemObservable.subscribe((res: BackendResponse) => {
          if (res.status === 'error') {
            this.logger.error('LibKubernetes', 'Error while saving connection', null, res.data);
            return reject(res.data);
          }

          this.logger.debug('LibKubernetes', 'Saved connection successfully', loggerArgs);
          return resolve(res.data);
        },
        error => {
          this.logger.error('LibKubernetes', 'Error while saving connection', loggerArgs, error);
          return reject(error);
        });
    });
  }

}

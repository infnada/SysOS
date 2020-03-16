import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {ConnectionKubernetes} from '@anyopsos/module-node-kubernetes';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';


// TODO extract it from '@anyopsos/module-node-kubernetes'
const KUBERNETES_CONFIG_FILE = 'kubernetes.json';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeKubernetesConnectionsStateService {
  private connectionsInitialized: boolean = false;

  readonly $connections: BehaviorSubject<ConnectionKubernetes[]>;
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
      .subscribe((sockData: { connectionUuid: string; data: { op: 'put' | 'patch' | 'delete'; uuid: string; data?: any; } }) => {
        console.log(sockData);

        const mainUuid: string = sockData.connectionUuid;
        let connection: ConnectionKubernetes = this.dataStore.connections.find((connection: ConnectionKubernetes) => connection.uuid === mainUuid);
        const isObject: boolean = sockData.data.uuid.includes('#') && sockData.data.uuid.includes(';');
        const op: 'put' | 'patch' | 'delete' = sockData.data.op;
        const connectionData: any = sockData.data.data;

        if (isObject) {
          if (op === 'put') {
            connection.data.Data.push(connectionData);
          }

          if (op === 'delete') {
            connection.data.Data.splice(
              connection.data.Data.findIndex((object: DataObject) => object.info.uuid === sockData.data.uuid), 1);
          }

          if (op === 'patch') {
            connection.data.Data.splice(
              connection.data.Data.findIndex((object: DataObject) => object.info.uuid === sockData.data.uuid), 1, connectionData);
          }

        } else {

          if (op === 'put' || op === 'patch') {
            connection = {...connection, ...connectionData};
          }

          if (op === 'delete') {
            Object.keys(connectionData)
              .forEach((key: string) => delete connection[key]);
          }

        }

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);

      });
  }

  /**
   * Setter & Getter of connectionsInitialized
   * This variable ensures Kubernetes connections are loaded only once
   */
  setConnectionsInitialized(): void {
    if (this.connectionsInitialized === true) {

      this.logger.error('LibNodeKubernetes', 'setConnectionsInitialized -> Connections already initialized');
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
          this.logger.error('LibNodeKubernetes', 'Error while initializing connections', null, connectionsData.data);
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
            this.logger.error('LibNodeKubernetes', 'Error while getting connections', null, error);
            this.logger.error('LibNodeKubernetesº', 'Error while creating configuration file', null, error);
          });
        } else {
          this.logger.error('LibNodeKubernetes', 'Error while getting connections', null, error);
        }

      });

  }

  /**
   * Updates the current state with a new connection
   */
  putConnection(connection: ConnectionKubernetes, saveConnection: boolean = true): Promise<void> {
    this.logger.debug('LibNodeKubernetes', 'New connection received', arguments);

    const connectionExists: ConnectionKubernetes = this.dataStore.connections.find((conn: ConnectionKubernetes) => conn.uuid === connection.uuid);
    if (connectionExists) {
      this.logger.error('LibNodeKubernetes', 'putConnection -> Resource already exists', arguments);
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
      this.logger.error('LibNodeKubernetes', 'patchConnection -> Resource invalid', arguments);
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
      this.logger.error('LibNodeKubernetes', 'patchFullConnection -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    if (!connection.data) {
      connection.data = {
        Base: {
          name: connection.clusterName
        },
        Data: []
      }
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
      this.logger.error('LibNodeKubernetes', 'deleteConnection -> Resource invalid', arguments);
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
            this.logger.error('LibNodeKubernetes', 'Error while saving connection', null, res.data);
            return reject(res.data);
          }

          this.logger.debug('LibNodeKubernetes', 'Saved connection successfully', loggerArgs);
          return resolve(res.data);
        },
        error => {
          this.logger.error('LibNodeKubernetes', 'Error while saving connection', loggerArgs, error);
          return reject(error);
        });
    });
  }

}

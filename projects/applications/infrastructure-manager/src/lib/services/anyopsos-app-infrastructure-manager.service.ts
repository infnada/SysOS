import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {v4 as uuidv4} from 'uuid';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {ImConnection} from '../types/connections/im-connection';
import {ImDataObject} from '../types/im-data-object';
import {ConnectionKubernetes} from '../types/connections/connection-kubernetes';
import {ConnectionDocker} from '../types/connections/connection-docker';
import {ConnectionLinux} from '../types/connections/connection-linux';
import {ConnectionNetapp} from '../types/connections/connection-netapp';
import {ConnectionSnmp} from '../types/connections/connection-snmp';
import {ConnectionVmware} from '../types/connections/connection-vmware';
import {ConnectionTypes} from '../types/connections/connection-types';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerService {
  private subjectConnectGetData: Subject<ConnectionTypes> = new Subject();

  private $connections: BehaviorSubject<ConnectionTypes[]>;
  private $activeConnection: BehaviorSubject<string>;
  private $activeObject: BehaviorSubject<string>;

  private dataStore: {  // This is where we will store our data in memory
    connections: ConnectionTypes[];
    activeConnection: string;
    activeObject: string;
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;
  activeObject: Observable<any>;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private socket: Socket,
              private Modal: AnyOpsOSLibModalService,
              private Applications: AnyOpsOSLibApplicationService,
              private FileSystem: AnyOpsOSLibFileSystemService) {

    this.dataStore = { connections: [], activeConnection: null, activeObject: null };
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.$activeObject = new BehaviorSubject(this.dataStore.activeObject);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
    this.activeObject = this.$activeObject.asObservable();

  }

  /**
   * Return all connections
   */
  getConnections(): ConnectionTypes[] {
    return this.dataStore.connections;
  }

  /**
   * Return all connections matching 'type' type
   */
  getConnectionsByType(type: string): ConnectionTypes[] {
    if (!type) throw new Error('type');

    return this.dataStore.connections.filter(obj => obj.type === type);
  }

  /**
   * Get connection full object matching 'uuid'
   */
  getConnectionByUuid(uuid: string): ConnectionTypes {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  /**
   * Get current connection
   */
  getActiveConnection(): ConnectionTypes {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  /**
   * Get current connection active object
   */
  getActiveObject(): ImDataObject {
    if (this.dataStore.activeObject === null) return null;

    return this.getActiveConnection().data.Data.find(obj => obj.info.uuid === this.dataStore.activeObject);
  }

  /**
   * Sets current/active connection
   */
  setActiveConnection(connectionUuid: string): void {
    // reset ActiveObject
    this.setActiveObject(null);

    this.dataStore.activeConnection = connectionUuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  /**
   * Sets current/active object
   */
  setActiveObject(objectUuid: string): void {
    this.dataStore.activeObject = objectUuid;

    // broadcast data to subscribers
    this.$activeObject.next(Object.assign({}, this.dataStore).activeObject);
  }

  /**
   * -------------------------
   *  New connections
   * -------------------------
   */

  /**
   * Called when application is initialized
   */
  // TODO if autologin is true, Backend should already started the connection and the state should be 'connected'
  initConnections(): void {
    this.FileSystem.getConfigFile('applications/infrastructure-manager/config.json').subscribe(
      (res: BackendResponse & { data: ConnectionTypes[]; }) => {
        this.logger.info('Infrastructure Manager', 'Got connections successfully');

        res.data.forEach((connection) => {
          if (connection.type !== 'vmware' && connection.type !== 'netapp') connection.state = 'disconnected';

          this.setConnectionByType(connection, true);

          this.initializeConnection(connection);
        });

        // broadcast data to subscribers
        this.connectionsUpdated();
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while getting connections', null, error);
      });
  }

  /**
   * @Description
   * Called when user starts a new connection
   */
  connect(connection: ConnectionTypes, saveOnly: boolean = false): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Infrastructure Manager', 'Connect received', arguments);

    if (connection.uuid) {
      connection.state = 'disconnected';

      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => {
        return obj.uuid === connection.uuid;
      });

      this.dataStore.connections[currentConnectionIndex] = connection;

    } else {

      // Check if connection already exists

      if (this.dataStore.connections.filter(obj => {
        if (connection.type === 'kubernetes' || connection.type === 'docker') {
          return obj.type === connection.type && obj.clusterServer === connection.clusterServer;
        } else {
          return obj.type === connection.type && obj.host === connection.host;
        }

      }).length > 0) {
        this.logger.error('Infrastructure Manager', 'Error while setting new connection -> Connection already exists', arguments);
        return null;
      }

      connection.uuid = uuidv4();

      this.setConnectionByType(connection);
    }

    this.connectionsUpdated();

    // Save initial data then initialize
    Promise.resolve().then(() => {
      if (connection.save) return this.saveConnection(this.getConnectionByUuid(connection.uuid));

      return;
    }).then(() => {
      if (!saveOnly) this.initializeConnection(connection);

      this.setActiveConnection(connection.uuid);
    });

  }

  private initializeConnection(connection: ConnectionTypes): void {
    return this.subjectConnectGetData.next(connection);
  }

  /**
   * "dispatcher"
   */
  private setConnectionByType(connection: ConnectionTypes, initialized?: boolean): void {
    if (connection.type === 'vmware') return this.setNewConnectionVirtual(connection, initialized);
    if (connection.type === 'netapp') return this.setNewConnectionNetApp(connection, initialized);
    if (connection.type === 'kubernetes') return this.setNewConnectionKubernetes(connection, initialized);
    if (connection.type === 'docker') return this.setNewConnectionDocker(connection, initialized);
    if (connection.type === 'linux') return this.setNewConnectionLinux(connection, initialized);
    if (connection.type === 'snmp') return this.setNewConnectionSNMP(connection, initialized);
  }

  /**
   * Add new Linux connection to connections array
   */
  private setNewConnectionLinux(connection: ConnectionLinux, initialized?: boolean): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        data: {
          Data: []
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * Add new SNMP connection to connections array
   */
  private setNewConnectionSNMP(connection: ConnectionSnmp, initialized?: boolean): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        data: {
          Data: []
        },
        community: connection.community,
        state: 'disconnected'
      });
      // so?
      // oids: connection.oids,
    }
  }

  /**
   * Add new Virtual connection to connections array
   */
  private setNewConnectionVirtual(connection: ConnectionVmware, initialized?: boolean): void {
    if (initialized) {
      // Reset nextVersion of WaitForUpdatesEx
      connection.data.nextVersion = null;

      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        data: {
          nextVersion: null,
          Base: {
            name: connection.host
          },
          Data: []
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * Add new NetApp connection to connections array
   */
  private setNewConnectionNetApp(connection: ConnectionNetapp, initialized?: boolean): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        data: {
          Base: {
            name: connection.host
          },
          Data: []
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * Add new Kubernetes connection to connections array
   */
  private setNewConnectionKubernetes(connection: ConnectionKubernetes, initialized?: boolean): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        clusterName: connection.clusterName,
        clusterServer: connection.clusterServer,
        clusterCa: connection.clusterCa,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        data: {
          Base: {
            name: connection.clusterName
          },
          Data: []
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * Add new Docker connection to connections array
   */
  private setNewConnectionDocker(connection: ConnectionDocker, initialized?: boolean): void {
    if (initialized) {
      this.dataStore.connections.push(connection);
    } else {
      this.dataStore.connections.push({
        uuid: connection.uuid,
        clusterName: connection.clusterName,
        clusterServer: connection.clusterServer,
        clusterCa: connection.clusterCa,
        description: connection.description,
        credential: connection.credential,
        type: connection.type,
        autologin: connection.autologin,
        save: connection.save,
        data: {
          Data: []
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * -------------------------
   * Interact with connections
   * -------------------------
   */
  saveConnection(connection: ImConnection & ConnectionTypes): Promise<void> {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');
    this.logger.debug('Infrastructure Manager', 'Saving connection', arguments);

    return new Promise (resolve => {
      this.FileSystem.patchConfigFile(connection, 'applications/infrastructure-manager/config.json', connection.uuid).subscribe(
        () => {
          this.logger.debug('Infrastructure Manager', 'Saved connection successfully', loggerArgs);

          resolve();
        },
        error => {
          this.logger.error('Infrastructure Manager', 'Error while saving connection', loggerArgs, error);
        });

    });

  }

  disconnectConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.logger.debug('Infrastructure Manager', 'Disconnecting connection');

    if (this.getConnectionByUuid(connectionUuid).type === 'linux') {
      this.socket.emit('[linux-disconnect]', {
        type: 'linux',
        uuid: connectionUuid
      });
    }

    this.getConnectionByUuid(connectionUuid).state = 'disconnected';

    // broadcast data to subscribers
    this.connectionsUpdated();
  }

  deleteConnection(connectionUuid?: string): void {
    const loggerArgs = arguments;

    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    const configFile = 'applications/infrastructure-manager/config.json';

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: `Delete connection ${this.getConnectionByUuid(connectionUuid).description}`,
        text: 'Remove the selected connection from the inventory?',
        yes: 'Delete',
        yesClass: 'warn',
        no: 'Cancel',
        boxContent: 'This action is permanent.',
        boxClass: 'text-danger',
        boxIcon: 'warning'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Deleting connection', loggerArgs);

          this.disconnectConnection(connectionUuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFile(configFile, connectionUuid).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== connectionUuid;
              });

              // broadcast data to subscribers
              this.connectionsUpdated();

              this.logger.debug('Infrastructure Manager', 'Connection deleted successfully', loggerArgs);
            },
            error => {
              this.logger.error('Infrastructure Manager', 'Error while deleting connection', loggerArgs, error);
            });

        }
      });
    });

  }

  editConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    if (this.getConnectionByUuid(connectionUuid).state === 'disconnected') {
      this.setActiveConnection(connectionUuid);
      this.disconnectConnection();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--infrastructure-manager .window__main',
      {
        title: `Edit connection ${this.getConnectionByUuid(connectionUuid).description}`,
        text: 'Your connection will be disconnected before editing it. Continue?',
        yes: 'Continue',
        no: 'Cancel'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.setActiveConnection(connectionUuid);
          this.disconnectConnection();

        }
      });
    });

  }

  refreshConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.connect(this.getConnectionByUuid(connectionUuid));
  }

  /**
   * -------------------------
   * SHARED
   * -------------------------
   */

  /**
   *
   */
  openBackupsManager(type: string, data: { [key: string]: ImDataObject }) {
    this.logger.debug('Infrastructure Manager', 'Opening Backups Manager APP');

    this.Applications.openApplication('backups-manager',
    {
      type,
      data
    });
  }

  /**
   * We use this to bypass circular module dependency.
   * IM(component) -> IMS(this service) -> $(Obs) -> IM -> IMNetApp/IMVMWare (Since IMNetApp/IMVMWare already have IMS as dependency)
   * So we can't call IMNetApp/IMVMWare directly from IMS
   */
  getObserverConnectGetData(): Observable<any> {
    return this.subjectConnectGetData.asObservable();
  }

  /**
   * Called manually every time any property/value from this.dataStore.connections is modified.
   * This allows us to set new treeData for MatTreeFlatDataSource.
   */
  connectionsUpdated() {
    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

}

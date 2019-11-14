import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {v4 as uuidv4} from 'uuid';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';

import {ImConnection} from '../types/im-connection';
import {IMLink} from '../types/imlink';
import {ImDataObject} from '../types/im-data-object';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerService {
  private linksMap: IMLink[];

  private subjectConnectGetData = new Subject<any>();

  private $connections: BehaviorSubject<ImConnection[]>;
  private $activeConnection: BehaviorSubject<string>;

  private dataStore: {  // This is where we will store our data in memory
    connections: ImConnection[],
    activeConnection: string
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private Toastr: ToastrService,
              private socket: Socket,
              private Modal: AnyOpsOSLibModalService,
              private Applications: AnyOpsOSLibApplicationService,
              private FileSystem: AnyOpsOSLibFileSystemService) {
    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<ImConnection[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
  }

  /**
   * Return all connections
   */
  getConnections(): ImConnection[] {
    return this.dataStore.connections;
  }

  /**
   * Return all connections matching 'type' type
   */
  getConnectionsByType(type: string): ImConnection[] {
    return this.dataStore.connections.filter(obj => {
      return obj.type === type;
    });
  }

  /**
   * Get current connection full object or MAIN object
   */
  getActiveConnection(returnMain: boolean = false): ImConnection {
    if (this.dataStore.activeConnection === null) return null;

    if (this.dataStore.activeConnection.includes(';')) {
      const topConnection = this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection.substring(0, this.dataStore.activeConnection.indexOf(';')));

      // Return main object
      if (returnMain) return topConnection;

      // Return child object
      return topConnection.data.Data.find(obj => obj.info.uuid === this.dataStore.activeConnection);
    } else {
      return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
    }
  }

  /**
   * Get connection full object matching 'uuid'
   */
  getConnectionByUuid(uuid: string): ImConnection {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  /**
   * Sets current/active connection
   */
  setActiveConnection(uuid: string): void {
    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  /**
   * -------------------------
   *  New connections
   * -------------------------
   */

  /**
   * Called when application is initialized
   */
  initConnections(): void {
    this.FileSystem.getConfigFile('applications/infrastructure-manager/config.json').subscribe(
      (res: ImConnection[]) => {
        this.logger.info('Infrastructure Manager', 'Got connections successfully');

        res.forEach((connection) => {
          if (connection.type !== 'vmware' && connection.type !== 'netapp') connection.state = 'disconnected';

          this.setConnectionByType(connection, true);

          this.initializeConnection(connection);
        });

        // broadcast data to subscribers
        this.connectionsUpdated();
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while getting connections', null, error);
        return this.Toastr.error('Error getting connections.', 'Infrastructure Manager');
      });
  }

  initLinksMap(): void {
    this.FileSystem.getConfigFile('applications/infrastructure-manager/links.json').subscribe(
      (res: IMLink[]) => {
        this.logger.info('Infrastructure Manager', 'Got linksMap successfully');

        this.linksMap = res;
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while getting linksMap', null, error);
        return this.Toastr.error('Error getting linksMap.', 'Infrastructure Manager');
      });
  }

  /**
   * @Description
   * Called when user starts a new connection
   */
  connect(connection: ImConnection, saveOnly: boolean = false): void {
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
        return obj.type === connection.type && obj.host === connection.host;
      }).length > 0) {
        this.logger.error('Infrastructure Manager', 'Error while setting new connection -> Connection already exists', arguments);
        this.Toastr.error(`Node (${connection.host}) already exists. Please modify the existing connection properties or ReScan the node.`, 'Error creating connection');
        return null;
      }

      connection.uuid = uuidv4();

      this.setConnectionByType(connection);
    }

    this.connectionsUpdated();

    // Save initial data then initialize
    Promise.resolve().then(() => {
      if (connection.save) return this.saveConnection(connection);

      return;
    }).then(() => {
      if (!saveOnly) this.initializeConnection(connection);

      this.setActiveConnection(connection.uuid);
    });

  }

  private initializeConnection(connection: ImConnection): void {
    if (connection.type === 'netapp') return this.subjectConnectGetData.next(connection);
    if (connection.type === 'vmware') return this.subjectConnectGetData.next(connection);
    if (connection.type === 'windows' || connection.type === 'linux' || connection.type === 'snmp') {
      return this.socket.emit('[new-session]', {
        type: 'smanager',
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        uuid: connection.uuid
      });
    }
  }

  /**
   * "dispatcher"
   */
  private setConnectionByType(connection: ImConnection, initialized?: boolean): void {
    if (connection.type === 'linux') return this.setNewConnectionLinux(connection, initialized);
    if (connection.type === 'snmp') return this.setNewConnectionSNMP(connection, initialized);
    if (connection.type === 'vmware') return this.setNewConnectionVirtual(connection, initialized);
    if (connection.type === 'netapp') return this.setNewConnectionNetApp(connection, initialized);
  }

  /**
   * Add new Linux connection to connections array
   */
  private setNewConnectionLinux(connection: ImConnection, initialized?: boolean): void {
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
        state: 'disconnected'
      });
    }
  }

  /**
   * Add new SNMP connection to connections array
   */
  private setNewConnectionSNMP(connection: ImConnection, initialized?: boolean): void {
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
        state: 'disconnected',
        oids: connection.oids,
        community: connection.community
      });
    }
  }

  /**
   * Add new Virtual connection to connections array
   */
  private setNewConnectionVirtual(connection: ImConnection, initialized?: boolean): void {
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
          }
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * Add new NetApp connection to connections array
   */
  private setNewConnectionNetApp(connection: ImConnection, initialized?: boolean): void {
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
          }
        },
        state: 'disconnected'
      });
    }
  }

  /**
   * Save node links to config file
   */
  private saveLinksMap(): void {
    this.logger.debug('Infrastructure Manager', 'Saving linksMap');

    const configFile = 'applications/infrastructure-manager/links.json';

    this.FileSystem.saveConfigFile(this.linksMap, configFile, false).subscribe(
      () => {
        this.logger.debug('Infrastructure Manager', 'linksMap saved successfully');
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while saving linksMap', null, error);
        this.Toastr.error('Error while saving linksMap.', 'Infrastructure Manager');
      });

  }

  /**
   * -------------------------
   * Interact with connections
   * -------------------------
   */
  saveConnection(connection: ImConnection): Promise<any> {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Infrastructure Manager', 'Saving connection', arguments);

    const configFile = 'applications/infrastructure-manager/config.json';

    return this.FileSystem.saveConfigFile(connection, configFile, false).toPromise().then(
      () => {
        this.logger.debug('Infrastructure Manager', 'Saved connection successfully', loggerArgs);
      },
      error => {
        this.logger.error('Infrastructure Manager', 'Error while saving connection', loggerArgs, error);
        this.Toastr.error('Error while saving connection.', 'Infrastructure Manager');
      });

  }

  disconnectConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.logger.debug('Infrastructure Manager', 'Disconnecting connection');

    if (this.getConnectionByUuid(connectionUuid).type === 'linux') {
      this.socket.emit('[disconnect-session]', {
        type: 'linux',
        connectionUuid
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
        text: 'Remove the selected connection from the inventory?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Infrastructure Manager', 'Deleting connection', loggerArgs);

          this.disconnectConnection(connectionUuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(connectionUuid, configFile).subscribe(
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
        text: 'Your connection will be disconnected before editing it. Continue?'
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

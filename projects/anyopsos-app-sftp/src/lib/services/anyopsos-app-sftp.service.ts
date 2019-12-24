import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';

import {SftpConnection} from '../types/sftp-connection';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppSftpService {
  private Ssh;

  private $connections: BehaviorSubject<SftpConnection[]>;
  private $activeConnection: BehaviorSubject<string>;
  private $viewExchange: BehaviorSubject<boolean>;
  private dataStore: {  // This is where we will store our data in memory
    connections: SftpConnection[],
    activeConnection: string,
    viewExchange: boolean
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;
  viewExchange: Observable<any>;

  private connectionsInitialized: boolean = false;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private socket: Socket,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private FileSystem: AnyOpsOSLibFileSystemService) {

    this.dataStore = {connections: [], activeConnection: null, viewExchange: false};
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.$viewExchange = new BehaviorSubject(this.dataStore.viewExchange);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
    this.viewExchange = this.$viewExchange.asObservable();
  }

  toggleExchange(): void {
    this.dataStore.viewExchange = !this.dataStore.viewExchange;

    // broadcast data to subscribers
    this.$viewExchange.next(Object.assign({}, this.dataStore).viewExchange);
  }

  /**
   * Called by Server Service when the application loads
   */
  setInitialConnections(connections: SftpConnection[]): void {
    if (this.connectionsInitialized) throw new Error('connections_already_initialized');

    this.dataStore.connections = connections;
    this.connectionsInitialized = true;

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  getActiveConnection(): SftpConnection {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  getConnectionByUuid(connectionUuid: string): SftpConnection {
    if (!connectionUuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === connectionUuid);
  }

  setActiveConnection(connectionUuid: string = null): void {
    this.dataStore.activeConnection = connectionUuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  /**
   * Called by user to start new SSH connection (SFTP)
   */
  connect(connection: SftpConnection, saveOnly: boolean = false): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Sftp', 'Connect received', arguments);

    // Editing an existing connection
    if (connection.uuid) {
      connection.state = 'disconnected';

      // Completely rewrite connection information
      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => obj.uuid === connection.uuid);
      this.dataStore.connections[currentConnectionIndex] = connection;

    // New connection received
    } else {
      connection = {
        uuid: uuidv4(),
        description: connection.description,
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        hopServerUuid: connection.hopServerUuid,
        autologin: connection.autologin,
        save: connection.save,
        state: 'disconnected'
      };

      this.dataStore.connections.push(connection);
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    // Save connection to Backend on demand
    if (connection.save) this.saveConnection(connection, saveOnly);

    // Connect to the server
    if (!saveOnly) this.sendConnect(connection);
  }

  /**
   * Initialize SSH connection with Backend
   */
  sendConnect(connection: SftpConnection): void {
    // Get Ssh service here instead at constructor because this service is initialized when the application is loaded.
    // This means that sometimes Ssh service from ServiceInjector will be undefined. RaceCondition.
    this.Ssh = this.serviceInjector.get('AnyOpsOSAppSshService');

    Promise.resolve().then(() => {

      // If current connection have hopServerUuid, make sure it's Online and then Start the current connection
      if (connection.hopServerUuid && this.Ssh.getConnectionByUuid(connection.hopServerUuid).state === 'disconnected') {
        return this.Ssh.socketConnectServer(this.Ssh.getConnectionByUuid(connection.hopServerUuid));
      }

    }).then(() => {

      // Start current connection
      return this.socketConnectServer(connection);
    }).then(() => {

      // Create SFTP client
      return this.socketGetSftpWrapper(connection.uuid);
    }).then(() => {
      this.Modal.closeModal('.window--sftp .window__main');

      if (this.getActiveConnection() === null) this.setActiveConnection(connection.uuid);
    }).catch((e) => {

      // Connection called from user
      if (this.Modal.isModalOpened('.window--sftp .window__main')) {

        // Show error on screen
        this.Modal.changeModalType('danger', '.window--sftp .window__main');
        this.Modal.changeModalText((
          e === 'ECONNREFUSED' ? 'Connection refused' :
            e === 'ENOTFOUND' ? 'Remote address not found' : e
        ), '.window--sftp .window__main');

      // Connection called at anyOpsOS initial load (initConnections)
      } else {
        if (this.getActiveConnection().uuid === connection.uuid) this.setActiveConnection(null);
      }

    });
  }

  /**
   * Send a message to Backend and setups the connection
   */
  private socketConnectServer(connection: SftpConnection): Promise<any> {
    const loggerArgs = arguments;

    this.logger.info('Sftp', 'Connecting to server', loggerArgs);

    return new Promise((resolve, reject) => {

      // Create new SSH session
      this.socket.emit('[session-new]', {
        type: 'ssh',
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        uuid: connection.uuid,
        hopServerUuid: connection.hopServerUuid
      }, (data: { status: 'error' | 'ok', data: any }) => {
        if (data.status === 'error') {
          this.logger.error('Sftp', 'Error while emitting [session-new]', loggerArgs, data.data);
          this.getConnectionByUuid(connection.uuid).error = data.data;

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        this.getConnectionByUuid(connection.uuid).state = 'connected';
        this.getConnectionByUuid(connection.uuid).error = null;

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);

        return resolve();
      });
    });

  }

  /**
   * Starts a SFTP client on top of an SSH connection
   */
  private socketGetSftpWrapper(connectionUuid: string): Promise<any> {
    const loggerArgs = arguments;

    this.logger.info('Sftp', 'Creating SFTP client', loggerArgs);

    return new Promise((resolve, reject) => {

      this.socket.emit('[ssh-sftp]', {
        uuid: connectionUuid
      }, (data: { status: 'error' | 'ok', data: any }) => {
        if (data.status === 'error') {
          this.logger.error('Sftp', 'Error while emitting [ssh-sftp]', loggerArgs, data.data);
          this.getConnectionByUuid(connectionUuid).error = data.data;

          return reject(data.data);
        }

        // Set connection state as connected and remove any previous errors
        this.getConnectionByUuid(connectionUuid).state = 'ready';
        this.getConnectionByUuid(connectionUuid).error = null;

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);

        return resolve();
      });

    });
  }

  saveConnection(connection: SftpConnection, saveOnly: boolean = false): void {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');

    const configFile = 'applications/sftp/config.json';

    this.logger.debug('Sftp', 'Saving connection', arguments);

    this.FileSystem.saveConfigFile(connection, configFile, false).subscribe(
      () => {
        this.logger.debug('Sftp', 'Saved connection successfully', loggerArgs);

        if (saveOnly) this.Modal.closeModal('.window--sftp .window__main');
      },
      error => {
        this.logger.error('Sftp', 'Error while saving connection', loggerArgs, error);
      });
  }

  disconnectConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.logger.debug('Sftp', 'Disconnecting connection', arguments);

    this.socket.emit('[session-disconnect]', {
      type: 'ssh',
      connectionUuid
    });

    this.getConnectionByUuid(connectionUuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(connectionUuid?: string): void {
    const loggerArgs = arguments;

    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    const configFile = 'applications/sftp/config.json';

    this.Modal.openRegisteredModal('question', '.window--sftp .window__main',
      {
        title: 'Delete connection ' + this.getConnectionByUuid(connectionUuid).description,
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

          this.logger.debug('Sftp', 'Deleting connection', loggerArgs);

          this.disconnectConnection(connectionUuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(connectionUuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== connectionUuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              this.logger.debug('Sftp', 'Connection deleted successfully', loggerArgs);
            },
            error => {
              this.logger.error('Sftp', 'Error while deleting connection', loggerArgs, error);
            });

        }
      });
    });
  }

  editConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    if (this.getConnectionByUuid(connectionUuid).state === 'disconnected') {
      this.setActiveConnection(connectionUuid);
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--sftp .window__main',
      {
        title: 'Edit connection ' + this.getConnectionByUuid(connectionUuid).description,
        text: 'Your connection will be disconnected before editing it. Continue?',
        yes: 'Continue',
        no: 'Cancel'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {
          this.setActiveConnection(connectionUuid);
          this.disconnectConnection(connectionUuid);
        }
      });
    });
  }
}

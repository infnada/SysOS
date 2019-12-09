import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {SshConnection} from '../types/ssh-connection';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppSshService {
  private $connections: BehaviorSubject<SshConnection[]>;
  private $activeConnection: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    connections: SshConnection[],
    activeConnection: string
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;

  private connectionsInitialized: boolean = false;
  private connectionToTerminalMap: string[] = [];

  constructor(private logger: AnyOpsOSLibLoggerService,
              private Toastr: ToastrService,
              private socket: Socket,
              private FileSystem: AnyOpsOSLibFileSystemService,
              private Modal: AnyOpsOSLibModalService) {
    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();

    this.socket
      .fromEvent('ssh__data')
      .subscribe((sockData: { uuid: string, data: any }) => {
        console.log(sockData);
      });

    this.socket
      .fromEvent('ssh__prop')
      .subscribe((sockData: { uuid: string, prop: string, text: string }) => {
        console.log(sockData);
      });
  }

  /**
   * Terminal Map
   */
  setTerminalMap(connectionUuid: string, terminalUuid: string): void {
    this.connectionToTerminalMap[connectionUuid] = terminalUuid;
  }

  getTerminalMap(connectionUuid: string): string {
    return this.connectionToTerminalMap[connectionUuid];
  }

  /**
   * Called by Module when the application loads
   */
  // TODO if autologin is true, Backend should already started the connection and the state should be 'connected'
  initConnections(): void {
    if (this.connectionsInitialized) throw new Error('connections_already_initialized');

    this.FileSystem.getConfigFile('applications/ssh/config.json').subscribe((res: SshConnection[]) => {
        this.logger.info('Ssh', 'Get connections successfully');

        res.forEach((connection) => connection.state = 'disconnected');
        this.dataStore.connections = res;
        this.connectionsInitialized = true;

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);

        res.forEach((connection) => {
          if (connection.autologin) this.sendConnect(connection);
        });
      },
      error => {
        this.logger.error('Ssh', 'Error while getting credentials', null, error);
        return this.Toastr.error('Error getting connections.', 'SSH');
      });
  }

  getActiveConnection(): SshConnection {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  getConnectionByUuid(connectionUuid: string): SshConnection {
    if (!connectionUuid) throw new Error('connectionUuid');

    return this.dataStore.connections.find(obj => obj.uuid === connectionUuid);
  }

  setActiveConnection(connectionUuid: string = null): void {
    this.dataStore.activeConnection = connectionUuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  /**
   * Called by user to start new SSH connection (Shell)
   */
  connect(connection: SshConnection, saveOnly: boolean = false): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Ssh', 'Connect received', arguments);

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
  private sendConnect(connection: SshConnection): void {

    Promise.resolve().then(() => {

      // If current connection have hopServerUuid, make sure it's Online and then Start the current connection
      if (connection.hopServerUuid && this.getConnectionByUuid(connection.hopServerUuid).state === 'disconnected') {
        return this.socketConnectServer(this.getConnectionByUuid(connection.hopServerUuid));
      }

    }).then(() => {

      // Start current connection
      return this.socketConnectServer(connection);
    }).then(() => {
      this.Modal.closeModal('.window--ssh .window__main');

      if (this.getActiveConnection() === null) this.setActiveConnection(connection.uuid);
    }).catch((e) => {

      // Connection called from user
      if (this.Modal.isModalOpened('.window--ssh .window__main')) {

        // Show error on screen
        this.Modal.changeModalType('danger', '.window--ssh .window__main');
        this.Modal.changeModalText((
          e === 'ECONNREFUSED' ? 'Connection refused' :
          e === 'ENOTFOUND' ? 'Remote address not found' : e
        ), '.window--ssh .window__main');

      // Connection called at anyOpsOS initial load (initConnections)
      } else {
        if (this.getActiveConnection().uuid === connection.uuid) this.setActiveConnection(null);
      }

    });

  }

  /**
   * Send a message to Backend and setups the connection
   */
  socketConnectServer(connection: SshConnection): Promise<any> {
    const loggerArgs = arguments;

    this.logger.info('ssh', 'Connecting to server', loggerArgs);

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
          this.logger.error('Ssh', 'Error while emitting [session-new]', loggerArgs, data.data);
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

  saveConnection(connection: SshConnection, saveOnly: boolean = false): void {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');

    const configFile = 'applications/ssh/config.json';

    this.logger.debug('Ssh', 'Saving connection', arguments);

    this.FileSystem.saveConfigFile(connection, configFile, false).subscribe(
      () => {
        this.logger.debug('Ssh', 'Saved connection successfully', loggerArgs);

        if (saveOnly) this.Modal.closeModal('.window--ssh .window__main');
      },
      error => {
        this.logger.error('Ssh', 'Error while saving connection', loggerArgs, error);
        this.Toastr.error('Error while saving connection.', 'SSH');
      });
  }

  // TODO check if connection is part of hopServerUuid of any other connections
  disconnectConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.logger.debug('Ssh', 'Disconnecting connection', arguments);

    this.socket.emit('[session-disconnect]', {
      type: 'ssh',
      uuid: connectionUuid
    });

    this.getConnectionByUuid(connectionUuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  // TODO check if connection is part of hopServerUuid of any other connections
  deleteConnection(connectionUuid?: string): void {
    const loggerArgs = arguments;

    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    const configFile = 'applications/ssh/config.json';

    this.Modal.openRegisteredModal('question', '.window--ssh .window__main',
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

          this.logger.debug('Ssh', 'Deleting connection', loggerArgs);

          this.disconnectConnection(connectionUuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(connectionUuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== connectionUuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              this.logger.debug('Ssh', 'Connection deleted successfully', loggerArgs);
            },
            error => {
              this.logger.error('Ssh', 'Error while deleting connection', loggerArgs, error);
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

    this.Modal.openRegisteredModal('question', '.window--ssh .window__main',
      {
        title: 'Edit connection ' + this.getConnectionByUuid(connectionUuid).description,
        text: 'Your connection will be disconnected before editing it. Continue?',
        yes: 'Continue',
        no: 'Cancel'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {
          this.disconnectConnection(connectionUuid);
          this.setActiveConnection(connectionUuid);
        }
      });
    });
  }
}

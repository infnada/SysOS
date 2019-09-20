import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {ToastrService} from 'ngx-toastr';
import {v4 as uuidv4} from 'uuid';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';

import {SftpConnection} from '../types/sftp-connection';

@Injectable({
  providedIn: 'root'
})
export class SysosAppSftpService {
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

  constructor(private logger: SysosLibLoggerService,
              private Toastr: ToastrService,
              private socket: Socket,
              private Modal: SysosLibModalService,
              private FileSystem: SysosLibFileSystemService) {
    this.dataStore = {connections: [], activeConnection: null, viewExchange: false};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<SftpConnection[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.$viewExchange = new BehaviorSubject(false) as BehaviorSubject<boolean>;
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
    this.viewExchange = this.$viewExchange.asObservable();
  }

  initConnections(): void {
    this.FileSystem.getConfigFile('applications/sftp/config.json').subscribe(
      (res: SftpConnection[]) => {
        this.logger.info('Sftp', 'Get connections successfully');

        res.forEach((connection) => {
          connection.state = 'disconnected';
        });

        this.dataStore.connections = res;

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);
      },
      error => {
        this.logger.error('Sftp', 'Error while getting credentials', null, error);
        return this.Toastr.error('Error getting connections.', 'SFTP');
      });
  }

  getActiveConnection(): SftpConnection {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  getConnectionByUuid(uuid: string): SftpConnection {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  setActiveConnection(uuid: string): void {
    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  toggleExchange(): void {
    this.dataStore.viewExchange = !this.dataStore.viewExchange;

    // broadcast data to subscribers
    this.$viewExchange.next(Object.assign({}, this.dataStore).viewExchange);
  }

  connect(connection: SftpConnection): void {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Sftp', 'Connect received', arguments);

    if (connection.uuid) {
      connection.state = 'disconnected';

      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => {
        return obj.uuid === connection.uuid;
      });

      this.dataStore.connections[currentConnectionIndex] = connection;

    } else {
      connection = {
        uuid: uuidv4(),
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        autologin: connection.autologin,
        save: connection.save,
        type: 'linux',
        state: 'disconnected'
      };

      this.dataStore.connections.push(connection);
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    if (connection.save) this.saveConnection(connection);

    this.socket.emit('[new-session]', {
      type: 'sftp',
      host: connection.host,
      port: connection.port,
      credential: connection.credential,
      uuid: connection.uuid
    }, (e) => {
      this.logger.error('Sftp', 'Error while emitting [new-session]', loggerArgs, e);
    });

    this.setActiveConnection(connection.uuid);
  }

  saveConnection(connection: SftpConnection): void {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');

    const configFile = 'applications/sftp/config.json';

    this.logger.debug('Sftp', 'Saving connection', arguments);

    this.FileSystem.saveConfigFile(connection, configFile, false).subscribe(
      () => {
        this.logger.debug('Sftp', 'Saved connection successfully', loggerArgs);
      },
      error => {
        this.logger.error('Sftp', 'Error while saving connection', loggerArgs, error);
        this.Toastr.error('Error while saving connection.', 'SFTP');
      });

  }

  disconnectConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    this.logger.debug('Sftp', 'Disconnecting connection', arguments);

    this.socket.emit('[disconnect-session]', {
      type: 'sftp',
      uuid
    });

    this.getConnectionByUuid(uuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(uuid?: string): void {
    const loggerArgs = arguments;

    if (!uuid) uuid = this.dataStore.activeConnection;

    const configFile = 'applications/sftp/config.json';

    this.Modal.openRegisteredModal('question', '.window--sftp .window__main',
      {
        title: 'Delete connection ' + this.getConnectionByUuid(uuid).description,
        text: 'Remove the selected connection from the inventory?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Sftp', 'Deleting connection', loggerArgs);

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
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

  editConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    if (this.getConnectionByUuid(uuid).state === 'disconnected') {
      this.setActiveConnection(uuid);
      this.disconnectConnection();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--sftp .window__main',
      {
        title: 'Edit connection ' + this.getConnectionByUuid(uuid).description,
        text: 'Your connection will be disconnected before editing it. Continue?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.setActiveConnection(uuid);
          this.disconnectConnection();

        }
      });
    });

  }
}

import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';

import * as Terminal from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {WebLinksAddon} from 'xterm-addon-web-links';

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

  SshTerminals: [] = [];

  constructor(private logger: AnyOpsOSLibLoggerService,
              private Toastr: ToastrService,
              private socket: Socket,
              private FileSystem: AnyOpsOSLibFileSystemService,
              private Modal: AnyOpsOSLibModalService) {
    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject([]);
    this.$activeConnection = new BehaviorSubject(null);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();

    this.socket
      .fromEvent('ssh__data')
      .subscribe((sockData: { uuid: string, data: any }) => {
        this.SshTerminals[sockData.uuid].write(sockData.data);
      });

    this.socket
      .fromEvent('ssh__prop')
      .subscribe((data: { uuid: string, prop: string, text: string }) => {

        this.getConnectionByUuid(data.uuid)[data.prop] = data.text;

        // CONN CLOSE
        if (data.prop === 'status' && data.text === 'CONN CLOSE') {
          this.getConnectionByUuid(data.uuid).state = 'disconnected';

          // CON ERROR
        } else if (data.prop === 'status' && data.text !== 'SSH CONNECTION ESTABLISHED') {

          // Error connecting
          this.getConnectionByUuid(data.uuid).error = data.text;

          if (this.Modal.isModalOpened('.window--ssh .window__main')) {
            this.Modal.changeModalType('danger', '.window--ssh .window__main');
            this.Modal.changeModalText(data.text, '.window--ssh .window__main');
          } else {
            if (this.getActiveConnection().uuid === data.uuid) this.setActiveConnection(null);
          }

          // CONN OK
        } else if (data.text === 'SSH CONNECTION ESTABLISHED') {
          this.getConnectionByUuid(data.uuid).state = 'connected';
          this.getConnectionByUuid(data.uuid).error = null;

          this.Modal.closeModal('.window--ssh .window__main');

          // Set this connection as ActiveConnection
          if (this.getActiveConnection() === null) this.setActiveConnection(data.uuid);
          // $('#server_body').focus();
        }
      });
  }

  initConnections(): void {
    this.FileSystem.getConfigFile('applications/ssh/config.json').subscribe(
      (res: SshConnection[]) => {
        this.logger.info('Ssh', 'Get connections successfully');

        res.forEach((connection) => {
          connection.state = 'disconnected';
        });

        this.dataStore.connections = res;

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

  getConnectionByUuid(uuid: string): SshConnection {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  setActiveConnection(uuid: string): void {
    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  getSshTerminal(uuid: string): Terminal.Terminal {
    return this.SshTerminals[uuid];
  }

  connect(connection: SshConnection, saveOnly: boolean = false): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Ssh', 'Connect received', arguments);

    if (connection.uuid) {
      connection.state = 'disconnected';

      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => {
        return obj.uuid === connection.uuid;
      });

      this.dataStore.connections[currentConnectionIndex] = connection;

    } else {
      connection = {
        uuid: uuidv4(),
        description: connection.description,
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        hopping: connection.hopping,
        hophost: connection.hophost,
        hopport: connection.hopport,
        hopcredential: connection.hopcredential,
        autologin: connection.autologin,
        save: connection.save,
        state: 'disconnected'
      };

      this.dataStore.connections.push(connection);
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    if (connection.save) this.saveConnection(connection, saveOnly);

    if (!saveOnly) this.sendConnect(connection);
  }

  sendConnect(connection: SshConnection) {
    const loggerArgs = arguments;

    this.SshTerminals[connection.uuid] = new (Terminal as any).default.Terminal({
      cursorBlink: true
    });

    const fitAddon = new FitAddon();

    this.SshTerminals[connection.uuid].loadAddon(new WebLinksAddon());
    this.SshTerminals[connection.uuid].loadAddon(fitAddon);
    this.SshTerminals[connection.uuid].fitAddon = fitAddon;

    this.SshTerminals[connection.uuid].onResize((size: { cols: number, rows: number }) => {
      console.log('resizing');

      this.socket.emit('ssh_session__geometry', {
        cols: size.cols,
        rows: size.rows,
        uuid: connection.uuid
      });
    });

    this.SshTerminals[connection.uuid].onData((data) => {
      this.socket.emit('ssh_session__data', {
        data,
        uuid: connection.uuid
      });
    });

    this.socket.emit('[new-session]', {
      type: 'ssh',
      host: connection.host,
      port: connection.port,
      credential: connection.credential,
      hophost: connection.hophost,
      hopport: connection.hopport,
      hopcredential: connection.hopcredential,
      uuid: connection.uuid
    }, (e) => {
      this.logger.error('Ssh', 'Error while emitting [new-session]', loggerArgs, e);
    });

    this.setActiveConnection(connection.uuid);
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

  disconnectConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    this.logger.debug('Ssh', 'Disconnecting connection', arguments);

    this.socket.emit('[disconnect-session]', {
      type: 'ssh',
      uuid
    });

    this.getConnectionByUuid(uuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(uuid?: string): void {
    const loggerArgs = arguments;

    if (!uuid) uuid = this.dataStore.activeConnection;

    const configFile = 'applications/ssh/config.json';

    this.Modal.openRegisteredModal('question', '.window--ssh .window__main',
      {
        title: 'Delete connection ' + this.getConnectionByUuid(uuid).description,
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

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
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

  editConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    if (this.getConnectionByUuid(uuid).state === 'disconnected') {
      this.setActiveConnection(uuid);
      this.disconnectConnection();
      return;
    }

    this.Modal.openRegisteredModal('question', '.window--ssh .window__main',
      {
        title: 'Edit connection ' + this.getConnectionByUuid(uuid).description,
        text: 'Your connection will be disconnected before editing it. Continue?',
        yes: 'Continue',
        no: 'Cancel'
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

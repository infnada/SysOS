import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';

import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {Terminal} from 'xterm';

import {SshConnection} from './SshConnection';
import {FileSystemService} from '../../services/file-system.service';
import {ModalService} from '../../services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class SshService {

  private $connections: BehaviorSubject<SshConnection[]>;
  private $activeConnection: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    connections: SshConnection[],
    activeConnection: string
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;

  SshTerminals: [] = [];

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private socket: Socket,
              private FileSystem: FileSystemService,
              private Modal: ModalService) {
    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<SshConnection[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();

    this.socket
      .fromEvent('ssh__data')
      .subscribe((data: { uuid: string, prop: string, text: string }) => {
        this.SshTerminals[data.uuid].write(data.text);
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
          if (this.getConnectionByUuid(data.uuid).state === 'new') {
            this.getConnectionByUuid(data.uuid).state = 'disconnected';
          }
          this.getConnectionByUuid(data.uuid).error = data.text;
          this.Toastr.error(data.text, 'Error (' + this.getConnectionByUuid(data.uuid).host + ')');

          // CONN OK
        } else if (data.text === 'SSH CONNECTION ESTABLISHED') {
          this.getConnectionByUuid(data.uuid).state = 'connected';
          this.getConnectionByUuid(data.uuid).error = null;
          this.Toastr.success(data.text, 'Connected (' + this.getConnectionByUuid(data.uuid).host + ')');
          // $('#server_body').focus();
        }
      });
  }

  initConnections(): void {
    this.FileSystem.getConfigFile('applications/ssh/config.json').subscribe(
      (res: SshConnection[]) => {
        this.logger.debug('Ssh Factory -> Get connections successfully');

        res.forEach((connection) => {
          connection.state = 'disconnected';
        });

        this.dataStore.connections = res;

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);
      },
      error => {
        this.logger.error('Ssh Factory -> Error while getting credentials -> ', error);
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

  getSshTerminal(uuid: string): Terminal {
    return this.SshTerminals[uuid];
  }

  connect(connection: SshConnection): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Ssh Factory -> Connect received -> host [%s]', connection.host);

    if (connection.uuid) {
      connection.state = 'disconnected';

      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => {
        return obj.uuid === connection.uuid;
      });

      this.dataStore.connections[currentConnectionIndex] = connection;

    } else {
      connection.uuid = uuidv4();

      this.dataStore.connections.push({
        uuid: connection.uuid,
        host: connection.host,
        port: connection.port,
        description: connection.description,
        credential: connection.credential,
        autologin: connection.autologin,
        save: connection.save,
        state: 'disconnected'
      });
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    if (connection.save) this.saveConnection(connection);

    this.SshTerminals[connection.uuid] = new Terminal({
      cursorBlink: true
    });

    this.SshTerminals[connection.uuid].on('data', (data) => {
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
      uuid: connection.uuid
    }, (e) => {
      this.logger.error('Ssh Factory -> Error while emitting [new-session] -> ', e);
    });

    this.setActiveConnection(connection.uuid);
  }

  saveConnection(connection: SshConnection): void {
    if (!connection) throw new Error('connection_not_found');

    const configFile = 'applications/ssh/config.json';

    this.logger.debug('Ssh Factory [%s] -> Saving connection -> host [%s]', connection.uuid, connection.host);

    this.FileSystem.saveConfigFile(connection, configFile, false).subscribe(
      () => {
        this.logger.debug('Ssh Factory [%s] -> Saved connection successfully -> host [%s]', connection.uuid, connection.host);
      },
      error => {
        this.logger.error('Ssh Factory [%s] -> Error while saving connection -> host [%s] -> ',
          connection.uuid, connection.host, error);
        this.Toastr.error('Error while saving connection.', 'Infrastructure Manager');
      });

  }

  disconnectConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    this.logger.debug('Ssh Factory [%s] -> Disconnecting connection', uuid);

    this.socket.emit('[disconnect-session]', {
      type: 'ssh',
      uuid
    });

    this.getConnectionByUuid(uuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    const configFile = 'applications/ssh/config.json';

    this.Modal.openRegisteredModal('question', '.window--ssh .window__main',
      {
        title: 'Delete connection ' + this.getConnectionByUuid(uuid).description,
        text: 'Remove the selected connection from the inventory?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Ssh Factory [%s] -> Deleting connection', uuid);

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              this.logger.debug('Ssh Factory [%s] -> Connection deleted successfully', uuid);
            },
            error => {
              this.logger.error('Ssh Factory [%s] -> Error while deleting connection -> ', uuid, error);
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

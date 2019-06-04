import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {ToastrService} from 'ngx-toastr';
import {v4 as uuidv4} from 'uuid';

import {ModalService} from '../../../services/modal.service';
import {FileSystemService} from '../../../services/file-system.service';

import {SftpConnection} from '../SftpConnection';

@Injectable({
  providedIn: 'root'
})
export class SftpService {

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

  constructor(private Toastr: ToastrService,
              private socket: Socket,
              private FileSystem: FileSystemService,
              private Modal: ModalService) {
    this.dataStore = {connections: [], activeConnection: null, viewExchange: false};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<SftpConnection[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.$viewExchange = new BehaviorSubject(false) as BehaviorSubject<boolean>;
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
    this.viewExchange = this.$viewExchange.asObservable();

    this.socket
      .fromEvent('sftp__prop')
      .subscribe((data: { uuid: string, prop: string, text: string }) => {
        console.log(data);

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
    this.FileSystem.getConfigFile('applications/sftp/config.json').subscribe(
      (res: SftpConnection[]) => {
        console.debug('Sftp Factory -> Get credentials successfully');

        res.forEach((connection) => {
          connection.state = 'disconnected';
        });

        this.dataStore.connections = res;

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);
      },
      error => {
        console.error('Sftp Factory -> Error while getting credentials -> ', error);
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
    if (!connection) throw new Error('connection_not_found');

    console.debug('Connections Factory -> Connect received -> host [%s]', connection.host);

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

    this.socket.emit('[new-session]', {
      type: 'sftp',
      host: connection.host,
      port: connection.port,
      credential: connection.credential,
      uuid: connection.uuid
    }, (e) => {
      console.log(e);
    });

    this.setActiveConnection(connection.uuid);
  }

  saveConnection(connection: SftpConnection): void {
    if (!connection) throw new Error('connection_not_found');

    const configFile = 'applications/sftp/config.json';

    console.debug('Connections Factory [%s] -> Saving connection -> host [%s]', connection.uuid, connection.host);

    this.FileSystem.saveConfigFile(connection, configFile, false).subscribe(
      () => {
        console.debug('Connections Factory [%s] -> Saved connection successfully -> host [%s]', connection.uuid, connection.host);
      },
      error => {
        console.error('Connections Factory [%s] -> Error while saving connection -> host [%s] -> ',
          connection.uuid, connection.host, error);
        this.Toastr.error('Error while saving connection.', 'Infrastructure Manager');
      });

  }

  disconnectConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    console.debug('Connections Factory [%s] -> Disconnecting connection', uuid);

    this.socket.emit('[disconnect-session]', {
      type: 'sftp',
      uuid
    });

    this.getConnectionByUuid(uuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(uuid?: string): void {
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

          console.debug('Connections Factory [%s] -> Deleting connection', uuid);

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              console.debug('Connections Factory [%s] -> Connection deleted successfully', uuid);
            },
            error => {
              console.error('Connections Factory [%s] -> Error while deleting connection -> ', uuid, error);
              console.error(error);
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

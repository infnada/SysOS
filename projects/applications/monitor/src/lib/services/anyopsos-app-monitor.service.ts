import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSExtLibNetdataService} from '@anyopsos/ext-lib-netdata';
import {MonitorConnection} from '@anyopsos/module-monitor';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppMonitorService {

  private CredentialsManager;

  private NETDATA;

  private $connections: BehaviorSubject<MonitorConnection[]>;
  private $activeConnection: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    connections: MonitorConnection[],
    activeConnection: string
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;

  constructor(private http: HttpClient,
              private logger: AnyOpsOSLibLoggerService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private FileSystem: AnyOpsOSLibFileSystemService,
              private Netdata: AnyOpsOSExtLibNetdataService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');

    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
  }

  getConnectionByUuid(uuid: string): MonitorConnection {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  getConnectionByLink(linkUuid: string): MonitorConnection {
    if (!linkUuid) throw new Error('linkUuid');

    return this.dataStore.connections.find(obj => obj.linkTo && obj.linkTo.info.uuid === linkUuid);
  }

  getActiveConnection(): MonitorConnection {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  setActiveConnection(connectionUuid: string): void {
    this.dataStore.activeConnection = connectionUuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  // TODO if autologin is true, Backend should already started the connection and the state should be 'connected'
  initConnections(): void {
    this.FileSystem.getConfigFile('applications/monitor/config.json').subscribe(
      (res: BackendResponse & { data: MonitorConnection[]; }) => {
        this.logger.info('Monitor', 'Get connections successfully');

        res.data.forEach((connection) => connection.state = 'disconnected');

        this.dataStore.connections = res.data;

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);

        res.data.forEach((connection) => {
          if (connection.autologin) this.sendConnect(connection);
        });
      },
      error => {
        this.logger.error('Monitor', 'Error while getting credentials', null, error);
      });
  }

  connect(connection: MonitorConnection, saveOnly: boolean = false): void {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Monitor', 'Connect received', arguments);

    if (connection.uuid) {
      connection.state = 'disconnected';

      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => {
        return obj.uuid === connection.uuid;
      });

      this.dataStore.connections[currentConnectionIndex] = connection;

    } else {
      connection = {
        uuid: uuidv4(),
        url: connection.url,
        description: connection.description,
        credential: connection.credential,
        withCredential: connection.withCredential,
        linkTo: connection.linkTo,
        autologin: connection.autologin,
        save: connection.save,
        type: (connection.type === 'netdata' && connection.withCredential ? 'netdata-credential' : connection.type),
        state: 'disconnected',
        snapshotData: connection.snapshotData
      };

      this.dataStore.connections.push(connection);
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    if (connection.save) this.saveConnection(connection, saveOnly);

    if (!saveOnly) this.sendConnect(connection);
  }

  setConnectionReady(connection: MonitorConnection): void {
    connection.state = 'connected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  sendConnect(connection: MonitorConnection): void {
    const loggerArgs = arguments;

    // Normal Netdata connection
    if (['netdata', 'snapshot'].includes(connection.type)) {
      this.setConnectionReady(connection);

      this.Modal.closeModal('.window--monitor .window__main');
      this.setActiveConnection(connection.uuid);

    // TODO: race/catch condition on saveConnection() this will not work if connection info not exists on backend
    // Internal or Netdata with credentials connection
    } else {

      this.http.get(`/api/monitor/connect/${connection.uuid}/${connection.type}`).subscribe(
        (res: { status: string, data?: any }) => {

          // Error while connecting
          if (res.status === 'error') {
            this.logger.error('Monitor', 'sendConnect -> Error while connecting', loggerArgs, res.data);
            if (this.Modal.isModalOpened('.window--monitor .window__main')) {
              this.Modal.changeModalType('danger', '.window--monitor .window__main');
              this.Modal.changeModalText(res.data, '.window--monitor .window__main');
            }
            return;
          }

          this.logger.info('Monitor', 'Connected successfully', loggerArgs);

          this.setConnectionReady(connection);

          this.Modal.closeModal('.window--monitor .window__main');
          this.setActiveConnection(connection.uuid);
        },
        error => {
          if (this.Modal.isModalOpened('.window--monitor .window__main')) {
            this.Modal.changeModalType('danger', '.window--monitor .window__main');
            this.Modal.changeModalText(error, '.window--monitor .window__main');
          }
          this.logger.error('Monitor', 'Error while connecting', loggerArgs, error);
        });
    }

  }

  saveConnection(connection: MonitorConnection, saveOnly: boolean = false): void {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');
    this.logger.debug('Monitor', 'Saving connection', arguments);

    this.FileSystem.patchConfigFile(connection, 'applications/monitor/config.json', connection.uuid).subscribe(
      () => {
        this.logger.debug('Monitor', 'Saved connection successfully', loggerArgs);

        if (saveOnly) this.Modal.closeModal('.window--monitor .window__main');
      },
      error => {
        this.logger.error('Monitor', 'Error while saving connection', loggerArgs, error);
      });
  }

  disconnectConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.logger.debug('Monitor', 'Disconnecting connection', arguments);

    // TODO send to backend disconnect

    this.getConnectionByUuid(connectionUuid).state = 'disconnected';

    this.Netdata.deleteDashboard(connectionUuid);

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(connectionUuid?: string): void {
    const loggerArgs = arguments;

    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    const configFile = 'applications/monitor/config.json';

    this.Modal.openRegisteredModal('question', '.window--monitor .window__main',
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

          this.logger.debug('Monitor', 'Deleting connection', loggerArgs);

          this.disconnectConnection(connectionUuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFile(configFile, connectionUuid).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== connectionUuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              this.logger.debug('Monitor', 'Connection deleted successfully', loggerArgs);
            },
            error => {
              this.logger.error('Monitor', 'Error while deleting connection', loggerArgs, error);
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

    this.Modal.openRegisteredModal('question', '.window--monitor .window__main',
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

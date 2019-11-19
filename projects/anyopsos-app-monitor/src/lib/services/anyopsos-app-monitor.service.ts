import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {ToastrService} from 'ngx-toastr';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibExtNetdataService} from '@anyopsos/lib-ext-netdata';

import {Netdata} from '../types/netdata';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppMonitorService {

  private CredentialsManager;

  private NETDATA;

  private $connections: BehaviorSubject<Netdata[]>;
  private $activeConnection: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    connections: Netdata[],
    activeConnection: string
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;

  constructor(private http: HttpClient,
              private logger: AnyOpsOSLibLoggerService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private FileSystem: AnyOpsOSLibFileSystemService,
              private Toastr: ToastrService,
              private Netdata: AnyOpsOSLibExtNetdataService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');

    this.dataStore = {connections: [], activeConnection: null};
    this.$connections = new BehaviorSubject([]);
    this.$activeConnection = new BehaviorSubject(null);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
  }

  getConnectionByUuid(uuid: string): Netdata {
    if (!uuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === uuid);
  }

  getConnectionByLink(linkUuid: string): Netdata {
    if (!linkUuid) throw new Error('linkUuid');

    return this.dataStore.connections.find(obj => obj.linkTo && obj.linkTo.info.uuid === linkUuid);
  }

  getActiveConnection(): Netdata {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  setActiveConnection(uuid: string): void {
    this.dataStore.activeConnection = uuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  initConnections(): void {
    this.FileSystem.getConfigFile('applications/monitor/config.json').subscribe(
      (res: Netdata[]) => {
        this.logger.info('Monitor', 'Get connections successfully');

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
        this.logger.error('Monitor', 'Error while getting credentials', null, error);
        return this.Toastr.error('Error getting connections.', 'Monitor');
      });
  }

  connect(connection: Netdata, saveOnly: boolean = false): void {
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

  setConnectionReady(connection: Netdata): void {
    connection.state = 'connected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  sendConnect(connection: Netdata): void {
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

  saveConnection(connection: Netdata, saveOnly: boolean = false): void {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');

    const configFile = 'applications/monitor/config.json';

    this.logger.debug('Monitor', 'Saving connection', arguments);

    this.FileSystem.saveConfigFile(connection, configFile, false).subscribe(
      () => {
        this.logger.debug('Monitor', 'Saved connection successfully', loggerArgs);

        if (saveOnly) this.Modal.closeModal('.window--monitor .window__main');
      },
      error => {
        this.logger.error('Monitor', 'Error while saving connection', loggerArgs, error);
        this.Toastr.error('Error while saving connection.', 'Monitor');
      });
  }

  disconnectConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    this.logger.debug('Monitor', 'Disconnecting connection', arguments);

    // TODO send to backend disconnect

    this.getConnectionByUuid(uuid).state = 'disconnected';

    this.Netdata.deleteDashboard(uuid);

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(uuid?: string): void {
    const loggerArgs = arguments;

    if (!uuid) uuid = this.dataStore.activeConnection;

    const configFile = 'applications/monitor/config.json';

    this.Modal.openRegisteredModal('question', '.window--monitor .window__main',
      {
        title: 'Delete connection ' + this.getConnectionByUuid(uuid).description,
        text: 'Remove the selected connection from the inventory?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('Monitor', 'Deleting connection', loggerArgs);

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              this.logger.debug('Monitor', 'ImConnection deleted successfully', loggerArgs);
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

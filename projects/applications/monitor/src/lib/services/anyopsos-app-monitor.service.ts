import {Injectable, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSExtLibNetdataService} from '@anyopsos/ext-lib-netdata';
import {ConnectionMonitor} from '@anyopsos/module-monitor';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

// TODO extract it from '@anyopsos/module-monitor'
const MONITOR_CONFIG_FILE = 'monitor.json';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppMonitorService {
  private NETDATA;

  private readonly $connections: BehaviorSubject<ConnectionMonitor[]>;
  private readonly $activeConnection: BehaviorSubject<ConnectionMonitor | null>;
  private readonly $activeConnectionUuid: BehaviorSubject<string | null>;
  private dataStore: {
    connections: ConnectionMonitor[];
    activeConnection: ConnectionMonitor | null;
    activeConnectionUuid: string | null;
  };
  readonly connections: Observable<ConnectionMonitor[]>;
  readonly activeConnection: Observable<ConnectionMonitor | null>;
  readonly activeConnectionUuid: Observable<string | null>;

  private bodyContainer: ViewContainerRef;

  constructor(private readonly http: HttpClient,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private Netdata: AnyOpsOSExtLibNetdataService) {

    this.dataStore = { connections: [], activeConnection: null, activeConnectionUuid: null };
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.$activeConnectionUuid = new BehaviorSubject(this.dataStore.activeConnectionUuid);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
    this.activeConnectionUuid = this.$activeConnectionUuid.asObservable();
  }

  /**
   * Setter & Getter of bodyContainerRef
   * This is used by Modals
   */
  setBodyContainerRef(bodyContainer: ViewContainerRef): void {
    this.bodyContainer = bodyContainer;
  }

  getBodyContainerRef(): ViewContainerRef {
    return this.bodyContainer;
  }

  getConnectionByUuid(connectionUuid: string): ConnectionMonitor {
    if (!connectionUuid) throw new Error('invalid_resource');

    return this.dataStore.connections.find(obj => obj.uuid === connectionUuid);
  }

  getConnectionByLink(linkUuid: string): ConnectionMonitor {
    if (!linkUuid) throw new Error('linkUuid');

    return this.dataStore.connections.find(obj => obj.linkTo && obj.linkTo.info.uuid === linkUuid);
  }

  getActiveConnection(): ConnectionMonitor {
    if (this.dataStore.activeConnectionUuid === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnectionUuid);
  }

  setActiveConnectionUuid(connectionUuid: string): void {
    this.dataStore.activeConnectionUuid = connectionUuid;

    // broadcast data to subscribers
    this.$activeConnectionUuid.next(Object.assign({}, this.dataStore).activeConnectionUuid);

    this.connectionsUpdated();
  }

  /**
   * Called every time the connections state is updated
   */
  connectionsUpdated(): void {

    if (!this.dataStore.activeConnectionUuid) {
      this.dataStore.activeConnection = null;
    } else {
      this.dataStore.activeConnection = this.getConnectionByUuid(this.dataStore.activeConnectionUuid);
    }

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  // TODO if autologin is true, Backend should already started the connection and the state should be 'connected'
  initConnections(): void {
    this.LibFileSystem.getConfigFile(MONITOR_CONFIG_FILE).subscribe(
      (res: BackendResponse & { data: ConnectionMonitor[]; }) => {
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

  async connect(connection: ConnectionMonitor, saveOnly: boolean = false): Promise<ConnectionMonitor> {
    if (!connection) throw new Error('resource_invalid');
    this.logger.debug('Monitor', 'Connect received');

    if (connection.uuid) {
      connection.state = 'disconnected';

      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => obj.uuid === connection.uuid);

      this.dataStore.connections[currentConnectionIndex] = connection;

    } else {
      connection = {
        uuid: uuidv4(),
        host: connection.host,
        port: connection.port,
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

    await this.saveConnection(connection, saveOnly);
    if (!saveOnly) await this.sendConnect(connection);

    return connection;
  }

  setConnectionReady(connection: ConnectionMonitor): void {
    connection.state = 'connected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  sendConnect(connection: ConnectionMonitor): void {
    const loggerArgs = arguments;

    // Normal Netdata connection
    if (['netdata', 'snapshot'].includes(connection.type)) {
      this.setConnectionReady(connection);

      this.LibModal.closeModal('.window--monitor .window__main');
      this.setActiveConnectionUuid(connection.uuid);

    // TODO: race/catch condition on saveConnection() this will not work if connection info not exists on backend
    // Internal or Netdata with credentials connection
    } else {

      this.http.get(`/api/monitor/connect/${connection.uuid}/${connection.type}`).subscribe(
        (res: { status: string, data?: any }) => {

          // Error while connecting
          if (res.status === 'error') {
            this.logger.error('Monitor', 'sendConnect -> Error while connecting', loggerArgs, res.data);
            throw res.data;
          }

          this.logger.info('Monitor', 'Connected successfully', loggerArgs);

          this.setConnectionReady(connection);
          this.setActiveConnectionUuid(connection.uuid);
        },
        error => {
          this.logger.error('Monitor', 'Error while connecting', loggerArgs, error);
          throw error;
        });
    }

  }

  saveConnection(connection: ConnectionMonitor, saveOnly: boolean = false): void {
    const loggerArgs = arguments;

    if (!connection) throw new Error('connection_not_found');
    this.logger.debug('Monitor', 'Saving connection', arguments);

    this.LibFileSystem.patchConfigFile(connection, 'applications/monitor/config.json', connection.uuid).subscribe(
      () => {
        this.logger.debug('Monitor', 'Saved connection successfully', loggerArgs);

        if (saveOnly) this.LibModal.closeModal('.window--monitor .window__main');
      },
      error => {
        this.logger.error('Monitor', 'Error while saving connection', loggerArgs, error);
      });
  }

  disconnectConnection(connectionUuid: string = null): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnectionUuid;

    this.logger.debug('Monitor', 'Disconnecting connection', arguments);

    // TODO send to backend disconnect

    this.getConnectionByUuid(connectionUuid).state = 'disconnected';

    this.Netdata.deleteDashboard(connectionUuid);

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  async deleteConnection(connectionUuid: string = null): Promise<void> {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnectionUuid;

    const configFile = 'applications/monitor/config.json';

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.bodyContainer,
      {
        title: `Delete connection ${this.getConnectionByUuid(connectionUuid).description}`,
        text: 'Remove the selected connection from the inventory?',
        yes: 'Delete',
        yesClass: 'warn',
        no: 'Cancel',
        boxContent: 'This action is permanent. Anything using this connection as a dependency will be deleted as well.',
        boxClass: 'text-danger',
        boxIcon: 'warning'
      }
    );

    modalInstance.afterClosed().subscribe(async (result: boolean): Promise<void> => {
      if (result !== true) return;

      this.logger.debug('Monitor', 'Deleting connection');

      this.disconnectConnection(connectionUuid);
      this.setActiveConnectionUuid(null);

      this.LibFileSystem.deleteConfigFile(configFile, connectionUuid).subscribe(
      () => {
        this.dataStore.connections = this.dataStore.connections.filter((connection) => {
          return connection.uuid !== connectionUuid;
        });

        // broadcast data to subscribers
        this.$connections.next(Object.assign({}, this.dataStore).connections);

        this.logger.debug('Monitor', 'Connection deleted successfully');
      },
      error => {
        this.logger.error('Monitor', 'Error while deleting connection', null, error);
      });

    });
  }

  async editConnection(connectionUuid: string = null): Promise<void> {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnectionUuid;

    if (this.getConnectionByUuid(connectionUuid).state === 'disconnected') return this.setActiveConnectionUuid(connectionUuid);

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.bodyContainer,
      {
        title: `Edit connection ${this.getConnectionByUuid(connectionUuid).description}`,
        text: 'Your connection will be disconnected before editing it. Continue?',
        yes: 'Continue',
        yesClass: 'warn',
        no: 'Cancel',
        boxContent: 'Anything using this as a dependency will be disconnected.',
        boxClass: 'text-danger',
        boxIcon: 'warning'
      }
    );

    modalInstance.afterClosed().subscribe(async (result: boolean): Promise<void> => {
      if (result !== true) return;

      this.disconnectConnection();
      this.setActiveConnectionUuid(connectionUuid);

    });
  }
}

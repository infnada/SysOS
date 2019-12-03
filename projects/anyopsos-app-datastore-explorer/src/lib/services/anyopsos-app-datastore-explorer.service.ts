import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {ToastrService} from 'ngx-toastr';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {v4 as uuidv4} from 'uuid';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibVmwareService} from '@anyopsos/lib-vmware';

import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppDatastoreExplorerService {
  private $connections: BehaviorSubject<DatastoreExplorerConnection[]>;
  private $activeConnection: BehaviorSubject<string>;
  private $viewExchange: BehaviorSubject<boolean>;
  private dataStore: {  // This is where we will store our data in memory
    connections: DatastoreExplorerConnection[],
    activeConnection: string,
    viewExchange: boolean
  };
  connections: Observable<any>;
  activeConnection: Observable<any>;
  viewExchange: Observable<any>;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private Toastr: ToastrService,
              private socket: Socket,
              private FileSystem: AnyOpsOSLibFileSystemService,
              private Modal: AnyOpsOSLibModalService,
              private VMWare: AnyOpsOSLibVmwareService) {
    this.dataStore = {connections: [], activeConnection: null, viewExchange: false};
    this.$connections = new BehaviorSubject([]);
    this.$activeConnection = new BehaviorSubject(null);
    this.$viewExchange = new BehaviorSubject(false);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
    this.viewExchange = this.$viewExchange.asObservable();
  }

  getActiveConnection(): DatastoreExplorerConnection {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  getConnectionByUuid(uuid: string): DatastoreExplorerConnection {
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

  private initConnection(uuid): Promise<any> {

    if (this.getConnectionByUuid(uuid).type === 'vmware') {
      this.Modal.changeModalText('Connecting to Datastore...', '.window--datastore-explorer .window__main');
      return this.VMWare.connectvCenterSoap(this.getConnectionByUuid(uuid)).then((data) => {
        if (data.status === 'error') throw new Error('Failed to connect to vCenter');

        this.getActiveConnection().state = 'connected';

        this.Modal.closeModal('.window--datastore-explorer .window__main');
      });
    }

    if (this.getConnectionByUuid(uuid).type === 'netapp') {
      this.getActiveConnection().state = 'connected';
      return Promise.resolve();
    }

  }

  connect(connection: DatastoreExplorerConnection): Promise<any> {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Datastore Explorer', 'Connect received', arguments);

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
        credential: connection.credential,
        type: connection.type,
        data: connection.data,
        state: 'disconnected'
      });
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    this.setActiveConnection(connection.uuid);

    return this.initConnection(connection.uuid);
  }

  disconnectConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    this.logger.debug('Datastore Explorer', 'Disconnecting connection', arguments);

    this.socket.emit('[disconnect-session]', {
      type: 'datastore-explorer',
      uuid
    });

    this.getConnectionByUuid(uuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(uuid?: string): void {
    const loggerArgs = arguments;

    if (!uuid) uuid = this.dataStore.activeConnection;

    const configFile = 'applications/datastore-explorer/config.json';

    this.Modal.openRegisteredModal('question', '.window--datastore-explorer .window__main',
      {
        title: `Delete connection ${this.getConnectionByUuid(uuid).data.obj.name}`,
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

          this.logger.debug('Datastore Explorer', 'Deleting connection', loggerArgs);

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              this.logger.debug('Datastore Explorer', 'Connection deleted successfully', loggerArgs);
            },
            error => {
              this.logger.error('Datastore Explorer', 'Error while deleting connection', loggerArgs, error);
            });

        }
      });
    });

  }
}

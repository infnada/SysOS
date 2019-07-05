import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {ToastrService} from 'ngx-toastr';
import {NGXLogger} from 'ngx-logger';
import {v4 as uuidv4} from 'uuid';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibVmwareService} from '@sysos/lib-vmware';

import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';

@Injectable({
  providedIn: 'root'
})
export class SysosAppDatastoreExplorerService {
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

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private socket: Socket,
              private FileSystem: SysosLibFileSystemService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService) {
    this.dataStore = {connections: [], activeConnection: null, viewExchange: false};
    this.$connections = new BehaviorSubject([]) as BehaviorSubject<DatastoreExplorerConnection[]>;
    this.$activeConnection = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.$viewExchange = new BehaviorSubject(false) as BehaviorSubject<boolean>;
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

  initConnection(uuid): Promise<any> {
    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to Datastore...', '.window--datastore-explorer .window__main', 'plain');

    return this.VMWare.connectvCenterSoap(this.getConnectionByUuid(uuid).credential, this.getConnectionByUuid(uuid).host, this.getConnectionByUuid(uuid).port).then((data) => {
      if (data.status === 'error') throw new Error('Failed to connect to vCenter');

      this.getActiveConnection().state = 'connected';

      this.Modal.closeModal('.window--datastore-explorer .window__main');
    });
  }

  connect(connection: DatastoreExplorerConnection): Promise<any> {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('DatastoreExplorer Factory -> Connect received -> host [%s]', connection.host);

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
        datastoreId: connection.datastoreId,
        name: connection.name,
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        datacenter: connection.datacenter,
        type: 'vmware',
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

    this.logger.debug('DatastoreExplorer Factory [%s] -> Disconnecting connection', uuid);

    this.socket.emit('[disconnect-session]', {
      type: 'datastore-explorer',
      uuid
    });

    this.getConnectionByUuid(uuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  deleteConnection(uuid?: string): void {
    if (!uuid) uuid = this.dataStore.activeConnection;

    const configFile = 'applications/datastore-explorer/config.json';

    this.Modal.openRegisteredModal('question', '.window--datastore-explorer .window__main',
      {
        title: 'Delete connection ' + this.getConnectionByUuid(uuid).name,
        text: 'Remove the selected connection from the inventory?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          this.logger.debug('DatastoreExplorer Factory [%s] -> Deleting connection', uuid);

          this.disconnectConnection(uuid);
          this.setActiveConnection(null);

          this.FileSystem.deleteConfigFromFile(uuid, configFile).subscribe(
            () => {
              this.dataStore.connections = this.dataStore.connections.filter((connection) => {
                return connection.uuid !== uuid;
              });

              // broadcast data to subscribers
              this.$connections.next(Object.assign({}, this.dataStore).connections);

              this.logger.debug('DatastoreExplorer Factory [%s] -> Connection deleted successfully', uuid);
            },
            error => {
              this.logger.error('DatastoreExplorer Factory [%s] -> Error while deleting connection -> ', uuid, error);
            });

        }
      });
    });

  }
}
import {Injectable, ViewContainerRef} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {MatDialogRef} from '@anyopsos/lib-angular-material';
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

  localBodyContainer: ViewContainerRef;
  serverBodyContainer: ViewContainerRef;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private socket: Socket,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private VMWare: AnyOpsOSLibVmwareService) {
    this.dataStore = {connections: [], activeConnection: null, viewExchange: false};
    this.$connections = new BehaviorSubject(this.dataStore.connections);
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.$viewExchange = new BehaviorSubject(this.dataStore.viewExchange);
    this.connections = this.$connections.asObservable();
    this.activeConnection = this.$activeConnection.asObservable();
    this.viewExchange = this.$viewExchange.asObservable();
  }

  /**
   * Sets the bodyContainerRef, this is used by Modals
   */
  setLocalBodyContainerRef(localBodyContainer: ViewContainerRef) {
    this.localBodyContainer = localBodyContainer;
  }

  setServerBodyContainerRef(serverBodyContainer: ViewContainerRef) {
    this.serverBodyContainer = serverBodyContainer;
  }

  toggleExchange(): void {
    this.dataStore.viewExchange = !this.dataStore.viewExchange;

    // broadcast data to subscribers
    this.$viewExchange.next(Object.assign({}, this.dataStore).viewExchange);
  }

  getActiveConnection(): DatastoreExplorerConnection {
    if (this.dataStore.activeConnection === null) return null;

    return this.dataStore.connections.find(obj => obj.uuid === this.dataStore.activeConnection);
  }

  getConnectionByUuid(connectionUuid: string): DatastoreExplorerConnection {
    if (!connectionUuid) throw new Error('uuid');

    return this.dataStore.connections.find(obj => obj.uuid === connectionUuid);
  }

  setActiveConnection(connectionUuid: string = null): void {
    this.dataStore.activeConnection = connectionUuid;

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  connect(connection: DatastoreExplorerConnection, littleModalRef: MatDialogRef<any>): Promise<any> {
    if (!connection) throw new Error('connection_not_found');

    this.logger.debug('Datastore Explorer', 'Connect received', arguments);

    // Editing an existing connection
    if (connection.uuid) {
      connection.state = 'disconnected';

      const currentConnectionIndex = this.dataStore.connections.findIndex((obj) => obj.uuid === connection.uuid);
      this.dataStore.connections[currentConnectionIndex] = connection;

    // New connection received
    } else {
      connection = {
        uuid: uuidv4(),
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        type: connection.type,
        data: connection.data,
        state: 'disconnected'
      };

      this.dataStore.connections.push(connection);
    }

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);

    this.setActiveConnection(connection.uuid);

    return this.initConnection(littleModalRef).catch(e => {
      // Show error on screen
      this.LibModal.changeModalType(littleModalRef.id, 'danger');
      this.LibModal.changeModalText(littleModalRef.id, e);
    });
  }

  private initConnection(littleModalRef: MatDialogRef<any>): Promise<void> {

    if (this.getActiveConnection().type === 'vmware') {
      this.LibModal.changeModalText(littleModalRef.id, 'Connecting to Datastore...');

      return this.VMWare.connectvCenterSoap(this.getActiveConnection()).then((data) => {
        if (data.status === 'error') throw new Error('Failed to connect to vCenter');

        this.getActiveConnection().state = 'connected';

        this.LibModal.closeModal(littleModalRef.id);
      });
    }

    if (this.getActiveConnection().type === 'netapp') {
      this.getActiveConnection().state = 'connected';
      return Promise.resolve();
    }

  }

  disconnectConnection(connectionUuid?: string): void {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    this.logger.debug('Datastore Explorer', 'Disconnecting connection', arguments);

    this.socket.emit('[session-disconnect]', {
      type: 'datastore-explorer',
      uuid: connectionUuid
    });

    this.getConnectionByUuid(connectionUuid).state = 'disconnected';

    // broadcast data to subscribers
    this.$connections.next(Object.assign({}, this.dataStore).connections);
  }

  async deleteConnection(connectionUuid?: string): Promise<void> {
    const loggerArgs = arguments;

    if (!connectionUuid) connectionUuid = this.dataStore.activeConnection;

    const configFile = 'applications/datastore-explorer/config.json';

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.serverBodyContainer,
      {
        title: `Delete connection ${this.getConnectionByUuid(connectionUuid).data.obj.name}`,
        text: 'Remove the selected connection from the inventory?',
        yes: 'Delete',
        yesClass: 'warn',
        no: 'Cancel',
        boxContent: 'This action is permanent.',
        boxClass: 'text-danger',
        boxIcon: 'warning'
      }
    );

    modalInstance.afterClosed().subscribe(async (result: boolean) => {
      if (result === true) {

        this.logger.debug('Datastore Explorer', 'Deleting connection', loggerArgs);

        this.disconnectConnection(connectionUuid);
        this.setActiveConnection(null);

        this.LibFileSystem.deleteConfigFile(configFile, connectionUuid).subscribe(
          () => {
            this.dataStore.connections = this.dataStore.connections.filter((connection) => {
              return connection.uuid !== connectionUuid;
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
  }

}

import {Injectable, ViewContainerRef} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibSshConnectionsStateService, AnyOpsOSLibSshHelpersService, AnyOpsOSLibSshService} from '@anyopsos/lib-ssh';
import {ConnectionSftp} from '@anyopsos/module-ssh';
import {ConnectionTypes} from '@anyopsos/backend/app/types/connection-types';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppSftpService {
  private readonly $activeConnection: BehaviorSubject<ConnectionSftp | null>;
  private readonly $activeConnectionUuid: BehaviorSubject<string | null>;
  private readonly $viewExchange: BehaviorSubject<boolean>;
  private dataStore: {
    activeConnection: ConnectionSftp | null;
    activeConnectionUuid: string | null;
    viewExchange: boolean;
  };
  readonly activeConnection: Observable<ConnectionSftp | null>;
  readonly activeConnectionUuid: Observable<string | null>;
  readonly viewExchange: Observable<boolean>;

  private bodyContainer: ViewContainerRef;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibSshConnectionsState: AnyOpsOSLibSshConnectionsStateService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly LibSsh: AnyOpsOSLibSshService) {

    this.dataStore = { activeConnection: null, activeConnectionUuid: null, viewExchange: false };
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.$activeConnectionUuid = new BehaviorSubject(this.dataStore.activeConnectionUuid);
    this.$viewExchange = new BehaviorSubject(this.dataStore.viewExchange);
    this.activeConnection = this.$activeConnection.asObservable();
    this.activeConnectionUuid = this.$activeConnectionUuid.asObservable();
    this.viewExchange = this.$viewExchange.asObservable();
  }

  /**
   * Show or hide Exchange tab
   */
  toggleExchange(): void {
    this.dataStore.viewExchange = !this.dataStore.viewExchange;

    // broadcast data to subscribers
    this.$viewExchange.next(Object.assign({}, this.dataStore).viewExchange);
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

  /**
   * Updates current activeConnectionUuid state
   */
  setActiveConnectionUuid(connectionUuid: string = null): void {
    this.dataStore.activeConnectionUuid = connectionUuid;

    // broadcast data to subscribers
    this.$activeConnectionUuid.next(Object.assign({}, this.dataStore).activeConnectionUuid);

    this.connectionsUpdated();
  }

  getActiveConnection(): Promise<ConnectionSftp | null> {
    if (this.dataStore.activeConnectionUuid === null) return null;

    return this.LibSshHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid, 'sftp') as Promise<ConnectionSftp>;
  }

  /**
   * Called every time the Ssh connections state is updated
   */
  async connectionsUpdated(): Promise<void> {

    if (!this.dataStore.activeConnectionUuid) {
      this.dataStore.activeConnection = null;
    } else {
      this.dataStore.activeConnection = await this.LibSshHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid, 'sftp') as ConnectionSftp;
    }

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  /**
   * Called by user to start new SSH connection (SFTP)
   */
  async connect(connection: ConnectionSftp, saveOnly: boolean = false): Promise<ConnectionSftp> {
    if (!connection) throw new Error('resource_invalid');
    this.logger.debug('Sftp', 'Connect received');

    // Editing an existing connection
    if (connection.uuid) {
      await this.LibSshConnectionsState.patchFullConnection(connection);

      // New connection received
    } else {
      connection = {
        type: 'sftp',
        uuid: uuidv4(),
        description: connection.description,
        host: connection.host,
        port: connection.port,
        credential: connection.credential,
        hopServerUuid: connection.hopServerUuid,
        autoLogin: connection.autoLogin,
        state: 'disconnected'
      };

      await this.LibSshConnectionsState.putConnection(connection);
    }

    // Connect to the server
    if (!saveOnly) {
      await this.LibSsh.sendConnect(connection.uuid);

      // Create SFTP client
      await this.LibSsh.socketCreateSftpWrapper(connection.uuid);
    }

    return connection;
  }

  async deleteConnection(connectionUuid?: string): Promise<void> {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnectionUuid;

    const currentConnection: ConnectionSftp = await this.LibSshHelpers.getConnectionByUuid(connectionUuid, 'sftp') as ConnectionSftp;
    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.bodyContainer,
      {
        title: `Delete connection ${currentConnection.description}`,
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

      this.logger.debug('Sftp', 'Deleting connection');

      this.setActiveConnectionUuid();

      await this.LibSsh.deleteConnection(connectionUuid);
    });
  }

  async editConnection(connectionUuid?: string): Promise<void> {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnectionUuid;

    const currentConnection: ConnectionSftp = await this.LibSshHelpers.getConnectionByUuid(connectionUuid, 'sftp') as ConnectionSftp;
    if (currentConnection.state !== 'ready') return this.setActiveConnectionUuid(connectionUuid);

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', this.bodyContainer,
      {
        title: `Edit connection ${currentConnection.description}`,
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

      await this.LibSsh.disconnectConnection(connectionUuid);
      this.setActiveConnectionUuid(connectionUuid);
    });
  }
}

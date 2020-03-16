import {Injectable, ViewContainerRef} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {v4 as uuidv4} from 'uuid';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibSshConnectionsStateService, AnyOpsOSLibSshHelpersService, AnyOpsOSLibSshService} from '@anyopsos/lib-ssh';
import {ConnectionSsh} from '@anyopsos/module-ssh';
import {ConnectionTypes} from '@anyopsos/backend-core/app/types/connection-types';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppSshService {
  private readonly $activeConnection: BehaviorSubject<ConnectionSsh | null>;
  private readonly $activeConnectionUuid: BehaviorSubject<string | null>;
  private dataStore: {
    activeConnection: ConnectionSsh | null;
    activeConnectionUuid: string | null;
  };
  readonly activeConnection: Observable<ConnectionSsh | null>;
  readonly activeConnectionUuid: Observable<string | null>;

  private readonly connectionToTerminalMap: string[] = [];
  private bodyContainer: ViewContainerRef;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibSshConnectionsState: AnyOpsOSLibSshConnectionsStateService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly LibSsh: AnyOpsOSLibSshService) {

    this.dataStore = { activeConnection: null, activeConnectionUuid: null };
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.$activeConnectionUuid = new BehaviorSubject(this.dataStore.activeConnectionUuid);
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

  /**
   * Setter & Getter of Terminal Map
   */
  setTerminalMap(connectionUuid: string, terminalUuid: string): void {
    this.connectionToTerminalMap[connectionUuid] = terminalUuid;
  }

  deleteTerminalMap(connectionUuid: string): void {
    this.connectionToTerminalMap[connectionUuid] = undefined;
    delete this.connectionToTerminalMap[connectionUuid];
  }

  getTerminalMap(connectionUuid: string): string {
    return this.connectionToTerminalMap[connectionUuid];
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

  getActiveConnection(): ConnectionSsh | null {
    if (this.dataStore.activeConnectionUuid === null) return null;

    // We can use this.dataStore.activeConnection
    return this.$activeConnection.getValue();
  }

  /**
   * Called every time the Ssh connections state is updated
   */
  connectionsUpdated(): void {

    if (!this.dataStore.activeConnectionUuid) {
      this.dataStore.activeConnection = null;
    } else {
      this.dataStore.activeConnection = this.LibSshHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid, 'ssh') as ConnectionSsh;
    }

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  /**
   * Called by user to start new SSH connection (Shell)
   */
  async connect(connection: ConnectionSsh, saveOnly: boolean = false): Promise<ConnectionSsh> {
    if (!connection) throw new Error('resource_invalid');
    this.logger.debug('Ssh', 'Connect received');

    // Editing an existing connection
    if (connection.uuid) {
      await this.LibSshConnectionsState.patchFullConnection(connection);

    // New connection received
    } else {
      connection = {
        type: 'ssh',
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
    if (!saveOnly) await this.LibSsh.sendConnect(connection.uuid);

    return connection;
  }

  async deleteConnection(connectionUuid?: string): Promise<void> {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnectionUuid;

    const currentConnection: ConnectionSsh = this.LibSshHelpers.getConnectionByUuid(connectionUuid, 'ssh') as ConnectionSsh;
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

      this.logger.debug('Ssh', 'Deleting connection');

      this.setActiveConnectionUuid();

      await this.LibSsh.deleteConnection(connectionUuid);
    });
  }

  async editConnection(connectionUuid?: string): Promise<void> {
    if (!connectionUuid) connectionUuid = this.dataStore.activeConnectionUuid;

    const currentConnection: ConnectionSsh = this.LibSshHelpers.getConnectionByUuid(connectionUuid, 'ssh') as ConnectionSsh;
    if (currentConnection.state === 'disconnected') return this.setActiveConnectionUuid(connectionUuid);

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

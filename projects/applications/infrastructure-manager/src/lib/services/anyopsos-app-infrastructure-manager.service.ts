import {Injectable, ViewContainerRef} from '@angular/core';

import {take} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {v4 as uuidv4} from 'uuid';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {AnyOpsOSLibNodeHelpersService} from '@anyopsos/lib-node';
import {AnyOpsOSLibNodeVmwareService, AnyOpsOSLibNodeVmwareConnectionsStateService} from '@anyopsos/lib-node-vmware';
import {AnyOpsOSLibNodeNetappService, AnyOpsOSLibNodeNetappConnectionsStateService} from '@anyopsos/lib-node-netapp';
import {AnyOpsOSLibNodeDockerService, AnyOpsOSLibNodeDockerConnectionsStateService} from '@anyopsos/lib-node-docker';
import {AnyOpsOSLibNodeKubernetesService, AnyOpsOSLibNodeKubernetesConnectionsStateService} from '@anyopsos/lib-node-kubernetes';
import {AnyOpsOSLibNodeLinuxService, AnyOpsOSLibNodeLinuxConnectionsStateService} from '@anyopsos/lib-node-linux';
import {AnyOpsOSLibNodeSnmpService, AnyOpsOSLibNodeSnmpConnectionsStateService} from '@anyopsos/lib-node-snmp';

import {ConnectionTypes} from '@anyopsos/backend-core/app/types/connection-types';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerService {
  private readonly $activeConnection: BehaviorSubject<ConnectionTypes | null>;
  private readonly $activeConnectionUuid: BehaviorSubject<string | null>;
  private readonly $activeObject: BehaviorSubject<DataObject | null>;
  private readonly $activeObjectUuid: BehaviorSubject<string | null>;

  private dataStore: {
    activeConnection: ConnectionTypes | null;
    activeConnectionUuid: string | null;
    activeObject: DataObject | null;
    activeObjectUuid: string | null;
  };
  readonly activeConnection: Observable<ConnectionTypes | null>;
  readonly activeConnectionUuid: Observable<string | null>;
  readonly activeObject: Observable<DataObject | null>;
  readonly activeObjectUuid: Observable<string | null>;

  private bodyContainer: ViewContainerRef;
  private activeConnectionType: string | null;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly socket: Socket,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,

              private readonly LibNodeHelpers: AnyOpsOSLibNodeHelpersService,

              private readonly LibNodeVmware: AnyOpsOSLibNodeVmwareService,
              private readonly LibNodeNetapp: AnyOpsOSLibNodeNetappService,
              private readonly LibNodeDocker: AnyOpsOSLibNodeDockerService,
              private readonly LibNodeKubernetes: AnyOpsOSLibNodeKubernetesService,
              private readonly LibNodeSnmp: AnyOpsOSLibNodeSnmpService,
              private readonly LibNodeLinux: AnyOpsOSLibNodeLinuxService,

              private readonly LibNodeVmwareConnectionsState: AnyOpsOSLibNodeVmwareConnectionsStateService,
              private readonly LibNodeNetappConnectionsState: AnyOpsOSLibNodeNetappConnectionsStateService,
              private readonly LibNodeDockerConnectionsState: AnyOpsOSLibNodeDockerConnectionsStateService,
              private readonly LibNodeKubernetesConnectionsState: AnyOpsOSLibNodeKubernetesConnectionsStateService,
              private readonly LibNodeSnmpConnectionsState: AnyOpsOSLibNodeSnmpConnectionsStateService,
              private readonly LibNodeLinuxConnectionsState: AnyOpsOSLibNodeLinuxConnectionsStateService) {

    this.dataStore = { activeConnection: null, activeConnectionUuid: null, activeObject: null, activeObjectUuid: null };
    this.$activeConnection = new BehaviorSubject(this.dataStore.activeConnection);
    this.$activeConnectionUuid = new BehaviorSubject(this.dataStore.activeConnectionUuid);
    this.$activeObject = new BehaviorSubject(this.dataStore.activeObject);
    this.$activeObjectUuid = new BehaviorSubject(this.dataStore.activeObjectUuid);
    this.activeConnection = this.$activeConnection.asObservable();
    this.activeConnectionUuid = this.$activeConnectionUuid.asObservable();
    this.activeObject = this.$activeObject.asObservable();
    this.activeObjectUuid = this.$activeObjectUuid.asObservable();
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
  setActiveConnectionUuid(connectionUuid: string = null, connectionType: string = null): void {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    // Do not update if not needed
    if (this.dataStore.activeConnectionUuid === connectionUuid && this.activeConnectionType === connectionType) return;

    // reset ActiveObjectUuid
    if (!connectionUuid) this.setActiveObjectUuid();

    this.dataStore.activeConnectionUuid = connectionUuid;
    this.activeConnectionType = connectionType;

    // broadcast data to subscribers
    this.$activeConnectionUuid.next(Object.assign({}, this.dataStore).activeConnectionUuid);

    this.connectionsUpdated();
  }

  /**
   * Sets current activeObjectUuid state
   */
  setActiveObjectUuid(objectUuid: string = null): void {

    // Do not update if not needed
    if (this.dataStore.activeObjectUuid === objectUuid) return;

    this.dataStore.activeObjectUuid = objectUuid;

    if (objectUuid) {
      const mainUuid: string = this.LibNodeHelpers.extractMainUuidFromObjectUuid(objectUuid);
      const mainType: string = this.LibNodeHelpers.extractMainTypeFromObjectUuid(objectUuid);

      this.setActiveConnectionUuid(mainUuid, mainType)
    } else {
      this.connectionsUpdatedSetObject();
    }

    // broadcast data to subscribers
    this.$activeObjectUuid.next(Object.assign({}, this.dataStore).activeObjectUuid);
  }

  /**
   * Called every time the connections state is updated
   */
  connectionsUpdated(): void {

    if (!this.dataStore.activeConnectionUuid) {
      this.dataStore.activeConnection = null;
    } else {
      this.dataStore.activeConnection = this.LibNodeHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid, this.activeConnectionType);
    }

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);

    this.connectionsUpdatedSetObject();
  }

  /**
   * Called every time the connections state is updated
   */
  connectionsUpdatedSetObject(): void {

    if (!this.dataStore.activeObjectUuid) {
      this.dataStore.activeObject = null;
    } else {
     this.dataStore.activeObject = this.LibNodeHelpers.getObjectByUuid(this.dataStore.activeConnectionUuid, this.activeConnectionType, this.dataStore.activeObjectUuid);
    }

    // broadcast data to subscribers
    this.$activeObject.next(Object.assign({}, this.dataStore).activeObject);
  }

  /**
   * Get current active connection
   */
  getActiveConnection(): ConnectionTypes | null {
    if (this.dataStore.activeConnectionUuid === null) return null;

    // We can use this.dataStore.activeConnection
    return this.$activeConnection.getValue();
  }

  /**
   * Get current connection active object
   */
  getActiveObject(): DataObject | null {
    if (this.dataStore.activeObjectUuid === null) return null;

    // We can use this.dataStore.activeObject
    return this.$activeObject.getValue();
  }

  /**
   * -------------------------
   *  New connections
   * -------------------------
   */

  /**
   * Called when user starts a new connection
   */
  async connect(connection: ConnectionTypes, saveOnly: boolean = false): Promise<ConnectionTypes> {
    if (!connection) throw new Error('resource_invalid');
    this.logger.debug('Infrastructure Manager', 'Connect received');

    // Editing an existing connection
    if (connection.uuid) {
      if (connection.type === 'vmware') await this.LibNodeVmwareConnectionsState.patchFullConnection(connection);
      if (connection.type === 'netapp') await this.LibNodeNetappConnectionsState.patchFullConnection(connection);
      if (connection.type === 'docker') await this.LibNodeDockerConnectionsState.patchFullConnection(connection);
      if (connection.type === 'kubernetes') await this.LibNodeKubernetesConnectionsState.patchFullConnection(connection);
      if (connection.type === 'linux') await this.LibNodeLinuxConnectionsState.patchFullConnection(connection);
      if (connection.type === 'snmp') await this.LibNodeSnmpConnectionsState.patchFullConnection(connection);

    // New connection received
    } else {

      connection.uuid = uuidv4();
      connection.state = 'disconnected';

      if (connection.type === 'vmware') await this.LibNodeVmwareConnectionsState.putConnection(connection);
      if (connection.type === 'netapp') await this.LibNodeNetappConnectionsState.putConnection(connection);
      if (connection.type === 'docker') await this.LibNodeDockerConnectionsState.putConnection(connection);
      if (connection.type === 'kubernetes') await this.LibNodeKubernetesConnectionsState.putConnection(connection);
      if (connection.type === 'linux') await this.LibNodeLinuxConnectionsState.putConnection(connection);
      if (connection.type === 'snmp') await this.LibNodeSnmpConnectionsState.putConnection(connection);
    }

    // Connect to the server
    if (!saveOnly) {
      if (connection.type === 'vmware') await this.LibNodeVmware.sendConnect(connection.uuid);
      if (connection.type === 'netapp') await this.LibNodeNetapp.sendConnect(connection.uuid);
      if (connection.type === 'docker') await this.LibNodeDocker.sendConnect(connection.uuid);
      if (connection.type === 'kubernetes') await this.LibNodeKubernetes.sendConnect(connection.uuid);
      if (connection.type === 'linux') await this.LibNodeLinux.sendConnect(connection.uuid);
      if (connection.type === 'snmp') await this.LibNodeSnmp.sendConnect(connection.uuid);
    }

    return connection;
  }

  async disconnectConnection(connectionUuid: string = null, connectionType: string = null): Promise<void> {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    if (!connectionUuid) {
      connectionUuid = this.dataStore.activeConnectionUuid;
      connectionType = this.activeConnectionType;
    }

    if (connectionType === 'vmware') await this.LibNodeVmware.disconnectConnection(connectionUuid);
    if (connectionType === 'netapp') await this.LibNodeNetapp.disconnectConnection(connectionUuid);
    if (connectionType === 'docker') await this.LibNodeDocker.disconnectConnection(connectionUuid);
    if (connectionType === 'kubernetes') await this.LibNodeKubernetes.disconnectConnection(connectionUuid);
    if (connectionType === 'linux') await this.LibNodeLinux.disconnectConnection(connectionUuid);
    if (connectionType === 'snmp') await this.LibNodeSnmp.disconnectConnection(connectionUuid);
  }

  async deleteConnection(connectionUuid: string = null, connectionType: string = null): Promise<void> {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    if (!connectionUuid) {
      connectionUuid = this.dataStore.activeConnectionUuid;
      connectionType = this.activeConnectionType;
    }

    const currentConnection: ConnectionTypes = this.LibNodeHelpers.getConnectionByUuid(connectionUuid, connectionType);
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

      this.logger.debug('InfrastructureManager', 'Deleting connection');

      this.setActiveConnectionUuid();

      if (connectionType === 'vmware') await this.LibNodeVmware.deleteConnection(connectionUuid);
      if (connectionType === 'netapp') await this.LibNodeNetapp.deleteConnection(connectionUuid);
      if (connectionType === 'docker') await this.LibNodeDocker.deleteConnection(connectionUuid);
      if (connectionType === 'kubernetes') await this.LibNodeKubernetes.deleteConnection(connectionUuid);
      if (connectionType === 'linux') await this.LibNodeLinux.deleteConnection(connectionUuid);
      if (connectionType === 'snmp') await this.LibNodeSnmp.deleteConnection(connectionUuid);
    });
  }

  async editConnection(connectionUuid: string = null, connectionType: string = null): Promise<void> {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    if (!connectionUuid) {
      connectionUuid = this.dataStore.activeConnectionUuid;
      connectionType = this.activeConnectionType;
    }

    const currentConnection: ConnectionTypes = this.LibNodeHelpers.getConnectionByUuid(connectionUuid, connectionType);
    if (currentConnection.state === 'disconnected') return this.setActiveConnectionUuid(connectionUuid, connectionType);

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

      if (connectionType === 'vmware') await this.LibNodeVmware.disconnectConnection(connectionUuid);
      if (connectionType === 'netapp') await this.LibNodeNetapp.disconnectConnection(connectionUuid);
      if (connectionType === 'docker') await this.LibNodeDocker.disconnectConnection(connectionUuid);
      if (connectionType === 'kubernetes') await this.LibNodeKubernetes.disconnectConnection(connectionUuid);
      if (connectionType === 'linux') await this.LibNodeLinux.disconnectConnection(connectionUuid);
      if (connectionType === 'snmp') await this.LibNodeSnmp.disconnectConnection(connectionUuid);

      this.setActiveConnectionUuid(connectionUuid, connectionType);
    });
  }

  /**
   * -------------------------
   * SHARED
   * -------------------------
   */

  /**
   *
   */
  openBackupsManager(type: string, data: { [key: string]: DataObject }) {
    this.logger.debug('Infrastructure Manager', 'Opening Backups Manager APP');

    this.LibApplication.openApplication('backups-manager',
    {
      type,
      data
    });
  }

}

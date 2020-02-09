import {Injectable, ViewContainerRef} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {v4 as uuidv4} from 'uuid';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {AnyOpsOSLibVmwareHelpersService, AnyOpsOSLibVmwareService, AnyOpsOSLibVmwareConnectionsStateService} from '@anyopsos/lib-vmware';
import {AnyOpsOSLibNetappHelpersService, AnyOpsOSLibNetappService, AnyOpsOSLibNetappConnectionsStateService} from '@anyopsos/lib-netapp';
import {AnyOpsOSLibDockerHelpersService, AnyOpsOSLibDockerService, AnyOpsOSLibDockerConnectionsStateService} from '@anyopsos/lib-docker';
import {AnyOpsOSLibKubernetesHelpersService, AnyOpsOSLibKubernetesService, AnyOpsOSLibKubernetesConnectionsStateService} from '@anyopsos/lib-kubernetes';
import {AnyOpsOSLibLinuxHelpersService, AnyOpsOSLibLinuxService, AnyOpsOSLibLinuxConnectionsStateService} from '@anyopsos/lib-linux';
import {AnyOpsOSLibSnmpHelpersService, AnyOpsOSLibSnmpService, AnyOpsOSLibSnmpConnectionsStateService} from '@anyopsos/lib-snmp';

import {ConnectionVmware} from '@anyopsos/module-vmware';
import {ConnectionDocker} from '@anyopsos/module-docker';
import {ConnectionKubernetes} from '@anyopsos/module-kubernetes';
import {ConnectionSnmp} from '@anyopsos/module-snmp';
import {ConnectionLinux} from '@anyopsos/module-linux';
import {ConnectionNetapp} from '@anyopsos/module-netapp';

import {ConnectionTypes} from '@anyopsos/backend/app/types/connection-types';
import {DataObject} from '@anyopsos/backend/app/types/data-object';
import {MatDialogRef} from '@anyopsos/lib-angular-material';

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

              private readonly LibVmware: AnyOpsOSLibVmwareService,
              private readonly LibNetapp: AnyOpsOSLibNetappService,
              private readonly LibDocker: AnyOpsOSLibDockerService,
              private readonly LibKubernetes: AnyOpsOSLibKubernetesService,
              private readonly LibSnmp: AnyOpsOSLibSnmpService,
              private readonly LibLinux: AnyOpsOSLibLinuxService,

              private readonly LibVmwareConnectionsState: AnyOpsOSLibVmwareConnectionsStateService,
              private readonly LibNetappConnectionsState: AnyOpsOSLibNetappConnectionsStateService,
              private readonly LibDockerConnectionsState: AnyOpsOSLibDockerConnectionsStateService,
              private readonly LibKubernetesConnectionsState: AnyOpsOSLibKubernetesConnectionsStateService,
              private readonly LibSnmpConnectionsState: AnyOpsOSLibSnmpConnectionsStateService,
              private readonly LibLinuxConnectionsState: AnyOpsOSLibLinuxConnectionsStateService,

              private readonly LibVmwareHelpers: AnyOpsOSLibVmwareHelpersService,
              private readonly LibNetappHelpers: AnyOpsOSLibNetappHelpersService,
              private readonly LibDockerHelpers: AnyOpsOSLibDockerHelpersService,
              private readonly LibKubernetesHelpers: AnyOpsOSLibKubernetesHelpersService,
              private readonly LibSnmpHelpers: AnyOpsOSLibSnmpHelpersService,
              private readonly LibLinuxHelpers: AnyOpsOSLibLinuxHelpersService) {

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

    this.dataStore.activeConnectionUuid = connectionUuid;
    this.activeConnectionType = connectionType;

    // broadcast data to subscribers
    this.$activeConnectionUuid.next(Object.assign({}, this.dataStore).activeConnectionUuid);

    // reset ActiveObjectUuid
    this.setActiveObjectUuid();

    this.connectionsUpdated();
  }

  /**
   * Sets current activeObjectUuid state
   */
  setActiveObjectUuid(objectUuid: string = null): void {
    this.dataStore.activeObjectUuid = objectUuid;

    // broadcast data to subscribers
    this.$activeObjectUuid.next(Object.assign({}, this.dataStore).activeObjectUuid);
  }

  /**
   * Called every time the connections state is updated
   */
  async connectionsUpdated(): Promise<void> {

    if (!this.dataStore.activeConnectionUuid) {
      this.dataStore.activeConnection = null;
    } else {
      if (this.activeConnectionType === 'vmware') this.dataStore.activeConnection = await this.LibVmwareHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
      if (this.activeConnectionType === 'netapp') this.dataStore.activeConnection = await this.LibNetappHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
      if (this.activeConnectionType === 'docker') this.dataStore.activeConnection = await this.LibDockerHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
      if (this.activeConnectionType === 'kubernetes') this.dataStore.activeConnection = await this.LibKubernetesHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
      if (this.activeConnectionType === 'linux') this.dataStore.activeConnection = await this.LibLinuxHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
      if (this.activeConnectionType === 'snmp') this.dataStore.activeConnection = await this.LibSnmpHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
    }

    // broadcast data to subscribers
    this.$activeConnection.next(Object.assign({}, this.dataStore).activeConnection);
  }

  /**
   * Get current active connection
   */
  async getActiveConnection(): Promise<ConnectionTypes | null> {
    if (this.dataStore.activeConnectionUuid === null) return null;

    if (this.activeConnectionType === 'vmware') return this.LibVmwareHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
    if (this.activeConnectionType === 'netapp') return this.LibNetappHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
    if (this.activeConnectionType === 'docker') return this.LibDockerHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
    if (this.activeConnectionType === 'kubernetes') return this.LibKubernetesHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
    if (this.activeConnectionType === 'linux') return this.LibLinuxHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
    if (this.activeConnectionType === 'snmp') return this.LibSnmpHelpers.getConnectionByUuid(this.dataStore.activeConnectionUuid);
  }

  /**
   * Get current connection active object
   */
  async getActiveObject(): Promise<DataObject | null> {
    if (this.dataStore.activeObjectUuid === null) return null;

    const activeConnection: ConnectionTypes = await this.getActiveConnection();
    return activeConnection.data.Data.find(obj => obj.info.uuid === this.dataStore.activeObjectUuid);
  }

  /**
   * Return all connections
   */
  // TODO make tis as Promise.all to not affect performance
  async getConnections(): Promise<ConnectionTypes[]> {
    const vmwareConnections: ConnectionVmware[] = await this.LibVmwareHelpers.getAllConnections();
    const netappConnections: ConnectionNetapp[] = await this.LibNetappHelpers.getAllConnections();
    const dockerConnections: ConnectionDocker[] = await this.LibDockerHelpers.getAllConnections();
    const kubernetesConnections: ConnectionKubernetes[] = await this.LibKubernetesHelpers.getAllConnections();
    const linuxConnections: ConnectionLinux[] = await this.LibLinuxHelpers.getAllConnections();
    const snmpConnections: ConnectionSnmp[] = await this.LibSnmpHelpers.getAllConnections();

    return [...vmwareConnections, ...netappConnections, ...dockerConnections, ...kubernetesConnections, ...linuxConnections, ...snmpConnections];
  }

  /**
   * Return all connections matching 'type'
   */
  async getConnectionsByType(connectionType: string): Promise<ConnectionTypes[]> {
    if (!connectionType) throw new Error('invalid_resource');

    if (connectionType === 'vmware') return this.LibVmwareHelpers.getAllConnections();
    if (connectionType === 'netapp') return this.LibNetappHelpers.getAllConnections();
    if (connectionType === 'docker') return this.LibDockerHelpers.getAllConnections();
    if (connectionType === 'kubernetes') return this.LibKubernetesHelpers.getAllConnections();
    if (connectionType === 'linux') return this.LibLinuxHelpers.getAllConnections();
    if (connectionType === 'snmp') return this.LibSnmpHelpers.getAllConnections();
  }

  /**
   * Get connection full object matching 'uuid'
   */
  async getConnectionByUuid(connectionUuid: string, connectionType: string): Promise<ConnectionTypes> {
    if (!connectionUuid || !connectionType) throw new Error('invalid_resource');

    if (connectionType === 'vmware') return this.LibVmwareHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'netapp') return this.LibNetappHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'docker') return this.LibDockerHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'kubernetes') return this.LibKubernetesHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'linux') return this.LibLinuxHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'snmp') return this.LibSnmpHelpers.getConnectionByUuid(connectionUuid);
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
      if (connection.type === 'vmware') await this.LibVmwareConnectionsState.patchFullConnection(connection);
      if (connection.type === 'netapp') await this.LibNetappConnectionsState.patchFullConnection(connection);
      if (connection.type === 'docker') await this.LibDockerConnectionsState.patchFullConnection(connection);
      if (connection.type === 'kubernetes') await this.LibKubernetesConnectionsState.patchFullConnection(connection);
      if (connection.type === 'linux') await this.LibLinuxConnectionsState.patchFullConnection(connection);
      if (connection.type === 'snmp') await this.LibSnmpConnectionsState.patchFullConnection(connection);

    // New connection received
    } else {

      connection.uuid = uuidv4();
      connection.state = 'disconnected';

      if (connection.type === 'vmware') await this.LibVmwareConnectionsState.putConnection(connection);
      if (connection.type === 'netapp') await this.LibNetappConnectionsState.putConnection(connection);
      if (connection.type === 'docker') await this.LibDockerConnectionsState.putConnection(connection);
      if (connection.type === 'kubernetes') await this.LibKubernetesConnectionsState.putConnection(connection);
      if (connection.type === 'linux') await this.LibLinuxConnectionsState.putConnection(connection);
      if (connection.type === 'snmp') await this.LibSnmpConnectionsState.putConnection(connection);
    }

    // Connect to the server
    if (!saveOnly) {
      if (connection.type === 'vmware') await this.LibVmware.sendConnect(connection.uuid);
      if (connection.type === 'netapp') await this.LibNetapp.sendConnect(connection.uuid);
      if (connection.type === 'docker') await this.LibDocker.sendConnect(connection.uuid);
      if (connection.type === 'kubernetes') await this.LibKubernetes.sendConnect(connection.uuid);
      if (connection.type === 'linux') await this.LibLinux.sendConnect(connection.uuid);
      if (connection.type === 'snmp') await this.LibSnmp.sendConnect(connection.uuid);
    }

    return connection;
  }

  async disconnectConnection(connectionUuid: string = null, connectionType: string = null): Promise<void> {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    if (!connectionUuid) {
      connectionUuid = this.dataStore.activeConnectionUuid;
      connectionType = this.activeConnectionType;
    }

    if (connectionType === 'vmware') await this.LibVmware.disconnectConnection(connectionUuid);
    if (connectionType === 'netapp') await this.LibNetapp.disconnectConnection(connectionUuid);
    if (connectionType === 'docker') await this.LibDocker.disconnectConnection(connectionUuid);
    if (connectionType === 'kubernetes') await this.LibKubernetes.disconnectConnection(connectionUuid);
    if (connectionType === 'linux') await this.LibLinux.disconnectConnection(connectionUuid);
    if (connectionType === 'snmp') await this.LibSnmp.disconnectConnection(connectionUuid);
  }

  async deleteConnection(connectionUuid: string = null, connectionType: string = null): Promise<void> {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    if (!connectionUuid) {
      connectionUuid = this.dataStore.activeConnectionUuid;
      connectionType = this.activeConnectionType;
    }

    const currentConnection: ConnectionTypes = await this.getConnectionByUuid(connectionUuid, connectionType);
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

      if (connectionType === 'vmware') await this.LibVmware.deleteConnection(connectionUuid);
      if (connectionType === 'netapp') await this.LibNetapp.deleteConnection(connectionUuid);
      if (connectionType === 'docker') await this.LibDocker.deleteConnection(connectionUuid);
      if (connectionType === 'kubernetes') await this.LibKubernetes.deleteConnection(connectionUuid);
      if (connectionType === 'linux') await this.LibLinux.deleteConnection(connectionUuid);
      if (connectionType === 'snmp') await this.LibSnmp.deleteConnection(connectionUuid);
    });
  }

  async editConnection(connectionUuid: string = null, connectionType: string = null): Promise<void> {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    if (!connectionUuid) {
      connectionUuid = this.dataStore.activeConnectionUuid;
      connectionType = this.activeConnectionType;
    }

    const currentConnection: ConnectionTypes = await this.getConnectionByUuid(connectionUuid, connectionType);
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

      if (connectionType === 'vmware') await this.LibVmware.disconnectConnection(connectionUuid);
      if (connectionType === 'netapp') await this.LibNetapp.disconnectConnection(connectionUuid);
      if (connectionType === 'docker') await this.LibDocker.disconnectConnection(connectionUuid);
      if (connectionType === 'kubernetes') await this.LibKubernetes.disconnectConnection(connectionUuid);
      if (connectionType === 'linux') await this.LibLinux.disconnectConnection(connectionUuid);
      if (connectionType === 'snmp') await this.LibSnmp.disconnectConnection(connectionUuid);

      this.setActiveConnectionUuid(connectionUuid);
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

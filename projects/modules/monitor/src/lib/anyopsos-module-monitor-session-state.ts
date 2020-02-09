const validator = require('validator');

import {AnyOpsOSWorkspaceModule} from '@anyopsos/module-workspace';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSCredentialModule} from '@anyopsos/module-credential';

import {ConnectionMonitor} from './types/connection-monitor';
import {ConnectionMonitorServer} from './types/connection-monitor-server';
import {WorkspaceToMonitorMap} from './types/workspace-to-monitor-map';

import {MONITOR_CONFIG_FILE, MONITOR_PORT} from './anyopsos-module-monitor.constants';


const monitorSessions: WorkspaceToMonitorMap = {};

export class AnyOpsOSMonitorSessionStateModule {

  private readonly WorkspaceModule: AnyOpsOSWorkspaceModule;
  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;
  private readonly CredentialModule: AnyOpsOSCredentialModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.WorkspaceModule = new AnyOpsOSWorkspaceModule(this.userUuid, this.sessionUuid);
    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.CredentialModule = new AnyOpsOSCredentialModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
  }

  /**
   * Creates a new VMWare session
   */
  // TODO SSH hopServer?
  async createSession(): Promise<string> {
    if (!monitorSessions[this.workspaceUuid]) monitorSessions[this.workspaceUuid] = {};

    return 'todo';
  }

  async disconnectSession(): Promise<void> {
    // TODO
  }

  /**
   * Returns a Monitor session
   */
  getSession(): string {
    if (!monitorSessions[this.workspaceUuid]?.[this.connectionUuid]) throw new Error('resource_invalid');

    return monitorSessions[this.workspaceUuid][this.connectionUuid];
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnection(): Promise<ConnectionMonitor> {
    return this.ConfigFileModule.get(MONITOR_CONFIG_FILE, this.connectionUuid) as Promise<ConnectionMonitor>;
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnectionMainServer(): Promise<ConnectionMonitorServer> {
    const connectionData: ConnectionMonitor = await this.getConnection();

    return {
      host: connectionData.host,
      port: (validator.isInt(connectionData.port.toString(), {min: 1, max: 65535}) && connectionData.port) || MONITOR_PORT,
      credential: await this.CredentialModule.getCredential(connectionData.credential)
    };

  }

}

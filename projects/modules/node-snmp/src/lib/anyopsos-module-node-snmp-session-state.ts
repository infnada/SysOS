import {getSocketIO} from 'socket-controllers';
// @ts-ignore
import * as netSnmp from 'net-snmp';

import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSCredentialModule} from '@anyopsos/module-credential';

import {ConnectionSnmp} from './types/connection-snmp';
import {WorkspaceToSnmpMap} from './types/workspace-to-snmp-map';
import {SNMP_CONFIG_FILE} from './anyopsos-module-node-snmp.constants';

const snmpSessions: WorkspaceToSnmpMap = {};

export class AnyOpsOSNodeSnmpSessionStateModule {

  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;
  private readonly CredentialModule: AnyOpsOSCredentialModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.CredentialModule = new AnyOpsOSCredentialModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
  }

  async createSession(): Promise<netSnmp.Session> {
    if (!snmpSessions[this.workspaceUuid]) snmpSessions[this.workspaceUuid] = {};

    const connectionData: ConnectionSnmp = await this.getConnection();

    // Version v1 & v2c
    if (connectionData.version === 'v1' || connectionData.version === 'v2c') {
      snmpSessions[this.workspaceUuid][this.connectionUuid] = await netSnmp.createSession(connectionData.host, connectionData.community, {
        port: connectionData.port ?? 161,
        trapPort: connectionData.trapPort ?? 162,
        version: connectionData.version === 'v1' ? netSnmp.Version1 : netSnmp.Version2c
      });
    }

    // Version v3 TODO
    snmpSessions[this.workspaceUuid][this.connectionUuid] = await netSnmp.createV3Session(connectionData.host, connectionData.community, {
      port: connectionData.port ?? 161,
      trapPort: connectionData.trapPort ?? 162
    });

    // Set connection as ready
    connectionData.state = 'connected';

    // Send data to users
    this.ConfigFileModule.patch(SNMP_CONFIG_FILE, connectionData, this.connectionUuid);
    getSocketIO().to(this.workspaceUuid).emit('[snmp-data]', {
      connectionUuid: this.connectionUuid,
      data: {
        op: 'patch',
        uuid: connectionData.uuid,
        data: {
          state: 'connected'
        }
      }
    });

    return  snmpSessions[this.workspaceUuid][this.connectionUuid];
  }

  async disconnectSession(): Promise<void> {
    if (snmpSessions[this.workspaceUuid][this.connectionUuid]) snmpSessions[this.workspaceUuid][this.connectionUuid].close();
  }

  getSession(): netSnmp.Session {
    if (!snmpSessions[this.workspaceUuid]?.[this.connectionUuid]) throw new Error('resource_invalid');

    return snmpSessions[this.workspaceUuid][this.connectionUuid];
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnection(): Promise<ConnectionSnmp> {
    return this.ConfigFileModule.get(SNMP_CONFIG_FILE, this.connectionUuid) as Promise<ConnectionSnmp>;
  }

}

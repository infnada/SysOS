import fetch, {Headers, Response} from 'node-fetch';
const validator = require('validator');

import {AnyOpsOSWorkspaceModule} from '@anyopsos/module-workspace';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSCredentialModule} from '@anyopsos/module-credential';

import {ConnectionNetapp} from './types/connection-netapp';
import {ConnectionNetappServer} from './types/connection-netapp-server';
import {WorkspaceToNetappMap} from './types/workspace-to-netapp-map';

import {NETAPP_CONFIG_FILE, NETAPP_PORT, NETAPP_SOAP_COOKIE} from './anyopsos-module-netapp.constants';


const netappSessions: WorkspaceToNetappMap = {};

export class AnyOpsOSNetappSessionStateModule {

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
   * Creates a new NetApp session
   */
  // TODO SSH hopServer?
  async createSession(): Promise<string> {
    if (!netappSessions[this.workspaceUuid]) netappSessions[this.workspaceUuid] = {};

    // Connect
    const connectResponse: Response = await this.connectSoapApi();

    if (!connectResponse.ok) throw new Error(connectResponse.statusText);
    if (!connectResponse.headers.raw()['set-cookie'] && connectResponse.headers.raw()['set-cookie'][0].startsWith(NETAPP_SOAP_COOKIE)) throw new Error('resource_invalid');

    // Store session cookie
    netappSessions[this.workspaceUuid][this.connectionUuid] = connectResponse.headers.raw()['set-cookie'][0];
    return netappSessions[this.workspaceUuid][this.connectionUuid];
  }

  async disconnectSession(): Promise<void> {
    // TODO
  }

  /**
   * Returns a NetApp session SOAP cookie
   */
  getSession(): string {
    if (!netappSessions[this.workspaceUuid]?.[this.connectionUuid]) throw new Error('resource_invalid');

    return netappSessions[this.workspaceUuid][this.connectionUuid];
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnection(): Promise<ConnectionNetapp> {
    return this.ConfigFileModule.get(NETAPP_CONFIG_FILE, this.connectionUuid) as Promise<ConnectionNetapp>;
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnectionMainServer(): Promise<ConnectionNetappServer> {
    const connectionData: ConnectionNetapp = await this.getConnection();

    return {
      host: connectionData.host,
      port: (validator.isInt(connectionData.port.toString(), {min: 1, max: 65535}) && connectionData.port) || NETAPP_PORT,
      credential: await this.CredentialModule.getCredential(connectionData.credential)
    };

  }

  /**
   * Starts a session connecting to a NetApp node
   */
  // TODO
  async connectSoapApi(): Promise<Response> {
    const mainServer: ConnectionNetappServer = await this.getConnectionMainServer();

    const proto: string = (mainServer.port === 80 ? 'http' : 'https');
    const xml = `unknown>`;

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('SOAPAction', 'urn:vim25/6.0');
    requestHeaders.append('Content-Length', Buffer.byteLength(xml).toString());
    requestHeaders.append('Expect', '100-continue');

    return fetch(`${proto}://${mainServer.host}:${mainServer.port}/sdk`, {
      method: 'POST',
      body: xml,
      headers: requestHeaders
    })
      .then((res: Response) => res)
      .catch(e => e);

  }

}

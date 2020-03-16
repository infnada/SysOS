import {getSocketIO} from 'socket-controllers';
import fetch, {Headers, Response} from 'node-fetch';
const validator = require('validator');

import {AnyOpsOSSysWorkspaceModule} from '@anyopsos/module-sys-workspace';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSCredentialModule} from '@anyopsos/module-credential';

import {ConnectionVmware} from './types/connection-vmware';
import {ConnectionVmwareServer} from './types/connection-vmware-server';
import {WorkspaceToVmwareMap} from './types/workspace-to-vmware-map';

import {VMWARE_CONFIG_FILE, VMWARE_PORT, VMWARE_SOAP_COOKIE} from './anyopsos-module-node-vmware.constants';


const vmwareSessions: WorkspaceToVmwareMap = {};

export class AnyOpsOSNodeVmwareSessionStateModule {

  private readonly WorkspaceModule: AnyOpsOSSysWorkspaceModule;
  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;
  private readonly CredentialModule: AnyOpsOSCredentialModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.WorkspaceModule = new AnyOpsOSSysWorkspaceModule(this.userUuid, this.sessionUuid);
    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.CredentialModule = new AnyOpsOSCredentialModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
  }

  /**
   * Creates a new VMWare session
   */
  // TODO SSH hopServer?
  async createSession(): Promise<string> {
    if (!vmwareSessions[this.workspaceUuid]) vmwareSessions[this.workspaceUuid] = {};

    // Connect
    const connectResponse: Response = await this.connectSoapApi();

    if (!connectResponse.ok) throw new Error(connectResponse.statusText);
    if (!connectResponse.headers.raw()['set-cookie'] && connectResponse.headers.raw()['set-cookie'][0].startsWith(VMWARE_SOAP_COOKIE)) throw new Error('resource_invalid');

    // Set connection as ready
    const connectionData: ConnectionVmware = await this.getConnection();
    connectionData.state = 'connected';

    // Send data to users
    this.ConfigFileModule.patch(VMWARE_CONFIG_FILE, connectionData, this.connectionUuid);
    getSocketIO().to(this.workspaceUuid).emit('[vmware-data]', {
      connectionUuid: this.connectionUuid,
      data: {
        op: 'patch',
        uuid: connectionData.uuid,
        data: {
          state: 'connected'
        }
      }
    });

    // Store session cookie
    vmwareSessions[this.workspaceUuid][this.connectionUuid] = connectResponse.headers.raw()['set-cookie'][0];
    return vmwareSessions[this.workspaceUuid][this.connectionUuid];
  }

  async disconnectSession(): Promise<void> {
    // TODO
  }

  /**
   * Returns a VMWare session SOAP cookie
   */
  getSession(): string {
    if (!vmwareSessions[this.workspaceUuid]?.[this.connectionUuid]) throw new Error('resource_invalid');

    return vmwareSessions[this.workspaceUuid][this.connectionUuid];
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnection(): Promise<ConnectionVmware> {
    return this.ConfigFileModule.get(VMWARE_CONFIG_FILE, this.connectionUuid) as Promise<ConnectionVmware>;
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnectionMainServer(): Promise<ConnectionVmwareServer> {
    const connectionData: ConnectionVmware = await this.getConnection();

    return {
      host: connectionData.host,
      port: (validator.isInt(connectionData.port.toString(), {min: 1, max: 65535}) && connectionData.port) || VMWARE_PORT,
      credential: await this.CredentialModule.getCredential(connectionData.credential)
    };

  }

  /**
   * Starts a session connecting to a VMWare server (vCenter/ESXi)
   */
  async connectSoapApi(): Promise<Response> {
    const mainServer: ConnectionVmwareServer = await this.getConnectionMainServer();

    const proto: string = (mainServer.port === 80 ? 'http' : 'https');
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Login xmlns="urn:vim25">
      <_this type="SessionManager">SessionManager</_this>
      <userName>${mainServer.credential.username}</userName>
      <password>${mainServer.credential.password}</password>
    </Login>
  </soap:Body>
</soap:Envelope>`;

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

  async connectRestApi(): Promise<Response> {
    const mainServer: ConnectionVmwareServer = await this.getConnectionMainServer();

    const proto: string = (mainServer.port === 80 ? 'http' : 'https');

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Basic ${Buffer.from(mainServer.credential.username + ':' + mainServer.credential.password).toString('base64')}`);

    return fetch(`${proto}://${mainServer.host}:${mainServer.port}/rest/com/vmware/cis/session?~action=get`, {
      method: 'POST',
      headers: requestHeaders
    })
      .then((res: Response) => res)
      .catch(e => e);

  }

}

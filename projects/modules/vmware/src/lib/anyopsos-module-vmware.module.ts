import {getSocketIO} from 'socket-controllers';
import fetch, {Headers, Response} from 'node-fetch';
import {parseStringPromise} from 'xml2js';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSVmwareSessionStateModule} from './anyopsos-module-vmware-session-state'
import {AnyOpsOSVmwareDataRefresherModule} from './anyopsos-module-vmware-data-refresher';

import {ConnectionVmware} from './types/connection-vmware';
import {ConnectionVmwareServer} from './types/connection-vmware-server';

import {VMWARE_API_COOKIE, VMWARE_CONFIG_FILE, VMWARE_SOAP_COOKIE} from './anyopsos-module-vmware.constants';

import {parseVMwareObject, setDynamicProperties} from './anyopsos-module-vmware-sdk-helpers';
import {anyOpsOSExtension, allBasicDataFilter} from './anyopsos-module-vmware-sdk-aliases';
import {VmwareSdkFunctions, VmwareSdkFunctionsInput, VmwareSdkFunctionsOutput} from '@anyopsos/sdk-vmware';


const logger: Logger = getLogger('mainLog');

export class AnyOpsOSVmwareModule {

  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;
  private readonly VmwareSessionStateModule: AnyOpsOSVmwareSessionStateModule;
  private readonly VmwareDataRefresherModule: AnyOpsOSVmwareDataRefresherModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.VmwareSessionStateModule = new AnyOpsOSVmwareSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
    this.VmwareDataRefresherModule = new AnyOpsOSVmwareDataRefresherModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  /**
   * Creates a new connection
   */
  newConnection(): Promise<BackendResponse> {

    return this.VmwareSessionStateModule.createSession().then(async (sessionCookie: string) => {

      const connectionData: ConnectionVmware = await this.VmwareSessionStateModule.getConnection();

      // Get Base data
      const clientVersionResult: BackendResponse = await this.getClientVersion();
      if (clientVersionResult.status === 'error') throw {error: clientVersionResult.data, description: 'Failed to connect to VMWare'};
      if (clientVersionResult.data.version[0] < 6) throw new Error('VMWare version not compatible');

      connectionData.data.Base = {
        ...connectionData.data.Base,
        apiVersion: clientVersionResult.data.apiVersion[0],
        downloadUrl: clientVersionResult.data.downloadUrl[0],
        exactVersion: clientVersionResult.data.exactVersion[0],
        flexClientVersion: clientVersionResult.data.flexClientVersion[0],
        patchVersion: clientVersionResult.data.patchVersion[0],
        version: clientVersionResult.data.version[0],
        authdPort: (clientVersionResult.data.authdPort ? clientVersionResult.data.authdPort[0] : null),
        type: (clientVersionResult.data.authdPort ? 'ESXi' : 'vCenter')
      };

      // Patch data object
      this.ConfigFileModule.patch(VMWARE_CONFIG_FILE, connectionData, this.connectionUuid);
      getSocketIO().to(this.workspaceUuid).emit('[vmware-data]', {
        connectionUuid: this.connectionUuid,
        data: {
          op: 'patch',
          data: connectionData
        }
      });

      // Check anyOpsOS extension installed. TODO: only if user accept to install the extension
      const findExtensionResult: VmwareSdkFunctionsOutput<'FindExtension'> = await this.callSoapApi('FindExtension', {
        _this: {
          $type: 'ExtensionManager',
          _value: 'ExtensionManager'
        },
        extensionKey: 'com.anyopsos.management'
      });

      if (findExtensionResult.status === 'error') throw { error: findExtensionResult.data, description: 'Failed to get anyOpsOS extension to VMWare'};

      if (!findExtensionResult.data.returnval) {
        const registerExtensionResult: VmwareSdkFunctionsOutput<'RegisterExtension'> = await this.callSoapApi('RegisterExtension', {
          _this: {
            $type: 'ExtensionManager',
            _value: 'ExtensionManager'
          },
          extension: anyOpsOSExtension()
        });
      }

      const createFilterResult: VmwareSdkFunctionsOutput<'CreateFilter'> = await this.callSoapApi('CreateFilter', {
        _this: {
          $type: 'PropertyCollector',
          _value: 'PropertyCollector'
        },
        spec: allBasicDataFilter(),
        partialUpdates: false
      });
      if (createFilterResult.status === 'error') throw { error: createFilterResult.data, description: 'Failed to set data filter to VMWare'};

      // Update VMWare data
      this.getWaitForUpdatesEx();

      return {status: 'ok', data: 'connected'} as BackendResponse;

    }).catch((e: Error) => {
      throw e;
    });
  }

  /**
   * Updates session data
   */
  private async getWaitForUpdatesEx(version?: string) {
    logger.debug(`[VmwareMod] -> Updating VMWare data -> workspaceUuid [${this.workspaceUuid}], connectionUuid [${this.connectionUuid}]`);

    // @ts-ignore TODO
    const waitForUpdatesExResult: VmwareSdkFunctionsOutput<'WaitForUpdatesEx'> = await this.callSoapApi('WaitForUpdatesEx', {
      _this: {
        $type: 'PropertyCollector',
        _value: 'PropertyCollector'
      },
      options: { maxWaitSeconds: 0 },
      version
    });
    if (waitForUpdatesExResult.status === 'error') throw {error: waitForUpdatesExResult.data, description: 'Failed to get data from VMWare'};

    this.VmwareDataRefresherModule.parseObjects(waitForUpdatesExResult.data.returnval[0].filterSet[0].objectSet);

    setTimeout(() => {
      return this.getWaitForUpdatesEx();
    }, 60000);
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(): Promise<BackendResponse> {

    return this.VmwareSessionStateModule.disconnectSession().then(() => {

      return {status: 'ok', data: 'disconnected'} as BackendResponse;

    }).catch((e: Error) => {
      throw e;
    });
  }

  /**
   * Returns a vCenter or ESXi version
   */
  async getClientVersion(): Promise<BackendResponse> {
    const mainServer: ConnectionVmwareServer = await this.VmwareSessionStateModule.getConnectionMainServer();
    const proto: string = (mainServer.port === 80 ? 'http' : 'https');

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Accept', 'application/xml');
    requestHeaders.append('Content-Type', 'application/xml');

    return fetch(`${proto}://${mainServer.host}:${mainServer.port}/client/clients.xml`, {
      method: 'GET',
      headers: requestHeaders
    })
    .then((res: Response) => res.text())
    .then(async (res: any) => {

      return parseStringPromise(res);

    }).catch(e => e);

  }

  /**
   * Connects to the SOAP API and calls it
   */
  // @ts-ignore TODO
  async callSoapApi<Action extends VmwareSdkFunctions>(action: Action, data: VmwareSdkFunctionsInput<Action>): Promise<VmwareSdkFunctionsOutput<Action>> {
    const xml: string = `<?xml version='1.0' encoding='utf-8'?>
    <soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'>
      <soap:Body>
        <${action} xmlns='urn:vim25'>${setDynamicProperties(data)}</${action}>
      </soap:Body>
    </soap:Envelope>`;

    const connectResponse: Response = await this.VmwareSessionStateModule.connectSoapApi();

    if (!connectResponse.ok) throw new Error(connectResponse.statusText);
    if (!connectResponse.headers.raw()['set-cookie'] && connectResponse.headers.raw()['set-cookie'][0].startsWith(VMWARE_SOAP_COOKIE)) throw new Error('resource_invalid');

    const soapSessionCookie: string = connectResponse.headers.raw()['set-cookie'][0];

    const mainServer: ConnectionVmwareServer = await this.VmwareSessionStateModule.getConnectionMainServer();
    const proto: string = (mainServer.port === 80 ? 'http' : 'https');

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('SOAPAction', 'urn:vim25/6.0');
    requestHeaders.append('Content-Length', Buffer.byteLength(xml).toString());
    requestHeaders.append('Expect', '100-continue');
    requestHeaders.append('Cookie', soapSessionCookie);

    return fetch(`${proto}://${mainServer.host}:${mainServer.port}/sdk`, {
      method: 'POST',
      body: xml,
      headers: requestHeaders
    })
    .then((res: Response) => res.text())
    .then(async (res: any) => {

      return parseStringPromise(res);

    }).then((resultAsXml) => {

      // Something is wrong
      if (resultAsXml['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault']) {
        throw {
          status: 'error',
          data: {
            detail: resultAsXml['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0].detail[0],
            faultstring: resultAsXml['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0].faultstring
          }
        };
      }

      return parseVMwareObject(resultAsXml['soapenv:Envelope']['soapenv:Body'][0]);

    }).catch(e => e);

  }

  /**
   * Connects to the REST API and calls it
   */
  async callRestApi(apiPath: string): Promise<BackendResponse> {
    const connectResponse: Response = await this.VmwareSessionStateModule.connectRestApi();

    if (!connectResponse.ok) throw new Error(connectResponse.statusText);
    if (!connectResponse.headers.raw()['set-cookie'] && connectResponse.headers.raw()['set-cookie'][0].startsWith(VMWARE_API_COOKIE)) throw new Error('resource_invalid');

    const apiSessionCookie: string = connectResponse.headers.raw()['set-cookie'][0];

    const mainServer: ConnectionVmwareServer = await this.VmwareSessionStateModule.getConnectionMainServer();
    const proto: string = (mainServer.port === 80 ? 'http' : 'https');

    // https://code.vmware.com/apis/191/vsphere-automation

    const requestHeaders: any = new Headers();
    requestHeaders.append('Accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Cookie', apiSessionCookie);

    return fetch(`${proto}://${mainServer.host}:${mainServer.port}${apiPath}`, {
      method: 'GET',
      headers: requestHeaders
    })
      .then((res: Response) => res)
      .catch(e => e);

  }

}

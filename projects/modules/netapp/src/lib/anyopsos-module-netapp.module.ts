import {getSocketIO} from 'socket-controllers';
import fetch, {Headers, Response} from 'node-fetch';
import {parseStringPromise} from 'xml2js';

import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {AnyOpsOSNetappSessionStateModule} from './anyopsos-module-netapp-session-state';
import {AnyOpsOSNetappDataRefresherModule} from './anyopsos-module-netapp-data-refresher';

import {ConnectionNetapp} from './types/connection-netapp';
import {ConnectionNetappServer} from './types/connection-netapp-server';

import {NETAPP_SOAP_COOKIE, NETAPP_CONFIG_FILE} from './anyopsos-module-netapp.constants';

import {parseNetAppObject, setDynamicProperties} from './anyopsos-module-netapp-sdk-helpers';
import {NetappSdkFunctions, NetappSdkVfilerFunctions, NetappSdkFunctionsInput, NetappSdkVfilerFunctionsInput, NetappSdkFunctionsOutput, NetappSdkVfilerFunctionsOutput} from '@anyopsos/sdk-netapp';


export class AnyOpsOSNetappModule {

  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;
  private readonly NetappSessionStateModule: AnyOpsOSNetappSessionStateModule;
  private readonly NetappDataRefresherModule: AnyOpsOSNetappDataRefresherModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.NetappSessionStateModule = new AnyOpsOSNetappSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
    this.NetappDataRefresherModule = new AnyOpsOSNetappDataRefresherModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  /**
   * Creates a new connection
   */
  newConnection(): Promise<BackendResponse> {

    return this.NetappSessionStateModule.createSession().then(async (sessionCookie: string) => {

      const connectionData: ConnectionNetapp = await this.NetappSessionStateModule.getConnection();

      const systemVersionResult: NetappSdkFunctionsOutput<'system-get-version'> = await this.callSoapApi('system-get-version', {});
      if (systemVersionResult.status === 'error') throw {error: systemVersionResult.data, description: 'Failed to get NetApp System Version'};

      connectionData.data.Base = {
        ...connectionData.data.Base,
        buildTimestamp: systemVersionResult.data.build_timestamp,
        isClustered: systemVersionResult.data.is_clustered,
        version: systemVersionResult.data.version,
        versionTuple: systemVersionResult.data.version_tuple
      };

      // Get interfaces and basic data
      Promise.all([
        this.callSoapApi('net-interface-get-iter', {}),
        this.callSoapApi('fcp-interface-get-iter', {}),
        this.callSoapApi('fcp-adapter-get-iter', {}),
        this.callSoapApi('metrocluster-get', {}),
        this.callSoapApi('cluster-identity-get', {}),
        this.callSoapApi('license-v2-status-list-info', {}),
        this.callSoapApi('system-get-ontapi-version', {}),
      ]).then((res) => {
        if (res[0].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Network Interfaces'};
        if (res[1].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp FCP Interfaces'};
        if (res[2].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp FCP Adapters'};
        if (res[3].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Metrocluster data'};
        if (res[4].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Cluster Identity'};
        if (res[5].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Licenses'};
        if (res[6].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Ontapi Version'};

        connectionData.data.Base.metroCluster = res[3].data;
        connectionData.data.Base.cluster = res[4].data;
        connectionData.data.Base.licenses = res[5].data;
        connectionData.data.Base.ontapiVersion = res[6].data;

        // Patch data object
        this.ConfigFileModule.patch(NETAPP_CONFIG_FILE, connectionData, this.connectionUuid);
        getSocketIO().to(this.workspaceUuid).emit('[netapp-data]', {
          connectionUuid: this.connectionUuid,
          data: {
            op: 'patch',
            data: connectionData
          }
        });

        this.NetappDataRefresherModule.parseObjects('netiface', res[0].data);
        this.NetappDataRefresherModule.parseObjects('fcpiface', res[1].data);
        this.NetappDataRefresherModule.parseObjects('fcpadapter', res[2].data);

        return Promise.all([
          this.callSoapApi('vserver-get-iter', {}),
          this.callSoapApi('volume-get-iter', {}),
          this.callSoapApi('lun-get-iter', {}),
          this.callSoapApi('snapshot-get-iter', {}),
          this.callSoapApi('qtree-list-iter', {})
        ]);
      }).then(res => {
        if (res[0].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Vservers'};
        if (res[1].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Volumes'};
        if (res[2].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Luns'};
        if (res[3].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Snapshots'};
        if (res[4].status === 'error') throw {error: res[0].data, description: 'Failed to get NetApp Qtrees'};

        this.NetappDataRefresherModule.parseObjects('vserver', res[0].data);
        this.NetappDataRefresherModule.parseObjects('volume', res[1].data);
        this.NetappDataRefresherModule.parseObjects('lun', res[2].data);
        this.NetappDataRefresherModule.parseObjects('snapshot', res[3].data);
        this.NetappDataRefresherModule.parseObjects('qtree', res[4].data);

        /*
        // This is the main vServer
        if (vServer.info.data['vserver-type'] === 'admin') connectionData.data.Base.name = vServer.name;
         */

        /*
        await this.NetApp.getSnapshotFileInfo(
          connection.credential, connection.host, connection.port,
          vServer.name,
          volume.name,
          snapshot.name
        ).then((snapshotFileResult) => {
          if (snapshotFileResult.status === 'error') {
            throw {error: snapshotFileResult.error, description: 'Failed to get NetApp Snapshot creation date'};
          }

          snapshot.info.data.extraData = snapshotFileResult.data;
        });
         */
      });

      return {status: 'ok', data: 'connected'} as BackendResponse;

    }).catch((e: Error) => {
      throw e;
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(): Promise<BackendResponse> {

    return this.NetappSessionStateModule.disconnectSession().then(() => {

      return {status: 'ok', data: 'disconnected'} as BackendResponse;

    }).catch((e: Error) => {
      throw e;
    });
  }

  /**
   * Connects to the SOAP API and calls it
   */
  // TODO next-tag
  async callSoapApi<Action extends NetappSdkFunctions>(action: Action, data: NetappSdkFunctionsInput<Action>): Promise<NetappSdkFunctionsOutput<Action>>
  async callSoapApi<Action extends NetappSdkVfilerFunctions>(action: Action, data: NetappSdkVfilerFunctionsInput<Action>, vfiler: string): Promise<NetappSdkVfilerFunctionsOutput<Action>>
  async callSoapApi<Action extends NetappSdkFunctions | NetappSdkVfilerFunctions>(
    action: Action,
    data: NetappSdkFunctionsInput<Action> | NetappSdkVfilerFunctionsInput<Action>,
    vfiler?: string
  ): Promise<NetappSdkFunctionsOutput<Action> | NetappSdkVfilerFunctionsOutput<Action>> {
    const xml: string = `<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin' ${vfiler ? ' vfiler=\'' + vfiler + '\'' : ''}>
      <${action}>${setDynamicProperties(data)}</${action}>
    </netapp>`;

    const connectResponse: Response = await this.NetappSessionStateModule.connectSoapApi();

    if (!connectResponse.ok) throw new Error(connectResponse.statusText);
    if (!connectResponse.headers.raw()['set-cookie'] && connectResponse.headers.raw()['set-cookie'][0].startsWith(NETAPP_SOAP_COOKIE)) throw new Error('resource_invalid');

    const soapSessionCookie: string = connectResponse.headers.raw()['set-cookie'][0];

    const mainServer: ConnectionNetappServer = await this.NetappSessionStateModule.getConnectionMainServer();
    const proto: string = (mainServer.port === 80 ? 'http' : 'https');

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('Authorization', 'Basic ' + new Buffer(mainServer.credential.fields.UserName + ':' + mainServer.credential.fields.Password.getText()).toString('base64'));
    requestHeaders.append('Content-Length', Buffer.byteLength(xml).toString());
    requestHeaders.append('Cookie', soapSessionCookie);

    return fetch(`${proto}://${mainServer.host}:${mainServer.port}/servlets/netapp.servlets.admin.XMLrequest_filer`, {
      method: 'POST',
      body: '<?xml version=\'1.0\' encoding=\'utf-8\' ?><!DOCTYPE netapp SYSTEM \'file:/etc/netapp_filer.dtd\'>' + xml,
      headers: requestHeaders
    })
    .then((res: Response) => res.text())
    .then(async (res: any) => {

      return parseStringPromise(res);

    }).then((resultAsXml) => {

      return parseNetAppObject(resultAsXml['soapenv:Envelope']['soapenv:Body'][0]);

    }).catch(e => e);

  }

}

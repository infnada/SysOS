import {Request} from 'express';
import fetch, {Headers, Response} from 'node-fetch';

import {AnyOpsOSMonitorSessionStateModule} from './anyopsos-module-monitor-session-state';

import {ConnectionMonitor} from './types/connection-monitor';
import {ConnectionMonitorServer} from './types/connection-monitor-server';
import {ForwarderResponse} from './types/forwarder-response';

export class AnyOpsOSMonitorModule {

  private readonly MonitorSessionStateModule: AnyOpsOSMonitorSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string,
              private readonly request: Request) {

    this.MonitorSessionStateModule = new AnyOpsOSMonitorSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  private doRequest(url: string, requestHeaders: Headers): Promise<ForwarderResponse> {
    let resStatus: number;
    let contentType: string | null;

    // TODO port?

    return fetch(url, {
      method: 'GET',
      headers: requestHeaders
    }).then((res: Response) => {
      resStatus = res.status;
      contentType = res.headers.get('content-type');

      return (res.headers.get('content-type')?.includes('json') ? res.json() : res.text());
    }).then((res: any) => {

      // Return data
      return {
        resStatus,
        contentType,
        data: res
      };

    }).catch(e => e);
  }

  /**
   * Function used to forward Netdata requests to original destination host providing credentials/tokens if needed
   */
  private async forwardRequest(urlPath: string) {

    const mainServer: ConnectionMonitorServer = await this.MonitorSessionStateModule.getConnectionMainServer();
    const currentConnection: ConnectionMonitor = await this.MonitorSessionStateModule.getConnection();
    const url: string = currentConnection.host + urlPath + (
      Object.keys(this.request.query).length ?
        '?' + Object.keys(this.request.query).map(k => `${k}${(this.request.query[k] ? '=' + this.request.query[k] : '')}`).join('&') :
        ''
      );

    const requestHeaders: any = new Headers();

    if (!currentConnection.credential) return this.doRequest(url, requestHeaders);

    // TODO all credential types
    if (mainServer.credential.type === 'basic') {
      requestHeaders.append('Authorization', `Basic ${Buffer.from(mainServer.credential.username + ':' + mainServer.credential.password).toString('base64')}`);
    }

    return this.doRequest(url, requestHeaders);
  }

  async getCharts(): Promise<ForwarderResponse> {
    const currentConnection: ConnectionMonitor = await this.MonitorSessionStateModule.getConnection();

    if (currentConnection.type === 'netdata-credential') return this.forwardRequest('/api/v1/charts');

    return this.forwardRequest('/api/v1/charts');
  }

  async getChart(): Promise<ForwarderResponse> {
    const currentConnection: ConnectionMonitor = await this.MonitorSessionStateModule.getConnection();

    if (currentConnection.type === 'netdata-credential') return this.forwardRequest('/api/v1/chart');

    return this.forwardRequest('/api/v1/chart');
  }

  async getChartData(): Promise<ForwarderResponse> {
    const currentConnection: ConnectionMonitor = await this.MonitorSessionStateModule.getConnection();

    if (currentConnection.type === 'netdata-credential') return this.forwardRequest('/api/v1/data');

    return this.forwardRequest('/api/v1/data');
  }

  async getAlarms(): Promise<ForwarderResponse> {
    const currentConnection: ConnectionMonitor = await this.MonitorSessionStateModule.getConnection();

    if (currentConnection.type === 'netdata-credential') return this.forwardRequest('/api/v1/alarms');

    return this.forwardRequest('/api/v1/alarms');
  }

  async getAlarmsLog(): Promise<ForwarderResponse> {
    const currentConnection: ConnectionMonitor = await this.MonitorSessionStateModule.getConnection();

    if (currentConnection.type === 'netdata-credential') return this.forwardRequest('/api/v1/alarm_log');

    return this.forwardRequest('/api/v1/alarm_log');
  }

  async getBadge(): Promise<ForwarderResponse> {
    const currentConnection: ConnectionMonitor = await this.MonitorSessionStateModule.getConnection();

    if (currentConnection.type === 'netdata-credential') return this.forwardRequest('/api/v1/badge.svg');

    return this.forwardRequest('/api/v1/badge.svg');
  }

  async createSession(): Promise<boolean> {
    const currentConnection: ConnectionMonitor = await this.MonitorSessionStateModule.getConnection();

    if (currentConnection.type === 'netdata-credential') {
      const forwarderResult: ForwarderResponse = await this.forwardRequest('');

      if (forwarderResult.resStatus === 200) return true;
      return false;
    }

    return true;
  }
}

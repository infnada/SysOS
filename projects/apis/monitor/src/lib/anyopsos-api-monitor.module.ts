import {Controller, Get, Authorized, Req, Res, Param, QueryParam} from 'routing-controllers';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';
import {join} from 'path';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSHttpForwarderModule, ForwarderResponse} from '@anyopsos/module-http-forwarder';
import {AnyOpsOSMonitorModule, MonitorConnection} from '@anyopsos/module-monitor';

const logger: Logger = getLogger('mainlog');

@Authorized()
@Controller('/api/monitor')
export class AnyOpsOSMonitorApiController {

  /**
   * Function used to forward Netdata requests to original destination host providing credentials/tokens if needed
   */
  private async forwardRequest(urlPath: string, connectionUuid: string, request: Request, response: Response) {

    const configPath: string = join(new AnyOpsOSGetPathModule().filesystem, 'applications/monitor/config.json');
    // @ts-ignore TODO
    const currentConnection: MonitorConnection = await new AnyOpsOSConfigFileModule().get(configPath, connectionUuid);

    const forwarderResult: ForwarderResponse = await new AnyOpsOSHttpForwarderModule(request).doCall(
      currentConnection.url + urlPath + (Object.keys(request.query).length ? '?' + Object.keys(request.query).map(k => `${k}${(request.query[k] ? '=' + request.query[k] : '')}`).join('&') : ''),
      currentConnection.credential
    );

    // Handle 'connect' case
    if (urlPath === '' && forwarderResult.resStatus === 200) {
      return new AnyOpsOSApiGlobalsModule(request, response).validResponse();

    // Handle normal case
    } else {
      return new AnyOpsOSApiGlobalsModule(request, response).responseAsIs(forwarderResult.resStatus, forwarderResult.contentType, forwarderResult.data);
    }

  }

  @Get('/charts/:connectionUuid/:type/')
  getMonitorCharts(@Req() request: Request,
                   @Res() response: Response,
                   @Param('connectionUuid') connectionUuid: string,
                   @Param('type') type: 'netdata-credential') {
    logger.info(`[API Monitor] -> getCharts -> connectionUuid [${connectionUuid}], type [${type}]`);

    if (type === 'netdata-credential') return this.forwardRequest('/api/v1/charts', connectionUuid, request, response);
    const chartsDatabase = new AnyOpsOSMonitorModule().getCharts();

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(chartsDatabase);
  }

  @Get('/chart/:connectionUuid/:type/')
  getMonitorChart(@Req() request: Request,
                  @Res() response: Response,
                  @Param('connectionUuid') connectionUuid: string,
                  @Param('type') type: 'netdata-credential',
                  @QueryParam('chart') chart: string) {
    logger.info(`[API Monitor] -> getChart -> connectionUuid [${connectionUuid}], type [${type}], chart [${chart}]`);

    if (type === 'netdata-credential') return this.forwardRequest('/api/v1/chart', connectionUuid, request, response);
    const chartDatabase = new AnyOpsOSMonitorModule().getChart();

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(chartDatabase);
  }

  @Get('/data/:connectionUuid/:type/')
  getMonitorData(@Req() request: Request,
                 @Res() response: Response,
                 @Param('connectionUuid') connectionUuid: string,
                 @Param('type') type: 'netdata-credential',
                 @QueryParam('chart') chart: string) {
    logger.info(`[API Monitor] -> getData -> connectionUuid [${connectionUuid}], type [${type}], chart [${chart}]`);

    if (type === 'netdata-credential') return this.forwardRequest('/api/v1/data', connectionUuid, request, response);
    const chartData = new AnyOpsOSMonitorModule().getChartData();

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(chartData);
  }

  @Get('/alarms/:connectionUuid/:type/')
  getMonitorAlarms(@Req() request: Request,
                   @Res() response: Response,
                   @Param('connectionUuid') connectionUuid: string,
                   @Param('type') type: 'netdata-credential',
                   @QueryParam('type') alarmType: string) {
    logger.info(`[API Monitor] -> getAlarms -> connectionUuid [${connectionUuid}], type [${type}], alarmType [${alarmType}]`);

    if (type === 'netdata-credential') return this.forwardRequest('/api/v1/alarms', connectionUuid, request, response);
    const chartAlarms = new AnyOpsOSMonitorModule().getAlarms();

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(chartAlarms);
  }

  @Get('/alarm_log/:connectionUuid/:type/')
  getMonitorAlarmsLog(@Req() request: Request,
                      @Res() response: Response,
                      @Param('connectionUuid') connectionUuid: string,
                      @Param('type') type: 'netdata-credential') {
    logger.info(`[API Monitor] -> getAlarmsLog -> connectionUuid [${connectionUuid}], type [${type}]`);

    if (type === 'netdata-credential') return this.forwardRequest('/api/v1/alarm_log', connectionUuid, request, response);
    const chartAlarmsLog = new AnyOpsOSMonitorModule().getAlarmsLog();

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(chartAlarmsLog);
  }

  @Get('/badge/:connectionUuid/:type/')
  getMonitorBadge(@Req() request: Request,
                  @Res() response: Response,
                  @Param('connectionUuid') connectionUuid: string,
                  @Param('type') type: 'netdata-credential') {
    logger.info(`[API Monitor] -> getBadge -> connectionUuid [${connectionUuid}], type [${type}]`);

    if (type === 'netdata-credential') return this.forwardRequest('/api/v1/badge.svg', connectionUuid, request, response);
    const chartBadge = new AnyOpsOSMonitorModule().getBadge();

    return new AnyOpsOSApiGlobalsModule(request, response).jsonDataResponse(chartBadge);
  }

  @Get('/badge/:connectionUuid/:type/')
  monitorTestRemoteConnection(@Req() request: Request,
                              @Res() response: Response,
                              @Param('connectionUuid') connectionUuid: string,
                              @Param('type') type: 'netdata-credential') {
    logger.info(`[API Monitor] -> Connect -> connectionUuid [${connectionUuid}], type [${type}]`);

    if (type === 'netdata-credential') return this.forwardRequest('', connectionUuid, request, response);
    const successConnection: boolean = new AnyOpsOSMonitorModule().testRemoteConnection();

    if (successConnection) return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
    return new AnyOpsOSApiGlobalsModule(request, response).invalidResponse('connection_failed');
  }

}

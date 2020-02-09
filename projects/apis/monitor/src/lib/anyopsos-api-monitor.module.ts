import {Controller, Get, Authorized, Req, Res, Param, QueryParam} from 'routing-controllers';
import {SessionParam} from 'routing-controllers/decorator/SessionParam';
import {Request, Response} from 'express';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';
import {AnyOpsOSMonitorModule, MonitorConnectionTypes} from '@anyopsos/module-monitor';
import {ForwarderResponse} from '@anyopsos/module-monitor/src';


const logger: Logger = getLogger('mainLog');

@Authorized()
@Controller('/api/monitor')
export class AnyOpsOSMonitorApiController {

  @Get('/charts/:workspaceUuid/:connectionUuid/:type/')
  async getMonitorCharts(@Req() request: Request,
                         @Res() response: Response,
                         @SessionParam('userUuid') userUuid: string,
                         @SessionParam('id') sessionUuid: string,
                         @Param('workspaceUuid') workspaceUuid: string,
                         @Param('connectionUuid') connectionUuid: string,
                         @Param('type') type: MonitorConnectionTypes) {
    logger.info(`[API Monitor] -> getCharts -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}]`);

    const MonitorModule: AnyOpsOSMonitorModule = new AnyOpsOSMonitorModule(userUuid, sessionUuid, workspaceUuid, connectionUuid, request);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const chartsDatabase: ForwarderResponse = await MonitorModule.getCharts();

    return ApiGlobalsModule.responseAsIs(chartsDatabase.resStatus, chartsDatabase.contentType, chartsDatabase.data);
  }

  @Get('/chart/:workspaceUuid/:connectionUuid/:type/')
  async getMonitorChart(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @Param('workspaceUuid') workspaceUuid: string,
                        @Param('connectionUuid') connectionUuid: string,
                        @Param('type') type: MonitorConnectionTypes,
                        @QueryParam('chart') chart: string) {
    logger.info(`[API Monitor] -> getChart -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}], chart [${chart}]`);

    const MonitorModule: AnyOpsOSMonitorModule = new AnyOpsOSMonitorModule(userUuid, sessionUuid, workspaceUuid, connectionUuid, request);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const chartDatabase: ForwarderResponse = await MonitorModule.getChart();

    return ApiGlobalsModule.responseAsIs(chartDatabase.resStatus, chartDatabase.contentType, chartDatabase.data);
  }

  @Get('/data/:workspaceUuid/:connectionUuid/:type/')
  async getMonitorData(@Req() request: Request,
                       @Res() response: Response,
                       @SessionParam('userUuid') userUuid: string,
                       @SessionParam('id') sessionUuid: string,
                       @Param('workspaceUuid') workspaceUuid: string,
                       @Param('connectionUuid') connectionUuid: string,
                       @Param('type') type: MonitorConnectionTypes,
                       @QueryParam('chart') chart: string) {
    logger.info(`[API Monitor] -> getData -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}], chart [${chart}]`);

    const MonitorModule: AnyOpsOSMonitorModule = new AnyOpsOSMonitorModule(userUuid, sessionUuid, workspaceUuid, connectionUuid, request);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const chartData: ForwarderResponse = await MonitorModule.getChartData();

    return ApiGlobalsModule.responseAsIs(chartData.resStatus, chartData.contentType, chartData.data);
  }

  @Get('/alarms/:workspaceUuid/:connectionUuid/:type/')
  async getMonitorAlarms(@Req() request: Request,
                         @Res() response: Response,
                         @SessionParam('userUuid') userUuid: string,
                         @SessionParam('id') sessionUuid: string,
                         @Param('workspaceUuid') workspaceUuid: string,
                         @Param('connectionUuid') connectionUuid: string,
                         @Param('type') type: MonitorConnectionTypes,
                         @QueryParam('type') alarmType: string) {
    logger.info(`[API Monitor] -> getAlarms -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}], alarmType [${alarmType}]`);

    const MonitorModule: AnyOpsOSMonitorModule = new AnyOpsOSMonitorModule(userUuid, sessionUuid, workspaceUuid, connectionUuid, request);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const chartAlarms: ForwarderResponse = await MonitorModule.getAlarms();

    return ApiGlobalsModule.responseAsIs(chartAlarms.resStatus, chartAlarms.contentType, chartAlarms.data);
  }

  @Get('/alarm_log/:workspaceUuid/:connectionUuid/:type/')
  async getMonitorAlarmsLog(@Req() request: Request,
                            @Res() response: Response,
                            @SessionParam('userUuid') userUuid: string,
                            @SessionParam('id') sessionUuid: string,
                            @Param('workspaceUuid') workspaceUuid: string,
                            @Param('connectionUuid') connectionUuid: string,
                            @Param('type') type: MonitorConnectionTypes) {
    logger.info(`[API Monitor] -> getAlarmsLog -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}]`);

    const MonitorModule: AnyOpsOSMonitorModule = new AnyOpsOSMonitorModule(userUuid, sessionUuid, workspaceUuid, connectionUuid, request);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const chartAlarmsLog: ForwarderResponse = await MonitorModule.getAlarmsLog();

    return ApiGlobalsModule.responseAsIs(chartAlarmsLog.resStatus, chartAlarmsLog.contentType, chartAlarmsLog.data);
  }

  @Get('/badge/:workspaceUuid/:connectionUuid/:type/')
  async getMonitorBadge(@Req() request: Request,
                        @Res() response: Response,
                        @SessionParam('userUuid') userUuid: string,
                        @SessionParam('id') sessionUuid: string,
                        @Param('workspaceUuid') workspaceUuid: string,
                        @Param('connectionUuid') connectionUuid: string,
                        @Param('type') type: MonitorConnectionTypes) {
    logger.info(`[API Monitor] -> getBadge -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}]`);

    const MonitorModule: AnyOpsOSMonitorModule = new AnyOpsOSMonitorModule(userUuid, sessionUuid, workspaceUuid, connectionUuid, request);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const chartBadge: ForwarderResponse = await MonitorModule.getBadge();

    return ApiGlobalsModule.responseAsIs(chartBadge.resStatus, chartBadge.contentType, chartBadge.data);
  }

  @Get('/:workspaceUuid/:connectionUuid/:type/')
  async monitorTestRemoteConnection(@Req() request: Request,
                                    @Res() response: Response,
                                    @SessionParam('userUuid') userUuid: string,
                                    @SessionParam('id') sessionUuid: string,
                                    @Param('workspaceUuid') workspaceUuid: string,
                                    @Param('connectionUuid') connectionUuid: string,
                                    @Param('type') type: MonitorConnectionTypes) {
    logger.info(`[API Monitor] -> Connect -> workspaceUuid [${workspaceUuid}], connectionUuid [${connectionUuid}], type [${type}]`);

    const MonitorModule: AnyOpsOSMonitorModule = new AnyOpsOSMonitorModule(userUuid, sessionUuid, workspaceUuid, connectionUuid, request);
    const ApiGlobalsModule: AnyOpsOSApiGlobalsModule = new AnyOpsOSApiGlobalsModule(request, response);

    const successConnection: boolean = await MonitorModule.createSession();

    if (successConnection) return ApiGlobalsModule.validResponse();
    return ApiGlobalsModule.invalidResponse('connection_failed');
  }

}

import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';
import * as path from "path";
import readConfig from 'read-config';

import {ApiGlobalsModule} from './api-globals';

import {QueryMonitorModule} from '../modules/node/monitor/query';
import {DatabaseMonitorModule} from '../modules/node/monitor/database';

import {HttpForwarderModule} from '../modules/http-forwarder';


const logger = getLogger('mainlog');
const router = Router();

const forwardRequest = (urlSufix, req, res) => {
  const apiGlobals = new ApiGlobalsModule(req, res);
  const httpForwarder = new HttpForwarderModule(req);

  const connections = readConfig(path.join(__dirname, '../../filesystem/etc/applications/monitor/config.json'), {skipUnresolved: true});

  const currentConnection = connections.find((connection) => {
    return connection.uuid === req.params.uuid;
  });

  return httpForwarder.doCall(
    currentConnection.url + urlSufix + (Object.keys(req.query).length ? '?' + Object.keys(req.query).map(k => `${k}=${req.query[k]}`).join('&') : ''),
    currentConnection.credential
  ).then((data) => {

    // Handle 'connect' case
    if (urlSufix === '' && data.resStatus === 200) {
      return apiGlobals.validResponse();

    // Handle normal case
    } else {
      return apiGlobals.responseAsIs(data.resStatus, data.res);
    }

  });
};

/**
 * getCharts
 */
router.get('/charts/:uuid/:type/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getCharts -> connectionUuid [${req.params.uuid}], type [${req.params.type}]`);

  if (req.params.type === 'netdata-credential') return forwardRequest('api/v1/charts', req, res);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const chartsDatabase = new DatabaseMonitorModule().getCharts();

  return apiGlobals.responseJsonData(chartsDatabase);
});

/**
 * getChart
 */
router.get('/chart/:uuid/:type/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getChart -> connectionUuid [${req.params.uuid}], type [${req.params.type}], chart [${req.query.chart}]`);

  if (req.params.type === 'netdata-credential') return forwardRequest('api/v1/chart', req, res);

  const apiGlobals = new ApiGlobalsModule(req, res);

  return apiGlobals.responseJsonData({
    id:  'system.cpu',
    name:  'system.cpu',
    type:  'system',
    family:  'cpu',
    context:  'system.cpu',
    title:  'Total CPU utilization (system.cpu)',
    priority:  100,
    plugin:  'proc.plugin',
    module:  '/proc/stat',
    enabled:  true,
    units:  'percentage',
    data_url:  '/api/monitor/data?chart=system.cpu',
    chart_type:  'stacked',
    duration:  3996,
    first_entry:  1568054279,
    last_entry:  1568058275,
    update_every:  1,
    dimensions:  {
      guest_nice: { name:  'guest_nice' },
      guest: { name:  'guest' },
      steal: { name:  'steal' },
      softirq: { name:  'softirq' },
      irq: { name:  'irq' },
      user: { name:  'user' },
      system: { name:  'system' },
      nice: { name:  'nice' },
      iowait: { name:  'iowait' }
    },
    green:  null,
    red:  null,
    alarms:  {
      '20min_steal_cpu':  {
        id:  1555111267,
        status:  'CLEAR',
        units:  '%',
        update_every:  300
      },
      '10min_cpu_iowait':  {
        id:  1555111266,
        status:  'CLEAR',
        units:  '%',
        update_every:  60
      },
      '10min_cpu_usage':  {
        id:  1555111265,
        status:  'CLEAR',
        units:  '%',
        update_every:  60
      }
    }
  });
});

/**
 * getData
 */
router.get('/data/:uuid/:type/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getData -> connectionUuid [${req.params.uuid}], type [${req.params.type}], chart [${req.query.chart}]`);

  if (req.params.type === 'netdata-credential') return forwardRequest('api/v1/data', req, res);

  if (!req.query.chart) console.log('no chart');

  return new QueryMonitorModule(req, res);
});

/**
 * connect to server
 */
router.get('/connect/:uuid/:type/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> Connect -> connectionUuid [${req.params.uuid}], type [${req.params.type}]`);

  if (req.params.type === 'netdata-credential') return forwardRequest('', req, res);

});
export default router;

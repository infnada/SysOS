import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';

import {ApiGlobalsModule} from './api-globals';

import {QueryMonitorModule} from '../modules/node/monitor/query';
import {DatabaseMonitorModule} from '../modules/node/monitor/database';

const logger = getLogger('mainlog');
const router = Router();

/**
 * getCharts
 */
router.get('/charts/:uuid/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getCharts -> connectionUuid []`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const chartsDatabase = new DatabaseMonitorModule().getCharts();

  return apiGlobals.responseJsonData(chartsDatabase);
});

/**
 * getChart
 */
router.get('/chart/:uuid/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getChart -> connectionUuid [], chart [${req.query.chart}]`);

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
router.get('/data/:uuid/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Monitor] -> getData -> connectionUuid [], chart [${req.query.chart}]`);

  if (!req.query.chart) console.log('no chart');

  return new QueryMonitorModule(req, res);
});
export default router;

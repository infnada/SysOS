import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';

import {ApiGlobalsModule} from './api-globals';
import {KubernetesModule} from '../modules/node/kubernetes';

const logger = getLogger('mainlog');
const router = Router();

/**
 * Get Resource
 */
router.get('/:uuid/:resourceLink(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API Kubernetes] -> Get Resource ->  uuid [${req.params.uuid}] resource [${req.params.resourceLink}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Kubernetes = new KubernetesModule();

  Kubernetes.getResource(req.params.uuid, req.params.resourceLink).then((body) => {
    return apiGlobals.responseJsonData(body);
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

export default router;

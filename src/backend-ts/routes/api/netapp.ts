import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';

import {ApiGlobalsModule} from './api-globals';
import {CredentialsModule} from '../modules/credentials';
import {NetAppModule} from '../modules/netapp';

const logger = getLogger('mainlog');
const router = Router();

/**
 * Call
 */
router.post('/call', (req: express.Request, res: express.Response) => {
  logger.info(`[API NetApp] -> Call ->  host [${req.body.hos}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();
  const NetApp = new NetAppModule();

  const callPath = (req.body.path ? req.body.path : '/servlets/netapp.servlets.admin.XMLrequest_filer');

  // Get username and password from credential
  return Credentials.getCredential(req.body.credential).then((cred) => {
    return NetApp.callApi(req.body.host, req.body.port, cred.username, cred.password, callPath,
      '<?xml version=\'1.0\' encoding=\'utf-8\' ?><!DOCTYPE netapp SYSTEM \'file:/etc/netapp_filer.dtd\'>' + req.body.xml);

  }).then((body) => {

    return apiGlobals.responseJsonData(body);

  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

export default router;

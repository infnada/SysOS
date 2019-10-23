import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';
import * as path from 'path';
import * as url from 'url';
import * as childProcess from 'child_process';

import {ApiGlobalsModule} from './api-globals';
import {CredentialsModule} from '../modules/credentials';
import {VMWareModule} from '../modules/node/vmware';

const logger = getLogger('mainlog');
const router = Router();

/**
 * getClientVersion
 */
router.post('/getClientVersion', (req: express.Request, res: express.Response) => {
  logger.info(`[API VMWare] -> getClientVersion -> host [${req.body.host}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const VMWare = new VMWareModule();

  return VMWare.getClientVersion(req.body.host, req.body.port).then((body) => {

    return apiGlobals.responseJsonData(body);

  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });

});

/**
 * connect
 */
router.post('/connect', (req: express.Request, res: express.Response) => {
  logger.info(`[API VMWare] -> connect -> host [${req.body.host}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();
  const VMWare = new VMWareModule();

  const apiCookie = 'api-session';
  const description = req.body.description;

  // Get username and password from credential
  return Credentials.getCredential(req.session.uuid, req.body.credential).then((cred) => {
    return VMWare.connect(req.body.host, req.body.port, cred.fields.UserName, cred.fields.Password);
  }).then((response) => {

    console.log(response);

    if (response.ok) {

      // Save the vmware-api-session and host to cookies on the client
      if (response.headers.raw()['set-cookie'] && response.headers.raw()['set-cookie'][0].startsWith('vmware-api-session')) {
        res.cookie(apiCookie, response.headers.raw()['set-cookie'][0], {maxAge: 900000, httpOnly: true});
      }

      return apiGlobals.validResponse();
    }

    return apiGlobals.serverError('Error: ' + response.status + ':' + response.statusText);
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });

});

/**
 * connectSoap
 */
router.post('/connectSoap', (req: express.Request, res: express.Response) => {
  logger.info(`[API VMWare] -> connectSoap -> host [${req.body.host}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();
  const VMWare = new VMWareModule();

  const apiCookie = 'api-session-soap';
  const description = req.body.description;

  // Get username and password from credential
  return Credentials.getCredential(req.session.uuid, req.body.credential).then((cred) => {
    return VMWare.connectSoap(req.body.host, req.body.port, cred.fields.UserName, cred.fields.Password);
  }).then((response) => {

    if (response.ok) {

      // Save the vmware-api-session and host to cookies on the client
      console.log(response.headers['set-cookie']);
      if (response.headers.raw()['set-cookie'] && response.headers.raw()['set-cookie'][0].startsWith('vmware_soap_session')) {
        res.cookie(apiCookie, response.headers.raw()['set-cookie'][0], {maxAge: 900000, httpOnly: true});
      }

      return apiGlobals.validResponse();
    }

    return apiGlobals.serverError('Error: ' + response.status + ':' + response.statusText);
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });

});

/**
 * call
 */
router.post('/call', (req: express.Request, res: express.Response) => {
  logger.info(`[API VMWare] -> call -> host [${req.body.host}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const VMWare = new VMWareModule();

  const apiCookie = 'api-session';

  if (!req.cookies[apiCookie]) return apiGlobals.serverError('no_vmware_login_cookie');

  return VMWare.callApi(req.body.host, req.body.port, req.body.path, req.cookies[apiCookie]).then((body) => {

    return apiGlobals.responseJsonData(JSON.parse(body));

  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });

});

/**
 * callSoap
 */
router.post('/callSoap', (req: express.Request, res: express.Response) => {
  logger.info(`[API VMWare] -> callSoap -> host [${req.body.host}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const VMWare = new VMWareModule();

  const apiCookie = 'api-session-soap';

  if (!req.cookies[apiCookie]) return apiGlobals.serverError('no_vmware_login_cookie');

  return VMWare.callApiSoap(req.body.host, req.body.port, req.body.action, req.body.xml, req.cookies[apiCookie]).then((body) => {

    return apiGlobals.responseJsonData(body);

  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });

});

/**
 * upload-to-datastore
 */
router.post('/upload-to-datastore', (req: express.Request, res: express.Response) => {
  logger.info(`[API VMWare] -> upload-to-datastore -> url [${req.body.url}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();

  let curl;
  const fileUrl = url.parse(req.body.url).href;
  const UPLOAD_DIR = path.join(__dirname, '../../../filesystem/' + req.body.path);

  if (req.body.credential && req.body.credential.length !== 0) {
    Credentials.getCredential(req.session.uuid, req.body.credential).then((cred) => {
      curl = childProcess.spawn('curl', ['-k', '-X', 'PUT', '--user', cred.fields.UserName + ':' + cred.fields.Password, fileUrl, '-T', UPLOAD_DIR]);
    });
  } else {
    curl = childProcess.spawn('curl', ['-k', '-X', 'PUT', fileUrl, '-T', UPLOAD_DIR]);
  }

  curl.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  curl.on('close', (e) => {
    console.log('Curl closed: ' + e);
  });

  curl.on('exit', (code) => {
    if (code !== 0) {
      console.log('Failed: ' + code);
      return apiGlobals.serverError(code);
    }
    return apiGlobals.validResponse();
  });

});

export default router;

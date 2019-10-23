import {Router} from 'express';
import {v4 as uuidv4} from 'uuid';
import {getLogger} from 'log4js';
import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import readConfig from 'read-config';

import {ApiGlobalsModule} from './api-globals';
import {CredentialsModule} from "../modules/credentials";

const logger = getLogger('mainlog');
const router = Router();

/**
 * Get credentials
 */
router.get('/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Credentials] -> Get credentials`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();

  return Credentials.getCredentials(req.session.uuid).then((credentials) => {
    return apiGlobals.responseJsonData(credentials);
  });
});

/**
 * Save credentials
 */
router.put('/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Credentials] -> Save credentials`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();

  const credential = req.body.credential;

  if (typeof credential === 'undefined') return apiGlobals.serverError('credential_undefined');

  /**
   * Save or Edit in config file by uuid
   */

  // Create new uuid (is new entry)
  if (!credential.hasOwnProperty('uuid')) {
    credential.uuid = uuidv4();

    return Credentials.newCredential(req.session.uuid, credential).then(() => {
      return apiGlobals.responseJsonData(credential.uuid);
    });
  }

  // Edit credential
  return Credentials.editCredential(req.session.uuid, credential).then(() => {
    return apiGlobals.responseJsonData(credential.uuid);
  });
});

/**
 * Delete credential
 */
router.delete('/:uuid', (req: express.Request, res: express.Response) => {
  logger.info(`[API Credentials] -> Delete credentials -> uuid [${req.params.uuid}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();

  return Credentials.deleteCredential(req.session.uuid, req.params.uuid).then(() => {
    return apiGlobals.responseJsonData(req.params.uuid);
  });
});

/**
 * Login
 */
router.post('/login', (req: express.Request & { session: session.Store }, res: express.Response) => {
  logger.info(`[API Credentials] -> Login -> user [${req.body.username}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();

  // TODO: validate/sanitize inputs
  const username = req.body.username;
  const password = req.body.password;

  if (typeof username === 'undefined') return apiGlobals.serverError('username_undefined');
  if (typeof password === 'undefined') return apiGlobals.serverError('password_undefined');

  const config = readConfig(path.join(__dirname, '../../filesystem/etc/expressjs/config.json'));
  const users = readConfig(path.join(__dirname, '../../filesystem/etc/shadow.json'));
  const user = users.find((obj) => {
    return obj.username === username;
  });

  if (!user) return apiGlobals.serverError('invalid_username');

  return Credentials.loadCredentialDb(user.uuid, password, user.kdbxPath).then((successLoad) => {
    if (!successLoad) return apiGlobals.serverError('Invalid login credentials');

    req.session.uuid = user.uuid;

    res.cookie(config.uniqueCookie, user.uuid, {maxAge: 900000, signed: true});
    return apiGlobals.validResponse();
  });
});

export default router;

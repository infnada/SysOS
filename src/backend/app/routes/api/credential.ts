import {Router} from 'express';
import {v4 as uuidv4} from 'uuid';
import {getLogger} from 'log4js';
import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import readConfig from 'read-config';
import jsonfile from 'jsonfile';

import {ApiGlobalsModule} from './api-globals';

const logger = getLogger('mainlog');
const router = Router();

/**
 * Get credentials
 */
router.get('/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Credentials] -> Get credentials`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  let fileData = readConfig(path.join(__dirname, '../../filesystem/root/credentials.json'), {skipUnresolved: true});

  fileData = fileData.filter((props) => {
    delete props.password;
    return true;
  });

  return apiGlobals.responseJsonData(fileData);
});

/**
 * Save credentials
 */
router.put('/', (req: express.Request, res: express.Response) => {
  logger.info(`[API Credentials] -> Save credentials -> fullSave [${req.body.fullSave}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const credential = req.body.credential;
  const fullSave = req.body.fullSave;

  if (typeof credential === 'undefined') return apiGlobals.serverError('credential_undefined');

  /**
   * Rewrite all config file with received data
   */
  if (fullSave) {
    return jsonfile.writeFile(path.join(__dirname, '../../filesystem/root/credentials.json'), credential, {flag: 'w'}, (e) => {
      if (e && e.code) return apiGlobals.serverError(e.code);
      if (e) return apiGlobals.serverError(e);

      logger.info(`[API Credentials] -> Save credentials -> fullSave [${req.body.fullSave}] -> Credential saved`);

      return apiGlobals.validResponse();
    });
  }

  /**
   * Save or Edit in config file by uuid
   */
  const config = readConfig(path.join(__dirname, '../../filesystem/root/credentials.json'), {skipUnresolved: true});

  // Create new uuid (is new entry)
  if (!credential.hasOwnProperty('uuid')) {
    credential.uuid = uuidv4();
    config.push(credential);

    return jsonfile.writeFile(path.join(__dirname, '../../filesystem/root/credentials.json'), config, {flag: 'w'}, (err) => {
      if (err && err.code) return apiGlobals.serverError(err.code);
      if (err) return apiGlobals.serverError(err);

      logger.info(`[API Credentials] -> Save credentials -> fullSave [${req.body.fullSave}] -> New credential saved \
      with uuid [${credential.uuid}]`);

      return apiGlobals.responseJsonData(credential.uuid);
    });
  }

  // Edit or New with uuid created by client
  const objIndex = config.findIndex((obj) => {
    return obj.uuid === credential.uuid;
  });

  if (objIndex !== -1) {

    // Edit
    config[objIndex] = credential;
  } else {

    // New
    config.push(credential);
  }

  return jsonfile.writeFile(path.join(__dirname, '../../filesystem/root/credentials.json'), config, {flag: 'w'}, (e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    logger.info(`[API Credentials] -> Save credentials -> fullSave [${req.body.fullSave}] -> Credential saved \
    with uuid [${credential.uuid}]`);

    return apiGlobals.responseJsonData(credential.uuid);
  });
});

/**
 * Delete credential
 */
router.delete('/:uuid', (req: express.Request, res: express.Response) => {
  logger.info(`[API Credentials] -> Delete credentials -> uuid [${req.params.uuid}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  let fileData = readConfig(path.join(__dirname, '../../filesystem/root/credentials.json'), {skipUnresolved: true});

  fileData = fileData.filter((obj) => {
    return obj.uuid !== req.params.uuid;
  });

  return jsonfile.writeFile(path.join(__dirname, '../../filesystem/root/credentials.json'), fileData, {flag: 'w'}, (e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    return apiGlobals.responseJsonData(req.params.uuid);
  });
});

/**
 * Login
 */
router.post('/login', (req: express.Request & { session: session.Store }, res: express.Response) => {
  logger.info(`[API Credentials] -> Login -> user [${req.body.username}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const user = req.body.username;
  const password = req.body.password;

  if (typeof user === 'undefined') return apiGlobals.serverError('username_undefined');
  if (typeof password === 'undefined') return apiGlobals.serverError('password_undefined');

  const config = readConfig(path.join(__dirname, '../../filesystem/etc/expressjs/config.json'));
  let users = readConfig(path.join(__dirname, '../../filesystem/etc/shadow.json'));

  users = users.filter((obj) => {
    return obj.user === user && obj.password === password;
  });

  if (users.length === 0) return apiGlobals.serverError('Invalid login credentials');

  req.session.uuid = users[0].uuid;

  res.cookie(config.uniqueCookie, users[0].uuid, {maxAge: 900000, signed: true});
  return apiGlobals.validResponse();
});

export default router;

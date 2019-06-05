import {Router} from 'express';
import express from 'express';
import {ApiGlobalsModule} from './api-globals';
import path from 'path';
import readConfig from 'read-config';
import jsonfile from 'jsonfile';
import uuid from 'uuid';
import * as session from 'express-session';

const router = Router();

/**
 * Get credentials
 */
router.get('/', (req: express.Request, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  let fileData = readConfig(path.join(__dirname, '../../filesystem/root/credentials.json'), {skipUnresolved: true});
  fileData = fileData.saved_credentials.filter((props) => {
    delete props.password;
    return true;
  });

  return apiGlobals.responseJsonData(fileData);
});

/**
 * Save credentials
 */
router.put('/', (req: express.Request, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  const data = req.body.data;
  const fullSave = req.body.fullSave;

  if (typeof data === 'undefined') return apiGlobals.serverError('data_undefined');

  /**
   * Rewrite all config file with received data
   */
  if (fullSave) {
    return jsonfile.writeFile(path.join(__dirname, '../../filesystem/root/credentials.json'), data, {flag: 'w'}, (e) => {
      if (e && e.code) return apiGlobals.serverError(e.code);
      if (e) return apiGlobals.serverError(e);

      return apiGlobals.validResponse();
    });
  }

  /**
   * Save or Edit in config file by uuid
   */
  const config = readConfig(path.join(__dirname, '../../filesystem/root/credentials.json'), {skipUnresolved: true});

  // Create new uuid (is new entry)
  if (!data.hasOwnProperty('uuid')) {

    return uuid((e, id) => {
      if (e && e.code) return apiGlobals.serverError(e.code);
      if (e) return apiGlobals.serverError(e);

      data.uuid = id;
      config.push(data);

      return jsonfile.writeFile(path.join(__dirname, '../../filesystem/root/credentials.json'), config, {flag: 'w'}, (err) => {
        if (err && err.code) return apiGlobals.serverError(err.code);
        if (err) return apiGlobals.serverError(err);

        return apiGlobals.responseJsonData(id);
      });

    });

  }

  // Edit or New with uuid created by client
  const objIndex = config.findIndex((obj) => {
    return obj.uuid === data.uuid;
  });

  if (objIndex !== -1) {

    // Edit
    config[objIndex] = data;
  } else {

    // New
    config.push(data);
  }

  return jsonfile.writeFile(path.join(__dirname, '../../filesystem/root/credentials.json'), config, {flag: 'w'}, (e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    return apiGlobals.responseJsonData(data.uuid);
  });
});

/**
 * Delete credential
 */
router.delete('/:uuid', (req: express.Request, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  let fileData = readConfig(path.join(__dirname, '../../filesystem/root/credentials.json'), {skipUnresolved: true});

  fileData = fileData.saved_credentials.filter((obj) => {
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

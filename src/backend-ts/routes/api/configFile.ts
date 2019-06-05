import {Router} from 'express';
import express from 'express';
import {ApiGlobalsModule} from './api-globals';
import path from 'path';
import readConfig from 'read-config';
import jsonfile from 'jsonfile';
import uuid from 'uuid';

const router = Router();

/**
 * Get config file
 */
router.get(':fileName(*)', (req: express.Request, res: express.Response) => {
  const fileData = readConfig(path.join(__dirname, '../../filesystem/etc/' + req.params.fileName), {skipUnresolved: true});
  res.json(fileData);
});

/**
 * Save config file
 */
router.put(':fileName(*)', (req: express.Request, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  const data = req.body.data;
  const fullSave = req.body.fullSave;

  if (typeof data === 'undefined') return apiGlobals.serverError('data_undefined');

  /**
   * Rewrite all config file with received data
   */
  if (fullSave) {
    return jsonfile.writeFile(path.join(__dirname, '../../filesystem/etc/' + req.params.fileName), data, {flag: 'w'}, (e) => {
      if (e && e.code) return apiGlobals.serverError(e.code);
      if (e) return apiGlobals.serverError(e);

      return apiGlobals.validResponse();

    });
  }

  /**
   * Save or Edit in config file by uuid
   */
  const config = readConfig(path.join(__dirname, '../../filesystem/etc/' + req.params.fileName), {skipUnresolved: true});

  // Create new uuid (is new entry)
  if (!data.hasOwnProperty('uuid')) {

    return uuid((e, id) => {
      if (e && e.code) return apiGlobals.serverError(e.code);
      if (e) return apiGlobals.serverError(e);

      data.uuid = id;
      config.push(data);

      return jsonfile.writeFile(path.join(__dirname, '../../filesystem/etc/' + req.params.fileName), config, {flag: 'w'}, (err) => {
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

  return jsonfile.writeFile(path.join(__dirname, '../../filesystem/etc/' + req.params.fileName), config, {flag: 'w'}, (e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    return apiGlobals.responseJsonData(data.uuid);
  });
});

/**
 * Delete config file
 */
router.delete('/:uuid/:fileName(*)', (req: express.Request, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  let fileData = readConfig(path.join(__dirname, '../../filesystem/etc/' + req.params.fileName), {skipUnresolved: true});

  fileData = fileData.filter((obj) => {
    return obj.uuid !== req.params.uuid;
  });

  return jsonfile.writeFile(path.join(__dirname, '../../filesystem/etc/' + req.params.fileName), fileData, {flag: 'w'}, (e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    return apiGlobals.validResponse();
  });
});

export default router;

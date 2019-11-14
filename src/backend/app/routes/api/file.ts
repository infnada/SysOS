import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';
import * as path from 'path';
import * as url from 'url';
import * as childProcess from 'child_process';
import multiparty from 'connect-multiparty';
import fs from 'fs-extra';

import {ConnectFiles} from '../../interfaces/connect-file';
import {ApiGlobalsModule} from './api-globals';
import {CredentialsModule} from '../modules/credentials';

const logger = getLogger('mainlog');
const multipartyMiddleware = multiparty();
const router = Router();


/**
 * Get file
 */
router.get('/:fileName(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API File] -> Get file -> file [${req.params.fileName}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const options = {
    root: path.join(__dirname, '../../filesystem'),
    dotfiles: 'allow',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile(req.params.fileName, options, (e: any) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);
  });
});

/**
 * New file
 */
router.post('/:type', multipartyMiddleware, (req: express.Request  & { files: ConnectFiles }, res: express.Response) => {
  logger.info(`[API File] -> Creating file -> type [${req.params.type}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const Credentials = new CredentialsModule();

  /**
   * Upload file
   * req.body.path is required
   */
  if (req.params.type === 'upload') {
    if (typeof req.body.path === 'undefined') return apiGlobals.serverError('path_undefined');

    logger.info(`[API File] -> Creating file -> Uploading file -> file [${req.body.path}]`);

    const createDirIfNotExists = (dir) => {
      const dirName = path.dirname(dir);
      if (fs.existsSync(dirName)) return true;

      createDirIfNotExists(dirName);

      logger.info(`[API File] -> Creating file -> Creating folder -> folder [${dirName}]`);

      fs.mkdirSync(dirName);
    };

    fs.readFile(req.files.file.path, (e, data) => {
      const file: any = {};

      if (e && e.code) return apiGlobals.serverError(e.code);
      if (e) return apiGlobals.serverError(e);

      file.name = (typeof req.body.path === 'undefined' ? req.files.file.name : req.body.path);
      file.path = path.join(__dirname, '../../filesystem') + file.name;

      // Create dir if not exists
      createDirIfNotExists(file.path);

      // copy the data from the req.files.file.path and paste it to file.path
      fs.writeFile(file.path, data).then(() => {
        logger.info(`[API File] -> Creating file -> Upload complete -> ${req.files.file.name} was saved to ${file.path}`);

        return apiGlobals.validResponse();
      }).catch((err) => {
        if (err && err.code) return apiGlobals.serverError(err.code);
        if (err) return apiGlobals.serverError(err);
      });
    });
  }

  /**
   * Download file from url to anyOpsOS
   * req.body.path is required
   * req.body.url is required
   * req.body.credential is optional
   */
  if (req.params.type === 'download_from_url') {
    if (typeof req.body.url === 'undefined') return apiGlobals.serverError('url_undefined');
    if (typeof req.body.path === 'undefined') return apiGlobals.serverError('path_undefined');

    logger.info(`[API File] -> Creating file -> Downloading file from internet -> path [${req.body.path}], url [${req.body.url}]`);

    let curl;
    const fileUrl = url.parse(req.body.url).href;
    const fileName = url.parse(fileUrl).pathname.split('/').pop();
    const DOWNLOAD_DIR = path.join(__dirname, '../../filesystem/' + req.body.path);

    if (req.body.credential && req.body.credential.length !== 0) {
      Credentials.getCredential(req.session.uuid, req.body.credential).then((cred) => {
        curl = childProcess.spawn('curl', ['-k', '--user', cred.fields.UserName + ':' + cred.fields.Password.getText(), fileUrl]);
      }).catch((e) => {
        if (e && e.code) return apiGlobals.serverError(e.code);
        if (e) return apiGlobals.serverError(e);
      });
    } else {
      curl = childProcess.spawn('curl', ['-k', fileUrl]);
    }

    const file = fs.createWriteStream(DOWNLOAD_DIR + fileName);

    curl.stdout.on('data', (data) => {
      file.write(data);
    });
    curl.stdout.on('end', () => {
      file.end();
    });
    curl.on('exit', (code) => {
      if (code !== 0) {
        logger.error(`[API File] -> Creating file -> Downloading file from internet -> curlError -> ${code}`);
        return apiGlobals.serverError(code);
      }

      logger.info(`[API File] -> Creating file -> Downloading file from internet -> Upload complete \
                  -> ${fileName} was saved to ${req.body.path}`);
      return apiGlobals.validResponse();
    });
  }
});

/**
 * Rename/Move/Copy file
 * req.body.dst is required
 */
router.patch('/:type/:fileName(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API File] -> Rename/Move/Copy file -> type [${req.params.type}], file [${req.params.fileName}], dst [${req.body.dst}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  if (typeof req.body.dst === 'undefined') return apiGlobals.serverError('dst_undefined');

  const oldDirname = path.join(__dirname, '../../filesystem/') + req.params.fileName;
  const newDirname = path.join(__dirname, '../../filesystem') + req.body.dst;

  let currentPrmise;

  if (req.params.type === 'copy') currentPrmise = fs.copy(oldDirname, newDirname);
  if (req.params.type === 'move') currentPrmise = fs.rename(oldDirname, newDirname);
  if (req.params.type === 'rename') currentPrmise = fs.rename(oldDirname, newDirname);

  Promise.resolve(currentPrmise).then(() => {
    return apiGlobals.validResponse();
  }).catch((err) => {
    if (err && err.code) return apiGlobals.serverError(err.code);
    if (err) return apiGlobals.serverError(err);
  });


});

/**
 * Delete file
 */
router.delete('/:fileName(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API File] -> Delete file -> file [${req.params.fileName}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const dirName = path.join(__dirname, '../../filesystem') + req.params.fileName;

  fs.remove(dirName).then(() => {
    return apiGlobals.validResponse();
  }).catch((err) => {
    if (err && err.code) return apiGlobals.serverError(err.code);
    if (err) return apiGlobals.serverError(err);
  });
});

export default router;

import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';
import * as path from 'path';
import * as url from 'url';

import {ApiGlobalsModule} from './api-globals';
import {ConnectFiles} from '../../interfaces/connect-file';
import {GlobalsModule} from '../modules/globals';
import {SshSessionsModule} from '../../socket/modules/ssh/ssh-sessions';

const logger = getLogger('mainlog');
const router = Router();
const sshSessions: SshSessionsModule = new SshSessionsModule();

/**
 * Download file from url to Server
 * req.body.path is required
 * req.body.url is required
 * req.body.credential is optional
 */
router.post('/:uuid', (req: express.Request  & { files: ConnectFiles }, res: express.Response) => {
  logger.info(`[API RemoteFile] -> Creating file -> uuid [${req.params.uuid}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  if (typeof req.body.url === 'undefined') return apiGlobals.serverError('url_undefined');
  if (typeof req.body.path === 'undefined') return apiGlobals.serverError('path_undefined');

  logger.info(`[API Remote File] -> Creating file -> Downloading file from internet -> uuid [${req.params.uuid}], \
  path [${req.body.path}], url [${req.body.url}]`);

  const sshSession = sshSessions.getSession('sftp', req.params.uuid);
  const Globals: GlobalsModule = new GlobalsModule(sshSession);

  const fileUrl = url.parse(req.body.url).href;
  const fileName = url.parse(fileUrl).pathname.split('/').pop();
  const DOWNLOAD_DIR = req.body.path;

  return Globals.execAsync(`curl -k -o ${DOWNLOAD_DIR + fileName} ${fileUrl}`).then(() => {
    return apiGlobals.validResponse();
  }).catch((e) => {
    return apiGlobals.serverError(e);
  });
});

/**
 * Rename/Move/Copy/Chmod file
 * req.body.dst or req.body.permissions is required
 */
router.patch('/:uuid/:type/:fileName(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API RemoteFile] -> Rename/Move/Copy file -> uuid [${req.params.uuid}], type [${req.params.type}], \
  file [${req.params.fileName}], dst [${req.body.dst}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  if (typeof req.body.dst === 'undefined' && typeof req.body.permissions === 'undefined') {
    return apiGlobals.serverError('dst_or_permissions_undefined');
  }

  const sshSession = sshSessions.getSession('sftp', req.params.uuid);
  const Globals: GlobalsModule = new GlobalsModule(sshSession);
  let currentPromise;

  if (req.params.type === 'copy') currentPromise = Globals.execAsync(`cp -r ${req.params.fileName} ${req.body.dst}`);
  if (req.params.type === 'move') {
    currentPromise = Promise.resolve(sshSession.sftpSession.rename(req.params.fileName, req.body.dst, (e) => { if (e) throw e; }));
  }
  if (req.params.type === 'rename') {
    currentPromise = Promise.resolve(sshSession.sftpSession.rename(req.params.fileName, req.body.dst, (e) => { if (e) throw e; }));
  }
  if (req.params.type === 'chmod') {
    currentPromise = Promise.resolve(sshSession.sftpSession.chmod(req.params.fileName, req.body.permissions, (e) => { if (e) throw e; }));
  }

  currentPromise.then(() => {
    return apiGlobals.validResponse();
  }).catch((e) => {
    return apiGlobals.serverError(e);
  });

});

/**
 * Delete file
 */
router.delete('/:uuid/:fileName(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API RemoteFile] -> Delete file -> uuid [${req.params.uuid}], file [${req.params.fileName}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const sshSession = sshSessions.getSession('sftp', req.params.uuid);

  sshSession.sftpSession.stat(req.params.fileName, (e, stats) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    if (stats.isDirectory()) {

      sshSession.sftpSession.rmdir(req.params.fileName, (err) => {
        if (err && err.code) return apiGlobals.serverError(err.code);
        if (err) return apiGlobals.serverError(err);

        return apiGlobals.validResponse();
      });

    } else {

      sshSession.sftpSession.unlink(req.params.fileName, (err) => {
        if (err && err.code) return apiGlobals.serverError(err.code);
        if (err) return apiGlobals.serverError(err);

        return apiGlobals.validResponse();
      });

    }
  });

});

export default router;

import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';

import {ApiGlobalsModule} from './api-globals';
import {SshSessionsModule} from '../../socket/modules/ssh/ssh-sessions';

const logger = getLogger('mainlog');
const router = Router();
const sshSessions: SshSessionsModule = new SshSessionsModule();

/**
 * Get folder contents
 */
router.get('/:uuid/:folderName(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API RemoteFolder] -> Get contents -> uuid [${req.params.uuid}], folderName [${req.params.folderName}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const sshSession = sshSessions.getSession('sftp', req.params.uuid);

  sshSession.sftpSession.readdir(req.params.folderName, (e, data) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    return apiGlobals.responseJsonData(data);
  });
});

/**
 * Create folder
 */
router.post('/:uuid/:folderName(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API RemoteFolder] -> Creating folder ->  uuid [${req.params.uuid}], folder [${req.params.folderName}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);
  const sshSession = sshSessions.getSession('sftp', req.params.uuid);

  sshSession.sftpSession.mkdir(req.params.folderName, (e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    if (e) return apiGlobals.serverError(e);

    return apiGlobals.validResponse();
  });
});

export default router;

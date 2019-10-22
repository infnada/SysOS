import {Router} from 'express';
import {getLogger} from 'log4js';
import * as express from 'express';
import * as path from 'path';
import * as childProcess from 'child_process';
import fs from 'fs-extra';

import {ApiGlobalsModule} from './api-globals';

const logger = getLogger('mainlog');
const router = Router();

/**
 * Get folder contents
 */
router.get('/:folderName(*)', (req: express.Request, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  const execute = (command: string): Promise<string> => {
    logger.info(`[API Folder] -> Executing command -> command [${command}]`);
    return new Promise((resolve, reject) => {
      childProcess.exec(command, (error: Error, stdout: string, stderr: string): void => {
        if (error) return reject(error);
        if (stderr) return reject(stderr);
        return resolve(stdout);
      });
    });
  };

  execute(`ls -lah "${path.join(__dirname, '../../filesystem/') + req.params.folderName}"`).then(data => {
    const files = [];

    const longnames = data.split('\n');
    longnames.splice(0, 3);
    longnames.pop();

    longnames.forEach((longname) => {

      // Split one or more spaces
      const filename = longname.split(/ +/);
      const filesize = filename[4];

      filename.splice(0, 8);

      files.push({
        filename: filename.join(' '),
        longname,
        attrs: {
          size: filesize
        }
      });
    });

    return apiGlobals.responseJsonData(files);
  });
});

/**
 * Create folder
 */
router.post('/:folderName(*)', (req: express.Request, res: express.Response) => {
  logger.info(`[API Folder] -> Creating folder -> folder [${req.params.folderName}]`);

  const apiGlobals = new ApiGlobalsModule(req, res);

  const dirname = path.join(__dirname, '../../filesystem') + req.params.folderName;

  fs.mkdir(dirname).then(() => {
    return apiGlobals.validResponse();
  }).catch((e) => {
    if (e && e.code) return apiGlobals.serverError(e.code);
    return apiGlobals.serverError(e);
  });
});

export default router;

import {Router} from 'express';
import express from 'express';
import {ApiGlobalsModule} from './api-globals';
import multiparty from 'connect-multiparty';
import fs from 'fs-extra';
import path from 'path';
import readConfig from 'read-config';
import url from 'url';
import childProcess from 'child_process';
import {ConnectFiles} from '../../interfaces/connect-file';

const multipartyMiddleware = multiparty();
const router = Router();


/**
 * Get file
 */
router.get(':fileName(*)', (req: express.Request, res: express.Response) => {
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
router.post(':type', multipartyMiddleware, (req: express.Request  & { files: ConnectFiles }, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  /**
   * Upload file
   * req.body.path is required
   */
  if (req.params.type === 'upload') {
    if (typeof req.body.path === 'undefined') return apiGlobals.serverError('path_undefined');

    const createDirIfNotExists = (dir) => {
      const dirName = path.dirname(dir);
      if (fs.existsSync(dirName)) {
        return true;
      }
      createDirIfNotExists(dirName);
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
      fs.writeFile(file.path, data, (err) => {
        if (err && err.code) return apiGlobals.serverError(err.code);
        if (err) return apiGlobals.serverError(err);

        apiGlobals.validResponse();
        console.log('The file: ' + req.files.file.name + ' was saved to ' + file.path);
      });
    });
  }

  /**
   * Download file from url to SysOS
   * req.body.path is required
   * req.body.url is required
   * req.body.credential is optional
   */
  if (req.params.type === 'download_from_url') {
    if (typeof req.body.url === 'undefined') return apiGlobals.serverError('url_undefined');
    if (typeof req.body.path === 'undefined') return apiGlobals.serverError('path_undefined');

    let curl;
    const fileUrl = url.parse(req.body.url).href;
    const fileName = url.parse(fileUrl).pathname.split('/').pop();
    const DOWNLOAD_DIR = path.join(__dirname, '../../filesystem/' + req.body.path);

    if (req.body.credential && req.body.credential.length !== 0) {
      const credentials = readConfig(path.join(__dirname, '../../../filesystem/root/credentials.json'));

      const credential = credentials.saved_credentials.filter((obj) =>  {
        return obj.uuid === req.body.credentialial;
      })[0];

      curl = childProcess.spawn('curl', ['-k', '--user', credential.username + ':' + credential.password, fileUrl]);
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
        console.log('Failed: ' + code);
        return apiGlobals.serverError(code);
      }
      return apiGlobals.validResponse();
    });
  }
});

/**
 * Rename/Move/Copy file
 * req.body.dst is required
 */
router.patch('/:type/:fileName(*)', (req: express.Request, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  if (typeof req.body.dst === 'undefined') return apiGlobals.serverError('dst_undefined');

  const oldDirname = path.join(__dirname, '../../filesystem') + req.params.fileName;
  const newDirname = path.join(__dirname, '../../filesystem') + req.body.dst;

  if (req.params.type === 'copy') fs.copySync(oldDirname, newDirname);
  if (req.params.type === 'move') fs.renameSync(oldDirname, newDirname);
  if (req.params.type === 'rename') fs.renameSync(oldDirname, newDirname);

  apiGlobals.validResponse();
});

/**
 * Delete file
 */
router.delete(':fileName(*)', (req: express.Request, res: express.Response) => {
  const apiGlobals = new ApiGlobalsModule(req, res);

  const dirName = path.join(__dirname, '../../filesystem') + req.params.fileName;
  fs.removeSync(dirName);

  apiGlobals.validResponse();
});


export default router;

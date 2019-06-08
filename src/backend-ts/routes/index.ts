import {getLogger} from 'log4js';
import * as path from 'path';
import * as express from 'express';
import readConfig from 'read-config';

import {ApiGlobalsModule} from './api/api-globals';

import file from './api/file';
import remoteFile from './api/remote-file';
import configFile from './api/config-file';
import folder from './api/folder';
import remoteFolder from './api/remote-folder';
import credential from './api/credential';

const config = readConfig(path.join(__dirname, '../filesystem/etc/expressjs/config.json'));
const logger = getLogger('mainlog');

export class RoutesModule {

  constructor(private app,
              private io: any) {
  }

  init(): void {
    this.securityMiddleware();
    this.setRoutes();
    this.errorRouteHandler();
  }

  securityMiddleware(): void {
    this.app.use((req: express.Request & { io: any }, res: express.Response, next: express.NextFunction) => {
      const apiGlobals = new ApiGlobalsModule(req, res);

      // List of urls that login is not needed.
      const regexList = [
        /^\/$/,
        /^\/api\/credential\/login$/i
      ];

      const isMatch = regexList.some((rx) => {
        return rx.test(req.url);
      });

      // User is able to get this page with or without logged_in
      if (isMatch) {
        // if (req.url !== "/" && req.session.logged_in == true) return pokerGlobals.responseNoValid("already_logged_in");
        req.io = this.io;

        /**
         * Do not make any other check
         */
        return next();
      }

      // No legged_in or deleted uniqueId cookie
      if (!req.signedCookies[config.uniqueCookie]) {
        logger.warn('no_uniqueId_cookie ' + req.url);
        return apiGlobals.responseNoValid('no_uniqueId_cookie');
      }

      // Session deleted from redis
      if (!req.session.uuid) {
        logger.warn('no_user_id ' + req.url);
        return apiGlobals.responseNoValid('no_user_id');
      }

      // Session user_id and uniqueId not match. Modified uniqueId cookie.
      if (req.session.uuid !== req.signedCookies[config.uniqueCookie]) {
        logger.warn('invalid_uniqueId_cookie ' + req.url);
        return apiGlobals.responseNoValid('invalid_uniqueId_cookie');
      }

      // Include socket.io properties to request object
      req.io = this.io;
      return next();
    });
  }

  setRoutes(): void {
    this.app.use('/api/remoteFile/:b(*)', (req, res, next) => {
      console.log(req.params.b);
      next();
    });
    this.app.use('/api/file/', file);
    this.app.use('/api/remoteFile/', remoteFile);
    this.app.use('/api/configFile/', configFile);
    this.app.use('/api/folder/', folder);
    this.app.use('/api/remoteFolder/', remoteFolder);
    this.app.use('/api/credential/', credential);

    // upload & download called from socket.io
    /*
    this.app.use('/api/remoteServer/get_kernel', require('./api/remoteServer/get_kernel.js'));
    this.app.use('/api/remoteServer/get_cpu', require('./api/remoteServer/get_cpu.js'));
    this.app.use('/api/remoteServer/get_disk', require('./api/remoteServer/get_disk.js'));
    this.app.use('/api/remoteServer/get_mem', require('./api/remoteServer/get_mem.js'));
    this.app.use('/api/remoteServer/get_release', require('./api/remoteServer/get_release.js'));
    this.app.use('/api/remoteServer/get_updates', require('./api/remoteServer/get_updates.js'));
    this.app.use('/api/remoteServer/get_processes', require('./api/remoteServer/get_processes.js'));
    this.app.use('/api/remoteServer/get_interfaces', require('./api/remoteServer/get_interfaces.js'));
    this.app.use('/api/remoteServer/get_interface_bandwidth', require('./api/remoteServer/get_interface_bandwidth.js'));

    this.app.use('/api/remoteServer/run_hids', require('./api/remoteServer/run_hids.js'));
    this.app.use('/api/remoteServer/do_ping', require('./api/remoteServer/do_ping.js'));
    this.app.use('/api/remoteServer/do_snmp', require('./api/remoteServer/do_snmp.js'));

    this.app.use('/api/vcenter/getClientVersion', require('./api/vcenter/getClientVersion.js'));
    this.app.use('/api/vcenter/connect', require('./api/vcenter/connect.js'));
    this.app.use('/api/vcenter/connectSoap', require('./api/vcenter/connectSoap.js'));
    this.app.use('/api/vcenter/call', require('./api/vcenter/call.js'));
    this.app.use('/api/vcenter/callSoap', require('./api/vcenter/callSoap.js'));
    this.app.use('/api/vcenter/upload_to_datastore', require('./api/vcenter/upload_to_datastore.js'));

    this.app.use('/api/netapp/call', require('./api/netapp/call.js'));

    this.app.use('/api/applications/get_application_file', require('./api/applications/get_application_file.js'));

    this.app.use('/api/video/get_video', require('./api/video/get_video.js'));
*/
    this.app.get('/getSession', (req: express.Request, res: express.Response) => {
      const apiGlobals = new ApiGlobalsModule(req, res);

      apiGlobals.validResponse();
    });
  }

  errorRouteHandler(): void {
    // express error handling
    this.app.use((req: express.Request, res: express.Response) => {
      res.status(404).send('Sorry can\'t find that!');
    });

    this.app.use((err: Error, req: express.Request, res: express.Response) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  }
}

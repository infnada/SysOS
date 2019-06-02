import path from 'path';
import readConfig from 'read-config';
const config =  readConfig(path.join(__dirname, '/filesystem/etc/expressjs/config.json'));
import log4js from 'log4js';
const logger = log4js.getLogger('mainlog');
import multiparty from 'connect-multiparty';
const multipartyMiddleware = multiparty();
import {ApiGlobalsModule} from './api/api-globals';

export class RoutesModule {

  ApiGlobalsModule: ApiGlobalsModule;

  init() {
    this.app.use((req, res, next) => {
      this.ApiGlobalsModule = new ApiGlobalsModule(req, res);

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
        return this.ApiGlobalsModule.responseNoValid('no_uniqueId_cookie');
      }

      // Session deleted from redis
      if (!req.session.uuid) {
        logger.warn('no_user_id ' + req.url);
        return this.ApiGlobalsModule.responseNoValid('no_user_id');
      }

      // Session user_id and uniqueId not match. Modified uniqueId cookie.
      if (req.session.uuid !== req.signedCookies[config.uniqueCookie]) {
        logger.warn('invalid_uniqueId_cookie ' + req.url);
        return this.ApiGlobalsModule.responseNoValid('invalid_uniqueId_cookie');
      }

      // Include socket.io properties to request object
      req.io = this.io;
      return next();
    });

    this.app.use('/api/file/upload', multipartyMiddleware, require('./api/file/upload.js'));
    this.app.use('/api/file/rename', require('./api/file/rename.js'));
    this.app.use('/api/file/delete', require('./api/file/delete.js'));
    this.app.use('/api/file/get', require('./api/file/get.js'));
    this.app.use('/api/file/download_from_url', require('./api/file/download_from_url.js'));
    this.app.use('/api/file/copy', require('./api/file/copy.js'));
    this.app.use('/api/file/move', require('./api/file/move.js'));

    this.app.use('/api/remoteFile/chmod', require('./api/remoteFile/chmod.js'));
    this.app.use('/api/remoteFile/delete', require('./api/remoteFile/delete.js'));
    this.app.use('/api/remoteFile/rename', require('./api/remoteFile/rename.js'));
    this.app.use('/api/remoteFile/download_from_url', require('./api/remoteFile/download_from_url.js'));
    this.app.use('/api/remoteFile/copy', require('./api/remoteFile/copy.js'));
    this.app.use('/api/remoteFile/move', require('./api/remoteFile/move.js'));
    // upload & download called from socket.io

    this.app.use('/api/folder/create', require('./api/folder/create.js'));
    this.app.use('/api/folder/get', require('./api/folder/get.js'));

    this.app.use('/api/remoteFolder/create', require('./api/remoteFolder/create.js'));
    this.app.use('/api/remoteFolder/get', require('./api/remoteFolder/get.js'));

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

    this.app.use('/api/credential/login', require('./api/credential/login.js'));
    this.app.use('/api/credential/init', require('./api/credential/init.js'));
    this.app.use('/api/credential/save', require('./api/credential/save.js'));
    this.app.use('/api/credential/delete', require('./api/credential/delete.js'));

    this.app.use('/api/configFiles/get', require('./api/configFiles/get.js'));
    this.app.use('/api/configFiles/save', require('./api/configFiles/save.js'));
    this.app.use('/api/configFiles/delete', require('./api/configFiles/delete.js'));

    this.app.use('/api/applications/get_application_file', require('./api/applications/get_application_file.js'));

    this.app.use('/api/video/get_video', require('./api/video/get_video.js'));

    this.app.get('/getSession', (req, res) => {
      res.send({status: 'ok'});
    });

    // express error handling
    this.app.use((req, res) => {
      res.status(404).send('Sorry can\'t find that!');
    });

    this.app.use((err, req, res) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  }

  constructor(private app,
              private io: any) {

    this.init();

  }

}

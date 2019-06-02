import socketio from 'socket.io';
import path from 'path';
import readConfig from 'read-config';
const config =  readConfig(path.join(__dirname, '/filesystem/etc/expressjs/config.json'));

import {AppModule} from './app';
import {SocketModule} from './socket';
import {RoutesModule} from './routes';

export class InitModule {

  AppModule: AppModule = new AppModule();

  constructor() {
    // HTTP
    this.AppModule.Server.listen({host: config.listen.ip, port: config.listen.port});
    this.AppModule.Server.on('error', (err) => {
      console.log('HTTP server.listen ERROR: ' + err.code);
    });

    // HTTPS
    this.AppModule.Servers.listen({host: config.listen.ip, port: config.listen.ports});
    this.AppModule.Servers.on('error', (err) => {
      console.log('HTTPS server.listen ERROR: ' + err.code);
    });

    // SOCKET.IO
    const io = socketio.listen(this.AppModule.Servers);

    io.set('authorization', (handshake, accept) => {
      this.AppModule.Session(handshake, {}, (err) => {
        if (err) { return accept(err); }
        const session = handshake.session;

        // check the session is valid
        accept(null, session.uuid != null);
      });
    });

    // bring up socket
    io.on('connection', (socket) => {
      return new SocketModule(socket);
    });

    // ROUTES
    new RoutesModule(this.AppModule.app, io).init();

  }

}

'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {configure, getLogger, connectLogger} from 'log4js';
import {createServer, Server} from 'http';
import {createServer as createServers, Server as Servers} from 'https';
import fs from 'fs';
import express from 'express';
import socketIo from 'socket.io';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import readConfig from 'read-config';

import {SocketModule} from './socket';
import {RoutesModule} from './routes';

export class Init {
  public config = readConfig(path.join(__dirname, '/filesystem/etc/expressjs/config.json'));
  private app: express.Application;
  private server: Server;
  private servers: Servers;
  private io: socketIo.Server;
  private logger;
  private options = {
    key: fs.readFileSync(__dirname + '/ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/ssl/cert.pem')
  };
  private expressOptions = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1s',
    redirect: false,
    setHeaders: (res) => {
      res.set('x-timestamp', Date.now());
    }
  };
  private Session = session({
    secret: this.config.session.secret,
    name: this.config.session.name,
    resave: false,
    saveUninitialized: true,
    expires: new Date(Date.now() + 8 * 60 * 60 * 1000)
  });


  constructor() {
    this.createApp();
    this.logging();
    this.createServer();
    this.sockets();
    this.listen();
    this.errorHandler();
    this.routing();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(this.Session);
    this.app.use(compress({
        filter: (req: express.Request, res: express.Response) => {
          return (/json|text|javascript|css/).test((res.getHeader('Content-Type') as string));
        },
        level: 9
      }
    ));
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json({limit: '50mb'}));
    this.app.use(cookieParser(this.config.session.secret));
    this.app.use(helmet.frameguard());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.hsts({
      maxAge: 10886400000,     // Must be at least 18 weeks to be approved by Google
      includeSubDomains: true, // Must be enabled to be approved by Google
      preload: true
    }));
    this.app.disable('x-powered-by');
    this.app.use(cors());
    this.app.use(favicon(__dirname + '/public/favicon.ico'));
    this.app.use(express.static(path.join(__dirname, '/public'), this.expressOptions));
    /*app.use(csrf());

    // Set cookie "XSRF-TOKEN" the new token for csrf
    app.use(function (req, res, next) {
      res.cookie("XSRF-TOKEN", req.csrfToken(), { secure: true });
      return next();
    });

    // Check for csrf codes
    app.use(function (err, req, res, next) {
      if (err.code !== "EBADCSRFTOKEN") { return next(err); }

      // handle CSRF token errors here
      res.status(403);
      res.send("session has expired or form tampered with");
    });*/
  }

  private logging(): void {
    configure({
      appenders: {
        file: {type: 'file', filename: path.join(__dirname, 'logs/log4js.log')},
        console: {type: 'console', level: 'trace'}
      },
      categories: {
        default: {appenders: ['console'], level: 'trace'},
        mainlog: {appenders: ['console'], level: 'trace'}
      }
    });

    this.logger = getLogger('mainlog');
    this.app.use(connectLogger(this.logger, {
      level: 'auto',
      format: ':remote-addr - :remote-user [:date] \":method :url HTTP/:http-version\"' +
        ' :status :response-time ms - :res[content-length] -  \":referrer\"',
      nolog: '\\.gif|\\.jpg$|\\.js$|\\.png$|\\.css$||\\.woff$'
    }));
  }

  private createServer(): void {

    this.server = createServer((req: express.Request, res: express.Response) => {
      res.writeHead(301, {Location: 'https://' + req.headers.host + ':' + this.config.listen.ports + req.url});
      res.end();
    });
    this.servers = createServers(this.options, this.app);
  }

  private sockets(): void {
    this.io = socketIo(this.servers);

    this.io.use((socket: socketIo.Socket, next) => {
      const handshake = socket.request;

      this.Session(handshake, {}, (err: any) => {
        if (err) {
          return next(new Error(err));
        }
        const socketSession = handshake.session;
        console.log(socketSession);
        // TODO: check the session is valid
        next();
      });
    });

    // bring up socket
    this.io.on('connection', (socket: socketIo.Socket) => {
      return new SocketModule(socket);
    });
  }

  private listen(): void {
    this.server.listen({host: this.config.listen.ip, port: this.config.listen.port}, () => {
      console.log('Running server on port %s', this.config.listen.port);
    });
    this.servers.listen({host: this.config.listen.ip, port: this.config.listen.ports}, () => {
      console.log('Running server on port %s', this.config.listen.port);
    });
  }

  private errorHandler(): void {
    this.server.on('error', (err: any) => {
      console.log('HTTP server.listen ERROR: ' + err.code);
    });
    this.servers.on('error', (err: any) => {
      console.log('HTTPS server.listen ERROR: ' + err.code);
    });
  }

  private routing(): void {
    new RoutesModule(this.app, this.io).init();
  }

  public getApp(): express.Application {
    return this.app;
  }
}

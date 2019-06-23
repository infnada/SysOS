'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {configure, getLogger, connectLogger} from 'log4js';
import {createServer, Server} from 'http';
import {createServer as createServers, Server as Servers} from 'https';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import compress from 'compression';
import readConfig from 'read-config';
import MemoryStore from 'memorystore';
import express from 'express';
import socketIo from 'socket.io';
import session from 'express-session';
import cors from 'cors';

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
  private MemoryStore = MemoryStore(session);
  private sessionStore = new this.MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  });
  private Session = session({
    store: this.sessionStore,
    secret: this.config.session.secret,
    name: this.config.session.name,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000)
    }
  });
  private sessionCookie = this.config.session.name;
  private sessionSecret = this.config.session.secret;
  private uniqueCookie = this.config.uniqueCookie;


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
      level: 'trace',
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

    this.io.use((socket: socketIo.Socket, next: express.NextFunction) => {

      if (socket.handshake.headers.cookie) {

        this.logger.trace('socketjs -> socket_id [%s] -> Socket have header cookies', socket.id);

        // Cookies from browser socket.io
        const socketCookies = cookie.parse(socket.handshake.headers.cookie);
        if (socketCookies[this.sessionCookie]) {

          // Check if signed cookie
          const sid = cookieParser.signedCookie(socketCookies[this.sessionCookie], this.sessionSecret);
          if (!sid) return next(new Error('Session cookie signature is not valid'));
          const uid = cookieParser.signedCookie(socketCookies[this.uniqueCookie], this.sessionSecret);
          if (!uid) return next(new Error('Unique cookie signature is not valid'));

          const sessionID = socketCookies[this.sessionCookie].substring(2, 34);

          this.sessionStore.get(sessionID, (err, sockSession) => {
            if (err) {
              this.logger.error('[APP] Get Session -> ' + err.code);
              return next(new Error(err));
            }

            socket.client.request.session = sockSession;
            next();
          });

        } else {
          this.logger.error('Socket/missingCookies -> Use error -> Missing cookie header');
          return next(new Error('missing_cookie_headers'));
        }
      }

    });

    // bring up socket
    this.io.on('connection', (socket: socketIo.Socket) => {
      return new SocketModule(socket);
    });
  }

  private listen(): void {
    this.server.listen({host: this.config.listen.ip, port: this.config.listen.port}, () => {
      this.logger.info('Running server on port %s', this.config.listen.port);
    });
    this.servers.listen({host: this.config.listen.ip, port: this.config.listen.ports}, () => {
      this.logger.info('Running server on port %s', this.config.listen.ports);
    });
  }

  private errorHandler(): void {
    this.server.on('error', (err: any) => {
      this.logger.error('HTTP server.listen ERROR: ' + err.code);
    });
    this.servers.on('error', (err: any) => {
      this.logger.error('HTTPS server.listen ERROR: ' + err.code);
    });
  }

  private routing(): void {
    new RoutesModule(this.app, this.io).init();
  }

  public getApp(): express.Application {
    return this.app;
  }
}

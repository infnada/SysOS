import {configure, getLogger, connectLogger, Logger} from 'log4js';
import {createServer, Server} from 'http';
import {createServer as createServers, Server as Servers, ServerOptions} from 'https';
import {Application, Request, Response, RequestHandler, static as expressStatic, NextFunction} from 'express';
import {ServeStaticOptions} from 'serve-static';
import {urlencoded, json} from 'body-parser';
import {useExpressServer, Action} from 'routing-controllers';
import {useSocketServer} from 'socket-controllers';
import {readFileSync, readJSONSync} from 'fs-extra';
import {join} from 'path';
import express from 'express';
import socketIo from 'socket.io';

// @ts-ignore TODO
import MemoryStore from 'memorystore';
import session from 'express-session';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cookie from 'cookie';
import favicon from 'serve-favicon';
import * as helmet from 'helmet';

import {AnyOpsOSGetPathModule} from '@anyopsos/module-get-path';
import {AnyOpsOSApiFinalMiddleware} from '@anyopsos/api-middleware-final';
import {AnyOpsOSApiErrorHandlerMiddleware} from '@anyopsos/api-middleware-error-handler';

/**
 * App class will create all the backend listeners HTTP/HTTPS/WSS
 */
export class App {
  private readonly mainConfigPath: string = new AnyOpsOSGetPathModule().mainConfig;
  private readonly mainConfig: { [key: string]: any; } = readJSONSync(this.mainConfigPath);

  private app: Application;
  private server: Server;
  private servers: Servers;
  private io: socketIo.Server;
  private logger: Logger;
  private options: ServerOptions = {
    key: readFileSync(__dirname + '/ssl/key.pem'),
    cert: readFileSync(__dirname + '/ssl/cert.pem')
  };
  private expressOptions: ServeStaticOptions = {
    index: 'index.html',
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    maxAge: '1s',
    redirect: false,
    setHeaders: (response: Response) => {
      response.set('x-timestamp', Date.now().toString());
    }
  };
  private MemoryStore = MemoryStore(session);
  private sessionStore = new this.MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  });
  private Session: RequestHandler = session({
    store: this.sessionStore,
    secret: this.mainConfig.session.secret,
    name: this.mainConfig.session.name,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000)
    }
  });
  private sessionCookie: string = this.mainConfig.session.name;
  private sessionSecret: string = this.mainConfig.session.secret;
  private uniqueCookie: string = this.mainConfig.uniqueCookie;

  constructor() {
    this.createApp();
    this.logging();
    this.createServer();
    this.sockets();
    this.listen();
    this.errorHandler();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(this.Session);
    this.app.use(compress({
        filter: (request: Request, response: Response) => {
          return (/json|text|javascript|css/).test((response.getHeader('Content-Type') as string));
        },
        level: 9
      }
    ));
    this.app.use(urlencoded({
      extended: true
    }));
    this.app.use(json({limit: '50mb'}));
    this.app.use(cookieParser(this.mainConfig.session.secret));
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
    this.app.use(expressStatic(join(__dirname, '/public'), this.expressOptions));

    useExpressServer(this.app, {
      defaultErrorHandler: false,
      defaults: {
        paramOptions: {
          required: true
        }
      },
      controllers: [new AnyOpsOSGetPathModule().filesystem + '/bin/apis/*/index.js'],
      middlewares: [
        AnyOpsOSApiFinalMiddleware,
        AnyOpsOSApiErrorHandlerMiddleware,
      ],
      authorizationChecker: async (action: Action, roles?: string[]) => {
        // No legged_in or deleted uniqueId cookie
        if (!action.request.signedCookies[this.mainConfig.uniqueCookie]) {
          this.logger.warn('no_uniqueId_cookie ' + action.request.url);
          return false;
        }

        // Session deleted from redis
        if (!action.request.session.userUuid) {
          this.logger.warn('no_user_id ' + action.request.url);
          return false;
        }

        // Session user_id and uniqueId not match. Modified uniqueId cookie.
        if (action.request.session.userUuid !== action.request.signedCookies[this.mainConfig.uniqueCookie]) {
          this.logger.warn('invalid_uniqueId_cookie ' + action.request.url);
          return false;
        }

        // Success
        return true;
      }
    });

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
        file: {type: 'file', filename: join(__dirname, 'logs/log4js.log')},
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

    this.server = createServer((req: Request, res: Response) => {
      res.writeHead(301, {Location: 'https://' + req.headers.host + ':' + this.mainConfig.listen.ports + req.url});
      res.end();
    });
    this.servers = createServers(this.options, this.app);
  }

  private sockets(): void {
    this.io = socketIo(this.servers);

    this.io.use((socket: socketIo.Socket, next: NextFunction) => {

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

          this.sessionStore.get(sessionID, (err: any, sockSession: any) => {
            if (err) {
              this.logger.error('[APP] Get Session -> ' + err.code);
              return next(new Error(err));
            }

            if (sockSession) {
              sockSession.socketId = socket.id;
              this.sessionStore.set(sessionID, sockSession);
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
    useSocketServer(this.io, {
      controllers: [new AnyOpsOSGetPathModule().filesystem + '/bin/websockets/*/index.js'],
    });
  }

  private listen(): void {
    this.server.listen({host: this.mainConfig.listen.ip, port: this.mainConfig.listen.port}, () => {
      this.logger.info('Running server on port %s', this.mainConfig.listen.port);
    });
    this.servers.listen({host: this.mainConfig.listen.ip, port: this.mainConfig.listen.ports}, () => {
      this.logger.info('Running server on port %s', this.mainConfig.listen.ports);
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

  public getApp(): Application {
    return this.app;
  }
}

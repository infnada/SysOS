import {getLogger, connectLogger, Logger} from 'log4js';
import {createServer as createServers, Server as Servers, ServerOptions} from 'https';
import {Application, RequestHandler} from 'express';
import {urlencoded, json} from 'body-parser';
import {useExpressServer, Action} from 'routing-controllers';
import express from 'express';
import connectRedis, {RedisStore} from 'connect-redis';
import session from 'express-session';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as helmet from 'helmet';

import {AnyOpsOSSysGetPathModule} from '@anyopsos/module-sys-get-path';
import {AnyOpsOSSysRedisSessionModule} from '@anyopsos/module-sys-redis-session'
import {AOO_SESSION_COOKIE, AOO_SESSION_COOKIE_SECRET, AOO_UNIQUE_COOKIE_NAME, SSL_DHPARAM, SSL_CA_CERT, SSL_AUTH_CERT, SSL_AUTH_CERT_KEY} from '@anyopsos/module-sys-constants';

import {AnyOpsOSApiFinalMiddleware} from '@anyopsos/api-middleware-final';
import {AnyOpsOSApiErrorHandlerMiddleware} from '@anyopsos/api-middleware-error-handler';

/**
 * App class will create all the backend listeners HTTPS
 */
export class App {
  private readonly sessionCookie: string = AOO_SESSION_COOKIE;
  private readonly sessionSecret: string = AOO_SESSION_COOKIE_SECRET;
  private readonly uniqueCookie: string = AOO_UNIQUE_COOKIE_NAME;
  private readonly sslDhParam: string = SSL_DHPARAM;
  private readonly sslCa: string = SSL_CA_CERT;
  private readonly sslKey: string = SSL_AUTH_CERT_KEY;
  private readonly sslCert: string = SSL_AUTH_CERT;

  private app!: Application;
  private servers!: Servers;
  private logger!: Logger;
  private options!: ServerOptions;
  private RedisStore!: any;
  private sessionStore!: RedisStore;
  private Session!: RequestHandler;

  constructor() {
  }

  async initializeApiServer() {

    this.options = {
      minVersion: 'TLSv1.2',
      dhparam: this.sslDhParam,
      ca: this.sslCa,
      cert: this.sslCert,
      key: this.sslKey
    };
    this.RedisStore = connectRedis(session);
    this.sessionStore = new this.RedisStore({
      client: new AnyOpsOSSysRedisSessionModule().Client,
    });
    this.Session = session({
      store: this.sessionStore,
      secret: this.sessionSecret,
      name: this.sessionCookie,
      resave: false,
      saveUninitialized: true,
      rolling: true,
      cookie: {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000)
      }
    });

    // Start
    this.createApp();
    this.logging();
    this.createServer();
    this.listen();
    this.errorHandler();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(this.Session);
    this.app.use(compress());
    this.app.use(urlencoded({
      extended: true
    }));
    this.app.use(json({limit: '50mb'}));
    this.app.use(cookieParser(this.sessionSecret));
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

    useExpressServer(this.app, {
      defaultErrorHandler: false,
      defaults: {
        paramOptions: {
          required: true
        }
      },
      controllers: [
        // Import APIs from filesystem
        new AnyOpsOSSysGetPathModule().filesystem + '/bin/apis/auth/index.js',
        new AnyOpsOSSysGetPathModule().filesystem + '/bin/apis/credential/index.js',
        new AnyOpsOSSysGetPathModule().filesystem + '/bin/apis/vault/index.js',
      ],
      middlewares: [
        AnyOpsOSApiFinalMiddleware,
        AnyOpsOSApiErrorHandlerMiddleware,
      ],
      authorizationChecker: async (action: Action, roles?: string[]) => {
        // No legged_in or deleted uniqueId cookie
        if (!action.request.signedCookies[this.uniqueCookie]) {
          this.logger.warn('no_uniqueId_cookie ' + action.request.url);
          return false;
        }

        // Session deleted from redis
        if (!action.request.session.userUuid) {
          this.logger.warn('no_user_id ' + action.request.url);
          return false;
        }

        // Session user_id and uniqueId not match. Modified uniqueId cookie.
        if (action.request.session.userUuid !== action.request.signedCookies[this.uniqueCookie]) {
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
    this.logger = getLogger('mainLog');
    this.app.use(connectLogger(this.logger, {
      level: 'trace',
      format: ':remote-addr - :remote-user [:date] \":method :url HTTP/:http-version\"' +
        ' :status :response-time ms - :res[content-length] -  \":referrer\"',
      nolog: '\\.gif|\\.jpg$|\\.js$|\\.png$|\\.css$||\\.woff$'
    }));
  }

  private createServer(): void {
    this.servers = createServers(this.options, this.app);
  }

  private listen(): void {
    this.servers.listen({ host: '0.0.0.0', port: 443 }, () => {
      this.logger.info('Running server on port 443');
    });
  }

  private errorHandler(): void {
    this.servers.on('error', (err: any) => {
      this.logger.error('HTTPS server.listen ERROR: ' + err.code);
    });
  }

}

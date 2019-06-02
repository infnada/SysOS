'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import express from 'express';
import path from 'path';
import {configure, getLogger, connectLogger} from 'log4js';
import readConfig from 'read-config';
import session from 'express-session';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import https from 'https';
import csrf from 'csurf';
import fs from 'fs';

export class AppModule {

  private config = readConfig(path.join(__dirname, '/filesystem/etc/expressjs/config.json'));
  readonly logger;
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
  Session = session({
    secret: this.config.session.secret,
    name: this.config.session.name,
    resave: false,
    saveUninitialized: true,
    expires: new Date(Date.now() + 8 * 60 * 60 * 1000)
  });
  app: express.Application = express();
  Server;
  Servers;


  constructor() {

    configure({
      appenders: {
        file: {type: 'file', filename: 'logs/log4js.log'},
        console: {type: 'console', level: 'trace'}
      },
      categories: {
        default: {appenders: ['console'], level: 'trace'},
        mainlog: {appenders: ['console'], level: 'trace'}
      }
    });

    this.logger = getLogger('mainlog');
    this.app.use(this.Session);
    this.app.use(compress({
        filter: (req, res) => {
          return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
      }
    ));
    this.app.use(connectLogger(this.logger, {
      level: 'auto',
      format: ':remote-addr - :remote-user [:date] \":method :url HTTP/:http-version\"' +
              ' :status :response-time ms - :res[content-length] -  \":referrer\"',
      nolog: '\\.gif|\\.jpg$|\\.js$|\\.png$|\\.css$||\\.woff$'
    }));

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

    /**
     * Init Expressjs
     */
    // Create HTTP server and redirect everything to HTTPS
    this.Server = http.createServer((req, res) => {
      res.writeHead(301, {Location: 'https://' + req.headers.host + ':' + this.config.listen.ports + req.url});
      res.end();
    });

    // Create main HTTPS server
    this.Servers = https.createServer(this.options, this.app);

  }

}

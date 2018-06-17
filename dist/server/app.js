"use strict";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Module dependencies.
 */
var path = require('path');

var log4js = require('log4js');
log4js.configure({
	appenders: {
		file: {type: 'file', filename: 'logs/log4js.log'},
		console: {type: 'console', level: "info"}
	},
	categories: {
		default: {appenders: ['console'], level: 'info'},
		mainlog: {appenders: ['console'], level: 'info'}
	}
});
var logger = log4js.getLogger('mainlog');

var config = require('read-config')(path.join(__dirname, '/filesystem/etc/expressjs/config.json'));
var express = require('express');
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var compress = require("compression");
var cors = require("cors");
var helmet = require("helmet");
var csrf = require("csurf");
var fs = require("fs");
var options = {
    key: fs.readFileSync(__dirname + "/ssl/key.pem"),
    cert: fs.readFileSync(__dirname + "/ssl/cert.pem"),
};

var expressOptions = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html'],
	index: false,
	maxAge: '1s',
	redirect: false,
	setHeaders: function (res) {
		res.set('x-timestamp', Date.now())
	}
};

var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
var session = require('express-session')({
	secret: config.session.secret,
	name: config.session.name,
    resave: false,
    saveUninitialized: true,
    expires: expiryDate
});

/**
 * Init Expressjs
 */

var app = express();
app.use(session);

app.use(compress({
	filter: function (req, res) {
		return (/json|text|javascript|css/).test(res.getHeader("Content-Type"));
	},
	level: 9
}));

app.use(log4js.connectLogger(logger, {
	level: 'auto',
	format: ':remote-addr - :remote-user [:date] \":method :url HTTP/:http-version\" :status :response-time ms - :res[content-length] -  \":referrer\"',
	nolog: '\\.gif|\\.jpg$|\\.js$|\\.png$|\\.css$||\\.woff$'
}));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser(config.session.secret));
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({
	maxAge: 10886400000,     // Must be at least 18 weeks to be approved by Google
	includeSubdomains: true, // Must be enabled to be approved by Google
	preload: true
}));
app.disable("x-powered-by");
app.use(cors());
app.use(favicon(__dirname + "/../public/favicon.ico"));
app.use(express.static(path.join(__dirname, '../public'), expressOptions));
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

// Create HTTP server and redirect everything to HTTPS
var server = require('http').createServer(function (req, res) {
    res.writeHead(301, {"Location": "https://" + req.headers['host'] + ':' + config.listen.ports + req.url});
    res.end();
});

// Create main HTTPS server
var servers = require('https')
.createServer(options, app);


module.exports = {server: server, servers: servers, app: app,config: config};

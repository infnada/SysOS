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
var expressOptions = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html'],
	index: false,
	maxAge: '1s',
	redirect: false,
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
};

var session = require('express-session')({
	secret: config.session.secret,
	name: config.session.name,
	resave: true,
	saveUninitialized: false,
	unset: 'destroy'
});

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
app.use(cookieParser());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard());
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

var server = require('http').Server(app);
var io = require('socket.io')(server);
require("./routes")(app, io);

// socket.io
// expose express session with socket.request.session
io.use(function (socket, next) {
	(socket.request.res) ? session(socket.request, socket.request.res, next)
		: next()
});

// bring up socket
var socket = require('./socket');
io.on('connection', socket);

module.exports = {server: server, config: config};

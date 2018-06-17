var config = require('./app').config;
var server = require('./app').server;
var servers = require('./app').servers;
var app = require('./app').app;

// HTTP
server.listen({host: config.listen.ip, port: config.listen.port});
server.on('error', function (err) {
	console.log('HTTP server.listen ERROR: ' + err.code)
});

// HTTPS
servers.listen({host: config.listen.ip, port: config.listen.ports});
servers.on('error', function (err) {
	console.log('HTTPS server.listen ERROR: ' + err.code)
});

// SOCKET.IO
var io = require("socket.io").listen(servers);
// expose express session with socket.request.session
io.use(function (socket, next) {
    (socket.request.res) ? session(socket.request, socket.request.res, next)
        : next()
});

// bring up socket
var socket = require('./socket');
io.on('connection', socket);

// ROUTES
require("./routes")(app, io);
// socket/index.js

var validator = require('validator');
var path = require('path');
var config = require('read-config')(path.join(__dirname, '../filesystem/etc/expressjs/config.json'));

// public
module.exports = function socket (socket) {
	var ssh = require('./modules/ssh.js')(socket);
	var snmp = require('./modules/snmp.js')(socket);
    var credentials = require('../routes/modules/credentials.js')();

	// if websocket connection arrives without an express session, kill it
	if (!socket.request.session) {
		socket.emit('401 UNAUTHORIZED');
		socket.disconnect(true);
		return;
	}

	// Default socket.io messages
	socket.on('disconnecting', function (reason) {
	});
	socket.on('disconnect', function (reason) {
		ssh.closeConnection(null, null);
	});
	socket.on('error', function (err) {
		ssh.closeConnection(null, null);
	});

	var newConnection = function (type, host, credential, port, uuid, so, community) {
		host = (validator.isIP(host + '') && host) || (validator.isFQDN(host) && host) || (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(host) && host);

		//snmp connection
		if (so === "snmp") return snmp.newConnection(type, uuid, host, community);

		//get username and password from credential
        return credentials.getCredential(credential).then(function (cred) {

            // linux connection
            console.log(type);
            if (so === "linux" || type === "ssh" || type === "sftp") {
                port = (validator.isInt(port + '', {min: 1, max: 65535}) && port) || config.ssh.port;
                ssh.newConnection(type, uuid, host, port, cred.username, cred.password);
            }

        }).catch(function (e) {
            if (e && e.code) return console.log(e.code);
            if (e) return console.log(e);
        });

	};

	/*
	 *
	 * GLOBAL session
	 *
	 */

	socket.on('[disconnect-session]', function (data) {
		ssh.closeConnection(data.type, data.uuid);
	});

	socket.on('[new-session]', function (data) {
	  console.log(data);
		newConnection(data.type, data.host, data.credential, data.port, data.uuid, data.so, data.community);
	});

};

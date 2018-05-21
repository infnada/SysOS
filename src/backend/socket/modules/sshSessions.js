var sshSessions = {
	ssh: [],
	sftp: [],
	smanager: []
};

module.exports = function () {

	var SSH = require('ssh2').Client;
	var path = require('path');
	var config = require('read-config')(path.join(__dirname, '../../filesystem/etc/expressjs/config.json'));

	var algorithms = config.algorithms;

	return {
		createSession: function (type, uuid, host, port, username, password, callback) {
			sshSessions[type][uuid] = new SSH();

			sshSessions[type][uuid].connect({
				host: host,
				port: port,
				username: username,
				password: password,
				tryKeyboard: true,
				algorithms: algorithms
			});

			return callback(sshSessions[type][uuid]);
		},
		closeSession: function (type, uuid) {
			return sshSessions[type][uuid].end();
		},
		getAllSessions: function (callback) {
			return callback(sshSessions);
		},
		getSession: function (type, uuid, callback) {
			return callback(sshSessions[type][uuid]);
		}
	}

};

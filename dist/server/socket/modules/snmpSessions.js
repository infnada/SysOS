var snmpSessions = {
	smanager: []
};

module.exports = function () {

	var path = require('path');
	var config = require('read-config')(path.join(__dirname, '../../filesystem/etc/expressjs/config.json'));
	var snmp = require("net-snmp");

	return {
		createSession: function (type, uuid, host, community, callback) {
			snmpSessions[type][uuid] = snmp.createSession(host, community, {
				port: 161,
				retries: 1,
				timeout: 5000,
				transport: "udp4",
				trapPort: 162,
				version: snmp.Version1
			});

			return callback(snmpSessions[type][uuid]);
		},
		closeSession: function (type, uuid) {
			return snmpSessions[type][uuid].close();
		},
		getAllSessions: function (callback) {
			return callback(snmpSessions);
		},
		getSession: function (type, uuid, callback) {
			return callback(snmpSessions[type][uuid]);
		}
	}

};

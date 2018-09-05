module.exports = function (socket) {

	var socketFactory = require('./socketFactory.js')(socket);
	var snmpSession = require('./snmpSessions.js')();

	return {
		newConnection: function (type, uuid, host, community) {

			snmpSession.createSession(type, uuid, host, community, function (session) {
				session.on('close', function (err) {
					socketFactory.emitProp(type, "CONN CLOSE", uuid, 'status');
				});
				session.on('error', function (err) {
					socketFactory.emitProp(type, "CONN ERROR " + err, uuid, 'status');
				});

				socketFactory.emitProp(type, 'snmp://public@' + host + ':161', uuid, 'footer');
				socketFactory.emitProp(type, 'SNMP CONNECTION ESTABLISHED', uuid, 'status');
				socketFactory.emitProp(type, 'connected', uuid, 'type');
			});

		}
	}

};

var Promise = require("bluebird");

module.exports = function net (conn) {

	this.ifaces = [];

	function changeInterfaceById (id, key, value) {
		for (var i in ifaces) {
			if (ifaces[i].interfaceId == id) {
				ifaces[i][key] = value;
				break; //Stop this loop, we found it!
			}
		}
	};

	var getIfacesNetmask = function (interfaceId, interfaceIp) {
		return new Promise(function (resolve, reject) {
			if (interfaceIp === undefined) return resolve();

			conn.get(["1.3.6.1.2.1.4.20.1.3." + interfaceIp], function (e, varbinds) {
				if (e) return reject(e);
				changeInterfaceById(interfaceId, "netmask", varbinds[0].value);
				return resolve();
			});
		});
	};

	var getIfacesMtu = function (interfaceId) {
		return new Promise(function (resolve, reject) {
			conn.get(["1.3.6.1.2.1.2.2.1.4." + interfaceId], function (e, varbinds) {
				if (e) return reject(e);
				changeInterfaceById(interfaceId, "mtu", varbinds[0].value);
				return resolve();
			});
		});
	};

	var getIfacesTrafficIn = function (interfaceId) {
		return new Promise(function (resolve, reject) {
			conn.get(["1.3.6.1.2.1.2.2.1.10." + interfaceId], function (e, varbinds) {
				if (e) return reject(e);
				changeInterfaceById(interfaceId, "traffic_in", varbinds[0].value);
				return resolve();
			});
		});
	};

	var getIfacesTrafficOut = function (interfaceId) {
		return new Promise(function (resolve, reject) {
			conn.get(["1.3.6.1.2.1.2.2.1.16." + interfaceId], function (e, varbinds) {
				if (e) return reject(e);
				changeInterfaceById(interfaceId, "traffic_out", varbinds[0].value);
				return resolve();
			});
		});
	};

	var getIfacesType = function (interfaceId) {
		return new Promise(function (resolve, reject) {
			conn.get(["1.3.6.1.2.1.2.2.1.3." + interfaceId], function (e, varbinds) {
				if (e) return reject(e);
				changeInterfaceById(interfaceId, "type", varbinds[0].value);
				return resolve();
			});
		});
	};

	var getIfacesSpeed = function (interfaceId) {
		return new Promise(function (resolve, reject) {
			conn.get(["1.3.6.1.2.1.2.2.1.5." + interfaceId], function (e, varbinds) {
				if (e) return reject(e);
				changeInterfaceById(interfaceId, "speed", varbinds[0].value);
				return resolve();
			});
		});
	};

	var getIfacesAdminStatus = function (interfaceId) {
		return new Promise(function (resolve, reject) {
			conn.get(["1.3.6.1.2.1.2.2.1.7." + interfaceId], function (e, varbinds) {
				if (e) return reject(e);
				changeInterfaceById(interfaceId, "admin_status", varbinds[0].value);
				return resolve();
			});
		});
	};

	this.getIfaces = function () {
		var interfaceId;
		var substringResult;

		return new Promise(function (resolve, reject) {

			conn.subtree("1.3.6.1.2.1.2.2.1.2", function (varbinds) {
				interfaceId = varbinds[0].oid.replace("1.3.6.1.2.1.2.2.1.2.", "");

				substringResult = {
					"interfaceId": interfaceId,
					"interfaceName": varbinds[0].value.toString()
				};

				ifaces.push(substringResult);
			}, function (e) {
				if (e) console.log(e);
				return resolve();
			});

		});
	};

	this.getIfacesIp = function () {
		var iface;
		var interfaceId;
		var interfaceIp;

		return new Promise(function (resolve, reject) {

			conn.subtree("1.3.6.1.2.1.4.20.1.2", function (varbinds) {
				interfaceId = varbinds[0].value;
				interfaceIp = varbinds[0].oid.replace("1.3.6.1.2.1.4.20.1.2.", "");

				changeInterfaceById(interfaceId, "ip", interfaceIp);
			}, function (e) {
				if (e) console.log(e);
				return resolve();
			});

		});
	};

	this.getIfacesInfo = function (interfaceId, interfaceIp) {

		return Promise.all([
			getIfacesNetmask(interfaceId, interfaceIp),
			getIfacesMtu(interfaceId),
			getIfacesTrafficIn(interfaceId),
			getIfacesTrafficOut(interfaceId),
			getIfacesType(interfaceId),
			getIfacesSpeed(interfaceId),
			getIfacesAdminStatus(interfaceId)
		]);
	};

	return this;
};
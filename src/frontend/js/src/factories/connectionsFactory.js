/*
 * Connect to socket.io and return socket object
 */

(function () {
	"use strict";
	myApp.factory('connectionsFactory', ['$rootScope', '$injector', '$filter', '$timeout', 'socket', 'ServerFactory', 'toastr', 'uuid',
		function ($rootScope, $injector, $filter, $timeout, socket, ServerFactory, toastr, uuid) {

			var connections = {
				standalone: [],
				virtual: [],
				storage: [],
				sftp: [],
				ssh: []
			};
			var uuidMap = [];
			var linksMap = [];
			var SSHterminals = [];

			/*
			 * Deletes a connection
			 *
			 * @params
			 * uuid {String}
			 */
			var getConnectionCategoryByUuid = function (uuid) {
				var connection_category = getConnectionByUuid(uuid).category;

				if (connection_category === "vmware") return "virtual";
				return connection_category;
			};

			/*
			 * Set connections info fetched from config file
			 *
			 * @params
			 * connections {Array}
			 */
			var setSavedConnections = function (connections) {

				return angular.forEach(connections, function (connection) {
					// Populate saved option (connection saved in config file)
					return setNewConnection(connection, true);
				});

			};

			/*
			 * Save connection to config file
			 *
			 * @params
			 * connection {Object}
			 */
			var saveConnection = function (connection) {

				var configFile;

				if (connection.category === "standalone" || connection.category === "virtual" || connection.category === "storage") configFile = 'applications/smanager/config.json';
				if (connection.category === "ssh") configFile = 'applications/ssh/config.json';
				if (connection.category === "sftp") configFile = 'applications/sftp/config.json';

				return ServerFactory.saveConfigToFile(connection, configFile, false, function (data) {

				});

			};

			/*
			 * Add new connection to connections array
			 */
			var setNewConnection = function (connection, initialized) {
				var mapId;

				/*
				 * STANDALONE nodes
				 */
				if (connection.category === "standalone") {

					if (connection.so === "linux") {

						// Connection fetched from config file
						if (initialized) {
							mapId = connections.standalone.push(connection) - 1;

							// This is a new connection
						} else {
							mapId = connections.standalone.push({
								uuid: connection.uuid,
								host: connection.host,
								port: connection.port,
								category: connection.category,
								description: connection.description,
								credential: connection.credential,
								so: connection.so,
								autologin: connection.autologin,
								save: true,
								folder: connection.folder
							}) - 1;
						}
					}

					if (connection.so === "snmp") {

						// Connection fetched from config file
						if (initialized) {
							mapId = connections.standalone.push(connection) - 1;

							// This is a new connection
						} else {
							mapId = connections.standalone.push({
								uuid: connection.uuid,
								host: connection.host,
								port: connection.port,
								category: connection.category,
								description: connection.description,
								credential: connection.credential,
								so: connection.so,
								autologin: connection.autologin,
								save: true,
								folder: connection.folder,
								oids: connection.oids
							}) - 1;
						}
					}

					// Create uuid mapping used by getObjectByUuidMapping();
					uuidMap.push({
						uuid: connection.uuid,
						object: "_this.connections.standalone[" + mapId + "]"
					});

					// Connect to target node
					if (connection.autologin === true) {
						return connect(connection);
					}
				}

				/*
				 * VMWARE nodes
				 */
				if (connection.category === "virtual") {

					// Connection fetched from config file
					if (initialized) {
						mapId = connections.virtual.push(connection) - 1;

						// This is a new connection
					} else {
						// Check if connection already exists
						if ($filter('filter')(connections.virtual, {host: connection.host}).length > 0) {
							return toastr.error('Node (' + connection.host + ') already exists. Please modify the existing connection properties or ReScan the node.', 'Error getting data from vCenter');
						}

						mapId = connections.virtual.push({
							uuid: connection.uuid,
							host: connection.host,
							port: connection.port,
							category: connection.category,
							description: connection.description,
							credential: connection.credential,
							save: true
						}) - 1;
					}

					// Create uuid mapping used by getObjectByUuidMapping();
					uuidMap.push({
						uuid: connection.uuid,
						object: "_this.connections.virtual[" + mapId + "]"
					});

					// Connect to target node only if connection is not initialized, preventing too many API requests to target node
					if (connection.autologin === true && !initialized) {
						return connect(connection);
					}
				}

				/*
				 * NETAPP nodes
				 */
				if (connection.category === "storage") {

					if (connection.so === "netapp") {

						// Connection fetched from config file
						if (initialized) {
							mapId = connections.storage.push(connection) - 1;

							// This is a new connection
						} else {
							// Check if connection already exists
							if ($filter('filter')(connections.storage, {host: connection.host}).length > 0) {
								return toastr.error('Node (' + connection.host + ') already exists. Please modify the existing connection properties or ReScan the node.', 'Error getting data from NetApp');
							}

							mapId = connections.storage.push({
								uuid: connection.uuid,
								host: connection.host,
								port: connection.port,
								so: connection.so,
								category: connection.category,
								description: connection.description,
								credential: connection.credential,
								autologin: connection.autologin,
								save: true
							}) - 1;
						}

						// Create uuid mapping used by getObjectByUuidMapping();
						uuidMap.push({
							uuid: connection.uuid,
							object: "_this.connections.storage[" + mapId + "]"
						});

						// Connect to target node only if connection is not initialized, preventing too many API requests to target node
						if (connection.autologin === true && !initialized) {
							return connect(connection);
						}
					}
				}

				/*
				 * SSH nodes
				 */
				if (connection.category === "ssh") {
					// Connection fetched from config file
					if (initialized) {
						mapId = connections.ssh.push(connection) - 1;

						// This is a new connection
					} else {
						mapId = connections.ssh.push({
							uuid: connection.uuid,
							host: connection.host,
							port: connection.port,
							category: connection.category,
							description: connection.description,
							credential: connection.credential,
							type: "new",
							autologin: connection.autologin,
							save: connection.save
						}) - 1;
					}

					// Create uuid mapping used by getObjectByUuidMapping();
					uuidMap.push({
						uuid: connection.uuid,
						object: "_this.connections.ssh[" + mapId + "]"
					});

					// Connect to target node
					if (!connection.save || (connection.save === true && connection.autologin === true)) {
						return connect(connection);
					}
				}

				/*
				 * SFTP nodes
				 */
				if (connection.category === "sftp") {
					// Connection fetched from config file
					if (initialized) {
						mapId = connections.sftp.push(connection) - 1;

						// This is a new connection
					} else {
						mapId = connections.sftp.push({
							uuid: connection.uuid,
							host: connection.host,
							port: connection.port,
							category: connection.category,
							description: connection.description,
							credential: connection.credential,
							type: "new",
							currentPath: "/",
							currentData: "",
							autologin: connection.autologin,
							save: connection.save
						}) - 1;
					}

					// Create uuid mapping used by getObjectByUuidMapping();
					uuidMap.push({
						uuid: connection.uuid,
						object: "_this.connections.sftp[" + mapId + "]"
					});

					// Connect to target node
					if (!connection.save || (connection.save === true && connection.autologin === true)) {
						return connect(connection);
					}
				}

			};

			/*
			 * Creates a connection to target server and/or fetch server data
			 *
			 * @params
			 * connection {Object}
			 */
			var connect = function (connection) {
				// TODO: this is an anti-pattern
				var smanagerFactory = $injector.get('smanagerFactory');

				// New connection
				if (!connection.uuid) {
					connection.uuid = uuid.v4();
					return setNewConnection(connection);
				}

				/*
				 * Standalone
				 */
				if (connection.so === "linux" || connection.so === "snmp") {
					socket.emit('session__new', 'smanager', connection.host, connection.credential, null, connection.uuid, connection.so);
				}

				/*
				 * VMWARE
				 */
				if (connection.category === "virtual") {
					if (connection.type === "vCenter" || connection.so === "ESXi" || connection.so === "vmware") {
						return smanagerFactory.getVMwareData(connection);
					}
				}

				/*
				 * NETAPP
				 */
				if (connection.category === "storage") {
					if (connection.type === "NetApp") {
						return smanagerFactory.getNetAppData(connection);
					}
				}

				/*
				 * SSH
				 */
				if (connection.category === "ssh") {

					if (connection.save) saveConnection(connection);

					SSHterminals[connection.uuid] = new Terminal({
						cursorBlink: true
					});

					SSHterminals[connection.uuid].on('data', function (data) {
						socket.emit('ssh_session__data', data, connection.uuid)
					});

					$timeout(function () {
						var terminalContainer = document.getElementById('terminal-container-' + connection.uuid);

						SSHterminals[connection.uuid].open(terminalContainer, {
							focus: true
						});

						socket.emit('ssh_session__geometry', SSHterminals[connection.uuid].cols, SSHterminals[connection.uuid].rows, connection.uuid);
						socket.emit('session__new', 'ssh', connection.host, connection.credential, null, connection.uuid);
					}, 100);

				}

				/*
				 * SFTP
				 */
				if (connection.category === "sftp") {

					console.log(connection);

					if (connection.save) saveConnection(connection);

					socket.emit('session__new', 'sftp', connection.host, connection.credential, null, connection.uuid);

				}

				return connection;
			};

			/*
			 * Disconnect connection at server side
			 *
			 * @params
			 * uuid {String}
			 */
			var disconnectConnection = function (uuid) {
				if (!uuid) throw new Error("uuid_not_found");

				var connection_category = getConnectionCategoryByUuid(uuid);

				if (connection_category === "stfp" || connection_category === "ssh" || connection_category === "linux") socket.emit('session__disconnect', uuid);

				getConnectionByUuid(uuid).state = "disconnected";
				getConnectionByUuid(uuid).status = "Disconnected";
			};

			/*
			 * Deletes a connection
			 *
			 * @params
			 * uuid {String}
			 */
			var deleteConnection = function (uuid) {
				if (!uuid) throw new Error("uuid_not_found");

				var file;

				var connection_category = getConnectionCategoryByUuid(uuid);
				console.log(uuid);
				console.log(connection_category);

				connections[connection_category] = connections[connection_category].filter(function (el) {
					return el.uuid !== uuid;
				});

				disconnectConnection(uuid);

				if (connection_category === "virtual" || connection_category === "storage" || connection_category === "standalone") file = 'applications/smanager/config.json';
				if (connection_category === "ssh") file = 'applications/ssh/config.json';
				if (connection_category === "sftp") file = 'applications/sftp/config.json';

				return ServerFactory.deleteConfigFromFile(uuid, file, false, function (data) {

				});
			};

			/*
			 * Get connection info from connections array
			 *
			 * @params
			 * uuid {String}
			 */
			var getConnectionByUuid = function (uuid) {
				var filter_standalone = $filter('filter')(connections.standalone, {uuid: uuid})[0];
				var filter_virtual = $filter('filter')(connections.virtual, {uuid: uuid})[0];
				var filter_storage = $filter('filter')(connections.storage, {uuid: uuid})[0];
				var filter_ssh = $filter('filter')(connections.ssh, {uuid: uuid})[0];
				var filter_sftp = $filter('filter')(connections.sftp, {uuid: uuid})[0];

				if (filter_standalone) return filter_standalone;
				if (filter_virtual) return filter_virtual;
				if (filter_storage) return filter_storage;
				if (filter_ssh) return filter_ssh;
				if (filter_sftp) return filter_sftp;

				return false;
			};

			/*
			 * Save uuid Mapping to config file
			 */
			var saveUuidMap = function (map) {

				angular.extend(uuidMap, uuidMap[0], map);

				return ServerFactory.saveConfigToFile(uuidMap, 'applications/smanager/map.json', true, function (data) {

				});

			};

			/*
			 * Save node links to config file
			 */
			var saveLinksMap = function (links) {

				angular.extend(linksMap, linksMap[0], links);

				return ServerFactory.saveConfigToFile(linksMap, 'applications/smanager/links.json', true, function (data) {

				});

			};

			/*
			 * Creates an Eval string to fast fetch recursive data from an uuid
			 *
			 * @params
			 * uuid {String}
			 * parent {Int} Get 1st, 2nd, 3rd... parent object instead of all object
			 */
			var getObjectByUuidMapping = function (uuid, parent) {
				var object;
				var object_to_eval = "";

				// LEVEL 1
				object = $filter('filter')(uuidMap, {uuid: uuid})[0];
				if (!object) return false;

				if (!parent) object_to_eval = object.object;

				for (var i = 0; i <= 3; i++) {
					if (object.parent) {
						object = $filter('filter')(uuidMap, {uuid: object.parent})[0];
						if (!object) return false;

						if (i === 0 && parent >= 2) continue;
						if (i === 1 && parent >= 3) continue;

						object_to_eval = object.object + "." + object_to_eval;
						continue;
					}
					break;
				}

				// Remove last "dot" from object_to_eval if parent value is passed
				if (parent >= 1) return object_to_eval.slice(0, -1);

				return object_to_eval;

			};

			return {
				connections: function () {
					return connections;
				},
				setSavedConnections: setSavedConnections,
				saveConnection: saveConnection,
				connect: connect,
				disconnectConnection: disconnectConnection,
				deleteConnection: deleteConnection,
				getConnectionByUuid: getConnectionByUuid,
				getConnectionByCategory: function (category) {
					return connections[category];
				},
				setUuidMap: function (map) {
					uuidMap = map;
				},
				getUuidMap: function () {
					return uuidMap;
				},
				getSSHTerminals: function () {
					return SSHterminals;
				},
				saveUuidMap: saveUuidMap,
				saveLinksMap: saveLinksMap,
				getObjectByUuidMapping: getObjectByUuidMapping
			};

		}]);

}());

/*
 * Connect to socket.io and return socket object
 */

(function () {
    'use strict';
    SysOS.factory('connectionsFactory', ['$rootScope', '$injector', '$filter', '$timeout', '$log', 'socket', 'ServerFactory', 'toastr', 'uuid',
        function ($rootScope, $injector, $filter, $timeout, $log, socket, ServerFactory, toastr, uuid) {

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

            /**
             * Deletes a connection
             *
             * @param uuid {String}
             */
            var getConnectionCategoryByUuid = function (uuid) {
                if (!uuid) throw new Error('uuid_not_found');

                var connection_category = getConnectionByUuid(uuid).category;

                if (!connection_category) {
                    $log.error('Connections Factory [%s] -> getConnectionCategoryByUuid not found', uuid);
                    return false;
                }

                if (connection_category === 'vmware') return 'virtual';
                return connection_category;
            };

            /**
             * Set connections info fetched from config file
             *
             * @param connections {Array}
             */
            var setSavedConnections = function (connections) {
                if (!connections) throw new Error('connections_not_found');

                $log.debug('Connections Factory -> Setting saved connections -> #[%s]', connections.length);

                return angular.forEach(connections, function (connection) {

                    $log.debug('Connections Factory [%s] -> Setting saved connections -> category [%s], host [%s]', connection.uuid, connection.category, connection.host);

                    // Populate saved option (connection saved in config file)
                    return setNewConnection(connection, true);
                });

            };

            /**
             * Save connection to config file
             *
             * @param connection {Object}
             */
            var saveConnection = function (connection) {
                if (!connection) throw new Error('connection_not_found');

                if (connection.refreshing) delete connection.refreshing;

                var configFile;

                $log.debug('Connections Factory [%s] -> Saving connection -> category [%s], host [%s]', connection.uuid, connection.category, connection.host);

                if (connection.category === 'standalone' || connection.category === 'virtual' || connection.category === 'storage') configFile = 'applications/smanager/config.json';
                if (connection.category === 'ssh') configFile = 'applications/ssh/config.json';
                if (connection.category === 'sftp') configFile = 'applications/sftp/config.json';

                return ServerFactory.saveConfigToFile(connection, configFile, false, function () {
                    $log.debug('Connections Factory [%s] -> Saved connection successfully -> category [%s], host [%s]', connection.uuid, connection.category, connection.host);
                }, function (data) {
                    $log.error('Connections Factory [%s] -> Error while saving connection -> category [%s], host [%s] -> ', connection.uuid, connection.category, connection.host, data.error);
                    toastr.error('Error while saving connection.', 'Infrastructure Manager');
                });

            };

            /**
             * Add new connection to connections array
             *
             * @params
             * connection {Object}
             * initialized* {Bool}
             */
            var setNewConnection = function (connection, initialized) {
                if (!connection) throw new Error('connection_not_found');

                var mapId;

                $log.debug('Connections Factory [%s] -> Setting new connection -> category [%s], host [%s]', connection.uuid, connection.category, connection.host);

                /*
                 * STANDALONE nodes
                 */
                if (connection.category === 'standalone') {

                    if (connection.so === 'linux') {

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
                                state: 'new',
                                so: connection.so,
                                autologin: connection.autologin,
                                save: true,
                                folder: connection.folder
                            }) - 1;
                        }
                    }

                    if (connection.so === 'snmp') {

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
                                state: 'new',
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
                        object: '_this.connections.standalone[' + mapId + ']'
                    });

                    // Connect to target node
                    if (connection.autologin === true) return connect(connection);
                }

                /*
                 * VMWARE nodes
                 */
                if (connection.category === 'virtual') {

                    // Connection fetched from config file
                    if (initialized) {
                        mapId = connections.virtual.push(connection) - 1;

                        // This is a new connection
                    } else {
                        // Check if connection already exists
                        if ($filter('filter')(connections.virtual, {host: connection.host}).length > 0) {
                            $log.error('Connections Factory -> Error while setting new connection ->  host [%s] -> Connection already exists', connection.category, connection.host);
                            return toastr.error('Node (' + connection.host + ') already exists. Please modify the existing connection properties or ReScan the node.', 'Error getting data from vCenter');
                        }

                        mapId = connections.virtual.push({
                            uuid: connection.uuid,
                            host: connection.host,
                            port: connection.port,
                            so: connection.so,
                            category: connection.category,
                            description: connection.description,
                            credential: connection.credential,
                            save: true
                        }) - 1;
                    }

                    // Create uuid mapping used by getObjectByUuidMapping();
                    uuidMap.push({
                        uuid: connection.uuid,
                        object: '_this.connections.virtual[' + mapId + ']'
                    });

                    // Connect to target node only if connection is not initialized, preventing too many API requests
                    // to target node
                    if (connection.autologin === true && !initialized) {
                        return connect(connection);
                    }
                }

                /*
                 * NETAPP nodes
                 */
                if (connection.category === 'storage') {

                    if (connection.so === 'netapp') {

                        // Connection fetched from config file
                        if (initialized) {
                            mapId = connections.storage.push(connection) - 1;

                            // This is a new connection
                        } else {
                            // Check if connection already exists
                            if ($filter('filter')(connections.storage, {host: connection.host}).length > 0) {
                                $log.error('Connections Factory -> Error while setting new connection ->  host [%s] -> Connection already exists', connection.category, connection.host);
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
                            object: '_this.connections.storage[' + mapId + ']'
                        });

                        // Connect to target node only if connection is not initialized, preventing too many API
                        // requests to target node
                        if (connection.autologin === true && !initialized) {
                            return connect(connection);
                        }
                    }
                }

                /*
                 * SSH nodes
                 */
                if (connection.category === 'ssh') {
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
                            state: 'new',
                            autologin: connection.autologin,
                            save: connection.save
                        }) - 1;
                    }

                    // Create uuid mapping used by getObjectByUuidMapping();
                    uuidMap.push({
                        uuid: connection.uuid,
                        object: '_this.connections.ssh[' + mapId + ']'
                    });

                    // Connect to target node
                    if (!connection.save || (connection.save === true && connection.autologin === true)) {
                        return connect(connection);
                    }
                }

                /*
                 * SFTP nodes
                 */
                if (connection.category === 'sftp') {
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
                            state: 'new',
                            currentPath: '/',
                            currentData: '',
                            autologin: connection.autologin,
                            save: connection.save
                        }) - 1;
                    }

                    // Create uuid mapping used by getObjectByUuidMapping();
                    uuidMap.push({
                        uuid: connection.uuid,
                        object: '_this.connections.sftp[' + mapId + ']'
                    });

                    // Connect to target node
                    if (!connection.save || (connection.save === true && connection.autologin === true)) {
                        return connect(connection);
                    }
                }

            };

            /**
             * Creates a connection to target server and/or fetch server data
             *
             * @param connection {Object}
             */
            var connect = function (connection) {
                if (!connection) throw new Error('connection_not_found');

                var smanagerFactory = $injector.get('smanagerFactory');

                $log.debug('Connections Factory -> Connect received -> category [%s], so [%s], host [%s]', connection.category, connection.so, connection.host);

                // New connection
                if (!connection.uuid) {
                    $log.debug('Connections Factory -> Connect received -> No uuid found -> category [%s], so [%s], host [%s]', connection.category, connection.so, connection.host);

                    connection.uuid = uuid.v4();
                    return setNewConnection(connection);
                }

                /*
                 * Standalone
                 */
                if (connection.so === 'linux' || connection.so === 'snmp') {

                    if (connection.save) saveConnection(connection);

                    socket.emit('session__new', 'smanager', connection.host, connection.credential, null, connection.uuid, connection.so);
                }

                /*
                 * VMWARE
                 */
                if (connection.category === 'virtual') {
                    if (connection.so === 'vmware') smanagerFactory.getVMwareData(connection);
                }

                /*
                 * NETAPP
                 */
                if (connection.category === 'storage') {
                    if (connection.so === 'netapp') smanagerFactory.getNetAppData(connection);
                }

                /*
                 * SSH
                 */
                if (connection.category === 'ssh') {

                    if (connection.save) saveConnection(connection);

                    SSHterminals[connection.uuid] = new Terminal({
                        cursorBlink: true
                    });

                    SSHterminals[connection.uuid].on('data', function (data) {
                        socket.emit('ssh_session__data', data, connection.uuid);
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
                if (connection.category === 'sftp') {
                    if (connection.save) saveConnection(connection);

                    socket.emit('session__new', 'sftp', connection.host, connection.credential, null, connection.uuid);
                }

                return connection;
            };

            /**
             * Disconnect connection at server side
             *
             * @param uuid {String}
             */
            var disconnectConnection = function (uuid) {
                if (!uuid) throw new Error('uuid_not_found');

                $log.debug('Connections Factory [%s] -> Disconnecting connection', uuid);

                var connection_category = getConnectionCategoryByUuid(uuid);
                if (connection_category === 'stfp' || connection_category === 'ssh' || connection_category === 'linux') {
                    socket.emit('session__disconnect', uuid);
                }

                getConnectionByUuid(uuid).state = 'disconnected';
                getConnectionByUuid(uuid).status = 'Disconnected';
            };

            /**
             * Deletes a connection
             *
             * @param uuid {String}
             */
            var deleteConnection = function (uuid) {
                if (!uuid) throw new Error('uuid_not_found');

                $log.debug('Connections Factory [%s] -> Deleting connection', uuid);

                var file;
                var connection_category = getConnectionCategoryByUuid(uuid);

                disconnectConnection(uuid);

                connections[connection_category] = connections[connection_category].filter(function (el) {
                    return el.uuid !== uuid;
                });

                if (connection_category === 'virtual' || connection_category === 'storage' || connection_category === 'standalone') file = 'applications/smanager/config.json';
                if (connection_category === 'ssh') file = 'applications/ssh/config.json';
                if (connection_category === 'sftp') file = 'applications/sftp/config.json';

                return ServerFactory.deleteConfigFromFile(uuid, file, function () {
                    $log.debug('Connections Factory [%s] -> Connection deleted successfully', uuid);
                    toastr.success('Connection deleted.', 'Infrastructure Manager');
                }, function (data) {
                    $log.error('Connections Factory [%s] -> Error while deleting connection -> ', uuid, data.error);
                    toastr.error('Error while deleting connection.', 'Infrastructure Manager');
                });
            };

            /**
             * Get connection info from connections array
             *
             * @param uuid {String}
             */
            var getConnectionByUuid = function (uuid) {
                if (!uuid) throw new Error('uuid_not_found');

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

                // Check for getObjectByUuidMapping or return false
                var object = $filter('filter')(uuidMap, {uuid: uuid})[0];
                if (!object) {
                    $log.error('Connections Factory [%s] -> getConnectionByUuid not found', uuid);
                    return false;
                }
            };

            /**
             * Save uuid Mapping to config file
             */
            var saveUuidMap = function () {
                $log.debug('Connections Factory -> Saving uuidMap');

                return ServerFactory.saveConfigToFile(uuidMap, 'applications/smanager/map.json', true, function () {
                    $log.debug('Connections Factory -> uuidMap saved successfully');
                }, function (data) {
                    $log.error('Connections Factory -> Error while saving uuidMap -> ', data.error);
                    toastr.error('Error while saving Uuid Map.', 'Infrastructure Manager');
                });

            };

            /**
             * Save node links to config file
             *
             * @param links {Array}
             */
            var saveLinksMap = function (links) {
                if (!links) throw new Error('links_not_found');

                $log.debug('Connections Factory -> Saving linksMap');

                angular.extend(linksMap, linksMap[0], links);

                return ServerFactory.saveConfigToFile(linksMap, 'applications/smanager/links.json', true, function () {
                    $log.debug('Connections Factory -> linksMap saved successfully');
                }, function (data) {
                    $log.error('Connections Factory -> Error while saving linksMap -> ', data.error);
                    toastr.error('Error while saving Links Map.', 'Infrastructure Manager');
                });

            };

            /**
             * Creates an Eval string to fast fetch recursive data from an uuid
             *
             * @params
             * uuid {String}
             * parent* {Number} Get 1st, 2nd, 3rd... parent object instead of all object
             */
            var getObjectByUuidMapping = function (uuid, parent) {
                if (!uuid) throw new Error('uuid_not_found');

                var object;
                var object_to_eval = '';

                // LEVEL 1
                object = $filter('filter')(uuidMap, {uuid: uuid})[0];
                if (!object) {
                    $log.error('Connections Factory [%s] -> getObjectByUuidMapping not found', uuid);
                    return false;
                }

                if (!parent) object_to_eval = object.object;

                for (var i = 0; i <= 3; i++) {
                    if (object.parent) {
                        object = $filter('filter')(uuidMap, {uuid: object.parent})[0];
                        if (!object) if (!object) {
                            $log.error('Connections Factory [%s] -> getObjectByUuidMapping parent not found', uuid);
                            return false;
                        }

                        if (i === 0 && parent >= 2) continue;
                        if (i === 1 && parent >= 3) continue;

                        object_to_eval = object.object + '.' + object_to_eval;
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

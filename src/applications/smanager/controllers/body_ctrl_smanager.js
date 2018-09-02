(function () {
    'use strict';
    smanagerApp.controller('smBodyController', ['$rootScope', '$scope', '$log', '$interval', '$timeout', 'smanagerFactory', 'connectionsFactory', 'cmanagerFactory', 'ServerFactory', 'ApplicationsFactory', 'modalFactory', '$filter', 'netappFactory', 'toastr',
        function ($rootScope, $scope, $log, $interval, $timeout, smanagerFactory, connectionsFactory, cmanagerFactory, ServerFactory, ApplicationsFactory, modalFactory, $filter, netappFactory, toastr) {

            var _this = this;
            var network_bandwidth_timer;
            var vcenter_vm_timer = [];

            this.activeConnection = null;
            this.parentConnection = null;
            this.showNewConnection = false;
            this.showNewConnectionType = true;
            this.showConfigureConnection = false;
            this.viewSide = true;
            this.seeMoreUpdates = false;
            this.Form = {
                autologin: false,
                save: true
            };
            this.cfgForm = {};
            this.smanagerConnect_form = {};
            this.connections = {
                standalone: [],
                virtual: [],
                storage: []
            };

            /**
             * Server monitoring
             */
            var doPing = function () {
                var host = _this.getActiveConnection().host;

                return ServerFactory.doPing(_this.activeConnection, host, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing doPing successfully -> host [%s]', _this.activeConnection, host);

                    data.data.data.category = 'smanager';
                    smanagerFactory.newData(data.data.data);
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while doPing -> host [%s] -> ', _this.activeConnection, host, data.error);
                });
            };
            var getKernel = function () {
                _this.loadingKernel = true;

                return ServerFactory.remoteGetKernel(_this.activeConnection, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing getKernel successfully', _this.activeConnection);

                    smanagerFactory.newData(data.data.data);
                    _this.loadingKernel = false;
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getKernel -> ', _this.activeConnection, data.error);
                });
            };
            var getRelease = function () {
                _this.loadingRelease = true;

                return ServerFactory.remoteGetRelease(_this.activeConnection, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing getRelease successfully', _this.activeConnection);

                    smanagerFactory.newData(data.data.data);
                    _this.loadingRelease = false;
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getRelease -> ', _this.activeConnection, data.error);
                });
            };
            var getCpu = function () {

                // Get data from vCenter if is a VM
                if (_this.getActiveConnection().vm) return;

                _this.loadingCpu = true;

                return ServerFactory.remoteGetCpu(_this.activeConnection, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing getCpu successfully', _this.activeConnection);

                    smanagerFactory.newData(data.data.data);
                    _this.loadingCpu = false;
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getCpu -> ', _this.activeConnection, data.error);
                });
            };
            var getMem = function () {

                // Get data from vCenter if is a VM
                if (_this.getActiveConnection().vm) return;

                _this.loadingMem = true;

                return ServerFactory.remoteGetMem(_this.activeConnection, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing getMem successfully', _this.activeConnection);

                    smanagerFactory.newData(data.data.data);
                    _this.loadingMem = false;
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getMem -> ', _this.activeConnection, data.error);
                });
            };
            var getDisk = function () {
                _this.loadingDisk = true;

                // Get data from vCenter if is a VM
                if (_this.getActiveConnection().vm) return;

                return ServerFactory.remoteGetDisk(_this.activeConnection, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing getDisk successfully', _this.activeConnection);

                    smanagerFactory.newData(data.data.data);
                    _this.loadingDisk = false;
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getDisk -> ', _this.activeConnection, data.error);
                });
            };
            var getUpdates = function () {
                _this.loadingUpdates = true;

                return ServerFactory.remoteGetUpdates(_this.activeConnection, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing getUpdates successfully', _this.activeConnection);

                    smanagerFactory.newData(data.data.data);
                    _this.loadingUpdates = false;
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getUpdates -> ', _this.activeConnection, data.error);
                });
            };
            var getProcesses = function () {
                _this.loadingProcess = true;

                return ServerFactory.remoteGetProcesses(_this.activeConnection, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing getProcesses successfully', _this.activeConnection);

                    smanagerFactory.newData(data.data.data);
                    _this.loadingProcess = false;
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getProcesses -> ', _this.activeConnection, data.error);
                });
            };
            var getInterfaces = function () {
                return ServerFactory.remoteGetInterfaces(_this.activeConnection, function (data) {
                    $log.debug('Infrastructure Manager [%s] -> Doing remoteGetInterfaces successfully', _this.activeConnection);

                    smanagerFactory.newData(data.data.data);

                    // Delete linux network interval
                    $interval.cancel(network_bandwidth_timer);

                    network_bandwidth_timer = $interval(function () {
                        getInterfaceBandwidth();
                    }, 1000);

                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getInterfaces -> ', _this.activeConnection, data.error);
                });
            };
            var getInterfaceBandwidth = function () {
                return ServerFactory.remoteGetInterfaceBandwidth(_this.activeConnection, 'ens160', function (data) {
                    // **Do not $log this because its launched every second.

                    smanagerFactory.newData(data.data.data);
                }, function (data) {
                    $log.error('Infrastructure Manager [%s] -> Error while getInterfaceBandwidth -> ', _this.activeConnection, data.error);
                });
            };

            /**
             * @description
             * Start monitoring a connection
             *
             * @param init* {Bool}
             */
            var initConnection = function (init) {
                if (_this.activeConnection == null) return;
                if (_this.getActiveConnection().state !== 'connected') return;

                $log.debug('Infrastructure Manager [%s] -> Initializing connection', _this.activeConnection);

                doPing();

                if (_this.getActiveConnection().so === 'linux') {
                    getKernel();
                    getRelease();
                    getCpu();
                    getMem();
                    getDisk();
                    getUpdates();
                    getProcesses();
                    if (init === false) return;
                    getInterfaces();
                }

                if (_this.getActiveConnection().so === 'snmp') {
                    angular.forEach(_this.getActiveConnection.oids, function (oid) {

                        return ServerFactory.remoteDoSnmp(_this.activeConnection, oid.oid, function (data) {
                            $log.debug('Infrastructure Manager [%s] -> Doing remoteDoSnmp successfully -> oid [%s]', _this.activeConnection, oid.oid);

                            console.log(oid.name + ':' + data.data.data.data);
                        }, function (data) {
                            $log.error('Infrastructure Manager [%s] -> Error while remoteDoSnmp -> oid [%s] -> ', _this.activeConnection, oid.oid, data.error);
                        });

                    });
                }
            };

            /**
             * Bindings
             */
            $scope.$watch(function () {
                return connectionsFactory.connections();
            }, function (newValue) {
                _this.connections = newValue;

                // Auto refresh vCenter VMs each 5 mins
                angular.forEach(_this.connections.virtual, function (connection) {

                    if (vcenter_vm_timer[connection.uuid]) return;

                    $log.debug('Infrastructure Manager [%s] -> Started interval for getVMs every 5 minutes -> vCenter [%s]', connection.uuid, connection.host);

                    vcenter_vm_timer[connection.uuid] = $interval(function () {
                        return smanagerFactory.getVMs(connection.uuid, true);
                    }, 1000 * 60 * 5);
                });
            });

            $scope.$watch(function () {
                return smanagerFactory.activeConnection();
            }, function (newValue) {
                if (newValue && angular.isFunction(newValue.then)) return;
                _this.activeConnection = newValue;

                initConnection();
            });

            $scope.$watch(function () {
                return smanagerFactory.parentConnection();
            }, function (newValue) {
                if (newValue && angular.isFunction(newValue.then)) return;
                _this.parentConnection = newValue;
            });

            $scope.$watch(function () {
                return cmanagerFactory.credentials();
            }, function (newValue) {
                _this.credentials = newValue;
            });

            $scope.$on(
                '$destroy',
                function () {

                    // Delete linux network interval
                    $interval.cancel(network_bandwidth_timer);

                    // Delete vCenter interval
                    angular.forEach(connectionsFactory.getConnectionByCategory('virtual'), function (connection) {
                        $interval.cancel(vcenter_vm_timer[connection.uuid]);
                    });
                }
            );

            /**
             * Called from smanagerActionController
             */
            $scope.$on('smanager__new_connection', function () {

                // Delete linux network interval
                $interval.cancel(network_bandwidth_timer);

                _this.newConnectionType();
            });

            $scope.$on('smanager__configure_connection', function () {
                _this.showConfigureConnection = true;
            });

            $scope.$on('smanager__disconnect_connection', function () {

                // Delete linux network interval
                $interval.cancel(network_bandwidth_timer);

                _this.Form = _this.getActiveConnection();
                connectionsFactory.disconnectConnection(_this.activeConnection);
                _this.showNewConnection = true;
            });

            $scope.$on('smanager__delete_connection', function () {

                // Delete linux network interval
                $interval.cancel(network_bandwidth_timer);

                // Delete vCenter interval
                var connection = connectionsFactory.getConnectionByUuid(_this.activeConnection);
                if (connection.category === 'virtual') {
                    $interval.cancel(vcenter_vm_timer[_this.activeConnection]);
                }

                _this.deleteConnection(_this.activeConnection);
            });

            $scope.$on('smanager__run_HIDS', function () {
                ServerFactory.runHIDS(_this.activeConnection);
            });

            $scope.$on('smanager__remote_refresh', function () {
                _this.remoteRefresh();
            });

            $scope.$on('smanager__connection_edit', function () {
                _this.editConnection();
            });

            /**
             * Called from smanagerFactory
             *
             * @param event* {String}
             * @param uuid* {String}
             */
            $scope.$on('smanager__connection_connected', function (event, uuid) {
                if (_this.activeConnection === uuid) initConnection();
                _this.Form = {
                    autologin: false,
                    save: true
                };
            });

            /**
             * ng-click functions
             */

            /**
             * @description
             * Toggles window side
             */
            this.toggleSide = function () {
                _this.viewSide = !_this.viewSide;
            };

            /**
             * @description
             * Opens Credential Manager Application
             */
            this.manageCredentials = function () {
                ApplicationsFactory.openApplication('cmanager').then(function () {
                    // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                    $timeout(function () {
                        ApplicationsFactory.toggleApplication('cmanager');
                    }, 0, false);
                });
            };

            /**
             * @description
             * Returns a connection object
             *
             * @param parent* {Number} If specified returns a parent object (hierarchy)
             */
            this.getActiveConnection = function (parent) {
                if (!_this.activeConnection) return null;

                var foundByUuid = connectionsFactory.getConnectionByUuid(_this.activeConnection);
                if (foundByUuid) return foundByUuid;

                if (!foundByUuid) {
                    var foundByUuidMapping = connectionsFactory.getObjectByUuidMapping(_this.activeConnection, parent, (_this.parentConnection ? _this.parentConnection : null));
                    if (foundByUuidMapping) return eval(foundByUuidMapping); // jshint ignore:line
                }

                return false;
            };

            /**
             * @description
             * Resets the DOM to show initial template
             */
            this.newConnectionType = function () {

                // Delete linux network interval
                $interval.cancel(network_bandwidth_timer);

                _this.setActiveConnection(null);

                _this.showStandalone = false;
                _this.showSnapshot = false;
                _this.showVm = false;
                _this.showVCenter = false;
                _this.showNewConnection = false;
                _this.showNewConnectionType = true;
            };

            /**
             * Shows connection Form in DOM to add a new connection
             *
             * @param so {String} [vmware, netapp, linux, windows, smtp]
             */
            this.newConnection = function (so) {
                _this.Form = {
                    so: so,
                    autologin: true,
                    save: (so === 'vmware' ? false : true),
                    port: (so === 'vmware' ? 443 : (so === 'netapp' ? 443 : (so === 'linux' ? 22 : 161)))
                };

                _this.showNewConnectionType = false;
                _this.showStandalone = false;
                _this.showSnapshot = false;
                _this.showVm = false;
                _this.showVCenter = false;
                _this.showNewConnection = true;
            };

            /**
             * @description
             * Shows connection Form in DOM to modify an existing connection
             *
             * @param uuid {String} connection uuid
             */
            this.editConnection = function (uuid) {
                $log.debug('Infrastructure Manager [%s] -> Received editConnection', uuid);

                // Delete linux network interval
                $interval.cancel(network_bandwidth_timer);

                if (uuid) smanagerFactory.setActiveConnection(uuid);

                // Wait for next digest circle before continue
                $timeout(function () {
                    _this.Form = _this.getActiveConnection();
                    _this.showStandalone = false;
                    _this.showSnapshot = false;
                    _this.showVm = false;
                    _this.showVCenter = false;
                    _this.showNewConnection = true;
                    _this.showNewConnectionType = false;
                }, 0, false);
            };

            /**
             * @description
             * Starts a new connection using connectionsFactory
             *
             * @param smanagerConnect_form {Object}
             */
            this.sendConnect = function (smanagerConnect_form) {
                _this.smanagerConnect_form.submitted = true;

                if (_this.Form.so === 'linux' || _this.Form.so === 'snmp') _this.Form.category = 'standalone';
                if (_this.Form.so === 'vmware') _this.Form.category = 'virtual';
                if (_this.Form.so === 'netapp') _this.Form.category = 'storage';

                if (smanagerConnect_form.$valid) {
                    _this.smanagerConnect_form.submitted = false;

                    // Delete linux network interval
                    $interval.cancel(network_bandwidth_timer);

                    // Fetch connection
                    var connection = connectionsFactory.connect(_this.Form);
                    smanagerFactory.setActiveConnection(connection.uuid);

                    _this.showNewConnection = false;

                    if (connection.category === 'standalone') _this.showStandalone = true;
                }
            };

            /**
             * @description
             * Refresh a connection by reconnection.
             *
             * @param connection {Object}
             */
            this.refreshConnection = function (connection) {
                $log.debug('Infrastructure Manager [%s] -> Received refreshConnection', connection.uuid);

                connection.refreshing = true;
                connectionsFactory.connect(connection);
                connection.refreshing = false;
            };

            /**
             * @description
             * Deletes an existent connection
             *
             * @param uuid {String}
             */
            this.deleteConnection = function (uuid) {
                $log.debug('Infrastructure Manager [%s] -> Received deleteConnection', uuid);

                smanagerFactory.setActiveConnection(uuid);

                // Wait for next digest circle before continue
                $timeout(function () {
                    var modalInstanceRemoveConnection = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                        {
                            title: function () {
                                return 'Delete connection ' + (_this.getActiveConnection().description ? _this.getActiveConnection().description : _this.getActiveConnection().host);
                            },
                            text: function () {
                                return 'Remove the selected connection from the inventory?';
                            }
                        }
                    );
                    modalInstanceRemoveConnection.result.then(function (res) {

                        if (res !== true) return;
                        $log.debug('Infrastructure Manager [%s] -> Deleting connection', uuid);

                        connectionsFactory.deleteConnection(uuid).then(function () {
                            toastr.success('Connection deleted.', 'Infrastructure Manager');
                        }).catch(function () {
                            toastr.error('Error while deleting connection.', 'Infrastructure Manager');
                        });
                        _this.newConnectionType();

                    });
                }, 0, false);
            };

            /**
             * @description
             * Sets connection as active/visible in DOM
             *
             * @param connection {Object,null}
             * @param type {String} [standalone, snapshot, vcenter, vm]
             * @param main_parent* {String}
             */
            this.setActiveConnection = function (connection, type, main_parent) {

                // Delete linux network interval
                $interval.cancel(network_bandwidth_timer);

                _this.showNewConnection = false;
                _this.showNewConnectionType = false;
                _this.showStandalone = false;
                _this.showSnapshot = false;
                _this.showVm = false;
                _this.showVCenter = false;

                if (connection === null) smanagerFactory.setActiveConnection(null);

                // Linux/Windows/SNMP
                if (type === 'standalone') {

                    // Is not connected or not initialized
                    if (connection.state !== 'connected') {
                        _this.showNewConnection = true;
                        _this.Form = connection;
                    } else {
                        _this.showStandalone = true;
                        // Not initialized connection
                    }

                    return smanagerFactory.setActiveConnection(connection.uuid);
                }

                if (type === 'snapshot') {
                    _this.showSnapshot = true;

                    // main_parent is used when exists more than 1 snapshot with the same uuid (for example snapmirror snapshots)
                    return smanagerFactory.setActiveConnection(connection['snapshot-version-uuid'], main_parent);
                }

                if (type === 'vm') {
                    _this.showVm = true;

                    return smanagerFactory.setActiveConnection(connection.config.uuid);
                }

                if (type === 'datastore') {
                    _this.showDatastore = true;

                    return smanagerFactory.setActiveConnection(connection.info.url);
                }

                if (type === 'vcenter') {
                    _this.showVCenter = true;

                    return smanagerFactory.setActiveConnection(connection.uuid);
                }

            };

            // TODO:
            this.getConnectionFolders = function (category) {
                var flags = [];
                var output = [];

                angular.forEach(_this.connections[category], function (connection) {
                    if (flags[connection.folder]) return;

                    flags[connection.folder] = true;
                    output.push(connection.folder);
                });

                return output;
            };

            /**
             * NETAPP MONITOR
             */
            this.getSnapshotFiles = function (uuid, host, vserver, volume, snapshot, path, xml) {
                return smanagerFactory.getSnapshotFiles(uuid, host, vserver, volume, snapshot, path, xml).then(function () {
                    $log.debug('Infrastructure Manager [%s] -> Doing getSnapshotFiles successfully -> snapshot [%s]', uuid, snapshot);
                }).catch(function (e) {
                    $log.error('Infrastructure Manager [%s] -> Error while getSnapshotFiles -> snapshot [%s] vm [%s] -> ', uuid, snapshot, e);

                    toastr.error(e, 'Get Storage Snapshot Files');
                });
            };

            this.getLinkByVMwareDatastore = function (virtual_uuid, datastore_name) {
                var link = smanagerFactory.getLinkByVMwareDatastore(virtual_uuid, datastore_name);

                if (link) return connectionsFactory.getConnectionByUuid(link.storage);
                return false;
            };

            /**
             * LINUX MONITOR
             */

            /**
             * @description
             * Shows or hides Updates table
             */
            this.toggleUpdates = function () {
                _this.seeMoreUpdates = !_this.seeMoreUpdates;
            };

            this.getCurrentCpu = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return 'N/A';
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().cpu)) return 0;

                return _this.getActiveConnection().cpu.filter(function (obj) {
                    return obj.option === 'Model name';
                })[0].data;
            };

            this.getCpuCores = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {

                    // Calculate total cores
                    return _this.getActiveConnection().config.hardware.numCPU * _this.getActiveConnection().config.hardware.numCoresPerSocket;
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().cpu)) return 0;

                return _this.getActiveConnection().cpu.filter(function (obj) {
                    return obj.option === 'CPU(s)';
                })[0].data;
            };

            this.getCpuLoad = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {

                    // Calculate used vs max
                    return (_this.getActiveConnection().summary.quickStats.overallCpuUsage / _this.getActiveConnection().runtime.maxCpuUsage * 100).toFixed(1);
                }

                // Standalone node
                if (angular.isUndefined(_this.connections)) return 0.0;
                if (angular.isUndefined(_this.getActiveConnection())) return 0.0;
                if (angular.isUndefined(_this.getActiveConnection().cpu)) return 0.0;

                return _this.getActiveConnection().cpu.filter(function (obj) {
                    return obj.option === 'Load average';
                })[0].data.split(' ')[0];
            };

            this.getMemoryType = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return 'N/A';
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().mem)) return 'N/A';

                return _this.getActiveConnection().mem[0].type;
            };

            this.getMemorySpeed = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return 'N/A';
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().mem)) return 'N/A';

                return _this.getActiveConnection().mem[0].speed;
            };

            this.getMemoryUsed = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return _this.getActiveConnection().summary.quickStats.guestMemoryUsage;
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().mem)) return 'N/A';

                return _this.getActiveConnection().mem[0].used;
            };

            this.getMemoryTotal = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return _this.getActiveConnection().config.hardware.memoryMB;
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().mem)) return 'N/A';

                return _this.getActiveConnection().mem[0].total;
            };

            this.getMemoryCache = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {

                    // VMWare don't care about OS Cached memory
                    return 0;
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().mem)) return 'N/A';

                return _this.getActiveConnection().mem[0].cache;
            };

            this.getMemoryFree = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {

                    // Calculate it
                    return _this.getActiveConnection().config.hardware.memoryMB - _this.getActiveConnection().summary.quickStats.guestMemoryUsage;
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().mem)) return 'N/A';

                return _this.getActiveConnection().mem[0].free;
            };

            this.getRelease = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return _this.getActiveConnection().summary.guest.guestFullName;
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().release)) return 'N/A';

                return _this.getActiveConnection().release;
            };

            this.getKernel = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return 'N/A';
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().kernel)) return 'N/A';

                return _this.getActiveConnection().kernel;
            };

            this.getUpdates = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return [];
                }

                // Standalone node
                if (angular.isUndefined(_this.getActiveConnection().updates)) return 'N/A';

                return _this.getActiveConnection().updates;
            };

            this.getAllDisks = function () {

                // Is a VM
                if (_this.getActiveConnection().vm) {
                    return _this.getActiveConnection().guest.disks;
                }

                // Standalone node
                return _this.getActiveConnection().disk;
            };

            // 1 extract first part
            // 2 extract second part
            this.extractSpace = function (string, type) {
                if (type === 1) {
                    return string.slice(0, -1);
                } else if (type === 2) {
                    return string.substr(string.length - 1) + 'iB';
                }
            };

            this.getCpuStatus = function () {
                if (angular.isUndefined(_this.connections)) return 'bg-primary-i';
                if (!_this.getActiveConnection().vm && !_this.getCpuLoad()) return 'bg-primary-i';

                var cpuLoad = _this.getCpuLoad().slice(0, -1);
                if (cpuLoad < 20) return 'bg-primary-i';
                if (cpuLoad < 80) return 'bg-success-i';
                if (cpuLoad < 90) return 'bg-warning-i';
                return 'bg-danger-i';
            };

            this.getMemStatus = function () {
                if (angular.isUndefined(_this.connections)) return 'bg-primary-i';
                if (!_this.getActiveConnection().vm && !_this.getMemoryFree()) return 'bg-primary-i';

                var memUsed = 100 - (_this.getMemoryFree() / _this.getMemoryTotal() * 100).toFixed(1);
                if (memUsed < 20) return 'bg-primary-i';
                if (memUsed < 80) return 'bg-success-i';
                if (memUsed < 90) return 'bg-warning-i';
                return 'bg-danger-i';
            };

            this.getDiskStatus = function (percent) {
                if (angular.isUndefined(_this.getAllDisks())) return [1, 'text-primary'];
                if (!_this.getActiveConnection().vm && !_this.getAllDisks()) return [1, 'text-primary'];

                var diskPercent = _this.extractSpace(percent, 1);
                if (diskPercent < 20) return [1, 'text-primary'];
                if (diskPercent < 80) return [2, 'text-success'];
                if (diskPercent < 90) return [3, 'text-warning'];
                return [4, 'text-danger'];
            };

            this.getUpdatesStatus = function () {
                if (angular.isUndefined(_this.connections)) return 'bg-primary-i';
                if (angular.isUndefined(_this.getUpdates())) return 'bg-primary-i';

                var totalUpdates = _this.getUpdates().length;
                if (totalUpdates < 1) return 'bg-primary-i';
                if (totalUpdates < 2) return 'bg-success-i';
                if (totalUpdates < 5) return 'bg-warning-i;';
                return 'bg-danger-i';
            };

            this.getMaxDiskStatus = function () {
                if (angular.isUndefined(_this.connections)) return ['bg-primary-i', 0];
                if (angular.isUndefined(_this.getAllDisks())) return ['bg-primary-i', 0];

                var status = 1;
                var percent = 0;

                angular.forEach(_this.getAllDisks(), function (disk) {
                    var current_percent = parseInt(_this.extractSpace(disk.used_percent, 1));
                    var current_disk_status = parseInt(_this.getDiskStatus(disk.used_percent)[0]);

                    if (current_disk_status > status) {
                        status = current_disk_status;
                    }
                    if (current_percent > percent) percent = current_percent;
                });

                if (status === 1) return ['bg-primary-i', percent];
                if (status === 2) return ['bg-success-i', percent];
                if (status === 3) return ['bg-warning-i', percent];
                return ['bg-danger-i', percent];
            };

            this.isSystemProcess = function (process) {
                return process.args.charAt(0) === '[';
            };

            /**
             * @description
             * Refresh connection monitor data
             *
             * @param type* {String}
             */
            this.remoteRefresh = function (type) {
                if (type === 'kernel') return getKernel();
                else if (type === 'release') return getRelease();
                else if (type === 'cpu') return getCpu();
                else if (type === 'mem') return getMem();
                else if (type === 'disk') return getDisk();
                else if (type === 'updates') return getUpdates();
                else if (type === 'processes') return getProcesses();
                else return initConnection(false);
            };

            /**
             * CONTEXT MENUS
             */
            this.storageContextMenu = [
                {
                    text: '<i class="fa fa-pencil"></i> Edit Connection',
                    click: function ($itemScope) {
                        _this.editConnection($itemScope.$parent.$parent.storage.uuid);
                    }
                },
                {
                    text: '<i class="fa fa-refresh"></i> Rescan Storage',
                    click: function ($itemScope) {
                        //TODO: delete current links
                        //TODO: delete current maps
                        _this.refreshConnection($itemScope.$parent.$parent.storage);
                    }
                },
                {
                    text: '<i class="fa fa-trash text-danger"></i> Delete Connection',
                    click: function ($itemScope) {
                        //TODO: delete current links
                        //TODO: delete current maps
                        _this.deleteConnection($itemScope.$parent.$parent.storage.uuid);
                    }
                }
            ];

            this.volumeContextMenu = [
                {
                    text: '<i class="fa fa-database"></i> Create Storage Snapshot',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Ask for create storage snapshot -> volume [%s]', $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid, $itemScope.$parent.$parent.volume['volume-id-attributes'].name);

                        smanagerFactory.setActiveConnection($itemScope.$parent.$parent.volume['volume-id-attributes'].uuid);

                        // Wait for next digest circle before continue
                        $timeout(function () {
                            var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                {
                                    title: function () {
                                        return 'Create storage snapshot';
                                    },
                                    text: function () {
                                        return 'Do you want to create a Storage snapshot for ' + $itemScope.$parent.$parent.volume['volume-id-attributes'].name + ' volume?';
                                    }
                                }
                            );
                            modalInstance.result.then(function (res) {

                                if (res !== true) return;
                                $log.debug('Infrastructure Manager [%s] -> Creating storage snapshot -> volume [%s]', $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid, $itemScope.$parent.$parent.volume['volume-id-attributes'].name);

                                modalFactory.openLittleModal('PLEASE WAIT', 'Creating volume snapshot', '.window--smanager .window__main', 'plain');

                                return netappFactory.createSnapshot(
                                    _this.getActiveConnection(2).credential,
                                    _this.getActiveConnection(2).host,
                                    _this.getActiveConnection(2).port,
                                    $itemScope.$parent.$parent.volume['volume-id-attributes']['owning-vserver-name'],
                                    $itemScope.$parent.$parent.volume['volume-id-attributes'].name
                                ).then(function (res) {
                                    if (res.status === 'error') {
                                        $log.error('Infrastructure Manager [%s] -> Error creating storage snapshot -> volume [%s] -> ', $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid, $itemScope.$parent.$parent.volume['volume-id-attributes'].name, res.error.reason);

                                        toastr.error(res.error.reason, 'Create Volume Snapshot');
                                        throw new Error('Failed to create Volume Snapshot');
                                    }

                                    $log.debug('Infrastructure Manager [%s] -> Storage snapshot created successfully -> volume [%s]', $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid, $itemScope.$parent.$parent.volume['volume-id-attributes'].name);

                                    modalFactory.closeModal('.window--smanager .window__main');
                                    toastr.success('Snapshot created successfully for volume ' + $itemScope.$parent.$parent.volume['volume-id-attributes'].name, 'Create Volume Snapshot');
                                });
                            });
                        }, 0, false);
                    }
                },
                null,
                {
                    text: '<i class="fa fa-file"></i> Rescan Volume',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Received Rescan Volume -> volume [%s]', $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid, $itemScope.$parent.$parent.volume['volume-id-attributes'].name);

                        //TODO: delete current links
                        //TODO: delete current maps

                        smanagerFactory.setActiveConnection($itemScope.$parent.$parent.volume['volume-id-attributes'].uuid);

                        // Wait for next digest circle before continue
                        $timeout(function () {
                            $itemScope.$parent.$parent.volume.refreshing = true;

                            return smanagerFactory.getVolumeData({
                                uuid: _this.getActiveConnection(2).uuid,
                                credential: _this.getActiveConnection(2).credential,
                                host: _this.getActiveConnection(2).host,
                                port: _this.getActiveConnection(2).port,
                                vserver_name: $itemScope.$parent.$parent.volume['volume-id-attributes']['owning-vserver-name'],
                                volume_name: $itemScope.$parent.$parent.volume['volume-id-attributes'].name,
                                volume_uuid: $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid
                            }).then(function () {
                                $log.debug('Infrastructure Manager [%s] -> Storage volume rescanned successfully -> volume [%s]', $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid, $itemScope.$parent.$parent.volume['volume-id-attributes'].name);

                                toastr.success('Rescan of volume ' + $itemScope.$parent.$parent.volume['volume-id-attributes'].name + ' was succesfully', 'Rescan volume');
                                $itemScope.$parent.$parent.volume.refreshing = false;
                            }).catch(function (e) {
                                $log.error('Infrastructure Manager [%s] -> Error while rescanning a volume -> volume [%s] -> ', $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid, $itemScope.$parent.$parent.volume['volume-id-attributes'].name, e);

                                toastr.error(e, 'Rescan volume');
                                $itemScope.$parent.$parent.volume.refreshing = false;
                            });
                        }, 0, false);

                    }
                }

            ];

            this.snapshotContextMenu = [
                {
                    text: '<i class="fa fa-database"></i> Mount as Datastore',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Ask for mount storage snapshot into a datastore -> snapshot [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

                        smanagerFactory.setActiveConnection($itemScope.snapshot['snapshot-instance-uuid']);

                        // Wait for next digest circle before continue
                        $timeout(function () {
                            var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                {
                                    title: function () {
                                        return 'Mount Snapshot as Datastore';
                                    },
                                    text: function () {
                                        return 'Do you want to mount the Storage Snapshot to an ESXi host?';
                                    }
                                }
                            );
                            modalInstance.result.then(function (res) {

                                if (res !== true) return;
                                ApplicationsFactory.openApplication('backupsm').then(function () {

                                    // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                    $timeout(function () {
                                        ApplicationsFactory.toggleApplication('backupsm');

                                        $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for mounting storage snapshot into a datastore -> snapshot [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

                                        var snapshots = _this.getActiveConnection(1).snapshots;
                                        if (!Array.isArray(snapshots)) snapshots = [snapshots];

                                        $rootScope.$broadcast('backupsm__mount_restore_datastore', {
                                            storage: _this.getActiveConnection(3),
                                            vserver: _this.getActiveConnection(2),
                                            volume: _this.getActiveConnection(1),
                                            snapshots: snapshots,
                                            snapshot: $itemScope.snapshot['snapshot-instance-uuid'],
                                            ESXihosts: smanagerFactory.getESXihosts()
                                        });
                                    }, 0, false);
                                });
                            });
                        }, 0, false);
                    }
                },
                {
                    text: '<i class="fa fa-file"></i> Restore Datastore files',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Ask for mount storage snapshot into a datastore to restore files -> snapshot [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

                        smanagerFactory.setActiveConnection($itemScope.snapshot['snapshot-instance-uuid']);

                        // Wait for next digest circle before continue
                        $timeout(function () {
                            var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                {
                                    title: function () {
                                        return 'Restore Datastore Files';
                                    },
                                    text: function () {
                                        return 'Do you want to mount the Storage Snapshot to an ESXi host and restore datastore files?';
                                    }
                                }
                            );
                            modalInstance.result.then(function (res) {

                                if (res !== true) return;
                                ApplicationsFactory.openApplication('backupsm').then(function () {

                                    // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                    $timeout(function () {
                                        ApplicationsFactory.toggleApplication('backupsm');

                                        $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for restoring a volume files -> snapshot [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

                                        var snapshots = _this.getActiveConnection(1).snapshots;
                                        if (!Array.isArray(snapshots)) snapshots = [snapshots];

                                        $rootScope.$broadcast('backupsm__restore_datastore_files', {
                                            storage: _this.getActiveConnection(3),
                                            vserver: _this.getActiveConnection(2),
                                            volume: _this.getActiveConnection(1),
                                            snapshots: snapshots,
                                            snapshot: $itemScope.snapshot['snapshot-instance-uuid'],
                                            ESXihosts: smanagerFactory.getESXihosts()
                                        });
                                    }, 0, false);
                                });
                            });
                        }, 0, false);

                    }
                },
                {
                    text: '<i class="fa fa-trash"></i> Delete Storage SnapShot',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Ask for delete storage snapshot -> snapshot [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

                        smanagerFactory.setActiveConnection($itemScope.snapshot['snapshot-instance-uuid']);

                        // Wait for next digest circle before continue
                        $timeout(function () {
                            var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                {
                                    title: function () {
                                        return 'Delete storage snapshot';
                                    },
                                    text: function () {
                                        return 'Do you want to delete the storage snapshot ' + $itemScope.snapshot.name + '?';
                                    }
                                }
                            );
                            modalInstance.result.then(function (res) {

                                if (res !== true) return;
                                $log.debug('Infrastructure Manager [%s] -> Deleting storage snapshot -> snapshot [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name);

                                modalFactory.openLittleModal('PLEASE WAIT', 'Deleting volume snapshot', '.window--smanager .window__main', 'plain');

                                return netappFactory.deleteSnapshot(
                                    _this.getActiveConnection(3).credential,
                                    _this.getActiveConnection(3).host,
                                    _this.getActiveConnection(3).port,
                                    _this.getActiveConnection(2)['vserver-name'],
                                    _this.getActiveConnection(1)['volume-id-attributes'].name,
                                    $itemScope.snapshot.name,
                                    $itemScope.snapshot['snapshot-instance-uuid']
                                ).then(function (res) {
                                    if (res.status === 'error') {
                                        $log.error('Infrastructure Manager [%s] -> Error deleting storage snapshot -> snapshot [%s], volume [%s] -> ', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name, _this.getActiveConnection(1)['volume-id-attributes'].name, res.error.reason);

                                        toastr.error(res.error.reason, 'Delete Storage Snapshot');
                                        throw new Error('Failed to delete Storage Snapshot');
                                    }

                                    $log.debug('Infrastructure Manager [%s] -> Storage snapshot deleted successfully -> snapshot [%s], volume [%s]', $itemScope.snapshot['snapshot-instance-uuid'], $itemScope.snapshot.name, _this.getActiveConnection(1)['volume-id-attributes'].name);

                                    modalFactory.closeModal('.window--smanager .window__main');
                                    toastr.success('Snapshot ' + $itemScope.snapshot.name + ' deleted successfully for volume ' + _this.getActiveConnection(1)['volume-id-attributes'].name, 'Delete Volume Snapshot');
                                });
                            });
                        }, 0, false);
                    }
                }

            ];

            this.snapshotVMContextMenu = [
                {
                    text: '<i class="fa fa-server"></i> Instant VM',
                    click: function ($itemScope) {

                        // Not linked VM
                        if ($itemScope.vm.vm === null) {

                            $itemScope.vm.vm = {
                                vm: 'unknown',
                                name: $itemScope.vm.name,
                                summary: {
                                    config: {
                                        vmPathName: '[' + _this.getActiveConnection(1)['volume-id-attributes'].name + '] ' + $itemScope.vm.path
                                    }
                                }
                            };
                        }

                        $log.debug('Infrastructure Manager [%s] -> Ask for Instant VM recovery -> vm [%s]', $itemScope.vm.vm.vm, $itemScope.vm.name);

                        var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                            {
                                title: function () {
                                    return 'Instant VM recovery';
                                },
                                text: function () {
                                    return 'Do you want to perform an Instant VM recovery of ' + $itemScope.vm.name + '?';
                                }
                            }
                        );
                        modalInstance.result.then(function (res) {

                            if (res !== true) return;
                            ApplicationsFactory.openApplication('backupsm').then(function () {

                                // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                $timeout(function () {
                                    ApplicationsFactory.toggleApplication('backupsm');

                                    $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for Instant VM recovery -> vm [%s]', $itemScope.vm.vm.vm, $itemScope.vm.name);

                                    $rootScope.$broadcast('backupsm__vm_instant_recovery', {
                                        storage: _this.getActiveConnection(3),
                                        vserver: _this.getActiveConnection(2),
                                        volume: _this.getActiveConnection(1),
                                        snapshots: [_this.getActiveConnection()],
                                        snapshot: _this.getActiveConnection()['snapshot-instance-uuid'],
                                        ESXihosts: smanagerFactory.getESXihosts(),
                                        vm: $itemScope.vm.vm
                                    });
                                }, 0, false);
                            });
                        });
                    }
                },
                ['<i class="fa fa-server"></i> Restore entire VM', function ($itemScope) {
                    $log.debug('Infrastructure Manager [%s] -> Ask for restore entire VM -> vm [%s]', $itemScope.vm.vm.vm, $itemScope.vm.name);

                    if ($itemScope.vm.vm === null) {
                        return modalFactory.openLittleModal('Error while restoring Backup', 'Not found any linked VirtualMachine for ' + $itemScope.vm.name + ', maybe original VM was deleted from vCenter. Try doing an Instant VM restore', '.window--smanager .window__main', 'plain');
                    }

                    var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                        {
                            title: function () {
                                return 'Restore entire VM';
                            },
                            text: function () {
                                return 'Do you want to perform a entire VM restore of ' + $itemScope.vm.name + '?';
                            }
                        }
                    );
                    modalInstance.result.then(function (res) {

                        if (res !== true) return;
                        ApplicationsFactory.openApplication('backupsm').then(function () {

                            // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                            $timeout(function () {
                                ApplicationsFactory.toggleApplication('backupsm');

                                $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for restore entire VM -> vm [%s]', $itemScope.vm.vm.vm, $itemScope.vm.name);

                                $rootScope.$broadcast('backupsm__restore_vm', {
                                    storage: _this.getActiveConnection(3),
                                    vserver: _this.getActiveConnection(2),
                                    volume: _this.getActiveConnection(1),
                                    snapshots: [_this.getActiveConnection()],
                                    snapshot: _this.getActiveConnection()['snapshot-instance-uuid'],
                                    ESXihosts: smanagerFactory.getESXihosts(),
                                    vm: $itemScope.vm.vm,
                                    current_location: {
                                        uuid: $itemScope.vm.virtual,
                                        credential: connectionsFactory.getConnectionByUuid($itemScope.vm.virtual).credential,
                                        host: connectionsFactory.getConnectionByUuid($itemScope.vm.virtual).host,
                                        port: connectionsFactory.getConnectionByUuid($itemScope.vm.virtual).port
                                    }
                                });
                            }, 0, false);
                        });
                    });
                }],
                {
                    text: '<i class="fa fa-files"></i> Restore Guest files',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Ask for recovery VM Guest Files -> vm [%s]', $itemScope.vm.vm.vm, $itemScope.vm.name);

                        var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                            {
                                title: function () {
                                    return 'Instant VM recovery';
                                },
                                text: function () {
                                    return 'Do you want to perform a VM Guest Files recovery of ' + $itemScope.vm.name + '?';
                                }
                            }
                        );
                        modalInstance.result.then(function (res) {

                            if (res !== true) return;
                            ApplicationsFactory.openApplication('backupsm').then(function () {

                                // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                $timeout(function () {
                                    ApplicationsFactory.toggleApplication('backupsm');

                                    $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for recovery VM Guest Files -> vm [%s]', $itemScope.vm.vm.vm, $itemScope.vm.name);

                                    $rootScope.$broadcast('backupsm__restore_vm_guest_files', {
                                        storage: _this.getActiveConnection(3),
                                        vserver: _this.getActiveConnection(2),
                                        volume: _this.getActiveConnection(1),
                                        snapshots: [_this.getActiveConnection()],
                                        snapshot: _this.getActiveConnection()['snapshot-instance-uuid'],
                                        ESXihosts: smanagerFactory.getESXihosts(),
                                        vm: $itemScope.vm.vm
                                    });
                                }, 0, false);
                            });
                        });
                    }
                }
            ];

            this.virtualContextMenu = [
                {
                    text: '<i class="fa fa-pencil"></i> Edit Connection',
                    click: function ($itemScope) {
                        _this.editConnection($itemScope.$parent.$parent.virtual.uuid);
                    }
                },
                {
                    text: '<i class="fa fa-refresh"></i> Rescan vCenter',
                    click: function ($itemScope) {
                        //TODO: delete current links
                        //TODO: delete current maps
                        _this.refreshConnection($itemScope.$parent.$parent.virtual);
                    }
                },
                {
                    text: '<i class="fa fa-trash text-danger"></i> Delete Connection',
                    click: function ($itemScope) {
                        _this.deleteConnection($itemScope.$parent.$parent.virtual.uuid);
                    }
                }
            ];

            this.VMContextMenu = [
                ['<i class="fa fa-power-off"></i> Power', function ($itemScope) {
                },
                    [
                        ['<i class="fa fa-play text-success"></i> Power On', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for Power ON VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Power ON VM';
                                        },
                                        text: function () {
                                            return 'Do you want to Power ON ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;
                                    $log.debug('Infrastructure Manager [%s] -> Powering ON VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                    var credential = _this.getActiveConnection(1).credential;
                                    var host = _this.getActiveConnection(1).host;
                                    var port = _this.getActiveConnection(1).port;
                                    return smanagerFactory.powerOnVM(credential, host, port, $itemScope.vm.vm).then(function () {
                                        $log.debug('Infrastructure Manager [%s] -> Doing powerOnVM successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                        return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1));// jshint ignore:line
                                    }).catch(function (e) {
                                        $log.error('Infrastructure Manager [%s] -> Error while powerOnVM -> vm [%s] -> ', $itemScope.vm.vm, $itemScope.vm.name, e);

                                        toastr.error(e, 'Power ON VM');
                                    });
                                });
                            }, 0, false);
                        }],
                        ['<i class="fa fa-stop text-danger"></i> Power Off', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for Power OFF VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Power OFF VM';
                                        },
                                        text: function () {
                                            return 'Do you want to Power OFF ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;
                                    $log.debug('Infrastructure Manager [%s] -> Powering OFF VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                    var credential = _this.getActiveConnection(1).credential;
                                    var host = _this.getActiveConnection(1).host;
                                    var port = _this.getActiveConnection(1).port;
                                    return smanagerFactory.powerOffVM(credential, host, port, $itemScope.vm.vm).then(function () {
                                        $log.debug('Infrastructure Manager [%s] -> Doing powerOffVM successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                        return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1));// jshint ignore:line
                                    }).catch(function (e) {
                                        $log.error('Infrastructure Manager [%s] -> Error while powerOffVM -> vm [%s] -> ', $itemScope.vm.vm, $itemScope.vm.name, e);

                                        toastr.error(e, 'Power OFF VM');
                                    });
                                });
                            }, 0, false);
                        }],
                        ['<i class="fa fa-pause text-warning"></i> Suspend', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for Suspend VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Suspend VM';
                                        },
                                        text: function () {
                                            return 'Do you want to Suspend ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;
                                    $log.debug('Infrastructure Manager [%s] -> Suspending VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                    var credential = _this.getActiveConnection(1).credential;
                                    var host = _this.getActiveConnection(1).host;
                                    var port = _this.getActiveConnection(1).port;
                                    return smanagerFactory.suspendVM(credential, host, port, $itemScope.vm.vm).then(function () {
                                        $log.debug('Infrastructure Manager [%s] -> Doing suspendVM successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                        return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1));// jshint ignore:line
                                    }).catch(function (e) {
                                        $log.error('Infrastructure Manager [%s] -> Error while suspendVM -> vm [%s] -> ', $itemScope.vm.vm, $itemScope.vm.name, e);

                                        toastr.error(e, 'Suspend VM');
                                    });
                                });
                            }, 0, false);
                        }],
                        ['<i class="fa fa-refresh"></i> Reset', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for Reset VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Reset VM';
                                        },
                                        text: function () {
                                            return 'Do you want to Reset ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;
                                    $log.debug('Infrastructure Manager [%s] -> Resetting VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                    var credential = _this.getActiveConnection(1).credential;
                                    var host = _this.getActiveConnection(1).host;
                                    var port = _this.getActiveConnection(1).port;
                                    return smanagerFactory.resetVM(credential, host, port, $itemScope.vm.vm).then(function () {
                                        $log.debug('Infrastructure Manager [%s] -> Doing resetVM successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                        return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1));// jshint ignore:line
                                    }).catch(function (e) {
                                        $log.error('Infrastructure Manager [%s] -> Error while resetVM -> vm [%s] -> ', $itemScope.vm.vm, $itemScope.vm.name, e);

                                        toastr.error(e, 'Reset VM');
                                    });
                                });
                            }, 0, false);
                        }],
                        null,
                        ['<i class="fa fa-stop text-danger"></i> Shut Down Guest OS', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for Shut Down Guest OS -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Shut Down Guest OS';
                                        },
                                        text: function () {
                                            return 'Do you want to Shut Down Guest OS ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;
                                    $log.debug('Infrastructure Manager [%s] -> Shutting Down Guest OS -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                    var credential = _this.getActiveConnection(1).credential;
                                    var host = _this.getActiveConnection(1).host;
                                    var port = _this.getActiveConnection(1).port;
                                    return smanagerFactory.shutdownGuest(credential, host, port, $itemScope.vm.vm).then(function () {
                                        $log.debug('Infrastructure Manager [%s] -> Doing shutdownGuest successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                        return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1));// jshint ignore:line
                                    }).catch(function (e) {
                                        $log.error('Infrastructure Manager [%s] -> Error while shutdownGuest -> vm [%s] -> ', $itemScope.vm.vm, $itemScope.vm.name, e);

                                        toastr.error(e, 'Shut Down Guest OS');
                                    });
                                });
                            }, 0, false);
                        }],
                        ['<i class="fa fa-refresh"></i> Restart Guest OS', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for Restart Guest OS -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Restart Guest OS';
                                        },
                                        text: function () {
                                            return 'Do you want to Restart Guest OS ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;
                                    $log.debug('Infrastructure Manager [%s] -> Restarting Guest OS -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                    var credential = _this.getActiveConnection(1).credential;
                                    var host = _this.getActiveConnection(1).host;
                                    var port = _this.getActiveConnection(1).port;
                                    return smanagerFactory.rebootGuest(credential, host, port, $itemScope.vm.vm).then(function () {
                                        $log.debug('Infrastructure Manager [%s] -> Doing rebootGuest successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                        return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1));// jshint ignore:line
                                    }).catch(function (e) {
                                        $log.error('Infrastructure Manager [%s] -> Error while rebootGuest -> vm [%s] -> ', $itemScope.vm.vm, $itemScope.vm.name, e);

                                        toastr.error(e, 'Restart Guest OS');
                                    });
                                });
                            }, 0, false);
                        }]
                    ]
                ],
                {
                    text: '<i class="fa fa-television"></i> Open Remote Console',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Opening Remote Console APP -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                        smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                        ApplicationsFactory.openApplication('wmks').then(function () {

                            // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                            $timeout(function () {
                                ApplicationsFactory.toggleApplication('wmks');

                                $rootScope.$broadcast('wmks__new_data', {
                                    vm: $itemScope.vm.vm,
                                    host: _this.getActiveConnection(1).host,
                                    port: _this.getActiveConnection(1).port,
                                    credential: _this.getActiveConnection(1).credential
                                });
                            }, 0, false);
                        });
                    }
                },
                null,
                ['<i class="fa fa-server"></i> Restore', function ($itemScope) {
                    // Code
                },
                    [
                        ['<i class="fa fa-server"></i> Instant VM', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for Instant VM recovery -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Instant VM recovery';
                                        },
                                        text: function () {
                                            return 'Do you want to perform an Instant VM recovery of ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;
                                    ApplicationsFactory.openApplication('backupsm').then(function () {

                                        // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                        $timeout(function () {
                                            ApplicationsFactory.toggleApplication('backupsm');

                                            $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for Instant VM recovery -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                            $rootScope.$broadcast('backupsm__vm_instant_recovery', {
                                                storage: connectionsFactory.getConnectionByUuid(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).storage),
                                                /* jshint ignore:start */
                                                vserver: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).vserver)),
                                                volume: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).volume)),
                                                snapshots: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).volume)).snapshots, //TODO: if only 1 snapshot this will be an object --> conver to array. TODO: some snapshots could not contain this VM
                                                /* jshint ignore:end */
                                                snapshot: '',
                                                ESXihosts: smanagerFactory.getESXihosts(),
                                                vm: $itemScope.vm
                                            });
                                        }, 0, false);
                                    });
                                });
                            }, 0, false);
                        }],
                        ['<i class="fa fa-server"></i> Restore entire VM', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for restore entire VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Restore entire VM';
                                        },
                                        text: function () {
                                            return 'Do you want to perform a entire VM restore of ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;

                                    // Refresh VM info before continue
                                    $log.debug('Infrastructure Manager [%s] -> Refreshing VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);
                                    $itemScope.vm.refreshing = true;

                                    return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1)).then(function () {// jshint ignore:line
                                        $log.debug('Infrastructure Manager [%s] -> Doing refreshVM successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);
                                        $itemScope.vm.refreshing = false;

                                        return ApplicationsFactory.openApplication('backupsm');

                                    }).then(function () {

                                        // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                        $timeout(function () {
                                            ApplicationsFactory.toggleApplication('backupsm');

                                            $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for restore entire VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                            $rootScope.$broadcast('backupsm__restore_vm', {
                                                storage: connectionsFactory.getConnectionByUuid(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).storage),
                                                /* jshint ignore:start */
                                                vserver: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).vserver)),
                                                volume: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).volume)),
                                                snapshots: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).volume)).snapshots, //TODO: if only 1 snapshot this will be an object --> conver to array. TODO: some snapshots could not contain this VM
                                                /* jshint ignore:end */
                                                snapshot: '',
                                                ESXihosts: smanagerFactory.getESXihosts(),
                                                vm: $itemScope.vm,
                                                current_location: {
                                                    uuid: _this.getActiveConnection(1).uuid,
                                                    credential: _this.getActiveConnection(1).credential,
                                                    host: _this.getActiveConnection(1).host,
                                                    port: _this.getActiveConnection(1).port
                                                }
                                            });
                                        }, 0, false);
                                    });
                                });
                            }, 0, false);
                        }],
                        ['<i class="fa fa-server"></i> Restore Guest Files', function ($itemScope) {
                            $log.debug('Infrastructure Manager [%s] -> Ask for recovery VM Guest Files -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                            smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                            // Wait for next digest circle before continue
                            $timeout(function () {
                                var modalInstance = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                                    {
                                        title: function () {
                                            return 'Instant VM recovery';
                                        },
                                        text: function () {
                                            return 'Do you want to perform a VM Guest Files recovery of ' + $itemScope.vm.name + '?';
                                        }
                                    }
                                );
                                modalInstance.result.then(function (res) {

                                    if (res !== true) return;
                                    ApplicationsFactory.openApplication('backupsm').then(function () {

                                        // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                        $timeout(function () {
                                            ApplicationsFactory.toggleApplication('backupsm');

                                            $log.debug('Infrastructure Manager [%s] -> Launching Backups Manager for recovery VM Guest Files -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                                            $rootScope.$broadcast('backupsm__restore_vm_guest_files', {
                                                storage: connectionsFactory.getConnectionByUuid(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).storage),
                                                /* jshint ignore:start */
                                                vserver: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).vserver)),
                                                volume: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).volume)),
                                                snapshots: eval(connectionsFactory.getObjectByUuidMapping(smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name).volume)).snapshots, //TODO: if only 1 snapshot this will be an object --> conver to array. TODO: some snapshots could not contain this VM
                                                /* jshint ignore:end */
                                                snapshot: '',
                                                ESXihosts: smanagerFactory.getESXihosts(),
                                                vm: $itemScope.vm,
                                                current_location: {
                                                    uuid: _this.getActiveConnection(1).uuid,
                                                    credential: _this.getActiveConnection(1).credential,
                                                    host: _this.getActiveConnection(1).host,
                                                    port: _this.getActiveConnection(1).port
                                                }
                                            });
                                        }, 0, false);
                                    });
                                });
                            }, 0, false);
                        }]
                    ]
                ],
                {
                    text: '<i class="fa fa-server"></i> Backup',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Launching VM Backup -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                        smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                        // Wait for next digest circle before continue
                        $timeout(function () {

                            // Refresh VM info before continue
                            $log.debug('Infrastructure Manager [%s] -> Refreshing VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);
                            $itemScope.vm.refreshing = true;

                            return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1)).then(function () {// jshint ignore:line
                                $log.debug('Infrastructure Manager [%s] -> Doing refreshVM successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);
                                $itemScope.vm.refreshing = false;

                                if (!smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name)) {
                                    return modalFactory.openLittleModal('Error while creating Backup', 'Not found any compatible NetApp storage. Make sure VMs that you want to backup are inside a NetApp volume and this is managed by SysOS.', '.window--smanager .window__main', 'plain');
                                }

                                return ApplicationsFactory.openApplication('backupsm');

                            }).then(function () {

                                // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                $timeout(function () {
                                    ApplicationsFactory.toggleApplication('backupsm');

                                    $rootScope.$broadcast('backupsm__backup_vm', {
                                        vm: $itemScope.vm,
                                        connection: _this.getActiveConnection(1)
                                    });
                                }, 0, false);

                            }).catch(function (e) {
                                $log.error('Infrastructure Manager [%s] -> Error while refreshVM -> vm [%s] -> ', $itemScope.vm.vm, $itemScope.vm.name, e);

                                toastr.error(e, 'Refresh VM');
                                $itemScope.vm.refreshing = false;
                            });

                        }, 0, false);
                    }
                },
                null,
                {
                    text: '<i class="fa fa-refresh"></i> Refresh',
                    click: function ($itemScope) {
                        $log.debug('Infrastructure Manager [%s] -> Refreshing VM -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);

                        smanagerFactory.setActiveConnection($itemScope.vm.config.uuid);

                        // Wait for next digest circle before continue
                        $timeout(function () {
                            $itemScope.vm.refreshing = true;

                            return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1)).then(function () {// jshint ignore:line
                                $log.debug('Infrastructure Manager [%s] -> Doing refreshVM successfully -> vm [%s]', $itemScope.vm.vm, $itemScope.vm.name);
                                $itemScope.vm.refreshing = false;
                            }).catch(function (e) {
                                $log.error('Infrastructure Manager [%s] -> Error while refreshVM -> vm [%s] -> ', $itemScope.vm.vm, $itemScope.vm.name, e);

                                toastr.error(e, 'Refresh VM');
                                $itemScope.vm.refreshing = false;
                            });
                        }, 0, false);
                    }
                }
            ];

            this.datastoreContextMenu = [
                {
                    text: '<i class="fa fa-file"></i> Show datastore files',
                    click: function ($itemScope) {

                        smanagerFactory.setActiveConnection($itemScope.datastore.info.url);

                        // Wait for next digest circle before continue
                        $timeout(function () {

                            console.log($itemScope);
                            console.log(_this.getActiveConnection(1));

                            // Open Datastore Brower application
                            ApplicationsFactory.openApplication('datastoreexplorer').then(function () {
                                // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                                $timeout(function () {
                                    ApplicationsFactory.toggleApplication('datastoreexplorer');
                                }, 0, false);
                            });

                            $timeout(function () {
                                $rootScope.$broadcast('datastoreexplorer__restore_datastore_files', {
                                    credential: _this.getActiveConnection(1).credential,
                                    host: _this.getActiveConnection(1).host,
                                    port: _this.getActiveConnection(1).port,
                                    id: $itemScope.datastore.obj.name,
                                    name: $itemScope.datastore.name
                                });
                            }, 100);

                        }, 0, false);

                    }
                }
            ];
        }]);
}());
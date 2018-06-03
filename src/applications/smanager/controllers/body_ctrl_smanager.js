(function () {
    'use strict';
    smanagerApp.controller('smBodyController', ['$rootScope', '$scope', '$interval', '$timeout', 'smanagerFactory', 'connectionsFactory', 'cmanagerFactory', 'ServerFactory', 'ApplicationsFactory', 'modalFactory', '$filter', 'netappFactory', 'toastr',
        function ($rootScope, $scope, $interval, $timeout, smanagerFactory, connectionsFactory, cmanagerFactory, ServerFactory, ApplicationsFactory, modalFactory, $filter, netappFactory, toastr) {

            var _this = this;
            var network_bandwidth_timer;

            this.activeConnection = null;
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

            /*
             * INIT
             */
            var doPing = function () {
                return ServerFactory.doPing(_this.activeConnection, _this.getActiveConnection().host, function (data) {
                    data.data.data.category = 'smanager';
                    smanagerFactory.newData(data.data.data);
                }, function () {

                });
            };
            var getKernel = function () {
                _this.loadingKernel = true;
                return ServerFactory.remoteGetKernel(_this.activeConnection, function (data) {
                    smanagerFactory.newData(data.data.data);
                    _this.loadingKernel = false;
                }, function () {

                });
            };
            var getRelease = function () {
                _this.loadingRelease = true;
                return ServerFactory.remoteGetRelease(_this.activeConnection, function (data) {
                    smanagerFactory.newData(data.data.data);
                    _this.loadingRelease = false;
                }, function () {

                });
            };
            var getCpu = function () {
                _this.loadingCpu = true;
                return ServerFactory.remoteGetCpu(_this.activeConnection, function (data) {
                    smanagerFactory.newData(data.data.data);
                    _this.loadingCpu = false;
                }, function () {

                });
            };
            var getMem = function () {
                _this.loadingMem = true;
                return ServerFactory.remoteGetMem(_this.activeConnection, function (data) {
                    smanagerFactory.newData(data.data.data);
                    _this.loadingMem = false;
                }, function () {

                });
            };
            var getDisk = function () {
                _this.loadingDisk = true;
                return ServerFactory.remoteGetDisk(_this.activeConnection, function (data) {
                    smanagerFactory.newData(data.data.data);
                    _this.loadingDisk = false;
                }, function () {

                });
            };
            var getUpdates = function () {
                _this.loadingUpdates = true;
                return ServerFactory.remoteGetUpdates(_this.activeConnection, function (data) {
                    smanagerFactory.newData(data.data.data);
                    _this.loadingUpdates = false;
                }, function () {

                });
            };
            var getProcesses = function () {
                _this.loadingProcess = true;
                return ServerFactory.remoteGetProcesses(_this.activeConnection, function (data) {
                    smanagerFactory.newData(data.data.data);
                    _this.loadingProcess = false;
                }, function () {

                });
            };
            var getInterfaces = function () {
                return ServerFactory.remoteGetInterfaces(_this.activeConnection, function (data) {
                    smanagerFactory.newData(data.data.data);

                    $interval.cancel(network_bandwidth_timer);
                    network_bandwidth_timer = $interval(function () {
                        getInterfaceBandwidth();
                    }, 1000);

                }, function () {

                });
            };
            var getInterfaceBandwidth = function () {
                return ServerFactory.remoteGetInterfaceBandwidth(_this.activeConnection, 'ens160', function (data) {
                    smanagerFactory.newData(data.data.data);
                }, function () {

                });
            };

            var initConnection = function (init) {
                if (_this.activeConnection == null) return;
                if (_this.getActiveConnection().type !== 'connected') return;
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
                            console.log(oid.name + ':' + data.data.data.data);
                        }, function () {

                        });

                    });
                }
            };

            /*
             * Bindings
             */

            $scope.$watch(function () {
                return connectionsFactory.connections();
            }, function (newValue) {
                _this.connections = newValue;
            });

            $scope.$watch(function () {
                return smanagerFactory.activeConnection();
            }, function (newValue) {
                _this.activeConnection = newValue;
                initConnection();
            });

            $scope.$watch(function () {
                return cmanagerFactory.credentials();
            }, function (newValue) {
                _this.credentials = newValue;
            });

            $scope.$on(
                '$destroy',
                function () {
                    $interval.cancel(network_bandwidth_timer);
                }
            );

            /*
             * Called at smanagerActionController
             */
            $scope.$on('smanager__new_connection', function () {
                $interval.cancel(network_bandwidth_timer);
                _this.newConnectionType();
            });

            /*
             * Called at smanagerActionController
             */
            $scope.$on('smanager__configure_connection', function () {
                _this.showConfigureConnection = true;
            });

            /*
             * Called at smanagerActionController
             */
            $scope.$on('smanager__disconnect_connection', function () {
                $interval.cancel(network_bandwidth_timer);
                _this.Form = _this.getActiveConnection();
                connectionsFactory.disconnectConnection(_this.activeConnection);
                _this.showNewConnection = true;
            });

            /*
             * Called at smanagerActionController
             */
            $scope.$on('smanager__delete_connection', function () {
                $interval.cancel(network_bandwidth_timer);
                _this.deleteConnection(_this.activeConnection.uuid);
            });

            /*
             * Called at smanagerActionController
             */
            $scope.$on('smanager__run_HIDS', function () {
                ServerFactory.runHIDS(_this.activeConnection);
            });

            /*
             * Called at smanagerActionController
             */
            $scope.$on('smanager__remote_refresh', function () {
                _this.remoteRefresh();
            });

            /*
             * Called at smanagerActionController
             */
            $scope.$on('smanager__connection_edit', function () {
                _this.editConnection();
            });

            /*
             * Called at smanagerActionController
             */
            $scope.$on('smanager__connection_connected', function (event, uuid) {
                if (_this.activeConnection === uuid) initConnection();
                _this.Form = {
                    autologin: false,
                    save: true
                };
            });

            /*
             * ng-click functions
             */
            this.toggleSide = function () {
                _this.viewSide = !_this.viewSide;
            };

            this.manageCredentials = function () {
                ApplicationsFactory.openApplication('cmanager');
                ApplicationsFactory.toggleApplication('cmanager');
            };

            this.findByUuid = function (o, uuid) {
                //Early return
                if (o.uuid === uuid) {
                    return o;
                }
                var result, p;
                for (p in o) {
                    if (o.hasOwnProperty(p) && typeof o[p] === 'object' && o[p] != null) {
                        result = _this.findByUuid(o[p], uuid);
                        if (result) {
                            return result;
                        }
                    }
                }
                return result;
            };

            this.getActiveConnection = function (parent) {
                if (!_this.activeConnection) return null;

                var filter_standalone = $filter('filter')(_this.connections.standalone, {uuid: _this.activeConnection})[0];
                var filter_virtual = $filter('filter')(_this.connections.virtual, {uuid: _this.activeConnection})[0];
                var filter_storage = $filter('filter')(_this.connections.storage, {uuid: _this.activeConnection})[0];

                if (filter_standalone) return filter_standalone;
                if (filter_virtual) return filter_virtual;
                if (filter_storage) return filter_storage;

                var foundByUuidMapping = connectionsFactory.getObjectByUuidMapping(_this.activeConnection, parent);
                if (foundByUuidMapping) return eval(foundByUuidMapping); // jshint ignore:line

                return false;
            };

            this.newConnectionType = function () {
                $interval.cancel(network_bandwidth_timer);

                smanagerFactory.setActiveConnection(null);

                _this.showStandalone = false;
                _this.showSnapshot = false;
                _this.showVm = false;
                _this.showVCenter = false;
                _this.showNewConnection = false;
                _this.showNewConnectionType = true;
            };

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

            this.editConnection = function (uuid) {
                $interval.cancel(network_bandwidth_timer);

                if (uuid) {
                    // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets correct results
                    _this.activeConnection = uuid;
                    smanagerFactory.setActiveConnection(uuid);
                }

                _this.Form = _this.getActiveConnection();
                _this.showStandalone = false;
                _this.showSnapshot = false;
                _this.showVm = false;
                _this.showVCenter = false;
                _this.showNewConnection = true;
                _this.showNewConnectionType = false;
            };

            this.sendConnect = function (smanagerConnect_form) {
                _this.smanagerConnect_form.submitted = true;

                if (_this.Form.so === 'linux' || _this.Form.so === 'snmp') _this.Form.category = 'standalone';
                if (_this.Form.so === 'vmware') _this.Form.category = 'virtual';
                if (_this.Form.so === 'netapp') _this.Form.category = 'storage';

                if (smanagerConnect_form.$valid) {
                    _this.smanagerConnect_form.submitted = false;
                    $interval.cancel(network_bandwidth_timer);

                    // Fetch connection
                    var connection = connectionsFactory.connect(_this.Form);
                    smanagerFactory.setActiveConnection(connection);
                }
            };

            this.refreshConnection = function (connection) {
                connectionsFactory.connect(connection);
            };

            this.deleteConnection = function (uuid) {
                _this.activeConnection = uuid;
                _this.setActiveConnection(uuid);

                var modalInstanceRemoveConnection = modalFactory.openRegistredModal('question', '.window--smanager .window__main',
                    {
                        title: function () {
                            return 'Delete connection ' + (_this.getActiveConnection().description ? _this.getActiveConnection().description : _this.getActiveConnection().hostname);
                        },
                        text: function () {
                            return 'Remove the selected connection from the inventory?';
                        }
                    }
                );
                modalInstanceRemoveConnection.result.then(function (res) {

                    if (res === true) connectionsFactory.deleteConnection(uuid);

                    _this.newConnectionType();

                });
            };

            this.setActiveConnection = function (connection, type) {

                $interval.cancel(network_bandwidth_timer);

                _this.showNewConnection = false;
                _this.showNewConnectionType = false;
                _this.showStandalone = false;
                _this.showSnapshot = false;
                _this.showVm = false;
                _this.showVCenter = false;

                // Linux/Windows/SNMP
                if (type === 'standalone') {

                    //TODO: type?=
                    // Is not connected
                    if (connection.type !== 'connected') {
                        _this.showNewConnection = true;
                        _this.Form = connection;
                    } else if (connection.type !== 'new') {
                        _this.showStandalone = true;
                        // Not initialized connection
                    } else if (connection.type === 'new') {
                        _this.showNewConnection = true;
                        _this.Form = connection;
                    }

                    return smanagerFactory.setActiveConnection(connection.uuid);
                }

                if (type === 'snapshot') {
                    _this.showSnapshot = true;

                    return smanagerFactory.setActiveConnection(connection['snapshot-version-uuid']);
                }

                if (type === 'vm') {
                    _this.showVm = true;

                    return smanagerFactory.setActiveConnection(connection.config.uuid);
                }

                if (type === 'vcenter') {
                    _this.showVCenter = true;

                    return smanagerFactory.setActiveConnection(connection.uuid);
                }

            };

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

            /*
             * NETAPP MONITOR
             */
            this.getSnapshotFiles = function (uuid, host, vserver, volume, snapshot, path, xml) {

                return smanagerFactory.getSnapshotFiles(uuid, host, vserver, volume, snapshot, path, xml);

            };

            this.getLinkByVMwareDatastore = function (virtual_uuid, datastore_name) {
                var link = smanagerFactory.getLinkByVMwareDatastore(virtual_uuid, datastore_name);

                if (link) return connectionsFactory.getConnectionByUuid(link.storage);
		        return false;
            };

            /*
             * LINUX MONITOR
             */
            this.toggleUpdates = function () {
                _this.seeMoreUpdates = !_this.seeMoreUpdates;
            };

            this.getCurrentCpu = function () {
                if (angular.isUndefined(_this.getActiveConnection().cpu)) return 0;

                return _this.getActiveConnection().cpu.filter(function (obj) {
                    return obj.option === 'Model name';
                })[0].data;
            };

            this.getCpuCores = function () {
                if (angular.isUndefined(_this.getActiveConnection().cpu)) return 0;

                return _this.getActiveConnection().cpu.filter(function (obj) {
                    return obj.option === 'CPU(s)';
                })[0].data;
            };

            this.getCpuLoad = function () {
                if (angular.isUndefined(_this.connections)) return 0.0;
                if (angular.isUndefined(_this.getActiveConnection())) return 0.0;
                if (angular.isUndefined(_this.getActiveConnection().cpu)) return 0.0;

                return _this.getActiveConnection().cpu.filter(function (obj) {
                    return obj.option === 'Load average';
                })[0].data.split(' ')[0];
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
                if (angular.isUndefined(_this.getActiveConnection().cpu)) return 'bg-primary-i';

                var cpuLoad = _this.getCpuLoad().slice(0, -1);
                if (cpuLoad < 20) return 'bg-primary-i';
                if (cpuLoad < 80) return 'bg-success-i';
                if (cpuLoad < 90) return 'bg-warning-i';
                return 'bg-danger-i';
            };

            this.getMemStatus = function () {
                if (angular.isUndefined(_this.connections)) return 'bg-primary-i';
                if (angular.isUndefined(_this.getActiveConnection().mem)) return 'bg-primary-i';

                var memUsed = 100 - (_this.getActiveConnection().mem[0].free / _this.getActiveConnection().mem[0].total * 100).toFixed(1);
                if (memUsed < 20) return 'bg-primary-i';
                if (memUsed < 80) return 'bg-success-i';
                if (memUsed < 90) return 'bg-warning-i';
                return 'bg-danger-i';
            };

            this.getDiskStatus = function (percent) {
                if (angular.isUndefined(_this.getActiveConnection().disk)) return [1, 'text-primary'];

                var diskPercent = _this.extractSpace(percent, 1);
                if (diskPercent < 20) return [1, 'text-primary'];
                if (diskPercent < 80) return [2, 'text-success'];
                if (diskPercent < 90) return [3, 'text-warning'];
                return [4, 'text-danger'];
            };

            this.getUpdatesStatus = function (percent) {
                if (angular.isUndefined(_this.connections)) return 'bg-primary-i';
                if (angular.isUndefined(_this.getActiveConnection().updates)) return 'bg-primary-i';

                var totalUpdates = _this.getActiveConnection().updates.length;
                if (totalUpdates < 1) return 'bg-primary-i';
                if (totalUpdates < 2) return 'bg-success-i';
                if (totalUpdates < 5) return 'bg-warning-i;';
                return 'bg-danger-i';
            };

            this.getMaxDiskStatus = function () {
                if (angular.isUndefined(_this.connections)) return ['bg-primary-i', 0];
                if (angular.isUndefined(_this.getActiveConnection().disk)) return ['bg-primary-i', 0];

                var status = 1;
                var percent = 0;

                angular.forEach(_this.getActiveConnection().disk, function (disk) {
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

            /*
             * CONTEXT MENUS
             */
            this.storageContextMenu = [
                {
                    text: '<i class="fa fa-pencil"></i> Edit Connection',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        _this.editConnection($itemScope.$parent.$parent.storage.uuid);
                    }
                },
                {
                    text: '<i class="fa fa-refresh"></i> Rescan Storage',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        //TODO: delete current links
                        //TODO: delete current maps
                        _this.refreshConnection($itemScope.$parent.$parent.storage);
                    }
                },
                {
                    text: '<i class="fa fa-trash text-danger"></i> Delete Connection',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        _this.deleteConnection($itemScope.$parent.$parent.storage.uuid);
                    }
                }
            ];

            this.volumeContextMenu = [
                {
                    text: '<i class="fa fa-database"></i> Create Snapshot',
                    click: function ($itemScope, $event, modelValue, text, $li) {

                        // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets correct
                        // results
                        _this.activeConnection = $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid;
                        _this.setActiveConnection($itemScope.$parent.$parent.volume['volume-id-attributes'].uuid);

                        return netappFactory.createSnapshot(
                            _this.getActiveConnection(2).credential,
                            _this.getActiveConnection(2).host,
                            _this.getActiveConnection(2).port,
                            $itemScope.$parent.$parent.volume['volume-id-attributes']['owning-vserver-name'],
                            $itemScope.$parent.$parent.volume['volume-id-attributes'].name
                        ).then(function (res) {
                            if (res.status === 'error') {
                                toastr.error('Create Volume Snapshot', res.error);
                                throw new Error('Failed to create Volume Snapshot');
                            }

                            toastr.success('Create Volume Snapshot');

                            console.log(res);
                        });
                    }

                },
                null,
                {
                    text: '<i class="fa fa-file"></i> Rescan Volume',
                    click: function ($itemScope, $event, modelValue, text, $li) {

                        //TODO: delete current links
                        //TODO: delete current maps

                        // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets correct
                        // results
                        _this.activeConnection = $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid;
                        _this.setActiveConnection($itemScope.$parent.$parent.volume['volume-id-attributes'].uuid);

                        return smanagerFactory.getVolumeData({
                            uuid: _this.getActiveConnection(2).uuid,
                            credential: _this.getActiveConnection(2).credential,
                            host: _this.getActiveConnection(2).host,
                            port: _this.getActiveConnection(2).port,
                            vserver_name: $itemScope.$parent.$parent.volume['volume-id-attributes']['owning-vserver-name'],
                            volume_name: $itemScope.$parent.$parent.volume['volume-id-attributes'].name,
                            volume_uuid: $itemScope.$parent.$parent.volume['volume-id-attributes'].uuid
                        });

                    }
                }

            ];

            this.snapshotContextMenu = [
                {
                    text: '<i class="fa fa-database"></i> Mount as Datastore',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        ApplicationsFactory.openApplication('backupsm');
                        ApplicationsFactory.toggleApplication('backupsm');

                        // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets correct
                        // results
                        _this.activeConnection = $itemScope.snapshot['snapshot-instance-uuid'];
                        _this.setActiveConnection($itemScope.snapshot['snapshot-instance-uuid']);

                        $timeout(function () {
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
                        }, 100);
                    }
                },
                {
                    text: '<i class="fa fa-file"></i> Restore Datastore files',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        ApplicationsFactory.openApplication('backupsm');
                        ApplicationsFactory.toggleApplication('backupsm');

                        // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets correct
                        // results
                        _this.activeConnection = $itemScope.snapshot['snapshot-instance-uuid'];
                        _this.setActiveConnection($itemScope.snapshot['snapshot-instance-uuid']);

                        $timeout(function () {
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
                        }, 100);

                    }
                },
                {
                    text: '<i class="fa fa-trash"></i> Delete SnapShot',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        //TODO
                    }
                }

            ];

            this.snapshotVMContextMenu = [
                {
                    text: '<i class="fa fa-server"></i> Instant VM',
                    click: function ($itemScope) {
                        ApplicationsFactory.openApplication('backupsm');
                        ApplicationsFactory.toggleApplication('backupsm');

                        $timeout(function () {
                            $rootScope.$broadcast('backupsm__vm_instant_recovery', {
                                storage: _this.getActiveConnection(3),
                                vserver: _this.getActiveConnection(2),
                                volume: _this.getActiveConnection(1),
                                snapshots: [_this.getActiveConnection()],
                                snapshot: _this.getActiveConnection()['snapshot-instance-uuid'],
                                ESXihosts: smanagerFactory.getESXihosts(),
                                vm: $itemScope.vm
                            });
                        }, 100);
                    }
                },
                {
                    text: '<i class="fa fa-server"></i> Restore VM files',
                    click: function ($itemScope) {
                        ApplicationsFactory.openApplication('backupsm');
                        ApplicationsFactory.toggleApplication('backupsm');

                        $timeout(function () {
                            $rootScope.$broadcast('backupsm__restore_vm_files', {
                                storage: _this.getActiveConnection(3),
                                vserver: _this.getActiveConnection(2),
                                volume: _this.getActiveConnection(1),
                                snapshots: [_this.getActiveConnection()],
                                snapshot: _this.getActiveConnection()['snapshot-instance-uuid'],
                                ESXihosts: smanagerFactory.getESXihosts(),
                                vm: $itemScope.vm
                            });
                        }, 100);
                    }
                },
                {
                    text: '<i class="fa fa-server"></i> Restore Guest files',
                    click: function ($itemScope) {
                        ApplicationsFactory.openApplication('backupsm');
                        ApplicationsFactory.toggleApplication('backupsm');

                        $timeout(function () {
                            $rootScope.$broadcast('backupsm__restore_vm_guest_files', {
                                storage: _this.getActiveConnection(3),
                                vserver: _this.getActiveConnection(2),
                                volume: _this.getActiveConnection(1),
                                snapshots: [_this.getActiveConnection()],
                                snapshot: _this.getActiveConnection()['snapshot-instance-uuid'],
                                ESXihosts: smanagerFactory.getESXihosts(),
                                vm: $itemScope.vm
                            });
                        }, 100);
                    }
                }
            ];

            this.virtualContextMenu = [
                {
                    text: '<i class="fa fa-pencil"></i> Edit Connection',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        _this.editConnection($itemScope.$parent.$parent.virtual.uuid);
                    }
                },
                {
                    text: '<i class="fa fa-refresh"></i> Rescan vCenter',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        //TODO: delete current links
                        //TODO: delete current maps
                        _this.refreshConnection($itemScope.$parent.$parent.virtual);
                    }
                },
                {
                    text: '<i class="fa fa-trash text-danger"></i> Delete Connection',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        _this.deleteConnection($itemScope.$parent.$parent.virtual.uuid);
                    }
                }
            ];

            this.VMContextMenu = [
                ['<i class="fa fa-power-off"></i> Power', function ($itemScope) {
                    // Code
                },
                    [
                        ['<i class="fa fa-play text-success"></i> Power On', function ($itemScope) {
                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);

                            var credential = _this.getActiveConnection(1).credential;
                            var host = _this.getActiveConnection(1).host;
                            var port = _this.getActiveConnection(1).port;

                            $timeout(function () {
                                return smanagerFactory.powerOnVM(credential, host, port, $itemScope.vm.vm);
                            }, 100);
                        }],
                        ['<i class="fa fa-stop text-danger"></i> Power Off', function ($itemScope) {
                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);

                            var credential = _this.getActiveConnection(1).credential;
                            var host = _this.getActiveConnection(1).host;
                            var port = _this.getActiveConnection(1).port;

                            $timeout(function () {
                                return smanagerFactory.powerOffVM(credential, host, port, $itemScope.vm.vm);
                            }, 100);
                        }],
                        ['<i class="fa fa-pause text-warning"></i> Suspend', function ($itemScope) {
                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);

                            var credential = _this.getActiveConnection(1).credential;
                            var host = _this.getActiveConnection(1).host;
                            var port = _this.getActiveConnection(1).port;

                            $timeout(function () {
                                return smanagerFactory.suspendVM(credential, host, port, $itemScope.vm.vm);
                            }, 100);
                        }],
                        ['<i class="fa fa-refresh"></i> Reset', function ($itemScope) {
                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);

                            var credential = _this.getActiveConnection(1).credential;
                            var host = _this.getActiveConnection(1).host;
                            var port = _this.getActiveConnection(1).port;

                            $timeout(function () {
                                return smanagerFactory.resetVM(credential, host, port, $itemScope.vm.vm);
                            }, 100);
                        }],
                        null,
                        ['<i class="fa fa-stop text-danger"></i> Shut Down Guest OS', function ($itemScope) {
                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);

                            var credential = _this.getActiveConnection(1).credential;
                            var host = _this.getActiveConnection(1).host;
                            var port = _this.getActiveConnection(1).port;

                            $timeout(function () {
                                return smanagerFactory.shutdownGuest(credential, host, port, $itemScope.vm.vm);
                            }, 100);
                        }],
                        ['<i class="fa fa-refresh"></i> Restart Guest OS', function ($itemScope) {
                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);

                            var credential = _this.getActiveConnection(1).credential;
                            var host = _this.getActiveConnection(1).host;
                            var port = _this.getActiveConnection(1).port;

                            $timeout(function () {
                                return smanagerFactory.rebootGuest(credential, host, port, $itemScope.vm.vm);
                            }, 100);
                        }]
                    ]
                ],
                {
                    text: '<i class="fa fa-television"></i> Open Remote Console',
                    click: function ($itemScope, $event, modelValue, text, $li) {

                        ApplicationsFactory.openApplication('wmks');
                        ApplicationsFactory.toggleApplication('wmks');

                        _this.activeConnection = $itemScope.vm.config.uuid;
                        _this.setActiveConnection($itemScope.vm.config.uuid);

                        console.log($itemScope);
                        console.log(_this.getActiveConnection(1));
                        console.log(_this.getActiveConnection(2));
                        console.log(_this.getActiveConnection(3));
                        console.log(_this.getActiveConnection());

                        //TODO: remove $parents...
                        $timeout(function () {
                            $rootScope.$broadcast('wmks__new_data', {
                                vm: $itemScope.vm.vm,
                                host: $itemScope.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.virtual.host,
                                port: $itemScope.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.virtual.port,
                                credential: $itemScope.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.virtual.credential
                            });
                        }, 100);

                    }
                },
                ['<i class="fa fa-server"></i> Restore', function ($itemScope) {
                    // Code
                },
                    [
                        ['<i class="fa fa-server"></i> Instant VM', function ($itemScope) {
                            ApplicationsFactory.openApplication('backupsm');
                            ApplicationsFactory.toggleApplication('backupsm');

                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);

                            //TODO: $itemScope.vm.extended.datastore.ManagedObjectReference could be an array of 2
                            // datastores or more TODO: if vm is inside a cluster or outside,
                            // _this.getActiveConnection(1).uuid could not match vCenter/ESXi connection
                            $timeout(function () {
                                $rootScope.$broadcast('backupsm__vm_instant_recovery', {
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
                                        port: _this.getActiveConnection(1).port,
                                        esxi_host: $itemScope.vm.runtime.host.name,
	                                    resource_pool: $itemScope.vm.resourcePool.name,
                                        folder: $itemScope.vm.parent.name
                                    }
                                });
                            }, 100);
                        }],
                        ['<i class="fa fa-server"></i> Restore entire VM', function ($itemScope) {
                            ApplicationsFactory.openApplication('backupsm');
                            ApplicationsFactory.toggleApplication('backupsm');

                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);

                            //TODO: $itemScope.vm.extended.datastore.ManagedObjectReference could be an array of 2
                            // datastores or more TODO: if vm is inside a cluster or outside,
                            // _this.getActiveConnection(1).uuid could not match vCenter/ESXi connection
                            $timeout(function () {
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
                            }, 100);
                        }],
                        ['<i class="fa fa-server"></i> Restore VM files', function ($itemScope) {
                            ApplicationsFactory.openApplication('backupsm');
                            ApplicationsFactory.toggleApplication('backupsm');

                            // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets
                            // correct results
                            _this.activeConnection = $itemScope.vm.config.uuid;
                            _this.setActiveConnection($itemScope.vm.config.uuid);


                            //TODO: $itemScope.vm.extended.datastore.ManagedObjectReference could be an array of 2
                            // datastores or more TODO: if vm is inside a cluster or outside,
                            // _this.getActiveConnection(1).uuid could not match vCenter/ESXi connection
                            $timeout(function () {

                                $rootScope.$broadcast('backupsm__restore_vm_files', {
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
                            }, 100);
                        }]
                    ]
                ],
                {
                    text: '<i class="fa fa-server"></i> Backup',
                    click: function ($itemScope) {

                        // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets correct
                        // results
                        _this.activeConnection = $itemScope.vm.config.uuid;
                        _this.setActiveConnection($itemScope.vm.config.uuid);

	                    if (!smanagerFactory.getLinkByVMwareDatastore(_this.getActiveConnection(1).uuid, $itemScope.vm.datastore.ManagedObjectReference.name)) return modalFactory.openLittleModal('Error while creating Backup', 'Not found any compatible NetApp storage. Make sure VMs that you want to backup are inside a NetApp volume and this is managed by SysOS.', '.window--smanager .window__main', 'plain');

	                    ApplicationsFactory.openApplication('backupsm');
	                    ApplicationsFactory.toggleApplication('backupsm');

                        $timeout(function () {
                            $rootScope.$broadcast('backupsm__backup_vm', {
                                vm: $itemScope.vm,
                                connection: _this.getActiveConnection(1)
                            });
                        }, 100);
                    }
                },
                null,
                {
                    text: '<i class="fa fa-refresh"></i> Refresh',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets correct
                        // results
                        _this.activeConnection = $itemScope.vm.config.uuid;
                        _this.setActiveConnection($itemScope.vm.config.uuid);

                        $timeout(function () {
                            return smanagerFactory.refreshVM(eval(connectionsFactory.getObjectByUuidMapping($itemScope.vm.config.uuid)), _this.getActiveConnection(1)); // jshint ignore:line
                        }, 100);
                    }
                }
            ];
        }]);
}());

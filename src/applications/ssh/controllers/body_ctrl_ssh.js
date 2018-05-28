(function () {
    'use strict';
    sshApp.controller('sshBodyController', ['$scope', '$element', '$timeout', 'sshFactory', 'cmanagerFactory', 'ApplicationsFactory', '$filter', 'modalFactory', 'connectionsFactory', 'ServerFactory',
        function ($scope, $element, $timeout, sshFactory, cmanagerFactory, ApplicationsFactory, $filter, modalFactory, connectionsFactory, ServerFactory) {

            var _this = this;

            /*
             * Bindings
             */
            this.showNewConnection = true;
            this.viewSide = true;
            this.resizeId = '';

            this.Form = {
                autologin: true,
                save: true,
                port: 22
            };
            this.sshConnect_form = {};

            // get ssh connections
            ServerFactory
            .getConfigFile('applications/ssh/config.json', function (data) {
                console.log(data);
                return connectionsFactory.setSavedConnections(data.data);
            }, function () {
                console.log('Error');
            });

            $scope.$watch(function () {
                return connectionsFactory.connections();
            }, function (newValue) {
                _this.connections = newValue.ssh;
            });

            $scope.$watch(function () {
                return sshFactory.activeConnection();
            }, function (newValue) {
                _this.activeConnection = newValue;
            });

            $scope.$watch(function () {
                return cmanagerFactory.credentials();
            }, function (newValue) {
                _this.credentials = newValue;
            });


            /*
             * Called at sshActionController
             */
            $scope.$on('ssh__new_connection', function () {
                _this.newConnection();
            });

            /*
             * Called at sshActionController
             */
            $scope.$on('ssh__disconnect_connection', function () {
                _this.Form = _this.getActiveConnection();
                connectionsFactory.disconnectConnection(_this.activeConnection);
                _this.showNewConnection = true;
            });

            /*
             * Called at sshActionController
             */
            $scope.$on('ssh__delete_connection', function () {
                _this.deleteConnection(_this.getActiveConnection());
            });

            /*
             * Called at sshActionController
             */
            $scope.$on('ssh__download_log', function () {
                sshFactory.downloadLog(_this.activeConnection);
            });

            /*
             * Called at sshActionController
             */
            $scope.$on('ssh__edit_connection', function () {
                _this.editConnection();
            });

            $scope.$watch(function () {
                if (!$element[0].children[1]) return false;

                return [$element[0].children[1].offsetWidth, $element[0].children[1].offsetHeight].join('x');
            }, function () {
                $timeout.cancel(_this.resizeId);

                _this.resizeId = $timeout(function () {
                    console.log('resize');
                    sshFactory.resizeTerminal();
                }, 250);

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

            this.getActiveConnection = function () {
                return connectionsFactory.getConnectionByUuid(_this.activeConnection);
            };

            this.newConnection = function () {
                _this.Form = {
                    autologin: true,
                    save: true,
                    port: 22
                };
                _this.showNewConnection = true;
                sshFactory.setActiveConnection(null);
            };

            this.sendConnect = function (sshConnect_form) {
                _this.sshConnect_form.submitted = true;
                _this.Form.category = 'ssh';

                if (sshConnect_form.$valid) {
                    _this.sshConnect_form.submitted = false;
                    _this.showNewConnection = false;

                    // Fetch connection
                    var connection = connectionsFactory.connect(_this.Form);
                    sshFactory.setActiveConnection(connection.uuid);
                }
            };

            this.deleteConnection = function (connection) {
                _this.activeConnection = connection.uuid;
                _this.setActiveConnection(connection);

                var modalInstanceRemoveConnection = modalFactory.openRegistredModal('question', '.window--ssh .window__main',
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
                    if (res === true) connectionsFactory.deleteConnection(connection.uuid);

                    _this.newConnection();

                });
            };

            this.setActiveConnection = function (connection) {

                // Is not connected
                if (connection.state !== 'connected') {
                    _this.showNewConnection = true;
                    sshFactory.setActiveConnection(connection.uuid);
                    _this.Form = connection;

                } else if (connection.state !== 'new') {
                    console.log('not new');
                    _this.showNewConnection = false;
                    sshFactory.setActiveConnection(connection.uuid);

                    // Not initialized connection
                } else if (connection.state === 'new') {
                    console.log('new');
                    _this.showNewConnection = true;
                    sshFactory.setActiveConnection(connection.uuid);
                    _this.Form = connection;
                }
            };

            this.editConnection = function (uuid) {

                if (uuid) {
                    // Set _this.activeConnection manually to make sure _this.getActiveConnection() gets correct results
                    _this.activeConnection = uuid;
                    sshFactory.setActiveConnection(uuid);
                }

                _this.Form = _this.getActiveConnection();
                _this.showNewConnection = true;
            };

        }]);
}());
(function () {
    'use strict';
    sftpApp.controller('sftpBodyController', ['$scope', '$element', 'sftpFactory', 'ServerFactory', 'Upload', 'fileSystemFactory', '$timeout', 'cmanagerFactory', 'ApplicationsFactory', 'connectionsFactory', 'modalFactory',
        function ($scope, $element, sftpFactory, ServerFactory, Upload, fileSystemFactory, $timeout, cmanagerFactory, ApplicationsFactory, connectionsFactory, modalFactory) {

            var _this = this;

            /*
             * Init
             */

            ServerFactory.getConfigFile('applications/sftp/config.json', function (data) {
                return connectionsFactory.setSavedConnections(data.data);
            }, function () {
                console.log('Error');
            });

            /*
             * Bindings
             */
            this.showNewConnection = true;
            this.viewSide = true;
            this.viewExchange = true;
            this.uploadFiles = [];

            this.Form = {
                autologin: true,
                save: true,
                port: 22
            };
            this.sftpConnect_form = {};

            this.getActiveConnection = function () {
                if (!_this.activeConnection) return null;

                return connectionsFactory.getConnectionByUuid(_this.activeConnection);
            };

            $scope.$watch(function () {
                return connectionsFactory.connections();
            }, function (newValue) {
                _this.connections = newValue.sftp;
            });

            $scope.$watch(function () {
                return sftpFactory.activeConnection();
            }, function (newValue) {
                _this.activeConnection = newValue;
            });

            $scope.$watch(function () {
                return cmanagerFactory.credentials();
            }, function (newValue) {
                _this.credentials = newValue;
            });

            $scope.$on('sftp__toggle_exchange', function () {
                _this.viewExchange = !_this.viewExchange;
            });

            $scope.$on('sftp__new_connection', function () {
                _this.newConnection();
            });

            $scope.$on('sftp__disconnect_connection', function () {
                _this.Form = _this.getActiveConnection();
                connectionsFactory.disconnectConnection(_this.activeConnection);
                _this.showNewConnection = true;
            });

            /*
             * Called at sftpActionController
             */
            $scope.$on('sftp__delete_connection', function () {
                _this.deleteConnection(_this.getActiveConnection());
            });

            /*
             * Called at sftpActionController
             */
            $scope.$on('sftp__connection_edit', function () {
                _this.showNewConnection = true;
                _this.Form = _this.getActiveConnection();
            });

            $scope.$on('sftp__new_upload_file', function (event, data) {
                angular.forEach(data, function (file) {
                    _this.uploadFiles.push(file);
                });
            });

            $scope.$on('sftp__progress_data', function (event, data) {
                _this.uploadFiles.filter(function (e) {
                    return e.exchange === data.exchange && e.path === data.destination && e.uuid == data.uuid;
                })[0].progress = data.progress;
            });

            this.isResumeSupported = Upload.isResumeSupported();

            /*
             * ng-click functions
             */
            this.manageCredentials = function () {
                ApplicationsFactory.openApplication('cmanager');
                ApplicationsFactory.toggleApplication('cmanager');
            };

            this.toggleSide = function () {
                _this.viewSide = !_this.viewSide;
            };

            this.newConnection = function () {
                _this.Form = {
                    autologin: true,
                    save: true,
                    port: 22
                };
                _this.showNewConnection = true;
                sftpFactory.setActiveConnection(null);
            };

            this.sendConnect = function (sftpConnect_form) {
                _this.sftpConnect_form.submitted = true;
                _this.Form.category = 'sftp';

                if (sftpConnect_form.$valid) {
                    _this.sftpConnect_form.submitted = false;
                    _this.showNewConnection = false;

                    // Fetch connection
                    var connection = connectionsFactory.connect(_this.Form);
                    sftpFactory.setActiveConnection(connection.uuid);
                }
            };

            this.deleteConnection = function (connection) {
                _this.activeConnection = connection.uuid;
                _this.setActiveConnection(connection);

                var modalInstanceRemoveConnection = modalFactory.openRegistredModal('question', '.window--sftp .window__main',
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
                    sftpFactory.setActiveConnection(connection.uuid);
                    _this.Form = connection;

                } else if (connection.state !== 'new') {
                    console.log('not new');
                    _this.showNewConnection = false;
                    sftpFactory.setActiveConnection(connection.uuid);
                    $timeout(function () {
                        $('#server_body').focus();
                    }, 500);

                    // Not initialized connection
                } else if (connection.state === 'new') {
                    console.log('new');
                    _this.showNewConnection = true;
                    sftpFactory.setActiveConnection(connection.uuid);
                    _this.Form = connection;
                }
            };


            this.uploadFile = function (file) {
                fileSystemFactory.uploadFile(file);
            };

            this.restart = function (file) {
                _this.uploadFile(file);
            };

        }]);
}());
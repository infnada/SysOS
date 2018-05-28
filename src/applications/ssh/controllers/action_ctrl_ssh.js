(function () {
    'use strict';
    sshApp.controller('sshActionController', ['$scope', 'sshFactory', 'connectionsFactory',
        function ($scope, sshFactory, connectionsFactory) {

            var _this = this;
            var APPscope = $scope.$parent.$parent.$parent.$parent;

            /*
             * Bindings
             */
            this.logActivated = false;

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

            this.getActiveConnection = function () {
                return connectionsFactory.getConnectionByUuid(_this.activeConnection);
            };

            /*
             * ng-click functions
             */
            this.newConnection = function () {
                APPscope.$broadcast('ssh__new_connection');
            };

            this.disconnectConnection = function () {
                if (_this.activeConnection == null) return;
                APPscope.$broadcast('ssh__disconnect_connection');
            };

            this.deleteConnection = function () {
                if (_this.activeConnection == null) return;
                APPscope.$broadcast('ssh__delete_connection');
            };

            this.toggleLog = function () {
                sshFactory.toggleConnectionLog();
                _this.logActivated = !_this.logActivated;
            };

            this.editConnection = function () {
                if (_this.activeConnection == null) return;
                APPscope.$broadcast('ssh__edit_connection');
            };

            this.downloadLog = function () {
                if (_this.activeConnection == null) return;
                APPscope.$broadcast('ssh__download_log');
            };

        }]);
}());
(function () {
    'use strict';
    sftpApp.controller('sftpActionController', ['$scope', 'sftpFactory', 'connectionsFactory', function ($scope, sftpFactory, connectionsFactory) {

        var _this = this;
        var APPscope = $scope.$parent.$parent.$parent.$parent;

        /*
         * Bindings
         */
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

        this.getActiveConnection = function () {
            if (!_this.activeConnection) return null;

            return connectionsFactory.getConnectionByUuid(_this.activeConnection);
        };

        /*
         * ng-click functions
         */
        this.toggleExchange = function () {
            APPscope.$broadcast('sftp__toggle_exchange');
        };

        this.newConnection = function () {
            APPscope.$broadcast('sftp__new_connection');
        };

        this.disconnectConnection = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('sftp__disconnect_connection');
        };

        this.deleteConnection = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('sftp__delete_connection');
        };

        this.editConnection = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('sftp__connection_edit');
        };

    }]);
}());
(function () {
    'use strict';
    smanagerApp.controller('smActionController', ['$scope', '$timeout', 'smanagerFactory', 'connectionsFactory', 'ApplicationsFactory', function ($scope, $timeout, smanagerFactory, connectionsFactory, ApplicationsFactory) {

        var _this = this;
        var APPscope = $scope.$parent.$parent.$parent.$parent;

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
        });

        /*
         * ng-click functions
         */
        this.newConnection = function () {
            APPscope.$broadcast('smanager__new_connection');
        };

        this.configureConnection = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('smanager__configure_connection');
        };

        this.disconnectConnection = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('smanager__disconnect_connection');
        };

        this.deleteConnection = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('smanager__delete_connection');
        };

        this.runHIDS = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('smanager__run_HIDS');
        };

        this.remoteRefresh = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('smanager__remote_refresh');
        };

        this.editConnection = function () {
            if (_this.activeConnection == null) return;
            APPscope.$broadcast('smanager__connection_edit');
        };

        this.openWithApp = function (app) {
            if (_this.activeConnection == null) return;

            ApplicationsFactory.openApplication(app).then(function () {
                // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                $timeout(function () {
                    ApplicationsFactory.toggleApplication(app);
                }, 0, false);
            });
        };

    }]);
}());

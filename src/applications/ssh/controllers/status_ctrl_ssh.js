(function () {
    'use strict';
    sshApp.controller('sshStatusController', ['$scope', 'sshFactory', '$filter', 'connectionsFactory',
        function ($scope, sshFactory, $filter, connectionsFactory) {

            var _this = this;

            /*
             * Bindings
             */

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
                if (!_this.activeConnection) return null;

                return $filter('filter')(_this.connections, {uuid: _this.activeConnection})[0];
            };

        }]);
}());
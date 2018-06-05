(function () {
    'use strict';
    smanagerApp.controller('smStatusController', ['$scope', '$filter', 'smanagerFactory', 'connectionsFactory', function ($scope, $filter, smanagerFactory, connectionsFactory) {

        var _this = this;

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

        this.getActiveConnection = function () {
            if (!_this.activeConnection) return null;

            var foundByUuid = connectionsFactory.getConnectionByUuid(_this.activeConnection);
            if (foundByUuid) return foundByUuid;

            if (!foundByUuid) {
                var foundByUuidMapping = connectionsFactory.getObjectByUuidMapping(_this.activeConnection, parent);
                if (foundByUuidMapping) return eval(foundByUuidMapping); // jshint ignore:line
            }

            return false;
        };

    }]);
}());

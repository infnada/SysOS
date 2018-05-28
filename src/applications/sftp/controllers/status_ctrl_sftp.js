(function () {
    'use strict';
    sftpApp.controller('sftpStatusController', ['$scope', 'sftpFactory', 'connectionsFactory', function ($scope, sftpFactory, connectionsFactory) {

        var _this = this;

        /*
         * Bindings
         */
        $scope.$watch(function () {
            return sftpFactory.activeConnection();
        }, function (newValue) {
            _this.activeConnection = newValue;
        });

        this.getActiveConnection = function () {
            return connectionsFactory.getConnectionByUuid(_this.activeConnection);
        };

    }]);
}());
(function () {
    'use strict';
    cmanagerApp.controller('cmanagerStatusController', ['$scope', 'cmanagerFactory', function ($scope, cmanagerFactory) {

        var _this = this;

        /*
         * Bindings
         */

        $scope.$watch(function () {
            return cmanagerFactory.credentials();
        }, function (newValue, oldValue) {
            _this.credentials = newValue;
        });

        $scope.$watch(function () {
            return cmanagerFactory.activeCredential();
        }, function (newValue) {
            _this.activeCredential = newValue;
        });

    }]);
}());
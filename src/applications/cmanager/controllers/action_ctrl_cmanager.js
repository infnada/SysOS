(function () {
    'use strict';
    cmanagerApp.controller('cmanagerActionController', ['$scope', 'cmanagerFactory', function ($scope, cmanagerFactory) {

        var _this = this;
        var APPscope = $scope.$parent.$parent.$parent.$parent;

        /*
         * Bindings
         */

        $scope.$watch(function () {
            return cmanagerFactory.credentials();
        }, function (newValue) {
            _this.credentials = newValue;
        });

        $scope.$watch(function () {
            return cmanagerFactory.activeCredential();
        }, function (newValue) {
            _this.activeCredential = newValue;
        });


        /*
         * ng-click functions
         */
        this.newCredential = function () {
            if (_this.activeCredential == null) return;
            APPscope.$broadcast('cmanager__new_credential');
        };

        this.deleteCredential = function () {
            if (_this.activeCredential == null) return;
            APPscope.$broadcast('cmanager__delete_credential');
        };


    }]);
}());
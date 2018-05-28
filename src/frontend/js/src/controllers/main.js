(function () {
    'use strict';
    SysOS.controller('mainController', ['$scope', 'ApplicationsFactory', function ($scope, ApplicationsFactory) {

        var _this = this;

        /*
         * Bindings
         */
        this.opened_applications = ApplicationsFactory.opened_applications();

        $scope.$watch(function () {
            return ApplicationsFactory.opened_applications();
        }, function (newValue) {
            _this.opened_applications = newValue;
        });

        /*
         * ng-click functions
         */
        this.handleDesktopClick = function ($event) {

            if ($event.target.attributes.class !== undefined && $event.target.attributes.class.value === 'desktop ng-scope') {
                ApplicationsFactory.toggleApplication(null);
            }

        };

    }]);
}());

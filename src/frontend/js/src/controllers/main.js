(function () {
    'use strict';
    SysOS.controller('mainController', ['$rootScope', '$scope', 'ApplicationsFactory', 'ServerFactory', 'toastr', 'mainFactory',
        function ($rootScope, $scope, ApplicationsFactory, ServerFactory, toastr, mainFactory) {

        var _this = this;

        /*
         * Bindings
         */
        this.opened_applications = ApplicationsFactory.opened_applications();

        this.showUser = false;
        this.user = 'root';
        this.password = '';

        $scope.$watch(function () {
            return ApplicationsFactory.opened_applications();
        }, function (newValue) {
            _this.opened_applications = newValue;
        });

        /*
         * ng-click functions
         */
        this.login = function () {
            return ServerFactory.login(_this.user, _this.password, function (data) {
                if (data.data.status === 'error') return toastr.error(data.data.data, 'Credential Manager');

                mainFactory.init();

            }, function (data) {
                console.log(data);
            });
        };

        this.handleDesktopClick = function ($event) {

            if ($event.target.attributes.class !== undefined && $event.target.attributes.class.value === 'desktop ng-scope') {
                ApplicationsFactory.toggleApplication(null);
            }

        };

    }]);
}());

(function () {
    'use strict';
    SysOS.directive('windowStatus', [function () {
        return {
            restrict: 'E',
            scope: {
                app: '='
            },
            bindToController: true,
            templateUrl: 'templates/applications/status.html',
            controllerAs: 'STATUS',
            controller: [function () {

            }]
        };
    }]);
}());

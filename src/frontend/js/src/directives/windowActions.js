(function () {
    'use strict';
    SysOS.directive('windowActions', [function () {
        return {
            restrict: 'E',
            scope: {
                app: '='
            },
            bindToController: true,
            templateUrl: 'templates/applications/actions.html',
            controllerAs: 'ACTIONS',
            controller: [function () {

            }]
        };
    }]);
}());

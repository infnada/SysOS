(function () {
    'use strict';
    SysOS.directive('windowMenu', [function () {
        return {
            restrict: 'E',
            scope: {
                app: '=',
                isMenuOpened: '='
            },
            bindToController: true,
            templateUrl: 'templates/applications/menu.html',
            controllerAs: 'MENU',
            controller: [function () {

            }]
        };
    }]);
}());

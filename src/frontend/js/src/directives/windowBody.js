(function () {
    'use strict';
    SysOS.directive('windowBody', [function () {
        return {
            restrict: 'E',
            scope: {
                app: '='
            },
            bindToController: true,
            templateUrl: 'templates/applications/body.html',
            controllerAs: 'BODY',
            controller: [function () {

                this.toggleList = function ($event) {

                    angular.element($event.currentTarget.parentElement.parentElement).toggleClass('side__list--open');

                    angular.element($event.currentTarget.parentElement.nextElementSibling).animate({
                        'height': 'toggle',
                        'opacity': 'toggle'
                    }, 250);
                };

            }]
        };
    }]);
}());

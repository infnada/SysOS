(function () {
    'use strict';
    SysOS.directive('donutChart', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    console.log(attrs.peity);
                    element.peity('donut', JSON.parse(attrs.peity));
                }, 100);
            }
        };
    }]);
}());

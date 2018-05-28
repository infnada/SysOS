(function () {
    'use strict';
    SysOS.directive('lineChart', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                scope.$watch(function () {
                    return attrs.lines;
                }, function (newValue) {

                    if (attrs.lines.length === 0) return;
                    element.sparkline(JSON.parse(newValue), {
                        width: '100%',
                        height: '80 ',
                        lineWidth: 1,
                        lineColor: '#4ca8e1',
                        fillColor: '#2a2a2a',
                        spotRadius: 2,
                        spotColor: '',
                        minSpotColor: '',
                        maxSpotColor: '',
                        highlightSpotColor: '#00ffff',
                        normalRangeColor: '#262626',
                        normalRangeMin: -1,
                        normalRangeMax: 10
                    });
                    //element[0].textContent = newValue).join();
                    //element.change();

                });

            }
        };
    }]);
}());

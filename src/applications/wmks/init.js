var wmksApp = angular.module('wmksApp', []);

(function () {
    'use strict';
    wmksApp.run(['ApplicationsFactory', function (ApplicationsFactory) {

        ApplicationsFactory.registerApplication({
            id: 'wmks',
            ico: 'television',
            name: 'VM Remote Console',
            menu: true,
            style: 'width:90%;height:90%;top:2%;left:5%;'
        });

    }]);
}());
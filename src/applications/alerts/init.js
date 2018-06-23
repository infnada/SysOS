var alertsApp = angular.module('alertsApp', []);

(function () {
    'use strict';
    alertsApp.run(['ApplicationsFactory', function (ApplicationsFactory) {

        ApplicationsFactory.registerApplication({
            id: 'alerts',
            ico: 'bullhorn',
            name: 'Alerts',
            menu: true,
            actions: false,
            style: 'width:1700px;height:750px;top:8%;left:7%;'
        });

    }]);
}());
var sshApp = angular.module('sshApp', []);

(function () {
    'use strict';
    sshApp.run(['ApplicationsFactory', function (ApplicationsFactory) {

        ApplicationsFactory.registerApplication({
            id: 'ssh',
            ico: 'terminal',
            name: 'SSH',
            menu: true,
            actions: true,
            status: true,
            style: 'width:870px;height:600px;top:7%;left:10%;'
        });

    }]);
}());
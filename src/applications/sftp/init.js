var sftpApp = angular.module('sftpApp', []);

(function () {
    'use strict';
    sftpApp.run(['ApplicationsFactory', function (ApplicationsFactory) {

        ApplicationsFactory.registerApplication({
            id: 'sftp',
            ico: 'upload',
            name: 'SFTP',
            menu: true,
            actions: true,
            status: true,
            style: 'width:1275px;height:600px;top:9%;left:10%;'
        });

    }]);
}());
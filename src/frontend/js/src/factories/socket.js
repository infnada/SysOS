/*
 * Connect to socket.io and return socket object
 */

(function () {
    'use strict';
    SysOS.factory('socket', ['socketFactory', function (socketFactory) {

        var myIoSocket = io.connect('localhost');

        return socketFactory({
            ioSocket: myIoSocket
        });

    }]);

}());

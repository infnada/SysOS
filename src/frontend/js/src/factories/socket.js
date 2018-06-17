/*
 * Connect to socket.io and return socket object
 */

(function () {
    'use strict';
    SysOS.factory('socket', ['socketFactory', function (socketFactory) {

        var myIoSocket = io.connect(window.location.host, {transports: ['websocket'], 'forceNew': true});

        return socketFactory({
            ioSocket: myIoSocket
        });

    }]);

}());

/*
 * Connect to socket.io and return socket object
 */

(function () {
    'use strict';
    SysOS.factory('socketIo', [function () {

        var myIoSocket;

        return {
            connect: function () {

                myIoSocket = io.connect(window.location.host, {transports: ['websocket'], 'forceNew': true});

                myIoSocket.on('connect', function () {

                });
                myIoSocket.on('disconnect', function (err) {
                    console.log(err);
                });
                myIoSocket.on('error', function (err) {
                    console.log(err);
                });

                return myIoSocket;
            },
            socket: function () {
                return myIoSocket;
            }
        };

    }]);

}());

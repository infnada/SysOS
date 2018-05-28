(function () {
    'use strict';
    SysOS.factory('remoteFileSystemFactory', ['ServerFactory', function (ServerFactory) {

        var getPath = function (id, path, callback) {
            return ServerFactory.getRemotePath(id, path, function (data) {
                return callback(data.data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var createFolder = function (id, path, callback) {
            return ServerFactory.createRemoteFolder(id, path, function (data) {
                return callback(data.data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var downloadFileFromInet = function (url, currentPath, currentConnection, callback) {
            return ServerFactory.remoteDownloadFileFromInet(url, currentPath, currentConnection, function (data) {
                return callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var deleteFile = function (id, path, callback) {
            return ServerFactory.deleteRemoteFile(id, path, function (data) {
                return callback(data.data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var renameFile = function (uuid, src, dst, callback) {
            return ServerFactory.renameRemoteFile(uuid, src, dst, function (data) {
                return callback(data.data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var copyFile = function (uuid, src, dst, callback) {
            return ServerFactory.copyRemoteFile(uuid, src, dst, function (data) {
                return callback(data.data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var moveFile = function (uuid, src, dst, callback) {
            return ServerFactory.moveRemoteFile(uuid, src, dst, function (data) {
                return callback(data.data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };


        return {
            getPath: getPath,
            createFolder: createFolder,
            downloadFileFromInet: downloadFileFromInet,
            deleteFile: deleteFile,
            renameFile: renameFile,
            copyFile: copyFile,
            moveFile: moveFile
        };
    }]);
}());
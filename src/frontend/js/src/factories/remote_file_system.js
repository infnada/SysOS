(function () {
  "use strict";
  myApp.factory('remoteFileSystemFactory', ['ServerFactory', function (ServerFactory) {

    var getPath = function (id, path, callback) {
      return ServerFactory.getRemotePath(id, path, function (data) {
        return callback(data.data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var createFolder = function (id, path, callback) {
      return ServerFactory.createRemoteFolder(id, path, function (data) {
        return callback(data.data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var downloadFileFromInet = function (url, currentPath, currentConnection, callback) {
      return ServerFactory.remoteDownloadFileFromInet(url, currentPath, currentConnection, function (data) {
        return callback(data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var deleteFile = function (id, path, callback) {
      return ServerFactory.deleteRemoteFile(id, path, function (data) {
        return callback(data.data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var renameFile = function (id, source, dest, callback) {
      return ServerFactory.renameRemoteFile(id, source, dest, function (data) {
        return callback(data.data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };


    return {
      getPath: function (id, path, callback) {
        return getPath(id, path, callback);
      },
      createFolder: function (id, path, callback) {
        return createFolder(id, path, callback);
      },
      downloadFileFromInet: function (url, currentPath, currentConnection, callback) {
        return downloadFileFromInet(url, currentPath, currentConnection, callback);
      },
      deleteFile: function (id, path, callback) {
        return deleteFile(id, path, callback);
      },
      renameFile: function (id, source, dest, callback) {
        return renameFile(id, source, dest, callback);
      }
    }

  }]);
}());
(function () {
  "use strict";
  myApp.factory('fileSystemFactory', ['ServerFactory', 'Upload', 'toastr', function (ServerFactory, Upload, toastr) {

    var getFileSystemPath = function (path, callback) {
      return ServerFactory.getFileSystemPath(path, function (data) {
        return callback(data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var uploadFile = function (file) {

      file.upload = Upload.upload({
        url: '/api/file/upload',
        method: 'POST',
        headers: {
          'Content-Type': file.type
        },
        data: {file: file, 'path': file.path}
      });

      file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });

      return file.upload.then(function (response) {
        return file.result = response.data;
      }, function (response) {
        if (response.status > 0) {
          var errorMsg = response.status + ': ' + response.data;
          toastr.error(errorMsg, 'Error');
        }
      });

    };

    var getFileType = function (longname) {
      if (longname.charAt(0) === "d") return "folder";
      if (longname.charAt(0) === "l") return "folder";
      if (longname.charAt(0) === "-" && (longname.charAt(3) === "x")) return "file-code-o";
      if (longname.charAt(0) === "-") return "file";
    };

    var getFileContents = function (path, callback) {
      return ServerFactory.getFileContents(path, function (data) {
        return callback(data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var renameFile = function (path, oldName, newName, callback) {
      return ServerFactory.renameFile({
        path: path,
        oldName: oldName,
        newName: newName
      }, function (data) {
        return callback(data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var createFolder = function (path, name, callback) {
       return ServerFactory.createFolder({
         path: path,
         name: name
      }, function (data) {
         return callback(data.data);
      }, function (data) {
         console.log("Error: " + data);
      });
    };

    var deleteFile = function (path, name, callback) {
       return ServerFactory.deleteFile({
         path: path,
         name: name
      }, function (data) {
         return callback(data.data);
      }, function (data) {
         console.log("Error: " + data);
      });
    };

    var downloadFileFromInet = function (url, path, callback) {
       return ServerFactory.downloadFileFromInet(url, path, function (data) {
         return callback(data.data);
      }, function (data) {
         console.log("Error: " + data);
      });
    };

    return {
      getFileSystemPath: function (path, callback) {
        return getFileSystemPath(path, callback);
      },
      uploadFile: function (file) {
        return uploadFile(file);
      },
      getFileType: function (longname) {
        return getFileType(longname);
      },
      getFileContents: function (path, callback) {
        return getFileContents(path, callback);
      },
      renameFile: function (path, oldName, newName, callback) {
        return renameFile(path, oldName, newName, callback);
      },
      createFolder: function (path, name, callback) {
        return createFolder(path, name, callback);
      },
      deleteFile: function (path, name, callback) {
        return deleteFile(path, name, callback);
      },
      downloadFileFromInet: function (url, path, callback) {
        return downloadFileFromInet(url, path, callback);
      }
    }

  }]);
}());

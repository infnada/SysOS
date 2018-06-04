(function () {
    'use strict';
    SysOS.factory('fileSystemFactory', ['ServerFactory', 'Upload', 'toastr', function (ServerFactory, Upload, toastr) {

        var getFileSystemPath = function (path, callback) {
            return ServerFactory.getFileSystemPath(path, function (data) {
                return callback(data.data);
            }, function (data) {
                console.log('Error: ' + data);
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
            if (longname.charAt(0) === 'd') return 'folder';
            if (longname.charAt(0) === 'l') return 'folder';
            if (longname.charAt(0) === '-' && (longname.charAt(3) === 'x')) return 'file-code-o';
            if (longname.charAt(0) === '-') return 'file';
        };

        var getFileContents = function (path, callback) {
            return ServerFactory.getFileContents(path, function (data) {
                return callback(data.data);
            }, function (data) {
                console.log('Error: ' + data);
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
                console.log('Error: ' + data);
            });
        };

        var createFolder = function (path, name, callback) {
            return ServerFactory.createFolder({
                path: path,
                name: name
            }, function (data) {
                return callback(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var deleteFile = function (path, name, callback) {
            return ServerFactory.deleteFile({
                path: path,
                name: name
            }, function (data) {
                return callback(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var downloadFileFromInet = function (url, path, credential, callback) {
            return ServerFactory.downloadFileFromInet(url, path, credential, function (data) {
                return callback(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var copyFile = function (src, dst, callback) {
            return ServerFactory.copyFile(src, dst, function (data) {
                return callback(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        var moveFile = function (src, dst, callback) {
            return ServerFactory.moveFile(src, dst, function (data) {
                return callback(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        return {
            getFileSystemPath: getFileSystemPath,
            uploadFile: uploadFile,
            getFileType: getFileType,
            getFileContents: getFileContents,
            renameFile: renameFile,
            createFolder: createFolder,
            deleteFile: deleteFile,
            downloadFileFromInet: downloadFileFromInet,
            copyFile: copyFile,
            moveFile: moveFile
        };
    }]);
}());

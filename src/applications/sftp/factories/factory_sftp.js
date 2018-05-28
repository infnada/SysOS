(function () {
    'use strict';
    sftpApp.factory('sftpFactory', ['socket', 'fileSystemFactory', 'remoteFileSystemFactory', '$rootScope', 'toastr', 'connectionsFactory',
        function (socket, fileSystemFactory, remoteFileSystemFactory, $rootScope, toastr, connectionsFactory) {

            // Private
            var activeConnection = null;

            // Public

            var newData = function (data) {
                connectionsFactory.getConnectionByUuid(data.uuid).currentPath = data.path;
                connectionsFactory.getConnectionByUuid(data.uuid).currentData = data.text;
            };

            var newProp = function (data) {
                connectionsFactory.getConnectionByUuid(data.uuid)[data.prop] = data.text;

                // CONN CLOSE
                if (data.prop === 'status' && data.text === 'CONN CLOSE') {
                    connectionsFactory.getConnectionByUuid(data.uuid).state = 'disconnected';

                    // CON ERROR
                } else if (data.prop === 'status' && data.text !== 'SSH CONNECTION ESTABLISHED') {

                    // Error connecting
                    if (connectionsFactory.getConnectionByUuid(data.uuid).state === 'new') {
                        connectionsFactory.getConnectionByUuid(data.uuid).state = 'disconnected';
                    }
                    connectionsFactory.getConnectionByUuid(data.uuid).error = data.text;
                    toastr.error(data.text, 'Error (' + connectionsFactory.getConnectionByUuid(data.uuid).host + ')');

                    // CONN OK
                } else if (data.text === 'SSH CONNECTION ESTABLISHED') {
                    connectionsFactory.getConnectionByUuid(data.uuid).state = 'connected';
                    connectionsFactory.getConnectionByUuid(data.uuid).error = null;
                    toastr.success(data.text, 'Connected (' + connectionsFactory.getConnectionByUuid(data.uuid).host + ')');
                    $('#server_body').focus();
                }
            };

            // Called directly from app.js by socket.io Upload/download file
            var newProgress = function (data) {
                $rootScope.$broadcast('sftp__progress_data', data);
            };

            var doWithFile = function (file, uuid) {
                var fileType = fileSystemFactory.getFileType(file.longname);

                if (fileType === 'folder') {
                    goToPath(connectionsFactory.getConnectionByUuid(uuid).currentPath + file.filename + '/', uuid);
                }

                return fileType;
            };

            var goToPath = function (path, uuid) {
                return remoteFileSystemFactory.getPath(uuid, path, function (data) {
                    connectionsFactory.getConnectionByUuid(data.uuid).currentPath = data.type;
                    connectionsFactory.getConnectionByUuid(data.uuid).currentData = data.data;
                });
            };

            var createFolder = function (path, currentConnection) {
                return remoteFileSystemFactory.createFolder(currentConnection, path, function (data) {
                    connectionsFactory.getConnectionByUuid(data.uuid).currentPath = data.type;
                    connectionsFactory.getConnectionByUuid(data.uuid).currentData = data.data;
                });
            };

            var downloadFileFromInet = function (url, currentPath, currentConnection, callback) {
                return remoteFileSystemFactory.downloadFileFromInet(url, currentPath, currentConnection, function (data) {
                    callback(data);
                });
            };

            var deleteFile = function (filename, serverPath, currentConnection) {
                return remoteFileSystemFactory.deleteFile(currentConnection, serverPath + filename, function (data) {
                    connectionsFactory.getConnectionByUuid(data.uuid).currentPath = data.type;
                    connectionsFactory.getConnectionByUuid(data.uuid).currentData = data.data;
                });
            };

            var renameFile = function (fileToRename, filename, serverPath, currentConnection) {
                return remoteFileSystemFactory.renameFile(currentConnection, serverPath + fileToRename, serverPath + filename, function (data) {
                    connectionsFactory.getConnectionByUuid(data.uuid).currentPath = data.type;
                    connectionsFactory.getConnectionByUuid(data.uuid).currentData = data.data;
                });
            };

            var uploadFile = function (filename, localPath, serverPath, currentConnection) {
                socket.emit('sftp_session__file_upload', localPath + filename, serverPath + filename, currentConnection);
            };

            var downloadFile = function (filename, localPath, serverPath, currentConnection) {
                socket.emit('sftp_session__file_download', localPath + filename, serverPath + filename, currentConnection);
            };

            return {
                newData: newData,
                newProp: newProp,
                newProgress: newProgress,
                doWithFile: doWithFile,
                goToPath: goToPath,
                createFolder: createFolder,
                downloadFileFromInet: downloadFileFromInet,
                deleteFile: deleteFile,
                renameFile: renameFile,
                uploadFile: uploadFile,
                downloadFile: downloadFile,
                setActiveConnection: function (uuid) {
                    activeConnection = uuid;
                },
                activeConnection: function () {
                    return activeConnection;
                }
            };
        }]);
}());
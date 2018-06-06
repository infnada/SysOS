(function () {
    'use strict';
    sftpApp.controller('sftpBodyLocalController', ['$rootScope', '$scope', '$timeout', 'fileSystemFactory', 'Upload', 'ApplicationsFactory', 'sftpFactory', 'toastr', 'modalFactory',
        function ($rootScope, $scope, $timeout, fileSystemFactory, Upload, ApplicationsFactory, sftpFactory, toastr, modalFactory) {

        var _this = this;
        this.viewAsList = false;
        this.currentActive = 0;
        this.selection = true;
        this.cutFrom = null;
        this.copyFrom = null;
        this.pasteTo = null;
        this.lastPath = [];
        this.nextPath = [];

        // Parent scope
            /** @namespace $scope.$parent.sftpB */
            var sftpB = $scope.$parent.sftpB;

        /*
         * Init
         */

        // Get local filesystem folders
        this.localFileSystem = {
            currentPath: '/',
            currentData: ''
        };

        fileSystemFactory.getFileSystemPath('/', function (data) {
            _this.localFileSystem.currentData = data;
            $('.folders').focus();
        });

        /*
         * Bindings
         */
        $scope.$watch(function () {
            return _this.uploadFiles;
        }, function (files) {
            if (files != null) {
                // make files array for not multiple to be able to be used in ng-repeat in the ui
                if (!angular.isArray(files)) {
                    $timeout(function () {
                        _this.uploadFiles = files = [files];
                    });
                    return;
                }

                $scope.$emit('sftp__new_upload_file', _this.uploadFiles);

                // Upload each file
                for (var i = 0; i < files.length; i++) {
                    (function (f) {
                        fileSystemFactory.uploadFile(f).then(function (data) {
                            if (data.status === 'ok') {
                                _this.reloadPath();
                            }
                        });
                    })(files[i]);
                }
            }
        });

        /*
         * Current path contextmenu
         */
        this.localContextMenu = [
            {
                text: '<i class="fa fa-download"></i> Download from URL to current folder',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    var modalInstanceDownloadFromURL = modalFactory.openRegistredModal('input', '.window--sftp .window__main #local_body',
                        {
                            title: function () {
                                return 'Download file from URL';
                            },
                            text: function () {
                                return 'File URL';
                            },
                            button_text: function () {
                                return 'Download';
                            },
                            inputValue: function () {
                                return '';
                            }
                        }
                    );
                    modalInstanceDownloadFromURL.result.then(function (res) {

                        if (!res) return;

                        return fileSystemFactory.downloadFileFromInet(res, _this.localFileSystem.currentPath, '', function () {
                            _this.reloadPath();
                            toastr.success('File downloaded to ' + _this.localFileSystem.currentPath, 'Download file from URL');
                        });
                    });
                }
            },
            {
                text: '<i class="fa fa-folder"></i> Create Folder',
                click: function () {
                    _this.createFolder();
                }
            },
            null,
            {
                text: '<i class="fa fa-refresh"></i> Refresh',
                click: function () {
                    _this.reloadPath();
                }
            },
            null,
            [function () {
                return '<i class="fa fa-clipboard"></i> Paste';
            }, function ($itemScope) {
                if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                _this.pasteTo = _this.localFileSystem.currentPath;

                if (_this.cutFrom) {
                    return fileSystemFactory.moveFile(_this.cutFrom, _this.pasteTo, function () {
                        _this.reloadPath();
                        _this.cutFrom = null;
                        _this.pasteTo = null;
                    });
                }

                if (_this.copyFrom) {
                    return fileSystemFactory.copyFile(_this.copyFrom, _this.pasteTo, function () {
                        _this.reloadPath();
                        _this.copyFrom = null;
                        _this.pasteTo = null;
                    });
                }

            }, function () {
                if (_this.copyFrom === null && _this.cutFrom === null) return false;
                return true; // enabled = true, disabled = false
            }],
            null,
            {
                text: '<i class="fa fa-lock"></i> Permissions',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;


                }
            }

        ];

        /*
         * File contextmenu
         */
        this.fileContextMenu = [
            {
                text: '<i class="fa fa-upload"></i> Upload to Remote',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    var filename = $itemScope.file.filename;
                    var serverPath = sftpB.getActiveConnection().currentPath;
                    var localPath = _this.localFileSystem.currentPath;

                    $scope.$emit('sftp__new_upload_file', [{
                        uuid: sftpB.activeConnection,
                        name: filename,
                        source: localPath + filename,
                        path: serverPath + filename,
                        size: $itemScope.file.attrs.size,
                        progress: 0,
                        exchange: 'upload'
                    }]);

                    sftpFactory.uploadFile(filename, localPath, serverPath, sftpB.activeConnection);
                }
            },
            {
                text: '<i class="fa fa-download"></i> Download to local',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;


                }
            },
            [function ($itemScope) {
                if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                var filetype = _this.getFileType($itemScope.file.longname);

                if (filetype === 'folder') {
                    return '<i class="fa fa-folder-open"></i> Open';
                } else {
                    return '<i class="fa fa-edit"></i> Open with Notepad';
                }
            }, function ($itemScope) {
                if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;
                _this.doWithFile($itemScope.file);
            }, function () {
                // Enable or Disable
                return true; // enabled = true, disabled = false
            }],
            null,
            {
                text: '<i class="fa fa-files-o"></i> Copy',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    _this.cutFrom = null;
                    _this.copyFrom = _this.localFileSystem.currentPath + $itemScope.file.filename;
                }
            },
            {
                text: '<i class="fa fa-scissors"></i> Cut',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    _this.copyFrom = null;
                    _this.cutFrom = _this.localFileSystem.currentPath + $itemScope.file.filename;
                }
            },
            null,
            {
                text: '<i class="fa fa-font"></i> Rename',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    _this.fileToRename = $itemScope.file.filename;

                    var modalInstanceRenameFile = modalFactory.openRegistredModal('input', '.window--sftp .window__main #local_body #local_body',
                        {
                            title: function () {
                                return 'Rename file';
                            },
                            text: function () {
                                return 'File name';
                            },
                            button_text: function () {
                                return 'Rename';
                            },
                            inputValue: function () {
                                return $itemScope.file.filename;
                            }
                        }
                    );
                    modalInstanceRenameFile.result.then(function (res) {

                        if (!res) return;

                        _this.modalInputName = res;
                        _this.renameFile();

                    });
                }
            },
            {
                text: '<i class="fa fa-remove"></i> Delete',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    _this.modalInputName = $itemScope.file.filename;
                    var modalInstanceDeleteFile = modalFactory.openRegistredModal('question', '.window--sftp .window__main #local_body',
                        {
                            title: function () {
                                return 'Delete file ' + _this.modalInputName;
                            },
                            text: function () {
                                return 'Delete ' + _this.modalInputName + ' from SysOS?';
                            }
                        }
                    );
                    modalInstanceDeleteFile.result.then(function (res) {

                        if (res === true) return _this.deleteSelected();

                    });
                }
            },
            null,
            {
                text: '<i class="fa fa-lock"></i> Permissions',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;


                }
            }
        ];

        /*
         * Get file type (folder, file...)
         */
        this.getFileType = function (longname) {
            return fileSystemFactory.getFileType(longname);
        };

        /*
         * Get all contents from given folder path
         */
        this.getFolderContents = function (newPath) {
            fileSystemFactory.getFileSystemPath(newPath, function (data) {
                _this.search = undefined;
                _this.localFileSystem.currentData = data;
                _this.localFileSystem.currentPath = newPath;
                _this.resetActive();
            });
        };

        /*
         * ng-click functions
         */

        /*
         * Checks if is a file or folder and do something
         */
        this.doWithFile = function (file) {
            var filetype = _this.getFileType(file.longname);

            if (filetype === 'folder') {
                var newPath = _this.localFileSystem.currentPath + file.filename + '/';

                // Push the actual path to lastPath array (used by goPathBack())
                _this.lastPath.push(_this.localFileSystem.currentPath);
                // Reset nextPath
                _this.nextPath = [];

                _this.getFolderContents(newPath);
                $scope.$parent.$broadcast('sftp__local_path', newPath);

            } else {
                var filePath = _this.localFileSystem.currentPath + file.filename;

                fileSystemFactory.getFileContents(filePath, function (data) {
                    ApplicationsFactory.openApplication('notepad');
                    ApplicationsFactory.toggleApplication('notepad');

                    $timeout(function () {
                        $rootScope.$broadcast('notepad__new_data', data);
                    }, 100);

                });
            }
        };

        /*
         * Go to any folders by a given path
         */
        this.goToPath = function ($index) {
            var newPath = _this.localFileSystem.currentPath.split('/').splice(0, $index + 1).join('/') + '/';

            // Push the actual path to lastPath array (used by goPathBack())
            _this.lastPath.push(_this.localFileSystem.currentPath);
            // Reset nextPath
            _this.nextPath = [];

            _this.getFolderContents(newPath);
            $scope.$parent.$broadcast('sftp__local_path', newPath);
        };

        /*
         * Checks the last visited path and go to it
         */
        this.goPathBack = function () {
            if (_this.lastPath.length === 0) return;
            var newPath = _this.lastPath.pop();

            // Push the actual path to nextPath array (used by goPathForward())
            _this.nextPath.push(_this.localFileSystem.currentPath);

            _this.getFolderContents(newPath);
        };

        /*
         * If called goPathBack this function goes a path forward
         */
        this.goPathForward = function () {
            if (_this.nextPath.length === 0) return;
            var newPath = _this.nextPath.pop();

            // Push the actual path to nextPath array (used by goPathForward())
            _this.lastPath.push(_this.localFileSystem.currentPath);

            _this.getFolderContents(newPath);
        };

        /*
         * Get current path data
         */
        this.reloadPath = function () {
            fileSystemFactory.getFileSystemPath(_this.localFileSystem.currentPath, function (data) {
                _this.search = undefined;
                _this.localFileSystem.currentData = data;
                _this.resetActive();
            });
        };

        /*
         * Sets view mode (icons, detailed...)
         */
        this.toggleView = function () {
            _this.viewAsList = !_this.viewAsList;
            _this.resetActive();
        };

        /*
         * Creates a new folder
         */
        this.createFolder = function () {
            var modalInstanceCreateFolder = modalFactory.openRegistredModal('input', '.window--sftp .window__main #local_body',
                {
                    title: function () {
                        return 'Create new folder';
                    },
                    text: function () {
                        return 'Folder name';
                    },
                    button_text: function () {
                        return 'Create';
                    },
                    inputValue: function () {
                        return 'NewFolder';
                    }
                }
            );
            modalInstanceCreateFolder.result.then(function (res) {

                if (!res) return;

                return fileSystemFactory.createFolder(_this.localFileSystem.currentPath, res, function () {

                    _this.reloadPath();

                }).catch(function (e) {
                    console.log(e);
                });
            });
        };

        /*
         * Deletes selected files or folders
         */
        this.deleteSelected = function () {
            fileSystemFactory.deleteFile(_this.localFileSystem.currentPath, _this.modalInputName, function () {
                _this.reloadPath();
            });
        };

        /*
         * Rename file
         */
        this.renameFile = function () {
            fileSystemFactory.renameFile(_this.localFileSystem.currentPath, _this.fileToRename, _this.modalInputName, function () {
                _this.reloadPath();
            });
        };

        /*
         * Sets the fist item in the current path as active
         */
        this.resetActive = function () {
            _this.currentActive = 0;
            $('#local_body').focus();
        };

        /*
         * Sets an item file/folder active
         */
        this.setCurrentActive = function ($index) {
            $('#local_body').focus();
            $timeout.cancel(_this.selectTimeout);

            if ($index > _this.localFileSystem.currentData.length - 1) {
                _this.currentActive = 0;
            } else if ($index < 0) {
                _this.currentActive = _this.localFileSystem.currentData.length - 1;
            } else {
                _this.currentActive = $index;
            }

            _this.selection = false;
            _this.selectTimeout = $timeout(function () {
                _this.selection = true;
            }, 100);
        };

        /*
         * Keypress on item focus
         */
        this.handleItemKeyPress = function (keyEvent) {
            console.log(keyEvent);

            if (keyEvent.which === 46) {
                _this.modalInputName = _this.localFileSystem.currentData[_this.currentActive].filename;

                var modalInstanceDeleteFile = modalFactory.openRegistredModal('question', '.window--sftp .window__main #local_body',
                    {
                        title: function () {
                            return 'Delete file ' + _this.localFileSystem.currentData[_this.currentActive].filename;
                        },
                        text: function () {
                            return 'Delete ' + _this.localFileSystem.currentData[_this.currentActive].filename + ' from SysOS?';
                        }
                    }
                );
                modalInstanceDeleteFile.result.then(function (res) {

                    if (res === true) return _this.deleteSelected();

                });
            } else if (keyEvent.which === 113) {
                _this.fileToRename = _this.localFileSystem.currentData[_this.currentActive].filename;

                var modalInstanceRenameFile = modalFactory.openRegistredModal('input', '.window--sftp .window__main #local_body',
                    {
                        title: function () {
                            return 'Rename file';
                        },
                        text: function () {
                            return 'File name';
                        },
                        button_text: function () {
                            return 'Rename';
                        },
                        inputValue: function () {
                            return _this.fileToRename;
                        }
                    }
                );
                modalInstanceRenameFile.result.then(function (res) {

                    if (!res) return;

                    _this.modalInputName = res;
                    _this.renameFile();

                });
            } else if (keyEvent.which === 39) {
                _this.setCurrentActive(_this.currentActive + 1);
            } else if (keyEvent.which === 37) {
                _this.setCurrentActive(_this.currentActive - 1);
            } else if (keyEvent.which === 8) {
                _this.goPathBack();
            } else if (keyEvent.which === 13) {
                _this.doWithFile(_this.localFileSystem.currentData[_this.currentActive]);
            }
        };

    }]);
}());
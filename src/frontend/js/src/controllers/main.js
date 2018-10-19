(function () {
    'use strict';
    SysOS.controller('mainController', ['$rootScope', '$scope', '$timeout', '$filter', 'ApplicationsFactory', 'ServerFactory', 'modalFactory', 'toastr', 'mainFactory', 'fileSystemFactory',
        function ($rootScope, $scope, $timeout, $filter, ApplicationsFactory, ServerFactory, modalFactory, toastr, mainFactory, fileSystemFactory) {

        var _this = this;

        /*
         * Bindings
         */
        ApplicationsFactory.toggleApplication(null);
        this.opened_applications = ApplicationsFactory.opened_applications();

        this.showUser = false;
        this.user = 'root';
        this.password = '';
        this.currentActive = 0;

        // Set root path as a current path
        this.desktopFiles = {
            currentPath: '/root/Desktop/',
            currentData: ''
        };

        $scope.$watch(function () {
            return ApplicationsFactory.opened_applications();
        }, function (newValue) {
            _this.opened_applications = newValue;
        });

        $scope.$on('refreshPath', function (event, data) {
            if (data === '/root/Desktop/') {
                _this.reloadPath();
            }
        });

        /**
         * On file dragstart
         *
         * @param evt
         * @param ui
         */
        this.onStartItem = function (evt, ui) {
            ui.helper.prevObject.scope().file.dragFrom = '/root/Desktop/';
        };

        /**
         * On file dropped to desktop
         *
         * @param evt
         * @param ui
         * @returns {*}
         */
        this.onDropItem = function (evt, ui) {
            if ($rootScope.currentFileDrop !== 'desktop') return;

            // Fix drop from /root/Desktop
            if (angular.isUndefined(ui.draggable.scope().$parent.file)) ui.draggable.scope().$parent.file = ui.draggable.scope().file;

            // Do not move files to same directory
            if (ui.draggable.scope().$parent.file.dragFrom === '/root/Desktop/') return;

            var object = $filter('filter')(_this.desktopFiles.currentData, {
                filename: ui.draggable.scope().$parent.file.filename
            });

            if (object.length !== 0) {
                return modalFactory.openLittleModal('Move file', 'A file with the same name already exists. Can\'t move it.', '#desktop_body', 'plain');
            }

            _this.cutFrom = ui.draggable.scope().$parent.file.dragFrom + ui.draggable.scope().$parent.file.filename;
            _this.pasteTo = '/root/Desktop/';

            return fileSystemFactory.moveFile(_this.cutFrom, _this.pasteTo, function () {
                _this.cutFrom = null;
                _this.pasteTo = null;

                $rootScope.$broadcast('refreshPath', '/root/Desktop/');
                $rootScope.$broadcast('refreshPath', ui.draggable.scope().$parent.file.dragFrom);
            });
        };

        /*
         * Get file type (folder, file...)
         */
        this.getFileType = function (longname) {
            return fileSystemFactory.getFileType(longname);
        };

        /*
         * Sets the fist item in the current path as active
         */
        this.resetActive = function () {
            _this.currentActive = 0;
            $('#desktop_body').focus();
        };

        /*
         * Get current path data
         */
        this.reloadPath = function () {
            fileSystemFactory.getFileSystemPath(_this.desktopFiles.currentPath, function (data) {
                _this.search = undefined;
                _this.desktopFiles.currentData = data;
                _this.resetActive();
            });
        };

        /*
         * Checks if is a file or folder and do something
         */
        this.doWithFile = function (file) {
            var filetype = _this.getFileType(file.longname);

            if (filetype === 'folder') {
                var newPath = _this.desktopFiles.currentPath + file.filename + '/';

                //TODO: open explorer

                _this.getFolderContents(newPath);

            } else {
                var filePath = _this.desktopFiles.currentPath + file.filename;

                fileSystemFactory.getFileContents(filePath, function (data) {

                    ApplicationsFactory.openApplication('notepad').then(function () {
                        // Wait for next digest circle before continue in order, preventing $element.click event to "re" toggle to current application
                        $timeout(function () {
                            ApplicationsFactory.toggleApplication('notepad');
                            $rootScope.$broadcast('notepad__new_data', data);
                        }, 0, false);
                    });

                });
            }
        };

        /*
         * Creates a new folder
         */
        this.createFolder = function () {
            var modalInstanceCreateFolder = modalFactory.openRegistredModal('input', '.desktop .desktop__body',
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

                return fileSystemFactory.createFolder(_this.desktopFiles.currentPath, res, function () {

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
            var modalInstanceDeleteFile = modalFactory.openRegistredModal('question', '.desktop .desktop__body',
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

                if (res === true) {
                    return fileSystemFactory.deleteFile(_this.desktopFiles.currentPath, _this.modalInputName, function () {

                        _this.reloadPath();

                    }).catch(function (e) {
                        console.log(e);
                    });
                }

            });
        };

        /*
         * Rename file
         */
        this.renameFile = function () {
            var modalInstanceRenameFile = modalFactory.openRegistredModal('input', '.desktop .desktop__body',
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

                return fileSystemFactory.renameFile(_this.desktopFiles.currentPath, _this.fileToRename, _this.modalInputName, function () {

                    _this.reloadPath();

                }).catch(function (e) {
                    console.log(e);
                });

            });
        };

        /*
         * Desktop contextmenu
         */
        this.desktopContextMenu = [
            {
                text: '<i class="fa fa-download"></i> Download from URL to Desktop',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    var modalInstanceDownloadFromURL = modalFactory.openRegistredModal('input', '.desktop .desktop__body',
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

                        return fileSystemFactory.downloadFileFromInet(res, _this.desktopFiles.currentPath, '', function () {
                            _this.reloadPath();
                            toastr.success('File downloaded to ' + _this.desktopFiles.currentPath, 'Download file from URL');
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

                _this.pasteTo = _this.desktopFiles.currentPath;

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

                        //TODO

                }
            }

        ];

        /*
         * File contextmenu
         */
        this.fileContextMenu = [
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
                    _this.copyFrom = _this.desktopFiles.currentPath + $itemScope.file.filename;
                }
            },
            {
                text: '<i class="fa fa-scissors"></i> Cut',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    _this.copyFrom = null;
                    _this.cutFrom = _this.desktopFiles.currentPath + $itemScope.file.filename;
                }
            },
            null,
            {
                text: '<i class="fa fa-font"></i> Rename',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    _this.fileToRename = $itemScope.file.filename;
                    return _this.renameFile();
                }
            },
            {
                text: '<i class="fa fa-remove"></i> Delete',
                click: function ($itemScope) {
                    if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

                    _this.modalInputName = $itemScope.file.filename;
                    return _this.deleteSelected();
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
         * Sets an item file/folder active
         */
        this.setCurrentActive = function ($index) {
            $('#desktop_body').focus();
            $timeout.cancel(_this.selectTimeout);

            if ($index > _this.desktopFiles.currentData.length - 1) {
                _this.currentActive = 0;
            } else if ($index < 0) {
                _this.currentActive = _this.desktopFiles.currentData.length - 1;
            } else {
                _this.currentActive = $index;
            }

            _this.selection = false;
            _this.selectTimeout = $timeout(function () {
                _this.selection = true;
            }, 100);
        };

        /**
         * ng-click functions
         */
        this.login = function () {
            return ServerFactory.login(_this.user, _this.password, function (data) {
                if (data.data.status === 'error') return toastr.error(data.data.data, 'Credential Manager');

                mainFactory.init();
            }, function (data) {
                console.log(data);
            });
        };

        this.handleDesktopClick = function ($event) {

            if ($event.target.attributes.id !== undefined && $event.target.attributes.id.value === 'desktop_body') {
                ApplicationsFactory.toggleApplication(null);
                _this.currentActive = null;
            }

        };

        /*
         * Keypress on item focus
         */
        this.handleItemKeyPress = function (keyEvent) {
            // Do nothing if some application is active
            if ($rootScope.taskbar__item_open !== null) return;

            // Do nothing if there is no active item unless its side arrows
            if (_this.currentActive === null && keyEvent.which !== 39 && keyEvent.which === 37) return;

            if (keyEvent.which === 46) {
                _this.modalInputName = _this.desktopFiles.currentData[_this.currentActive].filename;

                _this.deleteSelected();
            } else if (keyEvent.which === 113) {
                _this.fileToRename = _this.desktopFiles.currentData[_this.currentActive].filename;

                _this.renameFile();
            } else if (keyEvent.which === 39) {
                if (_this.currentActive === null) return _this.currentActive = 0;
                _this.setCurrentActive(_this.currentActive + 1);
            } else if (keyEvent.which === 37) {
                if (_this.currentActive === null) return _this.currentActive = 0;
                _this.setCurrentActive(_this.currentActive - 1);
            } else if (keyEvent.which === 13) {
                _this.doWithFile(_this.desktopFiles.currentData[_this.currentActive]);
            }
        };

    }]);
}());

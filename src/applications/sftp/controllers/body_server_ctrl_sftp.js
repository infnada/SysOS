(function () {
	"use strict";
	sftpApp.controller('sftpBodyServerController', ['$scope', '$timeout', 'fileSystemFactory', 'sftpFactory', 'remoteFileSystemFactory',
		function ($scope, $timeout, fileSystemFactory, sftpFactory, remoteFileSystemFactory) {

		var _this = this;
		this.viewAsList = false;
		this.showModal = false;
		this.currentActive = 0;
		this.localFileSystemPath = '/';
		this.selection = true;
		this.cutFrom = null;
		this.copyFrom = null;
		this.lastPath = [];
		this.nextPath = [];

		// Parent scope
		var sftpB = $scope.$parent.$parent.sftpB;

		/*
		 * Bindings
		 */

		// Variable needed to know where to download a file from remoteServer
		$scope.$on('sftp__local_path', function (event, data) {
			_this.localFileSystemPath = data;
		});

		this.serverContextMenu = [
			{
				text: '<i class="fa fa-download"></i> Download from URL to current folder',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					_this.modalType = "Download from url";
					_this.fileUrl = "";
					_this.showModal = true;
				}
			},
			{
				text: '<i class="fa fa-folder"></i> Create Folder',
				click: function () {
					_this.createFolder();
				}
			},
			null,
			[function () {
				return '<i class="fa fa-clipboard"></i> Paste';
			}, function ($itemScope) {
				if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

				_this.pasteTo = sftpB.getActiveConnection().currentPath;

				if (_this.cutFrom) {
					return remoteFileSystemFactory.moveFile(sftpB.activeConnection, _this.cutFrom, _this.pasteTo, function () {
						_this.reloadPath();
						_this.cutFrom = null;
						_this.pasteTo = null;
					});
				}

				if (_this.copyFrom) {
					return remoteFileSystemFactory.copyFile(sftpB.activeConnection, _this.copyFrom, _this.pasteTo, function () {
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

		this.fileContextMenu = [
			{
				text: '<i class="fa fa-cloud-download"></i> Download to SysOS',
				click: function ($itemScope) {

					var filename = $itemScope.file.filename;
					var serverPath = sftpB.getActiveConnection().currentPath;
					var localPath = _this.localFileSystemPath;

					$scope.$emit('sftp__new_upload_file', [{
						uuid: sftpB.activeConnection,
						name: filename,
						source: serverPath + filename,
						path: localPath + filename,
						size: $itemScope.file.attrs.size,
						progress: 0,
						exchange: 'download'
					}]);

					sftpFactory.downloadFile(filename, localPath, serverPath, sftpB.activeConnection);

				}
			},
			{
				text: '<i class="fa fa-download"></i> Download to Local',
				click: function ($itemScope, $event, modelValue, text, $li) {
				}
			},
			[function ($itemScope) {
				if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

				var filetype = _this.getFileType($itemScope.file.longname);

				if (filetype === "folder") {
					return '<i class="fa fa-folder-open"></i> Open';
				} else {
					return '<i class="fa fa-edit"></i> Open with Notepad';
				}
			}, function ($itemScope) {
				if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;
				_this.doWithFile($itemScope.file)
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
					_this.copyFrom = sftpB.getActiveConnection().currentPath + $itemScope.file.filename;
				}
			},
			{
				text: '<i class="fa fa-scissors"></i> Cut',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					_this.copyFrom = null;
					_this.cutFrom = sftpB.getActiveConnection().currentPath + $itemScope.file.filename;
				}
			},
			null,
			{
				text: '<i class="fa fa-font"></i> Rename',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					_this.modalType = "Rename";
					_this.fileToRename = $itemScope.file.filename;
					_this.modalInputName = $itemScope.file.filename;
					_this.showModal = true;
				}
			},
			{
				text: '<i class="fa fa-remove"></i> Delete',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					_this.modalType = "Delete File";
					_this.modalInputName = $itemScope.file.filename;
					_this.showModal = true;
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

		this.getFileType = function (longname) {
			return fileSystemFactory.getFileType(longname);
		};

		/*
		 * ng-click functions
		 */
		this.doWithFile = function (file) {
			var currentPath = sftpB.getActiveConnection().currentPath;
			_this.search = undefined;
			var fileType =  sftpFactory.doWithFile(file, sftpB.activeConnection);

			if (fileType === "folder") {
				// Push the actual path to lastPath array (used by goPathBack())
				_this.lastPath.push(currentPath);
				// Reset nextPath
				_this.nextPath = [];
			}

			_this.resetActive();
		};

		this.goToPath = function ($index, fullPath) {
			var currentPath = sftpB.getActiveConnection().currentPath;
			var path;

			if ($index === false && fullPath) {
				// This is called ONLY from goPathBack or goPathForward
				path = fullPath;

				sftpFactory.goToPath(path, sftpB.activeConnection);

				_this.resetActive();
			} else {
				path = sftpB.getActiveConnection().currentPath.split('/').splice(0, $index + 1).join('/') + '/';

				// Push the actual path to lastPath array (used by goPathBack())
				_this.lastPath.push(currentPath);
				// Reset nextPath
				_this.nextPath = [];

				_this.resetActive();
			}
		};

		/*
		 * Checks the last visited path and go to it
		 */
		this.goPathBack = function () {
			if (_this.lastPath.length === 0) return;
			var currentPath = sftpB.getActiveConnection().currentPath;
			var newPath = _this.lastPath.pop();

			// Push the actual path to nextPath array (used by goPathForward())
			_this.nextPath.push(currentPath);

			_this.search = undefined;
			_this.goToPath(false, newPath);
			_this.resetActive();
		};

		/*
		 * If called goPathBack this function goes a path forward
		 */
		this.goPathForward = function () {
			if (_this.nextPath.length === 0) return;
			var currentPath = sftpB.getActiveConnection().currentPath;
			var newPath = _this.nextPath.pop();

			// Push the actual path to nextPath array (used by goPathForward())
			_this.lastPath.push(currentPath);

			_this.search = undefined;
			_this.goToPath(false, newPath);
			_this.resetActive()
		};

		this.reloadPath = function () {
			var path = sftpB.getActiveConnection().currentPath;
			sftpFactory.goToPath(path, sftpB.activeConnection);
			_this.resetActive();
		};

		this.createFolder = function () {
			_this.modalType = "Create Folder";
			_this.modalInputName = "New Folder";
			_this.showModal = true;
		};

		this.toggleView = function () {
			_this.viewAsList = !_this.viewAsList;
			_this.resetActive();
		};

		this.deleteSelected = function () {
			var serverPath = sftpB.getActiveConnection().currentPath;

			sftpFactory.deleteFile(_this.modalInputName, serverPath, sftpB.activeConnection);
			_this.showModal = false;
		};

		this.resetActive = function () {
			_this.currentActive = 0;
			$("#server_body").focus();
		};

		// Sets an item file/folder active
		this.setCurrentActive = function ($index) {
			$("#server_body").focus();
			$timeout.cancel(_this.selectTimeout);

			if ($index > sftpB.getActiveConnection().currentData.length - 1) {
				_this.currentActive = 0;
			} else if ($index < 0) {
				_this.currentActive = sftpB.getActiveConnection().currentData.length - 1;
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
			if (_this.showModal === true) return;

			if (keyEvent.which === 46) {
				_this.modalType = "Delete File";
				_this.modalInputName = sftpB.getActiveConnection().currentData[_this.currentActive].filename;
				_this.showModal = true;
			} else if (keyEvent.which === 113) {
				_this.modalType = "Rename";
				_this.fileToRename = sftpB.getActiveConnection().currentData[_this.currentActive].filename;
				_this.modalInputName = sftpB.getActiveConnection().currentData[_this.currentActive].filename;
				_this.showModal = true;
			} else if (keyEvent.which === 39) {
				_this.setCurrentActive(_this.currentActive + 1);
			} else if (keyEvent.which === 37) {
				_this.setCurrentActive(_this.currentActive - 1);
			} else if (keyEvent.which === 8) {
				// go back
			} else if (keyEvent.which === 13) {
				_this.doWithFile(sftpB.getActiveConnection().currentData[_this.currentActive]);
			}
		};

		/*
		 * Keypress on action modal
		 */
		this.handleKeyPress = function (keyEvent) {
			var serverPath;
			console.log(_this.modalType);
			if (keyEvent.which === 13) {
				if (_this.modalType === "Rename") {
					serverPath = sftpB.getActiveConnection().currentPath;

					sftpFactory.renameFile(_this.fileToRename, _this.modalInputName, serverPath, sftpB.activeConnection);
					$timeout(function () {
						_this.showModal = false;
					}, 200)
				} else if (_this.modalType === "Create Folder") {
					serverPath = sftpB.getActiveConnection().currentPath;

					sftpFactory.createFolder(serverPath + _this.modalInputName, sftpB.activeConnection);
					$timeout(function () {
						_this.showModal = false;
					}, 200)
				} else if (_this.modalType === "Download from url") {
					sftpFactory.downloadFileFromInet(_this.fileUrl, sftpB.getActiveConnection().currentPath, sftpB.activeConnection, function (data) {
						console.log(data);
						_this.reloadPath();
						_this.showModal = false;
					});
				}
			} else if (keyEvent.which === 27) {
				_this.showModal = false;
				_this.resetActive();
			}
		};

	}]);
}());
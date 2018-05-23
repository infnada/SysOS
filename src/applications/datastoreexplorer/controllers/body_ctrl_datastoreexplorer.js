(function () {
	"use strict";
	datastoreexplorerApp.controller('deBodyController', ['$rootScope', '$scope', '$timeout', 'fileSystemFactory', 'Upload', 'ApplicationsFactory', 'vmwareFactory', 'modalFactory',
		function ($rootScope, $scope, $timeout, fileSystemFactory, Upload, ApplicationsFactory, vmwareFactory, modalFactory) {

		var _this = this;
		this.showExplorer = false;
		this.viewAsList = false;
		this.currentActive = 0;
		this.selection = true;
		this.cutFrom = null;
		this.copyFrom = null;
		this.pasteTo = null;
		this.lastPath = [];
		this.nextPath = [];

		/*
		 * Init
		 */

		// Set root path as a current path
		this.localFileSystem = {
			currentPath: "/",
			currentData: ""
		};

		/*
		 * Main function. Get datastore files
		 */
		var init = function () {
			modalFactory.openLittleModal('PLEASE WAIT', 'Connecting to Datastore...', '.window--datastoreexplorer .window__main', 'plain');
			return vmwareFactory.connectvCenterSoap(_this.datastoreData.credential, _this.datastoreData.host, _this.datastoreData.port).then(function (data) {
				if (data.status === "error") throw new Error("Failed to connect to vCenter");

				modalFactory.changeModalText('Getting data...', '.window--datastoreexplorer .window__main');

				return vmwareFactory.getFilesDataFromDatastore(_this.datastoreData.credential, _this.datastoreData.host, _this.datastoreData.port, _this.datastoreData.id, _this.datastoreData.name, '/').then(function (data) {
					if (data.status === "error") throw new Error("Failed to get Datastore files");

					var obj = data.data[0].propSet.info.result;

					delete obj.datastore;
					delete obj.folderPath;
					delete obj.xsi_type;

					data = Object.keys(obj).map(function(key) {
						var toReturn = obj[key];

						if (toReturn.xsi_type === "FolderFileInfo") {
							toReturn.fileType = "folder";
						} else {
							toReturn.fileType = _this.getFileType(toReturn);
						}
						return toReturn;
					});

					_this.search = undefined;
					_this.localFileSystem.currentData = data;
					_this.resetActive();
					modalFactory.closeModal('.window--datastoreexplorer .window__main');
				});

			}).catch(function (e) {
				console.log(e);
				modalFactory.closeModal('.window--datastoreexplorer .window__main');
			});
		};

		/*
		 * Get root path files
		 */

		$scope.$on('datastoreexplorer__restore_datastore_files', function (event, data) {
			_this.datastoreData = data;

			return init();
		});

		/*
		 * Bindings
		 */

		/*
		 * Current path contextmenu
		 */
		this.localContextMenu = [
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

				if (_this.cutFrom) return _this.moveFile();
				if (_this.copyFrom) return _this.copyFile();

			}, function () {
				if (_this.copyFrom === null && _this.cutFrom === null) return false;
				return true; // enabled = true, disabled = false
			}]

		];

		/*
		 * File contextmenu
		 */
		this.fileContextMenu = [
			{
				text: '<i class="fa fa-download"></i> Download to SysOS (not yet)',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;


				}
			},
			null,
			{
				text: '<i class="fa fa-files-o"></i> Copy',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					_this.cutFrom = null;
					_this.copyFrom = _this.localFileSystem.currentPath + $itemScope.file.path;
				}
			},
			{
				text: '<i class="fa fa-files-o"></i> Copy to other Datastore (not yet)',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					//_this.cutFrom = null;
					//_this.copyFrom = _this.localFileSystem.currentPath + $itemScope.file.path;
				}
			},
			{
				text: '<i class="fa fa-scissors"></i> Cut',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					_this.copyFrom = null;
					_this.cutFrom = _this.localFileSystem.currentPath + $itemScope.file.path;
				}
			},
			null,
			{
				text: '<i class="fa fa-font"></i> Rename',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					_this.fileToRename = $itemScope.file.path;

					var modalInstanceRemoveConnection = modalFactory.openLittleModal('Rename file', 'File name', '.window--datastoreexplorer .window__main', 'input', 'Rename', $itemScope.file.path);
					modalInstanceRemoveConnection.result.then(function (res) {

						//TODO: check backdrop click
						if (res !== false) {
							_this.modalInputName = res;
							_this.renameFile();
						}

					});
				}
			},
			{
				text: '<i class="fa fa-remove"></i> Delete',
				click: function ($itemScope) {
					if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

					_this.modalInputName = $itemScope.file.path;
					var modalInstanceRemoveConnection = modalFactory.openLittleModal('Delete file ' + _this.modalInputName, 'Delete ' + _this.modalInputName + ' from datastore?', '.window--datastoreexplorer .window__main', 'question');
					modalInstanceRemoveConnection.result.then(function (res) {

						if (res === true) return _this.deleteSelected();

					});
				}
			}
		];

		/*
		 * Get file type (folder, file...)
		 */
		this.getFileType = function (file) {
			if (file.path.substr(-4) === ".vmx") return "file-code-o";
			if (file.path.substr(-4) === ".log") return "file-text";
			if (file.path.substr(-6) === ".nvram") return "file";
			if (file.path.substr(-5) === ".vmdk") return "hdd-o";
			if (file.path.substr(-5) === ".vmem") return "file";
			if (file.path.substr(-5) === ".vmsd") return "file";
			if (file.path.substr(-5) === ".vmsn") return "file";
			if (file.path.substr(-5) === ".vmss") return "file";
			if (file.path.substr(-5) === ".vmxf") return "file";
			if (file.path.substr(-5) === ".vmtm") return "file";
			if (file.path.substr(-5) === ".iso") return "file-archive-o";
			return "file";
		};

		/*
		 * Get all contents from given folder path
		 */
		this.getFolderContents = function (newPath) {
			modalFactory.openLittleModal('PLEASE WAIT', 'Getting data...', '.window--datastoreexplorer .window__main', 'plain');

			return vmwareFactory.getFilesDataFromDatastore(_this.datastoreData.credential, _this.datastoreData.host, _this.datastoreData.port, _this.datastoreData.id, _this.datastoreData.name, newPath).then(function (data) {
				if (data.status === "error") throw new Error("Failed to get Datastore files");

				var obj = data.data[0].propSet.info.result;

				delete obj.datastore;
				delete obj.folderPath;
				delete obj.xsi_type;

				data = Object.keys(obj).map(function(key) {
					var toReturn = obj[key];

					if (toReturn.xsi_type === "FolderFileInfo") {
						toReturn.fileType = "folder";
					} else {
						toReturn.fileType = _this.getFileType(toReturn);
					}
					return toReturn;
				});

				_this.search = undefined;
				_this.localFileSystem.currentData = data;
				_this.localFileSystem.currentPath = newPath;
				_this.resetActive();
				modalFactory.closeModal('.window--datastoreexplorer .window__main');

			}).catch(function (e) {
				console.log(e);
				modalFactory.closeModal('.window--datastoreexplorer .window__main');
			});
		};

		/*
		 * ng-click functions
		 */

		/*
		 * Main function on body template
		 */
		this.showDatastores = function (type) {

			// Do not continue if have datastoreData fetched by a $broadcast backupsm__restore_datastore_files
			if (_this.datastoreData) return;

			if (type === "vmware") {
				var modalInstance = modalFactory.openLittleModal('Select Datastore', '', '.window--datastoreexplorer .window__main', 'DatastoreSelectable');
				modalInstance.result.then(function (datastore) {
					_this.datastoreData = datastore;
					_this.showExplorer = false;

					return init();
				});
			}

			// TODO
			if (type === "netapp") {
				modalFactory.openLittleModal('NetApp Volume Explorer', 'Not available in this release', '.window--datastoreexplorer .window__main', 'plain');
			}
		};

		/*
		 * Checks if is a file or folder and do something
		 */
		this.doWithFile = function (file) {
			var filetype = file.fileType;

			if (filetype === "folder") {
				var newPath = _this.localFileSystem.currentPath + file.path + '/';

				// Push the actual path to lastPath array (used by goPathBack())
				_this.lastPath.push(_this.localFileSystem.currentPath);
				// Reset nextPath
				_this.nextPath = [];

				_this.getFolderContents(newPath);

			} else {
				console.log("download file not yet");
				var filePath = _this.localFileSystem.currentPath + file.path;

				/*fileSystemFactory.getFileContents(filePath, function (data) {
					ApplicationsFactory.openApplication("notepad");
					ApplicationsFactory.toggleApplication("notepad");

					$timeout(function () {
						$rootScope.$broadcast("notepad__new_data", data);
					}, 100);

				});*/
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
			_this.getFolderContents(_this.localFileSystem.currentPath);
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

			var modalInstanceRemoveConnection = modalFactory.openLittleModal('Create new folder', 'Folder name', '.window--datastoreexplorer .window__main', 'input', 'Create', 'NewFolder');
			modalInstanceRemoveConnection.result.then(function (res) {

				//TODO: check backdrop click
				if (res !== false) {
					modalFactory.openLittleModal('PLEASE WAIT', 'Creating folder...', '.window--datastoreexplorer .window__main', 'plain');

					return vmwareFactory.createFolderToDatastore(
						_this.datastoreData.credential,
						_this.datastoreData.host,
						_this.datastoreData.port,
						_this.datastoreData.name,
						_this.localFileSystem.currentPath + res, // folder name
						_this.datastoreData.datacenter
					).then(function(data) {
						if (data.status === "error") throw new Error("Failed to create folder");

						modalFactory.closeModal('.window--datastoreexplorer .window__main');

						_this.reloadPath();
					}).catch(function (e) {
						console.log(e);
						modalFactory.closeModal('.window--datastoreexplorer .window__main');
					});
				}

			});

		};

		/*
		 * Renames a file
		 */
		this.renameFile = function () {
			modalFactory.openLittleModal('PLEASE WAIT', 'Renaming file...', '.window--datastoreexplorer .window__main', 'plain');

			vmwareFactory.moveFileFromDatastore(
				_this.datastoreData.credential,
				_this.datastoreData.host,
				_this.datastoreData.port,
				_this.datastoreData.name,
				_this.localFileSystem.currentPath + _this.fileToRename, // original file name
				_this.datastoreData.datacenter,
				_this.datastoreData.name,
				_this.localFileSystem.currentPath + _this.modalInputName, // new file name
				_this.datastoreData.datacenter
			).then(function(data) {
				if (data.status === "error") throw new Error("Failed to rename the fie");

				modalFactory.closeModal('.window--datastoreexplorer .window__main');

				_this.reloadPath();
			}).catch(function (e) {
				console.log(e);
				modalFactory.closeModal('.window--datastoreexplorer .window__main');
			});
		};

		/*
		 * Copy a file
		 */
		this.copyFile = function () {
			modalFactory.openLittleModal('PLEASE WAIT', 'Copying file...', '.window--datastoreexplorer .window__main', 'plain');

			var file_name = _this.copyFrom.split('/').pop();

			return vmwareFactory.copyFileFromDatastore(
				_this.datastoreData.credential,
				_this.datastoreData.host,
				_this.datastoreData.port,
				_this.datastoreData.name,
				_this.copyFrom, // original file
				_this.datastoreData.datacenter,
				_this.datastoreData.name,
				_this.pasteTo + file_name, // new file destination
				_this.datastoreData.datacenter
			).then(function(data) {
				if (data.status === "error") throw new Error("Failed to rename the fie");

				modalFactory.closeModal('.window--datastoreexplorer .window__main');

				_this.copyFrom = null;
				_this.pasteTo = null;
				_this.reloadPath();
			}).catch(function (e) {
				console.log(e);
				modalFactory.closeModal('.window--datastoreexplorer .window__main');
			});
		};

		/*
		 * Move a file
		 */
		this.moveFile = function () {
			modalFactory.openLittleModal('PLEASE WAIT', 'Moving file...', '.window--datastoreexplorer .window__main', 'plain');

			var file_name = _this.cutFrom.split('/').pop();

			return vmwareFactory.moveFileFromDatastore(
				_this.datastoreData.credential,
				_this.datastoreData.host,
				_this.datastoreData.port,
				_this.datastoreData.name,
				_this.cutFrom, // original file
				_this.datastoreData.datacenter,
				_this.datastoreData.name,
				_this.pasteTo + file_name, // new file destination
				_this.datastoreData.datacenter
			).then(function(data) {
				if (data.status === "error") throw new Error("Failed to rename the fie");

				modalFactory.closeModal('.window--datastoreexplorer .window__main');

				_this.cutFrom = null;
				_this.pasteTo = null;
				_this.reloadPath();
			}).catch(function (e) {
				console.log(e);
				modalFactory.closeModal('.window--datastoreexplorer .window__main');
			});
		};

		/*
		 * Deletes selected files or folders
		 */
		this.deleteSelected = function () {
			modalFactory.openLittleModal('PLEASE WAIT', 'Deleting file...', '.window--datastoreexplorer .window__main', 'plain');

			vmwareFactory.deleteFileFromDatastore(
				_this.datastoreData.credential,
				_this.datastoreData.host,
				_this.datastoreData.port,
				_this.datastoreData.name,
				_this.localFileSystem.currentPath + _this.modalInputName,
				_this.datastoreData.datacenter
			).then(function(data) {
				if (data.status === "error") throw new Error("Failed to delete the fie");

				modalFactory.closeModal('.window--datastoreexplorer .window__main');

				_this.reloadPath();
			}).catch(function (e) {
				console.log(e);
				modalFactory.closeModal('.window--datastoreexplorer .window__main');
			});
		};

		/*
		 * Sets the fist item in the current path as active
		 */
		this.resetActive = function () {
			_this.currentActive = 0;
			$("#local_body").focus();
		};

		/*
		 * Sets an item file/folder active
		 */
		this.setCurrentActive = function ($index) {
			$("#local_body").focus();
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

			if (keyEvent.which === 46) { // DEL
				_this.modalInputName = _this.localFileSystem.currentData[_this.currentActive].path;

				var modalInstanceRemoveConnection = modalFactory.openLittleModal('Delete file ' + _this.modalInputName, 'Delete ' + _this.modalInputName + ' from datastore?', '.window--datastoreexplorer .window__main', 'question');
				modalInstanceRemoveConnection.result.then(function (res) {

					if (res === true) return _this.deleteSelected();

				});

			} else if (keyEvent.which === 113) { // F2
				_this.fileToRename = _this.localFileSystem.currentData[_this.currentActive].path;

				var modalInstanceRemoveConnection = modalFactory.openLittleModal('Rename file', 'File name', '.window--datastoreexplorer .window__main', 'input', 'Rename', _this.fileToRename);
				modalInstanceRemoveConnection.result.then(function (res) {

					//TODO: check backdrop click
					if (res !== false) {
						_this.modalInputName = res;
						_this.renameFile();
					}

				});

			} else if (keyEvent.which === 39) { //ARROW
				_this.setCurrentActive(_this.currentActive + 1);
			} else if (keyEvent.which === 37) { // ARROW
				_this.setCurrentActive(_this.currentActive - 1);
			} else if (keyEvent.which === 8) { // BACKSPACE
				_this.goPathBack();
			} else if (keyEvent.which === 13) { // ENTER
				//_this.doWithFile(_this.localFileSystem.currentData[_this.currentActive]);
			}
		};

	}]);
}());
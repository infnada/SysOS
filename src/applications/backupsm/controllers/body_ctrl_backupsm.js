(function () {
	"use strict";
	backupsmApp.controller('bmBodyController', ['$rootScope', '$scope', '$filter', '$timeout', '$log', 'uuid', 'backupsmFactory', 'modalFactory', 'ApplicationsFactory', 'vmwareFactory',
		function ($rootScope, $scope, $filter, $timeout, $log, uuid, backupsmFactory, modalFactory, ApplicationsFactory, vmwareFactory) {

			var _this = this;

			this.viewSide = true;
			this.restores = [];
			this.activeRestore = null;

			/*
			 * Bindings
			 */
			$scope.$watch(function(){
				return backupsmFactory.getRestores();
			}, function(newValue){
				_this.restores = newValue;
			});

			$scope.$watch(function(){
				return backupsmFactory.getActiveRestore();
			}, function(newValue){
				_this.activeRestore = newValue;
			});

			/*
			 * Returns restore data from active restore
			 */
			this.getActiveRestore = function () {
				return $filter('filter')(_this.restores, {uuid: _this.activeRestore})[0];
			};

			/*
			 * ---------------------
			 * Outside calls
			 * ---------------------
			 */

			/*
			 * Mount Restore Datastore from Storage Snapshot
			 */
			$scope.$on('backupsm__mount_restore_datastore', function (event, data) {
				console.log(data);

				data.type = "mount_restore_datastore";
				data.restore_name = "Datastore mount (" + data.volume + ")";
				data.uuid = uuid.v4();

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing mount of datastore [%s] from -> storage [%s], vserver [%s], snapshot [%s]", data.uuid, event.name, data.volume, data.netapp_host, data.vserver, data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				var modalInstance = modalFactory.openLittleModal('Select ESXi host', data.ESXihosts, '.window--backupsm .window__main', 'ESXiSelectable');
				modalInstance.result.then(function (host) {

					$log.debug("Backups Manager [%s] -> Received restore data from Modal -> esxi_host", data.uuid, host.host);

					data.esxi_credential = host.connection_credential;
					data.esxi_address = host.connection_address;
					data.esxi_port = host.connection_port;
					data.esxi_host = host.host;
					data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);
					data.esxi_datacenter = host.datacenter;

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Mounting ' + data.volume + ' from Snapshot...', '.window--backupsm .window__main', 'plain');

					return modalInstanceRecovery.opened.then(function () {

						return backupsmFactory.mountRestoreSnapshotDatastore(data);
					}).then(function(res) {
						if (res instanceof Error) throw new Error("Failed to mount datastore snapshot");

						$log.debug("Backups Manager [%s] -> Restore finished successfully", data.uuid);

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						return ApplicationsFactory.errorHandler(e.message);
					});

				}, function (rejectionResponse) {
					console.log(2, rejectionResponse);
				});

			});

			/*
			 * Restore files from Storage Snapshot
			 */
			$scope.$on('backupsm__restore_datastore_files', function (event, data) {
				console.log(data);

				data.type = "restore_datastore_files";
				data.restore_name = "Datastore restore (" + data.volume + ")";
				data.uuid = uuid.v4();

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing restore of datastore files [%s] from -> storage [%s], vserver [%s], snapshot [%s]", data.uuid, event.name, data.volume, data.netapp_host, data.vserver, data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				var modalInstance = modalFactory.openLittleModal('Select ESXi host', data.ESXihosts, '.window--backupsm .window__main', 'ESXiSelectable');
				modalInstance.result.then(function (host) {

					$log.debug("Backups Manager [%s] -> Received restore data from Modal -> esxi_host", data.uuid, host.host);

					data.esxi_credential = host.connection_credential;
					data.esxi_address = host.connection_address;
					data.esxi_port = host.connection_port;
					data.esxi_host = host.host;
					data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);
					data.esxi_datacenter = host.datacenter;

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Restoring ' + data.volume + ' files from Snapshot...', '.window--backupsm .window__main', 'plain');

					return modalInstanceRecovery.opened.then(function () {

						return backupsmFactory.restoreSnapshotDatastoreFiles(data);
					}).then(function(res) {
						if (res instanceof Error) throw new Error("Failed to restore snapshot into datastore files");

						$log.debug("Backups Manager [%s] -> Restore finished successfully", data.uuid);

						// Open Datastore Brower application
						ApplicationsFactory.openApplication('datastoreexplorer');
						ApplicationsFactory.toggleApplication('datastoreexplorer');

						$timeout(function () {
							$rootScope.$broadcast("datastoreexplorer__restore_datastore_files", {
								credential: data.esxi_credential,
								host: data.esxi_address,
								port: data.esxi_port,
								id: data.esxi_datastore,
								name: data.esxi_datastore_name
							});
						}, 100);

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						return ApplicationsFactory.errorHandler(e.message);
					});

				}, function (rejectionResponse) {
					console.log(2, rejectionResponse);
				});

			});

			/*
			 * Restore VM guest files from Storage Snapshot
			 */
			$scope.$on('backupsm__restore_vm_guest_files', function (event, data) {
				console.log(data);

				data.type = "restore_vm_guest_files";
				data.restore_name = "VM guest files (" + data.vm.name + ")";
				data.uuid = uuid.v4();

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing restore of VM guest files [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]", data.uuid, event.name, data.vm.name, data.netapp_host, data.vserver, data.volume, data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', data.ESXihosts, '.window--backupsm .window__main', 'ESXiSelectable');
				modalInstance.result.then(function (host) {

					$log.debug("Backups Manager [%s] -> Received restore data from Modal -> esxi_host", data.uuid, host.host);

					data.esxi_credential = host.connection_credential;
					data.esxi_address = host.connection_address;
					data.esxi_port = host.connection_port;
					data.esxi_host = host.host;
					data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Restoring ' + data.vm.name + ' guest files from Snapshot...', '.window--backupsm .window__main', 'plain');

					return modalInstanceRecovery.opened.then(function () {

						return backupsmFactory.restoreSnapshotVMGuestFiles(data);
					}).then(function(res) {
						if (res instanceof Error) throw new Error("Failed to restore snapshot into VM guest files");

						$log.debug("Backups Manager [%s] -> Restore finished successfully", data.uuid);

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						return ApplicationsFactory.errorHandler(e.message);
					});

				}, function (rejectionResponse) {
					console.log(2, rejectionResponse);
				});

			});

			/*
			 * VM Instant Recovery from Storage Snapshot
			 */
			$scope.$on('backupsm__vm_instant_recovery', function (event, data) {
				console.log(data);

				data.type = "vm_instant_recovery";
				data.restore_name = "VM instant recovery (" + data.vm.name + ")";
				data.uuid = uuid.v4();

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing restore of VM [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]", data.uuid, event.name, data.vm.name, data.netapp_host, data.vserver, data.volume, data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				// User must select ESXi host and its data
				var modalInstanceRestoreVM = modalFactory.openWizardModal('Select required data for Instant VM', data, '.window--backupsm .window__main', 'recoveryWizard');
				modalInstanceRestoreVM.result.then(function (res) {

					$log.debug("Backups Manager [%s] -> Received restore data from Modal -> esxi_host [%s], folder [%s], resource_pool [%s], vm_name [%s], vm_power_on [%s]", data.uuid, res.host.host, res.folder.folder, res.resource_pool.resource_pool, res.vm_name, res.vm_power_on);

					data.esxi_credential = res.host.connection_credential;
					data.esxi_address = res.host.connection_address;
					data.esxi_port = res.host.connection_port;
					data.esxi_host = res.host.host;
					data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);
					data.folder = res.folder.folder;
					data.resource_pool = res.resource_pool.resource_pool;
					data.vm_name = res.vm_name;
					data.vm_power_on = res.vm_power_on;

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Restoring ' + data.vm.name + ' from Snapshot...', '.window--backupsm .window__main', 'plain');

					return modalInstanceRecovery.opened.then(function () {

						return backupsmFactory.restoreSnapshotIntoInstantVM(data);
					}).then(function(res) {
						if (res instanceof Error) throw new Error("Failed to restore snapshot into Instant VM");

						$log.debug("Backups Manager [%s] -> Restore finished successfully -> instant_vm [%s]", data.uuid, data.vm_id);

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						return ApplicationsFactory.errorHandler(e.message);
					});

				}, function (rejectionResponse) {
					console.log(2, rejectionResponse);
				});

			});

			/*
			 * ng-click functions
			 */
			this.toggleSide = function () {
				_this.viewSide = !_this.viewSide;
			};

			this.openDatastoreBrowser = function () {
				// Open Datastore Brower application
				ApplicationsFactory.openApplication('datastoreexplorer');
				ApplicationsFactory.toggleApplication('datastoreexplorer');

				var data = _this.getActiveRestore();

				$timeout(function () {
					$rootScope.$broadcast("datastoreexplorer__restore_datastore_files", {
						credential: data.esxi_credential,
						host: data.esxi_address,
						port: data.esxi_port,
						id: data.esxi_datastore,
						name: data.esxi_datastore_name
					});
				}, 100);
			};

			this.unpublishRestoredInstantVM = function () {
				var current_restore = _this.getActiveRestore();

				var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Initializing restore from Snapshot rollback...', '.window--backupsm .window__main', 'plain');

				return modalInstanceRecovery.opened.then(function () {

					return vmwareFactory.connectvCenterSoap(current_restore.esxi_credential, current_restore.esxi_address, current_restore.esxi_port);
				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to connect to vCenter");

					return backupsmFactory.unpublishVM(current_restore);
				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to unpublish VM from vCenter");

					return backupsmFactory.unmountDatastore(current_restore);
				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to unmount volume");

					return backupsmFactory.destroyVolume(current_restore);
				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to destroy volume");

					modalFactory.changeModalText('Saving results...', '.window--backupsm .window__main');
					return backupsmFactory.setRestoreStatus(current_restore, "mounted_to_esx");
				}).then(function () {
					return modalInstanceRecovery.close();

				}).catch(function (e) {
					modalInstanceRecovery.close();

					return ApplicationsFactory.errorHandler(e.message);
				});

			};

			this.unpublishRestoredDatastore = function () {
				var current_restore = _this.getActiveRestore();

				var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Initializing restore from Snapshot rollback...', '.window--backupsm .window__main', 'plain');

				return modalInstanceRecovery.opened.then(function () {

					return vmwareFactory.connectvCenterSoap(current_restore.esxi_credential, current_restore.esxi_address, current_restore.esxi_port);
				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to connect to vCenter");

					return backupsmFactory.unmountDatastore(current_restore);
				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to unmount volume");

					return backupsmFactory.destroyVolume(current_restore);
				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to destroy volume");

					modalFactory.changeModalText('Saving results...', '.window--backupsm .window__main');
					return backupsmFactory.setRestoreStatus(current_restore, "init");
				}).then(function () {
					return modalInstanceRecovery.close();

				}).catch(function (e) {
					modalInstanceRecovery.close();

					return ApplicationsFactory.errorHandler(e.message);
				});

			};

			this.setActiveRestore = function (restore) {
				return backupsmFactory.setActiveRestore(restore.uuid)
			};

		}]);
}());
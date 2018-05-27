(function () {
	"use strict";
	backupsmApp.controller('bmBodyController', ['$rootScope', '$scope', '$filter', '$timeout', '$log', 'uuid', 'backupsmFactory', 'modalFactory', 'ApplicationsFactory', 'vmwareFactory',
		function ($rootScope, $scope, $filter, $timeout, $log, uuid, backupsmFactory, modalFactory, ApplicationsFactory, vmwareFactory) {

			var _this = this;

			this.viewSide = true;
			this.showNewBackupType = true;
			this.showRestore = false;
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
			 * Called at backupsmActionController
			 */
			$scope.$on('backupsm__new_restore', function () {
				_this.showNewBackupType = true;
				_this.showRestore = false;
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
				data.restore_name = "Datastore mount (" + data.volume["volume-id-attributes"].name + ")";
				data.uuid = uuid.v4();

				data.volume_junction = data.volume["volume-id-attributes"]["junction-path"];
				data.netapp_credential = data.storage.credential;
				data.netapp_host = data.storage.host;
				data.netapp_port = data.storage.port;
				data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
					vserver: data.vserver["vserver-name"],
					"current-node": data.volume["volume-id-attributes"].node
				});
				data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing mount of datastore [%s] from -> storage [%s], vserver [%s], snapshot [%s]", data.uuid, event.name, data.volume["volume-id-attributes"].name, data.netapp_host, data.vserver["vserver-name"], data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				var modalInstance = modalFactory.openLittleModal('Select ESXi host', data.ESXihosts, '.window--backupsm .window__main', 'ESXiSelectable');
				modalInstance.result.then(function (res) {

					$log.debug("Backups Manager [%s] -> Received restore data from Modal -> esxi_host", data.uuid, res.host);

					data.esxi_credential = res.connection_credential;
					data.esxi_address = res.connection_address;
					data.esxi_port = res.connection_port;
					data.esxi_host = res.host;
					data.esxi_datacenter = res.datacenter;

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Mounting ' + data.volume["volume-id-attributes"].name + ' from Snapshot...', '.window--backupsm .window__main', 'plain');

					return modalInstanceRecovery.opened.then(function () {

						return backupsmFactory.mountRestoreSnapshotDatastore(data);
					}).then(function(res) {
						if (res instanceof Error) throw new Error("Failed to mount datastore snapshot");

						$log.debug("Backups Manager [%s] -> Restore finished successfully", data.uuid);

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						console.log(e);
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
				data.restore_name = "Datastore restore (" + data.volume["volume-id-attributes"].name + ")";
				data.uuid = uuid.v4();

				data.volume_junction = data.volume["volume-id-attributes"]["junction-path"];
				data.netapp_credential = data.storage.credential;
				data.netapp_host = data.storage.host;
				data.netapp_port = data.storage.port;
				data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
					vserver: data.vserver["vserver-name"],
					"current-node": data.volume["volume-id-attributes"].node
				});
				data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing restore of datastore files [%s] from -> storage [%s], vserver [%s], snapshot [%s]", data.uuid, event.name, data.volume["volume-id-attributes"].name, data.netapp_host, data.vserver["vserver-name"], data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				var modalInstance = modalFactory.openLittleModal('Select ESXi host', data.ESXihosts, '.window--backupsm .window__main', 'ESXiSelectable');
				modalInstance.result.then(function (res) {

					$log.debug("Backups Manager [%s] -> Received restore data from Modal -> esxi_host", data.uuid, res.host);

					data.esxi_credential = res.connection_credential;
					data.esxi_address = res.connection_address;
					data.esxi_port = res.connection_port;
					data.esxi_host = res.host;
					data.esxi_datacenter = res.datacenter;

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Restoring ' + data.volume["volume-id-attributes"].name + ' files from Snapshot...', '.window--backupsm .window__main', 'plain');

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
								name: data.esxi_datastore_name,
								original_datastore: data.volume["volume-id-attributes"].name
							});
						}, 100);

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						console.log(e);
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

				//TODO: folder.folder & resource_pool.resource_pool are required to publish the VM

				data.type = "restore_vm_guest_files";
				data.restore_name = "VM guest files (" + data.vm.name + ")";
				data.uuid = uuid.v4();

				data.volume_junction = data.volume["volume-id-attributes"]["junction-path"];
				data.netapp_credential = data.storage.credential;
				data.netapp_host = data.storage.host;
				data.netapp_port = data.storage.port;
				data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
					vserver: data.vserver["vserver-name"],
					"current-node": data.volume["volume-id-attributes"].node
				});
				data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing restore of VM guest files [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]", data.uuid, event.name, data.vm.name, data.storage.host, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', data.ESXihosts, '.window--backupsm .window__main', 'ESXiSelectable');
				modalInstance.result.then(function (res) {

					$log.debug("Backups Manager [%s] -> Received restore data from Modal -> esxi_host", data.uuid, res.host);

					data.esxi_credential = res.connection_credential;
					data.esxi_address = res.connection_address;
					data.esxi_port = res.connection_port;
					data.esxi_host = res.host;

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Restoring ' + data.vm.name + ' guest files from Snapshot...', '.window--backupsm .window__main', 'plain');

					return modalInstanceRecovery.opened.then(function () {

						return backupsmFactory.restoreSnapshotVMGuestFiles(data);
					}).then(function(res) {
						if (res instanceof Error) throw new Error("Failed to restore snapshot into VM guest files");

						$log.debug("Backups Manager [%s] -> Restore finished successfully", data.uuid);

						//TODO: mount disk to local and explore it

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						console.log(e);
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

				data.volume_junction = data.volume["volume-id-attributes"]["junction-path"];
				data.netapp_credential = data.storage.credential;
				data.netapp_host = data.storage.host;
				data.netapp_port = data.storage.port;
				data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
					vserver: data.vserver["vserver-name"],
					"current-node": data.volume["volume-id-attributes"].node
				});
				data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

				console.log(data);

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing restore of VM [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]", data.uuid, event.name, data.vm.name, data.storage.host, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				// User must select ESXi host and its data
				var modalInstanceRestoreVM = modalFactory.openWizardModal('Select required data for Instant VM (' + data.vm.name + ')', data, '.window--backupsm .window__main', 'recoveryWizard');
				modalInstanceRestoreVM.result.then(function (res) {

					if (res.restore_location === "original") {
						data.esxi_credential = data.current_location.credential;
						data.esxi_address = data.current_location.host;
						data.esxi_port = data.current_location.port;

						$log.debug("Backups Manager [%s] -> Received restore data from Modal as Original location", data.uuid);
					} else if (res.restore_location === "new") {
						data.esxi_credential = res.host.connection_credential;
						data.esxi_address = res.host.connection_address;
						data.esxi_port = res.host.connection_port;
						data.esxi_host = res.host.host;
						data.folder = res.folder.folder;
						data.resource_pool = res.resource_pool.resource_pool;
						data.vm.name = res.vm_name;
						data.vm_power_on = res.vm_power_on;

						$log.debug("Backups Manager [%s] -> Received restore data from Modal as new location-> esxi_host [%s], folder [%s], resource_pool [%s], vm_name [%s], vm_power_on [%s]", data.uuid, res.host.host, res.folder.folder, res.resource_pool.resource_pool, res.vm_name, res.vm_power_on);
					}

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Restoring ' + data.vm.name + ' from Snapshot...', '.window--backupsm .window__main', 'plain');

					return modalInstanceRecovery.opened.then(function () {

						return backupsmFactory.restoreSnapshotIntoInstantVM(data);
					}).then(function(res) {
						if (res instanceof Error) throw new Error("Failed to restore snapshot into Instant VM");

						$log.debug("Backups Manager [%s] -> Restore finished successfully -> instant_vm [%s]", data.uuid, data.vm.vm);

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						console.log(e);
						return ApplicationsFactory.errorHandler(e.message);
					});

				}, function (rejectionResponse) {
					console.log(2, rejectionResponse);
				});

			});

			/*
			 * Restore VM files
			 */
			$scope.$on('backupsm__restore_vm_files', function (event, data) {
				console.log(data);

				//TODO:

			});

			/*
			 * VM Restore from Storage Snapshot
			 */
			$scope.$on('backupsm__restore_vm', function (event, data) {
				console.log(data);

				data.type = "restore_vm";
				data.restore_name = "VM restore (" + data.vm.name + ")";
				data.uuid = uuid.v4();

				data.volume_junction = data.volume["volume-id-attributes"]["junction-path"];
				data.netapp_credential = data.storage.credential;
				data.netapp_host = data.storage.host;
				data.netapp_port = data.storage.port;
				data.netapp_nfs_ip = $filter('filter')(data.storage.netifaces, {
					vserver: data.vserver["vserver-name"],
					"current-node": data.volume["volume-id-attributes"].node
				});
				data.esxi_datastore_name = 'SysOS_' + data.volume_junction.substr(1);

				$log.debug("Backups Manager [%s] -> Received event [%s] -> Initializing restore of VM [%s] from -> storage [%s], vserver [%s], datastore [%s], snapshot [%s]", data.uuid, event.name, data.vm.name, data.storage.host, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, data.snapshot);

				backupsmFactory.setRestore(data);
				backupsmFactory.setActiveRestore(data.uuid);

				// User must select ESXi host and its data
				var modalInstanceRestoreVM = modalFactory.openWizardModal('Select required data for Restore VM (' + data.vm.name + ')', data, '.window--backupsm .window__main', 'recoveryWizard');
				modalInstanceRestoreVM.result.then(function (res) {

					if (res.restore_location === "original") {
						data.esxi_credential = data.current_location.credential;
						data.esxi_address = data.current_location.host;
						data.esxi_port = data.current_location.port;

						$log.debug("Backups Manager [%s] -> Received restore data from Modal as Original location", data.uuid);
					} else if (res.restore_location === "new") {
						data.esxi_credential = res.host.connection_credential;
						data.esxi_address = res.host.connection_address;
						data.esxi_port = res.host.connection_port;
						data.esxi_host = res.host.host;
						data.folder = res.folder.folder;
						data.resource_pool = res.resource_pool.resource_pool;
						data.vm.name = res.vm_name;
						data.vm_power_on = res.vm_power_on;

						$log.debug("Backups Manager [%s] -> Received restore data from Modal as new location-> esxi_host [%s], folder [%s], resource_pool [%s], vm_name [%s], vm_power_on [%s]", data.uuid, res.host.host, res.folder.folder, res.resource_pool.resource_pool, res.vm_name, res.vm_power_on);
					}

					// Start restore
					var modalInstanceRecovery = modalFactory.openLittleModal('PLEASE WAIT', 'Restoring ' + data.vm.name + ' from Snapshot...', '.window--backupsm .window__main', 'plain');

					return modalInstanceRecovery.opened.then(function () {

						return backupsmFactory.restoreSnapshotIntoVM(data);
					}).then(function(res) {
						if (res instanceof Error) throw new Error("Failed to restore snapshot into VM");

						$log.debug("Backups Manager [%s] -> Restore finished successfully -> vm [%s]", data.uuid, data.vm.vm);

						modalInstanceRecovery.close();
						return backupsmFactory.setRestoreStatus(data, 2);
					}).catch(function (e) {
						modalInstanceRecovery.close();

						console.log(e);
						return ApplicationsFactory.errorHandler(e.message);
					});

				}, function (rejectionResponse) {
					console.log(2, rejectionResponse);
				});

			});

			/*
			 * VM backup
			 */
			$scope.$on('backupsm__backup_vm', function (event, data) {
				console.log(data);

				data.type = "backup_vm";
				data.restore_name = "VM backup (" + data.vm.name + ")";
				data.uuid = uuid.v4();

				data.esxi_credential = data.connection.credential;
				data.esxi_address = data.connection.host;
				data.esxi_port = data.connection.port;

				//TODO:
				/*vmwareFactory.connectvCenterSoap(data.esxi_credential, data.esxi_address, data.esxi_port).then(function () {
					vmwareFactory.getVMState(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm, true).then(function (data) {
						console.log("getVMState", data);
						vmwareFactory.getDatastores(data.esxi_credential, data.esxi_address, data.esxi_port, 'group-d1').then(function (data) {
							console.log("getDatastores", data);
							vmwareFactory.getDatastoresWithVMsData(data.esxi_credential, data.esxi_address, data.esxi_port, 'group-d1').then(function (data) {
								console.log("getDatastoresWithVMsData", data);
								vmwareFactory.getDatastoreProps(data.esxi_credential, data.esxi_address, data.esxi_port, 'datastore-321').then(function (data) {
									console.log("getDatastoreProps", data);
									vmwareFactory.getFilesDataFromDatastore(data.esxi_credential, data.esxi_address, data.esxi_port, 'datastore-321', 'NFS_MAD', 'tt').then(function (data) {
										console.log("getFilesDataFromDatastore", data);
										vmwareFactory.queryVMEvents(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm).then(function (data) {
											console.log("queryVMEvents", data);
											vmwareFactory.searchIndexVM(data.esxi_credential, data.esxi_address, data.esxi_port, '502197e9-abe7-06e7-7d88-667c0a8b01ea').then(function (data) {
												console.log("searchIndex", data);

												vmwareFactory.createTask(data.esxi_credential, data.esxi_address, data.esxi_port, 'com.sysos.management.backup').then(function (data) {
													console.log("createTask", data);
													var task_id = data.data.key;

													vmwareFactory.setTaskState(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 'running').then(function (data) {
														console.log("setTaskState", data);
														vmwareFactory.updateTaskProgress(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 20).then(function (data) {
															console.log("updateTaskProgress", data);
															vmwareFactory.searchIndexVM(data.esxi_credential, data.esxi_address, data.esxi_port, '502197e9-abe7-06e7-7d88-667c0a8b01ea').then(function (data) {
																console.log("searchIndex", data);
																vmwareFactory.getVMs(data.esxi_credential, data.esxi_address, data.esxi_port, 'group-d1').then(function (data) {
																	console.log("getVMs", data);
																	vmwareFactory.createSnapShot(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm, 'SysOS_backup_' + data.uuid, 'SysOS temporary snapshot. Do not delete this snapshot while a backup is running.', false, true).then(function (data) {
																		console.log("createSnapShot", data);
																		vmwareFactory.setTaskState(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 'success').then(function (data) {
																			console.log("setTaskState", data);
																		});
																	});
																});
															});
														});
													});
												});

											});
										});
									});
								});
							});
						});
					});
				});*/
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
						name: data.esxi_datastore_name,
						original_datastore: data.volume["volume-id-attributes"].name
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
					return backupsmFactory.setRestoreStatus(current_restore, "end");
				}).then(function () {
					return modalInstanceRecovery.close();

				}).catch(function (e) {
					modalInstanceRecovery.close();

					console.log(e);
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

					console.log(e);
					return ApplicationsFactory.errorHandler(e.message);
				});

			};

			this.setActiveRestore = function (restore) {
				_this.showNewBackupType = false;
				_this.showRestore = true;
				return backupsmFactory.setActiveRestore(restore.uuid)
			};

			this.doDatastoreBackup = function () {
				vmwareFactory.getVMState( 'vm-322', true).then(function (data) {

				});
			};

		}]);
}());
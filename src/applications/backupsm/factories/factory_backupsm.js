(function () {
	"use strict";
	backupsmApp.factory('backupsmFactory', ['$filter', 'netappFactory', 'vmwareFactory', 'ServerFactory', 'ApplicationsFactory', 'modalFactory', '$q', '$log',
		function ($filter, netappFactory, vmwareFactory, ServerFactory, ApplicationsFactory, modalFactory, $q, $log) {

			var restores = [];
			var activeRestore;

			/*
			 * -------------------
			 * PRIVATE FUNCTIONS
			 * -------------------
			 */

			var getSnapshotName = function (data) {
				return $filter('filter')(data.snapshots, {
					"snapshot-instance-uuid": data.snapshot
				})[0].name;
			};

			var getLastSnapshot = function (rootSnapshotList) {
				if (rootSnapshotList.hasOwnProperty("childSnapshotList")) return getLastSnapshot(rootSnapshotList.childSnapshotList);

				return rootSnapshotList;
			};

			/*
			 * goToSnapshot
			 */
			var goToSnapshot = function (data) {
				var last_snapshot;

				$log.debug("Backups Manager [%s] -> Get all VM snapshots -> vm [%s]", data.uuid, data.vm.vm);
				return vmwareFactory.getVMSnapshots(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get VM Snapshots");

					// No snapshots found
					if (!res.data[0].propSet) {
						$log.debug("Backups Manager [%s] -> No snapshots found -> vm [%s]", data.uuid, data.vm.vm);
						return res;
					}

					last_snapshot = getLastSnapshot(res.data[0].propSet.snapshot.rootSnapshotList);

					if (last_snapshot.name.startsWith("SysOS_backup_")) {
						$log.debug("Backups Manager [%s] -> Reverting VM to snapshot -> snapshot [%s]", data.uuid, last_snapshot.snapshot.name);
						return vmwareFactory.revertToSnapshot(data.esxi_credential, data.esxi_address, data.esxi_port, last_snapshot.snapshot.name);
					}

					$log.debug("Backups Manager [%s] -> Last snapshot is not from SysOS backup -> snapshot [%s]", data.uuid, last_snapshot.snapshot.name);
					return res;

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get VM Snapshots");

					// No snapshots found
					if (!last_snapshot) return res;

					if (last_snapshot.name.startsWith("SysOS_backup_")) {
						$log.debug("Backups Manager [%s] -> Deleting VM snapshot -> snapshot [%s]", data.uuid, last_snapshot.snapshot.name);
						return vmwareFactory.removeSnapshot(data.esxi_credential, data.esxi_address, data.esxi_port, last_snapshot.snapshot.name);
					}

					return res;

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to delete VM Snapshot");

					return res;

				}).catch(function (e) {
					console.log(e);
					return e;
				});
			};

			/*
			 * Clones Storage Volume from Snapshot
			 */
			var cloneVolumeFromSnapshot = function (data) {

				// Create Volume Clone
				$log.debug("Backups Manager [%s] -> Cloning volume from snapshot -> vserver [%s], volume [%s], snapshot [%s]", data.uuid, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, getSnapshotName(data));
				return netappFactory.cloneVolumeFromSnapshot(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, getSnapshotName(data)).then(function (res) {
					if (res.status === "error") throw new Error("Failed to clone Volume");

					return setRestoreStatus(data, "cloned");
				}).then(function () {

					// Mount Volume Point
					$log.debug("Backups Manager [%s] -> Mounting cloned volume -> vserver [%s], volume [%s]", data.uuid, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name);
					return netappFactory.mountVolume(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to mount Volume");

					// TODO: check Storage EXPORTS
					// TODO: Create export
					return setRestoreStatus(data, "mounted");

				}).catch(function (e) {
					console.log(e);
					return e;
				});
			};

			/*
			 * Mount storage Datastore to ESXi host
			 */
			var mountVolumeToESXi = function (data) {

				$log.debug("Backups Manager [%s] -> Connection to vCenter using SOAP -> vCenter [%s]", data.uuid, data.esxi_address);
				return vmwareFactory.connectvCenterSoap(data.esxi_credential, data.esxi_address, data.esxi_port).then(function (res) {
					if (res.status === "error") throw new Error("Failed to connect to vCenter");

					// TODO: check connectivity from NFS node
					return vmwareFactory.getHostConfigManagerNetworkSystem(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get networkSystem from vCenter");

					data.networkSystem = res.data;

					// Get Datastore System from ESXi host to mount
					$log.debug("Backups Manager [%s] -> Getting datastore system -> host [%s]", data.uuid, data.esxi_host);
					return vmwareFactory.getHostConfigManagerDatastoreSystem(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get datastoreSystem from vCenter");

					data.datastoreSystem = res.data;

					// TODO: check connectivity from NFS node
					return vmwareFactory.getHostNetworkInfoVnic(data.esxi_credential, data.esxi_address, data.esxi_port, data.networkSystem);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get NetworkInfoVnic from vCenter");

					// TODO: check connectivity from NFS node
					return vmwareFactory.getHostNetworkInfoConsoleVnic(data.esxi_credential, data.esxi_address, data.esxi_port, data.networkSystem);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get NetworkInfoConsoleVnic from vCenter");

					$log.debug("Backups Manager [%s] -> Mount volume to ESXi -> datastoreSystem [%s], nfs_ip [%s], volume [%s], path [%s]", data.uuid, data.datastoreSystem, data.netapp_nfs_ip[0].address, '/SysOS_' + data.volume["volume-id-attributes"].name + '_Restore/', 'SysOS_' + data.volume_junction.substr(1));
					return vmwareFactory.mountDatastore(data.esxi_credential, data.esxi_address, data.esxi_port, data.datastoreSystem, data.netapp_nfs_ip[0].address, '/SysOS_' + data.volume["volume-id-attributes"].name + '_Restore/', 'SysOS_' + data.volume_junction.substr(1));

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to mount Datastore to host");

					// Get mounted datastore name
					data.esxi_datastore = res.data;
					return setRestoreStatus(data, "mounted_to_esx");

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get Datastores from vCenter");
					//TODO: do something with this
					return vmwareFactory.getDatastoreProps(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_datastore);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get Datastore Properties from vCenter");

				}).catch(function (e) {
					console.log(e);
					return e;
				});
			};

			/*
			 * Register and power on VM
			 */
			var registerVM = function (data) {

				// Get VM in Datastore
				//TODO: this is required?
				return vmwareFactory.getVMFileDataFromDatastore(
					data.esxi_credential,
					data.esxi_address,
					data.esxi_port,
					data.esxi_datastore,
					'SysOS_' + data.volume_junction.substr(1),
					data.vm.path.substring(0, data.vm.path.lastIndexOf("/") + 1).substr(1),
					data.vm.path.split('/').pop()
				).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get files from datastore");

					// Register VM
					//TODO: check if VM with same name exists
					$log.debug("Backups Manager [%s] -> Register VM to ESXi -> host [%s], vmx_file [%s], vm_name [%s], folder [%s], resource_pool [%s]", data.uuid, data.esxi_host, '[SysOS_' + data.volume_junction.substr(1) + '] ' + data.vm.path, data.vm.name, data.folder, data.resource_pool);
					return vmwareFactory.registerVM(
						data.esxi_credential,
						data.esxi_address,
						data.esxi_port,
						data.esxi_host,
						'[SysOS_' + data.volume_junction.substr(1) + '] ' + data.vm.path,
						data.vm.name,
						data.folder,
						data.resource_pool
					);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to register VM to vCenter");

					data.vm.vm = res.data.result.name;
					return setRestoreStatus(data, "vm_registred");
				}).then(function () {

					return goToSnapshot(data);

				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to revert VM to Snapshot");

					if (data.vm_power_on) {
						// Power On VM
						$log.debug("Backups Manager [%s] -> Powering on vm -> host [%s], VM [%s], ", data.uuid, data.esxi_host, data.vm.vm);
						return vmwareFactory.powerOnVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host, data.vm.vm);
					}

				}).then(function (res) {
					if (res && res.status === "error") throw new Error("Failed to power on VM on vCenter");

				}).catch(function (e) {
					console.log(e);
					return e;
				});

			};

			/*
			 * Restore a VM from Snapshot to same location (override)
			 */
			var restoreVMfromSnapshotToCurrentLocation = function (data) {
				var sfr_promises = [];
				var vm_path;

				$log.debug("Backups Manager [%s] -> Connection to vCenter using SOAP -> vCenter [%s]", data.uuid, data.esxi_address);
				return vmwareFactory.connectvCenterSoap(data.esxi_credential, data.esxi_address, data.esxi_port).then(function (res) {
					if (res.status === "error") throw new Error("Failed to connect to vCenter");

					$log.debug("Backups Manager [%s] -> Get VM path -> VM [%s]", data.uuid, data.vm.vm);
					return vmwareFactory.getVMPath(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
				}).then(function (res) {
					if (res && res.status === "error") throw new Error("Failed to get VM path");
					console.log(res);

					var regex = /\[*\]\s(.*)\/.*\.vmx/gi;
					var str = res.data.propSet["config.files.vmPathName"];

					vm_path = regex.exec(str)[1];

					if (!vm_path) throw new Error("SAFETY STOP: VM cannot be on root folder");

					$log.debug("Backups Manager [%s] -> Get VM runtime -> VM [%s]", data.uuid, data.vm.vm);
					return vmwareFactory.getVMRuntime(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
				}).then(function (res) {
					if (res && res.status === "error") throw new Error("Failed to get VM runtime");

					if (res.data.propSet.runtime.powerState === "poweredOn") {
						$log.debug("Backups Manager [%s] -> Powering off VM -> VM [%s]", data.uuid, data.vm.vm);
						return vmwareFactory.powerOffVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
					}

					return res;

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to power off VM at vCenter");

					$log.debug("Backups Manager [%s] -> Get snapshot files from storage -> storage [%s], vserver [%s], volume [%s], snapshot [%s], path [%s]", data.uuid, data.netapp_host, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, getSnapshotName(data), '/' + vm_path);
					return netappFactory.getSnapshotFiles(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, getSnapshotName(data), '/' + vm_path);
				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get Snapshot files");

					angular.forEach(res.data, function (file) {
						if (file.name.indexOf(".lck") >= 0) return;

						sfr_promises.push(netappFactory.snapshotRestoreFile(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, getSnapshotName(data), '/vol/' + data.volume["volume-id-attributes"].name + '/' + vm_path + '/' + file.name).then(function (res) {
							$log.debug("Backups Manager [%s] -> Restoring file from storage snapshot -> storage [%s], vserver [%s], volume [%s], snapshot [%s], path [%s]", data.uuid, data.netapp_host, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name, getSnapshotName(data), '/vol/' + data.volume["volume-id-attributes"].name + '/' + vm_path + '/' + file.name);
							if (res.status === "error") throw new Error("Failed to restore file from storage snapshot");
						}));
					});

					return $q.all(sfr_promises);

				}).then(function () {

					$log.debug("Backups Manager [%s] -> Reloading VM -> VM [%s]", data.uuid, data.vm.vm);
					return vmwareFactory.reloadVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to reload VM");

					return goToSnapshot(data);

				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to revert VM to Snapshot");

					if (data.vm_power_on) {
						// Power On VM
						$log.debug("Backups Manager [%s] -> Powering on vm -> host [%s], VM [%s]", data.uuid, data.vm.runtime.host.name, data.vm.vm);
						return vmwareFactory.powerOnVM(data.current_location.credential, data.current_location.host, data.current_location.port, data.vm.runtime.host.name, data.vm.vm);
					}

					return res;

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to power on VM");
					console.log(res);

				}).catch(function (e) {
					console.log(e);
					return e;
				});
			};

			/*
			 * -------------------
			 * PUBLIC FUNCTIONS
			 * -------------------
			 */

			/*
			 *   - Keeps a track of restore point and updates it to backend.
			 */
			var setRestoreStatus = function (data, status) {
				$filter('filter')(restores, {uuid: data.uuid})[0].status = status;

				return ServerFactory.saveConfigToFile(data, 'applications/backupsm/restores.json', false);
			};

			/*
			* mountRestoreSnapshotDatastore
			*/
			var mountRestoreSnapshotDatastore = function (data) {

				// Create Volume Clone
				return cloneVolumeFromSnapshot(data).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to clone volume from snapshot");

					// Mount Volume
					return mountVolumeToESXi(data);

				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to mount cloned volume from snapshot to ESXi host");

				}).catch(function (e) {
					console.log(e);
					return e;
				});

			};

			/*
			 * restoreSnapshotDatastoreFiles
			 */
			var restoreSnapshotDatastoreFiles = function (data) {

				// Create Volume Clone
				return cloneVolumeFromSnapshot(data).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to clone volume from snapshot");

					// Mount Volume
					return mountVolumeToESXi(data);

				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to mount cloned volume from snapshot to ESXi host");

				}).catch(function (e) {
					console.log(e);
					return e;
				});

			};

			/*
			 * restoreSnapshotVMGuestFiles
			 */
			var restoreSnapshotVMGuestFiles = function (data) {

				// Create Volume Clone
				return cloneVolumeFromSnapshot(data).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to clone volume from snapshot");

					// Mount Volume
					return mountVolumeToESXi(data);

				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to mount cloned volume from snapshot to ESXi host");

					// Get VM in Datastore
					return vmwareFactory.getVMFileDataFromDatastore(
						data.esxi_credential,
						data.esxi_address,
						data.esxi_port,
						data.esxi_datastore,
						'SysOS_' + data.volume_junction.substr(1),
						data.vm.path.substring(0, data.vm.path.lastIndexOf("/") + 1).substr(1),
						data.vm.path.split('/').pop()
					);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get files from datastore");

					// Register VM
					//TODO: check if VM with same name exists
					return vmwareFactory.registerVM(
						data.esxi_credential,
						data.esxi_address,
						data.esxi_port,
						data.esxi_host,
						'[SysOS_' + data.volume_junction.substr(1) + '] ' + data.vm.path,
						data.vm.name,
						data.folder,
						data.resource_pool
					);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to register VM to vCenter");
					return res;



				}).catch(function (e) {
					return e;
				});

			};

			/*
			 * restoreSnapshotVMInstantMachine
			 */
			var restoreSnapshotIntoInstantVM = function (data) {

				// Create Volume Clone
				return cloneVolumeFromSnapshot(data).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to clone volume from snapshot");

					// Mount Volume
					return mountVolumeToESXi(data);

				}).then(function (res) {
					if (res instanceof Error) throw new Error("Failed to mount cloned volume from snapshot to ESXi host");

					return registerVM(data);
				}).then(function(res) {
					if (res instanceof Error) throw new Error("Failed to register VM from snapshot to ESXi host");

					return res;

				}).catch(function (e) {
					console.log(e);
					return e;
				});

			};

			/*
			 * restoreSnapshotIntoVM
			 */
			var restoreSnapshotIntoVM = function (data) {

				//TODO: if new locatipn
				/*return cloneVMFromSnapshot(data).then(function (data) {

				});*/

				// Restore to current location (override VM)
				return restoreVMfromSnapshotToCurrentLocation(data).then(function (data) {

				}).catch(function (e) {
					console.log(e);
					return e;
				});
			};

			/*
			 * Unpublish VM
			 */
			var unpublishVM = function (data) {

				modalFactory.changeModalText('Connecting to vCenter...', '.window--backupsm .window__main');
				return vmwareFactory.connectvCenterSoap(data.esxi_credential, data.esxi_address, data.esxi_port).then(function (res) {
					if (res.status === "error") throw new Error("Failed to connect to vCenter");

					// Check if VM is powered on
					return vmwareFactory.getVMState(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm)

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get VM state from vCenter");

					// VM not found
					if (res && res.data.hasOwnProperty("ManagedObjectNotFoundFault")) return res;

					// Power Off VM
					if (res.data["runtime.powerState"] === "poweredOn") {
						modalFactory.changeModalText('PLEASE WAIT', 'Powering off VM ...', '.window--backupsm .window__main');
						return vmwareFactory.powerOffVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
					}

					// VM is Powered Off
					return res;

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to power off VM at vCenter");

					// VM not found
					if (res && res.data.hasOwnProperty("ManagedObjectNotFoundFault")) return res;

					// Unregister VM
					modalFactory.changeModalText('Unregistering VM ...', '.window--backupsm .window__main');
					return vmwareFactory.unregisterVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to unregister VM from vCenter");

					return setRestoreStatus(data, "unregistred_vm");
				}).catch(function (e) {
					console.log(e);
					return e;
				});

			};

			/*
			 * Unmount Datastore
			 */
			var unmountDatastore = function (data) {

				// Unregister Datastore
				modalFactory.changeModalText('Unmounting datastore...', '.window--backupsm .window__main');
				return vmwareFactory.unmountDatastore(data.esxi_credential, data.esxi_address, data.esxi_port, data.datastoreSystem, data.esxi_datastore).then(function (res) {
					if (res.status === "error") throw new Error("Failed to unmount datastore from vCenter");

					return setRestoreStatus(data, "unmounted_datastore");
				}).catch(function (e) {
					console.log(e);
					return e;
				});

			};

			/*
			 * Destroy Storage Volume
			 */
			var destroyVolume = function (data) {

				// Unmount NetApp Volume
				modalFactory.changeModalText('Unmounting storage volume...', '.window--backupsm .window__main');
				return netappFactory.unmountVolume(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name).then(function (res) {
					if (res.status === "error" || res.data !== "passed") throw new Error("Failed to unmount volume");

					return setRestoreStatus(data, "netapp_datastore_unmounted");
				}).then(function () {

					// Set NetApp Volume Offline
					modalFactory.changeModalText('Setting volume offline...', '.window--backupsm .window__main');
					return netappFactory.setVolumeOffline(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name);

				}).then(function (res) {
					if (res.status === "error" || res.data !== "passed") throw new Error("Failed to set volume offline");

					return setRestoreStatus(data, "netapp_datastore_offline");
				}).then(function () {

					// Destroy NetApp Volume
					modalFactory.changeModalText('Destroying volume...', '.window--backupsm .window__main');
					return netappFactory.destroyVolume(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver["vserver-name"], data.volume["volume-id-attributes"].name);

				}).then(function (res) {
					if (res.status === "error" || res.data !== "passed") throw new Error("Failed to destroy volume");

					return setRestoreStatus(data, 3);
				}).catch(function (e) {
					console.log(e);
					return e;
				});
			};

			/*
			 * create SnapShot
			 */
			var createSnapShot = function () {

			};

			return {
				setRestores: function (data) {
					restores = data;
				},
				getRestores: function () {
					return restores;
				},
				getActiveRestore: function () {
					return activeRestore;
				},
				setRestore: function (data) {
					data.status = "init";
					return restores.push(data);
				},
				setActiveRestore: function (uuid) {
					return activeRestore = uuid;
				},
				setRestoreStatus: setRestoreStatus,
				mountRestoreSnapshotDatastore: mountRestoreSnapshotDatastore,
				restoreSnapshotVMGuestFiles: restoreSnapshotVMGuestFiles,
				restoreSnapshotDatastoreFiles: restoreSnapshotDatastoreFiles,
				restoreSnapshotIntoInstantVM: restoreSnapshotIntoInstantVM,
				restoreSnapshotIntoVM: restoreSnapshotIntoVM,
				unpublishVM: unpublishVM,
				unmountDatastore: unmountDatastore,
				destroyVolume: destroyVolume,
				createSnapShot: createSnapShot
			}


		}]);
}());
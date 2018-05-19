(function () {
	"use strict";
	backupsmApp.factory('backupsmFactory', ['$filter', 'netappFactory', 'vmwareFactory', 'ServerFactory', 'ApplicationsFactory', 'modalFactory',
		function ($filter, netappFactory, vmwareFactory, ServerFactory, ApplicationsFactory, modalFactory) {

			var restores = [];
			var activeRestore;

			/*
			 * -------------------
			 * PRIVATE FUNCTIONS
			 * -------------------
			 */

			/*
			 * Clones Storage Volume from Snapshot
			 */
			var cloneVolumeFromSnapshot = function (data) {

				// Create Volume Clone
				return netappFactory.cloneVolumeFromSnapshot(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver, data.volume, data.snapshot).then(function (res) {
					if (res.status === "error") throw new Error("Failed to clone Volume");

					return setRestoreStatus(data, "cloned");
				}).then(function () {

					// Mount Volume Point
					return netappFactory.mountVolume(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver, data.volume);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to mount Volume");

					// TODO: check Storage EXPORTS
					// TODO: Create export
					return setRestoreStatus(data, "mounted");

				}).catch(function (e) {
					return e;
				});
			};

			/*
			 * Mount storage Datastore to ESXi host
			 */
			var mountVolumeToESXi = function (data) {

				return vmwareFactory.connectvCenterSoap(data.esxi_credential, data.esxi_address, data.esxi_port).then(function (res) {
					if (res.status === "error") throw new Error("Failed to connect to vCenter");

					// TODO: check connectivity from NFS node
					return vmwareFactory.getHostConfigManagerNetworkSystem(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get networkSystem from vCenter");

					data.networkSystem = res.data;

					// Get Datastore System from ESXi host to mount
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

					return vmwareFactory.mountDatastore(data.esxi_credential, data.esxi_address, data.esxi_port, data.datastoreSystem, data.netapp_nfs_ip[0].address, '/SysOS_' + data.volume + '_Restore/', 'SysOS_' + data.volume_junction.substr(1));

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to mount Datastore to host");

					// Get mounted datastore name
					data.esx_datastore = res.data;
					return setRestoreStatus(data, "mounted_to_esx");

				}).then(function (res) {
					console.log(res);
					if (res.status === "error") throw new Error("Failed to get Datastores from vCenter");

					return vmwareFactory.getDatastoreProps(data.esxi_credential, data.esxi_address, data.esxi_port, data.esx_datastore);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get Datastore Properties from vCenter");

				}).catch(function (e) {
					return e;
				});
			};

			/*
			 * Register and power on VM
			 */
			var registerVM = function (data) {

				// Get VM in Datastore
				return vmwareFactory.getFileDataFromDatastore(
					data.esxi_credential,
					data.esxi_address,
					data.esxi_port,
					data.esx_datastore,
					'SysOS_' + data.volume_junction.substr(1),
					data.vm.path.substring(0, data.vm.path.lastIndexOf("/") + 1).substr(1),
					data.vm.path.split('/').pop()
				).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get files from datastore");

					// Register VM
					return vmwareFactory.registerVM(
						data.esxi_credential,
						data.esxi_address,
						data.esxi_port,
						data.esxi_host,
						'[SysOS_' + data.volume_junction.substr(1) + '] ' + data.vm.path,
						data.vm_name,
						data.folder,
						data.resource_pool
					);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to register VM to vCenter");

					data.vm_id = res.data.result.name;
					return setRestoreStatus(data, "vm_registred");
				}).then(function () {

					if (data.vm_power_on) {
						// Power On VM
						return vmwareFactory.powerOnVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host, data.vm_id);
					}

				}).then(function (res) {
					if (res && res.status === "error") throw new Error("Failed to power on VM on vCenter");

				}).catch(function (e) {
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
					return vmwareFactory.getFileDataFromDatastore(
						data.esxi_credential,
						data.esxi_address,
						data.esxi_port,
						data.esx_datastore,
						'SysOS_' + data.volume_junction.substr(1),
						data.vm.path.substring(0, data.vm.path.lastIndexOf("/") + 1).substr(1),
						data.vm.path.split('/').pop()
					);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get files from datastore");

					// Register VM
					return vmwareFactory.registerVM(
						data.esxi_credential,
						data.esxi_address,
						data.esxi_port,
						data.esxi_host,
						'[SysOS_' + data.volume_junction.substr(1) + '] ' + data.vm.path,
						data.vm_name,
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
					return vmwareFactory.getVMState(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm_id)

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to get VM state from vCenter");

					// VM not found
					if (res && res.data.hasOwnProperty("ManagedObjectNotFoundFault")) return res;

					// Power Off VM
					if (res.data["runtime.powerState"] === "poweredOn") {
						modalFactory.openLittleModal('PLEASE WAIT', 'Powering off VM ...', '.window--backupsm .window__main', 'plain');
						return vmwareFactory.powerOffVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm_id);
					}

					// VM is Powered Off
					return res;

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to power off VM at vCenter");

					// VM not found
					if (res && res.data.hasOwnProperty("ManagedObjectNotFoundFault")) return res;

					// Unregister VM
					modalFactory.openLittleModal('PLEASE WAIT', 'Unregistering VM ...', '.window--backupsm .window__main', 'plain');
					return vmwareFactory.unregisterVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm_id);

				}).then(function (res) {
					if (res.status === "error") throw new Error("Failed to unregister VM from vCenter");

					return setRestoreStatus(data, "unregistred_vm");
				}).catch(function (e) {
					return e;
				});

			};

			/*
			 * Unmount Datastore
			 */
			var unmountDatastore = function (data) {

				// Unregister Datastore
				modalFactory.changeModalText('Unmounting datastore...', '.window--backupsm .window__main');
				return vmwareFactory.unmountDatastore(data.esxi_credential, data.esxi_address, data.esxi_port, data.datastoreSystem, data.esx_datastore).then(function (res) {
					if (res.status === "error") throw new Error("Failed to unmount datastore from vCenter");

					return setRestoreStatus(data, "unmounted_datastore");
				}).catch(function (e) {
					return e;
				});

			};

			/*
			 * Destroy Storage Volume
			 */
			var destroyVolume = function (data) {

				// Unmount NetApp Volume
				modalFactory.changeModalText('Unmounting storage volume...', '.window--backupsm .window__main');
				return netappFactory.unmountVolume(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver, data.volume).then(function (res) {
					if (res.status === "error" || res.data !== "passed") throw new Error("Failed to unmount volume");

					return setRestoreStatus(data, "netapp_datastore_unmounted");
				}).then(function () {

					// Set NetApp Volume Offline
					modalFactory.changeModalText('Setting volume offline...', '.window--backupsm .window__main');
					return netappFactory.setVolumeOffline(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver, data.volume);

				}).then(function (res) {
					if (res.status === "error" || res.data !== "passed") throw new Error("Failed to set volume offline");

					return setRestoreStatus(data, "netapp_datastore_offline");
				}).then(function () {

					// Destroy NetApp Volume
					modalFactory.changeModalText('Destroying volume...', '.window--backupsm .window__main');
					return netappFactory.destroyVolume(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver, data.volume);

				}).then(function (res) {
					if (res.status === "error" || res.data !== "passed") throw new Error("Failed to destroy volume");

					return setRestoreStatus(data, 3);
				}).catch(function (e) {
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
				unpublishVM: unpublishVM,
				unmountDatastore: unmountDatastore,
				destroyVolume: destroyVolume,
				createSnapShot: createSnapShot
			}


		}]);
}());
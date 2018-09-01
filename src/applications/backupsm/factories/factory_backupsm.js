(function () {
    'use strict';
    backupsmApp.factory('backupsmFactory', ['$injector', '$filter', '$q', '$log', 'uuid', 'netappFactory', 'vmwareFactory', 'ServerFactory', 'ApplicationsFactory', 'connectionsFactory', 'modalFactory',
        function ($injector, $filter, $q, $log, uuid, netappFactory, vmwareFactory, ServerFactory, ApplicationsFactory, connectionsFactory, modalFactory) {

            var backups = [];
            var restores = [];
            var active;

            /**
             * -------------------
             * PRIVATE FUNCTIONS
             * -------------------
             */

            /**
             * @description
             * Checks if NetApp storage have required licenses
             */
            var checkLicenses = function (data) {
                $log.debug('Backups Manager [%s] -> Cloning storage licenses -> storage [%s]', data.uuid, data.netapp_host);
                return netappFactory.getLicenses(
                    data.netapp_credential,
                    data.netapp_host,
                    data.netapp_port
                ).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get licenses');

                    var flexClone = $filter('filter')(res.data, {
                        'package': 'flexclone'
                    })[0].method;

                    if (flexClone !== 'license') throw new Error('FlexClone license not found');

                }).catch(function (e) {
                    console.log(e);
                    return e;
                });
            };

            /**
             * @description
             * Returns snapshot object given snapshot uuid
             *
             * @param data {Object}
             */
            var getSnapshotName = function (data) {
                return $filter('filter')(data.snapshots, {
                    'snapshot-instance-uuid': data.snapshot
                })[0].name;
            };

            /**
             * @description
             * Return the latest VM snapshot
             *
             * @param rootSnapshotList {Object}
             */
            var getLastSnapshot = function (rootSnapshotList) {
                if (rootSnapshotList.hasOwnProperty('childSnapshotList')) return getLastSnapshot(rootSnapshotList.childSnapshotList);

                return rootSnapshotList;
            };

            /**
             * goToSnapshot
             *
             * @description
             * Checks if VM have a snapshot called 'SysOS_backup_*' and if exists reverts the VM to this snapshot
             *
             * @param data {Object}
             */
            var goToSnapshot = function (data) {
                var last_snapshot;

                $log.debug('Backups Manager [%s] -> Get all VM snapshots -> vm [%s]', data.uuid, data.vm.vm);
                return vmwareFactory.getVMSnapshots(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM Snapshots');

                    // No snapshots found
                    if (!res.data[0].propSet) {
                        $log.debug('Backups Manager [%s] -> No snapshots found -> vm [%s]', data.uuid, data.vm.vm);
                        return res;
                    }

                    last_snapshot = getLastSnapshot(res.data[0].propSet.snapshot.rootSnapshotList);

                    if (last_snapshot.name.startsWith('SysOS_backup_')) {
                        $log.debug('Backups Manager [%s] -> Reverting VM to snapshot -> snapshot [%s]', data.uuid, last_snapshot.snapshot.name);
                        return vmwareFactory.revertToSnapshot(data.esxi_credential, data.esxi_address, data.esxi_port, last_snapshot.snapshot.name);
                    }

                    $log.debug('Backups Manager [%s] -> Last snapshot is not from SysOS backup -> snapshot [%s], snapshot_id [%s]', data.uuid, last_snapshot.name, last_snapshot.snapshot.name);
                    return res;

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM Snapshots');

                    // No snapshots found
                    if (!last_snapshot) return res;

                    if (last_snapshot.name.startsWith('SysOS_backup_')) {
                        $log.debug('Backups Manager [%s] -> Deleting VM snapshot -> snapshot [%s]', data.uuid, last_snapshot.snapshot.name);
                        return vmwareFactory.removeSnapshot(data.esxi_credential, data.esxi_address, data.esxi_port, last_snapshot.snapshot.name, true);
                    }

                    return res;

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to delete VM Snapshot');

                    return res;

                }).catch(function (e) {
                    console.log(e);
                    return e;
                });
            };

            /**
             * @description
             * Clones Storage Volume from Snapshot
             *
             * @param data {Object}
             */
            var cloneVolumeFromSnapshot = function (data) {

                if (data.volumeNum) {
                    data.volumeName = 'SysOS_' + data.volume['volume-id-attributes'].name + '_Restore_' + data.volumeNum;
                    data.datastorePath = 'SysOS_' + data.volume['volume-id-attributes'].name + '_' + data.volumeNum;
                } else {
                    data.volumeNum = 0;
                    data.volumeName = 'SysOS_' + data.volume['volume-id-attributes'].name + '_Restore';
                    data.datastorePath = 'SysOS_' + data.volume['volume-id-attributes'].name;
                }

                // Create Volume Clone
                $log.debug('Backups Manager [%s] -> Cloning volume from snapshot -> vserver [%s], volume [%s], snapshot [%s], volumeName [%s]', data.uuid, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, getSnapshotName(data), data.volumeName);
                return netappFactory.cloneVolumeFromSnapshot(
                    data.netapp_credential,
                    data.netapp_host,
                    data.netapp_port,
                    data.vserver['vserver-name'],
                    data.volume['volume-id-attributes'].name,
                    data.volumeName,
                    getSnapshotName(data)
                ).then(function (res) {
                    if (res.status === 'error') {

                        // Error duplicated volume, try next.
                        if (res.error.errno === '17') throw new Error(17);

                        throw new Error('Failed to clone Volume');
                    }

                    return setRestoreStatus(data, 'volume_cloned');
                }).then(function () {

                    // Mount Volume Point
                    $log.debug('Backups Manager [%s] -> Mounting cloned volume -> vserver [%s], volume [%s]', data.uuid, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name);
                    return netappFactory.mountVolume(
                        data.netapp_credential,
                        data.netapp_host,
                        data.netapp_port,
                        data.vserver['vserver-name'],
                        data.volumeName,
                        '/' + data.volumeName
                    );

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to mount Volume');

                    // TODO: check Storage EXPORTS
                    // TODO: Create export
                    return setRestoreStatus(data, 'namespace_mounted');

                }).catch(function (e) {

                    // Error duplicated volume, try next.
                    if (e.message === '17') {
                        $log.debug('Backups Manager [%s] -> Cloning volume from snapshot -> vserver [%s], volume [%s], snapshot [%s], volumeName [%s] -> Volume with same name found', data.uuid, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, getSnapshotName(data), data.volumeName);

                        ++data.volumeNum;
                        return cloneVolumeFromSnapshot(data);
                    }

                    console.log(e);
                    return e;
                });
            };

            /**
             * @description
             * Mount storage Datastore to ESXi host
             *
             * @param data {Object}
             */
            var mountVolumeToESXi = function (data) {

                $log.debug('Backups Manager [%s] -> Connection to vCenter using SOAP -> vCenter [%s]', data.uuid, data.esxi_address);
                return vmwareFactory.connectvCenterSoap(data.esxi_credential, data.esxi_address, data.esxi_port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    // TODO: check connectivity from NFS node
                    return vmwareFactory.getHostConfigManagerNetworkSystem(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get networkSystem from vCenter');

                    data.networkSystem = res.data;

                    // Get Datastore System from ESXi host to mount
                    $log.debug('Backups Manager [%s] -> Getting datastore system -> host [%s]', data.uuid, data.esxi_host);
                    return vmwareFactory.getHostConfigManagerDatastoreSystem(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get datastoreSystem from vCenter');

                    data.datastoreSystem = res.data;

                    // TODO: check connectivity from NFS node
                    return vmwareFactory.getHostNetworkInfoVnic(data.esxi_credential, data.esxi_address, data.esxi_port, data.networkSystem);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get NetworkInfoVnic from vCenter');

                    // TODO: check connectivity from NFS node
                    return vmwareFactory.getHostNetworkInfoConsoleVnic(data.esxi_credential, data.esxi_address, data.esxi_port, data.networkSystem);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get NetworkInfoConsoleVnic from vCenter');

                    $log.debug('Backups Manager [%s] -> Mount volume to ESXi -> datastoreSystem [%s], nfs_ip [%s], volume [%s], path [%s]', data.uuid, data.datastoreSystem, data.netapp_nfs_ip[0].address, '/' + data.volumeName + '/', data.datastorePath);
                    return vmwareFactory.mountDatastore(
                        data.esxi_credential,
                        data.esxi_address,
                        data.esxi_port,
                        data.datastoreSystem,
                        data.netapp_nfs_ip[0].address,
                        '/' + data.volumeName + '/',
                        data.datastorePath
                    );

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to mount Datastore to host');

                    // Get mounted datastore name
                    data.esxi_datastore = res.data;
                    return setRestoreStatus(data, 'mounted_to_esx');

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get Datastore Properties from vCenter');

                }).catch(function (e) {
                    console.log(e);
                    return e;
                });
            };

            /**
             * @description
             * Register and power on VM
             *
             * @param data {Object}
             */
            var registerVM = function (data) {

                data.vm.path = data.vm.summary.config.vmPathName.split(']').pop();
                data.vm.path = data.vm.path.substring(0, data.vm.path.lastIndexOf('/') + 1).substr(1);

                // Get VM in Datastore (check if exist)
                return vmwareFactory.getVMFileDataFromDatastore(
                    data.esxi_credential,
                    data.esxi_address,
                    data.esxi_port,
                    data.esxi_datastore,
                    data.datastorePath,
                    data.vm.path,
                    data.vm.summary.config.vmPathName.split('/').pop()
                ).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get files from datastore');
                    if (res.data[0].propSet.info.error) throw new Error(res.data[0].propSet.info.error);

                    // Register VM
                    //TODO: check if VM with same name exists
                    $log.debug('Backups Manager [%s] -> Register VM to ESXi -> host [%s], vmx_file [%s], vm_name [%s], folder [%s], resource_pool [%s]', data.uuid, data.esxi_host, '[' + data.datastorePath + '] ' + data.vm.summary.config.vmPathName.split(']').pop(), data.vm.name, data.folder, data.resource_pool);
                    return vmwareFactory.registerVM(
                        data.esxi_credential,
                        data.esxi_address,
                        data.esxi_port,
                        data.esxi_host,
                        '[' + data.datastorePath + '] ' + data.vm.summary.config.vmPathName.split(']').pop().substr(1),
                        data.vm.name,
                        data.folder,
                        data.resource_pool
                    );

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to register VM to vCenter');

                    setRestoreStatus(data, 'vm_registred');

                    data.vm.vm = res.data.result.name;

                    // Set new uuid to this VM to prevent duplicates
                    var newVMUuid = uuid.v4();
                    data.vm.config.uuid = newVMUuid;
                    $log.debug('Backups Manager [%s] -> Reconfigure VM uuid -> vm_name [%s], newVMUuid [%s]', data.vm.name, newVMUuid);
                    return vmwareFactory.reconfigureVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm, '<uuid>' + newVMUuid + '</uuid>');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to change VM uuid');

                    return goToSnapshot(data);

                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to revert VM to Snapshot');

                }).catch(function (e) {
                    console.log(e);
                    return e;
                });

            };

            /**
             * @description
             * Restore a VM from Snapshot to same location (override)
             *
             * @param data {Object}
             */
            var restoreVMfromSnapshotToCurrentLocation = function (data) {
                var sfr_promises = [];
                var vm_path;

                $log.debug('Backups Manager [%s] -> Connection to vCenter using SOAP -> vCenter [%s]', data.uuid, data.esxi_address);
                return vmwareFactory.connectvCenterSoap(data.esxi_credential, data.esxi_address, data.esxi_port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    $log.debug('Backups Manager [%s] -> Get VM path -> VM [%s]', data.uuid, data.vm.vm);
                    return vmwareFactory.getVMPath(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
                }).then(function (res) {
                    if (res && res.status === 'error') throw new Error('Failed to get VM path');

                    var regex = /\[*\]\s(.*)\/.*\.vmx/gi;
                    var str = res.data.propSet['config.files.vmPathName'];

                    vm_path = regex.exec(str)[1];

                    if (!vm_path) throw new Error('SAFETY STOP: VM cannot be on root folder');

                    $log.debug('Backups Manager [%s] -> Get VM runtime -> VM [%s]', data.uuid, data.vm.vm);
                    return vmwareFactory.getVMRuntime(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
                }).then(function (res) {
                    if (res && res.status === 'error') throw new Error('Failed to get VM runtime');

                    if (res.data.propSet.runtime.powerState === 'poweredOn') {
                        $log.debug('Backups Manager [%s] -> Powering off VM -> VM [%s]', data.uuid, data.vm.vm);
                        return vmwareFactory.powerOffVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
                    }

                    return res;

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to power off VM at vCenter');

                    $log.debug('Backups Manager [%s] -> Get snapshot files from storage -> storage [%s], vserver [%s], volume [%s], snapshot [%s], path [%s]', data.uuid, data.netapp_host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, getSnapshotName(data), '/' + vm_path);
                    return netappFactory.getSnapshotFiles(
                        data.netapp_credential,
                        data.netapp_host,
                        data.netapp_port,
                        data.vserver['vserver-name'],
                        data.volume['volume-id-attributes'].name,
                        getSnapshotName(data),
                        '/' + vm_path
                    );
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get Snapshot files');

                    angular.forEach(res.data, function (file) {
                        if (file.name.indexOf('.lck') >= 0) return;

                        sfr_promises.push(netappFactory.snapshotRestoreFile(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, getSnapshotName(data), '/vol/' + data.volume['volume-id-attributes'].name + '/' + vm_path + '/' + file.name).then(function (res) {
                            $log.debug('Backups Manager [%s] -> Restoring file from storage snapshot -> storage [%s], vserver [%s], volume [%s], snapshot [%s], path [%s]', data.uuid, data.netapp_host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, getSnapshotName(data), '/vol/' + data.volume['volume-id-attributes'].name + '/' + vm_path + '/' + file.name);
                            if (res.status === 'error') throw new Error('Failed to restore file from storage snapshot');
                        }));
                    });

                    return $q.all(sfr_promises);

                }).then(function () {

                    $log.debug('Backups Manager [%s] -> Reloading VM -> VM [%s]', data.uuid, data.vm.vm);
                    return vmwareFactory.reloadVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to reload VM');

                    return goToSnapshot(data);

                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to revert VM to Snapshot');

                    return res;

                }).catch(function (e) {
                    console.log(e);
                    return e;
                });
            };

            /**
             * -------------------
             * PUBLIC FUNCTIONS
             * -------------------
             */

            /*
             *   Keeps a track of backup point and updates it to backend.
             */
            var setBackupStatus = function (data, status) {
                $filter('filter')(backups, {uuid: data.uuid})[0].status.push(status);

                return ServerFactory.saveConfigToFile(data, 'applications/backupsm/backups.json', false);
            };

            /*
             *   Keeps a track of restore point and updates it to backend.
             */
            var setRestoreStatus = function (data, status) {
                $filter('filter')(restores, {uuid: data.uuid})[0].status.push(status);

                return ServerFactory.saveConfigToFile(data, 'applications/backupsm/restores.json', false);
            };

            /*
             * mountRestoreSnapshotDatastore
             */
            var mountRestoreSnapshotDatastore = function (data) {

                // Check for available licenses
                return checkLicenses(data).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to check licenses');

                    // Create Volume Clone
                    return cloneVolumeFromSnapshot(data);
                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to clone volume from snapshot');

                    // Mount Volume
                    return mountVolumeToESXi(data);

                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to mount cloned volume from snapshot to ESXi host');

                }).catch(function (e) {
                    console.log(e);
                    return e;
                });

            };

            /*
             * restoreSnapshotDatastoreFiles
             */
            var restoreSnapshotDatastoreFiles = function (data) {

                // Check for available licenses
                return checkLicenses(data).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to check licenses');

                    // Create Volume Clone
                    return cloneVolumeFromSnapshot(data);
                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to clone volume from snapshot');

                    // Mount Volume
                    return mountVolumeToESXi(data);

                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to mount cloned volume from snapshot to ESXi host');

                }).catch(function (e) {
                    console.log(e);
                    return e;
                });

            };

            /*
             * restoreSnapshotVMGuestFiles
             */
            var restoreSnapshotVMGuestFiles = function (data) {

                // Check for available licenses
                return checkLicenses(data).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to check licenses');

                    // Create Volume Clone
                    return cloneVolumeFromSnapshot(data);
                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to clone volume from snapshot');

                    // Mount Volume
                    return mountVolumeToESXi(data);

                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to mount cloned volume from snapshot to ESXi host');

                    return registerVM(data);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to register VM to vCenter');
                    return res;


                }).catch(function (e) {
                    return e;
                });

            };

            /*
             * restoreSnapshotVMInstantMachine
             */
            var restoreSnapshotIntoInstantVM = function (data) {

                // Check for available licenses
                return checkLicenses(data).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to check licenses');

                    // Create Volume Clone
                    return cloneVolumeFromSnapshot(data);
                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to clone volume from snapshot');

                    // Mount Volume
                    return mountVolumeToESXi(data);

                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to mount cloned volume from snapshot to ESXi host');

                    return registerVM(data);

                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to register VM from snapshot to ESXi host');

                    if (data.vm_power_on) {
                        // Power On VM
                        $log.debug('Backups Manager [%s] -> Powering on vm -> host [%s], VM [%s], ', data.uuid, data.esxi_host, data.vm.vm);
                        return vmwareFactory.powerOnVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host, data.vm.vm);
                    }

                    return res;

                }).then(function (res) {
                    if (res && res.status === 'error') throw new Error('Failed to power on VM on vCenter');

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

                //TODO: if new location
                /*return cloneVMFromSnapshot(data).then(function (data) {

                 });*/

                // Restore to current location (override VM)
                return restoreVMfromSnapshotToCurrentLocation(data).then(function (data) {

                    if (data.vm_power_on) {
                        // Power On VM
                        $log.debug('Backups Manager [%s] -> Powering on vm -> host [%s], VM [%s], ', data.uuid, data.esxi_host, data.vm.vm);
                        return vmwareFactory.powerOnVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host, data.vm.vm);
                    }

                }).then(function (res) {
                    if (res instanceof Error) throw new Error('Failed to restore VM snapshot to current location');

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
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    // Check if VM is powered on
                    return vmwareFactory.getVMState(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM state from vCenter');

                    // VM not found
                    if (res && res.data.hasOwnProperty('ManagedObjectNotFoundFault')) return res;

                    // Power Off VM
                    if (res.data['runtime.powerState'] === 'poweredOn') {
                        modalFactory.changeModalText('PLEASE WAIT', 'Powering off VM ...', '.window--backupsm .window__main');
                        return vmwareFactory.powerOffVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
                    }

                    // VM is Powered Off
                    return res;

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to power off VM at vCenter');

                    // VM not found
                    if (res && res.data.hasOwnProperty('ManagedObjectNotFoundFault')) return res;

                    // Unregister VM
                    modalFactory.changeModalText('Unregistering VM ...', '.window--backupsm .window__main');
                    return vmwareFactory.unregisterVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to unregister VM from vCenter');

                    return setRestoreStatus(data, 'mounted_to_esx');
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
                    if (res.status === 'error') throw new Error('Failed to unmount datastore from vCenter');

                    return setRestoreStatus(data, 'namespace_mounted');
                }).catch(function (e) {
                    console.log(e);
                    return e;
                });

            };

            /**
             * Destroy Storage Volume
             */
            var destroyVolume = function (data) {

                // Unmount NetApp Volume
                modalFactory.changeModalText('Unmounting storage volume...', '.window--backupsm .window__main');
                return netappFactory.unmountVolume(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver['vserver-name'], data.volumeName).then(function (res) {
                    if (res.status === 'error' || res.data !== 'passed') throw new Error('Failed to unmount volume');

                    return setRestoreStatus(data, 'volume_cloned');
                }).then(function () {

                    // Set NetApp Volume Offline
                    modalFactory.changeModalText('Setting volume offline...', '.window--backupsm .window__main');
                    return netappFactory.setVolumeOffline(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver['vserver-name'], data.volumeName);

                }).then(function (res) {
                    if (res.status === 'error' || res.data !== 'passed') throw new Error('Failed to set volume offline');

                    return setRestoreStatus(data, 'volume_offline');
                }).then(function () {

                    // Destroy NetApp Volume
                    modalFactory.changeModalText('Destroying volume...', '.window--backupsm .window__main');
                    return netappFactory.destroyVolume(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver['vserver-name'], data.volumeName);

                }).then(function (res) {
                    if (res.status === 'error' || res.data !== 'passed') throw new Error('Failed to destroy volume');

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

            /*
             * Backup
             */
            var startVMBackup = function (data) {
                var _this = this;
                var relationships = {};
                var main_promises = [];
                var datastore_promises = [];
                var ss_promises = [];
                var ssr_promises = [];

                this.connections = connectionsFactory.connections();

                // Start backup
                if (data.backupNow === true && data.selectedPrimaryStorage === 'snapshot') {

                    $log.debug('Backups Manager [%s] -> Running backup now -> name [%s]', data.uuid, data.backupName);

                    // Get all relationships
                    angular.forEach(data.selectedObjects, function (object) {

                        if (object.type === 'vCenter') {
                            // TODO: Get all valid Datastores in vCenter
                            // TODO: Make a backup for every VM in a valid datastore
                        }

                        if (object.type === 'Datastore') {
                            // TODO: Make a backup for every VM in datastore
                        }

                        if (object.type === 'Datacenter') {
                            // TODO: Get all valid VMs in Datacenter
                            // TODO: remove VMs in previous selected Datastores
                            // TODO: Make a backup for every VM in valid datastore
                        }

                        if (object.type === 'Cluster') {
                            // TODO: Get all valid VMs in Cluster
                            // TODO: remove VMs in previous selected Datastores
                            // TODO: Make a backup for every VM in valid datastore
                        }

                        if (object.type === 'VirtualMachine') {

                            // TODO: remove VMs in previous selected objects

                            // TODO: VM with more than 1 datastore
                            if (Array.isArray(object.object.datastore.ManagedObjectReference)) return;

                            if (data.quiesceTools) {
                            }

                            if (!relationships[object.parent]) relationships[object.parent] = {};
                            if (!relationships[object.parent][object.object.datastore.ManagedObjectReference.name]) relationships[object.parent][object.object.datastore.ManagedObjectReference.name] = [];

                            relationships[object.parent][object.object.datastore.ManagedObjectReference.name].push({
                                vm: object.id,
                                state: object.object.runtime.powerState,
                                type: 'VirtualMachine'
                            });

                        }
                    });

                    // For each vCenter
                    angular.forEach(relationships, function (datastores, vCenter) {

                        var connection = connectionsFactory.getConnectionByUuid(vCenter);
                        var esxi_credential = connection.credential;
                        var esxi_address = connection.host;
                        var esxi_port = connection.port;
                        var task_id;

                        $log.debug('Backups Manager [%s] -> Connecting to vCenter -> vCenter [%s]', data.uuid, esxi_address);
                        main_promises.push(vmwareFactory.connectvCenterSoap(esxi_credential, esxi_address, esxi_port).then(function (res) {
                            if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                            return vmwareFactory.createTask(esxi_credential, esxi_address, esxi_port, 'com.sysos.management.backup', 'Datacenter', 'group-d1');

                        }).then(function (res) {
                            if (res.status === 'error') throw new Error('Failed to create task');
                            $log.debug('Backups Manager [%s] -> Main task created -> vCenter [%s], task [%s]', data.uuid, esxi_address, res.data.key);

                            task_id = res.data.key;

                            return vmwareFactory.setTaskState(esxi_credential, esxi_address, esxi_port, task_id, 'running');
                        }).then(function (res) {
                            if (res.status === 'error') throw new Error('Failed to set task state');
                            $log.debug('Backups Manager [%s] -> Main task running -> vCenter [%s], task [%s]', data.uuid, esxi_address, task_id);

                            return vmwareFactory.updateTaskProgress(esxi_credential, esxi_address, esxi_port, task_id, 20);
                        }).then(function (res) {
                            if (res.status === 'error') throw new Error('Failed to update task progress');
                            $log.debug('Backups Manager [%s] -> Main task 20% -> vCenter [%s], task [%s]', data.uuid, esxi_address, task_id);

                            // Backup for each Datstore
                            angular.forEach(datastores, function (objects, datastore) {

                                var datastore_task_id;

                                datastore_promises.push(vmwareFactory.createTask(esxi_credential, esxi_address, esxi_port, 'com.sysos.management.backup', 'Datastore', datastore).then(function (res) {
                                    if (res.status === 'error') throw new Error('Failed to create task');
                                    $log.debug('Backups Manager [%s] -> Datastore task created -> vCenter [%s], datastore [%s], task [%s]', data.uuid, esxi_address, datastore, res.data.key);

                                    datastore_task_id = res.data.key;

                                    return vmwareFactory.setTaskState(esxi_credential, esxi_address, esxi_port, datastore_task_id, 'running');
                                }).then(function (res) {
                                    if (res.status === 'error') throw new Error('Failed to set task state');
                                    $log.debug('Backups Manager [%s] -> Datastore task running -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

                                    return vmwareFactory.updateTaskProgress(esxi_credential, esxi_address, esxi_port, datastore_task_id, 20);
                                }).then(function (res) {
                                    if (res.status === 'error') throw new Error('Failed to update task progress');
                                    $log.debug('Backups Manager [%s] -> Datastore task 20% -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

                                    var smanagerFactory = $injector.get('smanagerFactory');

                                    var storage_link = smanagerFactory.getLinkByVMwareDatastore(vCenter, datastore);

                                    if (!storage_link) throw new Error('Unable to get Storage Link');

                                    var storage = connectionsFactory.getConnectionByUuid(storage_link.storage);
                                    var vserver = eval(connectionsFactory.getObjectByUuidMapping(storage_link.vserver)); // jshint ignore:line
                                    var volume = eval(connectionsFactory.getObjectByUuidMapping(storage_link.volume)); // jshint ignore:line

                                    if (!storage) throw new Error('Unable to get Storage object');
                                    if (!vserver) throw new Error('Unable to get Vserver object');
                                    if (!volume) throw new Error('Unable to get Volume object');

                                    var netapp_credential = storage.credential;
                                    var netapp_host = storage.host;
                                    var netapp_port = storage.port;
                                    var snapshots = [];

                                    angular.forEach(objects, function (key) {

                                        /*
                                         * Create VM Snapshot
                                         */
                                        ss_promises.push(vmwareFactory.createSnapShot(esxi_credential, esxi_address, esxi_port, key.vm, 'SysOS_backup_' + data.uuid, 'SysOS temporary snapshot. Do not delete this snapshot while a backup is running.', false, true).then(function (res) {
                                            if (res.status === 'error') throw new Error('Failed to create snapshot');
                                            if (res.data[0].propSet.info.error) throw new Error('Failed to create snapshot');

                                            $log.debug('Backups Manager [%s] -> VM snapshot created -> vCenter [%s], vm [%s], snapshot [%s]', data.uuid, esxi_address, key.vm, res.data[0].propSet.info.result.name);

                                            snapshots.push(res.data[0].propSet.info.result.name);

                                        }).catch(function (e) {
                                            console.log(e);
                                            return e;
                                        }));

                                    });
                                    //End VM each

                                    return $q.all(ss_promises).then(function () {

                                        return vmwareFactory.updateTaskProgress(esxi_credential, esxi_address, esxi_port, datastore_task_id, 40);
                                    }).then(function (res) {
                                        if (res.status === 'error') throw new Error('Failed to update task progress');
                                        $log.debug('Backups Manager [%s] -> Datastore task 40% -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

                                        /*
                                         * Create Storage Snapshot
                                         */
                                        return netappFactory.createSnapshot(netapp_credential, netapp_host, netapp_port, vserver['vserver-name'], volume['volume-id-attributes'].name, data.backupName);

                                    }).then(function (res) {
                                        if (res.status === 'error') throw new Error('Failed to create Volume Snapshot');
                                        $log.debug('Backups Manager [%s] -> Storage snapshot created -> vCenter [%s], storage [%s], vserver [%s], volume [%s]', data.uuid, esxi_address, netapp_host, vserver['vserver-name'], volume['volume-id-attributes'].name);

                                        return vmwareFactory.updateTaskProgress(esxi_credential, esxi_address, esxi_port, datastore_task_id, 60);
                                    }).then(function (res) {
                                        if (res.status === 'error') throw new Error('Failed to update task progress');
                                        $log.debug('Backups Manager [%s] -> Datastore task 60% -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

                                        /*
                                         * Delete VM Snapshot
                                         */
                                        angular.forEach(snapshots, function (snapshot) {
                                            ssr_promises.push(vmwareFactory.removeSnapshot(esxi_credential, esxi_address, esxi_port, snapshot, false).then(function (res) {
                                                if (res.status === 'error') throw new Error('Failed to delete snapshot');
                                                $log.debug('Backups Manager [%s] -> VM snapshot deleted -> vCenter [%s], snapshot [%s]', data.uuid, esxi_address, snapshot);

                                            }).catch(function (e) {
                                                console.log(e);
                                                return e;
                                            }));
                                        });
                                        //End Snapshots each

                                        return $q.all(ssr_promises);

                                    }).then(function () {
                                        return vmwareFactory.updateTaskProgress(esxi_credential, esxi_address, esxi_port, datastore_task_id, 80);
                                    }).then(function (res) {
                                        if (res.status === 'error') throw new Error('Failed to update task progress');
                                        $log.debug('Backups Manager [%s] -> Datastore task 80% -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

                                        // End Task
                                        return vmwareFactory.setTaskState(esxi_credential, esxi_address, esxi_port, datastore_task_id, 'success');

                                    }).then(function (res) {
                                        if (res.status === 'error') throw new Error('Failed to set task state');
                                        $log.debug('Backups Manager [%s] -> Datastore task success -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

                                    }).catch(function (e) {
                                        console.log(e);
                                        return e;
                                    });

                                }));

                            });
                            //End Datastore each

                            // End vCenter backup task
                            return $q.all(datastore_promises).then(function () {

                                return vmwareFactory.updateTaskProgress(esxi_credential, esxi_address, esxi_port, task_id, 80);

                            }).then(function (res) {
                                if (res.status === 'error') throw new Error('Failed to update task progress');
                                $log.debug('Backups Manager [%s] -> Main task 80% -> vCenter [%s], task [%s]', data.uuid, esxi_address, task_id);

                                // End Task
                                return vmwareFactory.setTaskState(esxi_credential, esxi_address, esxi_port, task_id, 'success');
                            }).then(function (res) {
                                if (res.status === 'error') throw new Error('Failed to set task state');
                                $log.debug('Backups Manager [%s] -> Main task success -> vCenter [%s], task [%s]', data.uuid, esxi_address, task_id);

                            }).catch(function (e) {
                                console.log(e);
                                return e;
                            });

                        }));
                    });
                    // End vCenter each

                    return $q.all(main_promises).catch(function (e) {
                        console.log(e);
                        return e;
                    });

                }

                //TODO:
                /*return vmwareFactory.connectvCenterSoap(data.esxi_credential, data.esxi_address, data.esxi_port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    return vmwareFactory.getVMState(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm, true);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM data');

                    console.log('getVMState', res);
                    return vmwareFactory.getDatastores(data.esxi_credential, data.esxi_address, data.esxi_port, 'group-d1');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get datastores');

                    console.log('getDatastores', res);
                    return vmwareFactory.getDatastoresWithVMsData(data.esxi_credential, data.esxi_address, data.esxi_port, 'group-d1');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get datastores with VM data');

                    console.log('getDatastoresWithVMsData', res);
                    return vmwareFactory.getDatastoreProps(data.esxi_credential, data.esxi_address, data.esxi_port, 'datastore-321');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get datastore');

                    console.log('getDatastoreProps', res);
                    return vmwareFactory.getFilesDataFromDatastore(data.esxi_credential, data.esxi_address, data.esxi_port, 'datastore-321', 'NFS_MAD', 'tt');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get files from datastores');

                    console.log('getFilesDataFromDatastore', res);
                    return vmwareFactory.queryVMEvents(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to query VM events');

                    console.log('queryVMEvents', res);
                    return vmwareFactory.searchIndexVM(data.esxi_credential, data.esxi_address, data.esxi_port, '502197e9-abe7-06e7-7d88-667c0a8b01ea');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to searchIndex');

                    console.log('searchIndex', res);
                    return vmwareFactory.createTask(data.esxi_credential, data.esxi_address, data.esxi_port, 'com.sysos.management.backup', 'VirtualMachine', data.vm.vm);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to create task');

                    console.log('createTask', res);

                    task_id = res.data.key;

                    return vmwareFactory.setTaskState(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 'running');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to set task state');

                    console.log('setTaskState', res);
                    return vmwareFactory.updateTaskProgress(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 20);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to update task progress');

                    console.log('updateTaskProgress', res);
                    return vmwareFactory.searchIndexVM(data.esxi_credential, data.esxi_address, data.esxi_port, '502197e9-abe7-06e7-7d88-667c0a8b01ea');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to searchIndex');

                    console.log('searchIndex', res);
                    return vmwareFactory.getVMs(data.esxi_credential, data.esxi_address, data.esxi_port, 'group-d1');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VMs');

                    console.log('getVMs', res);
                    return vmwareFactory.createSnapShot(data.esxi_credential, data.esxi_address, data.esxi_port, data.vm.vm, 'SysOS_backup_' + data.uuid, 'SysOS temporary snapshot. Do not delete this snapshot while a backup is running.', false, true);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to create snapshot');

                    console.log('createSnapShot', res);

                    stanpshot = res.data[0].propSet.info.result.name;

                    return vmwareFactory.updateTaskProgress(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 40);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to update task progress');

                    console.log('updateTaskProgress', res);
                    return netappFactory.createSnapshot(data.netapp_credential, data.netapp_host, data.netapp_port, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to create Volume Snapshot');

                    console.log('createSnapShot', res);
                    return vmwareFactory.updateTaskProgress(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 60);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to update task progress');

                    console.log('updateTaskProgress', res);
                    return vmwareFactory.removeSnapshot(data.esxi_credential, data.esxi_address, data.esxi_port, stanpshot, false);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to delete snapshot');

                    console.log('removeSnapshot', res);
                    return vmwareFactory.updateTaskProgress(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 80);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to update task progress');

                    console.log('updateTaskProgress', res);
                    return vmwareFactory.setTaskState(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 'success');
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to set task state');

                    console.log('setTaskState', res);
                }).catch(function (e) {
                    console.log(e);

                    // Remove snapshot if exists on error and finish task
                    if (stanpshot) {
                        return vmwareFactory.removeSnapshot(data.esxi_credential, data.esxi_address, data.esxi_port, stanpshot, false).then(function () {
                            return vmwareFactory.setTaskState(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 'error');
                        }).catch(function (e) {
                            return vmwareFactory.setTaskState(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 'error');
                        });
                    }

                    // Finish task on error
                    if (task_id) return vmwareFactory.setTaskState(data.esxi_credential, data.esxi_address, data.esxi_port, task_id, 'error');

                });*/
            };

            return {
                setBackups: function (data) {
                    backups = data;
                },
                getBackups: function () {
                    return backups;
                },
                setRestores: function (data) {
                    restores = data;
                },
                getRestores: function () {
                    return restores;
                },
                getActive: function () {
                    return active;
                },
                setBackup: function (data) {
                    data.status = [];
                    return backups.push(data);
                },
                setRestore: function (data) {
                    data.status = [];
                    return restores.push(data);
                },
                setActive: function (uuid) {
                    return active = uuid;
                },
                setBackupStatus: setBackupStatus,
                setRestoreStatus: setRestoreStatus,
                mountRestoreSnapshotDatastore: mountRestoreSnapshotDatastore,
                restoreSnapshotVMGuestFiles: restoreSnapshotVMGuestFiles,
                restoreSnapshotDatastoreFiles: restoreSnapshotDatastoreFiles,
                restoreSnapshotIntoInstantVM: restoreSnapshotIntoInstantVM,
                restoreSnapshotIntoVM: restoreSnapshotIntoVM,
                unpublishVM: unpublishVM,
                unmountDatastore: unmountDatastore,
                destroyVolume: destroyVolume,
                createSnapShot: createSnapShot,
                startVMBackup: startVMBackup
            };
        }]);
}());
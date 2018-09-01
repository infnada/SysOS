(function () {
    'use strict';
    smanagerApp.factory('smanagerFactory', ['$rootScope', '$q', '$log', '$document', 'toastr', 'uuid', 'ServerFactory', '$filter', 'modalFactory', 'netappFactory', 'connectionsFactory', 'vmwareFactory',
        function ($rootScope, $q, $log, $document, toastr, uuid, ServerFactory, $filter, modalFactory, netappFactory, connectionsFactory, vmwareFactory) {
            var links = [];

            /** @namespace datastore.info.nas */
            /** @namespace datastore.info.nas.remotePath */
            /** @namespace res.data.propSet */
            /** @namespace data.data.returnval */
            /** @namespace datastore_vm.storage.perDatastoreUsage */
            /** @namespace datastore_vm.storage.perDatastoreUsage.unshared */
            /** @namespace datastore_vm.runtime.powerState */

            /*
             *
             * PRIVATE FUNCTIONS
             *
             */
            var activeConnection = null;
            var parentConnection = null;

            /**
             * @params
             * type {String} [vmware, netapp] New node type to check against
             * uuid {uuid} Main node uuid
             */
            //TODO: some storages could have the same LIF IP!!! and links will be wrong
            var checkLinkBetweenManagedNodes = function (type, uuid) {

                var connection = connectionsFactory.getConnectionByUuid(uuid);

                if (type === 'vmware') {

                    // Get all connection datastores
                    angular.forEach(connection.datastores, function (datastore) {

                        if (datastore.summary.type === 'VMFS') return;

                        // Check if any storage volume contains the datastore remotePath as a volume junction path
                        angular.forEach(connectionsFactory.connections().storage, function (storage) {

                            // Checking for NetApp storage
                            if (storage.type === 'NetApp') {

                                // check if storage have any interface that match the datastore.remoteHost and
                                // datastore.type
                                var foundInterface = $filter('filter')(storage.netifaces, {
                                    'address': datastore.info.nas.remoteHost,
                                    'data-protocols': {
                                        'data-protocol': (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type)
                                    }
                                })[0];

                                // If not found any storage interface matching, return
                                if (!foundInterface) return;

                                // Search any Data Vservers with allowed protocol that match the datastore.type
                                var foundVserver = $filter('filter')(storage.vservers, {
                                    'vserver-type': 'data',
                                    'vserver-name': foundInterface.vserver,
                                    'allowed-protocols': {
                                        'protocol': (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type)
                                    }
                                })[0];

                                if (!foundVserver) return;

                                // Search for each Volume containing as a junction path the current datastore remotePath
                                var foundVolume = $filter('filter')(foundVserver.volumes, {
                                    'volume-id-attributes': {
                                        'junction-path': datastore.info.nas.remotePath
                                    }
                                })[0];

                                if (!foundVolume) return;

                                // TODO: CHECK VOLUME EXPORTS that match ESXi host

                                // Link found!
                                links.push({
                                    virtual: uuid,
                                    esxi_datastore: datastore.obj.name,
                                    storage: storage.uuid,
                                    vserver: foundVserver.uuid,
                                    volume: foundVolume['volume-id-attributes'].uuid,
                                    junction_path: datastore.info.nas.remotePath
                                });

                                $log.debug('Infrastructure Manager [%s] -> New link found when scanning a vCenter node. -> datastore [%s], junction [%s]', connection.uuid, datastore.name, datastore.info.nas.remotePath);

                            }// end NetApp
                        });// end storage
                    });// end datastore
                }// end vmware

                if (type === 'netapp') {

                    // Get all vmware connections
                    angular.forEach(connectionsFactory.connections().virtual, function (virtual) {

                        if (virtual.type === 'vCenter' || virtual.type === 'ESXi') {

                            // Get all vmware datastores
                            angular.forEach(virtual.datastores, function (datastore) {

                                if (datastore.summary.type === 'VMFS') return;

                                // check if connection have any interface that match the vmware datastore.remoteHost
                                // and datastore.type
                                var foundInterface = $filter('filter')(connection.netifaces, {
                                    'address': datastore.info.nas.remoteHost,
                                    'data-protocols': {
                                        'data-protocol': (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type)
                                    }
                                })[0];

                                // If not found any storage interface matching, return
                                if (!foundInterface) return;

                                var foundVserver = $filter('filter')(connection.vservers, {
                                    'vserver-type': 'data',
                                    'vserver-name': foundInterface.vserver,
                                    'allowed-protocols': {
                                        'protocol': (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type)
                                    }
                                })[0];

                                if (!foundVserver) return;

                                // Search for each Volume containing as a junction path the current datastore remotePath
                                var foundVolume = $filter('filter')(foundVserver.volumes, {
                                    'volume-id-attributes': {
                                        'junction-path': datastore.info.nas.remotePath
                                    }
                                })[0];

                                if (!foundVolume) return;

                                // Link found!
                                links.push({
                                    virtual: virtual.uuid,
                                    esxi_datastore: datastore.obj.name,
                                    storage: uuid,
                                    vserver: foundVserver.uuid,
                                    volume: foundVolume['volume-id-attributes'].uuid,
                                    junction_path: datastore.info.nas.remotePath
                                });

                                $log.debug('Infrastructure Manager [%s] -> New link found when scanning a NetApp node. -> datastore [%s], junction [%s]', connection.uuid, datastore.name, datastore.info.nas.remotePath);

                            });// end datastore
                        }// end vmware
                    });// end virtual
                }// end netapp

                return links;

            };

            /*
             *
             * PUBLIC FUNCTIONS
             *
             */

            /**
             * @description
             * Return a link if found
             *
             * @params
             * virtual_uuid {String}
             * esxi_datastore {String}
             */
            var getLinkByVMwareDatastore = function (virtual_uuid, esxi_datastore) {
                return $filter('filter')(links, {
                    virtual: virtual_uuid,
                    esxi_datastore: esxi_datastore
                })[0];
            };

            /**
             * @description
             * Return a link if found
             *
             * @params
             * virtual_uuid {String}
             * junction_path {String}
             */
            var getLinkByStorageJunctionPath = function (virtual_uuid, volume, junction_path) {

                // Get Datastore name by Junction Path
                return $filter('filter')(links, {
                    storage: virtual_uuid,
                    volume: volume,
                    junction_path: junction_path
                })[0];
            };

            /**
             * @description
             * Return string to bytes
             *
             * @param bytes
             * @param decimals
             * @returns {string}
             */
            var formatBytes = function (bytes,decimals) {
                if(bytes === 0) return '0 Bytes';
                var k = 1024,
                    dm = decimals || 2,
                    sizes = ['B', 'K', 'M', 'G', 'T'],
                    i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            };

            /**
             * @description
             * Get all data from VMware vCenter node
             *
             * @param connection {Object}
             */
            var getVMwareData = function (connection) {
                var dt_promises = [];
                var dc_promises = [];
                var ct_promises = [];
                var ht_promises = [];
                var foundDatacenterFolder;
                var foundDatastoreinUuidMap;

                var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', 'Connecting to vCenter/ESXi...', '.window--smanager .window__main', 'plain');

                return modalInstance.opened.then(function () {

                    // Login to vmware
                    return ServerFactory.connectVcenter(connection.host, connection.credential, connection.port);
                }).then(function (data) {
                    if (data.data.status === 'error') throw new Error(data.data.data);

                    // Login to SOAP vmware
                    return vmwareFactory.connectvCenterSoap(connection.credential, connection.host, connection.port);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to ' + connectionsFactory.getConnectionByUuid(connection.uuid).type);

                    // Get client version
                    return vmwareFactory.getClientVersion(connection.host, connection.port);
                }).then(function (data) {
                    if (data.status === 'error') throw new Error(data.data);
                    //TODO: check if version is compatible

                    angular.extend(connectionsFactory.getConnectionByUuid(connection.uuid), {
                        hostname: connection.host,
                        apiVersion: data.data.apiVersion[0],
                        downloadUrl: data.data.downloadUrl[0],
                        exactVersion: data.data.exactVersion[0],
                        flexClientVersion: data.data.flexClientVersion[0],
                        patchVersion: data.data.patchVersion[0],
                        version: data.data.apiVersion[0],
                        authdPort: (data.data.authdPort ? data.data.authdPort[0] : null),
                        type: (data.data.authdPort ? 'ESXi' : 'vCenter')
                    });

                    modalFactory.changeModalText('Checking SysOS extension...', '.window--smanager .window__main');

                    // Get SysOS management extension
                    return vmwareFactory.findSysOSExtension(connection.credential, connection.host, connection.port);

                }).then(function (data) {

                    // Register extension if not registered
                    if (!data.data.returnval) return vmwareFactory.registerExtension(connection.credential, connection.host, connection.port);

                }).then(function () {

                    modalFactory.changeModalText('Getting data...', '.window--smanager .window__main');

                    // Get Datacenters
                    return ServerFactory.callVcenter(connection.host, connection.port, '/rest/vcenter/datacenter');

                }).then(function (data) {

                    connectionsFactory.getConnectionByUuid(connection.uuid).datacenters = data.data.data.response.value;

                    // For each Datacenter
                    angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters, function (datacenter, key) {

                        // Get Host not in Cluster (standalone)
                        dt_promises.push(ServerFactory.callVcenter(connection.host, connection.port, '/rest/vcenter/host?filter.datacenters=' + datacenter.datacenter + '&filter.standalone=true').then(function (data) {
                            connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts = data.data.data.response.value;

                            // For each Host
                            angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts, function (host, i) {

                                // Get resource pools per Host
                                ht_promises.push(ServerFactory.callVcenter(connection.host, connection.port, '/rest/vcenter/resource-pool?filter.hosts=' + host.host).then(function (data) {
                                    connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts[i].resource_pools = data.data.data.response.value;
                                }));

                            });

                            return $q.all(ht_promises);
                        }));
                    });

                    return $q.all(dt_promises);

                }).then(function () {

                    // For each Datacenter
                    angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters, function (datacenter, key) {

                        // Get Clusters
                        dc_promises.push(ServerFactory.callVcenter(connection.host, connection.port, '/rest/vcenter/cluster?filter.datacenters=' + datacenter.datacenter).then(function (data) {

                            connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters = data.data.data.response.value;

                            // For each Cluster
                            angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters, function (cluster, c) {

                                // Get resource pools per cluster
                                ct_promises.push(ServerFactory.callVcenter(connection.host, connection.port, '/rest/vcenter/resource-pool?filter.datacenters=' + datacenter.datacenter + '&filter.clusters=' + cluster.cluster).then(function (data) {
                                    connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters[c].resource_pools = data.data.data.response.value;
                                }));

                                // Get Host per Cluster
                                ct_promises.push(ServerFactory.callVcenter(connection.host, connection.port, '/rest/vcenter/host?filter.datacenters=' + datacenter.datacenter + '&filter.clusters=' + cluster.cluster).then(function (data) {
                                    connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters[c].hosts = data.data.data.response.value;
                                }));

                            });

                            return $q.all(ct_promises);
                        }));
                    });

                    return $q.all(dc_promises);

                }).then(function () {

                    // Get Folders
                    return ServerFactory.callVcenter(connection.host, connection.port, '/rest/vcenter/folder');
                }).then(function (res) {

                    connectionsFactory.getConnectionByUuid(connection.uuid).folders = res.data.data.response.value;

                    //TODO: more than 1 datacenter?¿??¿?¿
                    foundDatacenterFolder = $filter('filter')(res.data.data.response.value, {
                        type: 'DATACENTER'
                    })[0];

                    // Get VMs
                    return getVMs(connection.uuid, false, foundDatacenterFolder);
                }).then(function () {

                    // Get datastores
                    return vmwareFactory.getDatastores(connection.credential, connection.host, connection.port, foundDatacenterFolder.folder);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get Datastores from ' + connectionsFactory.getConnectionByUuid(connection.uuid).type);

                    connectionsFactory.getConnectionByUuid(connection.uuid).datastores = res.data;

                    // For each Datastore
                    angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datastores, function (datastore, d) {

                        // Check if uuid is in uuidMap array
                        foundDatastoreinUuidMap = $filter('filter')(connectionsFactory.getUuidMap(), {
                            uuid: datastore.info.url,
                            parent: connection.uuid
                        })[0];

                        // Push new Datastore
                        if (!foundDatastoreinUuidMap) {
                            $log.debug('Infrastructure Manager [%s] -> Getting vCenter Datastoress. Found new Datastore -> hosts [%s], datastore [%s]', connection.uuid, connection.host, datastore.name);

                            connectionsFactory.getUuidMap().push({
                                uuid: datastore.info.url,
                                parent: connection.uuid,
                                object: 'datastores[' + d + ']'
                            });
                        }

                    });

                    // Check if any datastore is from a managed storage system and link it.
                    return checkLinkBetweenManagedNodes('vmware', connection.uuid);
                }).then(function (data) {

                    modalFactory.changeModalText('Saving connection to file', '.window--smanager .window__main');

                    connectionsFactory.saveLinksMap(data);
                    connectionsFactory.saveUuidMap();
                    connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(connection.uuid));
                    modalFactory.closeModal('.window--smanager .window__main');

                }).catch(function (e) {
                    modalFactory.closeModal('.window--smanager .window__main');
                    connectionsFactory.deleteConnection(connection.uuid);
                    $rootScope.$broadcast('smanager__new_connection');

                    if (e.message === 'ENOTFOUND') {
                        return toastr.error('Host not found (' + connection.host + ')', 'Error trying to connect to vCenter');
                    }

                    if (e.message === 'ETIMEDOUT') {
                        return toastr.error('Timeout while connecting to ' + connection.host, 'Error trying to connect to vCenter');
                    }

                    if (e.message === 'Unauthorized') {
                        return toastr.error('Invalid credentials (' + connection.host + ')', 'Error trying to connect to vCenter');
                    }

                    toastr.error(e.message, 'Error getting data from vCenter');
                    throw new Error(e);
                });

            };

            /**
             * @description
             * Get all
             *
             * @param uuid {String}
             * @param save {Boolean}
             * @param foundDatacenterFolder* {Object}
             */
            var getVMs = function (uuid, save, foundDatacenterFolder) {
                if (!uuid) throw new Error('uuid_not_found');

                var newVMs = 0;
                var totalOldVMs = (connectionsFactory.getConnectionByUuid(uuid).vms ? connectionsFactory.getConnectionByUuid(uuid).vms.length : 0);
                var totalVMs;
                var foundVMinUuidMap;
                var connection = connectionsFactory.getConnectionByUuid(uuid);

                $log.debug('Infrastructure Manager [%s] -> Getting vCenter VMs -> hosts [%s]', uuid, connection.host);

                if (!foundDatacenterFolder) {
                    foundDatacenterFolder = $filter('filter')(connection.folders, {
                        type: 'DATACENTER'
                    })[0];
                }

                return vmwareFactory.connectvCenterSoap(connection.credential, connection.host, connection.port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to ' + connectionsFactory.getConnectionByUuid(uuid).type);

                    return vmwareFactory.getVMs(connection.credential, connection.host, connection.port, foundDatacenterFolder.folder);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VMs from ' + connectionsFactory.getConnectionByUuid(uuid).type);

                    totalVMs = res.data.length;

                    connectionsFactory.getConnectionByUuid(uuid).vms = res.data;

                    // For each VM
                    angular.forEach(connectionsFactory.getConnectionByUuid(uuid).vms, function (vm, x) {

                        // Set disk data readable
                        vm.guest.disks = [];

                        if (Array.isArray(vm.guest.disk)) {
                            angular.forEach(vm.guest.disk, function (disk, i) {
                                connectionsFactory.getConnectionByUuid(uuid).vms[x].guest.disks[i] = {
                                    'mount_point': disk.diskPath,
                                    'free_percent': (disk.freeSpace / disk.capacity * 100).toFixed(1) + '%',
                                    'free_space': formatBytes(disk.freeSpace),
                                    'size': formatBytes(disk.capacity),
                                    'used_percent': (100 - disk.freeSpace / disk.capacity * 100).toFixed(1) + '%',
                                    'used_space': formatBytes(disk.capacity - disk.freeSpace)
                                };
                            });
                        } else if (vm.guest.disk) {
                            var disk = vm.guest.disk;
                            connectionsFactory.getConnectionByUuid(uuid).vms[x].guest.disks = [{
                                'mount_point': disk.diskPath,
                                'free_percent': (disk.freeSpace / disk.capacity * 100).toFixed(1) + '%',
                                'free_space': formatBytes(disk.freeSpace),
                                'size': formatBytes(disk.capacity),
                                'used_percent': (100 - disk.freeSpace / disk.capacity * 100).toFixed(1) + '%',
                                'used_space': formatBytes(disk.capacity - disk.freeSpace)
                            }];
                        }



                        vm.vm = vm.obj.name;

                        // Check if uuid is in uuidMap array
                        foundVMinUuidMap = $filter('filter')(connectionsFactory.getUuidMap(), {
                            uuid: vm.config.uuid,
                            parent: uuid
                        })[0];

                        // Push new VM
                        if (!foundVMinUuidMap) {
                            ++newVMs;

                            $log.debug('Infrastructure Manager [%s] -> Getting vCenter VMs. Found new VM -> hosts [%s], vm [%s]', uuid, connection.host, vm.name);

                            connectionsFactory.getUuidMap().push({
                                uuid: vm.config.uuid,
                                parent: uuid,
                                object: 'vms[' + x + ']'
                            });
                        }

                    });

                    $log.debug('Infrastructure Manager [%s] -> Getting vCenter VMs. Finish -> hosts [%s], totalOldVMs [%s], totalVMs [%s], newVMs [%s]', uuid, connection.host, totalOldVMs, totalVMs, newVMs);

                    // Save
                    if (save && newVMs !== 0 || save && totalOldVMs !== totalVMs) {
                        connectionsFactory.saveUuidMap();
                        connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(uuid));
                    }

                }).catch(function (e) {
                    $log.error('Infrastructure Manager [%s] -> Error while getting vCenter VMs ->', uuid, e);

                    throw e;
                });
            };

            /**
             * @description
             * Get all data from NetApp node
             *
             * @param connection {Object}
             */
            var getNetAppData = function (connection) {
                var main_promises = [];
                var vs_promises = [];
                var sh_promises = [];
                var shdate_promises = [];

                /* TODO: GET netappinfo from SNMP OID:
                 1.3.6.1.4.1.789.1.1.2.0
                 1.3.6.1.2.1.1.5.0
                 1.3.6.1.4.1.789.1.1.7.0
                 */

                var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', 'Connecting to NetApp...', '.window--smanager .window__main', 'plain');

                return modalInstance.opened.then(function () {

                    // Get NetApp Version
                    return netappFactory.getSystemVersion(connection.credential, connection.host, connection.port);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get NetApp System Version');

                    //TODO: check if version is compatible

                    angular.extend(connectionsFactory.getConnectionByUuid(connection.uuid), {
                        hostname: connection.host,
                        buildtimestamp: res.data.build_timestamp,
                        isclustered: res.data.is_clustered,
                        version: res.data.version,
                        versiontuple: res.data.version_tuple,
                        type: 'NetApp'
                    });

                    modalFactory.changeModalText('Getting data...', '.window--smanager .window__main');

                    // Get interfaces
                    // Get cluster data
                    // Get vServers
                    main_promises.push(netappFactory.getNetInterfaces(connection.credential, connection.host, connection.port));
                    main_promises.push(netappFactory.getFcpInterfaces(connection.credential, connection.host, connection.port));
                    main_promises.push(netappFactory.getFcpAdapters(connection.credential, connection.host, connection.port));
                    main_promises.push(netappFactory.getMetrocluster(connection.credential, connection.host, connection.port));
                    main_promises.push(netappFactory.getClusterIdentity(connection.credential, connection.host, connection.port));
                    main_promises.push(netappFactory.getLicenses(connection.credential, connection.host, connection.port));
                    main_promises.push(netappFactory.getOntapiVersion(connection.credential, connection.host, connection.port));
                    main_promises.push(netappFactory.getVservers(connection.credential, connection.host, connection.port));

                    return $q.all(main_promises);

                }).then(function (res) {

                    // Set interfaces
                    connectionsFactory.getConnectionByUuid(connection.uuid).netifaces = res[0].data;
                    connectionsFactory.getConnectionByUuid(connection.uuid).fcpifaces = res[1].data;
                    connectionsFactory.getConnectionByUuid(connection.uuid).fcpadapters = res[2].data;

                    // Set cluster data
                    connectionsFactory.getConnectionByUuid(connection.uuid).metrocluster = res[3].data;
                    connectionsFactory.getConnectionByUuid(connection.uuid).cluster = res[4].data;
                    connectionsFactory.getConnectionByUuid(connection.uuid).licenses = res[5].data;
                    connectionsFactory.getConnectionByUuid(connection.uuid).ontapi_version = res[6].data;

                    // Set vServers
                    connectionsFactory.getConnectionByUuid(connection.uuid).vservers = res[7].data;

                    // Set new uuid to match internal node uuid
                    connectionsFactory.getUuidMap()[connectionsFactory.getUuidMap().findIndex(function (el) {
                        return el.uuid === connection.uuid;
                    })].uuid = res[4].data.cluster_uuid;
                    connectionsFactory.getConnectionByUuid(connection.uuid).uuid = res[4].data.cluster_uuid;

                    connection.uuid = res[4].data.cluster_uuid;

                    // Set new uuid as activeConnection
                    activeConnection = res[4].data.cluster_uuid;

                    angular.forEach(res[7].data, function (vserver, key) {

                        connectionsFactory.getUuidMap().push({
                            uuid: vserver.uuid,
                            parent: connection.uuid,
                            object: 'vservers[' + key + ']'
                        });

                        if (vserver['vserver-type'] === 'admin') {
                            connectionsFactory.getConnectionByUuid(connection.uuid).name = vserver['vserver-name'];
                        }

                        // GET Volumes per vServer
                        if (vserver['vserver-type'] === 'data') {

                            // Get qtrees
                            vs_promises.push(netappFactory.getQtrees(connection.credential, connection.host, connection.port, vserver['vserver-name']).then(function (qtrees) {
                                if (qtrees.status === 'error') throw new Error('Failed to get qtrees');

                                connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].qtrees = qtrees.data;
                            }));

                            vs_promises.push(netappFactory.getVolumes(connection.credential, connection.host, connection.port, vserver['vserver-name']).then(function (volumes) {
                                if (volumes.status === 'error') throw new Error('Failed to get volumes');

                                connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].volumes = volumes.data;

                                // For each Volume
                                angular.forEach(volumes.data, function (volume, v) {

                                    connectionsFactory.getUuidMap().push({
                                        uuid: volume['volume-id-attributes'].uuid,
                                        parent: vserver['uuid'],
                                        object: 'volumes[' + v + ']'
                                    });

                                    // Get all LUNS
                                    sh_promises.push(netappFactory.getLuns(connection.credential, connection.host, connection.port, vserver['vserver-name'], volume['volume-id-attributes'].name).then(function (luns) {
                                        if (luns.status === 'error') throw new Error('Failed to get LUNs');

                                        connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].volumes[v].luns = luns.data;
                                    }));

                                    // Get all Snapshots
                                    sh_promises.push(netappFactory.getSnapshots(connection.credential, connection.host, connection.port, vserver['vserver-name'], volume['volume-id-attributes'].name).then(function (snapshots) {
                                        if (snapshots.status === 'error') throw new Error('Failed to get snapshots');

                                        connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].volumes[v].snapshots = snapshots.data;

                                        // For each snapshot
                                        angular.forEach(snapshots.data, function (snapshot, s) {

                                            // Get snapshot creation date
                                            shdate_promises.push(netappFactory.getFileInfo(
                                                connection.credential, connection.host, connection.port,
                                                vserver['vserver-name'],
                                                volume['volume-id-attributes'].name,
                                                snapshot.name
                                            ).then(function (res) {
                                                if (res.status === 'error') throw new Error('Failed to get Snapshot creation date');

                                                connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].volumes[v].snapshots[s].data = res.data;
                                            }));

                                            connectionsFactory.getUuidMap().push({
                                                uuid: snapshot['snapshot-instance-uuid'],
                                                parent: volume['volume-id-attributes'].uuid,
                                                main_parent: connection.uuid,
                                                object: 'snapshots[' + s + ']'
                                            });

                                            return $q.all(shdate_promises);

                                        });
                                    }));
                                });

                                return $q.all(sh_promises);

                            }));
                        }

                    });

                    return $q.all(vs_promises);
                }).then(function () {

                    // Check if any volume is mounted to a managed virtual node and link it.
                    return checkLinkBetweenManagedNodes('netapp', connection.uuid);

                }).then(function (data) {
                    modalFactory.changeModalText('Saving connection to file', '.window--smanager .window__main');

                    connectionsFactory.saveLinksMap(data);
                    connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(connection.uuid));
                    connectionsFactory.saveUuidMap();
                    modalFactory.closeModal('.window--smanager .window__main');

                }).catch(function (e) {
                    modalFactory.closeModal('.window--smanager .window__main');
                    $rootScope.$broadcast('smanager__new_connection');
                    connectionsFactory.deleteConnection(connection.uuid);

                    if (e.message === 'ENOTFOUND') {
                        modalFactory.closeModal('.window--smanager .window__main');
                        return toastr.error('Host not found (' + connection.host + ')', 'Error trying to connect to NetApp');
                    }

                    if (e.message === 'ETIMEDOUT') {
                        modalFactory.closeModal('.window--smanager .window__main');
                        return toastr.error('Timeout while connecting to ' + connection.host, 'Error trying to connect to NetApp');
                    }

                    toastr.error(e.message, 'Error getting data from NetApp');
                    throw new Error(e);
                });
            };

            /**
             * @description
             * Refresh NetApp volume data
             *
             * @param data {Object}
             */
            var getVolumeData = function (data) {
                var vserver_index = connectionsFactory.getConnectionByUuid(data.uuid).vservers.findIndex(function (item) {
                    return item['vserver-name'] === data.vserver_name;
                });
                var volume_index = connectionsFactory.getConnectionByUuid(data.uuid).vservers[vserver_index].volumes.findIndex(function (item) {
                    return item['volume-id-attributes'].name === data.volume_name;
                });

                var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', 'Getting NetApp Volume data...', '.window--smanager .window__main', 'plain');
                return modalInstance.opened.then(function () {
                    return netappFactory.getSnapshots(data.credential, data.host, data.port, data.vserver_name, data.volume_name).then(function (snapshots) {
                        if (snapshots.status === 'error') throw new Error('Failed to get snapshots');

                        //TODO: angular.merge?
                        connectionsFactory.getConnectionByUuid(data.uuid).vservers[vserver_index].volumes[volume_index].snapshots = snapshots.data;

                        // For each snapshot
                        angular.forEach(snapshots.data, function (snapshot, s) {

                            connectionsFactory.getUuidMap().push({
                                uuid: snapshot['snapshot-instance-uuid'],
                                parent: data.volume_uuid,
                                main_parent: data.uuid,
                                object: 'snapshots[' + s + ']'
                            });

                        });
                    }).then(function () {
                        modalFactory.changeModalText('Saving connection to file', '.window--smanager .window__main');

                        connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(data.uuid));
                        connectionsFactory.saveUuidMap();

                        modalFactory.closeModal('.window--smanager .window__main');
                    }).catch(function (e) {
                        modalFactory.closeModal('.window--smanager .window__main');

                        throw e;
                    });
                });
            };

            /**
             * @description
             * Fetch NetApp SnapShots
             */
            var getSnapshotFiles = function (uuid, host, vserver, volume, snapshot) {
                var link;
                var datastore_index;
                var datastore_vm;
                var esxi_host;

                var vserver_index = connectionsFactory.getConnectionByUuid(uuid).vservers.findIndex(function (item) {
                    return item['vserver-name'] === vserver;
                });
                var volume_index = connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes.findIndex(function (item) {
                    return item['volume-id-attributes'].name === volume;
                });
                var snapshot_index = connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots.findIndex(function (item) {
                    return item.name === snapshot;
                });

                // Already fetched files from storage, don't ask for it again
                if (angular.isDefined(connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots[snapshot_index].files)) return $q.resolve();
                connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots[snapshot_index].vms = [];

                var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', 'Getting Snapshot data...', '.window--smanager .window__main', 'plain');

                return modalInstance.opened.then(function () {

                    return netappFactory.getSnapshotFiles(connectionsFactory.getConnectionByUuid(uuid).credential, host, connectionsFactory.getConnectionByUuid(uuid).port, vserver, volume, snapshot);
                }).then(function (files) {
                    if (files.status === 'error') throw new Error('Failed to get Snapshot files');

                    connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots[snapshot_index].files = files.data;

                    // Check every file
                    angular.forEach(files.data, function (file) {

                        // VM found
                        if (!file.hasOwnProperty('name')) {
                            console.log(file);
                            return;
                        }
                        if (file.name.substr(file.name.length - 4) === '.vmx') {

                            // Get vCenter Link by Storage Junction Path
                            link = getLinkByStorageJunctionPath(
                                uuid,
                                connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index]['volume-id-attributes'].uuid,
                                connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index]['volume-id-attributes']['junction-path']
                            );

                            if (link) {

                                // Get datastore_index using returned link
                                datastore_index = connectionsFactory.getConnectionByUuid(link.virtual).datastores.findIndex(function (item) {
                                    return item.obj.name === link.esxi_datastore;
                                });

                                // Make the $filter only if VMs found in this datastore
                                if (connectionsFactory.getConnectionByUuid(link.virtual).datastores[datastore_index].vm.hasOwnProperty('ManagedObjectReference')) {

                                    // Search for VM using returned Storage file .vmx path
                                    datastore_vm  = $filter('filter')(connectionsFactory.getConnectionByUuid(link.virtual).vms, {
                                        'vm': connectionsFactory.getConnectionByUuid(link.virtual).datastores[datastore_index].vm.ManagedObjectReference.name,
                                        'datastore': {
                                            'ManagedObjectReference': {
                                                'name': link.esxi_datastore
                                            }
                                        },
                                        'config': {
                                            'files': {
                                                'vmPathName': '[' + connectionsFactory.getConnectionByUuid(link.virtual).datastores[datastore_index].name + '] ' + file.path.substring(1) + '/' + file.name
                                            }
                                        }
                                    })[0];

                                    // Get Host name by host Id
                                    esxi_host = $filter('filter')(getESXihosts(), {
                                        'connection_address': connectionsFactory.getConnectionByUuid(link.virtual).host,
                                        'host': datastore_vm.runtime.host.name
                                    })[0];
                                }
                            }

                            connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots[snapshot_index].vms.push({
                                name: (datastore_vm ? datastore_vm.name : file.name.slice(0, -4)),
                                host: (esxi_host ? esxi_host.name : 'Unknown'),
                                state: (datastore_vm ? datastore_vm.runtime.powerState : 'Unknown'),
                                size: (datastore_vm ? datastore_vm.storage.perDatastoreUsage.unshared : 'Unknown'),
                                path: file.path + '/' + file.name,
                                virtual: (link ? link.virtual : ''),
                                vm: (datastore_vm ? datastore_vm : null)
                            });

                        }

                    });

                    modalFactory.changeModalText('Saving connection to file', '.window--smanager .window__main');

                    connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(uuid));

                    modalFactory.closeModal('.window--smanager .window__main');

                }).catch(function (e) {
                    modalFactory.closeModal('.window--smanager .window__main');

                    throw e;
                });
            };

            /**
             * @description
             * Gets all ESXi hosts from all existing vCenter connections
             */
            var getESXihosts = function () {
                var connections = connectionsFactory.connections();
                var ESXihosts = [];

                angular.forEach(connections.virtual, function (vcenter) {
                    angular.forEach(vcenter.datacenters, function (datacenter) {

                        // Standalone hosts
                        angular.forEach(datacenter.hosts, function (host) {
                            // Setup basic connection information required for "Backups Manager" application
                            ESXihosts.push({
                                connection_uuid: vcenter.uuid,
                                connection_state: host.connection_state,
                                host: host.host,
                                name: host.name,
                                power_state: host.power_state,
                                connection_credential: vcenter.credential,
                                connection_address: vcenter.host,
                                connection_port: vcenter.port,
                                datacenter: datacenter.datacenter
                            });
                        });

                        // Cluster hosts
                        angular.forEach(datacenter.clusters, function (cluster) {
                            angular.forEach(cluster.hosts, function (host) {
                                // Setup basic connection information required for "Backups Manager" application
                                ESXihosts.push({
                                    connection_uuid: vcenter.uuid,
                                    connection_state: host.connection_state,
                                    host: host.host,
                                    name: host.name,
                                    power_state: host.power_state,
                                    connection_credential: vcenter.credential,
                                    connection_address: vcenter.host,
                                    connection_port: vcenter.port,
                                    datacenter: datacenter.datacenter
                                });
                            });
                        });

                    });
                });

                return ESXihosts;
            };

            /**
             * VM operations
             */
            var powerOnVM = function (credential, host, port, vm) {
                return vmwareFactory.connectvCenterSoap(credential, host, port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    return vmwareFactory.getVMRuntime(credential, host, port, vm);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM runtime');
                    if (res.data.propSet.runtime.powerState === 'poweredOn') return res;

                    return vmwareFactory.powerOnVM(credential, host, port, res.data.propSet.runtime.host.name, vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to power on VM');

                }).catch(function (e) {
                    throw e;
                });
            };

            var powerOffVM = function (credential, host, port, vm) {
                return vmwareFactory.connectvCenterSoap(credential, host, port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    return vmwareFactory.getVMRuntime(credential, host, port, vm);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM runtime');
                    if (res.data.propSet.runtime.powerState === 'poweredOff') return res;

                    return vmwareFactory.powerOffVM(credential, host, port, vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to power off VM');

                }).catch(function (e) {
                    throw e;
                });
            };

            var suspendVM = function (credential, host, port, vm) {
                return vmwareFactory.connectvCenterSoap(credential, host, port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    return vmwareFactory.getVMRuntime(credential, host, port, vm);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM runtime');

                    if (res.data.propSet.runtime.powerState !== 'poweredOn') return res;
                    return vmwareFactory.suspendVM(credential, host, port, vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to suspend VM');

                }).catch(function (e) {
                    throw e;
                });
            };

            var resetVM = function (credential, host, port, vm) {
                return vmwareFactory.connectvCenterSoap(credential, host, port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    return vmwareFactory.getVMRuntime(credential, host, port, vm);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM runtime');
                    if (res.data.propSet.runtime.powerState !== 'poweredOn') return res;

                    return vmwareFactory.resetVM(credential, host, port, vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to reset VM');

                }).catch(function (e) {
                    throw e;
                });
            };

            var shutdownGuest = function (credential, host, port, vm) {
                return vmwareFactory.connectvCenterSoap(credential, host, port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    return vmwareFactory.getVMRuntime(credential, host, port, vm);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM runtime');
                    if (res.data.propSet.runtime.powerState !== 'poweredOn') return res;

                    return vmwareFactory.shutdownGuest(credential, host, port, vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to shutdown VM Guest OS');

                }).catch(function (e) {
                    throw e;
                });
            };

            var rebootGuest = function (credential, host, port, vm) {
                return vmwareFactory.connectvCenterSoap(credential, host, port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    return vmwareFactory.getVMRuntime(credential, host, port, vm);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to get VM runtime');
                    if (res.data.propSet.runtime.powerState !== 'poweredOn') return res;

                    return vmwareFactory.rebootGuest(credential, host, port, vm);

                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to restart VM Guest OS');

                }).catch(function (e) {
                    throw e;
                });
            };

            var refreshVM = function (vm, connection) {
                if (!vm) throw new Error('vm_not_found');
                if (!connection) throw new Error('connection_not_found');

                return vmwareFactory.connectvCenterSoap(connection.credential, connection.host, connection.port).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to connect to vCenter');

                    return vmwareFactory.getVMState(connection.credential, connection.host, connection.port, vm.vm, true);
                }).then(function (res) {
                    if (res.status === 'error') throw new Error('Failed to refresh VM');

                    res.data.vm = res.data.obj.name;

                    // Set disk data readable
                    res.data.guest.disks = [];

                    if (Array.isArray(vm.guest.disk)) {
                        angular.forEach(res.data.guest.disk, function (disk, i) {
                            res.data.guest.disks[i] = {
                                'mount_point': disk.diskPath,
                                'free_percent': (disk.freeSpace / disk.capacity * 100).toFixed(1) + '%',
                                'free_space': formatBytes(disk.freeSpace),
                                'size': formatBytes(disk.capacity),
                                'used_percent': (100 - disk.freeSpace / disk.capacity * 100).toFixed(1) + '%',
                                'used_space': formatBytes(disk.capacity - disk.freeSpace)
                            };
                        });
                    } else if (vm.guest.disk) {
                        var disk = res.data.guest.disk;
                        res.data.guest.disks = [{
                            'mount_point': disk.diskPath,
                            'free_percent': (disk.freeSpace / disk.capacity * 100).toFixed(1) + '%',
                            'free_space': formatBytes(disk.freeSpace),
                            'size': formatBytes(disk.capacity),
                            'used_percent': (100 - disk.freeSpace / disk.capacity * 100).toFixed(1) + '%',
                            'used_space': formatBytes(disk.capacity - disk.freeSpace)
                        }];
                    }

                    var vm_index = connectionsFactory.getConnectionByUuid(connection.uuid).vms.findIndex(function (item) {
                        return item.config.uuid === res.data.config.uuid;
                    });

                    connectionsFactory.getConnectionByUuid(connection.uuid).vms[vm_index] = res.data;
                    connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(connection.uuid));
                }).catch(function (e) {
                    throw e;
                });
            };

            /**
             * @description
             * Socket data
             *
             * @param data {Object}
             */
            var newData = function (data) {
                if (data.type === 'interface_bandwidth') {

                    connectionsFactory.getConnectionByUuid(data.uuid)['interfaces'][data.data.interface].data.push(data.data.total);
                } else if (data.type === 'interfaces') {
                    connectionsFactory.getConnectionByUuid(data.uuid)['interfaces'] = [];
                    angular.forEach(data.data, function (iface) {
                        connectionsFactory.getConnectionByUuid(data.uuid)['interfaces'][iface] = [];
                        connectionsFactory.getConnectionByUuid(data.uuid)['interfaces'][iface].data = [];
                    });
                } else {
                    connectionsFactory.getConnectionByUuid(data.uuid)[data.type] = data.data;
                }
            };

            /**
             * @description
             * Socket data
             *
             * @param data {Object}
             */
            var newProp = function (data) {
                connectionsFactory.getConnectionByUuid(data.uuid)[data.prop] = data.text;

                // CONN CLOSE
                if (data.prop === 'status' && data.text === 'CONN CLOSE') {
                    connectionsFactory.getConnectionByUuid(data.uuid).state = 'disconnected';

                    // CON ERROR
                } else if (data.prop === 'status' && data.text !== 'SSH CONNECTION ESTABLISHED' && data.text !== 'SNMP CONNECTION ESTABLISHED') {

                    // Error connecting
                    if (connectionsFactory.getConnectionByUuid(data.uuid).state === 'new') {
                        connectionsFactory.getConnectionByUuid(data.uuid).state = 'disconnected';
                    }
                    connectionsFactory.getConnectionByUuid(data.uuid).error = data.text;
                    toastr.error(data.text, 'Error (' + connectionsFactory.getConnectionByUuid(data.uuid).host + ')');

                    // CONN OK
                } else if (data.text === 'SSH CONNECTION ESTABLISHED' || data.text === 'SNMP CONNECTION ESTABLISHED') {
                    connectionsFactory.getConnectionByUuid(data.uuid).state = 'connected';
                    connectionsFactory.getConnectionByUuid(data.uuid).error = null;
                    $rootScope.$broadcast('smanager__connection_connected', data.uuid);
                    toastr.success(data.text, 'Connected (' + connectionsFactory.getConnectionByUuid(data.uuid).host + ')');
                }
            };

            return {
                getLinkByVMwareDatastore: getLinkByVMwareDatastore,
                setLinks: function (data) {
                    links = data;
                },
                getSnapshotFiles: getSnapshotFiles,
                setActiveConnection: function (uuid, parent_uuid) {
                    activeConnection = uuid;
                    if (parent_uuid) parentConnection = parent_uuid;
                    if (!parent_uuid) parentConnection = null;
                },
                activeConnection: function () {
                    return activeConnection;
                },
                parentConnection: function () {
                    return parentConnection;
                },
                formatBytes: formatBytes,
                getVMwareData: getVMwareData,
                getVMs: getVMs,
                getNetAppData: getNetAppData,
                getVolumeData: getVolumeData,
                getESXihosts: getESXihosts,
                powerOnVM: powerOnVM,
                powerOffVM: powerOffVM,
                suspendVM: suspendVM,
                resetVM: resetVM,
                shutdownGuest: shutdownGuest,
                rebootGuest: rebootGuest,
                refreshVM: refreshVM,
                newData: newData,
                newProp: newProp
            };

        }]);
}());

(function () {
  "use strict";
  smanagerApp.factory('smanagerFactory', ['$rootScope', '$q', '$document', 'socket', 'toastr', 'uuid', 'ServerFactory', '$filter', 'modalFactory', 'netappFactory', 'connectionsFactory', 'vmwareFactory',
    function ($rootScope, $q, $document, socket, toastr, uuid, ServerFactory, $filter, modalFactory, netappFactory, connectionsFactory, vmwareFactory) {

    /*
	   *
	   * PRIVATE FUNCTIONS
	   *
	   */
    var activeConnection = null;

    /*
     * @params
     * type {String} [vmware, netapp] New node type to check against
     * uuid {uuid} Main node uuid
     */
    var checkLinkBetweenManagedNodes = function (type, uuid) {

      var connection = connectionsFactory.getConnectionByUuid(uuid);
      var links = [];

      if (type === "vmware") {

        // Get all connection datastores
        angular.forEach(connection.datastores, function (datastore) {

          if (datastore.summary.type === "VMFS") return;

          // Check if any storage volume contains the datastore remotePath as a volume junction path
          angular.forEach(connectionsFactory.connections().storage, function (storage) {

            // Checking for NetApp storage
            if (storage.type === "NetApp") {

              // check if storage have any interface that match the datastore.remoteHost and datastore.type
              var foundInterface = $filter('filter')(storage.netifaces, {
                "address": datastore.info.nas.remoteHost,
                "data-protocols": {
                  "data-protocol": datastore.info.nas.type
                }
              })[0];

              // If not found any storage interface matching, return
              if (!foundInterface) return;

              // Search any Data Vservers with allowed protocol that match the datastore.type
              var foundVserver = $filter('filter')(storage.vservers, {
                "vserver-type": "data",
                "vserver-name": foundInterface.vserver,
                "allowed-protocols": {
                  "protocol": datastore.info.nas.type
                }
              })[0];

              if (!foundVserver) return;

              // Search for each Volume containing as a junction path the current datastore remotePath
              var foundVolume = $filter('filter')(foundVserver.volumes, {
                "volume-id-attributes": {
                  "junction-path": datastore.info.nas.remotePath
                }
              })[0];

              if (!foundVolume) return;

              // TODO: CHECK VOLUME EXPORTS that match ESXi host

              // Link found!
              links.push({
                virtual: uuid,
                esxi_datastore: datastore.obj.name,
                storage: storage.uuid,
                vserver: foundVserver,
                volume: foundVolume
              });

            }// end NetApp
          });// end storage
        });// end datastore
      }// end vmware

      if (type === "netapp") {

        // Get all vmware connections
        angular.forEach(connectionsFactory.connections().virtual, function (virtual) {

          if (virtual.type === "vCenter" || virtual.type === "ESXi") {

            // Get all vmware datastores
            angular.forEach(virtual.datastores, function (datastore) {

              if (datastore.summary.type === "VMFS") return;

              // check if connection have any interface that match the vmware datastore.remoteHost and datastore.type
              var foundInterface = $filter('filter')(connection.netifaces, {
                "address": datastore.info.nas.remoteHost,
                "data-protocols": {
                  "data-protocol": datastore.info.nas.type
                }
              })[0];

              // If not found any storage interface matching, return
              if (!foundInterface) return;

              var foundVserver = $filter('filter')(connection.vservers, {
                "vserver-type": "data",
                "vserver-name": foundInterface.vserver,
                "allowed-protocols": {
                  "protocol": datastore.info.nas.type
                }
              })[0];

              if (!foundVserver) return;

              // Search for each Volume containing as a junction path the current datastore remotePath
              var foundVolume = $filter('filter')(foundVserver.volumes, {
                "volume-id-attributes": {
                  "junction-path": datastore.info.nas.remotePath
                }
              })[0];

              if (!foundVolume) return;

              // Link found!
              links.push({
                virtual: virtual.uuid,
                esxi_datastore: datastore.obj.name,
                storage: uuid,
                vserver: foundVserver,
                volume: foundVolume
              });

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

    /*
     * Get all data from VMware vCenter node
     *
     * @params
     * connection {Object}
     */
    var getVMwareData = function (connection) {
      var dt_promises = [];
      var dc_promises = [];
      var ct_promises = [];
      var ht_promises = [];
      var svm_promises = [];
      var vm_promises = [];
      var uuidMap = connectionsFactory.getUuidMap();

      var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', 'Connecting to vCenter/ESXi...', '.window--smanager .window__main', 'plain');

      return modalInstance.opened.then(function () {

        // Get client version
        return vmwareFactory.getClientVersion(connection.host, connection.port);
      }).then(function (data) {
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

        // Login to vmware
        return ServerFactory.connectVcenter(connection.host, connection.credential);
      }).then(function (data) {
        if (data.data.status === "error") throw new Error(data.data.data);

        return vmwareFactory.connectvCenterSoap(connection.credential, connection.host, connection.port);
      }).then(function (res) {
        if (res.status === "error") throw new Error("Failed to connect to " + connectionsFactory.getConnectionByUuid(connection.uuid).type);

        modalFactory.changeModalText('Getting data...', '.window--smanager .window__main');

        // Get Datacenters
        return ServerFactory.callVcenter(connection.host, '/rest/vcenter/datacenter');

      }).then(function (data) {

        connectionsFactory.getConnectionByUuid(connection.uuid).datacenters = data.data.data.response.value;

        // For each Datacenter
        angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters, function (datacenter, key) {

          // Get Host not in Cluster (standalone)
          dt_promises.push(ServerFactory.callVcenter(connection.host, '/rest/vcenter/host?filter.datacenters=' + datacenter.datacenter + '&filter.standalone=true').then(function (data) {
            connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts = data.data.data.response.value;

            // For each Host
            angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts, function (host, i) {

              // Get resource pools per Host
              ht_promises.push(ServerFactory.callVcenter(connection.host, '/rest/vcenter/resource-pool?filter.hosts=' + host.host).then(function (data) {
                connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts[i].resource_pools = data.data.data.response.value;
              }));

              // Get VMs per Host
              ht_promises.push(ServerFactory.callVcenter(connection.host, '/rest/vcenter/vm?filter.hosts=' + host.host).then(function (data) {
                connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts[i].vms = data.data.data.response.value;

                // For each VM
                angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts[i].vms, function (vm, x) {

                  return vmwareFactory.getVMState(connection.credential, connection.host, connection.port, vm.vm).then(function (res) {
                    if (res.status === "error") throw new Error("Failed to get VM state from " + connectionsFactory.getConnectionByUuid(connection.uuid).type);

                    uuidMap.push({
                      uuid: res.data["summary.config"].uuid,
                      parent: connection.uuid,
                      object: "datacenters[" + key + "].hosts[" + i + "].vms[" + x + "]"
                    });

                    connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts[i].vms[x].uuid = res.data["summary.config"].uuid;
                    connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].hosts[i].vms[x].extended = res.data
                  });

                });

                return $q.all(svm_promises);
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
          dc_promises.push(ServerFactory.callVcenter(connection.host, '/rest/vcenter/cluster?filter.datacenters=' + datacenter.datacenter).then(function (data) {

            connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters = data.data.data.response.value;

            // For each Cluster
            angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters, function (cluster, c) {

              // Get resource pools per cluster
              ct_promises.push(ServerFactory.callVcenter(connection.host, '/rest/vcenter/resource-pool?filter.datacenters=' + datacenter.datacenter + '&filter.clusters=' + cluster.cluster).then(function (data) {
                connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters[c].resource_pools = data.data.data.response.value;
              }));

              // Get Host per Cluster
              ct_promises.push(ServerFactory.callVcenter(connection.host, '/rest/vcenter/host?filter.datacenters=' + datacenter.datacenter + '&filter.clusters=' + cluster.cluster).then(function (data) {
                connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters[c].hosts = data.data.data.response.value;
              }));

              // Get VMs per Cluster
              ct_promises.push(ServerFactory.callVcenter(connection.host, '/rest/vcenter/vm?filter.datacenters=' + datacenter.datacenter + '&filter.clusters=' + cluster.cluster).then(function (data) {
                connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters[c].vms = data.data.data.response.value;

                // For each VM
                angular.forEach(connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters[c].vms, function (vm, x) {

                  return vmwareFactory.getVMState(connection.credential, connection.host, connection.port, vm.vm).then(function (res) {
                    if (res.status === "error") throw new Error("Failed to get VM state from " + connectionsFactory.getConnectionByUuid(connection.uuid).type);

                    uuidMap.push({
                      uuid: res.data["summary.config"].uuid,
                      parent: connection.uuid,
                      object: "datacenters[" + key + "].clusters[" + c + "].vms[" + x + "]"
                    });

                    connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters[c].vms[x].uuid = res.data["summary.config"].uuid;
                    connectionsFactory.getConnectionByUuid(connection.uuid).datacenters[key].clusters[c].vms[x].extended = res.data
                  });

                });

                return $q.all(vm_promises);
              }));
            });

            return $q.all(ct_promises);
          }));
        });

        return $q.all(dc_promises);

      }).then(function () {

        return vmwareFactory.getDatastores(connection.credential, connection.host, connection.port).then(function (res) {
          if (res.status === "error") throw new Error("Failed to get Datastores from " + connectionsFactory.getConnectionByUuid(connection.uuid).type);

          connectionsFactory.getConnectionByUuid(connection.uuid).datastores = res.data;
        });

      }).then(function () {

        return ServerFactory.callVcenter(connection.host, '/rest/vcenter/folder');

      }).then(function (data) {

        connectionsFactory.getConnectionByUuid(connection.uuid).folders = data.data.data.response.value;

        // Check if any datastore is from a managed storage system and link it.
        return checkLinkBetweenManagedNodes('vmware', connection.uuid);
      }).then(function (data) {

        modalFactory.changeModalText('Saving connection to file', '.window--smanager .window__main');

        connectionsFactory.saveLinksMap(data);
        connectionsFactory.saveUuidMap(uuidMap);
        connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(connection.uuid));
        modalFactory.closeModal('.window--smanager .window__main');

      }).catch(function (e) {

        modalFactory.closeModal('.window--smanager .window__main');

        if (e.message === "ENOTFOUND") {
          return toastr.error("Host not found (" + connection.host + ")", 'Error trying to connect to ' + connectionsFactory.getConnectionByUuid(connection.uuid).type);
        }

        if (e.message === "ETIMEDOUT") {
          return toastr.error("Timeout while connecting to " + connection.host, 'Error trying to connect to ' + connectionsFactory.getConnectionByUuid(connection.uuid).type);
        }

        if (e.message === "Unauthorized") {
          return toastr.error("Invalid credentials (" + connection.host + ")", 'Error trying to connect to ' + connectionsFactory.getConnectionByUuid(connection.uuid).type);
        }

        toastr.error(e.message, 'Error getting data from ' + connectionsFactory.getConnectionByUuid(connection.uuid).type);
        console.log(e);
      });

    };

    /*
	   * Get all data from NetApp node
	   *
	   * @params
	   * connection {Object}
	   */
    var getNetAppData = function (connection) {
      var main_promises = [];
      var vs_promises = [];
      var sh_promises = [];
      var uuidMap = connectionsFactory.getUuidMap();

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
        if (res.status === "error") throw new Error("Failed to get NetApp System Version");

        //TODO: check if version is compatible

        angular.extend(connectionsFactory.getConnectionByUuid(connection.uuid), {
          hostname: connection.host,
          buildtimestamp: res.build_timestamp,
          isclustered: res.is_clustered,
          version: res.version,
          versiontuple: res.version_tuple,
          type: "NetApp"
        });

        modalFactory.changeModalText('Getting data...', '.window--smanager .window__main');

        // Get interfaces
        // Get cluster data
        // Get vServers
        main_promises.push(netappFactory.getNetInterfaces(connection.credential, connection.host, connection.port));
        main_promises.push(netappFactory.getFcpInterfaces(connection.credential, connection.host, connection.port));
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

        // Set cluster data
        connectionsFactory.getConnectionByUuid(connection.uuid).metrocluster = res[2].data;
        connectionsFactory.getConnectionByUuid(connection.uuid).cluster = res[3].data;
        connectionsFactory.getConnectionByUuid(connection.uuid).licenses = res[4].data;
        connectionsFactory.getConnectionByUuid(connection.uuid).ontapi_version = res[5].data;

        // Set vServers
        connectionsFactory.getConnectionByUuid(connection.uuid).vservers = res[6].data;

        // Set new uuid to match internal node uuid
        uuidMap[uuidMap.findIndex(function (el) { return el.uuid === connection.uuid })].uuid = res[3].data.cluster_uuid;
        connectionsFactory.getConnectionByUuid(connection.uuid).uuid = res[3].data.cluster_uuid;
        connection.uuid = res[3].data.cluster_uuid;

        angular.forEach(res[6].data, function (vserver, key) {

          uuidMap.push({
            uuid: vserver.uuid,
            parent: connection.uuid,
            object: "vservers[" + key + "]"
          });

          if (vserver["vserver-type"] === "admin") {
            connectionsFactory.getConnectionByUuid(connection.uuid).name = vserver["vserver-name"];
          }

          // GET Volumes per vServer
          if (vserver["vserver-type"] === "data") {

            // Get qtrees
            vs_promises.push(netappFactory.getQtrees(connection.credential, connection.host, connection.port, vserver["vserver-name"]).then(function (qtrees) {
              if (qtrees.status === "error") throw new Error("Failed to get qtrees");

              connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].qtrees = qtrees.data;
            }));

            vs_promises.push(netappFactory.getVolumes(connection.credential, connection.host, connection.port, vserver["vserver-name"]).then(function (volumes) {
              if (volumes.status === "error") throw new Error("Failed to get volumes");

              connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].volumes = volumes.data;

              // For each Volume
              angular.forEach(volumes.data, function (volume, v) {

                uuidMap.push({
                  uuid: volume["volume-id-attributes"].uuid,
                  parent: vserver["uuid"],
                  object: "volumes[" + v + "]"
                });

                // Get all LUNS
                sh_promises.push(netappFactory.getLuns(connection.credential, connection.host, connection.port, vserver["vserver-name"], volume["volume-id-attributes"].name).then(function (luns) {
                  if (luns.status === "error") throw new Error("Failed to get LUNs");

                  connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].volumes[v].luns = luns.data;
                }));

                // Get all Snapshots
                sh_promises.push(netappFactory.getSnapshots(connection.credential, connection.host, connection.port, vserver["vserver-name"], volume["volume-id-attributes"].name).then(function (snapshots) {
                  if (snapshots.status === "error") throw new Error("Failed to get snapshots");

                  connectionsFactory.getConnectionByUuid(connection.uuid).vservers[key].volumes[v].snapshots = snapshots.data;

                  // For each snapshot
                  angular.forEach(snapshots.data, function (snapshot, s) {

                    uuidMap.push({
                      uuid: snapshot["snapshot-instance-uuid"],
                      parent: volume["volume-id-attributes"].uuid,
                      object: "snapshots[" + s + "]"
                    });

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
        connectionsFactory.saveUuidMap(uuidMap);
        modalFactory.closeModal('.window--smanager .window__main');

      }).catch(function (e) {
        if (e.message === "ENOTFOUND") {
          modalFactory.closeModal('.window--smanager .window__main');
          return toastr.error("Host not found (" + connection.host + ")", 'Error trying to connect to NetApp');
        }

        if (e.message === "ETIMEDOUT") {
          modalFactory.closeModal('.window--smanager .window__main');
          return toastr.error("Timeout while connecting to " + connection.host, 'Error trying to connect to NetApp');
        }

        modalFactory.closeModal('.window--smanager .window__main');
        toastr.error(e.message, 'Error getting data from NetApp');
        console.log(e);

      });
    };

    var getVolumeData = function (data) {
	    var uuidMap = connectionsFactory.getUuidMap();
	    var vserver_index = connectionsFactory.getConnectionByUuid(data.uuid).vservers.findIndex(function(item){ return item['vserver-name'] === data.vserver_name});
	    var volume_index = connectionsFactory.getConnectionByUuid(data.uuid).vservers[vserver_index].volumes.findIndex(function(item){ return item['volume-id-attributes'].name === data.volume_name});

	    var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', 'Getting NetApp Volume data...', '.window--smanager .window__main', 'plain');
	    return modalInstance.opened.then(function () {
		    return netappFactory.getSnapshots(data.credential, data.host, data.port, data.vserver_name, data.volume_name).then(function (snapshots) {
			    if (snapshots.status === "error") throw new Error("Failed to get snapshots");

			    //TODO: angular.merge?
			    connectionsFactory.getConnectionByUuid(data.uuid).vservers[vserver_index].volumes[volume_index].snapshots = snapshots.data;

			    // For each snapshot
			    angular.forEach(snapshots.data, function (snapshot, s) {

				    uuidMap.push({
					    uuid: snapshot["snapshot-instance-uuid"],
					    parent: data.volume_uuid,
					    object: "snapshots[" + s + "]"
				    });

			    });
		    }).then(function () {
			    modalFactory.changeModalText('Saving connection to file', '.window--smanager .window__main');

			    connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(data.uuid));
			    connectionsFactory.saveUuidMap(uuidMap);
			    modalFactory.closeModal('.window--smanager .window__main');
            })
	    });
    };

    /*
     * Fetch NetApp SnapShots
     */
    var getSnapshotFiles = function (uuid, host, vserver, volume, snapshot) {
      var vserver_index = connectionsFactory.getConnectionByUuid(uuid).vservers.findIndex(function(item){ return item['vserver-name'] === vserver});
      var volume_index = connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes.findIndex(function(item){ return item['volume-id-attributes'].name === volume});
      var snapshot_index = connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots.findIndex(function(item){ return item.name === snapshot});

      // Already fetched files from storage, don't ask for it again
      if (angular.isDefined(connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots[snapshot_index].files)) return;
      connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots[snapshot_index].vms = [];

      var modalInstance = modalFactory.openLittleModal('PLEASE WAIT', 'Getting Snapshot data...', '.window--smanager .window__main', 'plain');

      return modalInstance.opened.then(function () {

        return netappFactory.getSnapshotFiles(connectionsFactory.getConnectionByUuid(uuid).credential, host, connectionsFactory.getConnectionByUuid(uuid).port, vserver, volume, snapshot);
      }).then(function (files) {
        if (files.status === "error") throw new Error("Failed to get Snapshot files");

        connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots[snapshot_index].files = files.data;

        // Check every file
        angular.forEach(files.data, function (file) {

          // VM found
          if (!file.hasOwnProperty("name")) {
            console.log(file);
            return;
          }
          if (file.name.substr(file.name.length - 4) === ".vmx") {
            connectionsFactory.getConnectionByUuid(uuid).vservers[vserver_index].volumes[volume_index].snapshots[snapshot_index].vms.push({
              name: file.name.slice(0, -4),
              path: file.path + '/' + file.name
            });
          }

        });

        modalFactory.changeModalText('Saving connection to file', '.window--smanager .window__main');

        connectionsFactory.saveConnection(connectionsFactory.getConnectionByUuid(uuid));

        modalFactory.closeModal('.window--smanager .window__main');

      }).catch(function (e) {
        if (e.message === "ENOTFOUND") {
          modalFactory.closeModal('.window--smanager .window__main');
          return toastr.error("Host not found (" + connection.host + ")", 'Error trying to connect to NetApp');
        }

        if (e.message === "ETIMEDOUT") {
          modalFactory.closeModal('.window--smanager .window__main');
          return toastr.error("Timeout while connecting to " + connection.host, 'Error trying to connect to NetApp');
        }

        modalFactory.closeModal('.window--smanager .window__main');
        toastr.error(e.message, 'Error getting snapshots data from NetApp');
        console.log(e);

      });
    };

    /*
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

    var newData = function (data) {
      if (data.type === "interface_bandwidth") {

        connectionsFactory.getConnectionByUuid(data.uuid)["interfaces"][data.data.interface].data.push(data.data.total);
      } else if (data.type === "interfaces") {
        connectionsFactory.getConnectionByUuid(data.uuid)["interfaces"] = [];
        angular.forEach(data.data, function (iface) {
          connectionsFactory.getConnectionByUuid(data.uuid)["interfaces"][iface] = [];
          connectionsFactory.getConnectionByUuid(data.uuid)["interfaces"][iface].data = [];
        });
      } else {
        connectionsFactory.getConnectionByUuid(data.uuid)[data.type] = data.data;
      }
    };

    var newProp = function (data) {
      connectionsFactory.getConnectionByUuid(data.uuid)[data.prop] = data.text;

      // CONN CLOSE
      if (data.prop === "status" && data.text === "CONN CLOSE") {
        connectionsFactory.getConnectionByUuid(data.uuid).type = "disconnected";

        // CON ERROR
      } else if (data.prop === "status" && data.text !== "SSH CONNECTION ESTABLISHED" && data.text !== "SNMP CONNECTION ESTABLISHED") {

        // Error connecting
        if (connectionsFactory.getConnectionByUuid(data.uuid).type === "new") {
          connectionsFactory.getConnectionByUuid(data.uuid).type = "disconnected";
        }
        connectionsFactory.getConnectionByUuid(data.uuid).error = data.text;
        toastr.error(data.text, 'Error (' + connectionsFactory.getConnectionByUuid(data.uuid).host + ')');

        // CONN OK
      } else if (data.text === "SSH CONNECTION ESTABLISHED" || data.text === "SNMP CONNECTION ESTABLISHED") {
        connectionsFactory.getConnectionByUuid(data.uuid).type = "connected";
        connectionsFactory.getConnectionByUuid(data.uuid).error = null;
        $rootScope.$broadcast('smanager__connection_connected', data.uuid);
        toastr.success(data.text, 'Connected (' + connectionsFactory.getConnectionByUuid(data.uuid).host + ')');
      }
    };

    return {
      getSnapshotFiles: getSnapshotFiles,
      setActiveConnection: function (uuid) {
        activeConnection = uuid;
      },
      activeConnection: function () {
        return activeConnection;
      },
      getVMwareData: getVMwareData,
      getNetAppData: getNetAppData,
      getVolumeData: getVolumeData,
      getESXihosts: getESXihosts,
      newData: newData,
      newProp: newProp
    };

  }]);
}());

var backupsmApp = angular.module('backupsmApp', []);

(function () {
    'use strict';
    backupsmApp.run(['ApplicationsFactory', 'ServerFactory', 'backupsmFactory', 'modalFactory', function (ApplicationsFactory, ServerFactory, backupsmFactory, modalFactory) {

        ApplicationsFactory.registerApplication({
            id: 'backupsm',
            ico: 'hdd-o',
            name: 'Backups Manager',
            menu: true,
            actions: true,
            style: 'width:1070px;height:700px;top:5%;left:20%;'
        });

	    // Get backups
	    ServerFactory
	    .getConfigFile('applications/backupsm/backups.json', function (data) {
		    return backupsmFactory.setBackups(data.data);
	    }, function () {
		    console.log('Error');
	    });

        // Get restores
        ServerFactory
        .getConfigFile('applications/backupsm/restores.json', function (data) {
            return backupsmFactory.setRestores(data.data);
        }, function () {
            console.log('Error');
        });

        /*
         * Register modals
         */
	    modalFactory.registerModal({
		    modalId: 'backupWizard',
		    templateUrl: 'applications/backupsm/modals/backupWizard.html',
		    size: 'lg',
		    controllerAs: 'bwmC',
		    controller: ['$scope', 'title', 'backupObject', '$uibModalInstance', '$filter', 'connectionsFactory', 'smanagerFactory', 'ApplicationsFactory', 'cmanagerFactory',
			    function ($scope, title, backupObject, $uibModalInstance, $filter, connectionsFactory, smanagerFactory, ApplicationsFactory, cmanagerFactory) {
			    var _this = this;
			    this.step = 1;
			    this.title = title;
			    this.selectedCount = 0;
			    this.restorePoints = 14;
			    this.quiesceTools = true;

			    // Set default backup job name
			    if (backupObject) {
			    	this.backupName = backupObject.name;
			    }

			    // Get all virtual connections
			    var connections = connectionsFactory.getConnectionByCategory('virtual');

			    /*
			     * Select child nodes if needed
			     */
			    var selectChildren = function (children,val) {

				    //set as selected
				    children.isSelected = val;
				    if(children.items) {
					    //recursve to set all children as selected
					    children.items.forEach(function(el) {
						    selectChildren(el,val);
					    })
				    }
			    };

			    /*
			     * Get all selected nodes
			     */
			    var getSelected = function (node, arr) {
				    //if this node is selected add to array
				    if (node.isSelected) {
					    arr.push(node);
					    return arr;
				    }

				    if (node.items) {
					    //if the node has children call getSelected for each and concat to array
					    node.items.forEach(function (childNode) {
						    arr = arr.concat(getSelected(childNode, []))
					    })
				    }
				    return arr;
			    };

			    /*
			     * Close this modal
			     */
			    this.close = function () {
				    $uibModalInstance.close();
			    };

			    /*
			     * Returned data when this modal is closed
			     */
			    this.selectData = function () {
			    	if (!_this.backupName || _this.backupName == null) return _this.step = 1;
				    if (!_this.selectedObjects || _this.selectedObjects == null) return _this.step = 2;
				    if (!_this.selectedPrimaryStorage || _this.selectedPrimaryStorage == null) return _this.step = 3;

				    $uibModalInstance.close({
					    backupName: _this.backupName,
					    selectedObjects: _this.selectedObjects,
					    selectedPrimaryStorage: _this.selectedPrimaryStorage,
					    restorePoints: _this.restorePoints,
					    secondaryTarget: _this.secondaryTarget,
					    selectedSecondaryTarget: _this.selectedSecondaryTarget,
					    quiesceTools: _this.quiesceTools,
					    backupNow: _this.backupNow
				    });
			    };

			    /*
			     * Whats credentials for Pre & Post scripts credentials
			     */
			    $scope.$watch(function () {
				    return cmanagerFactory.credentials();
			    }, function (newValue) {
				    _this.credentials = newValue;
			    });

			    /**
			     * HierarchyList
			     */
			    this.expandNode = function (n, $event) {
				    $event.stopPropagation();
				    n.toggle();
			    };

			    this.itemSelect = function (item) {
				    var rootVal = !item.isSelected;
				    selectChildren(item, rootVal);

				    _this.selectedObjects = getSelected(_this.list[0], []);
				    _this.selectedCount = _this.selectedObjects.length;
			    };

			    this.getParentName = function (uuid) {
					    return connectionsFactory.getConnectionByUuid(uuid).hostname;
				    };

			    var prepareHierarchyList = function (connections) {

				    _this.list = [{
					    id: 0,
					    title: "Virtual",
					    type: "virtual",
					    items: []
				    }];

				    // Prepare tree list
				    angular.forEach(connections, function (connection, co) {
					    _this.list[0].items[co] = {
						    id: connection.uuid,
						    title: connection.hostname,
						    type: "vCenter",
						    items: []
					    };

					    angular.forEach(connection.datastores, function (datastore, dat) {
						    _this.list[0].items[co].items[dat] = {
							    id: datastore.obj.name,
							    parent: connection.uuid,
							    title: datastore.name,
							    items: [], // Required for one time binding of ng-if to not be equal to "undefined"
							    type: "Datastore"
						    };

					    });

					    angular.forEach(connection.datacenters, function (datacenter, da) {
						    _this.list[0].items[co].items[da + connection.datastores.length] = {
							    id: datacenter.datacenter,
							    parent: connection.uuid,
							    title: datacenter.name,
							    items: [],
							    type: "Datacenter"
						    };

						    // Get clusters
						    angular.forEach(datacenter.clusters, function (cluster, cl) {
						    	console.log(cluster);
							    _this.list[0].items[co].items[da + connection.datastores.length].items[cl] = {
								    id: cluster.cluster,
								    parent: connection.uuid,
								    title: cluster.name,
								    items: [],
								    type: "Cluster"
							    };

							    var hosts = [];

							    angular.forEach(cluster.hosts, function (host, ho) {
							    	hosts.push(host.host);
								    _this.list[0].items[co].items[da + connection.datastores.length].items[cl].items[ho] = {
									    id: host.host,
									    object: host,
									    parent: connection.uuid,
									    title: host.name,
									    items: [], // Required for one time binding of ng-if to not be equal to "undefined"
									    type: "Host"
								    };
							    });

							    var vmsPerCluster = $filter('filter')(connection.vms, function (vm) {
								    return hosts.indexOf(vm.runtime.host.name) >= 0;
							    });

							    // Get cluster VMs
							    angular.forEach(vmsPerCluster, function (vm, v) {
								    _this.list[0].items[co].items[da + connection.datastores.length].items[cl].items[v + cluster.hosts.length] = {
									    id: vm.vm,
									    object: vm,
									    parent: connection.uuid,
									    title: vm.config.name,
									    items: [], // Required for one time binding of ng-if to not be equal to "undefined"
									    type: "VirtualMachine"
								    };

								    if (backupObject && backupObject.vm === vm.vm) {
									    _this.itemSelect(_this.list[0].items[co].items[da + connection.datastores.length].items[cl].items[v + cluster.hosts.length]);
								    }

							    });
						    });

						    // Get standalone hosts
						    angular.forEach(datacenter.hosts, function (host, ho) {
							    _this.list[0].items[co].items[da + connection.datastores.length].items[ho + datacenter.clusters.length] = {
								    id: host.host,
								    object: host,
								    parent: connection.uuid,
								    title: host.name,
								    items: [],
								    type: "Host"
							    };

							    var vmsPerHost = $filter('filter')(connection.vms, {
								    runtime: {
									    host: {
										    name: host.host
									    }
								    }
							    });

							    angular.forEach(vmsPerHost, function (vm, v) {
								    _this.list[0].items[co].items[da + connection.datastores.length].items[ho + datacenter.clusters.length].items[v] = {
									    id: vm.vm,
									    object: vm,
									    parent: connection.uuid,
									    title: vm.config.name,
									    items: [], // Required for one time binding of ng-if to not be equal to "undefined"
									    type: "VirtualMachine"
								    };

								    if (backupObject && backupObject.vm === vm.vm) {
									    _this.itemSelect(_this.list[0].items[co].items[da + connection.datastores.length].items[ho + datacenter.clusters.length].items[v]);
								    }
							    });
						    });
					    });
				    });

			    };

			    prepareHierarchyList(connections);

			    /*
			     * Check if VM is inside a Snapshot supported Storage
			     */
			    this.getLinkByVMwareDatastore = function (item) {
				    var link;
				    var allDatastores = true;

				    // Is a Host
				    if (item.type === "Host") return false;

				    // Is a Datastore
				    if (item.type === "Datastore") {
					    link = smanagerFactory.getLinkByVMwareDatastore(item.parent, item.id);
					    if (link) return true;
					    return false;
				    }

				    // Is a VirtualMachine
			    	if (item.type === "VirtualMachine") {

					    if (Array.isArray(item.object.datastore.ManagedObjectReference)) {
						    // Check each datastore in array
						    angular.forEach(item.object.datastore.ManagedObjectReference, function (datastore) {
							    link = smanagerFactory.getLinkByVMwareDatastore(item.parent, datastore.name);
							    if (!link) allDatastores = false;
						    });

						    return allDatastores;
					    } else {
						    // All VM files are stored in same Datastore
						    link = smanagerFactory.getLinkByVMwareDatastore(item.parent, item.object.datastore.ManagedObjectReference.name);
						    if (link) return true;
					    }
					    return false;
				    }

				    // All other types
				    return true;

			    };

			    /*
			     * Open CredentialsManager if required
			     */
			    this.manageCredentials = function () {
				    ApplicationsFactory.openApplication('cmanager');
				    ApplicationsFactory.toggleApplication('cmanager');
			    };

		    }]
	    });

        modalFactory.registerModal({
            modalId: 'ESXiSelectable',
            templateUrl: 'applications/backupsm/modals/ESXiSelectable.html',
            size: 'sm',
            controllerAs: 'esmC',
            controller: ['title', 'ESXihosts', '$uibModalInstance', function (title, ESXihosts, $uibModalInstance) {
                var _this = this;
                this.title = title;
                this.ESXihosts = ESXihosts;

	            this.close = function () {
		            $uibModalInstance.close();
	            };

                this.selectESXihost = function () {
	                if (!_this.selectedHost || _this.selectedHost == null) return;
                    $uibModalInstance.close(_this.selectedHost);
                };
            }]
        });

        modalFactory.registerModal({
            modalId: 'recoveryWizard',
            templateUrl: 'applications/backupsm/modals/recoveryWizard.html',
            size: 'lg',
            controllerAs: 'wmC',
            controller: ['title', 'data', '$uibModalInstance', 'ServerFactory', '$filter', function (title, data, $uibModalInstance, ServerFactory, $filter) {
                var _this = this;
                this.title = title;
                this.step = 1;
                this.data = data;

                this.vmName = data.vm.name + '-restore';
                this.powerVM = false;

	            this.close = function () {
		            $uibModalInstance.close();
	            };

                this.getSnapshotName = function () {
                    return $filter('filter')(data.snapshots, {
                        'snapshot-instance-uuid': data.snapshot
                    })[0].name;
                };

                this.selectData = function () {
	                if ((!_this.selectedHost || _this.selectedHost == null) && _this.restoreType === 'new') return _this.step = 3;
	                if ((!_this.selectedFolder || _this.selectedFolder == null) && _this.restoreType === 'new') return _this.step = 3;
	                if ((!_this.selectedPool || _this.selectedPool == null) && _this.selectedPool === 'new') return _this.step = 3;

                    $uibModalInstance.close({
                        host: _this.selectedHost,
                        folder: _this.selectedFolder,
                        resource_pool: _this.selectedPool,
                        vm_name: _this.vmName,
                        vm_power_on: _this.powerVM,
                        restore_location: _this.restoreType
                    });
                };

                /*
                 * Load Folders and Resource Pools
                 */
                this.loadESXidata = function () {
                    var modalInstanceText = modalFactory.openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-recovery-wizard', 'plain');

                    return ServerFactory.connectVcenter(_this.selectedHost.connection_address, _this.selectedHost.connection_credential, _this.selectedHost.connection_port).then(function (con) {
                        if (con.data.status === 'error') throw new Error(con.data.data);

                        modalFactory.changeModalText('Getting data...', '.modal-recovery-wizard');

                        // Get VM folders in selected vCenter
                        return ServerFactory.callVcenter(_this.selectedHost.connection_address, _this.selectedHost.connection_port, '/rest/vcenter/folder?filter.type=VIRTUAL_MACHINE').then(function (data_folder) {
                            if (data_folder.data.status === 'error') throw new Error(data_folder.data.data);
                            _this.data.folders = data_folder.data.data.response.value;

                            // Get Resource Pools from selected host
                            return ServerFactory.callVcenter(_this.selectedHost.connection_address, _this.selectedHost.connection_port, '/rest/vcenter/resource-pool').then(function (resource_pool) {
                                if (resource_pool.data.status === 'error') throw new Error(resource_pool.data.data);

                                _this.data.resource_pools = resource_pool.data.data.response.value;

                                modalInstanceText.close();
                            });
                        });
                    });
                };

            }]
        });

    }]);
}());
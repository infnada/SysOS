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

        // Get restores
        ServerFactory
        .getConfigFile('applications/backupsm/restores.json', function (data) {
            return backupsmFactory.setRestores(data.data);
        }, function (data) {
            console.log('Error');
        });

        /*
         * Register modals
         */
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

                this.vmName = data.vm.name;
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
                    if ((!_this.selectedHost || !_this.selectedFolder || !_this.selectedPool) && _this.restoreType === 'new') return _this.step = 3;

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

                    return ServerFactory.connectVcenter(_this.selectedHost.connection_address, _this.selectedHost.connection_credential).then(function (con) {
                        if (con.data.status === 'error') throw new Error(con.data.data);

                        modalFactory.changeModalText('Getting data...', '.modal-recovery-wizard');

                        // Get VM folders in selected vCenter
                        return ServerFactory.callVcenter(_this.selectedHost.connection_address, '/rest/vcenter/folder?filter.type=VIRTUAL_MACHINE').then(function (data_folder) {
                            if (data_folder.data.status === 'error') throw new Error(data_folder.data.data);
                            _this.data.folders = data_folder.data.data.response.value;

                            // Get Resource Pools from selected host
                            return ServerFactory.callVcenter(_this.selectedHost.connection_address, '/rest/vcenter/resource-pool').then(function (resource_pool) {
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
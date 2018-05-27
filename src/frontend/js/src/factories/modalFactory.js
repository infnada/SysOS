/*
 * Connect to socket.io and return socket object
 */

(function () {
  "use strict";
  myApp.factory('modalFactory', ['$uibModal', '$document', function ($uibModal, $document) {
    var modalInstances = [];

    /*
     * Opens a Modal and append it.
     */
    var openLittleModal = function (tittle, text, query, type, button_text, inputValue) {

      var appendTo = angular.element($document[0].querySelector(query));
      var templateUrl = (type === "plain" ?
        "templates/utils/modal.html" : (type === "ESXiSelectable" ?
          "templates/utils/ESXiSelectable.html" : (type === "question" ?
            "templates/utils/question.html" : type === "DatastoreSelectable" ?
              "templates/utils/DatastoreSelectable.html" : (type === "input" ?
                "templates/utils/input.html" : ''
              )
            )
          )
        );

      if (appendTo.length) {
        modalInstances[query] = $uibModal.open({
          templateUrl: templateUrl,
          controller: ['$scope', 'title', 'text', 'button_text', 'inputValue', '$uibModalInstance', 'connectionsFactory', function ($scope, title, text, button_text, inputValue, $uibModalInstance, connectionsFactory) {
            $scope.title = title;
            $scope.text = text;
            $scope.button_text = button_text;
            $scope.inputValue = inputValue;

            $scope.selectESXihost = function () {
              $uibModalInstance.close($scope.selectedHost);
            };

            $scope.selectDatastore = function () {
                $uibModalInstance.close($scope.selectedDatastore);
            };

            $scope.yes_input = function () {
                $uibModalInstance.close($scope.inputValue);
            };

            $scope.yes = function () {
              $uibModalInstance.close(true);
            };

            $scope.no = function () {
              $uibModalInstance.close(false);
            };

            // Get all Datastores from managed ESXi/vCenter hosts
            if (type === "DatastoreSelectable") {
              var connections = connectionsFactory.getConnectionByCategory('virtual');

              $scope.text = [];

              angular.forEach(connections, function (connection) {
	              angular.forEach(connection.datastores, function (datastore) {
		              $scope.text.push({
                          name: datastore.name,
                          id: datastore.obj.name,
                          credential: connection.credential,
                          host: connection.host,
                          port: connection.port,
                          datacenter: connection.datacenters[0].datacenter // TODO: check datacenter per datastore (not always will be the 1st [0] datacenter)
                      });
                  });
              });
            }

          }],
          backdropClass: 'absolute',
          windowClass: 'absolute',
          size: 'sm',
          appendTo: appendTo,
          resolve: {
            title: function () {
              return tittle;
            },
            text: function () {
              return text;
            },
            button_text: function () {
		          return button_text;
            },
            inputValue: function () {
              return inputValue;
            }
          }
        });

        return modalInstances[query];

      }

    };

    /*
     * Opens a Modal and append it.
     */
    var openWizardModal = function (tittle, data, query, type) {

      var appendTo = angular.element($document[0].querySelector(query));
      var templateUrl = (type === "recoveryWizard" ? "templates/utils/recoveryWizard.html" : '');

      if (appendTo.length) {
        modalInstances[query] = $uibModal.open({
          templateUrl: templateUrl,
          controllerAs: 'wmC',
          controller: ['title', 'data', '$uibModalInstance', 'ServerFactory', '$filter', function (title, data, $uibModalInstance, ServerFactory, $filter) {

            var _this = this;
            this.title = title;
            this.step = 1;
            this.data = data;

            this.vmName = data.vm.name;
            this.powerVM = false;

            this.getSnapshotName = function () {
	            return $filter('filter')(data.snapshots, {
		            "snapshot-instance-uuid": data.snapshot
	            })[0].name;
            };

            this.selectData = function () {
              if ((!_this.selectedHost || !_this.selectedFolder || !_this.selectedPool) && _this.restoreType === "new") return _this.step = 3;

              $uibModalInstance.close({
                host: _this.selectedHost,
                folder: _this.selectedFolder,
                resource_pool: _this.selectedPool,
                vm_name: _this.vmName,
                vm_power_on: _this.powerVM,
                restore_location: _this.restoreType,
              });
            };

            /*
             * Load Folders and Resource Pools
             */
            this.loadESXidata = function () {
              var modalInstanceText = openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-recovery-wizard', 'plain');

              return ServerFactory.connectVcenter(_this.selectedHost.connection_address, _this.selectedHost.connection_credential).then(function (con) {
                if (con.data.status === "error") throw new Error(con.data.data);

                changeModalText('Getting data...', '.modal-recovery-wizard');

                // Get VM folders in selected vCenter
                return ServerFactory.callVcenter(_this.selectedHost.connection_address, '/rest/vcenter/folder?filter.type=VIRTUAL_MACHINE').then(function(data_folder) {
                  if (data_folder.data.status === "error") throw new Error(data_folder.data.data);
                  _this.data.folders = data_folder.data.data.response.value;

                  // Get Resource Pools from selected host
                  return ServerFactory.callVcenter(_this.selectedHost.connection_address, '/rest/vcenter/resource-pool').then(function(resource_pool) {
                    if (resource_pool.data.status === "error") throw new Error(resource_pool.data.data);

                    _this.data.resource_pools = resource_pool.data.data.response.value;

                    modalInstanceText.close();
                  });
                });
              });
            };

          }],
          backdropClass: 'absolute',
          windowClass: 'absolute',
          appendTo: appendTo,
          resolve: {
            title: function () {
              return tittle;
            },
            data: function () {
              return data;
            }
          }
        });

        return modalInstances[query];

      }

    };

    /*
     * Change text of already created modal
     */
    var changeModalText = function (text, query) {

      var appendTo = angular.element($document[0].querySelector(query));

      if (appendTo.length) angular.element($document[0].querySelector(query + ' .modal')).scope().text = text;

    };

    /*
     * Close already created modal
     */
    var closeModal = function (query) {
      if (modalInstances[query]) modalInstances[query].close('ok');
    };

    return {
      openLittleModal: openLittleModal,
      openWizardModal: openWizardModal,
      changeModalText: changeModalText,
      closeModal: closeModal
    };

  }]);

}());

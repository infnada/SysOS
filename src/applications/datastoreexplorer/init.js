var datastoreexplorerApp = angular.module('datastoreexplorerApp', []);

(function () {
    'use strict';
    datastoreexplorerApp.run(['ApplicationsFactory', 'modalFactory', function (ApplicationsFactory, modalFactory) {

        ApplicationsFactory.registerApplication({
            id: 'datastoreexplorer',
            ico: 'database',
            name: 'Datastore Explorer',
            menu: true,
            actions: false,
            status: false,
            style: 'width:770px;height:600px;top:5%;left:15%;'
        });

        modalFactory.registerModal({
            modalId: 'DatastoreSelectable',
            templateUrl: 'applications/datastoreexplorer/modals/DatastoreSelectable.html',
            size: 'sm',
            controllerAs: 'dsmC',
            controller: ['title', 'connectionsFactory', '$uibModalInstance', function (title, connectionsFactory, $uibModalInstance) {
                var _this = this;
                var connections = connectionsFactory.getConnectionByCategory('virtual');
                this.title = title;
                this.datastores = [];

                this.selectDatastore = function () {
                    $uibModalInstance.close(_this.selectedDatastore);
                };

                angular.forEach(connections, function (connection) {
                    angular.forEach(connection.datastores, function (datastore) {
                        _this.datastores.push({
                            name: datastore.name,
                            id: datastore.obj.name,
                            credential: connection.credential,
                            host: connection.host,
                            port: connection.port,
                            datacenter: connection.datacenters[0].datacenter // TODO: check datacenter per datastore
                                                                             // (not always will be the 1st [0]
                                                                             // datacenter)
                        });
                    });
                });
            }]
        });

    }]);
}());

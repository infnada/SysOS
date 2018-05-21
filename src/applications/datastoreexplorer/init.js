var datastoreexplorerApp = angular.module('datastoreexplorerApp', []);

(function () {
	"use strict";
	datastoreexplorerApp.run(['ApplicationsFactory', function(ApplicationsFactory) {

		ApplicationsFactory.registerApplication({
			id: "datastoreexplorer",
			ico: "database",
			name: "Datastore Explorer",
			menu: true,
			actions: false,
			status: false,
			style: "width:770px;height:600px;top:5%;left:15%;"
		});

	}]);
}());

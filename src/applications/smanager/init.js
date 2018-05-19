var smanagerApp = angular.module('smanagerApp', []);

(function () {
	"use strict";
	smanagerApp.run(['ApplicationsFactory', 'ServerFactory', 'connectionsFactory', function (ApplicationsFactory, ServerFactory, connectionsFactory) {

		ApplicationsFactory.registerApplication({
			id: "smanager",
			ico: "server",
			name: "Server Manager",
			menu: true,
			actions: true,
			status: true,
			style: "width:1700px;height:750px;top:8%;left:7%;"
		});

		// Get servers infrastructure
		ServerFactory
		.getConfigFile('applications/smanager/config.json', function (data) {
			return connectionsFactory.setSavedConnections(data.data);
		}, function (data) {
			console.log("Error");
		});

		// Get servers mapping
		ServerFactory
		.getConfigFile('applications/smanager/map.json', function (data) {
			return connectionsFactory.setUuidMap(data.data);
		}, function (data) {
			console.log("Error");
		});

	}]);
}());

var cmanagerApp = angular.module('cmanagerApp', []);

(function () {
	"use strict";
	cmanagerApp.run(['ApplicationsFactory', 'ServerFactory', 'cmanagerFactory', function(ApplicationsFactory, ServerFactory, cmanagerFactory) {

		ApplicationsFactory.registerApplication({
			id: "cmanager",
			ico: "key",
			name: "Credentials Manager",
			menu: true,
			actions: true,
			status: true,
			style: "width:870px;height:600px;top:7%;left:10%;"
		});

		// Get all credentials
		ServerFactory
		.applicationInitCredentials(function (data) {
			return cmanagerFactory.setSavedCredentials(data.data);
		}, function () {
			console.log("Error");
		});

	}]);
}());
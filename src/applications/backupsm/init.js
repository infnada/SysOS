var backupsmApp = angular.module('backupsmApp', []);

(function () {
	"use strict";
	backupsmApp.run(['ApplicationsFactory', 'ServerFactory', 'backupsmFactory', function(ApplicationsFactory, ServerFactory, backupsmFactory) {

		ApplicationsFactory.registerApplication({
			id: "backupsm",
			ico: "hdd-o",
			name: "Backups Manager",
			menu: true,
			actions: true,
			style: "width:870px;height:600px;top:7%;left:10%;"
		});

		// Get restores
		ServerFactory
		.getConfigFile('applications/backupsm/restores.json', function (data) {
			return backupsmFactory.setRestores(data.data);
		}, function (data) {
			console.log("Error");
		});

	}]);
}());
var fileexplorerApp = angular.module('fileexplorerApp', []);

(function () {
	"use strict";
	fileexplorerApp.run(['ApplicationsFactory', function(ApplicationsFactory) {

		ApplicationsFactory.registerApplication({
			id: "fileexplorer",
			ico: "folder",
			name: "File Explorer",
			menu: true,
			actions: false,
			status: false,
			style: "width:770px;height:600px;top:9%;left:12%;"
		});

	}]);
}());

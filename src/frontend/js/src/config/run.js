(function () {
	"use strict";
	myApp.run(['$rootScope', 'ServerFactory', 'ApplicationsFactory', 'socket', 'connectionsFactory', '$injector', '$ocLazyLoad',
		function ($rootScope, ServerFactory, ApplicationsFactory, socket, connectionsFactory, $injector, $ocLazyLoad) {

			angular.element(window).bind('dragover', function (e) {
				e.preventDefault();
			});
			angular.element(window).bind('drop', function (e) {
				e.preventDefault();
			});
			angular.element(window).bind('contextmenu', function (e) {
				e.preventDefault();
			});

			/*
			 * Init
			 */

			//netappFactory.getNFSExportRulesList("09303623-e55a-47dd-80b8-585737af0552", "172.27.24.5", "80", "MNFS", "NFSPROD3");
			//netappFactory.getExportRules("09303623-e55a-47dd-80b8-585737af0552", "172.27.24.5", "80", "MNFS", "default");

			/*vmwareFactory.connectvCenterSoap("adee0997-62ec-470e-aa81-045a446ceec5", "mvcenter01", 443).then(function () {
			  vmwareFactory.acquireNFCTicket(
				"adee0997-62ec-470e-aa81-045a446ceec5",
				"mvcenter01",
				443,
				"host-10",
				"datastore-12"
			  ).then(function(data) {
				console.log(data);
			  });
			});

			vmwareFactory.getClientVersion('192.168.5.250', 443).then(function (data) {
			  console.log(data);
			});*/


			// Ensure no application is open
			$rootScope.taskbar__item_open = null;

			ApplicationsFactory.getInstalledApplications().then(function (data) {

				angular.forEach(data, function (application) {

					var module = application.filename.replace("application__","").replace(".min.js","");

					$ocLazyLoad.load({
						name: module + 'App',
						files: ['/getApplicationFile/' + application.filename]
					}).then(function () {
						//console.log($injector.get(module + 'App'));
						//var module = application.filename.replace("application__","").replace(".min.js","");
						//$injector.get(module + 'App').run();
					});

				});
			});

			// Get Task Bar pinned applications
			ServerFactory
			.getConfigFile('desktop/task_bar.json', function (data) {

				// Register Start button
				ApplicationsFactory.registerTaskBarApplication({"id": "start", "pinned": true});

				// Register every pinned application
				angular.forEach(data.data, function (application) {
					ApplicationsFactory.registerTaskBarApplication(application);
				});
			}, function () {
				console.log("Error");
			});

			// Get express session
			ServerFactory
			.getSession(function () {

				socket.on('connect', function () {



				});
				socket.on('disconnect', function (err) {
					console.log(err);
					socket.io.reconnection(false)
				});
				socket.on('error', function (err) {
					console.log(err);
				});

				//SMANAGER
				socket.on('smanager__prop', function (data) {
					var smanagerFactory = $injector.get('smanagerFactory');

					if (angular.isObject(data)) console.log(data);
					smanagerFactory.newProp(data);
				});

				//SSH
				socket.on('ssh__prop', function (data) {
					var sshFactory = $injector.get('sshFactory');

					if (angular.isObject(data)) console.log(data);
					sshFactory.newProp(data);
				});
				socket.on('ssh__data', function (data) {
					var sshFactory = $injector.get('sshFactory');

					sshFactory.newData(data);
				});

				//SFTP
				socket.on('sftp__prop', function (data) {
					var sftpFactory = $injector.get('sftpFactory');

					if (angular.isObject(data)) console.log(data);
					sftpFactory.newProp(data);
				});
				socket.on('sftp__data', function (data) {
					var sftpFactory = $injector.get('sftpFactory');

					sftpFactory.newData(data);
				});
				socket.on('sftp__progress', function (data) {
					var sftpFactory = $injector.get('sftpFactory');

					sftpFactory.newProgress(data);
				});

			}, function () {
				//Error
				console.log("error");
			});

		}]);
}());

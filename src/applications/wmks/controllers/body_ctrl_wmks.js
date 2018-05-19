(function () {
	"use strict";
	wmksApp.controller('wmksBodyController', ['$scope', 'vmwareFactory', 'toastr', function ($scope, vmwareFactory, toastr) {

		var _this = this;
		var wmksData;

		$scope.$on('wmks__new_data', function (event, data) {
			wmksData = data;

			return vmwareFactory.connectvCenterSoap(wmksData.credential, wmksData.host, wmksData.port).then(function (res) {
				if (res.status === "error") throw new Error("Failed to connect to vCenter");

				return vmwareFactory.acquireVMTicket(wmksData.credential, wmksData.host, wmksData.port,  wmksData.vm);

			}).then(function (res) {
				if (res.status === "error") throw new Error("Failed to acquire VM ticket");

				var _wmks = $("#wmksContainer")
				.wmks({"useVNCHandshake" : false, "sendProperMouseWheelDeltas": true, "fitToParent":true})
				.bind("wmksconnecting", function() {
					console.log("The console is connecting");
				})
				.bind("wmksconnected", function() {
					console.log("The console has been connected");
				})
				.bind("wmksdisconnected", function(evt, info) {
					console.log("The console has been disconnected");
					console.log(evt, info);
				})
				.bind("wmkserror", function(evt, errObj) {
					console.log("Error!");
					console.log(evt, errObj);
					toastr.error('Make sure that you have access to ESXi host (' + res.data.host[0] + ':' + res.data.port[0] + ') and it\'s certificate is trusted', 'Unable to open remote console to VM (' + wmksData.vm + ')');
				})
				.bind("wmksiniterror", function(evt, customData) {
					console.log(evt);
					console.log(customData);
				})
				.bind("wmksresolutionchanged", function(canvas) {
					console.log("Resolution has changed!");
				});

				_this.url = "wss://" + res.data.host[0] + ":" + res.data.port[0] + "/ticket/" + res.data.ticket[0];
				_wmks.wmks("connect", _this.url);

			});
		});

	}]);
}());
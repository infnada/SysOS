(function () {
	"use strict";
	cmanagerApp.factory('cmanagerFactory', ['$filter', 'ServerFactory', 'toastr', function ($filter, ServerFactory, toastr) {

		// Private
		var credentials = [];
		var activeCredential = null;

		var deleteCredential = function (uuid) {
			credentials = credentials.filter(function(el) {
				return el.uuid !== uuid;
			});

			return ServerFactory.deleteCredential(uuid, function (data) {

				toastr.success('Credential Manager', 'Credential deleted!');
				activeCredential = null;

			}, function () {

				return toastr.error('Credential Manager', 'Error deleting credential!');

			});

		};

		var saveCredential = function (credential) {

			return ServerFactory.saveCredential(credential, function (data) {

				if ($filter('filter')(credentials, {uuid: data.data.data.response})[0]) {
					$filter('filter')(credentials, {uuid: data.data.data.response})[0].description = credential.description;
					$filter('filter')(credentials, {uuid: data.data.data.response})[0].username = credential.username;
				} else {
					credentials.push({
						uuid: data.data.data.response,
						description: credential.description,
						username: credential.username
					});
				}

				toastr.success('Credential Manager', 'Credential saved!');
				activeCredential = null;

			}, function () {

				return toastr.error('Credential Manager', 'Error saving credential!');

			});

		};


		return {
			setSavedCredentials: function (data) {
				credentials = data;
			},
			credentials: function () {
				return credentials;
			},
			setActiveCredential: function (uuid) {
				activeCredential = uuid;
			},
			activeCredential: function () {
				return activeCredential;
			},
			saveCredential: saveCredential,
			deleteCredential: deleteCredential
		};

	}]);
}());
(function () {
    'use strict';
    cmanagerApp.factory('cmanagerFactory', ['$filter', 'ServerFactory', 'toastr', function ($filter, ServerFactory, toastr) {

        // Private
        var credentials = [];
        var activeCredential = null;

        var deleteCredential = function (uuid) {
            credentials = credentials.filter(function (el) {
                return el.uuid !== uuid;
            });

            return ServerFactory.deleteCredential(uuid, function () {

                activeCredential = null;
                return toastr.success('Credential deleted.', 'Credential Manager');

            }, function () {

                return toastr.error('Error deleting credential.', 'Credential Manager');

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

                activeCredential = null;
                return toastr.success('Credential saved.', 'Credential Manager');

            }, function () {

                return toastr.error('Error saving credential.', 'Credential Manager');

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
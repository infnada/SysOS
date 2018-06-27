(function () {
    'use strict';
    SysOS.factory('ApplicationsFactory', ['$rootScope', '$q', '$log', 'ServerFactory', 'toastr', 'fileSystemFactory', function ($rootScope, $q, $log, ServerFactory, toastr, fileSystemFactory) {

        var applications = [
            {id: 'start', ico: 'windows', name: 'Start Menu', menu: true}
        ];

        var taskbar_applications = [];
        var opened_applications = [];

        /**
         * -----------------------
         * PRIVATE FUNCTIONS
         * -----------------------
         */

        /**
         * @Description
         * Check if application is in Desktop Task Bar
         *
         * @param id {String} Application ID
         */
        var isApplicationInTaskBar = function (id) {
            if (!id) throw new Error('id_not_found');

            return taskbar_applications.map(function (e) {
                return e.id;
            }).indexOf(id);
        };

        /**
         * @Description
         * Check if application is opened
         *
         * @param id {String} Application ID
         */
        var isApplicationOpened = function (id) {
            if (!id) throw new Error('id_not_found');

            return opened_applications.map(function (e) {
                return e.id;
            }).indexOf(id);
        };

        /*
         * -----------------------
         * PUBLIC FUNCTIONS
         * -----------------------
         */

        /**
         * @description
         * Main error handler
         *
         * @param e {String}
         */
        var errorHandler = function (e) {
            if (!e) throw new Error('e_not_found');

            toastr.error(e, 'General Error');
            $log.error('Applications Factory -> General Error -> [%s]', e);
            return new Error(e);
        };

        /**
         * @Description
         * If and application is not registered it will not be accessible from Desktop or other applications
         *
         * @param data {Object}
         */
        var registerApplication = function (data) {
            if (!data) throw new Error('data_not_found');

            $log.debug('Applications Factory -> New application registration -> id [%s], name [%s]', data.id, data.name);

            applications.push(data);
        };

        /**
         * @Description
         * Set an application to be shown in Desktop Task Bar
         *
         * @params
         * data {Object}
         * save* {Bool}
         */
        var registerTaskBarApplication = function (data, save) {
            if (!data) throw new Error('id_not_found');

            $log.debug('Applications Factory -> Registering application in TaskBar -> id [%s], pinned [%s], save [%s]', data.id, data.pinned, save);

            var application_index = isApplicationInTaskBar(data.id);

            // Applications already in Task Bar
            if (application_index !== -1) {

                // Delete if unpin application and is not opened
                if (data.pinned === false && isApplicationOpened(data.id) === -1) {
                    taskbar_applications.splice(application_index, 1);
                } else {

                    // Pin or unpin opened application application
                    taskbar_applications[application_index].pinned = data.pinned;
                }

            } else {

                $log.debug('Applications Factory -> Register application in TaskBar -> id [%s], pinned [%s]', data.id, data.pinned);

                // Application not in Task Bar
                taskbar_applications.push(data);
            }

            // Save new config to file
            if (save === true) {
                var applications_to_save = taskbar_applications.filter(function (obj) {
                    return obj.pinned === true && obj.id !== 'start';
                });

                return ServerFactory.saveConfigToFile(applications_to_save, 'desktop/task_bar.json', true, function () {
                    $log.debug('Applications Factory -> TaskBar applications saved');
                }, function (data) {
                    $log.debug('Applications Factory -> Error while saving TaskBar applications -> ', data.error);
                });
            }
        };

        /**
         * @Description
         * Return all application info
         *
         * @param id {String} Application ID
         */
        var getApplicationById = function (id) {
            if (!id) throw new Error('id_not_found');

            return applications.filter(function (obj) {
                return obj.id === id;
            })[0];
        };

        /**
         * @Description
         * Closes an application
         *
         * @param id {String} Application ID
         */
        var closeApplication = function (id) {
            if (!id) throw new Error('id_not_found');

            $log.debug('Applications Factory -> Closing application -> id [%s]', id);

            // Delete application object
            opened_applications = opened_applications.filter(function (el) {
                return el.id !== id;
            });

            // Remove from Desktop Task Bar
            taskbar_applications = taskbar_applications.filter(function (el) {
                return el.id !== id || el.pinned === true;
            });

            return opened_applications;
        };

        /**
         * @Description
         * Opens a new application
         *
         * @param id {String} Application name
         */
        var openApplication = function (id) {
            if (!id) throw new Error('id_not_found');

            var app;

            $log.debug('Applications Factory -> Opening application -> id [%s]', id);

            // If app is not an object get all application data
            if (angular.isString(id)) {
                app = getApplicationById(id);
            }

            // Check if application is already opened
            if (isApplicationOpened(app.id) !== -1) return;

            // Application not in pinned list. Show it on Desktop Task Bar
            if (isApplicationInTaskBar(app.id) === -1) {
                registerTaskBarApplication({
                    id: app.id
                });
            }

            // Create a new instance of the application
            opened_applications.push(app);
            return $q.resolve(opened_applications);
        };

        /**
         * @Description
         * Check if application is active (not in background) on Desktop
         *
         * @param id* {String} Application ID
         */
        var isActiveApplication = function (id) {
            if (!id) throw new Error('id_not_found');

            return $rootScope.taskbar__item_open === id;
        };

        /**
         * @Description
         * Puts an application active or at background
         *
         * @param id* {String} Application ID
         */
        var toggleApplication = function (id) {
            if (id === null) return $rootScope.taskbar__item_open = null;

            if (!id) throw new Error('id_not_found');

            if (isActiveApplication(id)) return $rootScope.taskbar__item_open = null;
            $rootScope.taskbar__item_open = id;
        };

        /**
         * @Description
         * Check if application is pinned in Task Bar
         *
         * @param id* {String} Application ID
         */
        var isApplicationPinned = function (id) {
            if (!id) throw new Error('id_not_found');

            var application = taskbar_applications.filter(function (obj) {
                return obj.id === id;
            })[0];

            if (application) return application.pinned;
            return false;

        };

        /**
         * @description
         * Returns all scripts to load as SysOS applications
         */
        var getInstalledApplications = function () {
            return fileSystemFactory.getFileSystemPath('/bin/applications', function (data) {
                $log.debug('Applications Factory -> Get Installed Applications successfully');

                return data;
            }, function (data) {
                $log.error('Applications Factory -> Error while getting installed applications -> ', data.error);
            });
        };

        /**
         * @description
         * Returns all pinned applications
         */
        var getTaskBarApplications = function () {
            ServerFactory.getConfigFile('desktop/task_bar.json', function (data) {

                $log.debug('Applications Factory -> Get TaskBar Applications successfully');

                // Register Start button
                registerTaskBarApplication({'id': 'start', 'pinned': true});

                // Register every pinned application
                angular.forEach(data.data, function (application) {
                    registerTaskBarApplication(application);
                });

            }, function (data) {
                $log.error('Applications Factory -> Error while getting TaskBar applications -> ', data.error);
            });
        };

        /**
         * @description
         * Function called after Sort taskbar applications
         *
         * @param applications {Object}
         */
        var saveTaskBarApplicationsOrder = function (applications) {
            if (!applications) throw new Error('applications_not_found');

            var applications_to_save = applications.filter(function (obj) {
                delete obj['$$hashKey'];
                return obj.pinned === true && obj.id !== 'start';
            });

            return ServerFactory.saveConfigToFile(applications_to_save, 'desktop/task_bar.json', true, function () {
                $log.debug('Applications Factory -> TaskBar applications saved');
            }, function (data) {
                $log.debug('Applications Factory -> Error while saving TaskBar applications -> ', data.error);
            });
        };

        return {
            errorHandler: errorHandler,
            registerApplication: registerApplication,
            applications: function () {
                return applications;
            },
            registerTaskBarApplication: registerTaskBarApplication,
            taskbar_applications: function () {
                return taskbar_applications;
            },
            opened_applications: function () {
                return opened_applications;
            },
            getApplicationById: getApplicationById,
            closeApplication: closeApplication,
            openApplication: openApplication,
            isActiveApplication: isActiveApplication,
            toggleApplication: toggleApplication,
            isApplicationPinned: isApplicationPinned,
            getInstalledApplications: getInstalledApplications,
            getTaskBarApplications: getTaskBarApplications,
            saveTaskBarApplicationsOrder: saveTaskBarApplicationsOrder
        };

    }]);
}());

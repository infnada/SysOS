(function () {
  "use strict";
  myApp.factory('ApplicationsFactory', ['$rootScope', 'ServerFactory', 'toastr', 'fileSystemFactory', function ($rootScope, ServerFactory, toastr, fileSystemFactory) {

    /*
     * -----------------------
     * PRIVATE FUNCTIONS
     * -----------------------
     */


    /*
     * @Description
     * Check if application is in Desktop Task Bar
     *
     * @params
     * id {String} Application ID
     */
    var isApplicationInTaskBar = function (id) {
      return taskbar_applications.map(function (e) {
        return e.id;
      }).indexOf(id);
    };

    /*
     * @Description
     * Check if application is opened
     *
     * @params
     * id {String} Application ID
     */
    var isApplicationOpened = function (id) {
      return opened_applications.map(function (e) {
        return e.id;
      }).indexOf(id);
    };

    /*
     * -----------------------
     * PUBLIC FUNCTIONS
     * -----------------------
     */

    var applications = [
      {id: "start", ico: "windows", name: "Start Menu", menu: true}
    ];

    var taskbar_applications = [];
    var opened_applications = [];

    var errorHandler = function (e) {
      toastr.error(e, 'General Error');

      return new Error(e);
    };

    /*
     * @Description
     * If and application is not registered it will not be accessible from Desktop or other applications
     *
     * @params
     * data {Object}
     */
    var registerApplication = function (data) {
      applications.push(data);
    };

    /*
     * @Description
     * Set an application to be shown in Desktop Task Bar
     *
     * @params
     * data {Object}
     */
    var registerTaskBarApplication = function (data, save) {

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

        // Application not in Task Bar
        taskbar_applications.push(data);
      }

      // Save new config to file
      if (save === true) {
        var applications_to_save = taskbar_applications.filter(function (obj) {
          return obj.pinned === true && obj.id !== "start";
        });

        return ServerFactory.saveConfigToFile(applications_to_save, 'desktop/task_bar.json', true);
      }
    };

    /*
     * @Description
     * Closes an application
     *
     * @params
     * id {String} Application ID
     */
    var closeApplication = function (id) {

      // Delete application object
      opened_applications = opened_applications.filter(function (el) {
        return el.id !== id;
      });

      // Remove from Desktop Task Bar
      taskbar_applications = taskbar_applications.filter(function (el) {
        return el.id !== id || el.pinned === true;
      });

      // TODO: destroy application scopes

      return opened_applications;
    };

    /*
     * @Description
     * Opens a new application
     *
     * @params
     * app {String/Object} Application name
     */
    var openApplication = function (app) {

      // If app is not an object get all application data
      if (angular.isString(app)) {
        app = getApplicationById(app);
      }

      // Check if application is already opened
      if (isApplicationOpened(app.id) !== -1) return;

      // Application not in pinned list. Show it on Desktop Task Bar
      if (isApplicationInTaskBar(app.id) === -1) {
        registerTaskBarApplication({
          id: app.id
        });
      }

      //TODO: 'z-index' : zIndex++

      // Create a new instance of the application
      opened_applications.push(app);
      return opened_applications;
    };

    /*
     * @Description
     * Puts an application active or at background
     *
     * @params
     * id {String} Application ID
     */
    var toggleApplication = function (id) {
      if (isActiveApplication(id)) return $rootScope.taskbar__item_open = null;
      $rootScope.taskbar__item_open = id;
    };

    /*
     * @Description
     * Check if application is active (not in background) on Desktop
     *
     * @params
     * id {String} Application ID
     */
    var isActiveApplication = function (id) {
      return $rootScope.taskbar__item_open === id;
    };

    /*
     * @Description
     * Check if application is pinned in Task Bar
     *
     * @params
     * id {String} Application ID
     */
    var isApplicationPinned = function (id) {

      var application = taskbar_applications.filter(function (obj) {
        return obj.id === id;
      })[0];

      if (application) return application.pinned;
      return false;

    };

    /*
     * @Description
     * Return all application info
     *
     * @params
     * id {String} Application ID
     */
    var getApplicationById = function (id) {
      return applications.filter(function (obj) {
        return obj.id === id;
      })[0];
    };

    /*
     * Returns all scripts to load as SysOS applications
     */
    var getInstalledApplications = function () {
	    return fileSystemFactory.getFileSystemPath('/bin/applications', function (data) {
	      return data;
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
      closeApplication: closeApplication,
      openApplication: openApplication,
      toggleApplication: toggleApplication,
      isActiveApplication: isActiveApplication,
      isApplicationPinned: isApplicationPinned,
      getApplicationById: getApplicationById,
      getInstalledApplications: getInstalledApplications
    };

  }]);
}());

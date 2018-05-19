(function () {
  "use strict";
  myApp.directive('taskBar', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/desktop/task_bar.html',
      controllerAs: 'TB',
      controller: ['$rootScope', '$scope', '$interval', 'ApplicationsFactory', function ($rootScope, $scope, $interval, ApplicationsFactory) {

        var _this = this;

        // Set task bar time
        function calcTime () {
          var a_p = "";
          var d = new Date();
          var curr_hour = d.getHours();

          if (curr_hour < 12) {
            a_p = "AM";
          } else {
            a_p = "PM";
          }

          if (curr_hour === 0) {
            curr_hour = 12;
          }

          if (curr_hour > 12) {
            curr_hour = curr_hour - 12;
          }

          var curr_min = d.getMinutes();

          if (curr_min < 10) {
            curr_min = '0' + curr_min;
          }

          return curr_hour + ':' + curr_min + ' ' + a_p;
        }

        /*
			   * Bindings
			   */
        $interval(function () {
          _this.time = calcTime();
        }, 1000);

        this.time = calcTime();
        this.opened_applications = ApplicationsFactory.opened_applications();
        this.taskbar_applications = ApplicationsFactory.taskbar_applications();

        $scope.$watch(function () {
          return ApplicationsFactory.opened_applications();
        }, function (newValue) {
          _this.opened_applications = newValue;
        });

        $scope.$watch(function () {
          return ApplicationsFactory.taskbar_applications();
        }, function (newValue) {
          _this.taskbar_applications = newValue;
        });

        this.getApplicationById = function (id) {
          return ApplicationsFactory.getApplicationById(id);
        };

        this.appContextMenu = function (id) {
          if (id === "start") return;

          return [
            [function ($itemScope) {
              return '<span class="fa-stack"><i class="fa fa-stack-2x fa-' + _this.getApplicationById($itemScope.application.id).ico + '"></i></span> ' + _this.getApplicationById($itemScope.application.id).name;
            }, function ($itemScope) {

              // Toggle application
              _this.toggleApplication($itemScope.application.id);

            }, function () {
              return true; // enabled = true, disabled = false
            }],
            null,
            [function ($itemScope) {
              if ($itemScope.application.pinned) {
                return '<span class="fa-stack"><i class="fa fa-thumb-tack fa-stack-2x"></i><i class="fa fa-ban fa-stack-1x text-danger"></i></span> Unpin from Task Bar';
              }
              return '<span class="fa-stack"><i class="fa fa-stack-2x fa-thumb-tack fa-rotate-90"></i></span> Pin to Task Bar';
            }, function ($itemScope) {

              // Pin application
              ApplicationsFactory.registerTaskBarApplication({
                id: $itemScope.application.id,
                pinned: !$itemScope.application.pinned
              }, true);

            }, function () {
              return true; // enabled = true, disabled = false
            }],
            [function () {
              return '<span class="fa-stack"><i class="fa fa-stack-2x fa-times"></i></span> Close';
            }, function ($itemScope) {

              // Close application
              $scope.$parent.$broadcast('closeApplication', $itemScope.application.id);

            }, function ($itemScope) {
              if (isApplicationOpened($itemScope.application.id) !== -1) return true;
              return false; // enabled = true, disabled = false
            }]
          ];
        };

        /*
			   * ng-class functions
			   */

        var isApplicationOpened = function (id) {
          return _this.opened_applications.map(function (e) {
            return e.id;
          }).indexOf(id);
        };

        this.isStartOpened = function (id) {
          return $rootScope.taskbar__item_open === id && id === 'start';
        };

        // And is not start application
        this.isItemOpened = function (id) {
          return isApplicationOpened(id) !== -1 && id !== 'start';
        };

        // And is not start application
        this.isItemActive = function (id) {
          return $rootScope.taskbar__item_open === id && id !== 'start';
        };

        /*
			   * ng-click functions
			   */
        this.toggleApplication = function (id) {

          if (id === "start") return ApplicationsFactory.toggleApplication(id);

          // Open application
          if (isApplicationOpened(id) === -1) {
            _this.opened_applications = ApplicationsFactory.openApplication(id);
            ApplicationsFactory.toggleApplication(id);
          }

          // Emitting to application directives (minimize or maximize)
          $scope.$parent.$broadcast('toggling', id);
        };

        this.minimizeToDesktop = function () {
          $scope.$parent.$broadcast('toggling', null);
        };

      }]
    };
  }]);
}());

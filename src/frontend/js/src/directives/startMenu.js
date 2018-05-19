(function () {
  "use strict";
  myApp.directive('startMenu', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/desktop/start_menu.html',
      controllerAs: 'SM',
      controller: ['$scope', 'ApplicationsFactory', function ($scope, ApplicationsFactory) {

        var _this = this;

        /*
			   * Bindings
			   */
        this.applications = ApplicationsFactory.applications();

        $scope.$watch(function () {
          return ApplicationsFactory.applications();
        }, function (newValue) {
          _this.applications = newValue;
        });

        this.appContextMenu = function () {

          return [
            [function ($itemScope) {
              return '<span class="fa-stack"><i class="fa fa-stack-2x fa-' + $itemScope.application.ico + '"></i></span> Open';
            }, function ($itemScope) {

              // Toggle application
              _this.openApplication($itemScope.application.id);

            }, function () {
              return true; // enabled = true, disabled = false
            }],
            null,
            [function ($itemScope) {
              console.log($itemScope);
              if (ApplicationsFactory.isApplicationPinned($itemScope.application.id)) {
                return '<span class="fa-stack"><i class="fa fa-thumb-tack fa-stack-2x"></i><i class="fa fa-ban fa-stack-1x text-danger"></i></span> Unpin from Task Bar';
              }
              return '<span class="fa-stack"><i class="fa fa-stack-2x fa-thumb-tack fa-rotate-90"></i></span> Pin to Task Bar';
            }, function ($itemScope) {

              // Pin application
              ApplicationsFactory.registerTaskBarApplication({
                id: $itemScope.application.id,
                pinned: !ApplicationsFactory.isApplicationPinned($itemScope.application.id)
              }, true);

            }, function () {
              return true; // enabled = true, disabled = false
            }]
          ];
        };

        /*
			   * ng-click functions
			   */
        this.openApplication = function (id) {
          ApplicationsFactory.openApplication(id);
          ApplicationsFactory.toggleApplication(id);
        };

        this.openMenu = function (menu) {
          if (_this.openedMenu === menu) return _this.openedMenu = null;
          _this.openedMenu = menu;
        };

      }]
    };
  }]);
}());

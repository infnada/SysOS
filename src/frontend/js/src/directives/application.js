(function () {
  "use strict";
  myApp.directive('application', [function () {
    return {
      restrict: 'E',
      scope: {
        appId: "="
      },
      //bindToController: true,
      replace: true,
      templateUrl: 'templates/applications/main.html',
      controllerAs: 'APP',
      controller: ['$scope', '$element', '$window', '$timeout', 'ApplicationsFactory', function ($scope, $element, $window, $timeout, ApplicationsFactory) {

        var _this = this;
        var fullHeight = $window.innerHeight - 48;
        var fullWidth = $window.innerWidth;

        var w = angular.element($window);

        w.bind('resize', function () {
          fullHeight = $window.innerHeight - 48;
          fullWidth = $window.innerWidth;

          if (_this.isMaximized) {
            $element.css({
              'height': fullHeight,
              'width': fullWidth,
              'top': 0,
              'left': 0
            });
          }
        });

        $timeout(function () {
          _this.isOpening = false;
        }, 500);

        /*
			   * Bindings
			   */
        this.appId = $scope.appId;
        this.appData = ApplicationsFactory.getApplicationById(this.appId);
        this.opened_applications = ApplicationsFactory.opened_applications();
        this.isclosing = false;
        this.isOpening = true;
        this.isMinimized = false;
        this.isMaximized = false;
        this.isMenuOpened = false;

        this.initialHeight = 0;
        this.initialWidth = 0;
        this.initialTop = 0;
        this.initialLeft = 0;

        $element.on('click', function (e) {
          if (ApplicationsFactory.isActiveApplication(_this.appId)) return;
          if (_this.isMinimized) return;
          ApplicationsFactory.toggleApplication(_this.appId);
        });

        // jQuery resize element
        $element.resizable({
          handles: 'n,ne,e,se,s,sw,w,nw',
          stop: function () {
            var initialHeight = $element[0].offsetHeight,
              initialWidth = $element[0].offsetWidth,
              initialTop = $element[0].offsetTop,
              initialLeft = $element[0].offsetLeft;
          }
        });

        // jQuery drag element
        $element.draggable({
          handle: '.window__titlebar',
          stop: function () {
            var initialHeight = $element[0].offsetHeight,
              initialWidth = $element[0].offsetWidth,
              initialTop = $element[0].offsetTop,
              initialLeft = $element[0].offsetLeft;

            if (initialTop < -5) {
              _this.maximize();
            }
          },
          start: function (event, ui) {
            ApplicationsFactory.toggleApplication(_this.appId);

            //$(this).css({'z-index' : zIndex++});

            if (_this.isMaximized) {
              _this.maximize();
            }

          }
        });

        /*
			   * broadcast functions
			   */

        // Called from Task Bar Context Menu
        $scope.$on('closeApplication', function (event, appId) {
          if (appId === _this.appId) {
            _this.close();
          }
        });

        $scope.$on('toggling', function (event, appId) {
          // Called to minimize all applications
          if (appId === null) return _this.minimize();

          // Normal call
          if (appId === _this.appId) {

            // Application minimized, set it active
            if (_this.isMinimized) {
              ApplicationsFactory.toggleApplication(appId);
              return _this.isMinimized = false;
            }

            // Application opened but not active
            if (!ApplicationsFactory.isActiveApplication(_this.appId)) return ApplicationsFactory.toggleApplication(appId);

            // Application is active, minimize it
            return _this.minimize();
          }
        });

        /*
			   * ng-class functions
			   */
        this.isVisible = function () {
          return ApplicationsFactory.isActiveApplication(_this.appId);
        };

        /*
			   * ng-click functions
			   */
        this.close = function () {

          // Close this application
          _this.isClosing = true;

          $timeout(function () {
            _this.isClosing = false;
            _this.opened_applications = ApplicationsFactory.closeApplication(_this.appId);
            //hide $(parentWindow).hide()
          }, 500);

          // Close application in taskbar
          ApplicationsFactory.toggleApplication(null);

          // TODO: Set closest application active
          //var closest = $('.window').not('.window--minimized, .window--closing, .window--opening').filter(function() {
          //  return $(this).css('z-index') < zIndex
          //}).first();

          //$(closest).addClass('window--active');
        };

        this.minimize = function () {
          _this.isMinimized = true;
          ApplicationsFactory.toggleApplication(null);
        };

        this.maximize = function () {
          _this.isMaximized = !_this.isMaximized;

          if (!_this.isMaximized) {
            $element.css({
              'height': _this.initialHeight,
              'width': _this.initialWidth,
              'top': _this.initialTop,
              'left': _this.initialLeft
            });
          } else {
            _this.initialHeight = $element[0].offsetHeight;
            _this.initialWidth = $element[0].offsetWidth;
            _this.initialTop = $element[0].offsetTop;
            _this.initialLeft = $element[0].offsetLeft;

            $element.css({
              'height': fullHeight,
              'width': fullWidth,
              'top': 0,
              'left': 0
            });
          }

        };

        this.toggleMenu = function () {
          _this.isMenuOpened = !_this.isMenuOpened;
        };

      }]
    };
  }]);
}());

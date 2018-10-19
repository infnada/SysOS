(function () {
    'use strict';
    SysOS.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/main.html',
            '<div class="window window--{{::APP.appId}}"  ng-mouseover="$root.setCurrentFileDrop(APP.appId); $event.stopPropagation()" style="{{::APP.appData.style}}" ng-class="{\'window--active\': APP.isVisible(), \'window--closing\': APP.isClosing, \'window--opening\': APP.isOpening, \'window--minimized\': APP.isMinimized, \'window--maximized\': APP.isMaximized}"> \
                  <div class="window__titlebar" ng-dblclick="APP.maximize()"> \
                      <div class="window__controls window__controls--left" ng-click="APP.toggleMenu()"> \
                  <a class="window__icon"><i class="fa fa-{{::APP.appData.ico}}"></i></a> \
                  <a class="window__menutoggle" ng-class="{\'window__menutoggle--open\': APP.isMenuOpened}"><i class="fa fa-bars"></i></a> \
                </div> \
                <span class="window__title"> \
                  {{::APP.appData.name}} \
                </span> \
                <div class="window__controls window__controls--right"> \
                  <a class="window__minimize" ng-click="APP.minimize()"><i class="fa fa-minus"></i></a> \
                  <a class="window__maximize" ng-click="APP.maximize()"><i class="fa"></i></a> \
                  <a class="window__close" ng-click="APP.close(); $event.stopPropagation();"><i class="fa fa-close"></i></a> \
                </div> \
                  </div> \
              <window-menu app="APP.appData" is-menu-opened="APP.isMenuOpened"></window-menu> \
              <window-actions app="APP.appData"></window-actions> \
              <window-body app="APP.appData"></window-body> \
              <window-status app="APP.appData"></window-status> \
            </div>'
        );

    }]);
}());

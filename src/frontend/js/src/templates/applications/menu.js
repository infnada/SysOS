(function () {
    'use strict';
    SysOS.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/menu.html',
            '<ul class="window__menu" ng-class="{\'window__menu--open\': MENU.isMenuOpened}" ng-if="MENU.app.menu == true" ng-include="\'templates/applications/menu-\' + MENU.app.id + \'.html\'"></ul>'
        );

    }]);
}());

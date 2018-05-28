(function () {
    'use strict';
    backupsmApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/menu-backupsm.html',
            '<li> \
              <a > \
                <i class="menu__icon fa fa-search"></i> \
                Search \
              </a> \
            </li> \
            <li> \
              <a > \
                <i class="menu__icon fa fa-share-alt"></i> \
                Share \
              </a> \
            </li> \
            <li> \
              <a > \
                <i class="menu__icon fa fa-plug"></i> \
                Devices \
              </a> \
            </li> \
            <li class="divided"> \
              <a > \
                <i class="menu__icon fa fa-cog"></i> \
                Settings \
              </a> \
            </li>'
        );

    }]);
}());
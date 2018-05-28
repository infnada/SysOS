(function () {
    'use strict';
    fileexplorerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/menu-fileexplorer.html',
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
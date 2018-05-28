(function () {
    'use strict';
    sshApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/menu-ssh.html',
            '<li> \
              <a > \
                <i class="menu__icon fa fa-download"></i> \
                Save \
              </a> \
            </li> \
            <li> \
              <a > \
                <i class="menu__icon fa fa-folder-open"></i> \
                Open \
              </a> \
            </li> \
            <li> \
              <a > \
                <i class="menu__icon fa fa-print"></i> \
                Print \
              </a> \
            </li> \
            <li> \
                <a > \
                  <i class="menu__icon fa fa-share-alt"></i> \
                  Share \
                </a> \
              </li> \
              <li class="divided"> \
                <a > \
                  <i class="menu__icon fa fa-file"></i> \
                  Format \
                </a> \
            </li> \
            <li> \
                <a > \
                  <i class="menu__icon fa fa-cog"></i> \
                  Settings \
              </a> \
            </li>'
        );

    }]);
}());
(function () {
    'use strict';
    wmksApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/body-wmks.html',
            '<div class="window__body" ng-controller="wmksBodyController as wmksB"> \
              <div class="window__main no_padding"> \
                <div id="wmksContainer" style="width:100%; height:100%;"></div> \
              </div> \
            </div>'
        );

    }]);
}());
(function () {
    'use strict';
    cmanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/actions-cmanager.html',
            '<div class="window__actions" ng-controller="cmanagerActionController as cmanagerA"> \
              <a class="window__item"  title="New Credential" ng-click="cmanagerA.newCredential()"> \
                <i class="fa fa-plus text-success"></i> \
              </a> \
              <a class="window__item separator" ></a> \
              <a class="window__item"  title="Delete Current Credential" ng-click="cmanagerA.deleteCredential()"> \
                <i class="fa fa-close" ng-class="{\'text-danger\': cmanagerA.activeCredential != null}"></i> \
              </a> \
              <a class="window__item separator"></a> \
            </div>'
        );

    }]);
}());
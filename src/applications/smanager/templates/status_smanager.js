(function () {
    'use strict';
    smanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/status-smanager.html',
            '<div class="window__status" ng-controller="smStatusController as smS"> \
              <span class="pull-left text-muted" ng-if="!smS.getActiveConnection().footer">{{smS.getActiveConnection().host}}</span> \
              <span class="pull-left text-muted" ng-if="smS.getActiveConnection().footer">{{smS.getActiveConnection().footer}}</span> \
              <span class="pull-right text-success" ng-if="!smS.getActiveConnection().error">{{smS.getActiveConnection().status}}</span> \
              <span class="pull-right text-danger" ng-if="smS.getActiveConnection().error">{{smS.getActiveConnection().error}}</span> \
            </div>'
        );

    }]);
}());

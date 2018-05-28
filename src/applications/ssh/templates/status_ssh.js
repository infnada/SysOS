(function () {
    'use strict';
    sshApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/status-ssh.html',
            '<div class="window__status" ng-controller="sshStatusController as sshS"> \
              <span class="pull-left text-muted" ng-if="!sshS.getActiveConnection().footer">{{sshS.getActiveConnection().host}}</span> \
              <span class="pull-left text-muted" ng-if="sshS.getActiveConnection().footer">{{sshS.getActiveConnection().footer}}</span> \
              <span class="pull-right text-success" ng-if="!sshS.getActiveConnection().error">{{sshS.getActiveConnection().status}}</span> \
              <span class="pull-right text-danger" ng-if="sshS.getActiveConnection().error">{{sshS.getActiveConnection().error}}</span> \
            </div>'
        );

    }]);
}());
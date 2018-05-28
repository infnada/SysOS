(function () {
    'use strict';
    sftpApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/status-sftp.html',
            '<div class="window__status" ng-controller="sftpStatusController as sftpS"> \
              <span class="pull-left text-muted" ng-if="!sftpS.getActiveConnection().footer">{{sftpS.getActiveConnection().host}}</span> \
              <span class="pull-left text-muted" ng-if="sftpS.getActiveConnection().footer">{{sftpS.getActiveConnection().footer}}</span> \
              <span class="pull-right text-success" ng-if="!sftpS.getActiveConnection().error">{{sftpS.getActiveConnection().status}}</span> \
              <span class="pull-right text-danger" ng-if="sftpS.getActiveConnection().error">{{sftpS.getActiveConnection().error}}</span> \
            </div>'
        );

    }]);
}());
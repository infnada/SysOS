(function () {
    'use strict';
    sftpApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/actions-sftp.html',
            '<div class="window__actions" ng-controller="sftpActionController as sftpA"> \
              <a class="window__item"  ng-click="sftpA.newConnection()"> \
                <i class="fa fa-plus text-success"></i> \
              </a> \
              <a class="window__item separator" ></a> \
              <a class="window__item"  title="Edit connection" ng-click="sftpA.editConnection()"> \
                <i class="fa fa-edit" ng-class="{\'text-primary\': sftpA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Disconnect" ng-click="sftpA.disconnectConnection()"> \
                <i class="fa fa-close" ng-class="{\'text-danger\': sftpA.activeConnection != null && sftpA.getActiveConnection().state == \'connected\'}"></i> \
              </a> \
              <a class="window__item" title="Delete" ng-click="sftpA.deleteConnection()"> \
                <i class="fa fa-trash" ng-class="{\'text-danger\': sftpA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item separator" ></a> \
              <a class="window__item"  ng-click="sftpA.toggleExchange()"> \
                <i class="fa fa-exchange" ng-class="{\'text-danger\': sftpA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item separator" ></a> \
            </div>'
        );

    }]);
}());
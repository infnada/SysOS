(function () {
    'use strict';
    sshApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/actions-ssh.html',
            '<div class="window__actions" ng-controller="sshActionController as sshA"> \
              <a class="window__item"  ng-click="sshA.newConnection()"> \
                <i class="fa fa-plus text-success"></i> \
              </a> \
              <a class="window__item separator" ></a> \
              <a class="window__item" title="Edit connection" ng-click="sshA.editConnection()"> \
                <i class="fa fa-edit" ng-class="{\'text-primary\': sshA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item" title="Disconnect" ng-click="sshA.disconnectConnection()"> \
                <i class="fa fa-close" ng-class="{\'text-danger\': sshA.activeConnection != null && sshA.getActiveConnection.state == \'connected\'}"></i> \
              </a> \
              <a class="window__item" title="Delete" ng-click="sshA.deleteConnection()"> \
                <i class="fa fa-trash" ng-class="{\'text-danger\': sshA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item separator" ></a> \
              <a class="window__item" ng-click="sshA.toggleLog()"> \
                <i class="fa fa-file-o" ng-class="{\'fa-file-text-o\': sshA.logActivated, \'fa-file-o\': !sshA.logActivated, \'text-primary\': sshA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item" ng-click="sshA.downloadLog()"> \
                <i class="fa fa-download" ng-class="{\'text-primary\': sshA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item separator" ></a> \
            </div>'
        );

    }]);
}());
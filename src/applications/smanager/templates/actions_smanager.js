(function () {
    'use strict';
    smanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/actions-smanager.html',
            '<div class="window__actions" ng-controller="smActionController as smA"> \
              <a class="window__item"  title="New connection" ng-click="smA.newConnection()"> \
                <i class="fa fa-plus text-success"></i> \
              </a> \
              <a class="window__item separator" ></a> \
              <a class="window__item"  title="Edit connection" ng-click="smA.editConnection()"> \
                <i class="fa fa-edit" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Disconnect" ng-if="smA.connections.length !== 0" ng-click="smA.disconnectConnection()"> \
                <i class="fa fa-close" ng-class="{\'text-danger\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Delete" ng-if="smA.connections.length !== 0" ng-click="smA.deleteConnection()"> \
                <i class="fa fa-trash" ng-class="{\'text-danger\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Connection options" ng-click="smA.configureConnection()"> \
                <i class="fa fa-cog" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item separator" ></a> \
              <a class="window__item"  title="Power status"> \
                <i class="fa fa-power-off" ng-class="{\'text-danger\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Refresh" ng-click="smA.remoteRefresh();"> \
                <i class="fa fa-refresh" ng-class="{\'text-success\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="SSH" ng-click="smA.openWithApp(\'ssh\')"> \
                <i class="fa fa-terminal" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="File explorer"  ng-click="smA.openWithApp(\'sftp\')"> \
                <i class="fa fa-upload" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Hardware monitor"> \
                <i class="fa fa-microchip" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Alerts"> \
                <i class="fa fa-bullhorn" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Services"> \
                <i class="fa fa-cubes" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="Firewall"> \
                <i class="fa fa-exchange" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item"  title="HIDS" ng-click="smA.runHIDS()"> \
                <i class="fa fa-shield" ng-class="{\'text-primary\': smA.activeConnection != null}"></i> \
              </a> \
              <a class="window__item separator" ></a> \
            </div>'
        );

    }]);
}());

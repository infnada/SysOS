(function () {
    'use strict';
    fileexplorerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/actions-fe-local.html',
            '<div class="window__actions"> \
              <span class="fa-stack" ng-click="feB.createFolder();"> \
                <i class="fa fa-folder fa-stack-1x"></i> \
                <i class="fa fa-plus fa-pull-right fa-stack-1x text-success"></i> \
              </span> \
              <a class="window__item" ng-click="feB.toggleView()"> \
                <i class="fa fa-list"></i> \
              </a> \
              <a class="window__item separator"></a> \
              <a class="window__back" ng-click="feB.goPathBack()"> \
                <i class="fa fa-arrow-left"></i> \
              </a> \
              <a class="window__forward" ng-click="feB.goPathForward()"> \
                <i class="fa fa-arrow-right"></i> \
              </a> \
              <a class="window__item" ng-click="feB.reloadPath()"> \
                <i class="fa fa-refresh"></i> \
              </a> \
              <div class="window__path"> \
                <a ng-click="feB.goToPath(null)"> \
                  <i class="fa fa-desktop"></i> \
                  SysOS / \
                </a> \
                <a ng-repeat="path in feB.localFileSystem.currentPath.split(\'/\') track by $index" ng-if="path.length != 0" ng-click="feB.goToPath($index, path)"> \
                  {{::path}} \
                </a> \
              </div> \
              <form class="search"> \
                <input type="text" class="search__input" placeholder="Search files" ng-model="feB.search.filename"> \
                <button class="search__btn"> \
                </button> \
              </form> \
            </div>'
        );

    }]);
}());
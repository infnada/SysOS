(function () {
    'use strict';
    datastoreexplorerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/actions-de-local.html',
            '<div class="window__actions"> \
              <a class="window__item" ng-click="deB.showDatastores(\'vmware\')"> \
                <i class="fa fa-plus text-success"></i> \
              </a> \
              <a class="window__item separator"></a> \
              <span class="fa-stack" ng-click="deB.createFolder();"> \
                <i class="fa fa-folder fa-stack-1x"></i> \
                <i class="fa fa-plus fa-pull-right fa-stack-1x text-success"></i> \
              </span> \
              <a class="window__item" ng-click="deB.toggleView()"> \
                <i class="fa fa-list"></i> \
              </a> \
              <a class="window__item separator"></a> \
              <a class="window__back" ng-click="deB.goPathBack()"> \
                <i class="fa fa-arrow-left"></i> \
              </a> \
              <a class="window__forward" ng-click="deB.goPathForward()"> \
                <i class="fa fa-arrow-right"></i> \
              </a> \
              <a class="window__item" ng-click="deB.reloadPath()"> \
                <i class="fa fa-refresh"></i> \
              </a> \
              <div class="window__path"> \
                <a ng-click="deB.goToPath(null)"> \
                  <i class="fa fa-desktop"></i> \
                  {{deB.datastoreData.name}} / \
                </a> \
                <a ng-repeat="path in deB.localFileSystem.currentPath.split(\'/\') track by $index" ng-if="path.length != 0" ng-click="deB.goToPath($index, path)"> \
                  {{::path}} \
                </a> \
              </div> \
              <form class="search"> \
                <input type="text" class="search__input" placeholder="Search files" ng-model="deB.search.filename"> \
                <button class="search__btn"> \
                </button> \
              </form> \
            </div>'
        );

    }]);
}());
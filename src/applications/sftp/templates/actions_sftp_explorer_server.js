(function () {
	"use strict";
	sftpApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/applications/actions-sftp-explorer-server.html',
			'<div class="window__actions"> \
			  <span class="fa-stack" ng-click="sftpBS.createFolder();"> \
				<i class="fa fa-folder fa-stack-1x"></i> \
				<i class="fa fa-plus fa-pull-right fa-stack-1x text-success"></i> \
			  </span> \
			  <a class="window__item" ng-click="sftpBS.toggleView()"> \
				<i class="fa fa-list"></i> \
			  </a> \
			  <a class="window__item"> \
				<i class="fa fa-terminal"></i> \
			  </a> \
			  <a class="window__item separator"></a> \
			  <a class="window__back" ng-click="sftpBS.goPathBack()"> \
				<i class="fa fa-arrow-left"></i> \
			  </a> \
			  <a class="window__forward" ng-click="sftpBS.goPathForward()"> \
				<i class="fa fa-arrow-right"></i> \
			  </a> \
			  <a class="window__item" ng-click="sftpBS.reloadPath()"> \
				<i class="fa fa-refresh"></i> \
			  </a> \
			  <div class="window__path"> \
				<a  ng-click="sftpBS.goToPath(false, \'/\')"> \
				  <i class="fa fa-desktop"></i> \
				  Server / \
				</a> \
				<a ng-repeat="path in sftpB.getActiveConnection().currentPath.split(\'/\') track by $index" ng-if="path.length != 0" ng-click="sftpBS.goToPath($index)"> \
				  {{::path}} \
				</a> \
			  </div> \
			  <form class="search"> \
				<input type="text" class="search__input" placeholder="Search files" ng-model="sftpBS.search.filename"> \
				<button class="search__btn"> \
				</button> \
			  </form> \
			</div>'
		);

	}]);
}());
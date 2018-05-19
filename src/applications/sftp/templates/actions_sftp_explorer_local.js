(function () {
	"use strict";
	sftpApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/applications/actions-sftp-explorer-local.html',
			'<div class="window__actions"> \
			  <span class="fa-stack" ng-click="sftpBL.createFolder();"> \
				<i class="fa fa-folder fa-stack-1x"></i> \
				<i class="fa fa-plus fa-pull-right fa-stack-1x text-success"></i> \
			  </span> \
			  <a class="window__item" ng-click="sftpBL.toggleView()"> \
				<i class="fa fa-list"></i> \
			  </a> \
			  <a class="window__item separator"></a> \
			  <a class="window__back" ng-click="sftpBL.goPathBack()"> \
				<i class="fa fa-arrow-left"></i> \
			  </a> \
			  <a class="window__forward" ng-click="sftpBL.goPathForward()"> \
				<i class="fa fa-arrow-right"></i> \
			  </a> \
			  <a class="window__item" ng-click="sftpBL.reloadPath()"> \
				<i class="fa fa-refresh"></i> \
			  </a> \
			  <div class="window__path"> \
				<a  ng-click="sftpBL.goToPath(null)"> \
				  <i class="fa fa-desktop"></i> \
				  SysOS / \
				</a> \
				<a  ng-repeat="path in sftpBL.localFileSystem.currentPath.split(\'/\') track by $index" ng-if="path.length != 0" ng-click="sftpBL.goToPath($index, path)"> \
				  {{::path}} \
				</a> \
			  </div> \
			  <form class="search"> \
				<input type="text" class="search__input" placeholder="Search files" ng-model="sftpBL.search.filename"> \
				<button class="search__btn"> \
				</button> \
			  </form> \
			</div>'
		);

	}]);
}());
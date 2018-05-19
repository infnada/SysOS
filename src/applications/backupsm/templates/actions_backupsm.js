(function () {
	"use strict";
	backupsmApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/actions-backupsm.html',
			'<div class="window__actions" ng-controller="bmActionController as bmA"> \
			  <a class="window__item"  title="New connection" ng-click="bmA.newConnection()"> \
				<i class="fa fa-plus text-success"></i> \
			  </a> \
			  <a class="window__item separator" ></a> \
			  <a class="window__item separator" ></a> \
			</div>'
		);

	}]);
}());
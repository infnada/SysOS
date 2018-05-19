(function () {
	"use strict";
	cmanagerApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/status-cmanager.html',
			'<div class="window__status" ng-controller="cmanagerStatusController as cmanagerS"> \
			  <span class="pull-right text-success" ng-if="!cmanagerS.cmanagererror">{{cmanagerS.status}}</span> \
			  <span class="pull-right text-danger" ng-if="cmanagerS.cmanagererror">{{cmanagerS.cmanagererror}}</span> \
			</div>'
		);

	}]);
}());
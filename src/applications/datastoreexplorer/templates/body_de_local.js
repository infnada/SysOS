(function () {
	"use strict";
	datastoreexplorerApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/applications/body-de-local.html',
			'<div ng-include="\'templates/applications/folders-dropzone-de-local.html\'"></div> \
			<a ng-if="deB.viewAsList == false"  ng-repeat="file in deB.localFileSystem.currentData | filter:deB.search" ng-class="{\'active\': deB.currentActive == $index}" ng-click="deB.setCurrentActive($index)" ng-dblclick="deB.doWithFile(file)" title="{{::file.path}}" context-menu="deB.fileContextMenu"> \
				<i class="fa fa-{{::file.fileType}}"></i> \
				<span>{{::file.path}}</span> \
			</a> \
			<table ng-if="deB.viewAsList == true" class="table table-hover"> \
				<thead> \
					<tr> \
						<th>Name</th> \
						<th>Size</th> \
						<th>Type</th> \
					</tr> \
				</thead> \
				<tbody> \
					<tr ng-repeat="file in deB.localFileSystem.currentData | filter:deB.search" ng-class="{\'active\': deB.currentActive == $index}" ng-click="deB.setCurrentActive($index)" ng-dblclick="deB.doWithFile(file)" title="{{::file.path}}" context-menu="deB.fileContextMenu"> \
						<td><i class="fa fa-{{::file.fileType}}"></i> {{::file.path}}</td> \
						<td>{{::file.fileSize}}</td> \
						<td>{{::file.fileType}}</td> \
					</tr> \
				</tbody> \
			</table>'
		);

	}]);
}());


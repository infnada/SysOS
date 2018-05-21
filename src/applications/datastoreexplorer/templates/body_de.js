(function () {
	"use strict";
	datastoreexplorerApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/body-datastoreexplorer.html',
			'<div class="window__body" ng-controller="deBodyController as deB"> \
			  <div class="window__main no_padding"> \
				<div class="col-xs-12 ftp__body" > \
					<div ng-include="\'templates/applications/actions-de-local.html\'" include-replace></div> \
					<div id="local_body" selectable="deB.selection" selectable-list="deB.localFileSystem.currentData | filter:deB.search" selectable-out="selected" selectable-options="{delay:150, filter: \'a\'}" minus-index="2" class="folders" tabindex="0" ng-keydown="deB.handleItemKeyPress($event)" context-menu="deB.localContextMenu"> \
					<div ng-include="\'templates/applications/folders-modal-de-local.html\'"></div> \
					<div ng-include="\'templates/applications/folders-dropzone-de-local.html\'"></div> \
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
				</table> \
				</div> \
				</div> \
			  </div> \
			</div>'
		);

	}]);
}());
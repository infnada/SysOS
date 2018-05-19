(function () {
	"use strict";
	fileexplorerApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/body-fileexplorer.html',
			'<div class="window__body" ng-controller="feBodyController as feB"> \
			  <div class="window__side"> \
				<ul class="side__list"> \
				  <li><a >Home</a></li> \
				  <li> \
					<a > \
					  Favorites \
					  <span class="list__toggle" ng-click="BODY.toggleList($event)"></span> \
					</a> \
					<ul style="display:none"> \
					  <li><a >Desktop</a></li> \
					  <li><a >Downloads</a></li> \
					  <li><a >Recent Places</a></li> \
					</ul> \
				  </li> \
				  <li> \
					<a > \
					  This Device \
					  <span class="list__toggle" ng-click="BODY.toggleList($event)"></span> \
					</a> \
					<ul style="display:none"> \
					  <li> \
						<a >Desktop</a> \
						<ul style="display:none"> \
						  <li> \
							<a >Folder 1</a> \
						  </li> \
						</ul> \
					  </li> \
					  <li><a >Documents</a></li> \
					  <li><a >Downloads</a></li> \
					  <li><a >Local Disk  (C:)</a></li> \
					</ul> \
				  </li> \
				</ul> \
			  </div> \
			  <div class="window__main no_padding"> \
				<div class="col-xs-12 ftp__body" > \
					<div ng-include="\'templates/applications/actions-fe-local.html\'" include-replace></div> \
					<div id="local_body" selectable="feB.selection" selectable-list="feB.localFileSystem.currentData | filter:feB.search" selectable-out="selected" selectable-options="{delay:150, filter: \'a\'}" minus-index="2" class="folders" tabindex="0" ng-keydown="feB.handleItemKeyPress($event)" context-menu="feB.localContextMenu"> \
					<div ng-include="\'templates/applications/folders-modal-fe-local.html\'"></div> \
					<div ng-include="\'templates/applications/folders-dropzone-fe-local.html\'"></div> \
					<a ng-if="feB.viewAsList == false"  ng-repeat="file in feB.localFileSystem.currentData | filter:feB.search" ng-class="{\'active\': feB.currentActive == $index}" ng-click="feB.setCurrentActive($index)" ng-dblclick="feB.doWithFile(file)" title="{{::file.filename}}" context-menu="feB.fileContextMenu"> \
					<i class="fa fa-{{::feB.getFileType(file.longname)}}"></i> \
					<span>{{::file.filename}}</span> \
				</a> \
				<table ng-if="feB.viewAsList == true" class="table table-hover"> \
					<thead> \
					<tr> \
					<th>Name</th> \
					<th>Size</th> \
					<th>Type</th> \
					</tr> \
					</thead> \
					<tbody> \
					<tr ng-repeat="file in feB.localFileSystem.currentData | filter:feB.search" ng-class="{\'active\': feB.currentActive == $index}" ng-click="feB.setCurrentActive($index)" ng-dblclick="feB.doWithFile(file)" title="{{::file.filename}}" context-menu="feB.fileContextMenu"> \
					<td><i class="fa fa-{{::feB.getFileType(file.longname)}}"></i> {{::file.filename}}</td> \
				<td>{{::file.attrs.size}}</td> \
				<td>{{::feB.getFileType(file.longname)}}</td> \
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
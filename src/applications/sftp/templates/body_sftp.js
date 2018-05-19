(function () {
	"use strict";
	sftpApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/applications/body-sftp.html',
			'<div class="window__body with_status" ng-controller="sftpBodyController as sftpB"> \
			  <div class="window__side" ng-if="sftpB.viewSide"> \
				<div class="menu__item" ng-repeat="connection in sftpB.connections track by $index" ng-class="{\'active\': connection.uuid == sftpB.activeConnection}" ng-click="sftpB.setActiveConnection(connection)" ng-if="connection != undefined"> \
				  <h5> \
					{{::connection.description}} <small>({{::connection.host}})</small> \
					<i class="fa fa-circle pull-right m-t-f" ng-class="{\'text-danger\': connection.state == \'disconnected\', \'text-success\': connection.state == \'connected\'}"></i> \
				  </h5> \
				</div> \
				<div class="secondary-content__new__box__toggle pointer"> \
				  <div class="secondary-content__new__box__toggle__slide" ng-click="sftpB.toggleSide()"> \
					<i class="fa fa-arrow-left sidebar-open-font open-sidebar"></i> \
				  </div> \
				</div> \
			  </div> \
			  <div class="secondary-content__new__box__toggle toggle_left pointer" ng-if="!sftpB.viewSide" ng-click="sftpB.toggleSide()"> \
				<i class="fa fa-arrow-right sidebar-open-font open-sidebar"></i> \
			  </div> \
			  <div class="window__main no_padding"> \
				<div class="col-xs-6 ftp__body" ng-controller="sftpBodyLocalController as sftpBL"  ng-class="{\'with__stats\': sftpB.viewExchange == true}"> \
				  <div ng-include="\'templates/applications/actions-sftp-explorer-local.html\'" include-replace></div> \
				  <div id="local_body" selectable="sftpBL.selection" selectable-list="sftpBL.localFileSystem.currentData | filter:sftpBL.search" selectable-out="selected" selectable-options="{delay:150, filter: \'a\'}" minus-index="2" class="folders" tabindex="0" ng-keydown="sftpBL.handleItemKeyPress($event)" context-menu="sftpBL.localContextMenu"> \
					<div ng-include="\'templates/applications/folders-modal-sftp-local.html\'"></div> \
					<div ng-include="\'templates/applications/folders-dropzone-sftp-local.html\'"></div> \
					<a ng-if="sftpBL.viewAsList == false"  ng-repeat="file in sftpBL.localFileSystem.currentData | filter:sftpBL.search" ng-class="{\'active\': sftpBL.currentActive == $index}" ng-click="sftpBL.setCurrentActive($index)" ng-dblclick="sftpBL.doWithFile(file)" title="{{::file.filename}}" context-menu="sftpBL.fileContextMenu"> \
					  <i class="fa fa-{{::sftpBL.getFileType(file.longname)}}"></i> \
					  <span>{{::file.filename}}</span> \
					</a> \
					<table ng-if="sftpBL.viewAsList == true" class="table table-hover"> \
					  <thead> \
						<tr> \
						  <th>Name</th> \
						  <th>Size</th> \
						  <th>Type</th> \
						</tr> \
						</thead> \
						<tbody> \
						<tr ng-repeat="file in sftpBL.localFileSystem.currentData | filter:sftpBL.search" ng-class="{\'active\': sftpBL.currentActive == $index}" ng-click="sftpBL.setCurrentActive($index)" ng-dblclick="sftpBL.doWithFile(file)" title="{{::file.filename}}" context-menu="sftpBL.fileContextMenu"> \
						  <td><i class="fa fa-{{::sftpBL.getFileType(file.longname)}}"></i> {{::file.filename}}</td> \
						  <td>{{::file.attrs.size}}</td> \
						  <td>{{::sftpBL.getFileType(file.longname)}}</td> \
						</tr> \
					  </tbody> \
					</table> \
				  </div> \
				</div> \
				<div class="col-xs-6 ftp__body last" ng-class="{\'with__stats\': sftpB.viewExchange == true}"> \
				  <div ng-if="sftpB.showNewConnection != true && sftpB.getActiveConnection().state != \'disconnected\'" ng-controller="sftpBodyServerController as sftpBS"> \
					<div ng-include="\'templates/applications/actions-sftp-explorer-server.html\'" include-replace></div> \
					<div id="server_body" selectable="sftpBS.selection" selectable-list="sftpB.getActiveConnection().currentData | filter:sftpBS.search" selectable-out="selected" selectable-options="{delay:150, filter: \'a\'}" minus-index="1" class="folders" tabindex="1" ng-keydown="sftpBS.handleItemKeyPress($event)" context-menu="sftpBS.serverContextMenu"> \
					  <div ng-include="\'templates/applications/folders-modal-sftp-server.html\'"></div> \
					  <a ng-if="sftpBS.viewAsList == false"  ng-repeat="file in sftpB.getActiveConnection().currentData | filter:sftpBS.search" ng-class="{\'active\': sftpBS.currentActive == $index}" ng-click="sftpBS.setCurrentActive($index)" ng-dblclick="sftpBS.doWithFile(file)" title="{{::file.filename}}" context-menu="sftpBS.fileContextMenu"> \
						<i class="fa fa-{{::sftpBS.getFileType(file.longname)}}"></i> \
						<span>{{::file.filename}}</span> \
					  </a> \
					  <table ng-if="sftpBS.viewAsList == true" class="table table-hover"> \
						<thead> \
						  <tr> \
							<th>Name</th> \
							<th>Size</th> \
							<th>Type</th> \
						  </tr> \
						</thead> \
						<tbody> \
						<tr ng-repeat="file in sftpB.getActiveConnection().currentData | filter:sftpBS.search" ng-class="{\'active\': sftpBS.currentActive == $index}" ng-click="sftpBS.setCurrentActive($index)" ng-dblclick="sftpBS.doWithFile(file)" title="{{::file.filename}}" context-menu="sftpBS.fileContextMenu"> \
						  <td><i class="fa fa-{{::sftpBS.getFileType(file.longname)}}"></i> {{::file.filename}}</td> \
						  <td>{{::file.attrs.size}}</td> \
						  <td>{{::sftpBS.getFileType(file.longname)}}</td> \
						</tr> \
					  </tbody> \
					</table> \
					</div> \
				  </div> \
				  <div ng-if="sftpB.showNewConnection == true || sftpB.getActiveConnection().state == \'disconnected\'"> \
					<div ng-include="\'templates/applications/new-connection-sftp.html\'" include-replace></div> \
				  </div> \
				</div> \
				<div class="window__main__stats" ng-if="sftpB.viewExchange == true"> \
				  <div ng-include="\'templates/applications/exchange-sftp.html\'" include-replace></div> \
				</div> \
			  </div> \
			</div>'
		);

	}]);
}());
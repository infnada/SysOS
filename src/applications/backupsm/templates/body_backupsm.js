(function () {
	"use strict";
	backupsmApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/body-backupsm.html',
			'<div class="window__body" ng-controller="bmBodyController as bmB"> \
			  <div class="window__side" ng-if="bmB.viewSide"> \
				<div class="menu__item" ng-repeat="restore in bmB.restores track by $index" ng-class="{\'active\': restore.uuid == bmB.activeRestore}" ng-click="bmB.setActiveRestore(restore)" ng-if="restore != undefined"> \
				  <h5>{{::restore.restore_name}}<br /><small>{{::restore.snapshot}}</small></h5> \
				</div> \
				<div class="secondary-content__new__box__toggle pointer visible-lg"> \
				  <div class="secondary-content__new__box__toggle__slide" ng-click="bmB.toggleSide()"> \
					<i class="fa fa-arrow-left sidebar-open-font open-sidebar"></i> \
				  </div> \
				</div> \
			  </div> \
			  <div class="secondary-content__new__box__toggle toggle_left pointer visible-lg" ng-if="!bmB.viewSide" ng-click="bmB.toggleSide()"> \
				<i class="fa fa-arrow-right sidebar-open-font open-sidebar"></i> \
			  </div> \
			  <div class="window__main"> \
				<div ng-if="bmB.getActiveRestore().type == \'mount_restore_datastore\'"> \
				  <div ng-if ="bmB.getActiveRestore().status == 2"> \
					<button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredDatastore()">Stop Publishing Datastore</button> \
					<button class="btn btn-primary" type="button" ng-click="bmB.openDatastoreBrowser()">Open Datastore Browser</button> \
				  </div> \
				  Restore status: {{bmB.getActiveRestore().status}} \
				</div> \
				<div ng-if="bmB.getActiveRestore().type == \'restore_datastore_files\'"> \
				  <div ng-if ="bmB.getActiveRestore().status == 2"> \
					<button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredDatastore()">Stop Publishing Datastore</button> \
					<button class="btn btn-primary" type="button" ng-click="bmB.openDatastoreBrowser()">Open Datastore Browser</button> \
				  </div> \
				  Restore status: {{bmB.getActiveRestore().status}} \
				</div> \
				<div ng-if="bmB.getActiveRestore().type == \'restore_vm_guest_files\'"> \
				  Restore status: {{bmB.getActiveRestore().status}} \
				</div> \
				<div ng-if="bmB.getActiveRestore().type == \'vm_instant_recovery\'"> \
				  <div ng-if ="bmB.getActiveRestore().status == 2"> \
					<button class="btn btn-primary" type="button" ng-click="bmB.unpublishRestoredInstantVM()">Stop Publishing Instant VM</button> \
					<button class="btn btn-primary" type="button" ng-click="bmB.migrateInstantVMtoProduction()">Migrate Instant VM to Production</button> \
				  </div> \
				  Restore status: {{bmB.getActiveRestore().status}} \
				</div> \
			  </div> \
			</div>'
		);

	}]);
}());
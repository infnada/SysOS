(function () {
	"use strict";
	backupsmApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/body-backupsm.html',
			'<div class="window__body" ng-controller="bmBodyController as bmB"> \
			  <div class="window__side" ng-if="bmB.viewSide"> \
			    <uib-accordion> \
					<div uib-accordion-group class="panel-success" is-open="true"> \
						<uib-accordion-heading> \
							<i class="fa m-t-f" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-\': !$parent.isOpen}"></i> <i class="fa fa-server m-t-f"></i> Backup Jobs \
						</uib-accordion-heading> \
						<uib-accordion close-others="false"> \
							<div class="menu__item" ng-repeat="restore in bmB.restores track by $index" ng-class="{\'active\': restore.uuid == bmB.activeRestore}" ng-click="bmB.setActiveRestore(restore)" ng-if="restore != undefined"> \
								<span class="p-l-xl"> \
									<h5>{{::restore.restore_name}}<br /><small>{{::restore.snapshot}}</small></h5> \
								</span> \
							</div> \
						</uib-accordion> \
					</div> \
				</uib-accordion> \
				<uib-accordion> \
					<div uib-accordion-group class="panel-success" is-open="true"> \
						<uib-accordion-heading> \
							<i class="fa m-t-f" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-\': !$parent.isOpen}"></i> <i class="fa fa-server m-t-f"></i> Restore Jobs \
						</uib-accordion-heading> \
						<uib-accordion close-others="false"> \
							<div class="menu__item" ng-repeat="restore in bmB.restores track by $index" ng-class="{\'active\': restore.uuid == bmB.activeRestore}" ng-click="bmB.setActiveRestore(restore)" ng-if="restore != undefined"> \
								<span class="p-l-xl"> \
									<h5>{{::restore.restore_name}}<br /><small>{{::restore.snapshot}}</small></h5> \
								</span> \
							</div> \
						</uib-accordion> \
					</div> \
				</uib-accordion> \
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
			    <div ng-if="bmB.showNewBackupType == true"> \
					<div ng-include="\'templates/applications/new-backup-type-backupsm.html\'" include-replace></div> \
				</div> \
				<div ng-if="bmB.showRestore == true"> \
					<div ng-include="\'templates/applications/restore-backupsm.html\'"></div> \
				</div> \
			  </div> \
			</div>'
		);

	}]);
}());
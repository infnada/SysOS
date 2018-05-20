(function () {
	"use strict";
	myApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/desktop/task_bar.html',
			'<start-menu></start-menu> \
			<div class="taskbar" ui-sortable="TB.sortableOptions" ng-model="TB.taskbar_applications"> \
				<a ng-repeat="application in TB.taskbar_applications" class="taskbar__item taskbar__item--{{application.id}}" ng-click="TB.toggleApplication(application.id)" context-menu="TB.appContextMenu(application.id)" ng-class="{\'start--open\' : TB.isStartOpened(application.id), \'taskbar__item--open\' : TB.isItemOpened(application.id), \'taskbar__item--active\' : TB.isItemActive(application.id), \'not-sortable\': application.id == \'start\'}"> \
					<i class="fa fa-{{::TB.getApplicationById(application.id).ico}}"></i> \
				</a> \
				<div class="taskbar__minimize" ng-click="TB.minimizeToDesktop()"></div> \
				<div class="taskbar__tray"> \
					<span class="time">{{TB.time}}</span> \
				</div> \
			</div>'
		);

	}]);
}());

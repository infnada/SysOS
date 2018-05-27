(function () {
	"use strict";
	backupsmApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/new-backup-type-backupsm.html',
			'<div class="main_form"> \
			  <p>Select which kind of Backup you want to perform</p> \
			  <table class="table table-hover m-t-xl"> \
				<tbody> \
				  <tr class="cursor-pointer" ng-click="smB.newBackup(\'netapp\')"> \
					<th class="col-sm-2 p-m"><img src="/img/netapp.png" width="75px"></th> \
					<td class="lh-2">Creates a NetApp SnapShot with posterior SnapMirror or SnapVault</td> \
				  </tr> \
				  <tr class="cursor-pointer" ng-click="smB.newConnection(\'mariadb\')"> \
					<th class="col-sm-2 p-m"><img src="/img/mariadb.png" width="75px"></th> \
					<td class="lh-2">Creates a MySQL/MariaDB Database backup</td> \
				  </tr> \
				</tbody> \
			  </table> \
			</div>'
		);

	}]);
}());

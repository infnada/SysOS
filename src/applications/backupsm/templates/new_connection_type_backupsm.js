(function () {
	"use strict";
	backupsmApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/new-connection-type-backupsm.html',
			'<div class="main_form"> \
			  <p>Select the type of server you want to register with managed infrastructure. All registred servers can be found under the Manager servers node on the Infrastructure tab.</p> \
			  <table class="table table-hover m-t-xl"> \
			  </table> \
			</div>'
		);

	}]);
}());
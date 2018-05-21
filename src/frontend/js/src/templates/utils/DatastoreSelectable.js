(function () {
	"use strict";
	myApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/utils/DatastoreSelectable.html',
			'<div class="modal-header"> \
			  <div class="modal-title" id="modal-title">{{title}}</div> \
			</div> \
			<div class="modal-body" id="modal-body"> \
			  <div class="form-group"> \
				<div class="col-sm-12"> \
				  <select class="form-control" ng-options="datastore as datastore.host + \' - \' + datastore.name for datastore in text | orderBy:[\'host\',\'name\']" ng-model="selectedDatastore"> \
					<option value="">-- Select a managed Datastore --</option> \
				  </select> \
				</div> \
			  </div> \
			</div> \
			<div class="modal-footer"> \
			  <button class="btn btn-primary" type="button" ng-click="selectDatastore()">Select</button> \
			</div>'
		);

	}]);
}());

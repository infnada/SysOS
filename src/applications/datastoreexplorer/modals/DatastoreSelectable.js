(function () {
	"use strict";
    datastoreexplorerApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('applications/datastoreexplorer/modals/DatastoreSelectable.html',
			'<div class="modal-header"> \
			  <div class="modal-title" id="modal-title">{{dsmC.title}}</div> \
			</div> \
			<div class="modal-body" id="modal-body"> \
			  <div class="form-group"> \
				<div class="col-sm-12"> \
				  <select class="form-control" ng-options="datastore as datastore.host + \' - \' + datastore.name for datastore in dsmC.datastores | orderBy:[\'host\',\'name\']" ng-model="dsmC.selectedDatastore"> \
					<option value="">-- Select a managed Datastore --</option> \
				  </select> \
				</div> \
			  </div> \
			</div> \
			<div class="modal-footer"> \
			  <button class="btn btn-primary" type="button" ng-click="dsmC.selectDatastore()">Select</button> \
			</div>'
		);

	}]);
}());

(function () {
	"use strict";
	datastoreexplorerApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/applications/folders-modal-de-local.html',
			'<div class="folders-modal" ng-if="deB.showModal" ng-switch="deB.modalType"> \
			  <h3>{{deB.modalType}}</h3> \
			  <input ng-switch-when="Download from url" type="text" class="form-control" set-focus ng-model="deB.fileUrl" placeholder="Enter url" ng-keydown="deB.handleKeyPress($event)"> \
			  <input ng-switch-when="Rename" type="text" class="form-control" set-focus ng-model="deB.modalInputName" placeholder="Enter new name" ng-keydown="deB.handleKeyPress($event)"> \
			  <input ng-switch-when="Create Folder" type="text" class="form-control" set-focus ng-model="deB.modalInputName" placeholder="Enter folder Name" ng-keydown="deB.handleKeyPress($event)"> \
			  <div ng-switch-when="Delete File"> \
				<span>Delete confirmation for file {{deB.modalInputName}}</span><br /> \
				<button type="button" class="btn btn-primary" set-focus ng-keydown="deB.handleKeyPress($event)" ng-click="deB.deleteSelected()">Delete</button> \
				<button type="button" class="btn" ng-click="deB.showModal = !deB.showModal; deB.resetActive()">Cancel</button> \
			  </div> \
			</div>'
		);

	}]);
}());
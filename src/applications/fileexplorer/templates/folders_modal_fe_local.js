(function () {
	"use strict";
	fileexplorerApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/applications/folders-modal-fe-local.html',
			'<div class="folders-modal" ng-if="feB.showModal" ng-switch="feB.modalType"> \
			  <h3>{{feB.modalType}}</h3> \
			  <input ng-switch-when="Download from url" type="text" class="form-control" set-focus ng-model="feB.fileUrl" placeholder="Enter url" ng-keydown="feB.handleKeyPress($event)"> \
			  <input ng-switch-when="Rename" type="text" class="form-control" set-focus ng-model="feB.modalInputName" placeholder="Enter new name" ng-keydown="feB.handleKeyPress($event)"> \
			  <input ng-switch-when="Create Folder" type="text" class="form-control" set-focus ng-model="feB.modalInputName" placeholder="Enter folder Name" ng-keydown="feB.handleKeyPress($event)"> \
			  <div ng-switch-when="Delete File"> \
				<span>Delete confirmation for file {{feB.modalInputName}}</span><br /> \
				<button type="button" class="btn btn-primary" set-focus ng-keydown="feB.handleKeyPress($event)" ng-click="feB.deleteSelected()">Delete</button> \
				<button type="button" class="btn" ng-click="feB.showModal = !feB.showModal; feB.resetActive()">Cancel</button> \
			  </div> \
			</div>'
		);

	}]);
}());
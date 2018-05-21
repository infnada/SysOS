(function () {
	"use strict";
	myApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/utils/input.html',
			'<div class="modal-header"> \
			  <div class="modal-title" id="modal-title">{{title}}</div> \
			</div> \
			<div class="modal-body" id="modal-body"> \
			  <input type="text" class="form-control" set-focus placeholder="{{::text}}" ng-model="inputValue" /> \
			</div> \
			<div class="modal-footer"> \
			  <button class="btn btn-primary" type="button" ng-click="no()">Cancel</button> \
			  <button class="btn btn-default" type="button" ng-click="yes_input()">{{::button_text}}</button> \
			</div>'
		);

	}]);
}());

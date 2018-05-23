(function () {
	"use strict";
	cmanagerApp.run(['$templateCache', function($templateCache) {

		$templateCache.put('templates/applications/body-cmanager.html',
			'<div class="window__body with_status" ng-controller="cmanagerBodyController as cmanagerB"> \
			  <div class="window__side" ng-if="cmanagerB.viewSide"> \
				<div class="menu__item" ng-repeat="credential in cmanagerB.credentials track by $index" ng-class="{\'active\': credential.uuid == cmanagerB.activeCredential}" ng-click="cmanagerB.setActiveCredential(credential)" ng-if="credential != undefined"> \
				  <h5> \
					{{credential.description}} <small>({{credential.username}})</small> \
				  </h5> \
				</div> \
				<div class="secondary-content__new__box__toggle pointer visible-lg"> \
				  <div class="secondary-content__new__box__toggle__slide" ng-click="cmanagerB.toggleSide()"> \
					<i class="fa fa-arrow-left sidebar-open-font open-sidebar"></i> \
				  </div> \
				</div> \
			  </div> \
			  <div class="secondary-content__new__box__toggle toggle_left pointer visible-lg" ng-if="!cmanagerB.viewSide" ng-click="cmanagerB.toggleSide()"> \
				<i class="fa fa-arrow-right sidebar-open-font open-sidebar"></i> \
			  </div> \
			  <div class="window__main no_padding"> \
				<div> \
				  <form class="main_form form-horizontal" name="cmanagerCredential_form" ng-submit="cmanagerB.sendSave(cmanagerCredential_form)"> \
					<div class="form-group"> \
					  <div class="col-sm-12"> \
						<input type="text" class="form-control" name="inputDescription" placeholder="Description" ng-model="cmanagerB.Form.description" required> \
					  </div> \
					  <div class="col-sm-12" ng-show="cmanagerCredential_form.inputDescription.$invalid && cmanagerB.cmanagerCredential_form.submitted"> \
						<small class="text-danger pull-left" ng-show="cmanagerCredential_form.inputDescription.$error.required">Please insert a description</small> \
					  </div> \
					</div> \
					<div class="form-group"> \
					  <div class="col-sm-12"> \
						<input type="text" class="form-control" name="inputUsername" placeholder="Username" ng-model="cmanagerB.Form.username" required> \
					  </div> \
					  <div class="col-sm-12" ng-show="cmanagerCredential_form.inputUsername.$invalid && cmanagerB.cmanagerCredential_form.submitted"> \
						<small class="text-danger pull-left" ng-show="cmanagerCredential_form.inputUsername.$error.required">Please insert an username</small> \
					  </div> \
					</div> \
					<div class="form-group"> \
					  <div class="col-sm-12"> \
						<input type="password" class="form-control" name="inputPassword" placeholder="Password" ng-model="cmanagerB.Form.password" required> \
					  </div> \
					  <div class="col-sm-12" ng-show="cmanagerCredential_form.inputPassword.$invalid && cmanagerB.cmanagerCredential_form.submitted"> \
						<small class="text-danger pull-left" ng-show="cmanagerCredential_form.inputPassword.$error.required">Please insert a password</small> \
					  </div> \
					</div> \
					<div> \
					  <button type="submit" class="btn btn-default">Save</button> \
					</div> \
				  </form>\
				</div> \
			  </div> \
			</div>'
		);

	}]);
}());
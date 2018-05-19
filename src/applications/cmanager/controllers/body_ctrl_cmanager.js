(function () {
	"use strict";
	cmanagerApp.controller('cmanagerBodyController', ['$scope', 'cmanagerFactory', 'ServerFactory', function ($scope, cmanagerFactory, ServerFactory) {

		var _this = this;

		/*
		 * Bindings
		 */
		this.viewSide = true;
		this.resizeId;

		this.Form = {};
		this.cmanagerCredential_form = {};

		$scope.$watch(function(){
			return cmanagerFactory.credentials();
		}, function(newValue, oldValue){
			_this.credentials = newValue;
		});

		$scope.$watch(function(){
			return cmanagerFactory.activeCredential();
		}, function(newValue){
			_this.activeCredential = newValue;
		});

		/*
		 * Called at cmanagerActionController
		 */
		$scope.$on('cmanager__new_credential', function(event) {
			cmanagerFactory.setActiveCredential(null);
			_this.Form = {};
			_this.cmanagerCredential_form = {};
		});

		/*
		 * Called at cmanagerActionController
		 */
		$scope.$on('cmanager__delete_credential', function(event) {
			cmanagerFactory.deleteCredential(_this.activeCredential);
			_this.Form = {};
			_this.cmanagerCredential_form = {};
		});


		/*
		 * ng-click functions
		 */
		this.toggleSide = function () {
			_this.viewSide = !_this.viewSide;
		};

		this.sendSave = function (cmanagerCredential_form) {
			_this.cmanagerCredential_form.submitted = true;

			if (cmanagerCredential_form.$valid) {
				_this.cmanagerCredential_form.submitted = false;
				cmanagerFactory.saveCredential(_this.Form);
				_this.Form = {};
				_this.cmanagerCredential_form = {};
			}
		};

		this.setActiveCredential = function (credential) {
			cmanagerFactory.setActiveCredential(credential.uuid);
			_this.Form = angular.copy(credential);
		};

	}]);
}());
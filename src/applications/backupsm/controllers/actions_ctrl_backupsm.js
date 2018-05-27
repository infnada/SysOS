(function () {
	"use strict";
	backupsmApp.controller('bmActionController', ['$scope', function ($scope) {

		var _this = this;
		var APPscope = $scope.$parent.$parent.$parent.$parent;

		/*
	     * ng-click functions
	     */
		this.newRestore = function () {
			APPscope.$broadcast('backupsm__new_restore');
		};

	}]);
}());
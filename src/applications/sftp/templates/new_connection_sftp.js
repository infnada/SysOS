(function () {
	"use strict";
	sftpApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/applications/new-connection-sftp.html',
			'<form class="main_form form-horizontal" name="sftpConnect_form" ng-submit="sftpB.sendConnect(sftpConnect_form)"> \
			  <div class="form-group"> \
				<div class="col-sm-12"> \
				  <input type="text" class="form-control" name="inputDescription" placeholder="Description" ng-model="sftpB.Form.description"> \
				</div> \
			  </div> \
			  <div class="form-group"> \
				<div class="col-sm-12"> \
				  <input type="text" class="form-control" name="inputHost" placeholder="Host" ng-model="sftpB.Form.host" required> \
				</div> \
				<div class="col-sm-12" ng-show="sftpConnect_form.inputHost.$invalid && sftpB.sftpConnect_form.submitted"> \
				  <small class="text-danger pull-left" ng-show="sftpConnect_form.inputHost.$error.required">Please insert a host</small> \
				</div> \
			  </div> \
			  <div class="form-group"> \
				<div class="col-sm-12"> \
				  <select class="form-control" ng-options="credential.uuid as credential.description + \' - \' + credential.username for credential in sftpB.credentials" ng-model="sftpB.Form.credential"> \
					<option value="">-- Select Credential --</option> \
				  </select> \
				</div> \
				<div class="col-sm-12"> \
				  <small class="pull-left text-primary cursor-pointer" ng-click="sftpB.manageCredentials()">Manage Credentials</small> \
				</div> \
			  </div> \
			  <div class="form-group"> \
				<div class="col-sm-12"> \
					Save Connection in config file \
					<switch class="pull-right" name="save" ng-model="sftpB.Form.save" on="on" off="off"></switch> \
				</div> \
			</div> \
			<div class="form-group" ng-if="sftpB.Form.save"> \
				<div class="col-sm-12"> \
					Auto Login \
					<switch class="pull-right" name="autologin" ng-model="sftpB.Form.autologin" on="on" off="off"></switch> \
				</div> \
			</div> \
			  <div> \
				<button type="button" class="btn btn-default" ng-if="sftpB.Form.save">Save</button> \
				<button type="submit" class="btn btn-primary">Connect</button> \
			  </div> \
			</form>'
		);

	}]);
}());
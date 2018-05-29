(function () {
    'use strict';
    smanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/new-connection-smanager.html',
            '<form class="main_form form-horizontal" name="smanagerConnect_form" ng-submit="smB.sendConnect(smanagerConnect_form)"> \
              <div class="form-group"> \
                <div class="col-sm-12"> \
                  <input type="text" class="form-control" name="inputDescription" placeholder="Description" ng-model="smB.Form.description"> \
                </div> \
              </div> \
              <div class="form-group"> \
                <div class="col-sm-12"> \
                  <input type="text" class="form-control" name="inputHost" placeholder="Host" ng-model="smB.Form.host" required> \
                </div> \
                <div class="col-sm-12" ng-show="smanagerConnect_form.inputHost.$invalid && smB.smanagerConnect_form.submitted"> \
                  <small class="text-danger pull-left" ng-show="smanagerConnect_form.inputHost.$error.required">Please insert a host</small> \
                </div> \
              </div> \
              <div class="form-group" ng-if="smB.Form.so != \'snmp\'"> \
                <div class="col-sm-12"> \
                  <select class="form-control" ng-options="credential.uuid as credential.description + \' - \' + credential.username for credential in smB.credentials" ng-model="smB.Form.credential"> \
                    <option value="">-- Select Credential --</option> \
                  </select> \
                </div> \
                <div class="col-sm-12"> \
                  <small class="pull-left text-primary cursor-pointer" ng-click="smB.manageCredentials(); $event.stopPropagation();">Manage Credentials</small> \
                </div> \
              </div> \
              <div class="form-group" ng-if="smB.Form.so != \'windows\'"> \
                <div class="col-sm-12"> \
                  <input type="text" class="form-control" name="inputPort" placeholder="Port" ng-model="smB.Form.port" required> \
                </div> \
                <div class="col-sm-12"> \
                  <small ng-if="smB.Form.so == \'vmware\'" class="pull-left">Default VMware web service port is 443. If connection cannot be established, check for possible port customization in the vCenter Server or ESX(i) server settings</small> \
                  <small ng-if="smB.Form.so == \'linux\'"" class="pull-left">Default SSH service port is 22. If connection cannot be established, check for possible port customization in the SSH service settings</small> \
                </div> \
              </div> \
              <div class="form-group" ng-if="smB.Form.save && smB.Form.so != \'vmware\' && smB.Form.so != \'netapp\'"> \
                <div class="col-sm-12"> \
                  Save Connection in config file \
                  <switch class="pull-right" name="save" ng-model="smB.Form.save" on="on" off="off"></switch> \
                </div> \
              </div> \
              <div class="form-group" ng-if="smB.Form.so != \'snmp\' && smB.Form.so != \'vmware\' && smB.Form.so != \'netapp\'"> \
                <div class="col-sm-12"> \
                  Auto Login \
                  <switch class="pull-right" name="autologin" ng-model="smB.Form.autologin" on="on" off="off"></switch> \
                </div> \
              </div> \
              <div> \
                <button type="button" class="btn btn-default" ng-if="smB.Form.save" ng-click="smB.saveConnection()">Save</button> \
                <button type="button" class="btn btn-primary" ng-if="smB.Form.uuid" ng-click="smB.saveConnection(); smB.refreshConnection(smB.Form)">Save & Rescan</button> \
                <button type="submit" class="btn btn-primary" ng-if="!smB.Form.uuid" ng-disabled="smB.getActiveConnection().type == \'connected\'">Connect</button> \
              </div> \
            </form>'
        );

    }]);
}());

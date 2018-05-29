(function () {
    'use strict';
    sshApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/body-ssh.html',
            '<div class="window__body with_status" ng-controller="sshBodyController as sshB"> \
              <div class="window__side" ng-if="sshB.viewSide"> \
                <div class="menu__item" ng-repeat="connection in sshB.connections track by $index" ng-class="{\'active\': connection.uuid == sshB.activeConnection}" ng-click="sshB.setActiveConnection(connection)" ng-if="connection != undefined"> \
                  <h5> \
                    {{::connection.description}} <small>({{::connection.host}})</small> \
                    <i class="fa fa-circle pull-right m-t-f" ng-class="{\'text-danger\': connection.state == \'disconnected\', \'text-success\': connection.state == \'connected\'}"></i> \
                  </h5> \
                </div> \
                <div class="secondary-content__new__box__toggle pointer visible-lg"> \
                  <div class="secondary-content__new__box__toggle__slide" ng-click="sshB.toggleSide()"> \
                    <i class="fa fa-arrow-left sidebar-open-font open-sidebar"></i> \
                  </div> \
                </div> \
              </div> \
              <div class="secondary-content__new__box__toggle toggle_left pointer visible-lg" ng-if="!sshB.viewSide" ng-click="sshB.toggleSide()"> \
                <i class="fa fa-arrow-right sidebar-open-font open-sidebar"></i> \
              </div> \
              <div class="window__main no_padding"> \
                <div ng-if="sshB.showNewConnection == true || sshB.getActiveConnection().state == \'disconnected\'"> \
                  <form class="main_form form-horizontal" name="sshConnect_form" ng-submit="sshB.sendConnect(sshConnect_form)"> \
                    <div class="form-group"> \
                      <div class="col-sm-12"> \
                        <input type="text" class="form-control" name="inputDescription" placeholder="Description" ng-model="sshB.Form.description"> \
                      </div> \
                    </div> \
                    <div class="form-group"> \
                      <div class="col-sm-12"> \
                        <input type="text" class="form-control" name="inputHost" placeholder="Host" ng-model="sshB.Form.host" required> \
                      </div> \
                      <div class="col-sm-12" ng-show="sshConnect_form.inputHost.$invalid && sshB.sshConnect_form.submitted"> \
                        <small class="text-danger pull-left" ng-show="sshConnect_form.inputHost.$error.required">Please insert a host</small> \
                      </div> \
                    </div> \
                    <div class="form-group"> \
                      <div class="col-sm-12"> \
                        <select class="form-control" ng-options="credential.uuid as credential.description + \' - \' + credential.username for credential in sshB.credentials" ng-model="sshB.Form.credential"> \
                          <option value="">-- Select Credential --</option> \
                        </select> \
                      </div> \
                      <div class="col-sm-12"> \
                        <small class="pull-left text-primary cursor-pointer" ng-click="sshB.manageCredentials(); $event.stopPropagation();">Manage Credentials</small> \
                      </div> \
                    </div> \
                    <div class="form-group"> \
                      <div class="col-sm-12"> \
                        Save Connection in config file \
                        <switch class="pull-right" name="save" ng-model="sshB.Form.save" on="on" off="off"></switch> \
                      </div> \
                    </div> \
                    <div class="form-group" ng-if="sshB.Form.save"> \
                      <div class="col-sm-12"> \
                        Auto Login \
                        <switch class="pull-right" name="autologin" ng-model="sshB.Form.autologin" on="on" off="off"></switch> \
                      </div> \
                    </div> \
                    <div> \
                      <button type="button" class="btn btn-default" ng-if="sshB.Form.save">Save</button> \
                      <button type="submit" class="btn btn-primary">Connect</button> \
                    </div> \
                  </form>\
                </div> \
                <div class="fill" ng-repeat="connection in sshB.connections" ng-show="sshB.activeConnection == connection.uuid && sshB.showNewConnection != true"> \
                  <div class="fill" ng-show="sshB.showNewConnection == false"> \
                    <div id="terminal-container-{{connection.uuid}}" class="terminal-container terminal"></div> \
                  </div> \
                </div> \
              </div> \
            </div>'
        );

    }]);
}());
(function () {
  "use strict";
  smanagerApp.run(['$templateCache', function($templateCache) {

    $templateCache.put('templates/applications/configure-connection-smanager.html',
      '<form class="application_smanager__form form-horizontal" name="smanagerConfiguration_form" ng-submit="smB.sendConfiguration(smanagerConfiguration_form)"> \
        <div ng-if="smB.getActiveConnection().so == \'linux\'"> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Get CPU status \
              <switch class="pull-right" name="save" ng-model="smB.cfgForm.cpu" on="on" off="off"></switch> \
            </div> \
          </div> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Get Memory status \
              <switch class="pull-right" name="save" ng-model="smB.cfgForm.mem" on="on" off="off"></switch> \
            </div> \
          </div> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Get Disk status \
              <switch class="pull-right" name="save" ng-model="smB.cfgForm.disk" on="on" off="off"></switch> \
            </div> \
          </div> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Get Kernel version \
              <switch class="pull-right" name="save" ng-model="smB.cfgForm.kernel" on="on" off="off"></switch> \
            </div> \
          </div> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Get Release version \
              <switch class="pull-right" name="autologin" ng-model="smB.cfgForm.release" on="on" off="off"></switch> \
            </div> \
          </div> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Get Updates status \
              <switch class="pull-right" name="autologin" ng-model="smB.cfgForm.updates" on="on" off="off"></switch> \
            </div> \
          </div> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Get Processes status \
              <switch class="pull-right" name="autologin" ng-model="smB.cfgForm.processes" on="on" off="off"></switch> \
            </div> \
          </div> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Get Network status \
              <switch class="pull-right" name="autologin" ng-model="smB.cfgForm.network" on="on" off="off"></switch> \
            </div> \
          </div> \
          <div class="form-group"> \
            <div class="col-sm-12"> \
              Do Ping \
              <switch class="pull-right" name="autologin" ng-model="smB.cfgForm.ping" on="on" off="off"></switch> \
            </div> \
          </div> \
        </div> \
        <div ng-if="smB.getActiveConnection().so == \'snmp\'"> \
        </div> \
        <div> \
          <button type="button" class="btn btn-default">Save</button> \
        </div> \
      </form>'
    );

  }]);
}());

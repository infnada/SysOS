(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/recoveryWizard.html',
      '<div class="modal-header"> \
        <div class="modal-title" id="modal-title">{{wmC.title}}</div> \
      </div> \
      <div class="modal-body modal-recovery-wizard" id="modal-body"> \
        <div class="wizard"> \
          <ul class="nav nav-wizard"> \
            <li ng-class="{\'active\': wmC.step == 1}"> \
              <a ng-click="wmC.step = 1">Recovery Mode</a> \
            </li> \
            <li ng-class="{\'active\': wmC.step == 2}"> \
              <a ng-click="wmC.step = 2">Destination</a> \
            </li> \
            <li ng-class="{\'active\': wmC.step == 3}"> \
              <a ng-click="wmC.step = 3">Ready To apply</a> \
            </li> \
          </ul> \
          <form> \
            <div class="tab-content"> \
              <div class="tab-pane active" ng-if="wmC.step == 1" ng-class="{\'active\': wmC.step == 1}"> \
                <table class="table table-hover m-t-xl"> \
                 <tbody> \
                    <tr class="cursor-pointer"> \
                       <th class="col-sm-1"><input type="checkbox" name="restore"></th> \
                       <td class="lh-2"><h5>Restore to the original location</h5>Quickly initiate restore of selected VMs to the original location, and with the original name and settings. This option minimizes the chance of user input error.</td> \
                    </tr> \
                    <tr class="cursor-pointer"> \
                       <th class="col-sm-1"><input type="checkbox" name="restore"></th> \
                       <td class="lh-2"><h5>Restore to a new location, or with different settings</h5>Customize restored VM location, and change its settings. The wizard will automatically populate all controls with the original VM settings as the default settings.</td> \
                    </tr> \
                 </tbody> \
              </table> \
              </div> \
              <div class="tab-pane" ng-if="wmC.step == 2" ng-class="{\'active\': wmC.step == 2}"> \
                <div class="form-group"> \
                  <div class="col-sm-12"> \
                    <select class="form-control" ng-options="host as host.name for host in wmC.data.ESXihosts" ng-model="wmC.selectedHost" ng-change="wmC.loadESXidata()"> \
                      <option value="">-- Select a managed ESXi host --</option> \
                    </select> \
                  </div> \
                </div> \
                <div class="form-group"> \
                  <div class="col-sm-12"> \
                    <select class="form-control" ng-options="folder as folder.name for folder in wmC.data.folders" ng-model="wmC.selectedFolder"> \
                      <option value="">-- Select a VM folder --</option> \
                    </select> \
                  </div> \
                </div> \
                <div class="form-group"> \
                  <div class="col-sm-12"> \
                    <select class="form-control" ng-options="pool as pool.name for pool in wmC.data.resource_pools" ng-model="wmC.selectedPool"> \
                      <option value="">-- Select a Resource Pool --</option> \
                    </select> \
                  </div> \
                </div> \
                <div class="form-group"> \
                  <div class="col-sm-12"> \
                    <input class="form-control" type="text" placeholder="Select a VM name" ng-model="wmC.vmName" required> \
                  </div> \
                </div> \
                <div class="form-group"> \
                  <div class="col-sm-12"> \
                    Power ON VM \
                    <switch class="pull-right" name="powerON" ng-model="wmC.powerVM" on="on" off="off"></switch> \
                  </div> \
                </div> \
              </div> \
              <div class="tab-pane" ng-if="wmC.step == 3" ng-class="{\'active\': wmC.step == 3}"> \
                <h5> \
                  Instant VM recovery settings: \
                </h5> \
                <ul> \
                  <li>VM: {{wmC.data.vm.name}} from <strong>{{wmC.data.snapshot}}</strong></li> \
                  <li>Original Datastore: {{wmC.data.volume}}</li> \
                  <li>Host: {{wmC.selectedHost.name}}</li> \
                  <li>New VM name: {{wmC.vmName}}</li> \
                  <li>Power ON VM: {{wmC.powerVM}}</li> \
                </ul> \
                <p> \
                  After you click Restore, the selected VM will be instantly recovered into your production environment. To finalize the recovery use Storage VMotion to move running VM to the production storage.<br/> \
                  Alternatively, you can perform cold VM migration during your next maintenance window. \
                </p> \
                <p> \
                  If you are performing manual recovery testing, remember to change VM network to non-production before powering on the VM. \
                </p> \
              </div> \
              <div class="clearfix"></div> \
            </div> \
          </form> \
        </div> \
      </div> \
      <div class="modal-footer"> \
        <button class="btn btn-primary" type="button" ng-if="wmC.step == 1" ng-click="wmC.step = 2">Next</button> \
        <button class="btn btn-primary" type="button" ng-if="wmC.step == 2" ng-click="wmC.step = 3">Next</button> \
        <button class="btn btn-primary" type="button" ng-if="wmC.step == 3" ng-click="wmC.selectData()">Restore</button> \
      </div>'
    );

  }]);
}());

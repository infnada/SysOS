(function () {
    'use strict';
    smanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/snapshot-type-smanager.html',
            '<div class="row"> \
              <div class="col-lg-12"> \
                <table class="table table-hover"> \
                  <thead> \
                    <tr> \
                      <th scope="col">Name</th> \
                      <th scope="col">Host</th> \
                      <th scope="col">State</th> \
                      <th scope="col">Size</th> \
                    </tr> \
                  </thead> \
                  <tbody> \
                    <tr class="cursor-pointer" ng-repeat="vm in smB.getActiveConnection().vms | orderBy:\'name\'" context-menu="smB.snapshotVMContextMenu"> \
                      <th class="col-sm-4"><i class="vs-icon p-l-sm vsphere-icon-vm"></i> {{::vm.name}}</th> \
                      <td class="col-sm-4">{{::vm.host}}</td> \
                      <td class="col-sm-2">{{::vm.state}}</td> \
                      <td class="col-sm-2">{{::vm.size}}</td> \
                    </tr> \
                  </tbody> \
                </table> \
              </div> \
            </div>'
        );

    }]);
}());

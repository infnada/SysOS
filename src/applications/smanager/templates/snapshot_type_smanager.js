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
                      <th class="col-sm-4">{{::vm.name}}</th> \
                      <td class="col-sm-4">< Unknown ></td> \
                      <td class="col-sm-2">< Unknown ></td> \
                      <td class="col-sm-2">< Unknown ></td> \
                    </tr> \
                  </tbody> \
                </table> \
              </div> \
            </div>'
        );

    }]);
}());

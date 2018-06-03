(function () {
    'use strict';
    backupsmApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('applications/backupsm/modals/ESXiSelectable.html',
            '<div class="modal-header"> \
              <div class="modal-title" id="modal-title">{{esmC.title}}</div> \
              <div class="window__controls window__controls--right"><a class="window__close" ng-click="esmC.close(); $event.stopPropagation();"><i class="fa fa-close"></i></a></div> \
            </div> \
            <div class="modal-body" id="modal-body"> \
              <hr class="hr-text" data-content="Select an ESXi host"> \
              <div class="form-group"> \
                <div class="col-sm-12"> \
                  <select class="form-control" ng-options="host as host.name for host in esmC.ESXihosts" ng-model="esmC.selectedHost"> \
                    <option value="">-- Select a managed ESXi host --</option> \
                  </select> \
                </div> \
              </div> \
            </div> \
            <div class="modal-footer"> \
              <button class="btn btn-primary" type="button" ng-click="esmC.selectESXihost()">Select</button> \
            </div>'
        );

    }]);
}());

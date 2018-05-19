(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/ESXiSelectable.html',
      '<div class="modal-header"> \
        <div class="modal-title" id="modal-title">{{title}}</div> \
      </div> \
      <div class="modal-body" id="modal-body"> \
        <div class="form-group"> \
          <div class="col-sm-12"> \
            <select class="form-control" ng-options="host as host.name for host in text" ng-model="selectedHost"> \
              <option value="">-- Select a managed ESXi host --</option> \
            </select> \
          </div> \
        </div> \
      </div> \
      <div class="modal-footer"> \
        <button class="btn btn-primary" type="button" ng-click="selectESXihost()">Select</button> \
      </div>'
    );

  }]);
}());

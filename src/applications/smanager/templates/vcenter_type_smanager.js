(function () {
  "use strict";
  smanagerApp.run(['$templateCache', function($templateCache) {

    $templateCache.put('templates/applications/vcenter-type-smanager.html',
      '<div class="row"> \
        <div class="col-lg-12"> \
          <div class="col-sm-4">{{smB.getActiveConnection()}}</div> \
        </div> \
      </div>'
    );

  }]);
}());

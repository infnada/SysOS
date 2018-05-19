(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/applications/status.html',
      '<div ng-if="STATUS.app.status == true" ng-include="\'templates/applications/status-\' + STATUS.app.id + \'.html\'" include-replace></div>'
    );

  }]);
}());

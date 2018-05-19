(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/applications/actions.html',
      '<div ng-if="ACTIONS.app.actions == true" ng-include="\'templates/applications/actions-\' + ACTIONS.app.id + \'.html\'" include-replace></div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/applications/body.html',
      '<div ng-include="\'templates/applications/body-\' + BODY.app.id + \'.html\'" include-replace></div>'
    );

  }]);
}());

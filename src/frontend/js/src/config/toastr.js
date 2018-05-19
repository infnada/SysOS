(function () {
  "use strict";
  myApp.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
      progressBar: true,
      tapToDismiss: true,
      timeOut: 10000,
    });
  });
}());

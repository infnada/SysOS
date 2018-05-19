(function () {
  "use strict";
  myApp.directive('setFocus', [function () {
    return {
      link: function(scope, element) {
        element[0].focus();
      }
    };
  }]);
}());

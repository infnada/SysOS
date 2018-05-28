(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/modal.html',
      '<div class="modal-header">\n' +
      ' <div class="modal-title" id="modal-title">{{pmC.title}}</div>\n' +
      '</div>\n' +
      '<div class="modal-body" id="modal-body">\n' +
      ' <span>\n' +
      '   {{pmC.text}}\n' +
      ' </span>\n' +
      '</div>'
    );

  }]);
}());

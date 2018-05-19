(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/modal.html',
      '<div class="modal-header">\n' +
      ' <div class="modal-title" id="modal-title">{{title}}</div>\n' +
      '</div>\n' +
      '<div class="modal-body" id="modal-body">\n' +
      ' <span>\n' +
      '   {{text}}\n' +
      ' </span>\n' +
      '</div>'
    );

  }]);
}());

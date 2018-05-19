(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/question.html',
      '<div class="modal-header"> \
        <div class="modal-title" id="modal-title">{{title}}</div> \
      </div> \
      <div class="modal-body" id="modal-body"> \
        {{::text}} \
      </div> \
      <div class="modal-footer"> \
        <button class="btn btn-primary" type="button" ng-click="no()">No</button> \
        <button class="btn btn-default" type="button" ng-click="yes()">Yes</button> \
      </div>'
    );

  }]);
}());

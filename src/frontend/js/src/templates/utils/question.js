(function () {
    'use strict';
    SysOS.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/utils/question.html',
            '<div class="modal-header"> \
              <div class="modal-title" id="modal-title">{{qmC.title}}</div> \
              <div class="window__controls window__controls--right"><a class="window__close" ng-click="qmC.close(); $event.stopPropagation();"><i class="fa fa-close"></i></a></div> \
            </div> \
            <div class="modal-body" id="modal-body"> \
              {{::qmC.text}} \
            </div> \
            <div class="modal-footer"> \
              <button class="btn btn-primary" type="button" ng-click="qmC.no()">No</button> \
              <button class="btn btn-default" type="button" ng-click="qmC.yes()">Yes</button> \
            </div>'
        );

    }]);
}());

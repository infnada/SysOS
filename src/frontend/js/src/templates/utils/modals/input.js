(function () {
    'use strict';
    SysOS.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/utils/modals/input.html',
            '<div class="modal-header"> \
              <div class="modal-title" id="modal-title">{{imC.title}}</div> \
              <div class="window__controls window__controls--right"><a class="window__close" ng-click="imC.close(); $event.stopPropagation();"><i class="fa fa-close"></i></a></div> \
            </div> \
            <div class="modal-body" id="modal-body"> \
              <input type="text" class="form-control" set-focus placeholder="{{::imC.text}}" ng-model="imC.inputValue" /> \
            </div> \
            <div class="modal-footer"> \
              <button class="btn btn-primary" type="button" ng-click="imC.no()" autofocus>Cancel</button> \
              <button class="btn btn-default" type="button" ng-click="imC.yes()">{{::imC.button_text}}</button> \
            </div>'
        );

    }]);
}());

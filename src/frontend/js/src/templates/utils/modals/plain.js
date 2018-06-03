(function () {
    'use strict';
    SysOS.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/utils/modals/plain.html',
            '<div class="modal-header">\n' +
            ' <div class="modal-title" id="modal-title">{{pmC.title}}</div>\n' +
            ' <div class="window__controls window__controls--right"><a class="window__close" ng-click="pmC.close(); $event.stopPropagation();"><i class="fa fa-close"></i></a></div>\n' +
            '</div>\n' +
            '<div class="modal-body" id="modal-body">\n' +
            ' <span>\n' +
            '   {{pmC.text}}\n' +
            ' </span>\n' +
            '</div>'
        );

    }]);
}());

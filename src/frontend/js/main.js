$(window).on('load', function () {
    var $container = $('.start-screen');

    $container.masonry({
        itemSelector: '.masonry-item',
        columnWidth: 128
    });

});

var SysOS = angular.module('SysOS', [
    'btford.socket-io',
    'ngFileUpload',
    'ui.codemirror',
    'ui.bootstrap.contextMenu',
    'toastr',
    'ngSelectable',
    'ui.bootstrap',
    'angular-uuid',
    'oc.lazyLoad',
    'ui.sortable'
]);

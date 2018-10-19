$(window).on('load', function () {
    var $container = $('.start-screen');

    $container.masonry({
        itemSelector: '.masonry-item',
        columnWidth: 128
    });

});

var SysOS = angular.module('SysOS', [
    'ngFileUpload',
    'ui.codemirror',
    'ui.bootstrap.contextMenu',
    'toastr',
    'ngSelectable',
    'ui.bootstrap',
    'angular-uuid',
    'oc.lazyLoad',
    'ui.sortable',
    'ui.tree',
    'ngCookies',
    'ngDragDrop',
    'chart.js'
]);

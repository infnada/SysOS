var demoApp = angular.module('demoApp', []);

(function () {

    demoApp.run(['ApplicationsFactory', function (ApplicationsFactory) {
        ApplicationsFactory.registerApplication({
            id: 'demo', // Application id
            ico: 'upload', // Font-Awesome icon to use
            name: 'Demo', // Application name
            menu: true, // This app will have a menu?
            actions: true, // This app will have a actions bar?
            status: true, // This app will have a status bar?
            style: 'width:1275px;height:600px;top:9%;left:10%;' // Define initial position when opened
        });
    }]);

    demoApp.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/applications/menu-demo.html',
            '<li> \
                <a ><i class="menu__icon fa fa-share-alt"></i> Share</a> \
            </li> \
            <li class="divided"> \
                <a ><i class="menu__icon fa fa-file"></i> Format</a> \
            </li> \
            <li> \
                <a ><i class="menu__icon fa fa-cog"></i> Settings </a> \
            </li>'
        );
    }]);

    demoApp.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/applications/actions-demo.html',
            '<div class="window__actions" ng-controller="demoActionController as demoA"> \
                <a class="window__item" ng-click="demoA.doSometing()"> \
                    <i class="fa fa-plus text-success"></i> \
                </a> \
                <a class="window__item separator" ></a> \
                <a class="window__item" title="Delete" ng-click="demoA.deleteSometings()"> \
                    <i class="fa fa-trash"></i> \
                </a> \
            </div>'
        );
    }]);

    demoApp.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/applications/body-demo.html',
            '<div class="window__body with_status with_actions" ng-controller="demoBodyController as demoB"> \
                <div class="window__main by-center"> \
                    <h1>This is the Body!</h1> \
                </div> \
            </div>'
        );
    }]);

    demoApp.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/applications/status-demo.html',
            '<div class="window__status" ng-controller="demoStatusController as sftpdemoS"> \
                This is the status bar \
            </div>'
        );
    }]);

}());
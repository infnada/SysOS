(function () {
    'use strict';
    SysOS.run(['$rootScope', '$log', '$cookies', 'mainFactory', 'ServerFactory',
        function ($rootScope, $log, $cookies, mainFactory, ServerFactory) {

            $log.debug('SysOS -> Init');

            $rootScope.showLogin = true;
            $rootScope.showApp = false;

            console.log($cookies.get('uniqueId'));

            if (angular.isDefined($cookies.get('uniqueId'))) {

                // Check express session
                ServerFactory
                .getSession(function (data) {
                    if (data.data.status === 'error') {
                        $log.debug('SysOS -> Removing uniqueId cookie');
                        return $cookies.remove('uniqueId');
                    }

                    return mainFactory.init();

                }, function () {
                    //Error
                    console.log('error');
                });

            }

        }]);
}());

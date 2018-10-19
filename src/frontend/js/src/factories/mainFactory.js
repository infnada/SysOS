(function () {
    'use strict';
    SysOS.factory('mainFactory', ['$rootScope', 'ApplicationsFactory', 'socketIo', 'connectionsFactory', '$injector', '$ocLazyLoad',
        function ($rootScope, ApplicationsFactory, socketIo, connectionsFactory, $injector, $ocLazyLoad) {

        var init = function () {
            $rootScope.showApp = true;
            $rootScope.showLogin = false;

            angular.element(window).bind('dragover', function (e) {
                e.preventDefault();
            });
            angular.element(window).bind('drop', function (e) {
                e.preventDefault();
            });
            angular.element(window).bind('contextmenu', function (e) {
                e.preventDefault();
            });

            /**
             *
             * Init
             *
             */

            // Ensure no application is open
            $rootScope.taskbar__item_open = null;

            /**
             * Get Installed Applications
             */
            ApplicationsFactory.getInstalledApplications().then(function (data) {

                angular.forEach(data, function (application) {

                    var module = application.filename.replace('application__', '').replace('.min.js', '');

                    $ocLazyLoad.load({
                        name: module + 'App',
                        files: ['/api/applications/get_application_file/' + application.filename]
                    }).then(function () {
                        //console.log($injector.get(module + 'App'));
                        //var module = application.filename.replace("application__","").replace(".min.js","");
                        //$injector.get(module + 'App').run();
                    });

                });
            });

            /**
             * Get TaskBar Applications
             */
            ApplicationsFactory.getTaskBarApplications();

            $rootScope.$broadcast('refreshPath', '/root/Desktop/');

            socketIo.connect();

            //SMANAGER
            socketIo.socket().on('smanager__prop', function (data) {
                var smanagerFactory = $injector.get('smanagerFactory');

                if (angular.isObject(data)) console.log(data);
                smanagerFactory.newProp(data);
            });

            //SSH
            socketIo.socket().on('ssh__prop', function (data) {
                var sshFactory = $injector.get('sshFactory');

                if (angular.isObject(data)) console.log(data);
                sshFactory.newProp(data);
            });
            socketIo.socket().on('ssh__data', function (data) {
                var sshFactory = $injector.get('sshFactory');

                sshFactory.newData(data);
            });

            //SFTP
            socketIo.socket().on('sftp__prop', function (data) {
                var sftpFactory = $injector.get('sftpFactory');

                if (angular.isObject(data)) console.log(data);
                sftpFactory.newProp(data);
            });
            socketIo.socket().on('sftp__data', function (data) {
                var sftpFactory = $injector.get('sftpFactory');

                sftpFactory.newData(data);
            });
            socketIo.socket().on('sftp__progress', function (data) {
                var sftpFactory = $injector.get('sftpFactory');

                sftpFactory.newProgress(data);
            });

        };

        return {
            init: init
        };

    }]);

}());

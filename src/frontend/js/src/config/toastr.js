(function () {
    'use strict';
    SysOS.config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            progressBar: true,
            tapToDismiss: true,
            timeOut: 10000
        });
    });
}());

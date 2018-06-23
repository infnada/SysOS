(function () {
    'use strict';
    alertsApp.controller('alertsBodyController', ['$scope', 'connectionsFactory', function ($scope, connectionsFactory) {

        var _this = this;

        $scope.$watch(function () {
            return connectionsFactory.getConnectionByCategory('standalone');
        }, function (newValue) {
            _this.connections = newValue;
        });

        this.getCpuLoad = function (connection) {
            if (angular.isUndefined(connection)) return 0.0;
            if (angular.isUndefined(connection.cpu)) return 0.0;

            return connection.cpu.filter(function (obj) {
                return obj.option === 'Load average';
            })[0].data.split(' ')[0];
        };

        // 1 extract first part
        // 2 extract second part
        this.extractSpace = function (string, type) {
            if (type === 1) {
                return string.slice(0, -1);
            } else if (type === 2) {
                return string.substr(string.length - 1) + 'iB';
            }
        };

        // Classes
        this.getPingClass = function (connection) {
            if (angular.isUndefined(connection.ping)) return ['bg-unknown-i', 'UNKNOWN'];
            if (connection.ping === 'alive') return ['bg-success-i', 'OK'];
            return ['bg-danger-i', 'CRITICAL'];
        };

        this.getMemClass = function (connection) {
            if (angular.isUndefined(connection.mem)) return ['bg-unknown-i', 'UNKNOWN'];
            var memUsed = 100 - (connection.mem[0].free / connection.mem[0].total * 100).toFixed(1);
            if (memUsed < 80) return ['bg-success-i', 'OK'];
            if (memUsed < 90) return ['bg-warning-i', 'WARNING'];
            return ['bg-danger-i', 'CRITICAL'];
        };

        this.getCpuClass = function (connection) {
            if (angular.isUndefined(connection.cpu)) return ['bg-unknown-i', 'UNKNOWN'];
            var cpuLoad = _this.getCpuLoad(connection).slice(0, -1);
            if (cpuLoad < 80) return ['bg-success-i', 'OK'];
            if (cpuLoad < 90) return ['bg-warning-i', 'WARNING'];
            return 'bg-danger-i';
        };

        this.getDiskClass = function (disk) {
            if (angular.isUndefined(disk)) return ['bg-unknown-i', 'UNKNOWN'];
            var diskPercent = this.extractSpace(disk.used_percent, 1);
            if (diskPercent < 80) {return ['bg-success-i', 'OK'];}
            if (diskPercent < 90) return ['bg-warning-i', 'WARNING'];
            return ['bg-danger-i', 'CRITICAL'];
        };

        this.getUpdatesClass = function (connection) {
            if (angular.isUndefined(connection.updates)) return ['bg-unknown-i', 'UNKNOWN'];
            var totalUpdates = connection.updates.length;
            if (totalUpdates < 2) return ['bg-success-i', 'OK'];
            if (totalUpdates < 5) return ['bg-warning-i', 'WARNING'];
            return ['bg-danger-i', 'CRITICAL'];
        };

    }]);
}());
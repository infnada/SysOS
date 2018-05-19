(function () {
  "use strict";
  smanagerApp.controller('smStatusController', ['$scope', '$filter', 'smanagerFactory', 'connectionsFactory', function ($scope, $filter, smanagerFactory, connectionsFactory) {

    var _this = this;

    /*
     * Bindings
     */

    $scope.$watch(function(){
      return connectionsFactory.connections();
    }, function(newValue){
      _this.connections = newValue;
    });

    $scope.$watch(function(){
      return smanagerFactory.activeConnection();
    }, function(newValue){
      _this.activeConnection = newValue;
    });

    this.getActiveConnection = function () {
      var filter_standalone = $filter('filter')(_this.connections.standalone, {uuid: _this.activeConnection})[0];
      var filter_virtual = $filter('filter')(_this.connections.virtual, {uuid: _this.activeConnection})[0];
      var filter_storage = $filter('filter')(_this.connections.storage, {uuid: _this.activeConnection})[0];

      if (filter_standalone) return filter_standalone;
      if (filter_virtual) return filter_virtual;
      if (filter_storage) return filter_storage;

      return false;
    };

  }]);
}());

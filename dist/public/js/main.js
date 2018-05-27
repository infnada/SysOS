/**
Systems OS - 0.0.1

Copyright (c) 2018 Isart Navarro Farell
License: MIT
*/
$(window).on("load", function () {
	var $container = $('.start-screen');

	$container.masonry({
		itemSelector: '.masonry-item',
		columnWidth: 128
	});

});

var myApp = angular.module('myApp', [
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

(function () {
  "use strict";
	myApp.run(['$templateCache', function($templateCache) {

	  $templateCache.put('templates/applications/menu-alerts.html',
		  '<li> \
        <a > \
          <i class="menu__icon fa fa-download"></i> \
          Save \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-folder-open"></i> \
          Open \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-print"></i> \
          Print \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-share-alt"></i> \
          Share \
        </a> \
      </li> \
      <li class="divided"> \
        <a > \
          <i class="menu__icon fa fa-file"></i> \
          Format \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-cog"></i> \
          Settings \
        </a> \
      </li>'
	  );

	}]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function($templateCache) {

    $templateCache.put('templates/applications/body-alerts.html',
      '<div class="window__body" ng-controller="alertsBodyController as aB"> \
        <div class="window__main no_padding"> \
          <div class="row"> \
            <div class="col-lg-2 col-sm-6"> \
              <div class="panel panel-default b-a-0 bg-gray-dark"> \
                <div class="panel-heading lit lit bg-success-i"> \
                  <div class="media"> \
                    <div class="media-body"> \
                      <h1 class="display-4 m-t-0 m-b-0 ng-binding"><span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">OK</span> <small class="text-uppercase text-white">123</small></h1> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
            <div class="col-lg-2 col-sm-6"> \
              <div class="panel panel-default b-a-0 bg-gray-dark"> \
                <div class="panel-heading lit bg-warning-i"> \
                  <div class="media"> \
                    <div class="media-body"> \
                      <h1 class="display-4 m-t-0 m-b-0 ng-binding"><span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">WARNING</span> <small class="text-uppercase text-white">123</small></h1> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
            <div class="col-lg-2 col-sm-6"> \
              <div class="panel panel-default b-a-0 bg-gray-dark"> \
                <div class="panel-heading lit bg-danger-i"> \
                  <div class="media"> \
                    <div class="media-body"> \
                      <h1 class="display-4 m-t-0 m-b-0 ng-binding"><span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">CRITICAL</span> <small class="text-uppercase text-white">123</small></h1> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
            <div class="col-lg-2 col-sm-6"> \
              <div class="panel panel-default b-a-0 bg-gray-dark"> \
                <div class="panel-heading lit bg-unknown-i"> \
                  <div class="media"> \
                    <div class="media-body"> \
                      <h1 class="display-4 m-t-0 m-b-0 ng-binding"><span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">UNKNOWN</span> <small class="text-uppercase text-white">123</small></h1> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
            <div class="col-lg-2 col-sm-6"> \
              <div class="panel panel-default b-a-0 bg-gray-dark"> \
                <div class="panel-heading lit bg-primary-i"> \
                  <div class="media"> \
                    <div class="media-body"> \
                      <h1 class="display-4 m-t-0 m-b-0 ng-binding"><span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">ALL PROBLEMS</span> <small class="text-uppercase text-white">123</small></h1> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
            <div class="col-lg-2 col-sm-6"> \
              <div class="panel panel-default b-a-0 bg-gray-dark"> \
                <div class="panel-heading lit"> \
                  <div class="media"> \
                    <div class="media-body"> \
                      <h1 class="display-4 m-t-0 m-b-0 ng-binding"><span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">ALL</span> <small class="text-uppercase text-white">123</small></h1> \
                    </div> \
                  </div> \
                </div> \
              </div> \
            </div> \
          </div> \
          <table class="table"> \
            <thead> \
              <tr> \
                <th class="small text-muted text-uppercase"><strong>Node</strong></th> \
                <th class="small text-muted text-uppercase"><strong>Service</strong></th> \
                <th class="small text-muted text-uppercase"><strong>Status</strong></th> \
                <th class="small text-muted text-uppercase"><strong>Status information</strong></th> \
                <th class="small text-muted text-uppercase"><strong>Last check</strong></th> \
                <th class="small text-muted text-uppercase text-right"><strong>Actions</strong></th> \
              </tr> \
            </thead> \
            <tbody> \
              <tr ng-repeat="connection in aB.connections"> \
                <td class="v-a-m {{aB.getPingClass(connection)[0]}}"> \
                  <span class="text-white">{{::connection.description}}</span> \
                  <br> \
                  <span>{{::connection.host}}</span> \
                </td> \
                <td class="v-a-m" colspan="5"> \
                  <table class="little-table"> \
                    <tbody> \
                      <tr class="{{aB.getPingClass(connection)[0]}}"> \
                        <td> \
                          <span>Ping</span> \
                        </td> \
                        <td> \
                          <span><i class="fa fa-circle-o m-r-1"></i> <span>{{aB.getPingClass(connection)[1]}}</span></span> \
                        </td> \
                        <td> \
                          <span>{{connection.ping}}</span> \
                        </td> \
                        <td> \
                          <span>10-20-2017 15:22:07</span> \
                        </td> \
                        <td class="text-right"> \
                          <span><i class="fa fa-refresh m-r-1"></i></span> \
                        </td> \
                      </tr> \
                      <tr class="{{aB.getMemClass(connection)[0]}}"> \
                        <td> \
                          <span>Memory Usage</span> \
                        </td> \
                        <td> \
                          <span><i class="fa fa-circle-o m-r-1"></i> <span>{{aB.getMemClass(connection)[1]}}</span></span> \
                        </td> \
                        <td> \
                          <span>Total: {{connection.mem[0].total}}MiB - Free: {{connection.mem[0].free}}Mib -> {{(connection.mem[0].free / connection.mem[0].total * 100).toFixed(1)}}%</span> \
                        </td> \
                        <td> \
                          <span>10-20-2017 15:22:07</span> \
                        </td> \
                        <td class="text-right"> \
                          <span><i class="fa fa-refresh m-r-1"></i></span> \
                        </td> \
                      </tr> \
                      <tr class="{{aB.getCpuClass(connection)[0]}}"> \
                        <td> \
                          <span>CPU Load</span> \
                        </td> \
                        <td> \
                          <span><i class="fa fa-circle-o m-r-1"></i> <span>{{aB.getCpuClass(connection)[1]}}</span></span> \
                        </td> \
                        <td> \
                          <span>Load: {{aB.getCpuLoad(connection)}}%</span> \
                        </td> \
                        <td> \
                          <span>10-20-2017 15:22:07</span> \
                        </td> \
                        <td class="text-right"> \
                          <span><i class="fa fa-refresh m-r-1"></i></span> \
                        </td> \
                      </tr> \
                      <tr class="{{aB.getDiskClass(disk)[0]}}" ng-repeat="disk in connection.disk"> \
                        <td> \
                          <span>Disk {{::disk.disk}}</span> \
                        </td> \
                        <td> \
                          <span><i class="fa fa-circle-o m-r-1"></i> <span>{{aB.getDiskClass(disk)[1]}}</span></span> \
                        </td> \
                        <td> \
                          <span>Total: {{disk.size}}iB - Free: {{aB.extractSpace(disk.free_space, 1)}}{{aB.extractSpace(disk.free_space, 2)}} -> {{disk.free_percent}}</span> \
                        </td> \
                        <td> \
                          <span>10-20-2017 15:22:07</span> \
                        </td> \
                        <td class="text-right"> \
                          <span><i class="fa fa-refresh m-r-1"></i></span> \
                        </td> \
                      </tr> \
                      <tr class="{{aB.getUpdatesClass(connection)[0]}}"> \
                        <td> \
                          <span>Updates</span> \
                        </td> \
                        <td> \
                          <span><i class="fa fa-circle-o m-r-1"></i> <span>{{aB.getUpdatesClass(connection)[1]}}</span></span> \
                        </td> \
                        <td> \
                          <span>{{connection.updates.length}} pending updates</span> \
                        </td> \
                        <td> \
                          <span>10-20-2017 15:22:07</span> \
                        </td> \
                        <td class="text-right"> \
                          <span><i class="fa fa-refresh m-r-1"></i></span> \
                        </td> \
                      </tr> \
                    </tbody> \
                  </table> \
                </td> \
              </tr> \
            </tbody> \
          </table> \
        </div> \
      </div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.controller('alertsBodyController', ['$scope', 'smanagerFactory', function ($scope, smanagerFactory) {

    var _this = this;

    $scope.$watch(function(){
      return smanagerFactory.connections();
    }, function(newValue){
      _this.connections = newValue;
    });

    this.getCpuLoad = function (connection) {
      if (angular.isUndefined(connection)) return 0.0;
      if (angular.isUndefined(connection.cpu)) return 0.0;

      return connection.cpu.filter(function( obj ) {
        return obj.option == "Load average";
      })[0].data.split(" ")[0];
    };

    // 1 extract first part
    // 2 extract second part
    this.extractSpace = function (string, type) {
      if (type === 1) {
        return string.slice(0, -1);
      } else if (type === 2) {
        return string.substr(string.length - 1) + "iB";
      }
    };

    // Classes
    this.getPingClass = function (connection) {
      if (angular.isUndefined(connection.ping)) return ["bg-unknown-i", "UNKNOWN"];
      if (connection.ping === "alive") return ["bg-success-i", "OK"];
      return ["bg-danger-i", "CRITICAL"];
    };

    this.getMemClass = function (connection) {
      if (angular.isUndefined(connection.mem)) return ["bg-unknown-i", "UNKNOWN"];
      var memUsed = 100 - (connection.mem[0].free / connection.mem[0].total * 100).toFixed(1);
      if (memUsed < 80) return ["bg-success-i", "OK"];
      if (memUsed < 90) return ["bg-warning-i", "WARNING"];
      return ["bg-danger-i", "CRITICAL"];
    };

    this.getCpuClass = function (connection) {
      if (angular.isUndefined(connection.cpu)) return ["bg-unknown-i", "UNKNOWN"];
      var cpuLoad = _this.getCpuLoad(connection).slice(0, -1);
      if (cpuLoad < 80) return ["bg-success-i", "OK"];
      if (cpuLoad < 90) return ["bg-warning-i", "WARNING"];
      return "bg-danger-i";
    };

    this.getDiskClass = function (disk) {
      if (angular.isUndefined(disk)) return ["bg-unknown-i", "UNKNOWN"];
      var diskPercent = this.extractSpace(disk.used_percent, 1)
      if (diskPercent < 80) return ["bg-success-i", "OK"];
      if (diskPercent < 90) return ["bg-warning-i", "WARNING"];
      return ["bg-danger-i", "CRITICAL"];
    };

    this.getUpdatesClass = function (connection) {
      if (angular.isUndefined(connection.updates)) return ["bg-unknown-i", "UNKNOWN"];
      var totalUpdates = connection.updates.length;
      if (totalUpdates < 2) return ["bg-success-i", "OK"];
      if (totalUpdates < 5) return ["bg-warning-i", "WARNING"];
      return ["bg-danger-i", "CRITICAL"];
    };

  }]);
}());

(function () {
  "use strict";
  myApp.run(['ApplicationsFactory', function(ApplicationsFactory) {

    ApplicationsFactory.registerApplication({
      id: "alerts",
      ico: "bullhorn",
      name: "Alerts",
      menu: true,
      actions: true,
      style: "width:1700px;height:750px;top:8%;left:7%;"
    });

  }]);
}());

(function () {
  "use strict";
	myApp.run(['$templateCache', function($templateCache) {

	  $templateCache.put('templates/applications/menu-mail.html',
		  '<li> \
        <a > \
          <i class="menu__icon fa fa-search"></i> \
          Search \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-share-alt"></i> \
          Share \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-plug"></i> \
          Devices \
        </a> \
      </li> \
      <li class="divided"> \
        <a > \
          <i class="menu__icon fa fa-cog"></i> \
          Settings \
        </a> \
      </li>'
	  );

	}]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function($templateCache) {

    $templateCache.put('templates/applications/body-mail.html',
      '<div class="window__body"> \
        <div class="window__side mailbox-content"> \
          <div class="file-manager"> \
            <a class="btn btn-block btn-primary compose-mail" href="mail_compose.html">Compose Mail</a> \
            <div class="space-25"></div> \
            <h5>Folders</h5> \
            <ul class="folder-list m-b-md" style="padding: 0"> \
                <li><a href="mailbox.html"> <i class="fa fa-inbox "></i> Inbox <span class="label label-warning pull-right">16</span> </a></li> \
                <li><a href="mailbox.html"> <i class="fa fa-envelope-o"></i> Send Mail</a></li> \
                <li><a href="mailbox.html"> <i class="fa fa-certificate"></i> Important</a></li> \
                <li><a href="mailbox.html"> <i class="fa fa-file-text-o"></i> Drafts <span class="label label-danger pull-right">2</span></a></li> \
                <li><a href="mailbox.html"> <i class="fa fa-trash-o"></i> Trash</a></li> \
            </ul> \
            <h5>Categories</h5> \
            <ul class="category-list" style="padding: 0"> \
                <li><a > <i class="fa fa-circle text-navy"></i> Work </a></li> \
                <li><a > <i class="fa fa-circle text-danger"></i> Documents</a></li> \
                <li><a > <i class="fa fa-circle text-primary"></i> Social</a></li> \
                <li><a > <i class="fa fa-circle text-info"></i> Advertising</a></li> \
                <li><a > <i class="fa fa-circle text-warning"></i> Clients</a></li> \
            </ul> \
            <h5 class="tag-title">Labels</h5> \
            <ul class="tag-list" style="padding: 0"> \
                <li><a href=""><i class="fa fa-tag"></i> Family</a></li> \
                <li><a href=""><i class="fa fa-tag"></i> Work</a></li> \
                <li><a href=""><i class="fa fa-tag"></i> Home</a></li> \
                <li><a href=""><i class="fa fa-tag"></i> Children</a></li> \
                <li><a href=""><i class="fa fa-tag"></i> Holidays</a></li> \
                <li><a href=""><i class="fa fa-tag"></i> Music</a></li> \
                <li><a href=""><i class="fa fa-tag"></i> Photography</a></li> \
                <li><a href=""><i class="fa fa-tag"></i> Film</a></li> \
            </ul> \
            <div class="clearfix"></div> \
          </div> \
        </div> \
        <div class="window__main"> \
          <div class="mail-box-header"> \
            <form method="get" action="index.html" class="pull-right mail-search"> \
              <div class="input-group"> \
                <input type="text" class="form-control input-sm" name="search" placeholder="Search email"> \
                <div class="input-group-btn"> \
                  <button type="submit" class="btn btn-sm btn-primary"> \
                    Search \
                  </button> \
                </div> \
              </div> \
            </form> \
            <h2> \
              Inbox (16) \
            </h2> \
            <div class="mail-tools tooltip-demo m-t-md"> \
              <div class="btn-group pull-right"> \
                <button class="btn btn-white btn-sm"><i class="fa fa-arrow-left"></i></button> \
                <button class="btn btn-white btn-sm"><i class="fa fa-arrow-right"></i></button> \
              </div> \
              <button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Refresh inbox"><i class="fa fa-refresh"></i> Refresh</button> \
              <button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as read"><i class="fa fa-eye"></i> </button> \
              <button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as important"><i class="fa fa-exclamation"></i> </button> \
              <button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button> \
            </div> \
            </div> \
            <div class="mail-box"> \
              <table class="table table-hover table-mail"> \
                <tbody> \
                  <tr class="unread"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Anna Smith</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Lorem ipsum dolor noretek imit set.</a></td> \
                    <td class=""><i class="fa fa-paperclip"></i></td> \
                    <td class="text-right mail-date">6.10 AM</td> \
                  </tr> \
                  <tr class="unread"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks" checked> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Jack Nowak</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Aldus PageMaker including versions of Lorem Ipsum.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">8.22 PM</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Facebook</a> <span class="label label-warning pull-right">Clients</span> </td> \
                    <td class="mail-subject"><a href="mail_detail.html">Many desktop publishing packages and web page editors.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Jan 16</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Mailchip</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">There are many variations of passages of Lorem Ipsum.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Mar 22</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Alex T.</a> <span class="label label-danger pull-right">Documents</span></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Lorem ipsum dolor noretek imit set.</a></td> \
                    <td class=""><i class="fa fa-paperclip"></i></td> \
                    <td class="text-right mail-date">December 22</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Monica Ryther</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">The standard chunk of Lorem Ipsum used.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Jun 12</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Sandra Derick</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Contrary to popular belief.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">May 28</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Patrick Pertners</a> <span class="label label-info pull-right">Adv</span></td> \
                    <td class="mail-subject"><a href="mail_detail.html">If you are going to use a passage of Lorem </a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">May 28</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Michael Fox</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Humour, or non-characteristic words etc.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Dec 9</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Damien Ritz</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Oor Lorem Ipsum is that it has a more-or-less normal.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Jun 11</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Anna Smith</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Lorem ipsum dolor noretek imit set.</a></td> \
                    <td class=""><i class="fa fa-paperclip"></i></td> \
                    <td class="text-right mail-date">6.10 AM</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Jack Nowak</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Aldus PageMaker including versions of Lorem Ipsum.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">8.22 PM</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Mailchip</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">There are many variations of passages of Lorem Ipsum.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Mar 22</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Alex T.</a> <span class="label label-warning pull-right">Clients</span></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Lorem ipsum dolor noretek imit set.</a></td> \
                    <td class=""><i class="fa fa-paperclip"></i></td> \
                    <td class="text-right mail-date">December 22</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Monica Ryther</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">The standard chunk of Lorem Ipsum used.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Jun 12</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Sandra Derick</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Contrary to popular belief.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">May 28</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Patrick Pertners</a> </td> \
                    <td class="mail-subject"><a href="mail_detail.html">If you are going to use a passage of Lorem </a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">May 28</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Michael Fox</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Humour, or non-characteristic words etc.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Dec 9</td> \
                  </tr> \
                  <tr class="read"> \
                    <td class="check-mail"> \
                      <input type="checkbox" class="i-checks"> \
                    </td> \
                    <td class="mail-ontact"><a href="mail_detail.html">Damien Ritz</a></td> \
                    <td class="mail-subject"><a href="mail_detail.html">Oor Lorem Ipsum is that it has a more-or-less normal.</a></td> \
                    <td class=""></td> \
                    <td class="text-right mail-date">Jun 11</td> \
                  </tr> \
                </tbody> \
              </table> \
            </div> \
          </div> \
        </div> \
      </div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['ApplicationsFactory', function(ApplicationsFactory) {

    ApplicationsFactory.registerApplication({id: "mail", ico: "envelope", name: "Mail", menu: true, style: "width:1270px;height:600px;top:5%;left:10%;"});

  }]);
}());

(function () {
  "use strict";
	myApp.run(['$templateCache', function($templateCache) {

	  $templateCache.put('templates/applications/menu-notepad.html',
		  '<li> \
        <a > \
          <i class="menu__icon fa fa-download"></i> \
          Save \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-folder-open"></i> \
          Open \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-print"></i> \
          Print \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-share-alt"></i> \
          Share \
        </a> \
      </li> \
      <li class="divided"> \
        <a > \
          <i class="menu__icon fa fa-file"></i> \
          Format \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-cog"></i> \
          Settings \
        </a> \
      </li>'
	  );

	}]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function($templateCache) {

    $templateCache.put('templates/applications/body-notepad.html',
      '<div class="window__body" ng-controller="notepadBodyController as nB"> \
        <div class="window__main no_padding"> \
          <textarea class="full-textarea" ui-codemirror="{ onLoad : nB.codemirrorLoaded }" ui-codemirror-opts="nB.editorOptions" ng-model="nB.editorData"></textarea> \
        </div> \
      </div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.controller('notepadBodyController', ['$scope', function ($scope) {

    var _this = this;
    this.editorData = "test";

    this.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      mode: 'shell',
      matchBrackets: true,
      viewportMargin: Infinity,
      autofocus: true
    };

    this.codemirrorLoaded = function(_editor){
      // Editor part
      var _doc = _editor.getDoc();
      _editor.focus();
    };

    $scope.$on('notepad__new_data', function (event, data) {
      console.log("newdata");
      _this.editorData = data;
    });

  }]);
}());

(function () {
  "use strict";
  myApp.run(['ApplicationsFactory', function(ApplicationsFactory) {

    ApplicationsFactory.registerApplication({id: "notepad", ico: "pencil", name: "Notepad", menu: true, style: "width:600px;height:300px;top:10%;left:30%;"});

  }]);
}());

(function () {
  "use strict";
	myApp.run(['$templateCache', function($templateCache) {

	  $templateCache.put('templates/applications/menu-video.html',
		  '<li> \
        <a > \
          <i class="menu__icon fa fa-search"></i> \
          Search \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-share-alt"></i> \
          Share \
        </a> \
      </li> \
      <li> \
        <a > \
          <i class="menu__icon fa fa-plug"></i> \
          Devices \
        </a> \
      </li> \
      <li class="divided"> \
        <a > \
          <i class="menu__icon fa fa-cog"></i> \
          Settings \
        </a> \
      </li>'
	  );

	}]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function($templateCache) {

    $templateCache.put('templates/applications/body-video.html',
      '<div class="window__body"> \
        <div class="window__main no_padding"> \
          <video class="full_video" src="http://localhost:9001/video" controls></video> \
        </div> \
      </div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['ApplicationsFactory', function(ApplicationsFactory) {

    ApplicationsFactory.registerApplication({id: "video", ico: "play", name: "Video Player", menu: true, style: "width:1270px;height:600px;top:9%;left:10%;"});

  }]);
}());

(function () {
	"use strict";
	myApp.run(['$rootScope', 'ServerFactory', 'ApplicationsFactory', 'socket', 'connectionsFactory', '$injector', '$ocLazyLoad', 'vmwareFactory',
		function ($rootScope, ServerFactory, ApplicationsFactory, socket, connectionsFactory, $injector, $ocLazyLoad, vmwareFactory) {

			angular.element(window).bind('dragover', function (e) {
				e.preventDefault();
			});
			angular.element(window).bind('drop', function (e) {
				e.preventDefault();
			});
			angular.element(window).bind('contextmenu', function (e) {
				e.preventDefault();
			});

			/*
			 * Init
			 */


			/*vmwareFactory.connectvCenterSoap('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443).then(function () {
				return vmwareFactory.getVMSnapshots('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'vm-331');
			}).then(function(data) {
				console.log(data);
			});*/

			vmwareFactory.connectvCenterSoap('d4024889-d5e4-4bd3-a04b-4c8aa4f49a1e', "mvcenter01", 443).then(function () {
				vmwareFactory.getVMs('d4024889-d5e4-4bd3-a04b-4c8aa4f49a1e', "mvcenter01", 443, 'group-d1').then(function (data) {
					console.log("getVMState", data);
					/*vmwareFactory.getDatastores('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'group-d1').then(function (data) {
						console.log("getDatastores", data);
						vmwareFactory.getDatastoresWithVMsData('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'group-d1').then(function (data) {
							console.log("getDatastoresWithVMsData", data);
							vmwareFactory.getDatastoreProps('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'datastore-321').then(function (data) {
								console.log("getDatastoreProps", data);
								vmwareFactory.getFilesDataFromDatastore('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'datastore-321', 'NFS_MAD', 'tt').then(function (data) {
									console.log("getFilesDataFromDatastore", data);
									vmwareFactory.queryVMEvents('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'vm-322').then(function (data) {
										console.log("queryVMEvents", data);
										vmwareFactory.searchIndexVM('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, '502197e9-abe7-06e7-7d88-667c0a8b01ea').then(function (data) {
											console.log("searchIndex", data);

													vmwareFactory.createTask('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'com.sysos.management.backup').then(function (data) {
														console.log("createTask", data);
														var task_id = data.data.key;

														vmwareFactory.setTaskState('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, task_id, 'running').then(function (data) {
															console.log("setTaskState", data);
															vmwareFactory.updateTaskProgress('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, task_id, 20).then(function (data) {
																console.log("updateTaskProgress", data);
																vmwareFactory.searchIndexVM('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, '502197e9-abe7-06e7-7d88-667c0a8b01ea').then(function (data) {
																	console.log("searchIndex", data);
																	vmwareFactory.getVMs('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'group-d1').then(function (data) {
																		console.log("getVMs", data);
																		vmwareFactory.createSnapShot('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, 'vm-322', 'smvi_32bd5146-dcdc-4929-aaa7-5273aa750722', 'SMVI Snapshot generated for backup backup_db406d9b7b5977b00e8320858f12a879 with ID 32bd5146-dcdc-4929-aaa7-5273aa750722', false, true).then(function (data) {
																			console.log("createSnapShot", data);
																			vmwareFactory.setTaskState('e978f7ef-3e9a-4b69-b472-649b33d72201', "mvcenter01", 443, task_id, 'success').then(function (data) {
																				console.log("setTaskState", data);
																			});
																		});
																	});
																});
															});
														});
													});

										});
									});
								});
							});
						});*/
					});
				});
				  /*vmwareFactory.deleteFileFromDatastore(
					  '059bab78-9b0f-41d5-aa54-b5b31d9cf3de', 'mvcenter01', 443, 'SysOS_VOLDEV', '/GEA', 'datacenter-2'
				  ).then(function(data) {
					console.log(data);
				  });*/

				/*vmwareFactory.moveFileFromDatastore(
					'059bab78-9b0f-41d5-aa54-b5b31d9cf3de', 'mvcenter01', 443, 'SysOS_VOLDEV', '/ETER_renamed', 'datacenter-2', 'SysOS_VOLDEV', '/ETER', 'datacenter-2'
				).then(function(data) {
					console.log(data);
				});*/

				/*vmwareFactory.copyFileFromDatastore(
					'059bab78-9b0f-41d5-aa54-b5b31d9cf3de', 'mvcenter01', 443, 'SysOS_VOLDEV', '/ETER', 'datacenter-2', 'SysOS_VOLDEV', '/ETER_copy', 'datacenter-2'
				).then(function(data) {
					console.log(data);
				});*/
			//});

			/*vmwareFactory.getClientVersion('192.168.5.250', 443).then(function (data) {
			  console.log(data);
			});*/


			// Ensure no application is open
			$rootScope.taskbar__item_open = null;

			ApplicationsFactory.getInstalledApplications().then(function (data) {

				angular.forEach(data, function (application) {

					var module = application.filename.replace("application__","").replace(".min.js","");

					$ocLazyLoad.load({
						name: module + 'App',
						files: ['/getApplicationFile/' + application.filename]
					}).then(function () {
						//console.log($injector.get(module + 'App'));
						//var module = application.filename.replace("application__","").replace(".min.js","");
						//$injector.get(module + 'App').run();
					});

				});
			});

			// Get Task Bar pinned applications
			ServerFactory
			.getConfigFile('desktop/task_bar.json', function (data) {

				// Register Start button
				ApplicationsFactory.registerTaskBarApplication({"id": "start", "pinned": true});

				// Register every pinned application
				angular.forEach(data.data, function (application) {
					ApplicationsFactory.registerTaskBarApplication(application);
				});
			}, function () {
				console.log("Error");
			});

			// Get express session
			ServerFactory
			.getSession(function () {

				socket.on('connect', function () {



				});
				socket.on('disconnect', function (err) {
					console.log(err);
					socket.io.reconnection(false)
				});
				socket.on('error', function (err) {
					console.log(err);
				});

				//SMANAGER
				socket.on('smanager__prop', function (data) {
					var smanagerFactory = $injector.get('smanagerFactory');

					if (angular.isObject(data)) console.log(data);
					smanagerFactory.newProp(data);
				});

				//SSH
				socket.on('ssh__prop', function (data) {
					var sshFactory = $injector.get('sshFactory');

					if (angular.isObject(data)) console.log(data);
					sshFactory.newProp(data);
				});
				socket.on('ssh__data', function (data) {
					var sshFactory = $injector.get('sshFactory');

					sshFactory.newData(data);
				});

				//SFTP
				socket.on('sftp__prop', function (data) {
					var sftpFactory = $injector.get('sftpFactory');

					if (angular.isObject(data)) console.log(data);
					sftpFactory.newProp(data);
				});
				socket.on('sftp__data', function (data) {
					var sftpFactory = $injector.get('sftpFactory');

					sftpFactory.newData(data);
				});
				socket.on('sftp__progress', function (data) {
					var sftpFactory = $injector.get('sftpFactory');

					sftpFactory.newProgress(data);
				});

			}, function () {
				//Error
				console.log("error");
			});

		}]);
}());

(function () {
  "use strict";
  myApp.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
      progressBar: true,
      tapToDismiss: true,
      timeOut: 10000,
    });
  });
}());

(function () {
  "use strict";
  myApp.controller('mainController', ['$scope', 'ApplicationsFactory', function ($scope, ApplicationsFactory) {

    var _this = this;

    /*
			* Bindings
			*/
    this.opened_applications = ApplicationsFactory.opened_applications();

    $scope.$watch(function () {
      return ApplicationsFactory.opened_applications();
    }, function (newValue) {
      _this.opened_applications = newValue;
    });

    /*
		   * ng-click functions
		   */
    this.handleDesktopClick = function ($event) {

      if ($event.target.attributes.class !== undefined && $event.target.attributes.class.value === "desktop ng-scope") {
        ApplicationsFactory.toggleApplication(null);
      }

    };

  }]);
}());

(function () {
  "use strict";
  myApp.directive('application', [function () {
    return {
      restrict: 'E',
      scope: {
        appId: "="
      },
      //bindToController: true,
      replace: true,
      templateUrl: 'templates/applications/main.html',
      controllerAs: 'APP',
      controller: ['$scope', '$element', '$window', '$timeout', 'ApplicationsFactory', function ($scope, $element, $window, $timeout, ApplicationsFactory) {

        var _this = this;
        var fullHeight = $window.innerHeight - 48;
        var fullWidth = $window.innerWidth;

        var w = angular.element($window);

        w.bind('resize', function () {
          fullHeight = $window.innerHeight - 48;
          fullWidth = $window.innerWidth;

          if (_this.isMaximized) {
            $element.css({
              'height': fullHeight,
              'width': fullWidth,
              'top': 0,
              'left': 0
            });
          }
        });

        $timeout(function () {
          _this.isOpening = false;
        }, 500);

        /*
			   * Bindings
			   */
        this.appId = $scope.appId;
        this.appData = ApplicationsFactory.getApplicationById(this.appId);
        this.opened_applications = ApplicationsFactory.opened_applications();
        this.isclosing = false;
        this.isOpening = true;
        this.isMinimized = false;
        this.isMaximized = false;
        this.isMenuOpened = false;

        this.initialHeight = 0;
        this.initialWidth = 0;
        this.initialTop = 0;
        this.initialLeft = 0;

        $element.on('click', function (e) {
          if (ApplicationsFactory.isActiveApplication(_this.appId)) return;
          if (_this.isMinimized) return;
          ApplicationsFactory.toggleApplication(_this.appId);
        });

        // jQuery resize element
        $element.resizable({
          handles: 'n,ne,e,se,s,sw,w,nw',
          stop: function () {
            var initialHeight = $element[0].offsetHeight,
              initialWidth = $element[0].offsetWidth,
              initialTop = $element[0].offsetTop,
              initialLeft = $element[0].offsetLeft;
          }
        });

        // jQuery drag element
        $element.draggable({
          handle: '.window__titlebar',
          stop: function () {
            var initialHeight = $element[0].offsetHeight,
              initialWidth = $element[0].offsetWidth,
              initialTop = $element[0].offsetTop,
              initialLeft = $element[0].offsetLeft;

            if (initialTop < -5) {
              _this.maximize();
            }
          },
          start: function (event, ui) {
            ApplicationsFactory.toggleApplication(_this.appId);

            //$(this).css({'z-index' : zIndex++});

            if (_this.isMaximized) {
              _this.maximize();
            }

          }
        });

        /*
			   * broadcast functions
			   */

        // Called from Task Bar Context Menu
        $scope.$on('closeApplication', function (event, appId) {
          if (appId === _this.appId) {
            _this.close();
          }
        });

        $scope.$on('toggling', function (event, appId) {
          // Called to minimize all applications
          if (appId === null) return _this.minimize();

          // Normal call
          if (appId === _this.appId) {

            // Application minimized, set it active
            if (_this.isMinimized) {
              ApplicationsFactory.toggleApplication(appId);
              return _this.isMinimized = false;
            }

            // Application opened but not active
            if (!ApplicationsFactory.isActiveApplication(_this.appId)) return ApplicationsFactory.toggleApplication(appId);

            // Application is active, minimize it
            return _this.minimize();
          }
        });

        /*
			   * ng-class functions
			   */
        this.isVisible = function () {
          return ApplicationsFactory.isActiveApplication(_this.appId);
        };

        /*
			   * ng-click functions
			   */
        this.close = function () {

          // Close this application
          _this.isClosing = true;

          $timeout(function () {
            _this.isClosing = false;
            _this.opened_applications = ApplicationsFactory.closeApplication(_this.appId);
            //hide $(parentWindow).hide()
          }, 500);

          // Close application in taskbar
          ApplicationsFactory.toggleApplication(null);

          // TODO: Set closest application active
          //var closest = $('.window').not('.window--minimized, .window--closing, .window--opening').filter(function() {
          //  return $(this).css('z-index') < zIndex
          //}).first();

          //$(closest).addClass('window--active');
        };

        this.minimize = function () {
          _this.isMinimized = true;
          ApplicationsFactory.toggleApplication(null);
        };

        this.maximize = function () {
          _this.isMaximized = !_this.isMaximized;

          if (!_this.isMaximized) {
            $element.css({
              'height': _this.initialHeight,
              'width': _this.initialWidth,
              'top': _this.initialTop,
              'left': _this.initialLeft
            });
          } else {
            _this.initialHeight = $element[0].offsetHeight;
            _this.initialWidth = $element[0].offsetWidth;
            _this.initialTop = $element[0].offsetTop;
            _this.initialLeft = $element[0].offsetLeft;

            $element.css({
              'height': fullHeight,
              'width': fullWidth,
              'top': 0,
              'left': 0
            });
          }

        };

        this.toggleMenu = function () {
          _this.isMenuOpened = !_this.isMenuOpened;
        };

      }]
    };
  }]);
}());

(function () {
  "use strict";
  myApp.directive('donutChart', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $timeout(function () {
          console.log(attrs.peity);
          element.peity("donut", JSON.parse(attrs.peity));
        }, 100);
      }
    }
  }]);

}());

(function () {
  "use strict";
  myApp.directive('includeReplace', [function () {
    return {
      require: 'ngInclude',
      restrict: 'A', /* optional */
      link: function (scope, el, attrs) {
        el.replaceWith(el.children());
      }
    };
  }]);
}());

(function () {
  "use strict";
  myApp.directive('lineChart', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        scope.$watch(function() {
          return attrs.lines;
        }, function(newValue){

          if (attrs.lines.length === 0) return;
          element.sparkline(JSON.parse(newValue), {
            width: '100%',
            height: '80 ',
            lineWidth: 1,
            lineColor: '#4ca8e1',
            fillColor: '#2a2a2a',
            spotRadius: 2,
            spotColor: '',
            minSpotColor: '',
            maxSpotColor: '',
            highlightSpotColor: '#00ffff',
            normalRangeColor: '#262626',
            normalRangeMin: -1,
            normalRangeMax: 10
          });
          //element[0].textContent = newValue).join();
          //element.change();

        });

      }
    }
  }]);

}());

(function () {
  "use strict";
  myApp.directive('setFocus', [function () {
    return {
      link: function(scope, element) {
        element[0].focus();
      }
    };
  }]);
}());

(function () {
  "use strict";
  myApp.directive('startMenu', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'templates/desktop/start_menu.html',
      controllerAs: 'SM',
      controller: ['$scope', 'ApplicationsFactory', function ($scope, ApplicationsFactory) {

        var _this = this;

        /*
			   * Bindings
			   */
        this.applications = ApplicationsFactory.applications();

        $scope.$watch(function () {
          return ApplicationsFactory.applications();
        }, function (newValue) {
          _this.applications = newValue;
        });

        this.appContextMenu = function () {

          return [
            [function ($itemScope) {
              return '<span class="fa-stack"><i class="fa fa-stack-2x fa-' + $itemScope.application.ico + '"></i></span> Open';
            }, function ($itemScope) {

              // Toggle application
              _this.openApplication($itemScope.application.id);

            }, function () {
              return true; // enabled = true, disabled = false
            }],
            null,
            [function ($itemScope) {
              console.log($itemScope);
              if (ApplicationsFactory.isApplicationPinned($itemScope.application.id)) {
                return '<span class="fa-stack"><i class="fa fa-thumb-tack fa-stack-2x"></i><i class="fa fa-ban fa-stack-1x text-danger"></i></span> Unpin from Task Bar';
              }
              return '<span class="fa-stack"><i class="fa fa-stack-2x fa-thumb-tack fa-rotate-90"></i></span> Pin to Task Bar';
            }, function ($itemScope) {

              // Pin application
              ApplicationsFactory.registerTaskBarApplication({
                id: $itemScope.application.id,
                pinned: !ApplicationsFactory.isApplicationPinned($itemScope.application.id)
              }, true);

            }, function () {
              return true; // enabled = true, disabled = false
            }]
          ];
        };

        /*
			   * ng-click functions
			   */
        this.openApplication = function (id) {
          ApplicationsFactory.openApplication(id);
          ApplicationsFactory.toggleApplication(id);
        };

        this.openMenu = function (menu) {
          if (_this.openedMenu === menu) return _this.openedMenu = null;
          _this.openedMenu = menu;
        };

      }]
    };
  }]);
}());

(function () {
  "use strict";
  myApp.directive('switch', [function(){
    return {
      restrict: 'AE'
      , replace: true
      , transclude: true
      , template: function(element, attrs) {
        var html = '';
        html += '<span';
        html +=   ' class="switch' + (attrs.class ? ' ' + attrs.class : '') + '"';
        html +=   attrs.ngModel ? ' ng-click="' + attrs.disabled + ' ? ' + attrs.ngModel + ' : ' + attrs.ngModel + '=!' + attrs.ngModel + (attrs.ngChange ? '; ' + attrs.ngChange + '()"' : '"') : '';
        html +=   ' ng-class="{ checked:' + attrs.ngModel + ', disabled:' + attrs.disabled + ' }"';
        html +=   '>';
        html +=   '<small></small>';
        html +=   '<input type="checkbox"';
        html +=     attrs.id ? ' id="' + attrs.id + '"' : '';
        html +=     attrs.name ? ' name="' + attrs.name + '"' : '';
        html +=     attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
        html +=     ' style="display:none" />';
        html +=     '<span class="switch-text">'; /*adding new container for switch text*/
        html +=     attrs.on ? '<span class="on">'+attrs.on+'</span>' : ''; /*switch text on value set by user in directive html markup*/
        html +=     attrs.off ? '<span class="off">'+attrs.off + '</span>' : ' ';  /*switch text off value set by user in directive html markup*/
        html += '</span>';
        return html;
      }
    }
  }]);

}());

(function () {
	"use strict";
	myApp.directive('taskBar', [function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'templates/desktop/task_bar.html',
			controllerAs: 'TB',
			controller: ['$rootScope', '$scope', '$interval', 'ApplicationsFactory', function ($rootScope, $scope, $interval, ApplicationsFactory) {

				var _this = this;

				// Set task bar time
				function calcTime () {
					var a_p = "";
					var d = new Date();
					var curr_hour = d.getHours();

					if (curr_hour < 12) {
						a_p = "AM";
					} else {
						a_p = "PM";
					}

					if (curr_hour === 0) {
						curr_hour = 12;
					}

					if (curr_hour > 12) {
						curr_hour = curr_hour - 12;
					}

					var curr_min = d.getMinutes();

					if (curr_min < 10) {
						curr_min = '0' + curr_min;
					}

					return curr_hour + ':' + curr_min + ' ' + a_p;
				}

				/*
			     * Bindings
			     */
				$interval(function () {
					_this.time = calcTime();
				}, 1000);

				this.time = calcTime();
				this.opened_applications = ApplicationsFactory.opened_applications();
				this.taskbar_applications = ApplicationsFactory.taskbar_applications();

				$scope.$watch(function () {
					return ApplicationsFactory.opened_applications();
				}, function (newValue) {
					_this.opened_applications = newValue;
				});

				$scope.$watch(function () {
					return ApplicationsFactory.taskbar_applications();
				}, function (newValue) {
					_this.taskbar_applications = newValue;
				});

				this.sortableOptions = {
					'ui-floating': true,
					items: "a:not(.not-sortable)",
					axis: 'x',
					'stop': function () {
						ApplicationsFactory.saveTaskBarApplicationsOrder(_this.taskbar_applications);
					}
				};

				this.getApplicationById = function (id) {
					return ApplicationsFactory.getApplicationById(id);
				};

				this.appContextMenu = function (id) {
					if (id === "start") return;

					return [
						[function ($itemScope) {
							return '<span class="fa-stack"><i class="fa fa-stack-2x fa-' + _this.getApplicationById($itemScope.application.id).ico + '"></i></span> ' + _this.getApplicationById($itemScope.application.id).name;
						}, function ($itemScope) {

							// Toggle application
							_this.toggleApplication($itemScope.application.id);

						}, function () {
							return true; // enabled = true, disabled = false
						}],
						null,
						[function ($itemScope) {
							if ($itemScope.application.pinned) {
								return '<span class="fa-stack"><i class="fa fa-thumb-tack fa-stack-2x"></i><i class="fa fa-ban fa-stack-1x text-danger"></i></span> Unpin from Task Bar';
							}
							return '<span class="fa-stack"><i class="fa fa-stack-2x fa-thumb-tack fa-rotate-90"></i></span> Pin to Task Bar';
						}, function ($itemScope) {

							// Pin application
							ApplicationsFactory.registerTaskBarApplication({
								id: $itemScope.application.id,
								pinned: !$itemScope.application.pinned
							}, true);

						}, function () {
							return true; // enabled = true, disabled = false
						}],
						[function () {
							return '<span class="fa-stack"><i class="fa fa-stack-2x fa-times"></i></span> Close';
						}, function ($itemScope) {

							// Close application
							$scope.$parent.$broadcast('closeApplication', $itemScope.application.id);

						}, function ($itemScope) {
							if (isApplicationOpened($itemScope.application.id) !== -1) return true;
							return false; // enabled = true, disabled = false
						}]
					];
				};

				/*
			     * ng-class functions
			     */

				var isApplicationOpened = function (id) {
					return _this.opened_applications.map(function (e) {
						return e.id;
					}).indexOf(id);
				};

				this.isStartOpened = function (id) {
					return $rootScope.taskbar__item_open === id && id === 'start';
				};

				// And is not start application
				this.isItemOpened = function (id) {
					return isApplicationOpened(id) !== -1 && id !== 'start';
				};

				// And is not start application
				this.isItemActive = function (id) {
					return $rootScope.taskbar__item_open === id && id !== 'start';
				};

				/*
			     * ng-click functions
			     */
				this.toggleApplication = function (id) {

					if (id === "start") return ApplicationsFactory.toggleApplication(id);

					// Open application
					if (isApplicationOpened(id) === -1) {
						_this.opened_applications = ApplicationsFactory.openApplication(id);
						ApplicationsFactory.toggleApplication(id);
					}

					// Emitting to application directives (minimize or maximize)
					$scope.$parent.$broadcast('toggling', id);
				};

				this.minimizeToDesktop = function () {
					$scope.$parent.$broadcast('toggling', null);
				};

			}]
		};
	}]);
}());

(function () {
  "use strict";
  myApp.directive('windowActions', [function () {
    return {
      restrict: 'E',
      scope: {
        app: "="
      },
      bindToController: true,
      templateUrl: 'templates/applications/actions.html',
      controllerAs: 'ACTIONS',
      controller: [function () {

      }]
    };
  }]);
}());

(function () {
  "use strict";
  myApp.directive('windowBody', [function () {
    return {
      restrict: 'E',
      scope: {
        app: "="
      },
      bindToController: true,
      templateUrl: 'templates/applications/body.html',
      controllerAs: 'BODY',
      controller: [function () {

        this.toggleList = function ($event) {

          angular.element($event.currentTarget.parentElement.parentElement).toggleClass('side__list--open');

          // TODO: This is jQuery
          angular.element($event.currentTarget.parentElement.nextElementSibling).animate({
            'height': 'toggle',
            'opacity': 'toggle'
          }, 250);
        };

      }]
    };
  }]);
}());

(function () {
  "use strict";
  myApp.directive('windowMenu', [function () {
    return {
      restrict: 'E',
      scope: {
        app: "=",
        isMenuOpened: "="
      },
      bindToController: true,
      templateUrl: 'templates/applications/menu.html',
      controllerAs: 'MENU',
      controller: [function () {

      }]
    };
  }]);
}());

(function () {
  "use strict";
  myApp.directive('windowStatus', [function () {
    return {
      restrict: 'E',
      scope: {
        app: "="
      },
      bindToController: true,
      templateUrl: 'templates/applications/status.html',
      controllerAs: 'STATUS',
      controller: [function () {

      }]
    };
  }]);
}());

(function () {
	"use strict";
	myApp.factory('ApplicationsFactory', ['$rootScope', 'ServerFactory', 'toastr', 'fileSystemFactory', function ($rootScope, ServerFactory, toastr, fileSystemFactory) {

		/*
		 * -----------------------
		 * PRIVATE FUNCTIONS
		 * -----------------------
		 */


		/*
		 * @Description
		 * Check if application is in Desktop Task Bar
		 *
		 * @params
		 * id {String} Application ID
		 */
		var isApplicationInTaskBar = function (id) {
			return taskbar_applications.map(function (e) {
				return e.id;
			}).indexOf(id);
		};

		/*
		 * @Description
		 * Check if application is opened
		 *
		 * @params
		 * id {String} Application ID
		 */
		var isApplicationOpened = function (id) {
			return opened_applications.map(function (e) {
				return e.id;
			}).indexOf(id);
		};

		/*
		 * -----------------------
		 * PUBLIC FUNCTIONS
		 * -----------------------
		 */

		var applications = [
			{id: "start", ico: "windows", name: "Start Menu", menu: true}
		];

		var taskbar_applications = [];
		var opened_applications = [];

		var errorHandler = function (e) {
			toastr.error(e, 'General Error');

			return new Error(e);
		};

		/*
		 * @Description
		 * If and application is not registered it will not be accessible from Desktop or other applications
		 *
		 * @params
		 * data {Object}
		 */
		var registerApplication = function (data) {
			applications.push(data);
		};

		/*
		 * @Description
		 * Set an application to be shown in Desktop Task Bar
		 *
		 * @params
		 * data {Object}
		 */
		var registerTaskBarApplication = function (data, save) {

			var application_index = isApplicationInTaskBar(data.id);

			// Applications already in Task Bar
			if (application_index !== -1) {

				// Delete if unpin application and is not opened
				if (data.pinned === false && isApplicationOpened(data.id) === -1) {
					taskbar_applications.splice(application_index, 1);
				} else {

					// Pin or unpin opened application application
					taskbar_applications[application_index].pinned = data.pinned;
				}

			} else {

				// Application not in Task Bar
				taskbar_applications.push(data);
			}

			// Save new config to file
			if (save === true) {
				var applications_to_save = taskbar_applications.filter(function (obj) {
					return obj.pinned === true && obj.id !== "start";
				});

				return ServerFactory.saveConfigToFile(applications_to_save, 'desktop/task_bar.json', true);
			}
		};

		/*
		 * @Description
		 * Closes an application
		 *
		 * @params
		 * id {String} Application ID
		 */
		var closeApplication = function (id) {

			// Delete application object
			opened_applications = opened_applications.filter(function (el) {
				return el.id !== id;
			});

			// Remove from Desktop Task Bar
			taskbar_applications = taskbar_applications.filter(function (el) {
				return el.id !== id || el.pinned === true;
			});

			// TODO: destroy application scopes

			return opened_applications;
		};

		/*
		 * @Description
		 * Opens a new application
		 *
		 * @params
		 * app {String/Object} Application name
		 */
		var openApplication = function (app) {

			// If app is not an object get all application data
			if (angular.isString(app)) {
				app = getApplicationById(app);
			}

			// Check if application is already opened
			if (isApplicationOpened(app.id) !== -1) return;

			// Application not in pinned list. Show it on Desktop Task Bar
			if (isApplicationInTaskBar(app.id) === -1) {
				registerTaskBarApplication({
					id: app.id
				});
			}

			//TODO: 'z-index' : zIndex++

			// Create a new instance of the application
			opened_applications.push(app);
			return opened_applications;
		};

		/*
		 * @Description
		 * Puts an application active or at background
		 *
		 * @params
		 * id {String} Application ID
		 */
		var toggleApplication = function (id) {
			if (isActiveApplication(id)) return $rootScope.taskbar__item_open = null;
			$rootScope.taskbar__item_open = id;
		};

		/*
		 * @Description
		 * Check if application is active (not in background) on Desktop
		 *
		 * @params
		 * id {String} Application ID
		 */
		var isActiveApplication = function (id) {
			return $rootScope.taskbar__item_open === id;
		};

		/*
		 * @Description
		 * Check if application is pinned in Task Bar
		 *
		 * @params
		 * id {String} Application ID
		 */
		var isApplicationPinned = function (id) {

			var application = taskbar_applications.filter(function (obj) {
				return obj.id === id;
			})[0];

			if (application) return application.pinned;
			return false;

		};

		/*
		 * @Description
		 * Return all application info
		 *
		 * @params
		 * id {String} Application ID
		 */
		var getApplicationById = function (id) {
			return applications.filter(function (obj) {
				return obj.id === id;
			})[0];
		};

		/*
		 * Returns all scripts to load as SysOS applications
		 */
		var getInstalledApplications = function () {
			return fileSystemFactory.getFileSystemPath('/bin/applications', function (data) {
				return data;
			});
		};

		/*
		 * Function called after Sort taskbar applications
		 */
		var saveTaskBarApplicationsOrder = function (applications) {
			var applications_to_save = applications.filter(function (obj) {
				delete obj["$$hashKey"];
				return obj.pinned === true && obj.id !== "start";
			});

			return ServerFactory.saveConfigToFile(applications_to_save, 'desktop/task_bar.json', true);
		};

		return {
			errorHandler: errorHandler,
			registerApplication: registerApplication,
			applications: function () {
				return applications;
			},
			registerTaskBarApplication: registerTaskBarApplication,
			taskbar_applications: function () {
				return taskbar_applications;
			},
			opened_applications: function () {
				return opened_applications;
			},
			closeApplication: closeApplication,
			openApplication: openApplication,
			toggleApplication: toggleApplication,
			isActiveApplication: isActiveApplication,
			isApplicationPinned: isApplicationPinned,
			getApplicationById: getApplicationById,
			getInstalledApplications: getInstalledApplications,
			saveTaskBarApplicationsOrder: saveTaskBarApplicationsOrder
		};

	}]);
}());

(function () {
	"use strict";
	myApp.factory('connectionsFactory', ['$rootScope', '$injector', '$filter', '$timeout', 'socket', 'ServerFactory', 'toastr', 'uuid',
		function ($rootScope, $injector, $filter, $timeout, socket, ServerFactory, toastr, uuid) {

			var connections = {
				standalone: [],
				virtual: [],
				storage: [],
				sftp: [],
				ssh: []
			};
			var uuidMap = [];
			var linksMap = [];
			var SSHterminals = [];

			/*
			 * Deletes a connection
			 *
			 * @params
			 * uuid {String}
			 */
			var getConnectionCategoryByUuid = function (uuid) {
				var connection_category = getConnectionByUuid(uuid).category;

				if (connection_category === "vmware") return "virtual";
				return connection_category;
			};

			/*
			 * Set connections info fetched from config file
			 *
			 * @params
			 * connections {Array}
			 */
			var setSavedConnections = function (connections) {

				return angular.forEach(connections, function (connection) {
					// Populate saved option (connection saved in config file)
					return setNewConnection(connection, true);
				});

			};

			/*
			 * Save connection to config file
			 *
			 * @params
			 * connection {Object}
			 */
			var saveConnection = function (connection) {

				var configFile;

				if (connection.category === "standalone" || connection.category === "virtual" || connection.category === "storage") configFile = 'applications/smanager/config.json';
				if (connection.category === "ssh") configFile = 'applications/ssh/config.json';
				if (connection.category === "sftp") configFile = 'applications/sftp/config.json';

				return ServerFactory.saveConfigToFile(connection, configFile, false, function (data) {

				});

			};

			/*
			 * Add new connection to connections array
			 */
			var setNewConnection = function (connection, initialized) {
				var mapId;

				/*
				 * STANDALONE nodes
				 */
				if (connection.category === "standalone") {

					if (connection.so === "linux") {

						// Connection fetched from config file
						if (initialized) {
							mapId = connections.standalone.push(connection) - 1;

							// This is a new connection
						} else {
							mapId = connections.standalone.push({
								uuid: connection.uuid,
								host: connection.host,
								port: connection.port,
								category: connection.category,
								description: connection.description,
								credential: connection.credential,
								so: connection.so,
								autologin: connection.autologin,
								save: true,
								folder: connection.folder
							}) - 1;
						}
					}

					if (connection.so === "snmp") {

						// Connection fetched from config file
						if (initialized) {
							mapId = connections.standalone.push(connection) - 1;

							// This is a new connection
						} else {
							mapId = connections.standalone.push({
								uuid: connection.uuid,
								host: connection.host,
								port: connection.port,
								category: connection.category,
								description: connection.description,
								credential: connection.credential,
								so: connection.so,
								autologin: connection.autologin,
								save: true,
								folder: connection.folder,
								oids: connection.oids
							}) - 1;
						}
					}

					// Create uuid mapping used by getObjectByUuidMapping();
					uuidMap.push({
						uuid: connection.uuid,
						object: "_this.connections.standalone[" + mapId + "]"
					});

					// Connect to target node
					if (connection.autologin === true) {
						return connect(connection);
					}
				}

				/*
				 * VMWARE nodes
				 */
				if (connection.category === "virtual") {

					// Connection fetched from config file
					if (initialized) {
						mapId = connections.virtual.push(connection) - 1;

						// This is a new connection
					} else {
						// Check if connection already exists
						if ($filter('filter')(connections.virtual, {host: connection.host}).length > 0) {
							return toastr.error('Node (' + connection.host + ') already exists. Please modify the existing connection properties or ReScan the node.', 'Error getting data from vCenter');
						}

						mapId = connections.virtual.push({
							uuid: connection.uuid,
							host: connection.host,
							port: connection.port,
							so: connection.so,
							category: connection.category,
							description: connection.description,
							credential: connection.credential,
							save: true
						}) - 1;
					}

					// Create uuid mapping used by getObjectByUuidMapping();
					uuidMap.push({
						uuid: connection.uuid,
						object: "_this.connections.virtual[" + mapId + "]"
					});

					// Connect to target node only if connection is not initialized, preventing too many API requests to target node
					if (connection.autologin === true && !initialized) {
						return connect(connection);
					}
				}

				/*
				 * NETAPP nodes
				 */
				if (connection.category === "storage") {

					if (connection.so === "netapp") {

						// Connection fetched from config file
						if (initialized) {
							mapId = connections.storage.push(connection) - 1;

							// This is a new connection
						} else {
							// Check if connection already exists
							if ($filter('filter')(connections.storage, {host: connection.host}).length > 0) {
								return toastr.error('Node (' + connection.host + ') already exists. Please modify the existing connection properties or ReScan the node.', 'Error getting data from NetApp');
							}

							mapId = connections.storage.push({
								uuid: connection.uuid,
								host: connection.host,
								port: connection.port,
								so: connection.so,
								category: connection.category,
								description: connection.description,
								credential: connection.credential,
								autologin: connection.autologin,
								save: true
							}) - 1;
						}

						// Create uuid mapping used by getObjectByUuidMapping();
						uuidMap.push({
							uuid: connection.uuid,
							object: "_this.connections.storage[" + mapId + "]"
						});

						// Connect to target node only if connection is not initialized, preventing too many API requests to target node
						if (connection.autologin === true && !initialized) {
							return connect(connection);
						}
					}
				}

				/*
				 * SSH nodes
				 */
				if (connection.category === "ssh") {
					// Connection fetched from config file
					if (initialized) {
						mapId = connections.ssh.push(connection) - 1;

						// This is a new connection
					} else {
						mapId = connections.ssh.push({
							uuid: connection.uuid,
							host: connection.host,
							port: connection.port,
							category: connection.category,
							description: connection.description,
							credential: connection.credential,
							type: "new",
							autologin: connection.autologin,
							save: connection.save
						}) - 1;
					}

					// Create uuid mapping used by getObjectByUuidMapping();
					uuidMap.push({
						uuid: connection.uuid,
						object: "_this.connections.ssh[" + mapId + "]"
					});

					// Connect to target node
					if (!connection.save || (connection.save === true && connection.autologin === true)) {
						return connect(connection);
					}
				}

				/*
				 * SFTP nodes
				 */
				if (connection.category === "sftp") {
					// Connection fetched from config file
					if (initialized) {
						mapId = connections.sftp.push(connection) - 1;

						// This is a new connection
					} else {
						mapId = connections.sftp.push({
							uuid: connection.uuid,
							host: connection.host,
							port: connection.port,
							category: connection.category,
							description: connection.description,
							credential: connection.credential,
							type: "new",
							currentPath: "/",
							currentData: "",
							autologin: connection.autologin,
							save: connection.save
						}) - 1;
					}

					// Create uuid mapping used by getObjectByUuidMapping();
					uuidMap.push({
						uuid: connection.uuid,
						object: "_this.connections.sftp[" + mapId + "]"
					});

					// Connect to target node
					if (!connection.save || (connection.save === true && connection.autologin === true)) {
						return connect(connection);
					}
				}

			};

			/*
			 * Creates a connection to target server and/or fetch server data
			 *
			 * @params
			 * connection {Object}
			 */
			var connect = function (connection) {

				// TODO: this is an anti-pattern
				var smanagerFactory = $injector.get('smanagerFactory');

				// New connection
				if (!connection.uuid) {
					connection.uuid = uuid.v4();
					return setNewConnection(connection);
				}

				/*
				 * Standalone
				 */
				if (connection.so === "linux" || connection.so === "snmp") {
					socket.emit('session__new', 'smanager', connection.host, connection.credential, null, connection.uuid, connection.so);
				}

				/*
				 * VMWARE
				 */
				if (connection.category === "virtual") {
					if (connection.so === "vmware") {
						return smanagerFactory.getVMwareData(connection);
					}
				}

				/*
				 * NETAPP
				 */
				if (connection.category === "storage") {
					if (connection.so === "netapp") {
						return smanagerFactory.getNetAppData(connection);
					}
				}

				/*
				 * SSH
				 */
				if (connection.category === "ssh") {

					if (connection.save) saveConnection(connection);

					SSHterminals[connection.uuid] = new Terminal({
						cursorBlink: true
					});

					SSHterminals[connection.uuid].on('data', function (data) {
						socket.emit('ssh_session__data', data, connection.uuid)
					});

					$timeout(function () {
						var terminalContainer = document.getElementById('terminal-container-' + connection.uuid);

						SSHterminals[connection.uuid].open(terminalContainer, {
							focus: true
						});

						socket.emit('ssh_session__geometry', SSHterminals[connection.uuid].cols, SSHterminals[connection.uuid].rows, connection.uuid);
						socket.emit('session__new', 'ssh', connection.host, connection.credential, null, connection.uuid);
					}, 100);

				}

				/*
				 * SFTP
				 */
				if (connection.category === "sftp") {

					console.log(connection);

					if (connection.save) saveConnection(connection);

					socket.emit('session__new', 'sftp', connection.host, connection.credential, null, connection.uuid);

				}

				return connection;
			};

			/*
			 * Disconnect connection at server side
			 *
			 * @params
			 * uuid {String}
			 */
			var disconnectConnection = function (uuid) {
				if (!uuid) throw new Error("uuid_not_found");

				var connection_category = getConnectionCategoryByUuid(uuid);

				if (connection_category === "stfp" || connection_category === "ssh" || connection_category === "linux") socket.emit('session__disconnect', uuid);

				getConnectionByUuid(uuid).state = "disconnected";
				getConnectionByUuid(uuid).status = "Disconnected";
			};

			/*
			 * Deletes a connection
			 *
			 * @params
			 * uuid {String}
			 */
			var deleteConnection = function (uuid) {
				if (!uuid) throw new Error("uuid_not_found");

				var file;

				var connection_category = getConnectionCategoryByUuid(uuid);
				console.log(uuid);
				console.log(connection_category);

				connections[connection_category] = connections[connection_category].filter(function (el) {
					return el.uuid !== uuid;
				});

				disconnectConnection(uuid);

				if (connection_category === "virtual" || connection_category === "storage" || connection_category === "standalone") file = 'applications/smanager/config.json';
				if (connection_category === "ssh") file = 'applications/ssh/config.json';
				if (connection_category === "sftp") file = 'applications/sftp/config.json';

				return ServerFactory.deleteConfigFromFile(uuid, file, false, function (data) {

				});
			};

			/*
			 * Get connection info from connections array
			 *
			 * @params
			 * uuid {String}
			 */
			var getConnectionByUuid = function (uuid) {
				var filter_standalone = $filter('filter')(connections.standalone, {uuid: uuid})[0];
				var filter_virtual = $filter('filter')(connections.virtual, {uuid: uuid})[0];
				var filter_storage = $filter('filter')(connections.storage, {uuid: uuid})[0];
				var filter_ssh = $filter('filter')(connections.ssh, {uuid: uuid})[0];
				var filter_sftp = $filter('filter')(connections.sftp, {uuid: uuid})[0];

				if (filter_standalone) return filter_standalone;
				if (filter_virtual) return filter_virtual;
				if (filter_storage) return filter_storage;
				if (filter_ssh) return filter_ssh;
				if (filter_sftp) return filter_sftp;

				return false;
			};

			/*
			 * Save uuid Mapping to config file
			 */
			var saveUuidMap = function (map) {

				angular.extend(uuidMap, uuidMap[0], map);

				return ServerFactory.saveConfigToFile(uuidMap, 'applications/smanager/map.json', true, function (data) {

				});

			};

			/*
			 * Save node links to config file
			 */
			var saveLinksMap = function (links) {

				angular.extend(linksMap, linksMap[0], links);

				return ServerFactory.saveConfigToFile(linksMap, 'applications/smanager/links.json', true, function (data) {

				});

			};

			/*
			 * Creates an Eval string to fast fetch recursive data from an uuid
			 *
			 * @params
			 * uuid {String}
			 * parent {Int} Get 1st, 2nd, 3rd... parent object instead of all object
			 */
			var getObjectByUuidMapping = function (uuid, parent) {
				var object;
				var object_to_eval = "";

				// LEVEL 1
				object = $filter('filter')(uuidMap, {uuid: uuid})[0];
				if (!object) return false;

				if (!parent) object_to_eval = object.object;

				for (var i = 0; i <= 3; i++) {
					if (object.parent) {
						object = $filter('filter')(uuidMap, {uuid: object.parent})[0];
						if (!object) return false;

						if (i === 0 && parent >= 2) continue;
						if (i === 1 && parent >= 3) continue;

						object_to_eval = object.object + "." + object_to_eval;
						continue;
					}
					break;
				}

				// Remove last "dot" from object_to_eval if parent value is passed
				if (parent >= 1) return object_to_eval.slice(0, -1);

				return object_to_eval;

			};

			return {
				connections: function () {
					return connections;
				},
				setSavedConnections: setSavedConnections,
				saveConnection: saveConnection,
				connect: connect,
				disconnectConnection: disconnectConnection,
				deleteConnection: deleteConnection,
				getConnectionByUuid: getConnectionByUuid,
				getConnectionByCategory: function (category) {
					return connections[category];
				},
				setUuidMap: function (map) {
					uuidMap = map;
				},
				getUuidMap: function () {
					return uuidMap;
				},
				getSSHTerminals: function () {
					return SSHterminals;
				},
				saveUuidMap: saveUuidMap,
				saveLinksMap: saveLinksMap,
				getObjectByUuidMapping: getObjectByUuidMapping
			};

		}]);

}());

(function () {
  "use strict";
  myApp.factory('fileSystemFactory', ['ServerFactory', 'Upload', 'toastr', function (ServerFactory, Upload, toastr) {

    var getFileSystemPath = function (path, callback) {
      return ServerFactory.getFileSystemPath(path, function (data) {
        return callback(data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var uploadFile = function (file) {

      file.upload = Upload.upload({
        url: '/api/file/upload',
        method: 'POST',
        headers: {
          'Content-Type': file.type
        },
        data: {file: file, 'path': file.path}
      });

      file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });

      return file.upload.then(function (response) {
        return file.result = response.data;
      }, function (response) {
        if (response.status > 0) {
          var errorMsg = response.status + ': ' + response.data;
          toastr.error(errorMsg, 'Error');
        }
      });

    };

    var getFileType = function (longname) {
      if (longname.charAt(0) === "d") return "folder";
      if (longname.charAt(0) === "l") return "folder";
      if (longname.charAt(0) === "-" && (longname.charAt(3) === "x")) return "file-code-o";
      if (longname.charAt(0) === "-") return "file";
    };

    var getFileContents = function (path, callback) {
      return ServerFactory.getFileContents(path, function (data) {
        return callback(data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var renameFile = function (path, oldName, newName, callback) {
      return ServerFactory.renameFile({
        path: path,
        oldName: oldName,
        newName: newName
      }, function (data) {
        return callback(data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var createFolder = function (path, name, callback) {
       return ServerFactory.createFolder({
         path: path,
         name: name
      }, function (data) {
         return callback(data.data);
      }, function (data) {
         console.log("Error: " + data);
      });
    };

    var deleteFile = function (path, name, callback) {
       return ServerFactory.deleteFile({
         path: path,
         name: name
      }, function (data) {
         return callback(data.data);
      }, function (data) {
         console.log("Error: " + data);
      });
    };

    var downloadFileFromInet = function (url, path, callback) {
       return ServerFactory.downloadFileFromInet(url, path, function (data) {
         return callback(data.data);
      }, function (data) {
         console.log("Error: " + data);
      });
    };

    var copyFile = function (src, dst, callback) {
	    return ServerFactory.copyFile(src, dst, function (data) {
		    return callback(data.data);
	    }, function (data) {
		    console.log("Error: " + data);
	    });
    };

    var moveFile = function (src, dst, callback) {
        return ServerFactory.moveFile(src, dst, function (data) {
            return callback(data.data);
        }, function (data) {
            console.log("Error: " + data);
        });
    };

    return {
      getFileSystemPath: function (path, callback) {
        return getFileSystemPath(path, callback);
      },
      uploadFile: function (file) {
        return uploadFile(file);
      },
      getFileType: function (longname) {
        return getFileType(longname);
      },
      getFileContents: function (path, callback) {
        return getFileContents(path, callback);
      },
      renameFile: function (path, oldName, newName, callback) {
        return renameFile(path, oldName, newName, callback);
      },
      createFolder: function (path, name, callback) {
        return createFolder(path, name, callback);
      },
      deleteFile: function (path, name, callback) {
        return deleteFile(path, name, callback);
      },
      downloadFileFromInet: function (url, path, callback) {
        return downloadFileFromInet(url, path, callback);
      },
      copyFile: copyFile,
      moveFile: moveFile
    }

  }]);
}());

(function () {
  "use strict";
  myApp.factory('modalFactory', ['$uibModal', '$document', function ($uibModal, $document) {
    var modalInstances = [];

    /*
     * Opens a Modal and append it.
     */
    var openLittleModal = function (tittle, text, query, type, button_text, inputValue) {

      var appendTo = angular.element($document[0].querySelector(query));
      var templateUrl = (type === "plain" ?
        "templates/utils/modal.html" : (type === "ESXiSelectable" ?
          "templates/utils/ESXiSelectable.html" : (type === "question" ?
            "templates/utils/question.html" : type === "DatastoreSelectable" ?
              "templates/utils/DatastoreSelectable.html" : (type === "input" ?
                "templates/utils/input.html" : ''
              )
            )
          )
        );

      if (appendTo.length) {
        modalInstances[query] = $uibModal.open({
          templateUrl: templateUrl,
          controller: ['$scope', 'title', 'text', 'button_text', 'inputValue', '$uibModalInstance', 'connectionsFactory', function ($scope, title, text, button_text, inputValue, $uibModalInstance, connectionsFactory) {
            $scope.title = title;
            $scope.text = text;
            $scope.button_text = button_text;
            $scope.inputValue = inputValue;

            $scope.selectESXihost = function () {
              $uibModalInstance.close($scope.selectedHost);
            };

            $scope.selectDatastore = function () {
                $uibModalInstance.close($scope.selectedDatastore);
            };

            $scope.yes_input = function () {
                $uibModalInstance.close($scope.inputValue);
            };

            $scope.yes = function () {
              $uibModalInstance.close(true);
            };

            $scope.no = function () {
              $uibModalInstance.close(false);
            };

            // Get all Datastores from managed ESXi/vCenter hosts
            if (type === "DatastoreSelectable") {
              var connections = connectionsFactory.getConnectionByCategory('virtual');

              $scope.text = [];

              angular.forEach(connections, function (connection) {
	              angular.forEach(connection.datastores, function (datastore) {
		              $scope.text.push({
                          name: datastore.name,
                          id: datastore.obj.name,
                          credential: connection.credential,
                          host: connection.host,
                          port: connection.port,
                          datacenter: connection.datacenters[0].datacenter // TODO: check datacenter per datastore (not always will be the 1st [0] datacenter)
                      });
                  });
              });
            }

          }],
          backdropClass: 'absolute',
          windowClass: 'absolute',
          size: 'sm',
          appendTo: appendTo,
          resolve: {
            title: function () {
              return tittle;
            },
            text: function () {
              return text;
            },
            button_text: function () {
		          return button_text;
            },
            inputValue: function () {
              return inputValue;
            }
          }
        });

        return modalInstances[query];

      }

    };

    /*
     * Opens a Modal and append it.
     */
    var openWizardModal = function (tittle, data, query, type) {

      var appendTo = angular.element($document[0].querySelector(query));
      var templateUrl = (type === "recoveryWizard" ? "templates/utils/recoveryWizard.html" : '');

      if (appendTo.length) {
        modalInstances[query] = $uibModal.open({
          templateUrl: templateUrl,
          controllerAs: 'wmC',
          controller: ['title', 'data', '$uibModalInstance', 'ServerFactory', '$filter', function (title, data, $uibModalInstance, ServerFactory, $filter) {

            var _this = this;
            this.title = title;
            this.step = 1;
            this.data = data;

            this.vmName = data.vm.name;
            this.powerVM = false;

            this.getSnapshotName = function () {
	            return $filter('filter')(data.snapshots, {
		            "snapshot-instance-uuid": data.snapshot
	            })[0].name;
            };

            this.selectData = function () {
              if ((!_this.selectedHost || !_this.selectedFolder || !_this.selectedPool) && _this.restoreType === "new") return _this.step = 3;

              $uibModalInstance.close({
                host: _this.selectedHost,
                folder: _this.selectedFolder,
                resource_pool: _this.selectedPool,
                vm_name: _this.vmName,
                vm_power_on: _this.powerVM,
                restore_location: _this.restoreType,
              });
            };

            /*
             * Load Folders and Resource Pools
             */
            this.loadESXidata = function () {
              var modalInstanceText = openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-recovery-wizard', 'plain');

              return ServerFactory.connectVcenter(_this.selectedHost.connection_address, _this.selectedHost.connection_credential).then(function (con) {
                if (con.data.status === "error") throw new Error(con.data.data);

                changeModalText('Getting data...', '.modal-recovery-wizard');

                // Get VM folders in selected vCenter
                return ServerFactory.callVcenter(_this.selectedHost.connection_address, '/rest/vcenter/folder?filter.type=VIRTUAL_MACHINE').then(function(data_folder) {
                  if (data_folder.data.status === "error") throw new Error(data_folder.data.data);
                  _this.data.folders = data_folder.data.data.response.value;

                  // Get Resource Pools from selected host
                  return ServerFactory.callVcenter(_this.selectedHost.connection_address, '/rest/vcenter/resource-pool').then(function(resource_pool) {
                    if (resource_pool.data.status === "error") throw new Error(resource_pool.data.data);

                    _this.data.resource_pools = resource_pool.data.data.response.value;

                    modalInstanceText.close();
                  });
                });
              });
            };

          }],
          backdropClass: 'absolute',
          windowClass: 'absolute',
          appendTo: appendTo,
          resolve: {
            title: function () {
              return tittle;
            },
            data: function () {
              return data;
            }
          }
        });

        return modalInstances[query];

      }

    };

    /*
     * Change text of already created modal
     */
    var changeModalText = function (text, query) {

      var appendTo = angular.element($document[0].querySelector(query));

      if (appendTo.length) angular.element($document[0].querySelector(query + ' .modal')).scope().text = text;

    };

    /*
     * Close already created modal
     */
    var closeModal = function (query) {
      if (modalInstances[query]) modalInstances[query].close('ok');
    };

    return {
      openLittleModal: openLittleModal,
      openWizardModal: openWizardModal,
      changeModalText: changeModalText,
      closeModal: closeModal
    };

  }]);

}());

(function () {
  "use strict";
  myApp.factory('netappFactory', ['ApplicationsFactory', 'ServerFactory', '$q', function (ApplicationsFactory, ServerFactory, $q) {

    //netapp-manageability-sdk-ontap-9.3-api-documentation/doc/WebHelp/index.htm

    /*
     * PRIVATE FUNCTIONS
     */
    var parseNetAppObject = function (data, parent) {

      if (!parent) parent = {};

       angular.forEach(data, function (value, key) {

        if (Array.isArray(value) && value.length === 1 && value[0] !== Object(value[0])) {
          parent[key] = value[0];
        } else if (Array.isArray(value) && value.length === 1 && value[0] === Object(value[0])) {
          parent[key] = parseNetAppObject(value[0], parent[key]);
        } else if (Array.isArray(value) && value.length > 1 && value[0] === Object(value[0])) {
          parent[key] = value;

          angular.forEach(value, function (v, k) {
            parent[key][k] = parseNetAppObject(v, parent[k]);
          });
        } else {
          parent[key] = value;
        }
       });

       return parent;

    };

    /*
     * Custom errorHandler function for NetAppFactory
     */
    var errorHandler = function (e) {
      return {
        status: "error",
        error: e
      };
    };

    /*
     * Custom validResponse function for NetAppFactory
     */
    var validResponse = function (e) {
      return {
        status: "ok",
        data: e
      };
    };

    /** @namespace data.data.data.response.netapp */

    /*
     * PUBLIC FUNCTIONS
     */
    var getSystemVersion = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><system-get-version/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          build_timestamp: data.data.data.response.netapp.results[0]["build-timestamp"][0],
          is_clustered: data.data.data.response.netapp.results[0]["is-clustered"][0],
          version: data.data.data.response.netapp.results[0].version[0],
          version_tuple: {
            generation: data.data.data.response.netapp.results[0]["version-tuple"][0]["system-version-tuple"][0].generation[0],
            major: data.data.data.response.netapp.results[0]["version-tuple"][0]["system-version-tuple"][0].major[0],
            minor: data.data.data.response.netapp.results[0]["version-tuple"][0]["system-version-tuple"][0].minor[0]
          }
        });

      });
    };

    var getOntapiVersion = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><system-get-ontapi-version/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          major_version: data.data.data.response.netapp.results[0]["major-version"][0],
          minor_version: data.data.data.response.netapp.results[0]["minor-version"][0]
        });

      });
    };

    var getLicenses = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><license-v2-status-list-info/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        var results = [];

        angular.forEach(data.data.data.response.netapp.results[0]["license-v2-status"]["0"]["license-v2-status-info"], function (license) {
          results.push(parseNetAppObject(license));
        });

        return validResponse(results);
      });
    };

    var getMetrocluster = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><metrocluster-get/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          local_cluster_name: data.data.data.response.netapp.results[0].attributes[0]["metrocluster-info"][0]["local-cluster-name"][0],
          local_configuration_state: data.data.data.response.netapp.results[0].attributes[0]["metrocluster-info"][0]["local-configuration-state"][0]
        });

      });
    };

    var getClusterIdentity = function (credential, host, port) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><cluster-identity-get/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          cluster_contact: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-contact"][0],
          cluster_location: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-location"][0],
          cluster_name: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-name"][0],
          cluster_serial_number: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-serial-number"][0],
          cluster_uuid: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["cluster-uuid"][0],
          rdb_uuid: data.data.data.response.netapp.results[0].attributes[0]["cluster-identity-info"][0]["rdb-uuid"][0]
        });
      });
    };

    var getQtrees = function (credential, host, port, vfiler, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><qtree-list-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</qtree-list-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["qtree-info"], function (qtree) {
          results.push(parseNetAppObject(qtree));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getQtrees(credential, host, port, vfiler, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getNetInterfaces = function (credential, host, port, vfiler, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><net-interface-get-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</net-interface-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["net-interface-info"], function (netiface) {
          results.push(parseNetAppObject(netiface));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getNetInterfaces(credential, host, port, vfiler, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getFcpInterfaces = function (credential, host, port, vfiler, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><fcp-interface-get-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</fcp-interface-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["fcp-interface-info"], function (fcpiface) {
          results.push(parseNetAppObject(fcpiface));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getFcpInterfaces(credential, host, port, vfiler, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getNFSStatus = function (credential, host, port, vfiler) {
      return ServerFactory.callNetApp(credential, host, port, null, "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><nfs-status/></netapp>").then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse({
          is_drained: data.data.data.response.netapp.results[0]["is-drained"][0],
          is_enabled: data.data.data.response.netapp.results[0]["is-enabled"][0]
        });
      });
    };

    var getVservers = function (credential, host, port, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'><vserver-get-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</vserver-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["vserver-info"], function (vserver) {
          results.push(parseNetAppObject(vserver));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getVservers(credential, host, port, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getVolumes = function (credential, host, port, vfiler, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-get-iter><max-records>10</max-records>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</volume-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["volume-attributes"], function (volume) {
          results.push(parseNetAppObject(volume));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getVolumes(credential, host, port, vfiler, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getSnapshots = function (credential, host, port, vfiler, volume, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><snapshot-get-iter><max-records>10</max-records>" + (volume ? "<query><snapshot-info><volume>" + volume + "</volume></snapshot-info></query>" : "") + "" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</snapshot-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["snapshot-info"], function (snapshot) {
          results.push(parseNetAppObject(snapshot));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getSnapshots(credential, host, port, vfiler, volume, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getSnapshotFiles = function (credential, host, port, vfiler, volume, snapshot, path, results, next_tag) {
      var di_promises = [];

      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><file-list-directory-iter><path>/vol/" + volume + "/.snapshot/" + snapshot + "" + path + "</path>" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</file-list-directory-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno, host);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason, host);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        // For each file found
        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["file-info"], function (file) {
          file = parseNetAppObject(file);
          if (file.name === '.' || file.name === '..') return;

          file.path = path;
          results.push(file);

          // Get directories
          if (file["file-type"] === "directory") {
            di_promises.push(getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path + '/' + file.name, results));
          }

        });

        // if directory found
        if (di_promises.length > 0) {

          // Get all files in each found directory directory
          return $q.all(di_promises).then(function (results) {

            results = results[0].data;

            if (data.data.data.response.netapp.results[0]["next-tag"]) {
              var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
              return getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path, results, next_tag);
            }

            return validResponse(results);

          });
        }

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var snapshotRestoreFile = function (credential, host, port, vfiler, volume, snapshot, dst) {
        var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><snapshot-restore-file><path>" + dst + "</path><snapshot>" + snapshot + "</snapshot><volume>" + volume + "</volume></snapshot-restore-file></netapp>";

        return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
            if (data.data.status === "error") return errorHandler(data.data.data.errno);
            if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

            return validResponse(data.data.data.response.netapp);
        });
    };

    var getLuns = function (credential, host, port, vfiler, volume, results, next_tag) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><lun-get-iter><max-records>10</max-records>" + (volume ? "<query><lun-info><volume>" + volume + "</volume></lun-info></query>" : "") + "" + (next_tag ? "<tag>" + next_tag + "</tag>" : "") + "</lun-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        if (!data.data.data.response.netapp.results[0]["attributes-list"]) return validResponse();

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["lun-info"], function (lun) {
          results.push(parseNetAppObject(lun));
        });

        if (data.data.data.response.netapp.results[0]["next-tag"]) {
          var next_tag = data.data.data.response.netapp.results[0]["next-tag"][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return getLuns(credential, host, port, vfiler, volume, results, next_tag);
        }

        return validResponse(results);
      });
    };

    var getFileInfo = function (credential, host, port, vfiler, volume, snapshot) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><file-get-file-info><path>/vol/" + volume + "/.snapshot/" + snapshot + "</path></file-get-file-info></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data);
      });
    };

    var cloneVolumeFromSnapshot = function (credential, host, port, vfiler, volume, snapshot) {
      // TODO: check if this snapshot volume is already created by another restore
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-clone-create><parent-volume>" + volume + "</parent-volume><volume>SysOS_" + volume + "_Restore</volume><space-reserve>none</space-reserve><parent-snapshot>" + snapshot + "</parent-snapshot></volume-clone-create></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results[0].$.status);
      });
    };

    var mountVolume = function (credential, host, port, vfiler, volume) {
      // TODO: check if this junction path is in use by another restore
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-mount><activate-junction>true</activate-junction><junction-path>/SysOS_" + volume + "_Restore</junction-path><volume-name>SysOS_" + volume + "_Restore</volume-name><export-policy-override>false</export-policy-override></volume-mount></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results["0"].$.status);
      });
    };

    var unmountVolume = function (credential, host, port, vfiler, volume) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-unmount><volume-name>SysOS_" + volume + "_Restore</volume-name><force>True</force></volume-unmount></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results[0].$.status);
      });
    };

    var setVolumeOffline = function (credential, host, port, vfiler, volume) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-offline><name>SysOS_" + volume + "_Restore</name></volume-offline></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results[0].$.status);
      });
    };

    var destroyVolume = function (credential, host, port, vfiler, volume) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><volume-destroy><name>SysOS_" + volume + "_Restore</name></volume-destroy></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results[0].$.status);
      });
    };

    var createSnapshot = function (credential, host, port, vfiler, volume) {
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><snapshot-create><async>False</async><snapshot>" + volume + "_SysOS_" + new Date().toISOString().split(".")[0].replace(/:/g,"") + "</snapshot><volume>" + volume + "</volume></snapshot-create></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        return validResponse(data.data.data.response.netapp.results[0].$.status);
      });
    };

    var getNFSExportRulesList = function (credential, host, port, vfiler, volume) {
      var results = [];
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><nfs-exportfs-list-rules-2><pathname>/" + volume + "</pathname><persistent>True</persistent></nfs-exportfs-list-rules-2></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        angular.forEach(data.data.data.response.netapp.results[0].rules[0]["exports-rule-info-2"][0]["security-rules"][0]["security-rule-info"], function (rule) {
          results.push(parseNetAppObject(rule));
        });

        console.log("getNFSExportRulesList", results);

        return validResponse(data);
      });
    };

    var getExportRules = function (credential, host, port, vfiler, policy) {
      var results = [];
      var xml = "<netapp version='1.15' xmlns='http://www.netapp.com/filer/admin'" + (vfiler ? " vfiler='" + vfiler + "'" : "") + "><export-rule-get-iter>" + (policy ? "<query><export-rule-info><policy-name>" + policy + "</policy-name></export-rule-info></query>" : "") + "</export-rule-get-iter></netapp>";

      return ServerFactory.callNetApp(credential, host, port, null, xml).then(function (data) {
        if (data.data.status === "error") return errorHandler(data.data.data.errno);
        if (data.data.data.response.netapp.results[0]["$"].status === "failed") return errorHandler(data.data.data.response.netapp.results[0]["$"].reason);

        angular.forEach(data.data.data.response.netapp.results[0]["attributes-list"][0]["export-rule-info"], function (rule) {
          results.push(parseNetAppObject(rule));
        });
        console.log("getExportRules", results);

        return validResponse(data);
      });
    };

    return {
      getSystemVersion: getSystemVersion,
      getOntapiVersion: getOntapiVersion,
      getLicenses: getLicenses,
      getMetrocluster: getMetrocluster,
      getClusterIdentity: getClusterIdentity,
      getQtrees: function (credential, host, port, vfiler) {
        return getQtrees(credential, host, port, vfiler, []);
      },
      getNetInterfaces: function (credential, host, port, vfiler) {
        return getNetInterfaces(credential, host, port, vfiler, []);
      },
      getFcpInterfaces: function (credential, host, port, vfiler) {
        return getFcpInterfaces(credential, host, port, vfiler, []);
      },
      getNFSStatus: getNFSStatus,
      getVservers: function (credential, host, port) {
        return getVservers(credential, host, port, []);
      },
      getVolumes: function (credential, host, port, vfiler) {
        return getVolumes(credential, host, port, vfiler, []);
      },
      getSnapshots: function (credential, host, port, vfiler, volume) {
        return getSnapshots(credential, host, port, vfiler, volume, []);
      },
      getSnapshotFiles: function (credential, host, port, vfiler, volume, snapshot, path) {
        if (!path) path = "";
        return getSnapshotFiles(credential, host, port, vfiler, volume, snapshot, path, []);
      },
      snapshotRestoreFile: snapshotRestoreFile,
      getLuns: function (credential, host, port, vfiler, volume) {
        return getLuns(credential, host, port, vfiler, volume, []);
      },
      getFileInfo: getFileInfo,
      cloneVolumeFromSnapshot: cloneVolumeFromSnapshot,
      mountVolume: mountVolume,
      unmountVolume: unmountVolume,
      setVolumeOffline: setVolumeOffline,
      destroyVolume: destroyVolume,
      createSnapshot: createSnapshot,
      getNFSExportRulesList: getNFSExportRulesList,
      getExportRules: getExportRules
    }

  }]);
}());

(function () {
	"use strict";
	myApp.factory('vmwareFactory', ['ApplicationsFactory', 'ServerFactory', '$q', '$timeout', 'toastr', function (ApplicationsFactory, ServerFactory, $q, $timeout, toastr) {

		// https://vdc-repo.vmware.com/vmwb-repository/dcr-public/1cd28284-3b72-4885-9e31-d1c6d9e26686/71ef7304-a6c9-43b3-a3cd-868b2c236c81/doc/index.html

		/*
		 * PRIVATE FUNCTIONS
		 */
		var parseVMwareObject = function (data) {

			var new_obj = {};

			// Is an object
			// Have 2 props
			// Has prop "name" and has prop "val"
			if (data === Object(data) && Object.keys(data).length === 2 && data.hasOwnProperty("name") && data.hasOwnProperty("val")) {

				if (data[data.name[0]] === undefined) {
					new_obj[data.name[0]] = parseVMwareObject(data.val);
				} else {
					new_obj[data[data.name[0]]] = parseVMwareObject(data.val);
				}

				return new_obj;
			}

			// Is an object
			// Have 2 props
			// Has prop "obj" and has prop "propSet"
			else if (data === Object(data) && Object.keys(data).length === 2 && data.hasOwnProperty("$") && data.hasOwnProperty("_")) {

				if (data.$.type) {
					new_obj.type = data.$.type;
					new_obj.name = data._;
				} else {
					new_obj = data._;
				}

				return new_obj;
			}

			angular.forEach(data, function (value, key) {

				// Is an object
				// Have 2 props
				// Has prop "$" and has prop "_"
				if (value === Object(value) && Object.keys(value).length === 2 && value.hasOwnProperty("$") && value.hasOwnProperty("_")) {
					if (value.$.type) {
						new_obj.type = value.$.type;
						new_obj.name = value._;
					} else {
						new_obj = value._;
					}

					return new_obj;
				}

				// Is an array of 1 value as string
				else if (Array.isArray(value) && value.length === 1 && value[0] !== Object(value[0])) {
					new_obj[key] = value[0]
				}

				// Is an array of 1 value as object
				else if (Array.isArray(value) && value.length === 1 && value[0] === Object(value[0])) {
					new_obj[key] = parseVMwareObject(value[0]);
				}

				else if (value === Object(value) && Object.keys(value).length === 1 && value.hasOwnProperty("xsi:type")) {
					new_obj["xsi_type"] = value["xsi:type"];
					// Do nothing
				}

				// Is an object
				else if (value === Object(value)) {
					angular.forEach(value, function (v, k) {

						// Is an array of 1 value as string
						if (Array.isArray(v) && v.length === 1 && v[0] !== Object(v[0])) {
							new_obj[k] = v[0]
						}

						// Is an array of 1 value as object
						else if (Array.isArray(v) && v.length === 1 && v[0] === Object(v[0])) {
							new_obj[k] = parseVMwareObject(v[0]);
						}

						else if (k === "$" && v === Object(v) && Object.keys(v).length === 1 && v.hasOwnProperty("xsi:type")) {
							//console.log(v);// do nothing
						}

						// Is an object
						// Have 2 props
						// Has prop "name" and has prop "val"
						else if (v === Object(v) && Object.keys(v).length === 2 && v.hasOwnProperty("name") && v.hasOwnProperty("val")) {
							new_obj[v.name[0]] = parseVMwareObject(v.val);
						}

						//Is array
						//More than 1 length
						//Are objects
						else if (Array.isArray(v) && v.length > 1 && v[0] === Object(v[0])) {
							new_obj[k] = v;

							angular.forEach(v, function (sv, sk) {
								new_obj[k][sk] = parseVMwareObject(sv);
							});
						}

						// Is an object
						else if (v === Object(v)) {
							new_obj[k] = parseVMwareObject(v);
						}

						//Is array of strings
						else if (typeof v === 'string') {
							//do nothing
						}

						else {
							new_obj[k] = v;
							console.log(value, v, k, v === Object(v), v.length, v.hasOwnProperty("xsi:type"), Array.isArray(v), "errrrrr parsing");
						}

					});

					return new_obj;

				} else if (typeof value === "string") {
					new_obj[key] = value;
				} else {

					console.log(value, key, "errrrrr2 parsing");
					new_obj[key] = value;
					return new_obj;
				}

			});

			return new_obj;

		};

		/*
		 * Custom errorHandler function for VMwareFactory
		 */
		var errorHandler = function (e) {
			return {
				status: "error",
				error: e
			};
		};

		/*
		 * Custom validResponse function for VMwareFactory
		 */
		var validResponse = function (e) {
			return {
				status: "ok",
				data: e
			};
		};

		var getTaskResults = function (credential, host, port, task_id) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Task</type><pathSet>info</pathSet></propSet><objectSet><obj type="Task">' + task_id + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data, host);

				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return res;
			});
		};

		var getTaskStatus = function (credential, host, port, task_id) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Task</type><pathSet>info.progress</pathSet><pathSet>info.state</pathSet><pathSet>info.cancelable</pathSet></propSet><objectSet><obj type="Task">' + task_id + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data, host);

				var task_info = parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval[0]);

				if (task_info["info.state"] === "running") {
					console.log(task_info);
					return $timeout(function () {
						return getTaskStatus(credential, host, port, task_id);
					}, 2000);
				}

				return getTaskResults(credential, host, port, task_id).then(function (res) {
					return res;
				});
			});
		};

		/*
		 * PUBLIC FUNCTIONS
		 */

		var getClientVersion = function (host, port) {
			return ServerFactory.getVMwareClientVersion(host, port).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response.ConfigRoot.clientConnection[0]);
			});
		};

		var connectvCenterSoap = function (credential, host, port) {
			return ServerFactory.connectvCenterSoap(credential, host, port).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data);
			});
		};

		var registerExtension = function (credential, host, port) {
			var xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
				'<soapenv:Envelope xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
				'    <soapenv:Body>\n' +
				'        <RegisterExtension xmlns="urn:vim25">\n' +
				'            <_this type="ExtensionManager">ExtensionManager</_this>\n' +
				'            <extension>\n' +
				'                <description>\n' +
				'                    <label>SysOS Management</label>\n' +
				'                    <summary>SysOS management extension for VMware vSphere</summary>\n' +
				'                </description>\n' +
				'                <key>com.sysos.management</key>\n' +
				'                <company>SysOS</company>\n' +
				'                <version>1.0</version>\n' +
				'                <subjectName>SysOS Management</subjectName>\n' +
				'                <client>\n' +
				'                    <version>1.0</version>\n' +
				'                    <description>\n' +
				'                        <label>SysOS Management</label>\n' +
				'                        <summary>SysOS management extension for VMware vSphere</summary>\n' +
				'                    </description>\n' +
				'                    <company>SysOS</company>\n' +
				'                    <type>com.vmware.vim.viClientScripts</type>\n' +
				'                    <url>https://github.com/infnada/SysOS</url>\n' +
				'                </client>\n' +
				'                <taskList>\n' +
				'                    <taskID>com.sysos.management.backup</taskID>\n' +
				'                </taskList>\n' +
				'                <resourceList>\n' +
				'                    <locale>en</locale>\n' +
				'                    <module>task</module>\n' +
				'                    <data>\n' +
				'                        <key>com.sysos.management.backup.label</key>\n' +
				'                        <value>SysOS Create Backup</value>\n' +
				'                    </data>\n' +
				'                </resourceList>\n' +
				'	             <resourceList>\n' +
				'                    <locale>en_US</locale>\n' +
				'                    <module>task</module>\n' +
				'                    <data>\n' +
				'                        <key>com.sysos.management.backup.label</key>\n' +
				'                        <value>SysOS Create Backup</value>\n' +
				'                    </data>\n' +
				'                </resourceList>\n' +
				'                <lastHeartbeatTime xsi:type="xsd:dateTime">2018-05-25T18:22:35.465+02:00</lastHeartbeatTime>\n' +
				'            </extension>\n' +
				'        </RegisterExtension>\n' +
				'    </soapenv:Body>\n' +
				'</soapenv:Envelope>';

			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				// Something is wrong (Extension could already exist)
				if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
					return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]);
				}

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RegisterExtensionResponse[0]);
			});
		};

		var findSysOSExtension = function (credential, host, port) {
			var xml = '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Body><FindExtension xmlns="urn:vim25"><_this type="ExtensionManager">ExtensionManager</_this><extensionKey>com.sysos.management</extensionKey></FindExtension></soapenv:Body></soapenv:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].FindExtensionResponse[0]);
			});
		};

		var createTask = function (credential, host, port, task_id) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CreateTask xmlns="urn:vim25"><_this type="TaskManager">TaskManager</_this><obj type="VirtualMachine">vm-322</obj><taskTypeId>' + task_id + '</taskTypeId><initiatedBy>VSPHERE.LOCAL\\Administrator</initiatedBy><cancelable>false</cancelable></CreateTask></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].CreateTaskResponse[0].returnval[0]));
			});
		};

		var setTaskState = function (credential, host, port, task_id, state) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SetTaskState xmlns="urn:vim25"><_this type="Task">' + task_id + '</_this><state>' + state + '</state></SetTaskState></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].SetTaskStateResponse[0]));
			});
		};

		var updateTaskProgress = function (credential, host, port, task_id, progress) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><UpdateProgress xmlns="urn:vim25"><_this type="Task">' + task_id + '</_this><percentDone>' + progress + '</percentDone></UpdateProgress></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].SetTaskStateResponse[0]));
			});
		};

		var acquireVMTicket = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><AcquireTicket xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this><ticketType xsi:type="xsd:string">webmks</ticketType></AcquireTicket></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].AcquireTicketResponse[0].returnval[0]);
			});
		};

		var acquireNFCTicket = function (credential, host, port, esx_host, datastore) {
			var xml = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:vim="urn:internalvim25"><SOAP-ENV:Body><vim:NfcFileManagement xsi:type="vim:NfcFileManagementRequestType"><vim:_this xsi:type="vim:ManagedObjectReference" type="NfcService">nfcService</vim:_this><vim:ds xsi:type="vim:ManagedObjectReference" type="Datastore">' + datastore + '</vim:ds><vim:hostForAccess xsi:type="vim:ManagedObjectReference" type="HostSystem">' + esx_host + '</vim:hostForAccess></vim:NfcFileManagement></SOAP-ENV:Body></SOAP-ENV:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].NfcFileManagementResponse[0].returnval[0]);
			});
		};

		var getHostConnectionState = function (credential, host, port, esx_host) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>runtime.connectionState</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"]["0"].RetrievePropertiesResponse["0"].returnval["0"].propSet["0"].val["0"]._);
			});
		};

		// Gets networkSystem from ESXi host
		// return vmwareFactory.getHostConfigManagerNetworkSystem('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443', 'host-10');
		var getHostConfigManagerNetworkSystem = function (credential, host, port, esx_host) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>configManager.networkSystem</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"]["0"].RetrievePropertiesResponse["0"].returnval["0"].propSet["0"].val["0"]._);
			});
		};

		// Gets datastoreSystem from ESXi host
		//return vmwareFactory.getHostConfigManagerDatastoreSystem('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443', 'host-10');
		var getHostConfigManagerDatastoreSystem = function (credential, host, port, esx_host) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostSystem</type><all>false</all><pathSet>configManager.datastoreSystem</pathSet></propSet><objectSet><obj type="HostSystem">' + esx_host + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"]["0"].RetrievePropertiesResponse["0"].returnval["0"].propSet["0"].val["0"]._);
			});
		};

		// Gets networkSystem Virtual NICS
		//vmwareFactory.getHostNetworkInfoVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443', 'networkSystem-10');
		var getHostNetworkInfoVnic = function (credential, host, port, network_system) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostNetworkSystem</type><pathSet>networkInfo.vnic</pathSet></propSet><objectSet><obj type="HostNetworkSystem">' + network_system + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return validResponse(res);
			});
		};

		// Gets networkSystem Console Virtual NICS
		//vmwareFactory.getHostNetworkInfoConsoleVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443', 'networkSystem-10');
		var getHostNetworkInfoConsoleVnic = function (credential, host, port, network_system) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>HostNetworkSystem</type><pathSet>networkInfo.consoleVnic</pathSet></propSet><objectSet><obj type="HostNetworkSystem">' + network_system + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return validResponse(res);
			});
		};

		var getDatastores = function (credential, host, port, datacenter_folder) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet xsi:type="PropertyFilterSpec"><propSet xsi:type="PropertySpec"><type xsi:type="xsd:string">Datastore</type><all xsi:type="xsd:boolean">true</all></propSet><objectSet xsi:type="ObjectSpec"><obj type="Folder" xsi:type="ManagedObjectReference">' + datacenter_folder + '</obj><skip xsi:type="xsd:boolean">true</skip><selectSet xsi:type="TraversalSpec"><type xsi:type="xsd:string">Folder</type><path xsi:type="xsd:string">childEntity</path><skip xsi:type="xsd:boolean">true</skip><selectSet xsi:type="TraversalSpec"><type xsi:type="xsd:string">Datacenter</type><path xsi:type="xsd:string">datastore</path><skip xsi:type="xsd:boolean">false</skip></selectSet></selectSet></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);
				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return validResponse(res);
			});
		};

		var getDatastoresWithVMsData = function (credential, host, port, datacenter_folder) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Datastore</type><all>false</all><pathSet>info</pathSet><pathSet>host</pathSet><pathSet>vm</pathSet></propSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>config</pathSet><pathSet>layout</pathSet><pathSet>runtime</pathSet></propSet><objectSet><obj type="Folder">' + datacenter_folder + '</obj><skip>true</skip><selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec"><name>visitFolders</name><type>Folder</type><path>childEntity</path><skip>true</skip><selectSet><name>visitFolders</name></selectSet><selectSet xsi:type="TraversalSpec"><type>Datacenter</type><path>datastore</path><skip>false</skip><selectSet xsi:type="TraversalSpec"><type>Datastore</type><path>vm</path><skip>false</skip></selectSet></selectSet><selectSet xsi:type="TraversalSpec"><type>Datastore</type><path>vm</path><skip>false</skip></selectSet></selectSet></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);
				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return validResponse(res);
			});
		};

		var getDatastoreProps = function (credential, host, port, datastore) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>Datastore</type><all>true</all></propSet><objectSet><obj type="Datastore">' + datastore + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval[0]));
			});
		};

		var getVMFileDataFromDatastore = function (credential, host, port, datastore, datastore_name, vmx_path, vmx_file) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SearchDatastore_Task xmlns="urn:vim25"><_this type="HostDatastoreBrowser">datastoreBrowser-' + datastore + '</_this><datastorePath>[' + datastore_name + ']' + vmx_path + '</datastorePath><searchSpec><query xsi:type="FolderFileQuery" /><query /><details><fileType>true</fileType><fileSize>true</fileSize><modification>true</modification><fileOwner>false</fileOwner></details><matchPattern>' + vmx_file + '</matchPattern></searchSpec></SearchDatastore_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].SearchDatastore_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var getFilesDataFromDatastore = function (credential, host, port, datastore, datastore_name, path) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SearchDatastore_Task xmlns="urn:vim25"><_this type="HostDatastoreBrowser">datastoreBrowser-' + datastore + '</_this><datastorePath>[' + datastore_name + ']' + path + '</datastorePath><searchSpec><query xsi:type="FolderFileQuery" /><query /><details><fileType>true</fileType><fileSize>true</fileSize><modification>true</modification><fileOwner>false</fileOwner></details></searchSpec></SearchDatastore_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].SearchDatastore_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var deleteFileFromDatastore = function (credential, host, port, datastore_name, path, datacenter) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><DeleteDatastoreFile_Task xmlns="urn:vim25"><_this type="FileManager">FileManager</_this><name>[' + datastore_name + '] ' + path + '</name><datacenter type="Datacenter">' + datacenter + '</datacenter></DeleteDatastoreFile_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].DeleteDatastoreFile_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var moveFileFromDatastore = function (credential, host, port, src_datastore_name, src_path, src_datacenter, dst_datastore_name, dst_path, dst_datacenter, force) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><MoveDatastoreFile_Task xmlns="urn:vim25"><_this type="FileManager">FileManager</_this><sourceName>[' + src_datastore_name + '] ' + src_path + '</sourceName><sourceDatacenter type="Datacenter">' + src_datacenter + '</sourceDatacenter><destinationName>[' + dst_datastore_name + '] ' + dst_path + '</destinationName><destinationDatacenter type="Datacenter">' + dst_datacenter + '</destinationDatacenter>' + (force ? '<force>true</force>' : '') + '</MoveDatastoreFile_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].MoveDatastoreFile_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var copyFileFromDatastore = function (credential, host, port, src_datastore_name, src_path, src_datacenter, dst_datastore_name, dst_path, dst_datacenter, force) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CopyDatastoreFile_Task xmlns="urn:vim25"><_this type="FileManager">FileManager</_this><sourceName>[' + src_datastore_name + '] ' + src_path + '</sourceName><sourceDatacenter type="Datacenter">' + src_datacenter + '</sourceDatacenter><destinationName>[' + dst_datastore_name + '] ' + dst_path + '</destinationName><destinationDatacenter type="Datacenter">' + dst_datacenter + '</destinationDatacenter>' + (force ? '<force>true</force>' : '') + '</CopyDatastoreFile_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].CopyDatastoreFile_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var createFolderToDatastore = function (credential, host, port, datastore_name, path, datacenter) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><MakeDirectory xmlns="urn:vim25"><_this type="FileManager">FileManager</_this><name>[' + datastore_name + '] ' + path + '</name><datacenter type="Datacenter">' + datacenter + '</datacenter><createParentDirectories>true</createParentDirectories></MakeDirectory></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].MakeDirectoryResponse[0];

			});
		};

		var mountDatastore = function (credential, host, port, datastore_system, datastore_host, datastore_path, datastore_local_name) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CreateNasDatastore xmlns="urn:vim25"><_this type="HostDatastoreSystem">' + datastore_system + '</_this><spec><remoteHost>' + datastore_host + '</remoteHost><remotePath>/' + datastore_path + '/</remotePath><localPath>' + datastore_local_name + '</localPath><accessMode>readWrite</accessMode></spec></CreateNasDatastore></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].CreateNasDatastoreResponse[0].returnval[0]._);
			});
		};

		var unmountDatastore = function (credential, host, port, datastore_system, datastore) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RemoveDatastore xmlns="urn:vim25"><_this type="HostDatastoreSystem">' + datastore_system + '</_this><datastore type="Datastore">' + datastore + '</datastore></RemoveDatastore></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				// Something is wrong (Datastore could not exist)
				if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
					return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]["detail"][0]);
				}

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RemoveDatastoreResponse[0]);
			});
		};

		var getVMs = function (credential, host, port, datacenter_folder) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>true</all></propSet><objectSet><obj type="Folder">' + datacenter_folder + '</obj><skip>true</skip><selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec"><name>visitFolders</name><type>Folder</type><path>childEntity</path><skip>true</skip><selectSet><name>visitFolders</name></selectSet><selectSet xsi:type="TraversalSpec"><type>Datacenter</type><path>datastore</path><skip>false</skip><selectSet xsi:type="TraversalSpec"><type>Datastore</type><path>vm</path><skip>false</skip></selectSet></selectSet><selectSet xsi:type="TraversalSpec"><type>Datastore</type><path>vm</path><skip>false</skip></selectSet></selectSet></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';

			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return validResponse(res);
			});
		};

		var getVMState = function (credential, host, port, vm, getAll) {
			var xml;

			if (getAll) {
				xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>true</all></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			} else {
				xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>name</pathSet><pathSet>guest</pathSet><pathSet>runtime.powerState</pathSet><pathSet>summary.config</pathSet><pathSet>summary.quickStats</pathSet><pathSet>guestHeartbeatStatus</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			}

			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				// Something is wrong (VM could not exist)
				if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
					return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]["detail"][0]);
				}

				return validResponse(parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval[0]));
			});
		};

		var getVMPath = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>config.files.vmPathName</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';

			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				// Something is wrong (VM could not exist)
				if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
					return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]["detail"][0]);
				}

				return validResponse(parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval[0]));
			});
		};

		var getVMRuntime = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>runtime</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';

			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				// Something is wrong (VM could not exist)
				if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
					return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]["detail"][0]);
				}

				return validResponse(parseVMwareObject(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval[0]));
			});
		};

		var queryVMEvents = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><QueryEvents xmlns="urn:vim25"><_this type="EventManager">EventManager</_this><filter><entity><entity type="VirtualMachine">' + vm + '</entity><recursion>all</recursion></entity><time><beginTime>2018-05-23T16:35:17.165+02:00</beginTime></time></filter></QueryEvents></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);
				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].QueryEventsResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return validResponse(res);
			});
		};

		var searchIndexVM = function (credential, host, port, vm_uuid) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><FindByUuid xmlns="urn:vim25"><_this type="SearchIndex">SearchIndex</_this><uuid>' + vm_uuid + '</uuid><vmSearch>true</vmSearch><instanceUuid>false</instanceUuid></FindByUuid></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);
				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].FindByUuidResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return validResponse(res);
			});
		};

		var registerVM = function (credential, host, port, esx_host, esx_path, vm_name, esx_folder, resource_pool) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RegisterVM_Task xmlns="urn:vim25"><_this type="Folder">' + esx_folder + '</_this><path>' + esx_path + '</path><name>' + vm_name + '</name><asTemplate>false</asTemplate><pool type="ResourcePool">' + resource_pool + '</pool><host type="HostSystem">' + esx_host + '</host></RegisterVM_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RegisterVM_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					if (data[0].propSet.info.state !== "success") return errorHandler(data[0].propSet.info, host);

					return validResponse(data[0].propSet.info);
				});

			});
		};

		var unregisterVM = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><UnregisterVM xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></UnregisterVM></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				// Something is wrong (VM could not exist)
				if (data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"]) {
					return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0]["soapenv:Fault"][0]["detail"][0]);
				}

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].UnregisterVMResponse[0]);
			});
		};

		var powerOnVM = function (credential, host, port, esx_host, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><PowerOnVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this><host type="HostSystem">' + esx_host + '</host></PowerOnVM_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].PowerOnVM_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var powerOffVM = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><PowerOffVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></PowerOffVM_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].PowerOffVM_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var suspendVM = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><SuspendVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></SuspendVM_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].SuspendVM_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var resetVM = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><ResetVM_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></ResetVM_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].ResetVM_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var shutdownGuest = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><ShutdownGuest xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></ShutdownGuest></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].ShutdownGuestResponse[0];

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var rebootGuest = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RebootGuest xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></RebootGuest></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RebootGuestResponse[0];

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var reloadVM = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><Reload xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this></Reload></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				return validResponse(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].ReloadResponse[0]);
			});
		};

		var createSnapShot = function (credential, host, port, vm, name, description, memory, quiesce) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CreateSnapshot_Task xmlns="urn:vim25"><_this type="VirtualMachine">' + vm + '</_this><name>' + name + '</name><description>' + description + '</description><memory>' + memory + '</memory><quiesce>' + quiesce + '</quiesce></CreateSnapshot_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].CreateSnapshot_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var getVMSnapshots = function (credential, host, port, vm) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RetrieveProperties xmlns="urn:vim25"><_this type="PropertyCollector">propertyCollector</_this><specSet><propSet><type>VirtualMachine</type><all>false</all><pathSet>snapshot</pathSet></propSet><objectSet><obj type="VirtualMachine">' + vm + '</obj><skip>false</skip></objectSet></specSet></RetrieveProperties></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var res = [];

				angular.forEach(data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RetrievePropertiesResponse[0].returnval, function (value) {
					res.push(parseVMwareObject(value));
				});

				return validResponse(res);
			});
		};

		var revertToSnapshot = function (credential, host, port, snapshot) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RevertToSnapshot_Task xmlns="urn:vim25"><_this type="VirtualMachineSnapshot">' + snapshot + '</_this></RevertToSnapshot_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RevertToSnapshot_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		var removeSnapshot = function (credential, host, port, snapshot) {
			var xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><RemoveSnapshot_Task xmlns="urn:vim25"><_this type="VirtualMachineSnapshot">' + snapshot + '</_this><removeChildren>true</removeChildren></RemoveSnapshot_Task></soap:Body></soap:Envelope>';
			return ServerFactory.callVcenterSoap(credential, host, port, 'urn:vim25/6.0', xml).then(function (data) {
				if (data.data.status === "error") return errorHandler(data.data.data);

				var task_id = data.data.data.response["soapenv:Envelope"]["soapenv:Body"][0].RemoveSnapshot_TaskResponse[0].returnval[0]._;

				return getTaskStatus(credential, host, port, task_id).then(function (data) {
					return validResponse(data);
				});

			});
		};

		return {
			getClientVersion: getClientVersion,
			connectvCenterSoap: connectvCenterSoap,
			registerExtension: registerExtension,
			findSysOSExtension: findSysOSExtension,
			createTask: createTask,
			setTaskState: setTaskState,
			updateTaskProgress: updateTaskProgress,
			acquireVMTicket: acquireVMTicket,
			acquireNFCTicket: acquireNFCTicket,
			getHostConnectionState: getHostConnectionState,
			getHostConfigManagerNetworkSystem: getHostConfigManagerNetworkSystem,
			getHostConfigManagerDatastoreSystem: getHostConfigManagerDatastoreSystem,
			getHostNetworkInfoVnic: getHostNetworkInfoVnic,
			getHostNetworkInfoConsoleVnic: getHostNetworkInfoConsoleVnic,
			getDatastores: getDatastores,
			getDatastoresWithVMsData: getDatastoresWithVMsData,
			getDatastoreProps: getDatastoreProps,
			getVMFileDataFromDatastore: getVMFileDataFromDatastore,
			getFilesDataFromDatastore: getFilesDataFromDatastore,
			deleteFileFromDatastore: deleteFileFromDatastore,
			moveFileFromDatastore: moveFileFromDatastore,
			copyFileFromDatastore: copyFileFromDatastore,
			createFolderToDatastore: createFolderToDatastore,
			mountDatastore: mountDatastore,
			unmountDatastore: unmountDatastore,
			getVMs: getVMs,
			getVMState: getVMState,
			getVMPath: getVMPath,
			getVMRuntime: getVMRuntime,
			queryVMEvents: queryVMEvents,
			searchIndexVM: searchIndexVM,
			registerVM: registerVM,
			unregisterVM: unregisterVM,
			powerOnVM: powerOnVM,
			powerOffVM: powerOffVM,
			suspendVM: suspendVM,
			resetVM: resetVM,
			shutdownGuest: shutdownGuest,
			rebootGuest: rebootGuest,
			reloadVM: reloadVM,
			createSnapShot: createSnapShot,
			getVMSnapshots: getVMSnapshots,
			removeSnapshot: removeSnapshot,
			revertToSnapshot: revertToSnapshot
		}

	}]);
}());

(function () {
  "use strict";
  myApp.factory('remoteFileSystemFactory', ['ServerFactory', function (ServerFactory) {

    var getPath = function (id, path, callback) {
      return ServerFactory.getRemotePath(id, path, function (data) {
        return callback(data.data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var createFolder = function (id, path, callback) {
      return ServerFactory.createRemoteFolder(id, path, function (data) {
        return callback(data.data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var downloadFileFromInet = function (url, currentPath, currentConnection, callback) {
      return ServerFactory.remoteDownloadFileFromInet(url, currentPath, currentConnection, function (data) {
        return callback(data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var deleteFile = function (id, path, callback) {
      return ServerFactory.deleteRemoteFile(id, path, function (data) {
        return callback(data.data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var renameFile = function (uuid, src, dst, callback) {
      return ServerFactory.renameRemoteFile(uuid, src, dst, function (data) {
        return callback(data.data.data);
      }, function (data) {
        console.log("Error: " + data);
      });
    };

    var copyFile = function (uuid, src, dst, callback) {
        return ServerFactory.copyRemoteFile(uuid, src, dst, function (data) {
            return callback(data.data.data);
        }, function (data) {
            console.log("Error: " + data);
        });
    };

    var moveFile = function (uuid, src, dst, callback) {
	    return ServerFactory.moveRemoteFile(uuid, src, dst, function (data) {
		    return callback(data.data.data);
	    }, function (data) {
		    console.log("Error: " + data);
	    });
    };


    return {
      getPath: function (id, path, callback) {
        return getPath(id, path, callback);
      },
      createFolder: function (id, path, callback) {
        return createFolder(id, path, callback);
      },
      downloadFileFromInet: function (url, currentPath, currentConnection, callback) {
        return downloadFileFromInet(url, currentPath, currentConnection, callback);
      },
      deleteFile: function (id, path, callback) {
        return deleteFile(id, path, callback);
      },
      renameFile: function (id, source, dest, callback) {
        return renameFile(id, source, dest, callback);
      },
      copyFile: copyFile,
      moveFile: moveFile
    }

  }]);
}());
(function () {
  "use strict";
  myApp.factory('ServerFactory', ['$http', function ($http) {

    // Private
    var doGet = function (url, onSuccess, onError) {
      return $http.get(url).then(onSuccess, onError);
    };

    var doPost = function (url, data, onSuccess, onError) {
      return $http.post(url, data).then(onSuccess, onError);
    };

    // Public
    return {
      getSession: function (onSuccess, onError) {
        return doGet("/getSession", onSuccess, onError);
      },
      // Manage local and remote files
      getFileSystemPath: function (path, onSuccess, onError) {
        return doPost("/api/folder/get", {path: path}, onSuccess, onError);
      },
      getRemotePath: function (uuid, path, onSuccess, onError) {
        return doPost("/api/remoteFolder/get", {uuid: uuid, path: path}, onSuccess, onError);
      },
      createFolder: function (data, onSuccess, onError) {
        return doPost("/api/folder/create", data, onSuccess, onError);
      },
      createRemoteFolder: function (uuid, path, onSuccess, onError) {
        return doPost("/api/remoteFolder/create", {uuid: uuid, path: path}, onSuccess, onError);
      },
      getFileContents: function (path, onSuccess, onError) {
        return doPost("/api/file/get", {name: path}, onSuccess, onError);
      },
      renameFile: function (data, onSuccess, onError) {
        return doPost("/api/file/rename", data, onSuccess, onError);
      },
      renameRemoteFile: function (uuid, source, dest, onSuccess, onError) {
        return doPost("/api/remoteFile/rename", {uuid: uuid, source: source, dest: dest}, onSuccess, onError);
      },
      deleteFile: function (data, onSuccess, onError) {
        return doPost("/api/file/delete", data, onSuccess, onError);
      },
      deleteRemoteFile: function (uuid, path, onSuccess, onError) {
        return doPost("/api/remoteFile/delete", {uuid: uuid, path: path}, onSuccess, onError);
      },
      downloadFileFromInet: function (url, path, onSuccess, onError) {
        return doPost("/api/file/download_from_url", {url: url, path: path}, onSuccess, onError);
      },
      remoteDownloadFileFromInet: function (url, path, uuid, onSuccess, onError) {
        return doPost("/api/remoteFile/download_from_url", {url: url, path: path, uuid: uuid}, onSuccess, onError);
      },
      copyFile: function (src, dst, onSuccess, onError) {
        return doPost("/api/file/copy", {src: src, dst: dst}, onSuccess, onError);
      },
      copyRemoteFile: function (uuid, src, dst, onSuccess, onError) {
        return doPost("/api/remoteFile/copy", {uuid: uuid, src: src, dst: dst}, onSuccess, onError);
      },
      moveFile: function (src, dst, onSuccess, onError) {
          return doPost("/api/file/move", {src: src, dst: dst}, onSuccess, onError);
      },
      moveRemoteFile: function (uuid, src, dst, onSuccess, onError) {
          return doPost("/api/remoteFile/move", {uuid: uuid, src: src, dst: dst}, onSuccess, onError);
      },
      // Manage application data from config files API
      saveConfigToFile: function (data, file, full_save, onSuccess, onError) {
        return doPost("/api/configFiles/save", {data: data, file: file, full_save: full_save}, onSuccess, onError);
      },
      getConfigFile: function (file, onSuccess, onError) {
        return doPost("/api/configFiles/get", {file: file}, onSuccess, onError);
      },
      deleteConfigFromFile: function (uuid, file, onSuccess, onError) {
        return doPost("/api/configFiles/delete", {uuid: uuid, file: file}, onSuccess, onError);
      },
      // Applications init
      applicationInitCredentials: function (onSuccess, onError) {
        return doGet("/application/cmanager/init", onSuccess, onError);
      },
      // Server Manager API
      remoteGetRelease: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/get_release", {uuid: uuid}, onSuccess, onError);
      },
      remoteGetKernel: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/get_kernel", {uuid: uuid}, onSuccess, onError);
      },
      remoteGetCpu: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/get_cpu", {uuid: uuid}, onSuccess, onError);
      },
      remoteGetMem: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/get_mem", {uuid: uuid}, onSuccess, onError);
      },
      remoteGetDisk: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/get_disk", {uuid: uuid}, onSuccess, onError);
      },
      remoteGetUpdates: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/get_updates", {uuid: uuid}, onSuccess, onError);
      },
      remoteGetProcesses: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/get_processes", {uuid: uuid}, onSuccess, onError);
      },
      remoteGetInterfaces: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/get_interfaces", {uuid: uuid}, onSuccess, onError);
      },
      remoteGetInterfaceBandwidth: function (uuid, iface, onSuccess, onError) {
        return doPost("/api/remoteServer/get_interface_bandwidth", {uuid: uuid, interface: iface}, onSuccess, onError);
      },
      runHIDS: function (uuid, onSuccess, onError) {
        return doPost("/api/remoteServer/run_hids", {uuid: uuid}, onSuccess, onError);
      },
      doPing: function (uuid, host, onSuccess, onError) {
        return doPost("/api/remoteServer/do_ping", {uuid: uuid, host: host}, onSuccess, onError);
      },
      remoteDoSnmp: function (uuid, oid, onSuccess, onError) {
        return doPost("/api/remoteServer/do_snmp", {uuid: uuid, oid: oid}, onSuccess, onError);
      },
      // vCenter API
      getVMwareClientVersion: function (host, port, onSuccess, onError) {
        return doPost("/api/vcenter/getClientVersion", {host: host, port: port}, onSuccess, onError);
      },
      connectVcenter: function (host, credential, onSuccess, onError) {
        return doPost("/api/vcenter/connect", {host: host, credential: credential}, onSuccess, onError);
      },
      connectvCenterSoap: function (credential, host, port, onSuccess, onError) {
        return doPost("/api/vcenter/connectSoap", {
          credential: credential,
          host: host,
          port: port
        }, onSuccess, onError);
      },
      callVcenter: function (host, path, onSuccess, onError) {
        return doPost("/api/vcenter/call", {host: host, path: path}, onSuccess, onError);
      },
      callVcenterSoap: function (credential, host, port, action, xml, onSuccess, onError) {
        return doPost("/api/vcenter/callSoap", {
          credential: credential,
          host: host,
          port: port,
          action: action,
          xml: xml
        }, onSuccess, onError);
      },
      // NetApp API
      callNetApp: function (credential, host, port, path, xml, onSuccess, onError) {
        return doPost("/api/netapp/call", {
          credential: credential,
          host: host,
          port: port,
          path: path,
          xml: xml
        }, onSuccess, onError);
      },
      // Credentials API
      saveCredential: function (credential, onSuccess, onError) {
        return doPost("/api/credential/save", {credential: credential}, onSuccess, onError);
      },
      deleteCredential: function (uuid, onSuccess, onError) {
        return doPost("/api/credential/delete", {uuid: uuid}, onSuccess, onError);
      }
    };

  }]);
}());

(function () {
  "use strict";
  myApp.factory('socket', ['socketFactory', function (socketFactory) {

    var myIoSocket = io.connect("localhost");

    return socketFactory({
      ioSocket: myIoSocket
    });

  }]);

}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/applications/actions.html',
      '<div ng-if="ACTIONS.app.actions == true" ng-include="\'templates/applications/actions-\' + ACTIONS.app.id + \'.html\'" include-replace></div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/applications/body.html',
      '<div ng-include="\'templates/applications/body-\' + BODY.app.id + \'.html\'" include-replace></div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/applications/main.html',
      '<div class="window window--{{::APP.appId}}" style="{{::APP.appData.style}}" ng-class="{\'window--active\': APP.isVisible(), \'window--closing\': APP.isClosing, \'window--opening\': APP.isOpening, \'window--minimized\': APP.isMinimized, \'window--maximized\': APP.isMaximized}"> \
		    <div class="window__titlebar" ng-dblclick="APP.maximize()"> \
			    <div class="window__controls window__controls--left" ng-click="APP.toggleMenu()"> \
            <a class="window__icon"><i class="fa fa-{{::APP.appData.ico}}"></i></a> \
            <a class="window__menutoggle" ng-class="{\'window__menutoggle--open\': APP.isMenuOpened}"><i class="fa fa-bars"></i></a> \
          </div> \
          <span class="window__title"> \
            {{::APP.appData.name}} \
          </span> \
          <div class="window__controls window__controls--right"> \
            <a class="window__minimize" ng-click="APP.minimize()"><i class="fa fa-minus"></i></a> \
            <a class="window__maximize" ng-click="APP.maximize()"><i class="fa"></i></a> \
            <a class="window__close" ng-click="APP.close(); $event.stopPropagation();"><i class="fa fa-close"></i></a> \
          </div> \
		    </div> \
        <window-menu app="APP.appData" is-menu-opened="APP.isMenuOpened"></window-menu> \
        <window-actions app="APP.appData"></window-actions> \
        <window-body app="APP.appData"></window-body> \
        <window-status app="APP.appData"></window-status> \
      </div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/applications/menu.html',
      '<ul class="window__menu" ng-class="{\'window__menu--open\': MENU.isMenuOpened}" ng-if="MENU.app.menu == true" ng-include="\'templates/applications/menu-\' + MENU.app.id + \'.html\'"></ul>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/applications/status.html',
      '<div ng-if="STATUS.app.status == true" ng-include="\'templates/applications/status-\' + STATUS.app.id + \'.html\'" include-replace></div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/desktop/start_menu.html',
      '<div class="start-menu" ng-class="{\'start-menu--open\' : $root.taskbar__item_open == \'start\'}"> \
        <div class="start-menu__list"> \
          <div class="media"> \
            <a class="user-info menu-toggle"  ng-click="SM.openMenu(\'user\')"> \
              <img class="user-info__img media__img" src="/img/KkCqvK9.png" alt="User image"> \
              <div class="user-info__name media__body"> \
                User Name \
              </div> \
            </a> \
            <div class="menu" style="top: 60.5px; left: 0px;" ng-show="SM.openedMenu == \'user\'"> \
              <a >Change account picture</a> \
              <a >Lock</a> \
              <a >Sign out</a> \
            </div> \
            <a class="user-info__power menu-toggle"  ng-click="SM.openMenu(\'power\')"> \
              <i class="fa fa-power-off"></i> \
            </a> \
          </div> \
          <div class="menu" style="top: 60.5px; left: 188px;" ng-show="SM.openedMenu == \'power\'"> \
            <a >Sleep</a> \
            <a >Power off</a> \
            <a >Restart</a> \
          </div> \
          <ul class="start-menu__recent"> \
            <li ng-repeat="application in SM.applications | orderBy:\'name\'"" class="start-menu__{{::application.id}}" ng-click="SM.openApplication(application.id)" ng-if="application.id !== \'start\'" context-menu="SM.appContextMenu()"> \
              <a > \
              <i class="fa fa-{{::application.ico}}"></i> \
              {{::application.name}} \
              </a> \
            </li> \
          </ul> \
          <form class="search"> \
            <input type="text" class="search__input" placeholder="Search"> \
            <button class="search__btn"></button> \
          </form> \
        </div> \
        <div class="start-screen-scroll"> \
          <div class="start-screen"> \
          <a class="start-screen__tile start-screen__tile--explorer masonry-item" > \
            <i class="fa fa-folder"></i> \
            <span>File Explorer</span> \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile start-screen__tile--wide masonry-item"   data-ss-colspan="2"> \
          </a> \
          <div class="start-screen__smallgroup masonry-item"> \
            <a class="start-screen__tile start-screen__tile--small" ></a> \
            <a class="start-screen__tile start-screen__tile--small" ></a> \
            <a class="start-screen__tile start-screen__tile--small" ></a> \
          </div> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile start-screen__tile--notepad masonry-item" > \
          </a> \
          <a class="start-screen__tile start-screen__tile--large start-screen__tile--mail masonry-item"  data-ss-colspan="2"> \
            <i class="fa fa-envelope"></i> \
            <span>Mail</span> \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          <a class="start-screen__tile masonry-item" > \
          </a> \
          </div> \
        </div> \
		  </div>'
    );

  }]);
}());

(function () {
	"use strict";
	myApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/desktop/task_bar.html',
			'<start-menu></start-menu> \
			<div class="taskbar" ui-sortable="TB.sortableOptions" ng-model="TB.taskbar_applications"> \
				<a ng-repeat="application in TB.taskbar_applications" class="taskbar__item taskbar__item--{{application.id}}" ng-click="TB.toggleApplication(application.id)" context-menu="TB.appContextMenu(application.id)" ng-class="{\'start--open\' : TB.isStartOpened(application.id), \'taskbar__item--open\' : TB.isItemOpened(application.id), \'taskbar__item--active\' : TB.isItemActive(application.id), \'not-sortable\': application.id == \'start\'}"> \
					<i class="fa fa-{{::TB.getApplicationById(application.id).ico}}"></i> \
				</a> \
				<div class="taskbar__minimize" ng-click="TB.minimizeToDesktop()"></div> \
				<div class="taskbar__tray"> \
					<span class="time">{{TB.time}}</span> \
				</div> \
			</div>'
		);

	}]);
}());

(function () {
	"use strict";
	myApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/utils/DatastoreSelectable.html',
			'<div class="modal-header"> \
			  <div class="modal-title" id="modal-title">{{title}}</div> \
			</div> \
			<div class="modal-body" id="modal-body"> \
			  <div class="form-group"> \
				<div class="col-sm-12"> \
				  <select class="form-control" ng-options="datastore as datastore.host + \' - \' + datastore.name for datastore in text | orderBy:[\'host\',\'name\']" ng-model="selectedDatastore"> \
					<option value="">-- Select a managed Datastore --</option> \
				  </select> \
				</div> \
			  </div> \
			</div> \
			<div class="modal-footer"> \
			  <button class="btn btn-primary" type="button" ng-click="selectDatastore()">Select</button> \
			</div>'
		);

	}]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/ESXiSelectable.html',
      '<div class="modal-header"> \
        <div class="modal-title" id="modal-title">{{title}}</div> \
      </div> \
      <div class="modal-body" id="modal-body"> \
        <div class="form-group"> \
          <div class="col-sm-12"> \
            <select class="form-control" ng-options="host as host.name for host in text" ng-model="selectedHost"> \
              <option value="">-- Select a managed ESXi host --</option> \
            </select> \
          </div> \
        </div> \
      </div> \
      <div class="modal-footer"> \
        <button class="btn btn-primary" type="button" ng-click="selectESXihost()">Select</button> \
      </div>'
    );

  }]);
}());

(function () {
	"use strict";
	myApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('templates/utils/input.html',
			'<div class="modal-header"> \
			  <div class="modal-title" id="modal-title">{{title}}</div> \
			</div> \
			<div class="modal-body" id="modal-body"> \
			  <input type="text" class="form-control" set-focus placeholder="{{::text}}" ng-model="inputValue" /> \
			</div> \
			<div class="modal-footer"> \
			  <button class="btn btn-primary" type="button" ng-click="no()">Cancel</button> \
			  <button class="btn btn-default" type="button" ng-click="yes_input()">{{::button_text}}</button> \
			</div>'
		);

	}]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/modal.html',
      '<div class="modal-header">\n' +
      ' <div class="modal-title" id="modal-title">{{title}}</div>\n' +
      '</div>\n' +
      '<div class="modal-body" id="modal-body">\n' +
      ' <span>\n' +
      '   {{text}}\n' +
      ' </span>\n' +
      '</div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/question.html',
      '<div class="modal-header"> \
        <div class="modal-title" id="modal-title">{{title}}</div> \
      </div> \
      <div class="modal-body" id="modal-body"> \
        {{::text}} \
      </div> \
      <div class="modal-footer"> \
        <button class="btn btn-primary" type="button" ng-click="no()">No</button> \
        <button class="btn btn-default" type="button" ng-click="yes()">Yes</button> \
      </div>'
    );

  }]);
}());

(function () {
  "use strict";
  myApp.run(['$templateCache', function ($templateCache) {

    $templateCache.put('templates/utils/recoveryWizard.html',
      '<div class="modal-header"> \
        <div class="modal-title" id="modal-title">{{wmC.title}}</div> \
      </div> \
      <div class="modal-body modal-recovery-wizard" id="modal-body"> \
        <div class="wizard"> \
          <ul class="nav nav-wizard"> \
            <li ng-class="{\'active\': wmC.step == 1}"> \
              <a ng-click="wmC.step = 1">SnapShot</a> \
            </li> \
            <li ng-class="{\'active\': wmC.step == 2}"> \
              <a ng-click="wmC.step = 2">Recovery mode</a> \
            </li> \
            <li ng-class="{\'active\': wmC.step == 3}"> \
              <a ng-click="wmC.step = 3">Destination</a> \
            </li> \
            <li ng-class="{\'active\': wmC.step == 4}"> \
              <a ng-click="wmC.step = 4">Ready to apply</a> \
            </li> \
          </ul> \
          <form> \
            <div class="tab-content"> \
              <div class="tab-pane" ng-if="wmC.step == 1" ng-class="{\'active\': wmC.step == 1}"> \
                <table class="table table-hover m-t-xl"> \
                  <tbody> \
                    <tr class="cursor-pointer" ng-repeat="snapshot in wmC.data.snapshots"> \
                      <th class="col-sm-1"><input type="radio" name="snapshot" ng-model="wmC.data.snapshot" ng-value="snapshot[\'snapshot-instance-uuid\']"></th> \
                      <th class="col-sm-1">{{::snapshot.name}}</th> \
                    </tr> \
                  </tbody> \
                </table> \
              </div> \
              <div class="tab-pane" ng-if="wmC.step == 2" ng-class="{\'active\': wmC.step == 2}"> \
                <table class="table table-hover m-t-xl"> \
                 <tbody> \
                    <tr class="cursor-pointer"> \
                       <th class="col-sm-1"><input type="radio" name="restore" ng-model="wmC.restoreType" value="original"></th> \
                       <td class="lh-2"><h5>Restore to the original location</h5>Quickly initiate restore of selected VMs to the original location, and with the original name and settings. This option minimizes the chance of user input error.<br/><i class="fa fa-exclamation text-warning"></i> This virtual machine will be powered down during the restore process.</td> \
                    </tr> \
                    <tr class="cursor-pointer"> \
                       <th class="col-sm-1"><input type="radio" name="restore" ng-model="wmC.restoreType" value="new"></th> \
                       <td class="lh-2"><h5>Restore to a new location, or with different settings</h5>Customize restored VM location, and change its settings. The wizard will automatically populate all controls with the original VM settings as the default settings.</td> \
                    </tr> \
                 </tbody> \
              </table> \
              </div> \
              <div class="tab-pane" ng-if="wmC.step == 3" ng-class="{\'active\': wmC.step == 3}"> \
                <div ng-if="wmC.restoreType == \'new\'"> \
                  <div class="form-group"> \
                    <div class="col-sm-12"> \
                      <select class="form-control" ng-options="host as host.name for host in wmC.data.ESXihosts" ng-model="wmC.selectedHost" ng-change="wmC.loadESXidata()"> \
                        <option value="">-- Select a managed ESXi host --</option> \
                      </select> \
                    </div> \
                  </div> \
                  <div class="form-group"> \
                    <div class="col-sm-12"> \
                      <select class="form-control" ng-options="folder as folder.name for folder in wmC.data.folders" ng-model="wmC.selectedFolder"> \
                        <option value="">-- Select a VM folder --</option> \
                      </select> \
                    </div> \
                  </div> \
                  <div class="form-group"> \
                    <div class="col-sm-12"> \
                      <select class="form-control" ng-options="pool as pool.name for pool in wmC.data.resource_pools" ng-model="wmC.selectedPool"> \
                        <option value="">-- Select a Resource Pool --</option> \
                      </select> \
                    </div> \
                  </div> \
                  <div class="form-group"> \
                    <div class="col-sm-12"> \
                      <input class="form-control" type="text" placeholder="Select a VM name" ng-model="wmC.vmName" required> \
                    </div> \
                  </div> \
                  <div class="form-group"> \
                    <div class="col-sm-12"> \
                      Power ON VM \
                      <switch class="pull-right" name="powerON" ng-model="wmC.powerVM" on="on" off="off"></switch> \
                    </div> \
                  </div> \
                </div> \
                <div ng-if="wmC.restoreType == \'original\'"> \
                  <h5>This VM will be restored to same location as original VM.</h5> \
                  <h6><i class="fa fa-exclamation text-warning"></i> Original VM will be powered down during restore.</h6> \
                </div> \
              </div> \
              <div class="tab-pane" ng-if="wmC.step == 4" ng-class="{\'active\': wmC.step == 4}"> \
                <h5> \
                  Instant VM recovery settings: \
                </h5> \
                <ul> \
                  <li>VM: {{wmC.data.vm.name}} from <strong>{{wmC.getSnapshotName()}}</strong></li> \
                  <li>Original Datastore: {{wmC.data.volume[\'volume-id-attributes\'].name}}</li> \
                  <li>Host: {{wmC.selectedHost.name}}</li> \
                  <li>New VM name: {{wmC.vmName}}</li> \
                  <li>Power ON VM: {{wmC.powerVM}}</li> \
                </ul> \
                <p> \
                  After you click Restore, the selected VM will be instantly recovered into your production environment. To finalize the recovery use Storage VMotion to move running VM to the production storage.<br/> \
                  Alternatively, you can perform cold VM migration during your next maintenance window. \
                </p> \
                <p> \
                  If you are performing manual recovery testing, remember to change VM network to non-production before powering on the VM. \
                </p> \
              </div> \
              <div class="clearfix"></div> \
            </div> \
          </form> \
        </div> \
      </div> \
      <div class="modal-footer"> \
        <button class="btn btn-primary" type="button" ng-if="wmC.step == 1" ng-click="wmC.step = 2">Next</button> \
        <button class="btn btn-primary" type="button" ng-if="wmC.step == 2" ng-click="wmC.step = 3">Next</button> \
        <button class="btn btn-primary" type="button" ng-if="wmC.step == 3" ng-click="wmC.step = 4">Next</button> \
        <button class="btn btn-primary" type="button" ng-if="wmC.step == 4" ng-click="wmC.selectData()">Restore</button> \
      </div>'
    );

  }]);
}());

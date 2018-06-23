(function () {
    'use strict';
    alertsApp.run(['$templateCache', function ($templateCache) {

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
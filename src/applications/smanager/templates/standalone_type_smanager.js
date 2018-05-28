(function () {
    'use strict';
    smanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/standalone-type-smanager.html',
            '<div class="row"> \
              <div class="col-lg-4"> \
                <div class="row"> \
                  <!-- START System Monitoring --> \
                  <div class="col-lg-12 col-sm-6"> \
                    <div class="panel panel-default bg-gray-dark b-a-0"> \
                      <div class="panel-heading"> System Monitoring </div> \
                      <ul class="list-group"> \
                        <li class="list-group-item no-bg"> \
                          <h5>CPU</h5> \
                          <p>{{smB.getCurrentCpu()}} <i class="fa fa-fw fa-refresh cursor-pointer" ng-class="{\'fa-spin\':smB.loadingCpu}" ng-click="smB.remoteRefresh(\'cpu\');"></i></p> \
                          <div class="row"> \
                            <div class="col-sm-6">{{smB.getCpuCores()}} Cores @ <span class="text-white"> {{smB.getCpuLoad()}}%</span></div> \
                            <div class="col-sm-6"> \
                              <div class="progress m-t-1  b-r-a-0 h-3"> \
                                <div class="progress-bar" role="progressbar" aria-valuenow="{{smB.getCpuLoad()}}" aria-valuemin="0" aria-valuemax="100" style="width: {{smB.getCpuLoad()}}%;"> \
                                  <span class="sr-only">{{smB.getCpuLoad()}}% Complete</span> \
                                </div> \
                              </div> \
                            </div> \
                          </div> \
                        </li> \
                        <li class="list-group-item no-bg"> \
                          <h5>Memory <small>(Ram)</small></h5> \
                          <p>{{smB.getActiveConnection().mem[0].type}} @{{smB.getActiveConnection().mem[0].speed}} <i class="fa fa-fw fa-refresh cursor-pointer" ng-class="{\'fa-spin\':smB.loadingMem}" ng-click="smB.remoteRefresh(\'mem\');"></i></p> \
                          <div class="media_box"> \
                            <div class="media-left"> \
                              <p class="data-attributes media-object"> \
                                <span data-peity=\'{ "fill": ["#08A5E1", "#2A88C5", "#0058A1"], "innerRadius": 18, "radius": 28 }\' donut-chart>{{(smB.getActiveConnection().mem[0].used / smB.getActiveConnection().mem[0].total * 100).toFixed(1)}},{{(smB.getActiveConnection().mem[0].cache / smB.getActiveConnection().mem[0].total * 100).toFixed(1)}},{{(smB.getActiveConnection().mem[0].free / smB.getActiveConnection().mem[0].total * 100).toFixed(1)}}</span> \
                              </p> \
                            </div> \
                            <div class="media-body media-top"> \
                              <h2 class="media-heading f-w-300 m-b-0 m-t-0">{{(smB.getActiveConnection().mem[0].total / 1024).toFixed(2)}} <small class="text-white">GB</small></h2> Total Memory \
                            </div> \
                            <div class="row"> \
                              <div class="col-sm-4"> \
                                <small><i class="fa fa-fw fa-circle text-cerulean"></i> Allocated</small> \
                                <h5 class="m-b-0">{{smB.getActiveConnection().mem[0].used}} MB</h5> \
                                <p>{{(smB.getActiveConnection().mem[0].used / smB.getActiveConnection().mem[0].total * 100).toFixed(1)}}%</p> \
                              </div> \
                              <div class="col-sm-4"> \
                                <small><i class="fa fa-fw fa-circle text-curious-blue"></i> In Cache</small> \
                                <h5 class="m-b-0">{{smB.getActiveConnection().mem[0].cache}} MB</h5> \
                                <p>{{(smB.getActiveConnection().mem[0].cache / smB.getActiveConnection().mem[0].total * 100).toFixed(1)}}%</p> \
                              </div> \
                              <div class="col-sm-4"> \
                                <small><i class="fa fa-fw fa-circle text-endaveour"></i> Available</small> \
                                <h5 class="m-b-0">{{smB.getActiveConnection().mem[0].free}} MB</h5> \
                                <p>{{(smB.getActiveConnection().mem[0].free / smB.getActiveConnection().mem[0].total * 100).toFixed(1)}}%</p> \
                              </div> \
                            </div> \
                          </div> \
                        </li> \
                        <li class="list-group-item no-bg"> \
                          <h5 class="m-t-0">Build</h5> \
                          <p>{{smB.getActiveConnection().release}} <i class="fa fa-fw fa-refresh cursor-pointer" ng-class="{\'fa-spin\':smB.loadingRelease}" ng-click="smB.remoteRefresh(\'release\');"></i></p> \
                          <p>Kernel: {{smB.getActiveConnection().kernel}} <i class="fa fa-fw fa-refresh cursor-pointer" ng-class="{\'fa-spin\':smB.loadingKernel}" ng-click="smB.remoteRefresh(\'kernel\');"></i></p> \
                        </li> \
                      </ul> \
                    </div> \
                    <!-- START System updates --> \
                    <div class="panel panel-default b-a-0 bg-gray-dark {{smB.getUpdatesStatus()}}"> \
                      <div class="panel-heading b-b-0">System Updates <span class="label label-white label-outline pull-right"><i class="fa fa-fw fa-refresh cursor-pointer" ng-class="{\'fa-spin\':smB.loadingUpdates}" ng-click="smB.remoteRefresh(\'updates\');"></i></span></div> \
                      <div class="panel-body text-center p-t-0"> \
                        <h1 class="m-t-0 m-b-0 f-w-300">{{smB.getActiveConnection().updates.length}}</h1> \
                        <p class="text-white">Updates</p> \
                      </div> \
                      <div class="panel-footer text-center cursor-pointer" ng-click="smB.toggleUpdates()"> \
                        <a  class="text-muted">See More<i class="m-l-1 fa fa-angle-right"></i></a> \
                        <div ng-if="smB.seeMoreUpdates"><p ng-repeat="update in smB.getActiveConnection().updates" class="m-b-t">{{::update.name}} ({{::update.epoch}}{{::update.version}})</p></div> \
                      </div> \
                    </div> \
                    <!-- END System updates --> \
                    <div class="panel panel-default bg-gray-dark b-a-0"> \
                      <div class="panel-heading"> Network Monitoring </div> \
                      <ul class="list-group"> \
                        <li class="list-group-item no-bg"> \
                          <h5>Interface Traffic <small>(ens160)</small></h5> \
                          <span id="network-monitoring" data-peity=\'{ "width": "100%", "height": 70 }\' lines="{{smB.getActiveConnection()[\'interfaces\'][\'ens160\'].data}}" line-chart></span> \
                        </li> \
                      </ul> \
                    </div> \
                  </div> \
                  <!-- END System Monitoring --> \
                </div> \
              </div> \
              <div class="col-lg-8"> \
                <!-- START Volume Status  --> \
                <div class="panel panel-default b-a-0 bg-gray-darker"> \
                  <ul class="list-group"> \
                    <li class="list-group-item no-bg no_padding"> \
                      <div class="row"> \
                        <div class="col-lg-3 col-sm-6"> \
                          <div class="panel panel-default b-a-0 bg-gray-dark"> \
                            <div class="panel-heading {{smB.getMemStatus()}}"> \
                              <div class="media"> \
                                <div class="media-body"> \
                                  <span class="text-uppercsase">Memory</span> \
                                  <br> \
                                  <h1 class="display-4 m-t-0 m-b-0">{{(smB.getActiveConnection().mem[0].free / smB.getActiveConnection().mem[0].total * 100).toFixed(1)}} <small class="text-uppercase text-white">% </small> \
                                    <span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">OK</span> \
                                  </h1> \
                                </div> \
                              </div> \
                            </div> \
                          </div> \
                        </div> \
                        <div class="col-lg-3 col-sm-6"> \
                          <div class="panel panel-default b-a-0 bg-gray-dark"> \
                            <div class="panel-heading {{smB.getCpuStatus()}}"> \
                              <div class="media"> \
                                <div class="media-body"> \
                                  <span class="text-uppercsase">CPU</span> \
                                  <br> \
                                  <h1 class="display-4 m-t-0 m-b-0">{{smB.getCpuLoad()}} <small class="text-uppercase text-white">%</small> \
                                    <span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">OK</span> \
                                  </h1> \
                                </div> \
                              </div> \
                            </div> \
                          </div> \
                        </div> \
                        <div class="col-lg-3 col-sm-6"> \
                          <div class="panel panel-default b-a-0 bg-gray-dark"> \
                            <div class="panel-heading {{smB.getMaxDiskStatus()[0]}}"> \
                              <div class="media"> \
                                <div class="media-body"> \
                                  <span class="text-uppercsase">Disk</span> \
                                  <br> \
                                  <h1 class="display-4 m-t-0 m-b-0">{{smB.getMaxDiskStatus()[1]}} <small class="text-uppercase text-white">%</small> \
                                    <span class="label label-white label-outline m-l-1 m-b-3 f-25 label-notice">OK</span> \
                                  </h1> \
                                </div> \
                              </div> \
                            </div> \
                          </div> \
                        </div> \
                        <div class="col-lg-3 col-sm-6"> \
                          <div class="panel panel-default b-a-0 bg-gray-dark"> \
                            <div class="panel-heading bg-danger-i"> \
                              <div class="media"> \
                                <div class="media-body"> \
                                  <span class="text-uppercsase">System</span> \
                                  <br> \
                                  <h1 class="display-4 m-t-0 m-b-0"><span class="label label-white label-outline m-l-1 label-notice">ERROR</span></h1> \
                                </div> \
                              </div> \
                            </div> \
                          </div> \
                        </div> \
                      </div> \
                      <div class="hr-text hr-text-left m-t-1 m-b-1"> \
                        <h6 class="text-white"><strong>Volume Status <i class="fa fa-fw fa-refresh cursor-pointer" ng-class="{\'fa-spin\':smB.loadingDisk}" ng-click="smB.remoteRefresh(\'disk\');"></i></strong></h6> \
                      </div> \
                      <div class="row"> \
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6" ng-repeat="disk in smB.getActiveConnection().disk"> \
                          <h5 class="m-b-1 m-t-0">Path </h5> \
                          <span class="label-gray-lighter label label-outline label-disk" title="{{disk.disk}}">{{disk.disk}}</span> \
                          <h2 class="media-heading f-w-300 m-b-0 m-t-1">{{smB.extractSpace(disk.size, 1)}} <small class="text-white">{{smB.extractSpace(disk.size, 2)}}</small></h2> Volume Size \
                          <p class="data-attributes text-center m-t-2" ng-switch="smB.getDiskStatus(disk.used_percent)[0]"> \
                            <span ng-switch-when="1" data-peity=\'{ "fill": ["#2D99DC", "#222D33"], "innerRadius": 50, "radius": 69 }\' donut-chart>{{smB.extractSpace(disk.used_percent, 1)}}/100</span> \
                            <span ng-switch-when="2" data-peity=\'{ "fill": ["#86B34D", "#2B2F26"], "innerRadius": 50, "radius": 69 }\' donut-chart>{{smB.extractSpace(disk.used_percent, 1)}}/100</span> \
                            <span ng-switch-when="3" data-peity=\'{ "fill": ["#E66C40", "#342824"], "innerRadius": 50, "radius": 69 }\' donut-chart>{{smB.extractSpace(disk.used_percent, 1)}}/100</span> \
                            <span ng-switch-when="4" data-peity=\'{ "fill": ["#CB3E4B", "#342824"], "innerRadius": 50, "radius": 69 }\' donut-chart>{{smB.extractSpace(disk.used_percent, 1)}}/100</span> \
                          </p> \
                          <div class="row"> \
                            <div class="col-sm-6 col-xs-6"> \
                              <small><i class="fa fa-fw fa-circle {{smB.getDiskStatus(disk.used_percent)[1]}}"></i><br> Used Space</small> \
                              <h5 class="m-b-0">{{smB.extractSpace(disk.used_space, 1)}} {{smB.extractSpace(disk.used_space, 2)}}</h5> \
                              <p>{{disk.used_percent}}</p> \
                            </div> \
                            <div class="col-sm-6 col-xs-6"> \
                              <small><i class="fa fa-fw fa-circle text-gray-dark"></i><br> Free Space</small> \
                              <h5 class="m-b-0">{{smB.extractSpace(disk.free_space, 1)}} {{smB.extractSpace(disk.free_space, 2)}}</h5> \
                              <p>{{disk.free_percent}}</p> \
                            </div> \
                          </div> \
                        </div> \
                      </div> \
                    </li> \
                  </ul> \
                </div> \
                <!-- END Volume Status  --> \
                <!-- START Mounted Devices --> \
                <div class="panel panel-default no-bg b-a-2"> \
                  <div class="hr-text hr-text-left m-t-3 m-b-1"> \
                    <h6 class="text-white"><strong>Process explorer <i class="fa fa-fw fa-refresh cursor-pointer" ng-class="{\'fa-spin\':smB.loadingProcess}" ng-click="smB.remoteRefresh(\'processes\');"></i></strong></h6> \
                  </div> \
                  <div class="table-responsive"> \
                    <table class="table table-processes"> \
                      <thead> \
                        <tr> \
                          <th class="small text-muted text-uppercase"><strong>PID</strong> \
                          </th> \
                          <th class="small text-muted text-uppercase"><strong>TTY</strong> \
                          </th> \
                          <th class="small text-muted text-uppercase"><strong>TIME</strong> \
                          </th> \
                          <th class="small text-muted text-uppercase"><strong>Usage</strong> \
                          </th> \
                          <th class="small text-muted text-uppercase"><strong>CMD</strong> \
                          </th> \
                        </tr> \
                      </thead> \
                      <tbody> \
                        <tr ng-repeat="process in smB.getActiveConnection().processes" ng-if="!smB.isSystemProcess(process)"> \
                          <td class="v-a-m"> \
                            <span class="text-white">{{::process.pid}}</span> \
                            <span>({{::process.user}})</span> \
                          </td> \
                          <td class="v-a-m"> \
                            {{::process._tty}} \
                          </td> \
                          <td class="v-a-m"> \
                            <span class="text-white">{{::rocess.stime}}</span> {{::process.time}} \
                          </td> \
                          <td class="v-a-m"> \
                            <span class="text-white"><span>{{::process.cpu}}</span></span> \
                          </td> \
                          <td class="v-a-m"> \
                            <span class="label-gray-lighter label label-outline" title="{{::process.args}}">{{::process.args}}</span> \
                          </td> \
                        </tr> \
                      </tbody> \
                    </table> \
                  </div> \
                </div> \
                <!-- END Mounted Devices --> \
              </div> \
            </div>'
        );

    }]);
}());

(function () {
    'use strict';
    smanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/snmp-type-smanager.html',
            '<div class="row"> \
                <div class="col-sm-4" class="chart-snmp"> \
                    <div class="chart-tittle">Network I/O <small>All Ports</small></div> \
                    <div class="chart-speed">{{smB.getActiveConnection.data.totals.total_speed.toFixed(4)}}</div> \
                    <canvas id="line" class="chart chart-line" chart-data="smB.getActiveConnection.data.totals.total_octets" chart-dataset-override="smB.datasetOverride" chart-options="smB.options"></canvas> \
                </div> \
                <div class="col-sm-4" class="chart-snmp"> \
                    <div class="chart-tittle">Network Packet Loss <small>All Ports</small></div> \
                    <div class="chart-speed">{{smB.getActiveConnection.data.totals.total_packets_loss_sum}}</div> \
                    <canvas id="line" class="chart chart-line" chart-data="smB.getActiveConnection.data.totals.total_packets_loss" chart-dataset-override="smB.datasetOverride" chart-options="smB.optionsSingle"></canvas> \
                </div> \
                <div class="col-sm-4" class="chart-snmp"> \
                    <div class="chart-tittle">Network Packets <small>All Ports</small></div> \
                    <div class="chart-speed">{{smB.getActiveConnection.data.totals.total_packets_sum}}</div> \
                    <canvas id="line" class="chart chart-line" chart-data="smB.getActiveConnection.data.totals.total_packets" chart-dataset-override="smB.datasetOverride" chart-options="smB.optionsSingle"></canvas> \
                </div> \
            </div> \
            <h5>Network I/O</h5> \
            <div class="row"> \
              <div class="col-sm-2 chart-snmp no_padding" ng-repeat="iface in smB.getActiveConnection.data.ifaces track by iface.id" ng-if="iface.info[6].value == 1"> \
                <div class="chart-speed">{{iface.statistics.total_speed.toFixed(4)}}</div> \
                <div class="chart-in">IN</div> \
                <div class="chart-out">OUT</div> \
                <div class="chart-hover"> \
                    <div class="chart-in">{{iface.info[0].value}}</div> \
                    <div class="chart-out">{{iface.info[7].value}}</div> \
                </div> \
                <canvas id="line" class="chart chart-line" chart-data="iface.statistics.total_octets" chart-dataset-override="smB.datasetOverride" chart-options="smB.options"></canvas> \
              </div> \
            </div>'
        );

    }]);
}());

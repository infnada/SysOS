import {Component, ElementRef, Input, AfterViewInit, ViewChild, ViewEncapsulation, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

declare var NETDATA: any;

import {SysosLibExtJqueryService} from '@sysos/lib-ext-jquery';
import {SysosLibExtDygraphsService} from '@sysos/lib-ext-dygraphs';
import {SysosLibExtEasypiechartService} from '@sysos/lib-ext-easypiechart';
import {SysosLibExtGaugejsService} from '@sysos/lib-ext-gaugejs';
import {SysosLibExtPerfectscrollbarService} from '@sysos/lib-ext-perfectscrollbar';
import * as Dashboard from 'netdata/web/gui/dashboard.js';
import * as DashboardInfo from 'netdata/web/gui/dashboard_info.js';

import {Application} from '@sysos/lib-application';
import {SysosAppMonitorService} from "../sysos-app-monitor.service";

@Pipe({ name: 'sanitizeHtml'})
export class sanitizeHtmlPipe implements PipeTransform  {

  constructor(private sanitizer: DomSanitizer) {};
  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'samon-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements AfterViewInit {
  @ViewChild("chartsDiv", {read: ElementRef}) chartsDiv: ElementRef;
  @Input() application: Application;

  NETDATA = NETDATA;

  chartsData;
  options;
  netdataDashboard;
  menus;

  viewSide: boolean = true;

  constructor(private jQuery: SysosLibExtJqueryService,
              private Dygraphs: SysosLibExtDygraphsService,
              private easyPieChart: SysosLibExtEasypiechartService,
              private gaugeJS: SysosLibExtGaugejsService,
              private Ps: SysosLibExtPerfectscrollbarService,
              private MonitorService: SysosAppMonitorService) {

    let _this = this;

    this.jQuery.$.fn.easyPieChart = function(options) {
      return this.each(function() {
        let instanceOptions;

        if (!_this.jQuery.$.data(this, 'easyPieChart')) {
          instanceOptions = _this.jQuery.$.extend({}, options, _this.jQuery.$(this).data());
          _this.jQuery.$.data(this, 'easyPieChart', new _this.easyPieChart.easyPieChart(this, instanceOptions));
        }
      });
    };

    new Dashboard(this.jQuery.$, this.Dygraphs.Dygraph, this.gaugeJS.gaugeJS.Gauge, this.Ps.PerfectScrollbar);
    new DashboardInfo(this.MonitorService.dataStore.netdataDashboard);

    this.MonitorService.options.subscribe(options => {
      this.options = options;
      this.chartsData = (options ? options.data : null);
    });
    this.MonitorService.netdataDashboard.subscribe(netdataDashboard => this.netdataDashboard = netdataDashboard);
    this.MonitorService.menus.subscribe(menus => {
      this.menus = [];

      if (menus) {
        for (const menu of Object.keys(menus)) {

          let currentSubmenusData = menus[menu].submenus;
          menus[menu].submenus = [];
          menus[menu].id = menu;

          if (currentSubmenusData) {
            for (const submenu of Object.keys(currentSubmenusData)) {
              currentSubmenusData[submenu].id = submenu;
              menus[menu].submenus.push(currentSubmenusData[submenu]);
            }
          }

          this.menus.push(menus[menu]);
        }

      }
    });
  }

  ngAfterViewInit() {
    this.MonitorService.initializeDynamicDashboard(this.chartsDiv);
  }

  headMain(os, charts, duration) {
    void (os);

    let head = '';

    if (typeof charts['system.swap'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.swap"'
        + ' data-dimensions="used"'
        + ' data-append-options="percentage"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="Used Swap"'
        + ' data-units="%"'
        + ' data-easypiechart-max-value="100"'
        + ' data-width="9%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-colors="#DD4400"'
        + ' role="application"></div>';
    }

    if (typeof charts['system.io'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.io"'
        + ' data-dimensions="in"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="Disk Read"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.io.mainhead"'
        + ' role="application"></div>';

      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.io"'
        + ' data-dimensions="out"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="Disk Write"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.io.mainhead"'
        + ' role="application"></div>';
    }
    else if (typeof charts['system.pgpgio'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.pgpgio"'
        + ' data-dimensions="in"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="Disk Read"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.pgpgio.mainhead"'
        + ' role="application"></div>';

      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.pgpgio"'
        + ' data-dimensions="out"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="Disk Write"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.pgpgio.mainhead"'
        + ' role="application"></div>';
    }

    if (typeof charts['system.cpu'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.cpu"'
        + ' data-chart-library="gauge"'
        + ' data-title="CPU"'
        + ' data-units="%"'
        + ' data-gauge-max-value="100"'
        + ' data-width="20%"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-colors="' + NETDATA.colors[12] + '"'
        + ' role="application"></div>';
    }

    if (typeof charts['system.net'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.net"'
        + ' data-dimensions="received"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="Net Inbound"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.net.mainhead"'
        + ' role="application"></div>';

      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.net"'
        + ' data-dimensions="sent"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="Net Outbound"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.net.mainhead"'
        + ' role="application"></div>';
    }
    else if (typeof charts['system.ip'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.ip"'
        + ' data-dimensions="received"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="IP Inbound"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.ip.mainhead"'
        + ' role="application"></div>';

      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.ip"'
        + ' data-dimensions="sent"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="IP Outbound"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.ip.mainhead"'
        + ' role="application"></div>';
    }
    else if (typeof charts['system.ipv4'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.ipv4"'
        + ' data-dimensions="received"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="IPv4 Inbound"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.ipv4.mainhead"'
        + ' role="application"></div>';

      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.ipv4"'
        + ' data-dimensions="sent"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="IPv4 Outbound"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.ipv4.mainhead"'
        + ' role="application"></div>';
    }
    else if (typeof charts['system.ipv6'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.ipv6"'
        + ' data-dimensions="received"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="IPv6 Inbound"'
        + ' data-units="kbps"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.ipv6.mainhead"'
        + ' role="application"></div>';

      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.ipv6"'
        + ' data-dimensions="sent"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="IPv6 Outbound"'
        + ' data-units="kbps"'
        + ' data-width="11%"'
        + ' data-before="0"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-common-units="system.ipv6.mainhead"'
        + ' role="application"></div>';
    }

    if (typeof charts['system.ram'] !== 'undefined') {
      head += '<div class="netdata-container" style="margin-right: 10px;" data-netdata="system.ram"'
        + ' data-dimensions="used|buffers|active|wired"' // active and wired are FreeBSD stats
        + ' data-append-options="percentage"'
        + ' data-chart-library="easypiechart"'
        + ' data-title="Used RAM"'
        + ' data-units="%"'
        + ' data-easypiechart-max-value="100"'
        + ' data-width="9%"'
        + ' data-after="-' + duration.toString() + '"'
        + ' data-points="' + duration.toString() + '"'
        + ' data-colors="' + NETDATA.colors[7] + '"'
        + ' role="application"></div>';
    }

    return head;
  }

  generateHeadCharts(type, chart, duration) {
    let head = '';
    let hcharts = this.netdataDashboard.anyAttribute(this.netdataDashboard.context, type, chart.context, []);
    if (hcharts.length > 0) {
      let hi = 0, hlen = hcharts.length;
      while (hi < hlen) {
        if (typeof hcharts[hi] === 'function') {
          head += hcharts[hi](this.netdataDashboard.os, chart.id).replace(/CHART_DURATION/g, duration.toString()).replace(/CHART_UNIQUE_ID/g, chart.id);
        } else {
          head += hcharts[hi].replace(/CHART_DURATION/g, duration.toString()).replace(/CHART_UNIQUE_ID/g, chart.id);
        }
        hi++;
      }
    }

    return head;
  }

  chartCommonMin(family, context, units) {
    let x = this.netdataDashboard.anyAttribute(this.netdataDashboard.context, 'commonMin', context, undefined);
    if (typeof x !== 'undefined') {
      return ' data-common-min="' + family + '/' + context + '/' + units + '"';
    } else {
      return '';
    }
  }

  chartCommonMax(family, context, units) {
    let x = this.netdataDashboard.anyAttribute(this.netdataDashboard.context, 'commonMax', context, undefined);
    if (typeof x !== 'undefined') {
      return ' data-common-max="' + family + '/' + context + '/' + units + '"';
    } else {
      return '';
    }
  }

  scrollToId(hash) {
    this.MonitorService.scrollToId(hash);
  }

  memoryUsage() {
    Math.round(this.chartsData.rrd_memory_bytes / 1024 / 1024).toLocaleString()
  }

  trackItemById(index, item) {
    return item ? item.id : undefined;
  }


  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }
}

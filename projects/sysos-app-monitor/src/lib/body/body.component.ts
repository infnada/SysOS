import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

declare var NETDATA: any;

import {SysosLibExtJqueryService} from '@sysos/lib-ext-jquery';
import {SysosLibExtDygraphsService} from '@sysos/lib-ext-dygraphs';
import {SysosLibExtEasypiechartService} from '@sysos/lib-ext-easypiechart';
import {SysosLibExtGaugejsService} from '@sysos/lib-ext-gaugejs';
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
export class BodyComponent implements OnInit {
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
              private MonitorService: SysosAppMonitorService) {

    console.log(this.gaugeJS);

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

    new Dashboard(this.jQuery.$, this.Dygraphs.Dygraph, this.gaugeJS.gaugeJS.Gauge, {
      initialize: function () {

      },
      update: function () {

      }
    });
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

        console.log(this.menus);
      }
    });
  }

  ngOnInit() {
    this.MonitorService.initializeDynamicDashboard(this.chartsDiv);
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

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }
}

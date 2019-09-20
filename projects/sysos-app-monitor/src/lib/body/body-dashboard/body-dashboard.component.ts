import {AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';

import {Application} from "@sysos/lib-application/lib/types/application";

import {SysosAppMonitorService} from "../../services/sysos-app-monitor.service";
import {SysosAppMonitorDashboardService} from "../../services/sysos-app-monitor-dashboard.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'samon-body-dashboard',
  templateUrl: './body-dashboard.component.html',
  styleUrls: ['./body-dashboard.component.scss']
})
export class BodyDashboardComponent implements AfterViewInit {
  @ViewChild("chartsDiv", {read: ElementRef}) chartsDiv: ElementRef;
  @Input() application: Application;

  activeConnection: string;

  NETDATA;

  chartsData;
  options;
  netdataDashboard;
  menus;

  // ScrollSpy
  currentSection: string = 'menu';

  constructor(private MonitorService: SysosAppMonitorService,
              private DashboardService: SysosAppMonitorDashboardService) {

    // Get all data generated by the service
    this.DashboardService.options.subscribe(options => {
      this.options = options;
      this.chartsData = (options ? options.data : null);
    });
    this.DashboardService.netdataDashboard.subscribe(netdataDashboard => this.netdataDashboard = netdataDashboard);
    this.DashboardService.menus.subscribe(menus => {
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
    this.DashboardService.newDashboard();

    // Get current NETDATA object
    this.NETDATA = this.MonitorService.getNetdata();

    this.DashboardService.initializeDynamicDashboard(this.chartsDiv);
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
        + ' data-colors="' + this.NETDATA.colors[12] + '"'
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
        + ' data-colors="' + this.NETDATA.colors[7] + '"'
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
      return family + '/' + context + '/' + units;
    } else {
      return '';
    }
  }

  chartCommonMax(family, context, units) {
    let x = this.netdataDashboard.anyAttribute(this.netdataDashboard.context, 'commonMax', context, undefined);
    if (typeof x !== 'undefined') {
      return family + '/' + context + '/' + units;
    } else {
      return '';
    }
  }

  memoryUsage() {
    Math.round(this.chartsData.rrd_memory_bytes / 1024 / 1024).toLocaleString()
  }

  trackItemById(index, item) {
    return item ? item.id : undefined;
  }

  // ScrollSpy
  scrollToId(section) {
    document.querySelector('#' + section)
      .scrollIntoView();

    // we must return false to prevent the default action
    return false;
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
}

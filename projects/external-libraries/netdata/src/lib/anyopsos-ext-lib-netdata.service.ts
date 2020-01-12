import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import * as Dashboard from 'netdata/web/gui/dashboard';
import * as DashboardInfo from 'netdata/web/gui/dashboard_info';

import {AnyOpsOSExtLibJqueryService} from '@anyopsos/ext-lib-jquery';
import {AnyOpsOSExtLibDygraphsService} from '@anyopsos/ext-lib-dygraphs';
import {AnyOpsOSExtLibEasypiechartService} from '@anyopsos/ext-lib-easy-pie-chart';
import {AnyOpsOSExtLibGaugejsService} from '@anyopsos/ext-lib-gauge-js';
import {AnyOpsOSExtLibPerfectscrollbarService} from '@anyopsos/ext-lib-perfect-scrollbar';
import {AnyOpsOSExtLibPakoService} from '@anyopsos/ext-lib-pako';
import {AnyOpsOSExtLibLzStringService} from '@anyopsos/ext-lib-lz-string';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {NetdataConnection} from './types/netdata-connection';

let NETDATA = null;

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSExtLibNetdataService {
  private connection;

  private $connections: BehaviorSubject<object>;
  connections: Observable<any>;

  dataStore: {  // This is where we will store our data in memory
    connections: { [name: string]: NetdataConnection };
  } = {
    connections: {}
  };

  constructor(private jQuery: AnyOpsOSExtLibJqueryService,
              private Dygraphs: AnyOpsOSExtLibDygraphsService,
              private gaugeJS: AnyOpsOSExtLibGaugejsService,
              private Ps: AnyOpsOSExtLibPerfectscrollbarService,
              private easyPieChart: AnyOpsOSExtLibEasypiechartService,
              private pakoService: AnyOpsOSExtLibPakoService,
              private LZStringService: AnyOpsOSExtLibLzStringService,
              private http: HttpClient,
              private logger: AnyOpsOSLibLoggerService,
              private Modal: AnyOpsOSLibModalService) {
    const classThis = this;
    // Set easyPieChart
    this.jQuery.$.fn.easyPieChart = function(options) {
      return this.each(function() {
        let instanceOptions;

        if (!classThis.jQuery.$.data(this, 'easyPieChart')) {
          instanceOptions = classThis.jQuery.$.extend({}, options, classThis.jQuery.$(this).data());
          classThis.jQuery.$.data(this, 'easyPieChart', new classThis.easyPieChart.easyPieChart(this, instanceOptions));
        }
      });
    };

    this.jQuery.$.fn.popover = () => {
      console.log('popover');
    };

    this.$connections = new BehaviorSubject([]);
    this.connections = this.$connections.asObservable();
  }

  private currentConnection() {
    return this.dataStore.connections[this.connection.uuid];
  }

  getConnection(connectionUuid) {
    return this.dataStore.connections[connectionUuid];
  }

  /**
   * ---------------------------
   * Template functions
   */

  headMain(activeConnection) {
    const os = this.dataStore.connections[activeConnection].netdataDashboard.os;
    const charts = this.dataStore.connections[activeConnection].options.data.charts;
    const duration = this.dataStore.connections[activeConnection].options.duration;

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
    } else if (typeof charts['system.pgpgio'] !== 'undefined') {
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
        + ' data-colors="' + this.dataStore.connections[activeConnection].NETDATA.colors[12] + '"'
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
    } else if (typeof charts['system.ip'] !== 'undefined') {
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
    } else if (typeof charts['system.ipv4'] !== 'undefined') {
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
    } else if (typeof charts['system.ipv6'] !== 'undefined') {
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
        + ' data-colors="' + this.dataStore.connections[activeConnection].NETDATA.colors[7] + '"'
        + ' role="application"></div>';
    }

    return head;
  }

  /**
   * Checks if executing generateAllHeadCharts will return an empty string.
   */
  haveHeads(activeConnection, type, charts) {
    return charts.some(chart => {
      return this.dataStore.connections[activeConnection].netdataDashboard.anyAttribute(
        this.dataStore.connections[activeConnection].netdataDashboard.context,
        type,
        chart.context,
        []
      ).length > 0;
    });
  }

  generateAllHeadCharts(activeConnection, type, charts, duration) {
    return charts.map(chart => {
      return this.generateHeadCharts(activeConnection, type, chart, duration);
    });
  }

  generateHeadCharts(activeConnection, type, chart, duration) {
    NETDATA = this.dataStore.connections[activeConnection].NETDATA;
    let head = '';
    const hcharts = this.dataStore.connections[activeConnection].netdataDashboard.anyAttribute(this.dataStore.connections[activeConnection].netdataDashboard.context, type, chart.context, []);
    if (hcharts.length > 0) {
      let hi = 0;
      const hlen = hcharts.length;
      while (hi < hlen) {
        if (typeof hcharts[hi] === 'function') {
          head += hcharts[hi](this.dataStore.connections[activeConnection].netdataDashboard.os, chart.id).replace(/CHART_DURATION/g, duration.toString()).replace(/CHART_UNIQUE_ID/g, chart.id);
        } else {
          head += hcharts[hi].replace(/CHART_DURATION/g, duration.toString()).replace(/CHART_UNIQUE_ID/g, chart.id);
        }
        hi++;
      }
    }

    return head;
  }

  chartCommonMax(activeConnection, family, context, units) {
    const x = this.dataStore.connections[activeConnection].netdataDashboard.anyAttribute(this.dataStore.connections[activeConnection].netdataDashboard.context, 'commonMax', context, undefined);
    if (typeof x !== 'undefined') {
      return family + '/' + context + '/' + units;
    } else {
      return '';
    }
  }

  chartCommonMin(activeConnection, family, context, units) {
    const x = this.dataStore.connections[activeConnection].netdataDashboard.anyAttribute(this.dataStore.connections[activeConnection].netdataDashboard.context, 'commonMin', context, undefined);
    if (typeof x !== 'undefined') {
      return family + '/' + context + '/' + units;
    } else {
      return '';
    }
  }

  memoryUsage(activeConnection) {
    return Math.round(this.dataStore.connections[activeConnection].options.data.rrd_memory_bytes / 1024 / 1024).toLocaleString();
  }

  /**
   * -----------------
   * Init functions
   */

  deleteDashboard(uuid) {
    const currentConnection = this.dataStore.connections[uuid];
    if (!currentConnection) return;

    currentConnection.NETDATA.abortAllRefreshes();
    currentConnection.NETDATA.globalReset();
    currentConnection.NETDATA.netdataShowAlarms = false;

    if (currentConnection.NETDATA.chartRefresherTimeoutId) {
      currentConnection.NETDATA.timeout.clear(currentConnection.NETDATA.chartRefresherTimeoutId);
    }

    // Remove connection references making sure no more alarm calls will be made
    const updateEvery = currentConnection.NETDATA.alarms.update_every;
    setTimeout(this.dataStore.connections[uuid] = undefined, updateEvery);
  }

  resetDashboard(connection) {
    this.dataStore.connections[connection.uuid].NETDATA.abortAllRefreshes();
    if (this.dataStore.connections[connection.uuid].NETDATA.chartRefresherTimeoutId) {
      this.dataStore.connections[connection.uuid].NETDATA.timeout.clear(this.dataStore.connections[connection.uuid].NETDATA.chartRefresherTimeoutId);
    }

    this.dataStore.connections[connection.uuid].options.pause = true;
  }

  newDashboard(connection) {
    // Return NETDATA connection if exist
    if (this.dataStore.connections[connection.uuid]) {
      if (this.dataStore.connections[connection.uuid].NETDATA.started) this.resetDashboard(connection);
      this.dataStore.connections[connection.uuid].urlOptions.parseHash();
      return this.dataStore.connections[connection.uuid];
    }

    // Create new NETDATA connection
    this.dataStore.connections[connection.uuid] = {
      options: {
        menus: {},
        submenu_names: {},
        data: null,
        hostname: 'netdata_server', // will be overwritten by the netdata server
        version: 'unknown',
        release_channel: 'unknown',
        hosts: [],
        duration: 0, // the default duration of the charts
        update_every: 1,
        chartsPerRow: 0,
        chartsHeight: 180,
        activeAlarms: 0
      },
      netdataDashboard: {
        sparklines_registry: {},
        os: 'unknown',
        menu: {},
        submenu: {},
        context: {},

        // generate a sparkline
        // used in the documentation
        sparkline: (prefix, chart, dimension, units, suffix) => {
          if (this.dataStore.connections[connection.uuid].options.data === null || typeof this.dataStore.connections[connection.uuid].options.data.charts === 'undefined') return '';
          if (typeof this.dataStore.connections[connection.uuid].options.data.charts[chart] === 'undefined') return '';
          if (typeof this.dataStore.connections[connection.uuid].options.data.charts[chart].dimensions === 'undefined') return '';
          if (typeof this.dataStore.connections[connection.uuid].options.data.charts[chart].dimensions[dimension] === 'undefined') return '';

          let key = chart + '.' + dimension;

          if (typeof units === 'undefined') units = '';

          if (typeof this.dataStore.connections[connection.uuid].netdataDashboard.sparklines_registry[key] === 'undefined') {
            this.dataStore.connections[connection.uuid].netdataDashboard.sparklines_registry[key] = { count: 1 };
          } else {
            this.dataStore.connections[connection.uuid].netdataDashboard.sparklines_registry[key].count++;
          }

          key = key + '.' + this.dataStore.connections[connection.uuid].netdataDashboard.sparklines_registry[key].count;
          return prefix + '<div class="netdata-container" data-netdata="' + chart + '" data-after="-120" data-width="25%" data-height="15px" ' +
            'data-chart-library="dygraph" data-dygraph-theme="sparkline" data-dimensions="' + dimension + '" ' +
            'data-show-value-of-' + dimension + '-at="' + key + '"></div> ' +
            '(<span id="' + key + '" style="display: inline-block; min-width: 50px; text-align: right;">X</span>' + units + ')' + suffix;
        },
        gaugeChart: (title, width, dimensions, colors) => {
          if (typeof colors === 'undefined') colors = '';
          if (typeof dimensions === 'undefined') dimensions = '';

          return '<div class="netdata-container" data-netdata="CHART_UNIQUE_ID"'
            + ' data-dimensions="' + dimensions + '"'
            + ' data-chart-library="gauge"'
            + ' data-gauge-adjust="width"'
            + ' data-title="' + title + '"'
            + ' data-width="' + width + '"'
            + ' data-before="0"'
            + ' data-after="-CHART_DURATION"'
            + ' data-points="CHART_DURATION"'
            + ' data-colors="' + colors + '"'
            + ' role="application"></div>';
        },
        anyAttribute: (obj, attr, key, def) => {
          if (typeof (obj[key]) !== 'undefined') {
            const x = obj[key][attr];

            if (typeof (x) === 'undefined') return def;
            if (typeof (x) === 'function') return x(this.dataStore.connections[connection.uuid].netdataDashboard.os);

            return x;
          }

          return def;
        },
        menuTitle: (chart) => {
          if (typeof chart.menu_pattern !== 'undefined') {
            return (this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.menu, 'title', chart.menu_pattern, chart.menu_pattern).toString()
              + '&nbsp;' + chart.type.slice(-(chart.type.length - chart.menu_pattern.length - 1)).toString()).replace(/_/g, ' ');
          }

          return (this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.menu, 'title', chart.menu, chart.menu)).toString().replace(/_/g, ' ');
        },
        menuIcon: (chart) => {
          if (typeof chart.menu_pattern !== 'undefined') {
            return this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.menu, 'icon', chart.menu_pattern, '<i class="fas fa-puzzle-piece"></i>').toString();
          }

          return this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.menu, 'icon', chart.menu, '<i class="fas fa-puzzle-piece"></i>');
        },
        menuInfo: (chart) => {
          if (typeof chart.menu_pattern !== 'undefined') {
            return this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.menu, 'info', chart.menu_pattern, null);
          }
          return this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.menu, 'info', chart.menu, null);
        },
        menuHeight: (chart) => {
          if (typeof chart.menu_pattern !== 'undefined') {
            return this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.menu, 'height', chart.menu_pattern, 1.0);
          }

          return this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.menu, 'height', chart.menu, 1.0);
        },
        submenuTitle: (menu, submenu) => {
          const key = menu + '.' + submenu;
          const title = this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.submenu, 'title', key, submenu).toString().replace(/_/g, ' ');
          if (title.length > 28) {
            const a = title.substring(0, 13);
            const b = title.substring(title.length - 12, title.length);
            return a + '...' + b;
          }
          return title;
        },
        submenuInfo: (menu, submenu) => {
          const key = menu + '.' + submenu;
          return this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.submenu, 'info', key, null);
        },
        submenuHeight: (menu, submenu, relative) => {
          const key = menu + '.' + submenu;
          return this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.submenu, 'height', key, 1.0) * relative;
        },
        contextInfo: (id) => {
          const x = this.dataStore.connections[connection.uuid].netdataDashboard.anyAttribute(this.dataStore.connections[connection.uuid].netdataDashboard.context, 'info', id, null);

          if (x !== null) {
            return '<div class="shorten dashboard-context-info netdata-chart-alignment" role="document">' + x + '</div>';
          } else {
            return '';
          }
        },
        contextValueRange: (id) => {
          if (typeof this.dataStore.connections[connection.uuid].netdataDashboard.context[id] !== 'undefined' && typeof this.dataStore.connections[connection.uuid].netdataDashboard.context[id].valueRange !== 'undefined') {
            return this.dataStore.connections[connection.uuid].netdataDashboard.context[id].valueRange;
          } else {
            return '[null, null]';
          }
        },
        contextHeight: (id, def) => {
          if (typeof this.dataStore.connections[connection.uuid].netdataDashboard.context[id] !== 'undefined' && typeof this.dataStore.connections[connection.uuid].netdataDashboard.context[id].height !== 'undefined') {
            return def * this.dataStore.connections[connection.uuid].netdataDashboard.context[id].height;
          } else {
            return def;
          }
        },
        contextDecimalDigits: (id, def) => {
          if (typeof this.dataStore.connections[connection.uuid].netdataDashboard.context[id] !== 'undefined' && typeof this.dataStore.connections[connection.uuid].netdataDashboard.context[id].decimalDigits !== 'undefined') {
            return this.dataStore.connections[connection.uuid].netdataDashboard.context[id].decimalDigits;
          } else {
            return def;
          }
        }
      },
      menus: [],
      returnFromHighlight: {
        showHighlight: false
      },
      urlOptions: {
        hash: '#',
        theme: null,
        help: null,
        mode: 'live',
        update_always: false,
        pan_and_zoom: false,
        server: null,
        after: 0,
        before: 0,
        highlight: false,
        highlight_after: 0,
        highlight_before: 0,
        nowelcome: false,
        show_alarms: false,
        chart: null,
        family: null,
        alarm: null,
        alarm_unique_id: 0,
        alarm_id: 0,
        alarm_event_id: 0,
        alarm_when: 0,

        hasProperty: (property) => typeof this[property] !== 'undefined',
        parseHash: () => {
          const variables = document.location.hash.split(';');
          let len = variables.length;
          while (len--) {
            if (len !== 0) {
              const p = variables[len].split('=');
              if (this.dataStore.connections[connection.uuid].urlOptions.hasProperty(p[0]) && typeof p[1] !== 'undefined') {
                this.dataStore.connections[connection.uuid].urlOptions[p[0]] = decodeURIComponent(p[1]);
              }
            } else {
              if (variables[len].length > 0) {
                this.dataStore.connections[connection.uuid].urlOptions.hash = variables[len];
              }
            }
          }

          const booleans = ['nowelcome', 'show_alarms', 'update_always'];
          len = booleans.length;
          while (len--) {
            if (
              this.dataStore.connections[connection.uuid].urlOptions[booleans[len]] === 'true' ||
              this.dataStore.connections[connection.uuid].urlOptions[booleans[len]] === true ||
              this.dataStore.connections[connection.uuid].urlOptions[booleans[len]] === '1' ||
              this.dataStore.connections[connection.uuid].urlOptions[booleans[len]] === 1
            ) {
              this.dataStore.connections[connection.uuid].urlOptions[booleans[len]] = true;
            } else {
              this.dataStore.connections[connection.uuid].urlOptions[booleans[len]] = false;
            }
          }

          const numeric = ['after', 'before', 'highlight_after', 'highlight_before', 'alarm_when'];
          len = numeric.length;
          while (len--) {
            if (typeof this.dataStore.connections[connection.uuid].urlOptions[numeric[len]] === 'string') {
              try {
                this.dataStore.connections[connection.uuid].urlOptions[numeric[len]] = parseInt(this.dataStore.connections[connection.uuid].urlOptions[numeric[len]], 10);
              } catch (e) {
                console.log('failed to parse URL hash parameter ' + numeric[len]);
                this.dataStore.connections[connection.uuid].urlOptions[numeric[len]] = 0;
              }
            }
          }

          if (this.dataStore.connections[connection.uuid].urlOptions.alarm_when) {
            // if alarm_when exists, create after/before params
            // -/+ 2 minutes from the alarm, and reload the page
            const alarmTime = new Date(this.dataStore.connections[connection.uuid].urlOptions.alarm_when * 1000).valueOf();
            const timeMarginMs = 120000; // 2 mins

            const after = alarmTime - timeMarginMs;
            const before = alarmTime + timeMarginMs;
            const newHash = document.location.hash.replace(
              /;alarm_when=[0-9]*/i,
              ';after=' + after + ';before=' + before,
            );
            history.replaceState(null, '', newHash);
            location.reload();
          }

          if (this.dataStore.connections[connection.uuid].urlOptions.server !== null && this.dataStore.connections[connection.uuid].urlOptions.server !== '') {
            this.dataStore.connections[connection.uuid].NETDATA.serverDefault = this.dataStore.connections[connection.uuid].urlOptions.server;
            this.dataStore.connections[connection.uuid].NETDATA.netdataCheckXSS = true;
          } else {
            this.dataStore.connections[connection.uuid].urlOptions.server = null;
          }

          if (this.dataStore.connections[connection.uuid].urlOptions.before > 0 && this.dataStore.connections[connection.uuid].urlOptions.after > 0) {
            this.dataStore.connections[connection.uuid].urlOptions.pan_and_zoom = true;
            this.dataStore.connections[connection.uuid].urlOptions.nowelcome = true;
          } else {
            this.dataStore.connections[connection.uuid].urlOptions.pan_and_zoom = false;
          }

          this.dataStore.connections[connection.uuid].urlOptions.highlight = this.dataStore.connections[connection.uuid].urlOptions.highlight_before > 0 && this.dataStore.connections[connection.uuid].urlOptions.highlight_after > 0;

        },
        netdataPanAndZoomCallback: (status, after, before) => {
          if (this.dataStore.connections[connection.uuid].NETDATA.netdataSnapshotData === null) {
            this.dataStore.connections[connection.uuid].urlOptions.pan_and_zoom = status;
            this.dataStore.connections[connection.uuid].urlOptions.after = after;
            this.dataStore.connections[connection.uuid].urlOptions.before = before;
          }
        },
        netdataHighlightCallback: (status, after, before) => {
          if (status === true && (after === null || before === null || after <= 0 || before <= 0 || after >= before)) {
            status = false;
            after = 0;
            before = 0;
          }

          if (this.dataStore.connections[connection.uuid].NETDATA.netdataSnapshotData === null) {
            this.dataStore.connections[connection.uuid].urlOptions.highlight = status;
          } else {
            this.dataStore.connections[connection.uuid].urlOptions.highlight = false;
          }

          this.dataStore.connections[connection.uuid].urlOptions.highlight_after = Math.round(after);
          this.dataStore.connections[connection.uuid].urlOptions.highlight_before = Math.round(before);

          if (status === true && after > 0 && before > 0 && after < before) {
            const d1 = this.dataStore.connections[connection.uuid].NETDATA.dateTime.localeDateString(after);
            let d2 = this.dataStore.connections[connection.uuid].NETDATA.dateTime.localeDateString(before);
            if (d1 === d2) d2 = '';

            this.dataStore.connections[connection.uuid].returnFromHighlight = {
              showHighlight: true,
              d1,
              d2,
              after: this.dataStore.connections[connection.uuid].NETDATA.dateTime.localeTimeString(after),
              before: this.dataStore.connections[connection.uuid].NETDATA.dateTime.localeTimeString(before),
              duration: this.dataStore.connections[connection.uuid].NETDATA.seconds4human(Math.round((before - after) / 1000))
            };
          } else {
            this.dataStore.connections[connection.uuid].returnFromHighlight = {
              showHighlight: false
            };
          }

          this.$connections.next(Object.assign({}, this.dataStore).connections);
        },
        clearHighlight: () => {
          this.dataStore.connections[connection.uuid].NETDATA.globalChartUnderlay.clear();

          if (this.dataStore.connections[connection.uuid].NETDATA.globalPanAndZoom.isActive() === true) this.dataStore.connections[connection.uuid].NETDATA.globalPanAndZoom.clearMaster();
        },
        showHighlight: () => {
          this.dataStore.connections[connection.uuid].NETDATA.globalChartUnderlay.focus();
        }
      },
      snapshotOptions: {
        bytes_per_chart: 2048,
        compressionDefault: 'pako.deflate.base64',

        compressions: {
          none: {
            bytes_per_point_memory: 5.2,
            bytes_per_point_disk: 5.6,
            compress: (s) => {
              return s;
            },
            compressed_length: (s) => {
              return s.length;
            },
            uncompress: (s) => {
              return s;
            }
          },
          'pako.deflate.base64': {
            bytes_per_point_memory: 1.8,
            bytes_per_point_disk: 1.9,
            compress: (s) => {
              return btoa(this.pakoService.Pako.deflate(s, { to: 'string' }));
            },
            compressed_length: (s) => {
              return s.length;
            },
            uncompress: (s) => {
              return this.pakoService.Pako.inflate(atob(s), { to: 'string' });
            }
          },
          'pako.deflate': {
            bytes_per_point_memory: 1.4,
            bytes_per_point_disk: 3.2,
            compress: (s) => {
              return this.pakoService.Pako.deflate(s, { to: 'string' });
            },
            compressed_length: (s) => {
              return s.length;
            },
            uncompress: (s) => {
              return this.pakoService.Pako.inflate(s, { to: 'string' });
            }
          },
          'lzstring.utf16': {
            bytes_per_point_memory: 1.7,
            bytes_per_point_disk: 2.6,
            compress: (s) => {
              return this.LZStringService.LZString.compressToUTF16(s);
            },
            compressed_length: (s) => {
              return s.length * 2;
            },
            uncompress: (s) => {
              return this.LZStringService.LZString.decompressFromUTF16(s);
            }
          },
          'lzstring.base64': {
            bytes_per_point_memory: 2.1,
            bytes_per_point_disk: 2.3,
            compress: (s) => {
              return this.LZStringService.LZString.compressToBase64(s);
            },
            compressed_length: (s) => {
              return s.length;
            },
            uncompress: (s) => {
              return this.LZStringService.LZString.decompressFromBase64(s);
            }
          },
          'lzstring.uri': {
            bytes_per_point_memory: 2.1,
            bytes_per_point_disk: 2.3,
            compress: (s) => {
              return this.LZStringService.LZString.compressToEncodedURIComponent(s);
            },
            compressed_length: (s) => {
              return s.length;
            },
            uncompress: (s) => {
              return this.LZStringService.LZString.decompressFromEncodedURIComponent(s);
            }
          }
        }
      },
      customInfo: true,
      chartsDiv: null,
      NETDATA: new Dashboard(connection, this.jQuery.$, this.Dygraphs.Dygraph, this.gaugeJS.gaugeJS.Gauge, this.Ps.PerfectScrollbar)
    };
    // Set netdataDashboard
    this.dataStore.connections[connection.uuid].netdataDashboard = new DashboardInfo(this.dataStore.connections[connection.uuid].NETDATA, this.dataStore.connections[connection.uuid].netdataDashboard);

    return this.dataStore.connections[connection.uuid];
  }

  initializeDynamicDashboard(connection, chartsDiv) {
    const currentConnection = this.dataStore.connections[connection.uuid];
    const currentNetdata = currentConnection.NETDATA;

    currentConnection.chartsDiv = chartsDiv;

    currentNetdata.serverDefault = (connection.type === 'netdata-credential' ? window.location.origin : connection.url);

    if (connection.snapshotData) this.loadSnapshot(connection);

    // initialize clickable alarms
    currentNetdata.alarms.chart_div_offset = -50;
    currentNetdata.alarms.chart_div_id_prefix = 'chart_';
    currentNetdata.alarms.chart_div_animation_duration = 0;

    currentNetdata.pause(() => {
      if (currentNetdata.netdataSnapshotData) {

        this.Modal.openRegisteredModal('monitor-xss', '.window--monitor .window__main', {
          url: currentNetdata.serverDefault
        }).then((modalInstance) => {
          modalInstance.result.then((res) => {
            if (res === 'xssModalKeepXss') {
              currentNetdata.xss.enabled = true;
              currentNetdata.xss.enabled_for_data = true;
              currentConnection.customInfo = false;
            }

            if (res === 'xssModalDisableXss') {
              currentNetdata.xss.enabled = false;
              currentNetdata.xss.enabled_for_data = false;
              currentConnection.customInfo = true;
            }

            this.initializeCharts(connection);
          });

        });
      } else {
        this.initializeCharts(connection);
      }
    });

  }

  /**
   * ---------------
   * Internal functions
   */

  private jsonParseFn(connection, str) {
    const currentConnection = this.dataStore.connections[connection.uuid];

    // Required to be available inside eval
    const netdataDashboard = currentConnection.netdataDashboard;

    return JSON.parse(str, (key, value) => {
      // tslint:disable-next-line
      if (typeof value != 'string') {
        return value;
      }
      // tslint:disable-next-line:no-eval
      return (value.substring(0, 8) === 'function') ? eval('(' + value + ')') : value;
    });
  }

  private alarmsCallback(data) {
    // TODO: currentConnection
    let count = 0;

    for (const x in data.alarms) {
      if (!data.alarms.hasOwnProperty(x)) continue;

      const alarm = data.alarms[x];
      if (alarm.status === 'WARNING' || alarm.status === 'CRITICAL') count++;
    }

    // this.currentConnection().options.activeAlarms = count;
  }

  private loadSnapshot(connection) {
    const currentConnection = this.dataStore.connections[connection.uuid];
    const currentNetdata = currentConnection.NETDATA;

    currentNetdata.netdataSnapshotData = connection.snapshotData;
    currentNetdata.netdataShowAlarms = false;
    currentNetdata.serverDefault = currentNetdata.netdataSnapshotData.server;


    if (typeof currentNetdata.netdataSnapshotData.hash !== 'undefined') {
      currentConnection.urlOptions.hash = currentNetdata.netdataSnapshotData.hash;
    } else {
      currentConnection.urlOptions.hash = '#';
    }

    if (typeof currentNetdata.netdataSnapshotData.info !== 'undefined') {
      const info = this.jsonParseFn(connection, currentNetdata.netdataSnapshotData.info);

      if (typeof info.menu !== 'undefined') currentConnection.netdataDashboard.menu = info.menu;
      if (typeof info.submenu !== 'undefined') currentConnection.netdataDashboard.submenu = info.submenu;
      if (typeof info.context !== 'undefined') currentConnection.netdataDashboard.context = info.context;
    }

    if (typeof currentNetdata.netdataSnapshotData.compression !== 'string') {
      currentNetdata.netdataSnapshotData.compression = 'none';
    }

    if (typeof currentConnection.snapshotOptions.compressions[currentNetdata.netdataSnapshotData.compression] === 'undefined') {
      alert('unknown compression method: ' + currentNetdata.netdataSnapshotData.compression);
      currentNetdata.netdataSnapshotData.compression = 'none';
    }

    currentNetdata.netdataSnapshotData.uncompress = currentConnection.snapshotOptions.compressions[currentNetdata.netdataSnapshotData.compression].uncompress;

    currentConnection.urlOptions.after = currentNetdata.netdataSnapshotData.after_ms;
    currentConnection.urlOptions.before = currentNetdata.netdataSnapshotData.before_ms;

    if (typeof currentNetdata.netdataSnapshotData.highlight_after_ms !== 'undefined'
      && currentNetdata.netdataSnapshotData.highlight_after_ms !== null
      && currentNetdata.netdataSnapshotData.highlight_after_ms > 0
      && typeof currentNetdata.netdataSnapshotData.highlight_before_ms !== 'undefined'
      && currentNetdata.netdataSnapshotData.highlight_before_ms !== null
      && currentNetdata.netdataSnapshotData.highlight_before_ms > 0
    ) {
      currentConnection.urlOptions.highlight_after = currentNetdata.netdataSnapshotData.highlight_after_ms;
      currentConnection.urlOptions.highlight_before = currentNetdata.netdataSnapshotData.highlight_before_ms;
      currentConnection.urlOptions.highlight = true;
    } else {
      currentConnection.urlOptions.highlight_after = 0;
      currentConnection.urlOptions.highlight_before = 0;
      currentConnection.urlOptions.highlight = false;
    }

    currentNetdata.netdataCheckXSS = false; // disable the modal - this does not affect XSS checks, since dashboard.js is already loaded
    currentNetdata.xss.enabled = true;             // we should not do any remote requests, but if we do, check them
    currentNetdata.xss.enabled_for_data = true;    // check also snapshot data - that have been excluded from the initial check, due to compression
  }

  private initializeCharts(connection) {
    const currentConnection = this.dataStore.connections[connection.uuid];
    const currentNetdata = currentConnection.NETDATA;
    currentNetdata.alarms.callback = this.alarmsCallback;

    // download all the charts the server knows
    return currentNetdata.chartRegistry.downloadAll(currentNetdata.serverDefault, (data) => {
      if (data !== null) {

        if (currentConnection.customInfo && data.custom_info && currentNetdata.netdataSnapshotData === null) {

          this.http.get(currentNetdata.serverDefault + data.custom_info).subscribe(
            (customData) => {
              this.initializeDynamicDashboardWithData(connection, customData);
            },
            error => {
              this.logger.error('Monitor', 'Error while getting custom dashboards', null, error);
            });

        } else {
          this.initializeDynamicDashboardWithData(connection, data);
        }

      }
    });
  }

  private initializeDynamicDashboardWithData(connection, data) {
    const currentConnection = this.dataStore.connections[connection.uuid];
    const currentNetdata = currentConnection.NETDATA;

    currentConnection.options.hostname = data.hostname;
    currentConnection.options.data = data;
    currentConnection.options.version = data.version;
    currentConnection.options.release_channel = data.release_channel;
    currentConnection.netdataDashboard.os = data.os;

    if (typeof data.hosts !== 'undefined') {
      currentConnection.options.hosts = data.hosts;
    }

    // find the proper duration for per-second updates
    currentConnection.options.duration = Math.round((currentConnection.chartsDiv.nativeElement.clientWidth * 100 / 100 * currentConnection.options.data.update_every / 3) / 60) * 60;
    currentConnection.options.update_every = currentConnection.options.data.update_every;

    // create a chart_by_name index
    data.charts_by_name = {};
    const charts = data.charts;
    let x;
    for (x in charts) {
      if (!charts.hasOwnProperty(x)) {
        continue;
      }

      const chart = charts[x];
      data.charts_by_name[chart.name] = chart;
    }

    this.createSidebarMenus(connection);

    this.$connections.next(Object.assign({}, this.dataStore).connections);

    if (currentConnection.urlOptions.highlight === true) {
      currentNetdata.globalChartUnderlay.init(
        null,
        currentConnection.urlOptions.highlight_after,
        currentConnection.urlOptions.highlight_before,
        (currentConnection.urlOptions.after > 0) ? currentConnection.urlOptions.after : null,
        (currentConnection.urlOptions.before > 0) ? currentConnection.urlOptions.before : null
      );
    } else {
      currentNetdata.globalChartUnderlay.clear();
    }

    setTimeout(() => this.finalizePage(connection), 0);
  }

  private createSidebarMenus(connection): void {
    const currentConnection = this.dataStore.connections[connection.uuid];
    let menuKey;

    // Set Menus info
    for (const c in currentConnection.options.data.charts) {
      if (!currentConnection.options.data.charts.hasOwnProperty(c)) {
        continue;
      }

      const chart = currentConnection.options.data.charts[c];

      this.enrichChartData(connection, chart);
      const m = chart.menu;

      // create the menu
      if (typeof currentConnection.menus[m] === 'undefined') {
        currentConnection.menus[m] = {
          menu_pattern: chart.menu_pattern,
          priority: chart.priority,
          submenus: {},
          title: currentConnection.netdataDashboard.menuTitle(chart),
          icon: currentConnection.netdataDashboard.menuIcon(chart),
          info: currentConnection.netdataDashboard.menuInfo(chart),
          height: currentConnection.netdataDashboard.menuHeight(chart) * currentConnection.options.chartsHeight
        };
      } else {
        if (typeof (currentConnection.menus[m].menu_pattern) === 'undefined') {
          currentConnection.menus[m].menu_pattern = chart.menu_pattern;
        }

        if (chart.priority < currentConnection.menus[m].priority) {
          currentConnection.menus[m].priority = chart.priority;
        }
      }

      menuKey = (typeof (currentConnection.menus[m].menu_pattern) !== 'undefined') ? currentConnection.menus[m].menu_pattern : m;

      // create the submenu
      if (typeof currentConnection.menus[m].submenus[chart.submenu] === 'undefined') {
        currentConnection.menus[m].submenus[chart.submenu] = {
          priority: chart.priority,
          charts: [],
          title: null,
          info: currentConnection.netdataDashboard.submenuInfo(menuKey, chart.submenu),
          height: currentConnection.netdataDashboard.submenuHeight(menuKey, chart.submenu, currentConnection.menus[m].height)
        };
      } else {
        if (chart.priority < currentConnection.menus[m].submenus[chart.submenu].priority) {
          currentConnection.menus[m].submenus[chart.submenu].priority = chart.priority;
        }
      }

      // index the chart in the menu/submenu
      currentConnection.menus[m].submenus[chart.submenu].charts.push(chart);
    }

    // propagate the descriptive subname given to QoS
    // to all the other submenus with the same name
    for (const m in currentConnection.menus) {
      if (!currentConnection.menus.hasOwnProperty(m)) {
        continue;
      }

      for (const s in currentConnection.menus[m].submenus) {
        if (!currentConnection.menus[m].submenus.hasOwnProperty(s)) {
          continue;
        }

        // set the family using a name
        if (typeof currentConnection.options.submenu_names[s] !== 'undefined') {
          currentConnection.menus[m].submenus[s].title = s + ' (' + currentConnection.options.submenu_names[s] + ')';
        } else {
          menuKey = (typeof (currentConnection.menus[m].menu_pattern) !== 'undefined') ? currentConnection.menus[m].menu_pattern : m;
          currentConnection.menus[m].submenus[s].title = currentConnection.netdataDashboard.submenuTitle(menuKey, s);
        }
      }
    }

    const menusToReturn = [];
    for (const menu of Object.keys(currentConnection.menus)) {

      const currentSubmenusData = currentConnection.menus[menu].submenus;
      currentConnection.menus[menu].submenus = [];
      currentConnection.menus[menu].id = menu;

      if (currentSubmenusData) {
        for (const submenu of Object.keys(currentSubmenusData)) {
          currentSubmenusData[submenu].id = submenu;
          currentConnection.menus[menu].submenus.push(currentSubmenusData[submenu]);
        }
      }

      menusToReturn.push(currentConnection.menus[menu]);
    }

    currentConnection.menus = menusToReturn;

    this.$connections.next(Object.assign({}, this.dataStore).connections);

    return;
  }

  private enrichChartData(connection, chart): void {
    const currentConnection = this.dataStore.connections[connection.uuid];
    const parts = chart.type.split('_');
    const tmp = parts[0];

    switch (tmp) {
      case 'ap':
      case 'net':
      case 'disk':
      case 'powersupply':
      case 'statsd':
        chart.menu = tmp;
        break;

      case 'apache':
        chart.menu = chart.type;
        if (parts.length > 2 && parts[1] === 'cache') {
          chart.menu_pattern = tmp + '_' + parts[1];
        } else if (parts.length > 1) {
          chart.menu_pattern = tmp;
        }
        break;

      case 'bind':
        chart.menu = chart.type;
        if (parts.length > 2 && parts[1] === 'rndc') {
          chart.menu_pattern = tmp + '_' + parts[1];
        } else if (parts.length > 1) {
          chart.menu_pattern = tmp;
        }
        break;

      case 'cgroup':
        chart.menu = chart.type;
        if (chart.id.match(/.*[\._\/-:]qemu[\._\/-:]*/) || chart.id.match(/.*[\._\/-:]kvm[\._\/-:]*/)) {
          chart.menu_pattern = 'cgqemu';
        } else {
          chart.menu_pattern = 'cgroup';
        }
        break;

      case 'go':
        chart.menu = chart.type;
        if (parts.length > 2 && parts[1] === 'expvar') {
          chart.menu_pattern = tmp + '_' + parts[1];
        } else if (parts.length > 1) {
          chart.menu_pattern = tmp;
        }
        break;

      case 'isc':
        chart.menu = chart.type;
        if (parts.length > 2 && parts[1] === 'dhcpd') {
          chart.menu_pattern = tmp + '_' + parts[1];
        } else if (parts.length > 1) {
          chart.menu_pattern = tmp;
        }
        break;

      case 'ovpn':
        chart.menu = chart.type;
        if (parts.length > 3 && parts[1] === 'status' && parts[2] === 'log') {
          chart.menu_pattern = tmp + '_' + parts[1];
        } else if (parts.length > 1) {
          chart.menu_pattern = tmp;
        }
        break;

      case 'smartd':
      case 'web':
        chart.menu = chart.type;
        if (parts.length > 2 && parts[1] === 'log') {
          chart.menu_pattern = tmp + '_' + parts[1];
        } else if (parts.length > 1) {
          chart.menu_pattern = tmp;
        }
        break;

      case 'tc':
        chart.menu = tmp;

        // find a name for this device from fireqos info
        // we strip '_(in|out)' or '(in|out)_'
        if (chart.context === 'tc.qos' && (typeof currentConnection.options.submenu_names[chart.family] === 'undefined' || currentConnection.options.submenu_names[chart.family] === chart.family)) {
          const n = chart.name.split('.')[1];
          if (n.endsWith('_in')) {
            currentConnection.options.submenu_names[chart.family] = n.slice(0, n.lastIndexOf('_in'));
          } else if (n.endsWith('_out')) {
            currentConnection.options.submenu_names[chart.family] = n.slice(0, n.lastIndexOf('_out'));
          } else if (n.startsWith('in_')) {
            currentConnection.options.submenu_names[chart.family] = n.slice(3, n.length);
          } else if (n.startsWith('out_')) {
            currentConnection.options.submenu_names[chart.family] = n.slice(4, n.length);
          } else {
            currentConnection.options.submenu_names[chart.family] = n;
          }
        }

        // increase the priority of IFB devices
        // to have inbound appear before outbound
        if (chart.id.match(/.*-ifb$/)) {
          chart.priority--;
        }

        break;

      default:
        chart.menu = chart.type;
        if (parts.length > 1) {
          chart.menu_pattern = tmp;
        }
        break;
    }

    chart.submenu = chart.family;
  }

  private finalizePage(connection) {
    const currentConnection = this.dataStore.connections[connection.uuid];
    const currentNetdata = currentConnection.NETDATA;
    // resize all charts - without starting the background thread
    // this has to be done while NETDATA is paused
    // if we ommit this, the affix menu will be wrong, since all
    // the Dom elements are initially zero-sized
    currentNetdata.parseDom();

    // ------------------------------------------------------------------------

    if (currentConnection.urlOptions.pan_and_zoom === true && currentNetdata.options.targets.length > 0) {
      currentNetdata.globalPanAndZoom.setMaster(currentNetdata.options.targets[0], currentConnection.urlOptions.after, currentConnection.urlOptions.before);
    }

    // callback for us to track PanAndZoom operations
    currentNetdata.globalPanAndZoom.callback = currentConnection.urlOptions.netdataPanAndZoomCallback;
    currentNetdata.globalChartUnderlay.callback = currentConnection.urlOptions.netdataHighlightCallback;

    // ------------------------------------------------------------------------

    // let it run (update the charts)
    currentNetdata.unpause();

    if (currentNetdata.netdataSnapshotData !== null) {
      currentNetdata.globalPanAndZoom.setMaster(
        currentNetdata.options.targets[0],
        currentNetdata.netdataSnapshotData.after_ms,
        currentNetdata.netdataSnapshotData.before_ms
      );
    }
  }
}

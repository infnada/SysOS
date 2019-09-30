import {ElementRef, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';

declare let NETDATA: any;
declare let netdataShowAlarms: boolean;
declare let netdataSnapshotData: any;
declare let netdataCheckXSS: boolean;
declare let connection: Netdata;

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibModalService} from "@sysos/lib-modal";
import {SysosLibApplicationService} from '@sysos/lib-application';

import {SysosLibExtJqueryService} from '@sysos/lib-ext-jquery';
import {SysosLibExtDygraphsService} from '@sysos/lib-ext-dygraphs';
import {SysosLibExtEasypiechartService} from '@sysos/lib-ext-easypiechart';
import {SysosLibExtGaugejsService} from '@sysos/lib-ext-gaugejs';
import {SysosLibExtPerfectscrollbarService} from '@sysos/lib-ext-perfectscrollbar';
import {SysosLibExtPakoService} from '@sysos/lib-ext-pako';
import {SysosLibExtLzStringService} from '@sysos/lib-ext-lz-string';

import * as Dashboard from 'netdata/web/gui/dashboard';
import * as DashboardInfo from 'netdata/web/gui/dashboard_info';

import {SysosAppMonitorService} from './sysos-app-monitor.service';
import {Netdata} from '../types/netdata';

@Injectable({
  providedIn: 'root'
})
export class SysosAppMonitorDashboardService {

  private $;
  private pako;
  private LZString;

  NETDATA = NETDATA;

  private $options: BehaviorSubject<object>;
  private $netdataDashboard: BehaviorSubject<object>;
  private $menus: BehaviorSubject<object>;
  private $returnFromHighlight: BehaviorSubject<object>;

  options: Observable<any>;
  netdataDashboard: Observable<any>;
  menus: Observable<any>;
  returnFromHighlight: Observable<any>;

  dataStore: {  // This is where we will store our data in memory
    options: any;
    netdataDashboard: any;
    menus: any;
    returnFromHighlight: any;
  };

  private dashboardInitialized: boolean = false;
  private customInfo: boolean = true;
  private chartsDiv: ElementRef;
  private snapshotOptions = {
    bytes_per_chart: 2048,
    compressionDefault: 'pako.deflate.base64',

    compressions: {
      'none': {
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
          return btoa((this.pako as any).deflate(s, { to: 'string' }));
        },
        compressed_length: (s) => {
          return s.length;
        },
        uncompress: (s) => {
          return (this.pako as any).inflate(atob(s), { to: 'string' });
        }
      },
      'pako.deflate': {
        bytes_per_point_memory: 1.4,
        bytes_per_point_disk: 3.2,
        compress: (s) => {
          return (this.pako as any).deflate(s, { to: 'string' });
        },
        compressed_length: (s) => {
          return s.length;
        },
        uncompress: (s) => {
          return (this.pako as any).inflate(s, { to: 'string' });
        }
      },
      'lzstring.utf16': {
        bytes_per_point_memory: 1.7,
        bytes_per_point_disk: 2.6,
        compress: (s) => {
          return (this.LZString as any).compressToUTF16(s);
        },
        compressed_length: (s) => {
          return s.length * 2;
        },
        uncompress: (s) => {
          return (this.LZString as any).decompressFromUTF16(s);
        }
      },
      'lzstring.base64': {
        bytes_per_point_memory: 2.1,
        bytes_per_point_disk: 2.3,
        compress: (s) => {
          return (this.LZString as any).compressToBase64(s);
        },
        compressed_length: (s) => {
          return s.length;
        },
        uncompress: (s) => {
          return (this.LZString as any).decompressFromBase64(s);
        }
      },
      'lzstring.uri': {
        bytes_per_point_memory: 2.1,
        bytes_per_point_disk: 2.3,
        compress: (s) => {
          return (this.LZString as any).compressToEncodedURIComponent(s);
        },
        compressed_length: (s) => {
          return s.length;
        },
        uncompress: (s) => {
          return (this.LZString as any).decompressFromEncodedURIComponent(s);
        }
      }
    }
  };
  urlOptions = {
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
      let variables = document.location.hash.split(';');
      let len = variables.length;
      while (len--) {
        if (len !== 0) {
          let p = variables[len].split('=');
          if (this.urlOptions.hasProperty(p[0]) && typeof p[1] !== 'undefined') {
            this.urlOptions[p[0]] = decodeURIComponent(p[1]);
          }
        } else {
          if (variables[len].length > 0) {
            this.urlOptions.hash = variables[len];
          }
        }
      }

      let booleans = ['nowelcome', 'show_alarms', 'update_always'];
      len = booleans.length;
      while (len--) {
        if (this.urlOptions[booleans[len]] === 'true' || this.urlOptions[booleans[len]] === true || this.urlOptions[booleans[len]] === '1' || this.urlOptions[booleans[len]] === 1) {
          this.urlOptions[booleans[len]] = true;
        } else {
          this.urlOptions[booleans[len]] = false;
        }
      }

      let numeric = ['after', 'before', 'highlight_after', 'highlight_before', 'alarm_when'];
      len = numeric.length;
      while (len--) {
        if (typeof this.urlOptions[numeric[len]] === 'string') {
          try {
            this.urlOptions[numeric[len]] = parseInt(this.urlOptions[numeric[len]]);
          }
          catch (e) {
            console.log('failed to parse URL hash parameter ' + numeric[len]);
            this.urlOptions[numeric[len]] = 0;
          }
        }
      }

      if (this.urlOptions.alarm_when) {
        // if alarm_when exists, create after/before params
        // -/+ 2 minutes from the alarm, and reload the page
        const alarmTime = new Date(this.urlOptions.alarm_when * 1000).valueOf();
        const timeMarginMs = 120000; // 2 mins

        const after = alarmTime - timeMarginMs;
        const before = alarmTime + timeMarginMs;
        const newHash = document.location.hash.replace(
          /;alarm_when=[0-9]*/i,
          ";after=" + after + ";before=" + before,
        );
        history.replaceState(null, '', newHash);
        location.reload();
      }

      if (this.urlOptions.server !== null && this.urlOptions.server !== '') {
        this.NETDATA.serverDefault = this.urlOptions.server;
        netdataCheckXSS = true;
      } else {
        this.urlOptions.server = null;
      }

      if (this.urlOptions.before > 0 && this.urlOptions.after > 0) {
        this.urlOptions.pan_and_zoom = true;
        this.urlOptions.nowelcome = true;
      } else {
        this.urlOptions.pan_and_zoom = false;
      }

      this.urlOptions.highlight = this.urlOptions.highlight_before > 0 && this.urlOptions.highlight_after > 0;

    },
    netdataPanAndZoomCallback: (status, after, before) => {
      if (netdataSnapshotData === null) {
        this.urlOptions.pan_and_zoom = status;
        this.urlOptions.after = after;
        this.urlOptions.before = before;
      }
    },
    netdataHighlightCallback: (status, after, before) => {
      if (status === true && (after === null || before === null || after <= 0 || before <= 0 || after >= before)) {
        status = false;
        after = 0;
        before = 0;
      }

      if (netdataSnapshotData === null) {
        this.urlOptions.highlight = status;
      } else {
        this.urlOptions.highlight = false;
      }

      this.urlOptions.highlight_after = Math.round(after);
      this.urlOptions.highlight_before = Math.round(before);

      if (status === true && after > 0 && before > 0 && after < before) {
        let d1 = NETDATA.dateTime.localeDateString(after);
        let d2 = NETDATA.dateTime.localeDateString(before);
        if (d1 === d2) d2 = '';

        this.dataStore.returnFromHighlight = {
          showHighlight: true,
          d1,
          d2,
          after: this.NETDATA.dateTime.localeTimeString(after),
          before: this.NETDATA.dateTime.localeTimeString(before),
          duration: this.NETDATA.seconds4human(Math.round((before - after) / 1000))
        };
      } else {
        this.dataStore.returnFromHighlight = {
          showHighlight: false
        };
      }

      this.$returnFromHighlight.next(Object.assign({}, this.dataStore).returnFromHighlight);
    },
    clearHighlight: () => {
      this.NETDATA.globalChartUnderlay.clear();

      if (this.NETDATA.globalPanAndZoom.isActive() === true) this.NETDATA.globalPanAndZoom.clearMaster();
    },
    showHighlight: () => {
      this.NETDATA.globalChartUnderlay.focus();
    }
  };

  constructor(private http: HttpClient,
              private logger: SysosLibLoggerService,
              private Modal: SysosLibModalService,
              private Applications: SysosLibApplicationService,
              private jQuery: SysosLibExtJqueryService,
              private Dygraphs: SysosLibExtDygraphsService,
              private easyPieChart: SysosLibExtEasypiechartService,
              private gaugeJS: SysosLibExtGaugejsService,
              private Ps: SysosLibExtPerfectscrollbarService,
              private pakoService: SysosLibExtPakoService,
              private LZStringService: SysosLibExtLzStringService,
              private MonitorService: SysosAppMonitorService) {
    this.$ = this.jQuery.$;
    this.pako = pakoService.Pako;
    this.LZString = LZStringService.LZString;

    this.dataStore = {
      options: {},
      netdataDashboard: {},
      menus: {},
      returnFromHighlight: {
        showHighlight: false
      }
    };

    this.$options = new BehaviorSubject(null) as BehaviorSubject<object>;
    this.$netdataDashboard = new BehaviorSubject(null) as BehaviorSubject<object>;
    this.$menus = new BehaviorSubject(null) as BehaviorSubject<object>;
    this.$returnFromHighlight = new BehaviorSubject(this.dataStore.returnFromHighlight) as BehaviorSubject<object>;
    this.options = this.$options.asObservable();
    this.netdataDashboard = this.$netdataDashboard.asObservable();
    this.menus = this.$menus.asObservable();
    this.returnFromHighlight = this.$returnFromHighlight.asObservable();

    // Make sure charts are not refreshed when 'monitor' is not the current active application
    this.Applications.taskbarItemOpen.subscribe(application => {
      if (this.dashboardInitialized) {
        if (application !== 'monitor') this.NETDATA.options.page_is_visible = false;
        if (application === 'monitor') this.NETDATA.options.page_is_visible = true;
      }
    });

    const _this = this;

    // Set easyPieChart
    this.jQuery.$.fn.easyPieChart = function(options) {
      return this.each(function() {
        let instanceOptions;

        if (!_this.jQuery.$.data(this, 'easyPieChart')) {
          instanceOptions = _this.jQuery.$.extend({}, options, _this.jQuery.$(this).data());
          _this.jQuery.$.data(this, 'easyPieChart', new _this.easyPieChart.easyPieChart(this, instanceOptions));
        }
      });
    };
  }

  resetDashboard() {
    netdataShowAlarms = false;
    netdataSnapshotData = null;

    // Reset the view
    this.dataStore.options = {
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
    };
    this.dataStore.netdataDashboard = {
      sparklines_registry: {},
      os: 'unknown',
      menu: {},
      submenu: {},
      context: {},

      // generate a sparkline
      // used in the documentation
      sparkline: (prefix, chart, dimension, units, suffix) => {
        if (this.dataStore.options.data === null || typeof this.dataStore.options.data.charts === 'undefined') return '';
        if (typeof this.dataStore.options.data.charts[chart] === 'undefined') return '';
        if (typeof this.dataStore.options.data.charts[chart].dimensions === 'undefined') return '';
        if (typeof this.dataStore.options.data.charts[chart].dimensions[dimension] === 'undefined') return '';

        let key = chart + '.' + dimension;

        if (typeof units === 'undefined') units = '';

        if (typeof this.dataStore.netdataDashboard.sparklines_registry[key] === 'undefined') {
          this.dataStore.netdataDashboard.sparklines_registry[key] = { count: 1 };
        } else {
          this.dataStore.netdataDashboard.sparklines_registry[key].count++;
        }

        key = key + '.' + this.dataStore.netdataDashboard.sparklines_registry[key].count;
        return prefix + '<div class="netdata-container" data-netdata="' + chart + '" data-after="-120" data-width="25%" data-height="15px" data-chart-library="dygraph" data-dygraph-theme="sparkline" data-dimensions="' + dimension + '" data-show-value-of-' + dimension + '-at="' + key + '"></div> (<span id="' + key + '" style="display: inline-block; min-width: 50px; text-align: right;">X</span>' + units + ')' + suffix;
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
          let x = obj[key][attr];

          if (typeof (x) === 'undefined') return def;
          if (typeof (x) === 'function') return x(this.dataStore.netdataDashboard.os);

          return x;
        }

        return def;
      },
      menuTitle: (chart) => {
        if (typeof chart.menu_pattern !== 'undefined') {
          return (this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.menu, 'title', chart.menu_pattern, chart.menu_pattern).toString()
            + '&nbsp;' + chart.type.slice(-(chart.type.length - chart.menu_pattern.length - 1)).toString()).replace(/_/g, ' ');
        }

        return (this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.menu, 'title', chart.menu, chart.menu)).toString().replace(/_/g, ' ');
      },
      menuIcon: (chart) => {
        if (typeof chart.menu_pattern !== 'undefined') {
          return this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.menu, 'icon', chart.menu_pattern, '<i class="fas fa-puzzle-piece"></i>').toString();
        }

        return this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.menu, 'icon', chart.menu, '<i class="fas fa-puzzle-piece"></i>');
      },
      menuInfo: (chart) => {
        if (typeof chart.menu_pattern !== 'undefined') {
          return this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.menu, 'info', chart.menu_pattern, null);
        }
        return this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.menu, 'info', chart.menu, null);
      },
      menuHeight: (chart) => {
        if (typeof chart.menu_pattern !== 'undefined') {
          return this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.menu, 'height', chart.menu_pattern, 1.0);
        }

        return this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.menu, 'height', chart.menu, 1.0);
      },
      submenuTitle: (menu, submenu) => {
        let key = menu + '.' + submenu;
        let title = this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.submenu, 'title', key, submenu).toString().replace(/_/g, ' ');
        if (title.length > 28) {
          let a = title.substring(0, 13);
          let b = title.substring(title.length - 12, title.length);
          return a + '...' + b;
        }
        return title;
      },
      submenuInfo: (menu, submenu) => {
        let key = menu + '.' + submenu;
        return this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.submenu, 'info', key, null);
      },
      submenuHeight: (menu, submenu, relative) => {
        let key = menu + '.' + submenu;
        return this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.submenu, 'height', key, 1.0) * relative;
      },
      contextInfo: (id) => {
        let x = this.dataStore.netdataDashboard.anyAttribute(this.dataStore.netdataDashboard.context, 'info', id, null);

        if (x !== null) {
          return '<div class="shorten dashboard-context-info netdata-chart-alignment" role="document">' + x + '</div>';
        } else {
          return '';
        }
      },
      contextValueRange: (id) => {
        if (typeof this.dataStore.netdataDashboard.context[id] !== 'undefined' && typeof this.dataStore.netdataDashboard.context[id].valueRange !== 'undefined') {
          return this.dataStore.netdataDashboard.context[id].valueRange;
        } else {
          return '[null, null]';
        }
      },
      contextHeight: (id, def) => {
        if (typeof this.dataStore.netdataDashboard.context[id] !== 'undefined' && typeof this.dataStore.netdataDashboard.context[id].height !== 'undefined') {
          return def * this.dataStore.netdataDashboard.context[id].height;
        } else {
          return def;
        }
      },
      contextDecimalDigits: (id, def) => {
        if (typeof this.dataStore.netdataDashboard.context[id] !== 'undefined' && typeof this.dataStore.netdataDashboard.context[id].decimalDigits !== 'undefined') {
          return this.dataStore.netdataDashboard.context[id].decimalDigits;
        } else {
          return def;
        }
      }
    };
    this.dataStore.menus = {};

    if (this.dashboardInitialized) {
      this.NETDATA.abortAllRefreshes();
      this.NETDATA.globalReset();

      // Reset the view
      this.$options.next(null);
      this.$netdataDashboard.next(null);
      this.$menus.next(null);
    }

  }

  newDashboard() {
    // Set Netdata dashboard
    this.resetDashboard();

    connection = this.MonitorService.getActiveConnection();

    if (!this.dashboardInitialized) new Dashboard(this.jQuery.$, this.Dygraphs.Dygraph, this.gaugeJS.gaugeJS.Gauge, this.Ps.PerfectScrollbar);
    new DashboardInfo(this.dataStore.netdataDashboard);
    this.dashboardInitialized = true;

    this.urlOptions.parseHash();

    // Store NETDATA var into service to reuse it on other components
    this.MonitorService.setNetdata(this.NETDATA);
    return this.NETDATA
  }

  private jsonParseFn(str) {

    // Required to be available inside eval
    let netdataDashboard = this.dataStore.netdataDashboard;

    return JSON.parse(str, function (key, value) {
      if (typeof value != 'string') {
        return value;
      }
      return (value.substring(0, 8) == 'function') ? eval('(' + value + ')') : value;
    });
  }

  private alarmsCallback(data) {
    let count = 0;

    for (let x in data.alarms) {
      if (!data.alarms.hasOwnProperty(x)) continue;

      let alarm = data.alarms[x];
      if (alarm.status === 'WARNING' || alarm.status === 'CRITICAL') count++;
    }

    console.log(this);

    if (this.dataStore) this.dataStore.options.activeAlarms = count;
  }

  private loadSnapshot() {
    netdataSnapshotData = this.MonitorService.getActiveConnection().snapshotData;
    netdataShowAlarms = false;
    this.NETDATA.serverDefault = netdataSnapshotData.server;


    if (typeof netdataSnapshotData.hash !== 'undefined') {
      this.urlOptions.hash = netdataSnapshotData.hash;
    } else {
      this.urlOptions.hash = '#';
    }

    if (typeof netdataSnapshotData.info !== 'undefined') {
      let info = this.jsonParseFn(netdataSnapshotData.info);

      if (typeof info.menu !== 'undefined') this.dataStore.netdataDashboard.menu = info.menu;
      if (typeof info.submenu !== 'undefined') this.dataStore.netdataDashboard.submenu = info.submenu;
      if (typeof info.context !== 'undefined') this.dataStore.netdataDashboard.context = info.context;
    }

    if (typeof netdataSnapshotData.compression !== 'string') netdataSnapshotData.compression = 'none';

    if (typeof this.snapshotOptions.compressions[netdataSnapshotData.compression] === 'undefined') {
      alert('unknown compression method: ' + netdataSnapshotData.compression);
      netdataSnapshotData.compression = 'none';
    }

    netdataSnapshotData.uncompress = this.snapshotOptions.compressions[netdataSnapshotData.compression].uncompress;

    this.urlOptions.after = netdataSnapshotData.after_ms;
    this.urlOptions.before = netdataSnapshotData.before_ms;

    if (typeof netdataSnapshotData.highlight_after_ms !== 'undefined'
      && netdataSnapshotData.highlight_after_ms !== null
      && netdataSnapshotData.highlight_after_ms > 0
      && typeof netdataSnapshotData.highlight_before_ms !== 'undefined'
      && netdataSnapshotData.highlight_before_ms !== null
      && netdataSnapshotData.highlight_before_ms > 0
    ) {
      this.urlOptions.highlight_after = netdataSnapshotData.highlight_after_ms;
      this.urlOptions.highlight_before = netdataSnapshotData.highlight_before_ms;
      this.urlOptions.highlight = true;
    } else {
      this.urlOptions.highlight_after = 0;
      this.urlOptions.highlight_before = 0;
      this.urlOptions.highlight = false;
    }

    netdataCheckXSS = false; // disable the modal - this does not affect XSS checks, since dashboard.js is already loaded
    this.NETDATA.xss.enabled = true;             // we should not do any remote requests, but if we do, check them
    this.NETDATA.xss.enabled_for_data = true;    // check also snapshot data - that have been excluded from the initial check, due to compression
  }

  initializeDynamicDashboard(chartsDiv) {
    this.chartsDiv = chartsDiv;

    this.NETDATA.serverDefault = this.MonitorService.getActiveConnection().url;

    if (this.MonitorService.getActiveConnection().snapshotData) this.loadSnapshot();

    // initialize clickable alarms
    this.NETDATA.alarms.chart_div_offset = -50;
    this.NETDATA.alarms.chart_div_id_prefix = 'chart_';
    this.NETDATA.alarms.chart_div_animation_duration = 0;

    this.NETDATA.pause(() => {
      if (netdataCheckXSS) {

        this.Modal.openRegisteredModal('monitor-xss', '.window--monitor .window__main', {}).then((modalInstance) => {
          modalInstance.result.then((res) => {
            if (res === 'xssModalKeepXss') {
              this.NETDATA.xss.enabled = true;
              this.NETDATA.xss.enabled_for_data = true;
              this.customInfo = false;
            }

            if (res === 'xssModalDisableXss') {
              this.NETDATA.xss.enabled = false;
              this.NETDATA.xss.enabled_for_data = false;
              this.customInfo = true;
            }

            this.initializeCharts();
          });

        });
      } else {
        this.initializeCharts();
      }
    });

  }

  private initializeCharts() {
    this.NETDATA.alarms.callback = this.alarmsCallback;

    // download all the charts the server knows
    return this.NETDATA.chartRegistry.downloadAll(this.NETDATA.serverDefault, (data) => {
      if (data !== null) {

        if (this.customInfo && data.custom_info && netdataSnapshotData === null) {

          this.http.get(this.NETDATA.serverDefault + data.custom_info).subscribe(
            (data) => {
              this.initializeDynamicDashboardWithData(data);
            },
            error => {
              this.logger.error('Monitor', 'Error while getting custom dashboards', null, error);
            });

        } else {
          this.initializeDynamicDashboardWithData(data);
        }

      }
    });
  }

  private initializeDynamicDashboardWithData(data) {
    this.dataStore.options.hostname = data.hostname;
    this.dataStore.options.data = data;
    this.dataStore.options.version = data.version;
    this.dataStore.options.release_channel = data.release_channel;
    this.dataStore.netdataDashboard.os = data.os;

    if (typeof data.hosts !== 'undefined') {
      this.dataStore.options.hosts = data.hosts;
    }

    // find the proper duration for per-second updates
    this.dataStore.options.duration = Math.round((this.chartsDiv.nativeElement.clientWidth * 100 / 100 * this.dataStore.options.data.update_every / 3) / 60) * 60;
    this.dataStore.options.update_every = this.dataStore.options.data.update_every;

    // create a chart_by_name index
    data.charts_by_name = {};
    let charts = data.charts;
    let x;
    for (x in charts) {
      if (!charts.hasOwnProperty(x)) {
        continue;
      }

      let chart = charts[x];
      data.charts_by_name[chart.name] = chart;
    }

    this.createSidebarMenus();

    this.$options.next(Object.assign({}, this.dataStore).options);
    this.$netdataDashboard.next(Object.assign({}, this.dataStore).netdataDashboard);

    if (this.urlOptions.highlight === true) {
      this.NETDATA.globalChartUnderlay.init(
        null,
        this.urlOptions.highlight_after,
        this.urlOptions.highlight_before,
        (this.urlOptions.after > 0) ? this.urlOptions.after : null,
        (this.urlOptions.before > 0) ? this.urlOptions.before : null
      );
    } else {
      this.NETDATA.globalChartUnderlay.clear();
    }

    setTimeout(() => this.finalizePage(), 0)
  }

  private createSidebarMenus(): void {
    let menu_key;

    // Set Menus info
    for (let c in this.dataStore.options.data.charts) {
      if (!this.dataStore.options.data.charts.hasOwnProperty(c)) {
        continue;
      }

      let chart = this.dataStore.options.data.charts[c];

      this.enrichChartData(chart);
      let m = chart.menu;

      // create the menu
      if (typeof this.dataStore.menus[m] === 'undefined') {
        this.dataStore.menus[m] = {
          menu_pattern: chart.menu_pattern,
          priority: chart.priority,
          submenus: {},
          title: this.dataStore.netdataDashboard.menuTitle(chart),
          icon: this.dataStore.netdataDashboard.menuIcon(chart),
          info: this.dataStore.netdataDashboard.menuInfo(chart),
          height: this.dataStore.netdataDashboard.menuHeight(chart) * this.dataStore.options.chartsHeight
        };
      } else {
        if (typeof (this.dataStore.menus[m].menu_pattern) === 'undefined') {
          this.dataStore.menus[m].menu_pattern = chart.menu_pattern;
        }

        if (chart.priority < this.dataStore.menus[m].priority) {
          this.dataStore.menus[m].priority = chart.priority;
        }
      }

      menu_key = (typeof (this.dataStore.menus[m].menu_pattern) !== 'undefined') ? this.dataStore.menus[m].menu_pattern : m;

      // create the submenu
      if (typeof this.dataStore.menus[m].submenus[chart.submenu] === 'undefined') {
        this.dataStore.menus[m].submenus[chart.submenu] = {
          priority: chart.priority,
          charts: [],
          title: null,
          info: this.dataStore.netdataDashboard.submenuInfo(menu_key, chart.submenu),
          height: this.dataStore.netdataDashboard.submenuHeight(menu_key, chart.submenu, this.dataStore.menus[m].height)
        };
      } else {
        if (chart.priority < this.dataStore.menus[m].submenus[chart.submenu].priority) {
          this.dataStore.menus[m].submenus[chart.submenu].priority = chart.priority;
        }
      }

      // index the chart in the menu/submenu
      this.dataStore.menus[m].submenus[chart.submenu].charts.push(chart);
    }

    // propagate the descriptive subname given to QoS
    // to all the other submenus with the same name
    for (let m in this.dataStore.menus) {
      if (!this.dataStore.menus.hasOwnProperty(m)) {
        continue;
      }

      for (let s in this.dataStore.menus[m].submenus) {
        if (!this.dataStore.menus[m].submenus.hasOwnProperty(s)) {
          continue;
        }

        // set the family using a name
        if (typeof this.dataStore.options.submenu_names[s] !== 'undefined') {
          this.dataStore.menus[m].submenus[s].title = s + ' (' + this.dataStore.options.submenu_names[s] + ')';
        } else {
          menu_key = (typeof (this.dataStore.menus[m].menu_pattern) !== 'undefined') ? this.dataStore.menus[m].menu_pattern : m;
          this.dataStore.menus[m].submenus[s].title = this.dataStore.netdataDashboard.submenuTitle(menu_key, s);
        }
      }
    }

    this.$menus.next(Object.assign({}, this.dataStore).menus);

    return;
  }

  private enrichChartData(chart): void {
    let parts = chart.type.split('_');
    let tmp = parts[0];

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
        if (chart.context === 'tc.qos' && (typeof this.dataStore.options.submenu_names[chart.family] === 'undefined' || this.dataStore.options.submenu_names[chart.family] === chart.family)) {
          let n = chart.name.split('.')[1];
          if (n.endsWith('_in')) {
            this.dataStore.options.submenu_names[chart.family] = n.slice(0, n.lastIndexOf('_in'));
          } else if (n.endsWith('_out')) {
            this.dataStore.options.submenu_names[chart.family] = n.slice(0, n.lastIndexOf('_out'));
          } else if (n.startsWith('in_')) {
            this.dataStore.options.submenu_names[chart.family] = n.slice(3, n.length);
          } else if (n.startsWith('out_')) {
            this.dataStore.options.submenu_names[chart.family] = n.slice(4, n.length);
          } else {
            this.dataStore.options.submenu_names[chart.family] = n;
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

  private finalizePage() {
    // resize all charts - without starting the background thread
    // this has to be done while NETDATA is paused
    // if we ommit this, the affix menu will be wrong, since all
    // the Dom elements are initially zero-sized
    this.NETDATA.parseDom();

    // ------------------------------------------------------------------------

    if (this.urlOptions.pan_and_zoom === true && this.NETDATA.options.targets.length > 0) {
      this.NETDATA.globalPanAndZoom.setMaster(this.NETDATA.options.targets[0], this.urlOptions.after, this.urlOptions.before);
    }

    // callback for us to track PanAndZoom operations
    this.NETDATA.globalPanAndZoom.callback = this.urlOptions.netdataPanAndZoomCallback;
    this.NETDATA.globalChartUnderlay.callback = this.urlOptions.netdataHighlightCallback;

    // ------------------------------------------------------------------------

    // let it run (update the charts)
    this.NETDATA.unpause();

    this.runOnceOnDashboardWithjQuery();
    this.enableTooltipsAndPopovers();

    if (netdataSnapshotData !== null) {
      this.NETDATA.globalPanAndZoom.setMaster(this.NETDATA.options.targets[0], netdataSnapshotData.after_ms, netdataSnapshotData.before_ms);
    }
  }

  private runOnceOnDashboardWithjQuery() {

    // loadSnapshotDragAndDropSetup();

    // ------------------------------------------------------------------------
    // https://github.com/viralpatel/jquery.shorten/blob/master/src/jquery.shorten.js

    this.$.fn.popover = () => {
      console.log('popover');
    };

    this.$.fn.tooltip = () => {
      console.log('tooltip');
    };

  }

  private enableTooltipsAndPopovers() {
    this.$('[data-toggle="tooltip"]').tooltip({
      animated: 'fade',
      trigger: 'hover',
      html: true,
      delay: { show: 500, hide: 0 },
      container: 'body'
    });
    this.$('[data-toggle="popover"]').popover();
  }


}

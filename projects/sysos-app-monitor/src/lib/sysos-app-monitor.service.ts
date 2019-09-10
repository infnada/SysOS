import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {SysosLibExtJqueryService} from '@sysos/lib-ext-jquery';

declare let NETDATA: any;

@Injectable({
  providedIn: 'root'
})
export class SysosAppMonitorService {

  private $;
  private $options: BehaviorSubject<object>;
  private $netdataDashboard: BehaviorSubject<object>;
  private $menus: BehaviorSubject<object>;

  options: Observable<any>;
  netdataDashboard: Observable<any>;
  menus: Observable<any>;

  dataStore: {  // This is where we will store our data in memory
    options: any;
    netdataDashboard: any;
    menus: any;
  };

  private initializeConfig = {
    url: null
  };
  mainhead;
  chartsDiv: ElementRef;
  runOnceOnDashboardLastRun = 0;
  netdataSnapshotData = null;

  constructor(private jQuery: SysosLibExtJqueryService) {
    this.$ = this.jQuery.$;

    this.dataStore = {
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
        // chartsMinWidth: 1450,
        chartsHeight: 180,
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
          if (this.dataStore.options.data === null || typeof this.dataStore.options.data.charts === 'undefined') {
            return '';
          }

          if (typeof this.dataStore.options.data.charts[chart] === 'undefined') {
            return '';
          }

          if (typeof this.dataStore.options.data.charts[chart].dimensions === 'undefined') {
            return '';
          }

          if (typeof this.dataStore.options.data.charts[chart].dimensions[dimension] === 'undefined') {
            return '';
          }

          let key = chart + '.' + dimension;

          if (typeof units === 'undefined') {
            units = '';
          }

          if (typeof this.dataStore.netdataDashboard.sparklines_registry[key] === 'undefined') {
            this.dataStore.netdataDashboard.sparklines_registry[key] = { count: 1 };
          } else {
            this.dataStore.netdataDashboard.sparklines_registry[key].count++;
          }

          key = key + '.' + this.dataStore.netdataDashboard.sparklines_registry[key].count;

          return prefix + '<div class="netdata-container" data-netdata="' + chart + '" data-after="-120" data-width="25%" data-height="15px" data-chart-library="dygraph" data-dygraph-theme="sparkline" data-dimensions="' + dimension + '" data-show-value-of-' + dimension + '-at="' + key + '"></div> (<span id="' + key + '" style="display: inline-block; min-width: 50px; text-align: right;">X</span>' + units + ')' + suffix;
        },

        gaugeChart: (title, width, dimensions, colors) => {
          if (typeof colors === 'undefined') {
            colors = '';
          }

          if (typeof dimensions === 'undefined') {
            dimensions = '';
          }

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

            if (typeof (x) === 'undefined') {
              return def;
            }

            if (typeof (x) === 'function') {
              return x(this.dataStore.netdataDashboard.os);
            }

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
      },
      menus: {}
    };

    this.$options = new BehaviorSubject(null) as BehaviorSubject<object>;
    this.$netdataDashboard = new BehaviorSubject(null) as BehaviorSubject<object>;
    this.$menus = new BehaviorSubject(null) as BehaviorSubject<object>;
    this.options = this.$options.asObservable();
    this.netdataDashboard = this.$netdataDashboard.asObservable();
    this.menus = this.$menus.asObservable();
  }

  initializeDynamicDashboard(chartsDiv, netdata_url?) {
    this.chartsDiv = chartsDiv;

    if (typeof netdata_url === 'undefined' || netdata_url === null) {
      netdata_url = NETDATA.serverDefault;
    }

    this.initializeConfig.url = netdata_url;

    // initialize clickable alarms
    NETDATA.alarms.chart_div_offset = -50;
    NETDATA.alarms.chart_div_id_prefix = 'chart_';
    NETDATA.alarms.chart_div_animation_duration = 0;

    NETDATA.pause(() => {
      this.initializeCharts();
    });

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

  scrollToId(hash) {
    if (hash && hash !== '' && document.getElementById(hash) !== null) {
      let el = document.getElementById(hash);
      el.scrollIntoView();
    }

    // we must return false to prevent the default action
    return false;
  }

  private scrollDashboardTo() {
    if (this.netdataSnapshotData !== null && typeof this.netdataSnapshotData.hash !== 'undefined') {
      //console.log(netdataSnapshotData.hash);
      this.scrollToId(this.netdataSnapshotData.hash.replace('#', ''));
    }
  }

  private runOnceOnDashboardWithjQuery() {
    this.scrollDashboardTo();

    //dashboardSettingsSetup();
    //loadSnapshotDragAndDropSetup();
    //saveSnapshotModalSetup();

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

  private finalizePage() {
    // resize all charts - without starting the background thread
    // this has to be done while NETDATA is paused
    // if we ommit this, the affix menu will be wrong, since all
    // the Dom elements are initially zero-sized
    NETDATA.parseDom();

    // ------------------------------------------------------------------------

    NETDATA.globalPanAndZoom.callback = null;
    NETDATA.globalChartUnderlay.callback = null;

    // ------------------------------------------------------------------------

    // let it run (update the charts)
    NETDATA.unpause();

    this.runOnceOnDashboardWithjQuery();
    this.enableTooltipsAndPopovers();

    if (this.netdataSnapshotData !== null) {
      NETDATA.globalPanAndZoom.setMaster(NETDATA.options.targets[0], this.netdataSnapshotData.after_ms, this.netdataSnapshotData.before_ms);
    }
  }

  alarmsCallback(data) {
    let count = 0, x;
    for (x in data.alarms) {
      if (!data.alarms.hasOwnProperty(x)) {
        continue;
      }

      let alarm = data.alarms[x];
      if (alarm.status === 'WARNING' || alarm.status === 'CRITICAL') {
        count++;
      }
    }

    if (count > 0) {
      document.getElementById('alarms_count_badge').innerHTML = count.toString();
    } else {
      document.getElementById('alarms_count_badge').innerHTML = '';
    }
  }

  initializeCharts() {
    NETDATA.alarms.callback = this.alarmsCallback;

    // download all the charts the server knows
    return NETDATA.chartRegistry.downloadAll(this.initializeConfig.url, (data) => {
      if (data !== null) {
        this.initializeDynamicDashboardWithData(data);
      }
    });
  }

  initializeDynamicDashboardWithData(data) {
    if (data !== null) {
      this.dataStore.options.hostname = data.hostname;
      this.dataStore.options.data = data;
      this.dataStore.options.version = data.version;
      this.dataStore.options.release_channel = data.release_channel;
      this.dataStore.netdataDashboard.os = data.os;

      if (typeof data.hosts !== 'undefined') {
        this.dataStore.options.hosts = data.hosts;
      }

      // find the proper duration for per-second updates
      this.dataStore.options.duration = Math.round((this.chartsDiv.nativeElement.width * 100 / 100 * this.dataStore.options.data.update_every / 3) / 60) * 60;
      this.dataStore.options.update_every = this.dataStore.options.data.update_every;

      this.createSidebarMenus();
      NETDATA.globalChartUnderlay.clear();
      this.finalizePage();

      // TODO if is snapshot
      /*
      if (netdataSnapshotData !== null) {
        $('#alarmsButton').hide();
        $('#updateButton').hide();
        // $('#loadButton').hide();
        $('#saveButton').hide();
        $('#printButton').hide();
      }*/

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
    }

    this.$options.next(Object.assign({}, this.dataStore).options);
    this.$netdataDashboard.next(Object.assign({}, this.dataStore).netdataDashboard);
  }
}

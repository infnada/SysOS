import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibServiceInjectorService} from "@sysos/lib-service-injector";

@Component({
  selector: 'smme-sysos-modal-monitor-export',
  templateUrl: './sysos-modal-monitor-export.component.html',
  styleUrls: ['./sysos-modal-monitor-export.component.scss']
})
export class SysosModalMonitorExportComponent implements OnInit {
  @Input() options;

  private MonitorService;
  private NETDATA;
  private saveSnapshotStop: boolean = false;
  private saveData;
  private backedupOptions = {};
  private clearPanAndZoom: boolean = false;

  progressText: string;
  progressType: string = 'info';
  progressCurrentId: string;
  progressPcent: number = 0;
  showProgress: boolean = false;
  snapshotName: string;
  snapshotComment: string;
  compressionType: string;
  slider;

  snapshotOptions = {
    bytes_per_chart: 2048,
    compressionDefault: 'pako.deflate.base64',

    compressions: {
      'none': {
        bytes_per_point_memory: 5.2,
        bytes_per_point_disk: 5.6,

        compress: function (s) {
          return s;
        },

        compressed_length: function (s) {
          return s.length;
        },

        uncompress: function (s) {
          return s;
        }
      },

      'pako.deflate.base64': {
        bytes_per_point_memory: 1.8,
        bytes_per_point_disk: 1.9,

        compress: function (s) {
          return btoa(pako.deflate(s, { to: 'string' }));
        },

        compressed_length: function (s) {
          return s.length;
        },

        uncompress: function (s) {
          return pako.inflate(atob(s), { to: 'string' });
        }
      },

      'pako.deflate': {
        bytes_per_point_memory: 1.4,
        bytes_per_point_disk: 3.2,

        compress: function (s) {
          return pako.deflate(s, { to: 'string' });
        },

        compressed_length: function (s) {
          return s.length;
        },

        uncompress: function (s) {
          return pako.inflate(s, { to: 'string' });
        }
      },

      'lzstring.utf16': {
        bytes_per_point_memory: 1.7,
        bytes_per_point_disk: 2.6,

        compress: function (s) {
          return LZString.compressToUTF16(s);
        },

        compressed_length: function (s) {
          return s.length * 2;
        },

        uncompress: function (s) {
          return LZString.decompressFromUTF16(s);
        }
      },

      'lzstring.base64': {
        bytes_per_point_memory: 2.1,
        bytes_per_point_disk: 2.3,

        compress: function (s) {
          return LZString.compressToBase64(s);
        },

        compressed_length: function (s) {
          return s.length;
        },

        uncompress: function (s) {
          return LZString.decompressFromBase64(s);
        }
      },

      'lzstring.uri': {
        bytes_per_point_memory: 2.1,
        bytes_per_point_disk: 2.3,

        compress: function (s) {
          return LZString.compressToEncodedURIComponent(s);
        },

        compressed_length: function (s) {
          return s.length;
        },

        uncompress: function (s) {
          return LZString.decompressFromEncodedURIComponent(s);
        }
      }
    }
  };

  private snapshotViewDuration: number = this.options.duration;

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: SysosLibServiceInjectorService) {

    loadPako loadLzString

    this.MonitorService = this.serviceInjector.get('SysosAppMonitorService');
    this.NETDATA = this.MonitorService.getNetdata();
  }

  ngOnInit() {
    let start_ms = Math.round(Date.now() - this.snapshotViewDuration * 1000);

    if (this.NETDATA.globalPanAndZoom.isActive() === true) {
      this.snapshotViewDuration = Math.round((this.NETDATA.globalPanAndZoom.force_before_ms - this.NETDATA.globalPanAndZoom.force_after_ms) / 1000);
      start_ms = this.NETDATA.globalPanAndZoom.force_after_ms;
    }

    let start_date = new Date(start_ms);
    let yyyymmddhhssmm = start_date.getFullYear() + this.NETDATA.zeropad(start_date.getMonth() + 1) + this.NETDATA.zeropad(start_date.getDate()) + '-' + this.NETDATA.zeropad(start_date.getHours()) + this.NETDATA.zeropad(start_date.getMinutes()) + this.NETDATA.zeropad(start_date.getSeconds());

    this.snapshotName = 'netdata-' + this.options.hostname.toString() + '-' + yyyymmddhhssmm.toString() + '-' + this.snapshotViewDuration.toString() + '.snapshot';
    this.compressionType = this.snapshotOptions.compressionDefault;

    this.slider = {
      min: this.options.update_every,
      max: Math.round(this.snapshotViewDuration / 100),
      step: this.options.update_every,
      displayWith: (value) => {
        let seconds = ' seconds ';
        if (value === 1) seconds = ' second ';

        return value + seconds + 'per point' + ((value === this.options.data.update_every) ? ', server default' : '').toString();
      },
      value: 1,
    };

    if (this.NETDATA.globalPanAndZoom.isActive() === false) this.slider.max = Math.round(this.snapshotViewDuration / 50);

    if (this.slider.max < 10) this.slider.max = 10;
    if (this.slider.max < this.slider.min) this.slider.max = this.slider.min;

  }

  private jsonStringifyFn(obj) {
    return JSON.stringify(obj, function (key, value) {
      return (typeof value === 'function') ? value.toString() : value;
    });
  }

  snapshotExpectedSize() {
    let points = Math.round(this.snapshotViewDuration / this.slider.value);
    let priority = 'info';
    let msg = 'A moderate snapshot.';

    let sizemb = Math.round(
      (this.options.data.charts_count * this.snapshotOptions.bytes_per_chart
        + this.options.data.dimensions_count * points * this.snapshotOptions.compressions[this.compressionType].bytes_per_point_disk)
      * 10 / 1024 / 1024) / 10;

    let memmb = Math.round(
      (this.options.data.charts_count * this.snapshotOptions.bytes_per_chart
        + this.options.data.dimensions_count * points * this.snapshotOptions.compressions[this.compressionType].bytes_per_point_memory)
      * 10 / 1024 / 1024) / 10;

    if (sizemb < 10) {
      priority = 'success';
      msg = 'A nice small snapshot!';
    }
    if (sizemb > 50) {
      priority = 'warning';
      msg = 'Will stress your browser...';
    }
    if (sizemb > 100) {
      priority = 'danger';
      msg = 'Hm... good luck...';
    }

    return [priority, 'The snapshot will have ' + points.toString() + ' points per dimension. Expected size on disk ' + sizemb + ' MB, at browser memory ' + memmb + ' MB.<br/>' + msg];
  }

  saveSnapshot() {
    this.progressText = 'Generating snapshot as <code>this.snapshotName</code>';
    this.showProgress = true;

    let save_options = {
      stop_updates_when_focus_is_lost: false,
      update_only_visible: false,
      sync_selection: false,
      eliminate_zero_dimensions: true,
      pan_and_zoom_data_padding: false,
      show_help: false,
      legend_toolbox: false,
      resize_charts: false,
      pixels_per_point: 1
    };

    for (let x in save_options) {
      if (save_options.hasOwnProperty(x)) {
        this.backedupOptions[x] = this.NETDATA.options.current[x];
        this.NETDATA.options.current[x] = save_options[x];
      }
    }

    this.options.data.charts_by_name = null;

    this.saveData = {
      hostname: this.options.hostname,
      server: this.NETDATA.serverDefault,
      netdata_version: this.options.data.version,
      snapshot_version: 1,
      after_ms: Date.now() - this.options.duration * 1000,
      before_ms: Date.now(),
      highlight_after_ms: urlOptions.highlight_after,
      highlight_before_ms: urlOptions.highlight_before,
      duration_ms: this.options.duration * 1000,
      update_every_ms: this.options.update_every * 1000,
      data_points: 0,
      url: document.location.origin + document.location.pathname + document.location.search,
      comments: this.snapshotComment,
      hash: urlOptions.hash,
      charts: this.options.data,
      info: this.jsonStringifyFn({
        menu: netdataDashboard.menu,
        submenu: netdataDashboard.submenu,
        context: netdataDashboard.context
      }),
      charts_ok: 0,
      charts_failed: 0,
      compression: this.compressionType,
      data_size: 0,
      data: {}
    };

    if (this.NETDATA.globalPanAndZoom.isActive() === false) {
      this.NETDATA.globalPanAndZoom.setMaster(this.NETDATA.options.targets[0], this.saveData.after_ms, this.saveData.before_ms);
      this.clearPanAndZoom = true;
    }

    this.saveData.after_ms = this.NETDATA.globalPanAndZoom.force_after_ms;
    this.saveData.before_ms = this.NETDATA.globalPanAndZoom.force_before_ms;
    this.saveData.duration_ms = this.saveData.before_ms - this.saveData.after_ms;
    this.saveData.data_points = Math.round((this.saveData.before_ms - this.saveData.after_ms) / (this.slider.value * 1000));

    this.progressText = 'Generating snapshot with ' + this.saveData.data_points + ' data points per dimension...';

    this.NETDATA.globalSelectionSync.stop();
    this.NETDATA.options.force_data_points = this.saveData.data_points;
    this.NETDATA.options.fake_chart_rendering = true;
    this.NETDATA.onscroll_updater_enabled = false;
    this.NETDATA.abortAllRefreshes();

    this.updateChart(this.NETDATA.options.targets.length);
  }

  private updateChart(idx) {
    let charts_count = 0;
    let charts_ok = 0;
    let charts_failed = 0;
    let size = 0;
    let info = ' Resolution: <b>' + this.slider.value + ((this.slider.value === 1) ? ' second ' : ' seconds ') + 'per point</b>.';

    if (this.saveSnapshotStop === true) {
      this.progressText = 'Cancelled!';
      this.saveSnapshotRestore();
      return;
    }

    let state = this.NETDATA.options.targets[--idx];

    this.progressPcent = (this.NETDATA.options.targets.length - idx) * 100 / this.NETDATA.options.targets.length;
    this.progressCurrentId = state.id;

    setTimeout(() => {
      charts_count++;
      state.isVisible(true);
      state.current.force_after_ms = this.saveData.after_ms;
      state.current.force_before_ms = this.saveData.before_ms;

      state.updateChart((status, reason) => {
        state.current.force_after_ms = null;
        state.current.force_before_ms = null;

        if (status === true) {
          charts_ok++;
          size += this.pack_api1_v1_chart_data(state);
        } else {
          charts_failed++;
          state.log('failed to be updated: ' + reason);
        }

        if (charts_failed) this.progressType = 'danger';
        this.progressText  = 'Generated snapshot data size <b>' + (Math.round(size * 100 / 1024 / 1024) / 100) + ' MB</b>. ' + ((charts_failed) ? (charts_failed + ' charts have failed to be downloaded') : '') + info;

        if (idx > 0) {
          this.updateChart(idx);
        } else {
          this.saveData.charts_ok = charts_ok;
          this.saveData.charts_failed = charts_failed;
          this.saveData.data_size = size;

          this.saveObjectToClient(this.saveData, this.snapshotName);

          if (charts_failed > 0) alert(charts_failed.toString() + ' failed to be downloaded');

          this.saveSnapshotRestore();
          this.saveData = null;
        }
      })
    }, 0);
  }

  private pack_api1_v1_chart_data(state) {
    if (state.library_name === null || state.data === null) return;

    let compress = this.snapshotOptions.compressions[this.compressionType].compress;
    let compressed_length = this.snapshotOptions.compressions[this.compressionType].compressed_length;

    let data = state.data;
    state.data = null;
    data.state = null;
    let str = JSON.stringify(data);

    if (typeof str === 'string') {
      let cstr = compress(str);
      this.saveData.data[state.chartDataUniqueID()] = cstr;
      return compressed_length(cstr);
    } else {
      return 0;
    }
  }

  private saveSnapshotRestore() {

    // restore the options
    for (let x in this.backedupOptions) {
      if (this.backedupOptions.hasOwnProperty(x)) {
        this.NETDATA.options.current[x] = this.backedupOptions[x];
      }
    }

    if (this.clearPanAndZoom) this.NETDATA.globalPanAndZoom.clearMaster();

    this.NETDATA.options.force_data_points = 0;
    this.NETDATA.options.fake_chart_rendering = false;
    this.NETDATA.onscroll_updater_enabled = true;
    this.NETDATA.onresize();
    this.NETDATA.unpause();

    this.activeModal.close();
  }

  private saveObjectToClient(data, filename) {
    // TODO saveTextToClient(JSON.stringify(data), filename);
  }

  cancelSnapshot() {
    this.saveSnapshotStop = true;
    this.activeModal.close();
  }

}

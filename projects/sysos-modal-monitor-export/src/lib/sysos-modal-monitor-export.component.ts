import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibFileSystemService} from '@sysos/lib-file-system';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'smme-sysos-modal-monitor-export',
  templateUrl: './sysos-modal-monitor-export.component.html',
  styleUrls: ['./sysos-modal-monitor-export.component.scss']
})
export class SysosModalMonitorExportComponent implements OnInit {
  @Input() connection: any;

  private NETDATA;
  private snapshotOptions;
  private netdataDashboard;
  private options;

  private saveSnapshotStop: boolean = false;
  private saveData;
  private backedupOptions = {};
  private clearPanAndZoom: boolean = false;

  private totalSnapshotSize: number = 0;
  private chartsCount: number = 0;
  private chartsOk: number = 0;
  private chartsFailed: number = 0;

  saveAt: 'anyopsos' | 'download' = 'anyopsos';
  filename = new FormControl('', [Validators.required]);

  progressText: string;
  progressType: string = 'info';
  progressCurrentId: string;
  progressPcent: number = 0;
  showProgress: boolean = false;
  snapshotName: string;
  snapshotComment: string;
  compressionType: string;
  slider;

  constructor(public activeModal: NgbActiveModal,
              private FileSystem: SysosLibFileSystemService) {
  }

  ngOnInit() {

    // https://github.com/anyOpsOS/anyOpsOS/issues/3
    setTimeout(() => {
      this.NETDATA = this.connection.NETDATA;
      this.options = this.connection.options;
      this.snapshotOptions = this.connection.snapshotOptions;
      this.netdataDashboard = this.connection.netdataDashboard;

      let startMs = Math.round(Date.now() - this.options.duration * 1000);

      if (this.NETDATA.globalPanAndZoom.isActive() === true) {
        this.options.duration = Math.round((this.NETDATA.globalPanAndZoom.force_before_ms - this.NETDATA.globalPanAndZoom.force_after_ms) / 1000);
        startMs = this.NETDATA.globalPanAndZoom.force_after_ms;
      }

      const startDate = new Date(startMs);
      const yyyymmddhhssmm = startDate.getFullYear() + this.NETDATA.zeropad(startDate.getMonth() + 1) + this.NETDATA.zeropad(startDate.getDate()) + '-' + this.NETDATA.zeropad(startDate.getHours()) + this.NETDATA.zeropad(startDate.getMinutes()) + this.NETDATA.zeropad(startDate.getSeconds());

      this.snapshotName = 'netdata-' + this.options.hostname.toString() + '-' + yyyymmddhhssmm.toString() + '-' + this.options.duration.toString() + '.snapshot';
      this.compressionType = this.snapshotOptions.compressionDefault;

      this.slider = {
        min: this.options.update_every,
        max: Math.round(this.options.duration / 100),
        step: this.options.update_every,
        displayWith: (value) => {
          let seconds = ' seconds ';
          if (value === 1) seconds = ' second ';

          return value + seconds + 'per point' + ((value === this.options.data.update_every) ? ', server default' : '').toString();
        },
        value: 1,
      };

      if (this.NETDATA.globalPanAndZoom.isActive() === false) this.slider.max = Math.round(this.options.duration / 50);

      if (this.slider.max < 10) this.slider.max = 10;
      if (this.slider.max < this.slider.min) this.slider.max = this.slider.min;
    }, 0);
  }

  private jsonStringifyFn(obj) {
    return JSON.stringify(obj, (key, value) => {
      return (typeof value === 'function') ? value.toString() : value;
    });
  }

  snapshotExpectedSize() {
    if (!this.options) return ['info', 'Loading Snapshot data.'];
    const points = Math.round(this.options.duration / this.slider.value);
    let priority = 'info';
    let msg = 'A moderate snapshot.';

    const sizemb = Math.round(
      (this.options.data.charts_count * this.snapshotOptions.bytes_per_chart
        + this.options.data.dimensions_count * points * this.snapshotOptions.compressions[this.compressionType].bytes_per_point_disk)
      * 10 / 1024 / 1024) / 10;

    const memmb = Math.round(
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

    const saveOptions = {
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

    for (const x in saveOptions) {
      if (saveOptions.hasOwnProperty(x)) {
        this.backedupOptions[x] = this.NETDATA.options.current[x];
        this.NETDATA.options.current[x] = saveOptions[x];
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
      highlight_after_ms: 0, // urlOptions.highlight_after,
      highlight_before_ms: 0, // urlOptions.highlight_before,
      duration_ms: this.options.duration * 1000,
      update_every_ms: this.options.update_every * 1000,
      data_points: 0,
      url: document.location.origin + document.location.pathname + document.location.search,
      comments: this.snapshotComment,
      hash: null, // urlOptions.hash,
      charts: this.options.data,
      info: this.jsonStringifyFn({
        menu: this.netdataDashboard.menu,
        submenu: this.netdataDashboard.submenu,
        context: this.netdataDashboard.context
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
    const info = ' Resolution: <b>' + this.slider.value + ((this.slider.value === 1) ? ' second ' : ' seconds ') + 'per point</b>.';

    if (this.saveSnapshotStop === true) {
      this.progressText = 'Cancelled!';
      this.saveSnapshotRestore();
      return;
    }

    const state = this.NETDATA.options.targets[--idx];

    this.progressPcent = (this.NETDATA.options.targets.length - idx) * 100 / this.NETDATA.options.targets.length;
    this.progressCurrentId = state.id;

    setTimeout(() => {
      this.chartsCount++;
      state.isVisible(true);
      state.current.force_after_ms = this.saveData.after_ms;
      state.current.force_before_ms = this.saveData.before_ms;

      state.updateChart((status, reason) => {
        state.current.force_after_ms = null;
        state.current.force_before_ms = null;

        if (status === true) {
          this.chartsOk++;
          this.totalSnapshotSize += this.pack_api1_v1_chart_data(state);
        } else {
          this.chartsFailed++;
          state.log('failed to be updated: ' + reason);
        }

        if (this.chartsFailed) this.progressType = 'danger';
        this.progressText  = 'Current chart: ' + this.progressCurrentId + '. Generated snapshot data size <b>' + (Math.round(this.totalSnapshotSize * 100 / 1024 / 1024) / 100) + ' MB</b>. ' + ((this.chartsFailed) ? (this.chartsFailed + ' charts have failed to be downloaded') : '') + info;

        if (idx > 0) {
          this.updateChart(idx);
        } else {
          this.saveData.charts_ok = this.chartsOk;
          this.saveData.charts_failed = this.chartsFailed;
          this.saveData.data_size = this.totalSnapshotSize;

          this.saveObjectToClient(this.saveData, this.snapshotName);

          if (this.chartsFailed > 0) alert(this.chartsFailed + ' failed to be downloaded');

          this.saveSnapshotRestore();
          this.saveData = null;
        }
      });
    }, 0);
  }

  private pack_api1_v1_chart_data(state) {
    if (state.library_name === null || state.data === null) return;

    const compress = this.snapshotOptions.compressions[this.compressionType].compress;
    const compressed_length = this.snapshotOptions.compressions[this.compressionType].compressed_length;

    const data = state.data;
    state.data = null;
    data.state = null;
    const str = JSON.stringify(data);

    if (typeof str === 'string') {
      const cstr = compress(str);
      this.saveData.data[state.chartDataUniqueID()] = cstr;
      return compressed_length(cstr);
    } else {
      return 0;
    }
  }

  private saveSnapshotRestore() {

    // restore the options
    for (const x in this.backedupOptions) {
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
    let blob;

    if (this.saveAt === 'download') {
      blob = new Blob([JSON.stringify(data)], {
        type: 'application/octet-stream'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);

      const el = document.getElementById('hiddenDownloadLinks');
      el.innerHTML = '';
      el.appendChild(link);

      setTimeout(() => {
        el.removeChild(link);
        URL.revokeObjectURL(url);
      }, 60);

      link.click();
    }

    if (this.saveAt === 'anyopsos') {
      blob = new Blob([JSON.stringify(data)]);
      const file: File = new File([blob], filename);

      // Upload file to Downloads folder
      return this.FileSystem.uploadFile('/home/root/Downloads/', file);
    }

  }

  cancelSnapshot() {
    this.saveSnapshotStop = true;
    this.activeModal.close();
  }

}

import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';
import {ConnectionMonitor} from '@anyopsos/module-monitor';

@Component({
  selector: 'ammonitor-options-anyopsos-modal-monitor-options',
  templateUrl: './anyopsos-modal-monitor-options.component.html',
  styleUrls: ['./anyopsos-modal-monitor-options.component.scss']
})
export class AnyOpsOSModalMonitorOptionsComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  connection: ConnectionMonitor;

  private NETDATA;

  stopUpdatesWhenFocusIsLost: boolean;
  eliminateZeroDimensions: boolean;
  destroyOnHide: boolean;
  asyncOnScroll: boolean;

  parallelRefresher: boolean;
  concurrentRefreshes: boolean;
  syncSelection: boolean;
  syncPanAndZoom: boolean;

  netdataThemeControl: boolean;
  showHelp: boolean;
  panAndZoomDataPadding: boolean;
  smoothPlot: boolean;

  unitsConversion: boolean;
  unitsTemp: boolean;
  secondsAsTime: boolean;
  localTimezone: boolean;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalMonitorOptionsComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.connection = data.connection;

    this.NETDATA = this.connection.NETDATA;

    this.stopUpdatesWhenFocusIsLost = this.NETDATA.getOption('stop_updates_when_focus_is_lost');
    this.eliminateZeroDimensions = this.NETDATA.getOption('eliminate_zero_dimensions');
    this.destroyOnHide = this.NETDATA.getOption('destroy_on_hide');
    this.asyncOnScroll = this.NETDATA.getOption('async_on_scroll');

    this.parallelRefresher = this.NETDATA.getOption('parallel_refresher');
    this.concurrentRefreshes = this.NETDATA.getOption('concurrent_refreshes');
    this.syncSelection = this.NETDATA.getOption('sync_selection');
    this.syncPanAndZoom = this.NETDATA.getOption('sync_pan_and_zoom');

    this.netdataThemeControl = this.NETDATA.netdataTheme === 'slate';
    this.showHelp = this.NETDATA.getOption('show_help');
    this.panAndZoomDataPadding = this.NETDATA.getOption('pan_and_zoom_data_padding');
    this.smoothPlot = this.NETDATA.getOption('smooth_plot');

    this.unitsConversion = this.NETDATA.getOption('units') === 'auto';
    this.unitsTemp = this.NETDATA.getOption('temperature') === 'celsius';
    this.secondsAsTime = this.NETDATA.getOption('seconds_as_time');
    this.localTimezone = !this.NETDATA.dateTime.using_timezone;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title ?? 'Monitor Options';
    this.modalBody.type = this.data.type;
  }

  optionChanged(option, state) {
    console.log(option, state);
    if (option === 'theme') {
      return localStorage.setItem('netdataTheme', state.toString());
    }

    if (option === 'local_timezone') {
      if (state === true) {
        return this.NETDATA.selected_server_timezone('default', true);
      } else {
        return this.NETDATA.selected_server_timezone('default', false);
      }
    }

    this.NETDATA.setOption(option, state);
  }

}

import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'smmo-anyopsos-modal-monitor-options',
  templateUrl: './anyopsos-modal-monitor-options.component.html',
  styleUrls: ['./anyopsos-modal-monitor-options.component.scss']
})
export class AnyOpsOSModalMonitorOptionsComponent implements OnInit {
  @Input() connection: any;

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

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {

    // https://github.com/anyOpsOS/anyOpsOS/issues/3
    setTimeout(() => {
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
    }, 0);
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

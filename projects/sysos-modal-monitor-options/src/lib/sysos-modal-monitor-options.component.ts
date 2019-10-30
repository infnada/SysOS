import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'smmo-sysos-modal-monitor-options',
  templateUrl: './sysos-modal-monitor-options.component.html',
  styleUrls: ['./sysos-modal-monitor-options.component.scss']
})
export class SysosModalMonitorOptionsComponent implements OnInit {
  @Input() connection: any;

  private NETDATA;

  stop_updates_when_focus_is_lost: boolean;
  eliminate_zero_dimensions: boolean;
  destroy_on_hide: boolean;
  async_on_scroll: boolean;

  parallel_refresher: boolean;
  concurrent_refreshes: boolean;
  sync_selection: boolean;
  sync_pan_and_zoom: boolean;

  netdata_theme_control: boolean;
  show_help: boolean;
  pan_and_zoom_data_padding: boolean;
  smooth_plot: boolean;

  units_conversion: boolean;
  units_temp: boolean;
  seconds_as_time: boolean;
  local_timezone: boolean;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    // https://github.com/anyOpsOS/anyOpsOS/issues/3
    setTimeout(() => {
      this.NETDATA = this.connection.NETDATA;

      this.stop_updates_when_focus_is_lost = this.NETDATA.getOption('stop_updates_when_focus_is_lost');
      this.eliminate_zero_dimensions = this.NETDATA.getOption('eliminate_zero_dimensions');
      this.destroy_on_hide = this.NETDATA.getOption('destroy_on_hide');
      this.async_on_scroll = this.NETDATA.getOption('async_on_scroll');

      this.parallel_refresher = this.NETDATA.getOption('parallel_refresher');
      this.concurrent_refreshes = this.NETDATA.getOption('concurrent_refreshes');
      this.sync_selection = this.NETDATA.getOption('sync_selection');
      this.sync_pan_and_zoom = this.NETDATA.getOption('sync_pan_and_zoom');

      this.netdata_theme_control = this.NETDATA.netdataTheme === 'slate';
      this.show_help = this.NETDATA.getOption('show_help');
      this.pan_and_zoom_data_padding = this.NETDATA.getOption('pan_and_zoom_data_padding');
      this.smooth_plot = this.NETDATA.getOption('smooth_plot');

      this.units_conversion = this.NETDATA.getOption('units') === 'auto';
      this.units_temp = this.NETDATA.getOption('temperature') === 'celsius';
      this.seconds_as_time = this.NETDATA.getOption('seconds_as_time');
      this.local_timezone = !this.NETDATA.dateTime.using_timezone;
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

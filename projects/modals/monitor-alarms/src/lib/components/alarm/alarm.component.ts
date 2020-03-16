import {Component, Input, OnInit} from '@angular/core';

import {MatDialogRef} from '@anyopsos/lib-angular-material';

import {AnyOpsOSModalMonitorAlarmsComponent} from '../../anyopsos-modal-monitor-alarms.component';

@Component({
  selector: 'ammonitor-alarms-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {
  @Input() NETDATA;
  @Input() options;
  @Input() alarm;

  constructor(private readonly dialogRef: MatDialogRef<AnyOpsOSModalMonitorAlarmsComponent>) {
  }

  ngOnInit() {
  }

  getDelay(alarm) {
    let delay = '';
    if ((alarm.delay_up_duration > 0 || alarm.delay_down_duration > 0) && alarm.delay_multiplier !== 0 && alarm.delay_max_duration > 0) {
      if (alarm.delay_up_duration === alarm.delay_down_duration) {
        delay += '<small><br/>hysteresis ' + this.NETDATA.seconds4human(alarm.delay_up_duration, {
          space: '&nbsp;',
          negative_suffix: ''
        });
      } else {
        delay = '<small><br/>hysteresis ';
        if (alarm.delay_up_duration > 0) {
          delay += 'on escalation <code>' + this.NETDATA.seconds4human(alarm.delay_up_duration, {
            space: '&nbsp;',
            negative_suffix: ''
          }) + '</code>, ';
        }
        if (alarm.delay_down_duration > 0) {
          delay += 'on recovery <code>' + this.NETDATA.seconds4human(alarm.delay_down_duration, {
            space: '&nbsp;',
            negative_suffix: ''
          }) + '</code>, ';
        }
      }
      if (alarm.delay_multiplier !== 1.0) {
        delay += 'multiplied by <code>' + alarm.delay_multiplier.toString() + '</code>';
        delay += ', up to <code>' + this.NETDATA.seconds4human(alarm.delay_max_duration, {
          space: '&nbsp;',
          negative_suffix: ''
        }) + '</code>';
      }
      delay += '</small>';
    }

    return delay;
  }

  alarmLookupExplain(alarm) {
    const chart = this.options.data.charts[alarm.chart];
    let dimensions = ' of all values ';

    if (chart.dimensions.length > 1) dimensions = ' of the sum of all dimensions ';

    if (typeof alarm.lookup_dimensions !== 'undefined') {
      const d = alarm.lookup_dimensions.replace(/|/g, ',');
      const x = d.split(',');

      if (x.length > 1) {
        dimensions = `of the sum of dimensions <code>${alarm.lookup_dimensions}</code> `;
      } else {
        dimensions = `of all values of dimension <code>${alarm.lookup_dimensions}</code> `;
      }
    }

    // tslint:disable-next-line:max-line-length
    return `<code>${alarm.lookup_method}</code> ${dimensions}, of chart <code>${alarm.chart}</code>, starting <code>${this.NETDATA.seconds4human(alarm.lookup_after + alarm.lookup_before, {space: '&nbsp;'})}</code> and up to <code>${this.NETDATA.seconds4human(alarm.lookup_before, {space: '&nbsp;'})}</code>${(alarm.lookup_options) ? (', with options <code>' + alarm.lookup_options.replace(/ /g, ',&nbsp;') + '</code>') : ''}.`;
  }

  scrollToChartAfterHidingModal(alarm) {
    const chart = alarm.chart;
    const alarmDate = alarm.last_status_change * 1000;
    const alarmStatus = alarm.status;

    this.NETDATA.alarms.scrollToChart(chart, alarmDate);

    if (['WARNING', 'CRITICAL'].includes(alarmStatus)) {
      const currentChartState = this.NETDATA.options.targets.find(
        (chartState) => chartState.id === chart,
      );
      const twoMinutes = 2 * 60 * 1000;
      this.NETDATA.globalPanAndZoom.setMaster(
        currentChartState,
        alarmDate - twoMinutes,
        alarmDate + twoMinutes,
      );
    }

    this.dialogRef.close();
  }

  clipboardCopy(alarm) {
    // TODO clipboard copy => this.NETDATA.alarms.server + '/api/v1/badge.svg?chart=' + alarm.chart + '&alarm=' + alarm.name + '&refresh=auto';
  }

  clipboardCopyBadgeEmbed(alarm) {
    const url = this.NETDATA.alarms.server + '/api/v1/badge.svg?chart=' + alarm.chart + '&alarm=' + alarm.name + '&refresh=auto';
    // TODO clipboard copy => '<embed src="' + url + '" type="image/svg+xml" height="20"/>'
  }

}

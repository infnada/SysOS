import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';
import {ConnectionMonitor} from '@anyopsos/module-monitor';

@Component({
  selector: 'ammonitor-alarms-anyopsos-modal-monitor-alarms',
  templateUrl: './anyopsos-modal-monitor-alarms.component.html',
  styleUrls: ['./anyopsos-modal-monitor-alarms.component.scss']
})
export class AnyOpsOSModalMonitorAlarmsComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  connection: ConnectionMonitor;

  NETDATA;

  options;
  families = [];
  activeAlarms = [];

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalMonitorAlarmsComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.connection = data.connection;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title ?? 'Monitor Alarms';
    this.modalBody.type = this.data.type;

    this.NETDATA = this.connection.NETDATA;
    this.options = this.connection.options;

    this.NETDATA.alarms.get('all', (data) => {

      let chart;
      let family;
      let alarm;

      Object.keys(data.alarms).forEach((e) => {
        alarm = data.alarms[e];
        family = alarm.family;

        chart = this.options.data.charts[alarm.chart];
        if (typeof chart === 'undefined') chart = this.options.data.charts_by_name[alarm.chart];
        if (typeof chart.menu !== 'undefined' && typeof chart.submenu !== 'undefined') family = chart.menu + ' - ' + chart.submenu;

        const current = this.families.find(obj => {
          return obj.name === family;
        });

        if (!current) {
          this.families.push({
            name: family,
            arr: [alarm],
            priority: chart.priority
          });
        } else {
          if (chart.priority < current.priority) current.priority = chart.priority;

          current.arr.unshift(alarm);
        }

        if (alarm.status === 'WARNING' || alarm.status === 'CRITICAL') {
          this.activeAlarms.unshift(alarm);
        }
      });

      /* loadBootstrapTable(function () {
        $('#alarms_log_table').bootstrapTable({
          url: NETDATA.alarms.server + '/api/v1/alarm_log?all',
          cache: false,
          pagination: true,
          pageSize: 10,
          showPaginationSwitch: false,
          search: true,
          searchTimeOut: 300,
          searchAlign: 'left',
          showColumns: true,
          showExport: true,
          exportDataType: 'basic',
          exportOptions: {
            fileName: 'netdata_alarm_log'
          },
          onClickRow: function (row, $element,field) {
            void (field);
            void ($element);
            let main_url;
            let common_url = "&host=" + encodeURIComponent(row['hostname']) + "&chart=" + encodeURIComponent(row['chart']) + "&family=" + encodeURIComponent(row['family']) + "&alarm=" + encodeURIComponent(row['name']) +
            "&alarm_unique_id=" + row['unique_id'] + "&alarm_id=" + row['alarm_id'] + "&alarm_event_id=" +  row['alarm_event_id'] + "&alarm_when=" + row['when'];
            if (NETDATA.registry.isUsingGlobalRegistry() && NETDATA.registry.machine_guid != null) {
              main_url = "https://netdata.cloud/alarms/redirect?agentID=" + NETDATA.registry.machine_guid + common_url;
            } else {
              main_url = NETDATA.registry.server + "/goto-host-from-alarm.html?" + common_url ;
            }
            window.open(main_url,"_blank");
          },
          rowStyle: function (row, index) {
            void (index);
            switch (row.status) {
              case 'CRITICAL':
                return { classes: 'danger' };
                break;
              case 'WARNING':
                return { classes: 'warning' };
                break;
              case 'UNDEFINED':
                return { classes: 'info' };
                break;
              case 'CLEAR':
                return { classes: 'success' };
                break;
            }
            return {};
          },
          showFooter: false,
          showHeader: true,
          showRefresh: true,
          showToggle: false,
          sortable: true,
          silentSort: false,
          columns: [
            {
              field: 'when',
              title: 'Event Date',
              valign: 'middle',
              titleTooltip: 'The date and time the even took place',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return timestamp4human(value, ' ');
              },
              align: 'center',
              switchable: false,
              sortable: true
            },
            {
              field: 'hostname',
              title: 'Host',
              valign: 'middle',
              titleTooltip: 'The host that generated this event',
              align: 'center',
              visible: false,
              sortable: true
            },
            {
              field: 'unique_id',
              title: 'Unique ID',
              titleTooltip: 'The host unique ID for this event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return alarmid4human(value);
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'alarm_id',
              title: 'Alarm ID',
              titleTooltip: 'The ID of the alarm that generated this event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return alarmid4human(value);
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'alarm_event_id',
              title: 'Alarm Event ID',
              titleTooltip: 'The incremental ID of this event for the given alarm',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return alarmid4human(value);
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'chart',
              title: 'Chart',
              titleTooltip: 'The chart the alarm is attached to',
              align: 'center',
              valign: 'middle',
              switchable: false,
              sortable: true
            },
            {
              field: 'family',
              title: 'Family',
              titleTooltip: 'The family of the chart the alarm is attached to',
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'name',
              title: 'Alarm',
              titleTooltip: 'The alarm name that generated this event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return value.toString().replace(/_/g, ' ');
              },
              align: 'center',
              valign: 'middle',
              switchable: false,
              sortable: true
            },
            {
              field: 'value_string',
              title: 'Friendly Value',
              titleTooltip: 'The value of the alarm, that triggered this event',
              align: 'right',
              valign: 'middle',
              sortable: true
            },
            {
              field: 'old_value_string',
              title: 'Friendly Old Value',
              titleTooltip: 'The value of the alarm, just before this event',
              align: 'right',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'old_value',
              title: 'Old Value',
              titleTooltip: 'The value of the alarm, just before this event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return ((value !== null) ? Math.round(value * 100) / 100 : 'NaN').toString();
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'value',
              title: 'Value',
              titleTooltip: 'The value of the alarm, that triggered this event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return ((value !== null) ? Math.round(value * 100) / 100 : 'NaN').toString();
              },
              align: 'right',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'units',
              title: 'Units',
              titleTooltip: 'The units of the value of the alarm',
              align: 'left',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'old_status',
              title: 'Old Status',
              titleTooltip: 'The status of the alarm, just before this event',
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'status',
              title: 'Status',
              titleTooltip: 'The status of the alarm, that was set due to this event',
              align: 'center',
              valign: 'middle',
              switchable: false,
              sortable: true
            },
            {
              field: 'duration',
              title: 'Last Duration',
              titleTooltip: 'The duration the alarm was at its previous state, just before this event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return NETDATA.seconds4human(value, { negative_suffix: '', space: ' ', now: 'no time' });
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'non_clear_duration',
              title: 'Raised Duration',
              titleTooltip: 'The duration the alarm was raised, just before this event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return NETDATA.seconds4human(value, { negative_suffix: '', space: ' ', now: 'no time' });
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'recipient',
              title: 'Recipient',
              titleTooltip: 'The recipient of this event',
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'processed',
              title: 'Processed Status',
              titleTooltip: 'True when this event is processed',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                if (value === true) {
                  return 'DONE';
                } else {
                  return 'PENDING';
                }
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'updated',
              title: 'Updated Status',
              titleTooltip: 'True when this event has been updated by another event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                if (value === true) {
                  return 'UPDATED';
                } else {
                  return 'CURRENT';
                }
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'updated_by_id',
              title: 'Updated By ID',
              titleTooltip: 'The unique ID of the event that obsoleted this one',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return alarmid4human(value);
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'updates_id',
              title: 'Updates ID',
              titleTooltip: 'The unique ID of the event obsoleted because of this event',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return alarmid4human(value);
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'exec',
              title: 'Script',
              titleTooltip: 'The script to handle the event notification',
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'exec_run',
              title: 'Script Run At',
              titleTooltip: 'The date and time the script has been ran',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return timestamp4human(value, ' ');
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'exec_code',
              title: 'Script Return Value',
              titleTooltip: 'The return code of the script',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                if (value === 0) {
                  return 'OK (returned 0)';
                } else {
                  return 'FAILED (with code ' + value.toString() + ')';
                }
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'delay',
              title: 'Script Delay',
              titleTooltip: 'The hysteresis of the notification',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return NETDATA.seconds4human(value, { negative_suffix: '', space: ' ', now: 'no time' });
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'delay_up_to_timestamp',
              title: 'Script Delay Run At',
              titleTooltip: 'The date and time the script should be run, after hysteresis',
              formatter: function (value, row, index) {
                void (row);
                void (index);
                return timestamp4human(value, ' ');
              },
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'info',
              title: 'Description',
              titleTooltip: 'A short description of the alarm',
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            },
            {
              field: 'source',
              title: 'Alarm Source',
              titleTooltip: 'The source of configuration of the alarm',
              align: 'center',
              valign: 'middle',
              visible: false,
              sortable: true
            }
          ]
        });
        // console.log($('#alarms_log_table').bootstrapTable('getOptions'));
      });*/
    });
  }

}

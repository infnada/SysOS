import {Component, OnInit} from '@angular/core';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosAppMonitorService} from '../services/sysos-app-monitor.service';
import {Netdata} from '../types/netdata';

@Component({
  selector: 'samon-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  activeConnection: null;

  private NETDATA;

  constructor(private Modal: SysosLibModalService,
              private Monitor: SysosAppMonitorService) {

  }

  ngOnInit() {
    this.Monitor.activeConnection.subscribe(connection => this.activeConnection = connection);
  }

  getActiveConnection(): Netdata {
    return this.Monitor.getActiveConnection();
  }

  openOptionsModal() {
    this.NETDATA = this.Monitor.getNetdata();
    if (this.NETDATA) this.NETDATA.pause(() => {});
    this.Modal.openRegisteredModal('monitor-options', '.window--monitor .window__main', {}).then((modalInstance) => {
      modalInstance.result.then(() => {
        this.NETDATA.unpause();
      });
    });
  }

  openAlarmsModal() {
    if (this.activeConnection === null || this.getActiveConnection().snapshotData) return;

    this.NETDATA = this.Monitor.getNetdata();
    this.NETDATA.pause(() => {});
    this.Modal.openRegisteredModal('monitor-alarms', '.window--monitor .window__main', {}).then((modalInstance) => {
      modalInstance.result.then(() => {
        this.NETDATA.unpause();
      });
    });
  }

  openImportModal() {
    this.NETDATA = this.Monitor.getNetdata();
    if (this.NETDATA) this.NETDATA.pause(() => {});
    this.Modal.openRegisteredModal('monitor-import', '.window--monitor .window__main', {}).then((modalInstance) => {
      modalInstance.result.then(() => {
        this.NETDATA.unpause();
      });
    });
  }

  openExportModal() {
    if (this.activeConnection === null) return;

    this.NETDATA = this.Monitor.getNetdata();
    if (this.NETDATA) this.NETDATA.pause(() => {});
    this.Modal.openRegisteredModal('monitor-export', '.window--monitor .window__main', {}).then((modalInstance) => {
      modalInstance.result.then(() => {
        this.NETDATA.unpause();
      });
    });
  }

  openHelpModal() {
    this.NETDATA = this.Monitor.getNetdata();
    if (this.NETDATA) this.NETDATA.pause(() => {});
    this.Modal.openRegisteredModal('monitor-help', '.window--monitor .window__main', {}).then((modalInstance) => {
      modalInstance.result.then(() => {
        if (this.NETDATA) this.NETDATA.unpause();
      });
    });
  }

  newConnection() {
    if (this.activeConnection === null) return;

    this.Monitor.setActiveConnection(null);
  }

  editConnection() {
    if (this.activeConnection === null) return;

    this.Monitor.editConnection();
  }

  disconnectConnection() {
    if (this.activeConnection === null) return;

    this.Monitor.disconnectConnection();
  }

  deleteConnection() {
    if (this.activeConnection === null) return;

    this.Monitor.deleteConnection();
  }
}

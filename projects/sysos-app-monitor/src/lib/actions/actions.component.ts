import {Component, OnInit} from '@angular/core';

import {SysosLibModalService} from "@sysos/lib-modal";

import {SysosAppMonitorService} from "../services/sysos-app-monitor.service";
import {Netdata} from "../types/netdata";

@Component({
  selector: 'samon-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  activeConnection: null;

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
    this.Modal.openRegisteredModal('monitor-options', '.window--monitor .window__main', {}).then((modalInstance) => {
      modalInstance.result.then((selectedData) => {


      });
    });
  }

  newConnection() {

  }

  editConnection() {

  }

  disconnectConnection() {

  }

  deleteConnection() {

  }
}

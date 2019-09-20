import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';

import {SysosAppMonitorService} from "../services/sysos-app-monitor.service";
import {Netdata} from "../types/netdata";

@Component({
  selector: 'samon-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;
  viewSide: boolean = true;

  connections: Netdata[];

  constructor(private Monitor: SysosAppMonitorService) {
  }

  ngOnInit() {
    this.Monitor.connections.subscribe(connections => this.connections = connections);
    this.Monitor.activeConnection.subscribe(connection => this.activeConnection = connection);
  }

  getActiveConnection(): Netdata {
    return this.Monitor.getActiveConnection();
  }

  setActiveConnection(connection: Netdata): void {
    this.Monitor.setActiveConnection(connection.uuid);
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }
}

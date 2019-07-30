import {Component, Input, OnInit} from '@angular/core';

import {Application} from "@sysos/lib-application";

import {SysosAppInfrastructureManagerService} from "../services/sysos-app-infrastructure-manager.service";
import {IMConnection} from "../types/imconnection";

@Component({
  selector: 'saim-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService) {
  }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.subscribe(activeConnection => this.activeConnection = activeConnection);
  }

  getActiveConnection(): IMConnection {
    return this.InfrastructureManager.getActiveConnection();
  }

}

import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';
import {SysosAppInfrastructureManagerService} from "../services/sysos-app-infrastructure-manager.service";

@Component({
  selector: 'saim-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService) {
    this.InfrastructureManager.activeConnection.subscribe(connection => this.activeConnection = connection);
  }

  ngOnInit() {
  }

  newConnection(): void {
    if (this.activeConnection === null) return;

    this.InfrastructureManager.setActiveConnection(null);
  }

  editConnection(): void {
    if (this.activeConnection === null) return;

    this.InfrastructureManager.editConnection();
  }

  disconnectConnection(): void {
    if (this.activeConnection === null) return;

    this.InfrastructureManager.disconnectConnection();
  }

  deleteConnection(): void {
    if (this.activeConnection === null) return;

    this.InfrastructureManager.deleteConnection();
  }

  // TODO
  configureConnection(): void {

  }
  remoteRefresh(): void {

  }
  openWithApp(applicationId: string): void {

  }
  runHIDS(): void {

  }

}

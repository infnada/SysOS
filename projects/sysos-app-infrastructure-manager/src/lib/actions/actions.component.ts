import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

import {Application} from '@sysos/lib-application';

import {SysosAppInfrastructureManagerService} from '../services/sysos-app-infrastructure-manager.service';

@Component({
  selector: 'saim-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  activeConnection: string;

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService) {
    this.InfrastructureManager.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
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

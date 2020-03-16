import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSExtLibNetdataService} from '@anyopsos/ext-lib-netdata';
import {ConnectionMonitor} from '@anyopsos/module-monitor';

import {AnyOpsOSAppMonitorService} from '../services/anyopsos-app-monitor.service';

@Component({
  selector: 'aamon-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private NETDATA;

  activeConnectionUuid: string;
  activeConnection: ConnectionMonitor;
  connection;

  constructor(private readonly LibModal: AnyOpsOSLibModalService,
              private readonly Utils: AnyOpsOSLibUtilsService,
              private readonly Monitor: AnyOpsOSAppMonitorService,
              private readonly Netdata: AnyOpsOSExtLibNetdataService) {
  }

  ngOnInit(): void {

    // Listen for connections changes
    this.Netdata.connections
      .pipe(takeUntil(this.destroySubject$)).subscribe(connections => this.connection = connections[this.activeConnectionUuid]);

    // Listen for activeConnectionUuid change
    this.Monitor.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnectionUuid = activeConnectionUuid);

    // Listen for activeConnection change
    this.Monitor.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: ConnectionMonitor) => this.activeConnection = activeConnection);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnection(): ConnectionMonitor {
    return this.Monitor.getActiveConnection();
  }

  goHome(): void {
    if (this.activeConnectionUuid === null || this.getActiveConnection().state === 'disconnected') this.Utils.scrollTo('monitor_main-body');
    if (this.activeConnectionUuid === null) return;

    this.Monitor.setActiveConnectionUuid(null);
  }

  newConnection(): void {
    if (this.activeConnectionUuid === null) return this.Utils.scrollTo('monitor_main-body', true);

    // even if activeConnection === null, set it again to reset possible Form changes
    this.Monitor.setActiveConnectionUuid(null);
    setTimeout(() => this.Utils.scrollTo('monitor_main-body', true), 100);
  }

  editConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.Monitor.editConnection();
    setTimeout(() => this.Utils.scrollTo('monitor_main-body', true), 100);
  }

  disconnectConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.Monitor.disconnectConnection();
    setTimeout(() => this.Utils.scrollTo('monitor_main-body', true), 100);
  }

  deleteConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.Monitor.deleteConnection();
  }

  /**
   * Modals
   */
  async openOptionsModal(): Promise<void> {
    if (this.activeConnectionUuid === null) return;

    this.NETDATA = this.connection.NETDATA;
    this.NETDATA.pause(() => {});

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('monitor-options', this.Monitor.getBodyContainerRef(), {
      connection: this.connection
    });

    modalInstance.afterClosed().subscribe((): void => {
      if (this.NETDATA) this.NETDATA.unpause();
    });
  }

  async openAlarmsModal(): Promise<void> {
    if (this.activeConnectionUuid === null || this.getActiveConnection().snapshotData) return;

    this.NETDATA = this.connection.NETDATA;
    this.NETDATA.pause(() => {});

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('monitor-alarms', this.Monitor.getBodyContainerRef(), {
      connection: this.connection
    });

    modalInstance.afterClosed().subscribe((): void => {
      if (this.NETDATA) this.NETDATA.unpause();
    });
  }

  async openImportModal(): Promise<void> {
    if (this.connection) {
      this.NETDATA = this.connection.NETDATA;
      this.NETDATA.pause(() => {});
    } else {
      this.connection = this.Netdata.newDashboard({uuid: null});
    }

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('monitor-import', this.Monitor.getBodyContainerRef(), {
      connection: this.connection
    });

    modalInstance.afterClosed().subscribe((): void => {

    });
  }

  async openExportModal(): Promise<void> {
    if (this.activeConnectionUuid === null) return;

    this.NETDATA = this.connection.NETDATA;
    this.NETDATA.pause(() => {});

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('monitor-export', this.Monitor.getBodyContainerRef(), {
      connection: this.connection
    });

    modalInstance.afterClosed().subscribe((): void => {
      if (this.NETDATA) this.NETDATA.unpause();
    });
  }

  async openHelpModal(): Promise<void> {
    if (this.connection) {
      this.NETDATA = this.connection.NETDATA;
      this.NETDATA.pause(() => {});
    }

    const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('monitor-help', this.Monitor.getBodyContainerRef(), {});

    modalInstance.afterClosed().subscribe((): void => {
      if (this.NETDATA) this.NETDATA.unpause();
    });
  }
}

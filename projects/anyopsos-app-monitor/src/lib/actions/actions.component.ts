import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibExtNetdataService} from '@anyopsos/lib-ext-netdata';

import {AnyOpsOSAppMonitorService} from '../services/anyopsos-app-monitor.service';
import {Netdata} from '../types/netdata';

@Component({
  selector: 'samon-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private NETDATA;

  activeConnection: string;
  connection;

  constructor(private Modal: AnyOpsOSLibModalService,
              private Utils: AnyOpsOSLibUtilsService,
              private Monitor: AnyOpsOSAppMonitorService,
              private Netdata: AnyOpsOSLibExtNetdataService) {
  }

  ngOnInit(): void {

    // Listen for connections changes
    this.Netdata.connections
      .pipe(takeUntil(this.destroySubject$)).subscribe(connections => this.connection = connections[this.activeConnection]);

    // Listen for activeConnection change
    this.Monitor.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnection = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnection(): Netdata {
    return this.Monitor.getActiveConnection();
  }

  goHome(): void {
    if (this.activeConnection === null || this.getActiveConnection().state === 'disconnected') this.Utils.scrollTo('monitor_main-body');
    if (this.activeConnection === null) return;

    this.Monitor.setActiveConnection(null);
  }

  newConnection(): void {
    if (this.activeConnection === null) return this.Utils.scrollTo('monitor_main-body', true);

    // even if activeConnection === null, set it again to reset possible Form changes
    this.Monitor.setActiveConnection(null);
    setTimeout(() => this.Utils.scrollTo('monitor_main-body', true), 100);
  }

  editConnection(): void {
    if (this.activeConnection === null) return;

    this.Monitor.editConnection();
    setTimeout(() => this.Utils.scrollTo('monitor_main-body', true), 100);
  }

  disconnectConnection(): void {
    if (this.activeConnection === null) return;

    this.Monitor.disconnectConnection();
    setTimeout(() => this.Utils.scrollTo('monitor_main-body', true), 100);
  }

  deleteConnection(): void {
    if (this.activeConnection === null) return;

    this.Monitor.deleteConnection();
  }

  /**
   * Modals
   */
  openOptionsModal(): void {
    if (this.activeConnection === null) return;

    this.NETDATA = this.connection.NETDATA;
    this.NETDATA.pause(() => {});

    this.Modal.openRegisteredModal('monitor-options', '.window--monitor .window__main', {
      connection: this.connection
    }).then((modalInstance) => {
      modalInstance.result.then(() => {
        this.NETDATA.unpause();
      });
    });
  }

  openAlarmsModal(): void {
    if (this.activeConnection === null || this.getActiveConnection().snapshotData) return;

    this.NETDATA = this.connection.NETDATA;
    this.NETDATA.pause(() => {});

    this.Modal.openRegisteredModal('monitor-alarms', '.window--monitor .window__main', {
      connection: this.connection
    }).then((modalInstance) => {
      modalInstance.result.then(() => {
        this.NETDATA.unpause();
      });
    });
  }

  openImportModal(): void {
    if (this.connection) {
      this.NETDATA = this.connection.NETDATA;
      this.NETDATA.pause(() => {});
    } else {
      this.connection = this.Netdata.newDashboard({uuid: null});
    }

    this.Modal.openRegisteredModal('monitor-import', '.window--monitor .window__main', {
      connection: this.connection
    }).then((modalInstance) => {
      modalInstance.result.then(() => {
      });
    });
  }

  openExportModal(): void {
    if (this.activeConnection === null) return;

    this.NETDATA = this.connection.NETDATA;
    this.NETDATA.pause(() => {});

    this.Modal.openRegisteredModal('monitor-export', '.window--monitor .window__main', {
      connection: this.connection
    }).then((modalInstance) => {
      modalInstance.result.then(() => {
        this.NETDATA.unpause();
      });
    });
  }

  openHelpModal(): void {
    if (this.connection) {
      this.NETDATA = this.connection.NETDATA;
      this.NETDATA.pause(() => {});
    }

    this.Modal.openRegisteredModal('monitor-help', '.window--monitor .window__main', {}).then((modalInstance) => {
      modalInstance.result.then(() => {
        if (this.NETDATA) this.NETDATA.unpause();
      });
    });
  }
}

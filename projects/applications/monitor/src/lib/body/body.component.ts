import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {MonitorConnection} from '@anyopsos/module-monitor';

import {AnyOpsOSAppMonitorService} from '../services/anyopsos-app-monitor.service';

@Component({
  selector: 'aamon-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  connections: MonitorConnection[];
  activeConnection: string;

  constructor(private Utils: AnyOpsOSLibUtilsService,
              private Monitor: AnyOpsOSAppMonitorService) {
  }

  ngOnInit(): void {

    // Listen for connections changes
    this.Monitor.connections
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: MonitorConnection[]) => this.connections = connections);

    // Listen for activeConnection change
    this.Monitor.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.onActiveConnectionChange(activeConnectionUuid));
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onActiveConnectionChange(activeConnectionUuid: string): void {
    this.activeConnection = activeConnectionUuid;

    if (this.activeConnection !== null && this.getActiveConnection().state === 'disconnected') {
      setTimeout(() => this.Utils.scrollTo('monitor_main-body', true), 100);
    }
  }

  getActiveConnection(): MonitorConnection {
    return this.Monitor.getActiveConnection();
  }

  setActiveConnection(connection: MonitorConnection): void {
    this.Monitor.setActiveConnection(connection.uuid);
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }
}

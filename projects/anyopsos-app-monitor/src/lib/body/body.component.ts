import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';

import {AnyOpsOSAppMonitorService} from '../services/anyopsos-app-monitor.service';
import {Netdata} from '../types/netdata';

@Component({
  selector: 'samon-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;
  viewSide: boolean = true;

  connections: Netdata[];

  constructor(private Utils: AnyOpsOSLibUtilsService,
              private Monitor: AnyOpsOSAppMonitorService) {
  }

  ngOnInit() {
    this.Monitor.connections.pipe(takeUntil(this.destroySubject$)).subscribe(connections => this.connections = connections);
    this.Monitor.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => {
      this.activeConnection = connection;

      if (this.activeConnection !== null && this.getActiveConnection().state === 'disconnected') {
        setTimeout(() => this.Utils.scrollTo('monitor_main-body', true), 100);
      }
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
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

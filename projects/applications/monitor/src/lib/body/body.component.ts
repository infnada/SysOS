import {Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {ConnectionMonitor} from '@anyopsos/module-monitor';

import {AnyOpsOSAppMonitorService} from '../services/anyopsos-app-monitor.service';

@Component({
  selector: 'aamon-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @ViewChild('bodyContainer', {static: true, read: ViewContainerRef}) private readonly bodyContainer: ViewContainerRef;
  @Input() readonly application: Application;

  private destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  connections: ConnectionMonitor[];
  activeConnectionUuid: string | null = null;

  constructor(private Utils: AnyOpsOSLibUtilsService,
              private Monitor: AnyOpsOSAppMonitorService) {
  }

  ngOnInit(): void {
    // Set bodyContainerRef, this is used by Modals
    this.Monitor.setBodyContainerRef(this.bodyContainer);

    // Listen for connections changes
    this.Monitor.connections
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: ConnectionMonitor[]) => this.connections = connections);

    // Listen for activeConnectionUuid change
    this.Monitor.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);

    // Listen for activeConnection change
    this.Monitor.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: ConnectionMonitor | null) => this.onActiveConnectionChange(activeConnection));
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onActiveConnectionChange(activeConnection: ConnectionMonitor): void {
    // Show Connection Form
    if (activeConnection?.state === 'disconnected') {
      setTimeout(() => this.Utils.angularElementScrollTo(this.Monitor.getBodyContainerRef().element.nativeElement), 100);
    }
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  /**
   * Connections data
   */
  getActiveConnectionObs(): Observable<ConnectionMonitor | null> {
    return this.Monitor.activeConnection;
  }

  setActiveConnection(connection: ConnectionMonitor): void {
    this.Monitor.setActiveConnectionUuid(connection.uuid);
  }

}

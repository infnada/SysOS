import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppDatastoreExplorerService} from '../../services/anyopsos-app-datastore-explorer.service';
import {DatastoreExplorerConnection} from '../../types/datastore-explorer-connection';

@Component({
  selector: 'aade-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  connections: DatastoreExplorerConnection[];
  activeConnection: string;
  viewExchange: boolean;

  constructor(private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService) {
  }

  ngOnInit(): void {

    // Listen for connections changes
    this.DatastoreExplorer.connections
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: DatastoreExplorerConnection[]) => this.connections = connections);

    // Listen for activeConnection change
    this.DatastoreExplorer.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnection = activeConnectionUuid);

    // Listen for viewExchange change
    this.DatastoreExplorer.viewExchange
      .pipe(takeUntil(this.destroySubject$)).subscribe((view: boolean) => this.viewExchange = view);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: DatastoreExplorerConnection): void {
    this.DatastoreExplorer.setActiveConnection(connection.uuid);
  }
}

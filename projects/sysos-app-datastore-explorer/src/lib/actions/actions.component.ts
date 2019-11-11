import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@sysos/lib-application';

import {SysosAppDatastoreExplorerService} from '../services/sysos-app-datastore-explorer.service';
import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';

@Component({
  selector: 'sade-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;

  constructor(private DatastoreExplorer: SysosAppDatastoreExplorerService) {
  }

  ngOnInit() {
    this.DatastoreExplorer.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }

  toggleExchange(): void {
    this.DatastoreExplorer.toggleExchange();
  }

  newConnection() {
    if (this.activeConnection === null) return;

    this.DatastoreExplorer.setActiveConnection(null);
  }

  disconnectConnection() {
    if (this.activeConnection === null) return;

    this.DatastoreExplorer.disconnectConnection();
  }

  deleteConnection() {
    if (this.activeConnection === null) return;

    this.DatastoreExplorer.deleteConnection();
  }
}

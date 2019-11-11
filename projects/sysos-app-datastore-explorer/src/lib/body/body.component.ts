import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import {Application} from '@sysos/lib-application';

import {SysosAppDatastoreExplorerService} from '../services/sysos-app-datastore-explorer.service';
import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'sade-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  connections: DatastoreExplorerConnection[];
  activeConnection: string;
  viewExchange: boolean;

  viewSide: boolean = true;

  constructor(private DatastoreExplorer: SysosAppDatastoreExplorerService) {
  }

  ngOnInit() {
    this.DatastoreExplorer.connections.pipe(takeUntil(this.destroySubject$)).subscribe(connections => this.connections = connections);
    this.DatastoreExplorer.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);
    this.DatastoreExplorer.viewExchange.pipe(takeUntil(this.destroySubject$)).subscribe(view => this.viewExchange = view);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: DatastoreExplorerConnection): void {
    this.DatastoreExplorer.setActiveConnection(connection.uuid);
  }
}

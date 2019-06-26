import {Component, OnInit, Input} from '@angular/core';

import {Application} from '@sysos/lib-application';

import {SysosAppDatastoreExplorerService} from '../services/sysos-app-datastore-explorer.service';
import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';

@Component({
  selector: 'sade-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() application: Application;

  connections: DatastoreExplorerConnection[];
  activeConnection: string;
  viewExchange: boolean;

  viewSide: boolean = true;

  constructor(private DatastoreExplorer: SysosAppDatastoreExplorerService) {
  }

  ngOnInit() {
    this.DatastoreExplorer.connections.subscribe(connections => this.connections = connections);
    this.DatastoreExplorer.activeConnection.subscribe(connection => this.activeConnection = connection);
    this.DatastoreExplorer.viewExchange.subscribe(view => this.viewExchange = view);
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: DatastoreExplorerConnection): void {
    this.DatastoreExplorer.setActiveConnection(connection.uuid);
  }
}

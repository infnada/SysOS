import {Component, OnInit, Input} from '@angular/core';
import {Application} from '../../../interfaces/application';
import {DatastoreExplorerService} from '../services/datastore-explorer.service';
import {DatastoreExplorerConnection} from '../DatastoreExplorerConnection';

@Component({
  selector: 'app-datastore-explorer-body',
  templateUrl: './datastore-explorer-body.component.html',
  styleUrls: ['./datastore-explorer-body.component.scss']
})
export class DatastoreExplorerBodyComponent implements OnInit {
  @Input() application: Application;

  connections: DatastoreExplorerConnection[];
  activeConnection: string;
  viewExchange: boolean;

  viewSide: boolean = true;

  constructor(private DatastoreExplorer: DatastoreExplorerService) {
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

import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../interfaces/application';
import {DatastoreExplorerService} from '../services/datastore-explorer.service';
import {DatastoreExplorerConnection} from '../DatastoreExplorerConnection';

@Component({
  selector: 'app-datastore-explorer-actions',
  templateUrl: './datastore-explorer-actions.component.html',
  styleUrls: ['./datastore-explorer-actions.component.scss']
})
export class DatastoreExplorerActionsComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  constructor(private DatastoreExplorer: DatastoreExplorerService) { }

  ngOnInit() {
    this.DatastoreExplorer.activeConnection.subscribe(connection => this.activeConnection = connection);
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

  editConnection() {
    if (this.activeConnection === null) return;

    this.DatastoreExplorer.editConnection();
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {DatastoreExplorerService} from '../services/datastore-explorer.service';
import {Application} from '../../../interfaces/application';
import {DatastoreExplorerConnection} from '../DatastoreExplorerConnection';

@Component({
  selector: 'app-datastore-explorer-status',
  templateUrl: './datastore-explorer-status.component.html',
  styleUrls: ['./datastore-explorer-status.component.scss']
})
export class DatastoreExplorerStatusComponent implements OnInit {
  @Input() application: Application;

  constructor(private DatastoreExplorer: DatastoreExplorerService) {
  }

  ngOnInit() {
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }

}

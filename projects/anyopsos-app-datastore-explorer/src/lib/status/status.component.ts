import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppDatastoreExplorerService} from '../services/anyopsos-app-datastore-explorer.service';
import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';

@Component({
  selector: 'sade-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() application: Application;

  constructor(private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService) {
  }

  ngOnInit() {
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }
}

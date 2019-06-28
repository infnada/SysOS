import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';

import {SysosAppDatastoreExplorerService} from '../services/sysos-app-datastore-explorer.service';
import {DatastoreExplorerConnection} from '../types/datastore-explorer-connection';

@Component({
  selector: 'sade-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() application: Application;

  constructor(private DatastoreExplorer: SysosAppDatastoreExplorerService) {
  }

  ngOnInit() {
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }
}

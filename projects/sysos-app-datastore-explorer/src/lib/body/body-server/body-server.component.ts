import {Component, Input, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysosLibApplicationService, Application} from '@sysos/lib-application';
import {SysOSFile} from '@sysos/lib-types';

import {SysosAppDatastoreExplorerService} from '../../services/sysos-app-datastore-explorer.service';
import {SysosAppDatastoreExplorerServerService} from '../../services/sysos-app-datastore-explorer-server.service';
import {DatastoreExplorerConnection} from '../../types/datastore-explorer-connection';

@Component({
  selector: 'sade-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss'],
  providers: [SysosLibSelectableService]
})
export class BodyServerComponent implements OnInit {
  @Input() application: Application;

  reloadPathSubscription: Subscription;

  currentPath: string;
  currentData: SysOSFile[];
  viewAsList: boolean;
  search: { filename: string } = null;
  activeConnection: string;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  constructor(private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private Applications: SysosLibApplicationService,
              private DatastoreExplorer: SysosAppDatastoreExplorerService,
              private DatastoreExplorerServer: SysosAppDatastoreExplorerServerService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.DatastoreExplorerServer.currentPath.subscribe(path => this.currentPath = path);
    this.DatastoreExplorerServer.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.DatastoreExplorerServer.viewAsList.subscribe(data => this.viewAsList = data);
    this.DatastoreExplorerServer.search.subscribe(data => this.search = data);
    this.DatastoreExplorer.activeConnection.subscribe(connection => this.activeConnection = connection);

    this.goToPath('/');
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }

  /**
   * Sets the fist item in the current path as active
   */
  private resetActive(): void {
    this.currentActive = 0;
    // TODO: $('#desktop_body').focus();
  }

  /**
   * Get current path data
   */
  private reloadPath(): void {
    if (!this.getActiveConnection()) return;

    this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
  }

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
      application: 'datastore-explorer#server',
      path
    });
  }

}

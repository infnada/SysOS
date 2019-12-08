import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSFile} from '@anyopsos/lib-file';

import {AnyOpsOSAppDatastoreExplorerService} from '../../services/anyopsos-app-datastore-explorer.service';
import {AnyOpsOSAppDatastoreExplorerServerService} from '../../services/anyopsos-app-datastore-explorer-server.service';
import {DatastoreExplorerConnection} from '../../types/datastore-explorer-connection';

@Component({
  selector: 'sade-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class BodyServerComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  currentPath: string;
  currentData: AnyOpsOSFile[];
  viewAsList: boolean;
  search: { filename: string } = null;
  activeConnection: string;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  constructor(private FileSystem: AnyOpsOSLibFileSystemService,
              private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private Applications: AnyOpsOSLibApplicationService,
              private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService,
              private DatastoreExplorerServer: AnyOpsOSAppDatastoreExplorerServerService) {

    this.FileSystemUi.getObserverRefreshPath().pipe(takeUntil(this.destroySubject$)).subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.DatastoreExplorerServer.currentPath.pipe(takeUntil(this.destroySubject$)).subscribe(path => this.currentPath = path);
    this.DatastoreExplorerServer.currentData.pipe(takeUntil(this.destroySubject$)).subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.DatastoreExplorerServer.viewAsList.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.viewAsList = data);
    this.DatastoreExplorerServer.search.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.search = data);
    this.DatastoreExplorer.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);

    this.goToPath('/');
  }

  ngOnDestroy() {
    this.destroySubject$.next();
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

import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSFile} from '@anyopsos/lib-types';

import {AnyOpsOSAppDatastoreExplorerService} from '../../../services/anyopsos-app-datastore-explorer.service';
import {AnyOpsOSAppDatastoreExplorerServerService} from '../../../services/anyopsos-app-datastore-explorer-server.service';
import {DatastoreExplorerConnection} from '../../../types/datastore-explorer-connection';

@Component({
  selector: 'sade-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class BodyServerComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;
  loadingData: boolean;

  currentPath: string;
  currentData: AnyOpsOSFile[];

  viewAsList: boolean;
  search: { filename: string; } = null;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  constructor(private FileSystem: AnyOpsOSLibFileSystemService,
              private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private Applications: AnyOpsOSLibApplicationService,
              private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService,
              private DatastoreExplorerServer: AnyOpsOSAppDatastoreExplorerServerService) {
  }

  ngOnInit(): void {

    // Listen for refreshPath call
    this.FileSystemUi.getObserverRefreshPath()
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => {
        if (path === this.currentPath) this.reloadPath();
      });

    // Is loading data from Backend?
    this.DatastoreExplorerServer.getObserverLoadingData()
      .pipe(takeUntil(this.destroySubject$)).subscribe((loadingData: boolean) => this.loadingData = loadingData);

    // Listen for currentPath change
    this.DatastoreExplorerServer.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentPath = path);

    // Listen for currentData change
    this.DatastoreExplorerServer.currentData
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: AnyOpsOSFile[]) => {
        this.currentData = data;
        this.resetActive();
      });

    // Listen for viewAsList change
    this.DatastoreExplorerServer.viewAsList
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: boolean) => this.viewAsList = data);

    // Listen for search change
    this.DatastoreExplorerServer.search
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { filename: string; }) => this.search = data);

    // Listen for activeConnection change
    this.DatastoreExplorer.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnection = activeConnectionUuid);

    /**
     * Initialize as root path
     */
    this.goToPath('/');
  }

  ngOnDestroy(): void {

    // Remove all listeners
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

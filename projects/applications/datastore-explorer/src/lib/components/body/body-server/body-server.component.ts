import {Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';

import {AnyOpsOSAppDatastoreExplorerService} from '../../../services/anyopsos-app-datastore-explorer.service';
import {AnyOpsOSAppDatastoreExplorerServerService} from '../../../services/anyopsos-app-datastore-explorer-server.service';
import {DatastoreExplorerConnection} from '../../../types/datastore-explorer-connection';

@Component({
  selector: 'aade-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class BodyServerComponent implements OnDestroy, OnInit {
  @ViewChild('serverBodyContainer', {static: true}) serverBodyContainer: ViewContainerRef;
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;
  loadingData: boolean;

  currentPath: string;
  currentData: AnyOpsOSFile[];

  viewAsList: boolean;
  search: { fileName: string; } = null;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  constructor(private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,
              private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService,
              private DatastoreExplorerServer: AnyOpsOSAppDatastoreExplorerServerService) {
  }

  ngOnInit(): void {
    // Set bodyContainerRef, this is used by Modals
    this.DatastoreExplorer.setServerBodyContainerRef(this.serverBodyContainer);

    // Listen for refreshPath call
    this.LibFileSystemUi.getObserverRefreshPath()
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
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { fileName: string; }) => this.search = data);

    // Listen for activeConnection change
    this.DatastoreExplorer.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnection = activeConnectionUuid);

    /**
     * Initialize path, setTimeout to make sure the subscription 'getObserverGoToPath' is initialized {@link ActionsServerComponent#ngOnInit}
     */
    setTimeout(() => this.goToPath('/'), 0);
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
    this.LibFileSystemUi.sendGoToPath({
      application: 'datastore-explorer#server',
      path
    });
  }

}
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSFile} from '@anyopsos/lib-types';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSAppDatastoreExplorerService} from '../../services/anyopsos-app-datastore-explorer.service';
import {AnyOpsOSAppDatastoreExplorerServerService} from '../../services/anyopsos-app-datastore-explorer-server.service';
import {DatastoreExplorerConnection} from '../../types/datastore-explorer-connection';

@Component({
  selector: 'sade-actions-server',
  templateUrl: './actions-server.component.html',
  styleUrls: ['./actions-server.component.scss']
})
export class ActionsServerComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  currentPath: string;
  currentData: AnyOpsOSFile[];
  viewAsList: boolean;
  search: {filename: string} = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService,
              private DatastoreExplorerServer: AnyOpsOSAppDatastoreExplorerServerService) {

    this.DatastoreExplorerServer.getObserverGoPathBack().pipe(takeUntil(this.destroySubject$)).subscribe(() => {
      this.goPathBack();
    });

    this.FileSystemUi.getObserverGoToPath().pipe(takeUntil(this.destroySubject$)).subscribe((data) => {
      if (data.application === 'datastore-explorer#server') this.goToPath(data.path);
    });
  }

  ngOnInit(): void {
    this.DatastoreExplorerServer.currentPath.pipe(takeUntil(this.destroySubject$)).subscribe(path => this.currentPath = path);
    this.DatastoreExplorerServer.currentData.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.currentData = data);
    this.DatastoreExplorerServer.viewAsList.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.viewAsList = data);
    this.DatastoreExplorerServer.search.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.search = data);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.currentPath, '.window--datastore-explorer .window__main', 'linux', { connection: this.getActiveConnection() });
  }

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.DatastoreExplorerServer.toggleView();
  }

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid, newPath);
    this.searchChange(null);
  }

  /**
   * Checks the last visited path and go to it
   */
  goPathBack(): void {
    if (this.lastPath.length === 0) return;
    const newPath = this.lastPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.nextPath.push(this.currentPath);

    this.reloadPath(newPath);
  }

  /**
   * If called goPathBack this function goes a path forward
   */
  goPathForward(): void {
    if (this.nextPath.length === 0) return;
    const newPath = this.nextPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.lastPath.push(this.currentPath);

    this.reloadPath(newPath);
  }

  /**
   * Go to any folders by a given path
   */
  goToPath(path: string|number): void {
    const newPath = (typeof path === 'string' ? path : this.currentPath.split('/').splice(0, path + 1).join('/') + '/');

    // Push the actual path to lastPath array (used by goPathBack()) when currentPath exists.
    // This happens when the application is opened for 1st time.
    if (typeof this.currentPath !== 'undefined') this.lastPath.push(this.currentPath);

    // Reset nextPath
    this.nextPath = [];

    this.reloadPath(newPath);
  }

  searchChange(event: string): void {
    this.DatastoreExplorerServer.setSearch(event);
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSAppDatastoreExplorerLocalService} from '../../../services/anyopsos-app-datastore-explorer-local.service';

@Component({
  selector: 'aade-actions-local',
  templateUrl: './actions-local.component.html',
  styleUrls: ['./actions-local.component.scss']
})
export class ActionsLocalComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  currentPath: string;
  search: {fileName: string} = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private DatastoreExplorerLocal: AnyOpsOSAppDatastoreExplorerLocalService) {
  }

  ngOnInit(): void {

    // Listen for goToPath calls
    this.FileSystemUi.getObserverGoToPath()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { application: string; path: string; }) => {
        if (data.application === 'datastore-explorer#local') this.goToPath(data.path);
      });

    // Listen for GoPathBack call
    this.DatastoreExplorerLocal.getObserverGoPathBack()
      .pipe(takeUntil(this.destroySubject$)).subscribe(() => this.goPathBack());

    // Listen for currentPath change
    this.DatastoreExplorerLocal.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentPath = path);

    // Listen for search change
    this.DatastoreExplorerLocal.search
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { fileName: string; }) => this.search = data);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.currentPath, '.window--datastore-explorer .window__main');
  }

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.DatastoreExplorerLocal.toggleView();
  }

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.DatastoreExplorerLocal.reloadPath(newPath);
    this.searchChange(null);
  }

  /**
   * Go to any folders by a given path
   */
  goToPath(path: string | number): void {
    const newPath = (
      typeof path === 'string' ?
        path :
        this.currentPath.split('/').splice(0, path + 1).join('/') + '/'
    );

    // Push the actual path to lastPath array (used by goPathBack()) when currentPath exists.
    // This happens when the application is opened for 1st time.
    if (typeof this.currentPath !== 'undefined') this.lastPath.push(this.currentPath);

    // Reset nextPath
    this.nextPath = [];

    this.reloadPath(newPath);
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

  searchChange(event: string): void {
    this.DatastoreExplorerLocal.setSearch(event);
  }
}

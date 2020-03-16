import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {Connection} from '@anyopsos/backend-core/app/types/connection';

import {AnyOpsOSLibFolderExplorerService} from '../../services/anyopsos-lib-folder-explorer.service';

@Component({
  selector: 'alfolder-explorer-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class FolderExplorerActionsComponent implements OnDestroy, OnInit {
  @Input() private readonly FolderExplorer: AnyOpsOSLibFolderExplorerService;
  @Input() readonly application: Application;
  @Input() readonly connection: Connection = null;

  private readonly destroySubject$: Subject<void> = new Subject();

  currentPath: string;
  search: { fileName: string; } = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService) {
  }

  ngOnInit(): void {

    // Listen for refreshPath call
    this.LibFileSystemUi.getObserverRefreshPath()
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => {
        if (path === this.currentPath) this.reloadPath();
      });

    // Listen for goToPath calls
    this.LibFileSystemUi.getObserverGoToPath()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { application: string; path: string; }) => {
        if (data.application === this.application.uuid + '#' + (this.connection ? 'server' : 'local')) this.goToPath(data.path);
      });

    // Listen for GoPathBack call
    this.FolderExplorer.getObserverGoPathBack()
      .pipe(takeUntil(this.destroySubject$)).subscribe(() => this.goPathBack());

    // Listen for currentPath change
    this.FolderExplorer.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentPath = path);

    // Listen for search change
    this.FolderExplorer.search
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { fileName: string; }) => this.search = data);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  /**
   * Creates a new folder
   */
  UIputFolder(): void {
    this.LibFileSystemUi.UIputFolder(
      this.currentPath,
      this.FolderExplorer.getBodyContainerRef(),
      (this.connection ? this.connection.type : null),
      (this.connection ? { connection: this.connection } : undefined)
    );
  }

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.FolderExplorer.toggleView();
  }

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.FolderExplorer.reloadPath(newPath, this.connection);
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
    this.FolderExplorer.setSearch(event);
  }

  // TODO hardcoded?
  getSshShell() {

  }
}

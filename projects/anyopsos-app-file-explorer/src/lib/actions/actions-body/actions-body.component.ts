import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSFile} from '@anyopsos/lib-types';

import {AnyOpsOSAppFileExplorerService} from '../../services/anyopsos-app-file-explorer.service';

@Component({
  selector: 'safe-actions-body',
  templateUrl: './actions-body.component.html',
  styleUrls: ['./actions-body.component.scss']
})
export class ActionsBodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  currentPath: string;
  currentData: AnyOpsOSFile[];
  viewAsList: boolean;
  search: { filename: string } = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private FileExplorer: AnyOpsOSAppFileExplorerService) {

    this.FileExplorer.getObserverGoPathBack().pipe(takeUntil(this.destroySubject$)).subscribe(() => {
      this.goPathBack();
    });

    this.FileSystemUi.getObserverGoToPath().pipe(takeUntil(this.destroySubject$)).subscribe((data) => {
      if (data.application === 'file-explorer') this.goToPath(data.path);
    });
  }

  ngOnInit(): void {
    this.FileExplorer.currentPath.pipe(takeUntil(this.destroySubject$)).subscribe(path => this.currentPath = path);
    this.FileExplorer.currentData.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.currentData = data);
    this.FileExplorer.viewAsList.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.viewAsList = data);
    this.FileExplorer.search.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.search = data);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.currentPath, '.window--file-explorer .window__main');
  }

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.FileExplorer.toggleView();
  }

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.FileExplorer.reloadPath(newPath);
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
   * On file search change
   */
  searchChange(event: string): void {
    this.FileExplorer.setSearch(event);
  }
}

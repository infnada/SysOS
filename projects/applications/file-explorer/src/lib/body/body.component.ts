import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse, HttpEvent} from '@angular/common/http';

import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';

import {AnyOpsOSAppFileExplorerService} from '../services/anyopsos-app-file-explorer.service';

@Component({
  selector: 'aafe-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  loadingData: boolean;

  currentPath: string;
  currentData: AnyOpsOSFile[];

  viewAsList: boolean;
  search: { fileName: string; } = null;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;
  httpEmitter: Subscription[] = [];
  httpEvent: HttpEvent<{}>;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly FileSystem: AnyOpsOSLibFileSystemService,
              private readonly FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly Applications: AnyOpsOSLibApplicationService,
              private readonly FileExplorer: AnyOpsOSAppFileExplorerService) {
  }

  ngOnInit(): void {

    // Listen for refreshPath call
    this.FileSystemUi.getObserverRefreshPath()
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => {
        if (path === this.currentPath) this.reloadPath();
      });

    // Is loading data from Backend?
    this.FileExplorer.getObserverLoadingData()
      .pipe(takeUntil(this.destroySubject$)).subscribe((loadingData: boolean) => this.loadingData = loadingData);

    // Listen for currentPath change
    this.FileExplorer.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentPath = path);

    // Listen for currentData change
    this.FileExplorer.currentData
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: AnyOpsOSFile[]) => {
        this.currentData = data;
        this.resetActive();
      });

    // Listen for viewAsList change
    this.FileExplorer.viewAsList
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: boolean) => this.viewAsList = data);

    // Listen for search change
    this.FileExplorer.search
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { fileName: string; }) => this.search = data);

    /**
     * Initialize path, setTimeout to make sure the subscription 'getObserverGoToPath' is initialized {@link ActionsBodyComponent#ngOnInit}
     */
    setTimeout(() => {
      if (this.application.initData && this.application.initData.path) return this.goToPath(this.application.initData.path);
      this.goToPath('/');
    }, 0);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
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
    this.FileExplorer.reloadPath();
  }

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
      application: 'file-explorer',
      path
    });
  }

  /**
   * ngfUpload
   */
  uploadFiles(files: File[]): void {

    files.forEach((file: File, i: number) => {
      this.httpEmitter[i] = this.FileSystem.putFile(this.currentPath, file).subscribe(
        event => {
          this.httpEvent = event;

          if (event instanceof HttpResponse) {
            delete this.httpEmitter[i];
          }

          this.reloadPath();
        },
        error => this.logger.log('[FileExplorerBody] Error Uploading file', error)
      );

      files.splice(i, 1);
    });

  }

  /**
   * Left sidebar
   */
  toggleList($event): void {
    $event.currentTarget.parentElement.parentElement.classList.toggle('side__list--open');
  }
}

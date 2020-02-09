import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService, SendFileExchange} from '@anyopsos/lib-file-system-ui';
import {Connection} from '@anyopsos/backend/app/types/connection';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';

import {AnyOpsOSLibFolderExplorerService} from '../../services/anyopsos-lib-folder-explorer.service';

@Component({
  selector: 'alfolder-explorer-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class FolderExplorerBodyComponent implements OnDestroy, OnInit {
  @Input() private readonly FolderExplorer: AnyOpsOSLibFolderExplorerService;
  @Input() readonly application: Application;
  @Input() readonly connection: Connection = null;

  private readonly destroySubject$: Subject<void> = new Subject();

  currentPath: string = '/';
  currentData: AnyOpsOSFile[] = [];
  currentActive: number = 0;

  viewAsList: boolean = false;
  loadingData: boolean = false;
  search: { fileName: string; } = null;

  files: File[] = [];

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService) {
  }

  ngOnInit(): void {

    // Is loading data from Backend?
    this.FolderExplorer.getObserverLoadingData()
      .pipe(takeUntil(this.destroySubject$)).subscribe((loadingData: boolean) => this.loadingData = loadingData);

    // Listen for currentPath change
    this.FolderExplorer.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentPath = path);

    // Listen for currentData change
    this.FolderExplorer.currentData
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: AnyOpsOSFile[]) => {
        this.currentData = data;
        this.resetActive();
      });

    // Listen for viewAsList change
    this.FolderExplorer.viewAsList
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: boolean) => this.viewAsList = data);

    // Listen for search change
    this.FolderExplorer.search
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { fileName: string; }) => this.search = data);

    /**
     * Uploads & Downloads observer
     */
    this.LibFileSystemUi.getObserverSendFileExchange()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: SendFileExchange) => this.onSendFileExchange(data));

    /**
     * Initialize path, setTimeout to make sure the subscription 'getObserverGoToPath' is initialized {@link FolderExplorerActionsComponent#ngOnInit}
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
   * {@link FolderExplorerActionsComponent#ngOnInit} will handle this and change the path
   */
  private goToPath(path: string): void {
    this.LibFileSystemUi.sendGoToPath({
      application: this.application.uuid + '#' + (this.connection ? 'server' : 'local'),
      path
    });
  }

  /**
   * ngfUpload DropZone (only from local to anyOpsOS)
   */
  uploadFiles(files: File[]): void {

    files.forEach(async (file: File, i: number) => {
      await this.LibFileSystemUi.UIuploadFile(null, this.currentPath, file);

      files.splice(i, 1);
    });

  }

  /**
   * Uploads & Downloads observer
   */
  private onSendFileExchange(data: SendFileExchange): void {
    this.logger.debug('LibFolderExplorer', 'onSendFileExchange', arguments);
  }
}

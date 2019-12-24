import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSFile} from '@anyopsos/lib-types';

import {AnyOpsOSAppDatastoreExplorerLocalService} from '../../../services/anyopsos-app-datastore-explorer-local.service';

@Component({
  selector: 'sade-body-local',
  templateUrl: './body-local.component.html',
  styleUrls: ['./body-local.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class BodyLocalComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

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
              private DatastoreExplorerLocal: AnyOpsOSAppDatastoreExplorerLocalService) {

  }

  ngOnInit(): void {
    // Listen for refreshPath call
    this.FileSystemUi.getObserverRefreshPath()
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => {
        if (path === this.currentPath) this.reloadPath();
      });

    // Is loading data from Backend?
    this.DatastoreExplorerLocal.getObserverLoadingData()
      .pipe(takeUntil(this.destroySubject$)).subscribe((loadingData: boolean) => this.loadingData = loadingData);

    // Listen for currentPath change
    this.DatastoreExplorerLocal.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentPath = path);

    // Listen for currentPath change
    this.DatastoreExplorerLocal.currentData
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: AnyOpsOSFile[]) => {
        this.currentData = data;
        this.resetActive();
      });

    // Listen for currentPath change
    this.DatastoreExplorerLocal.viewAsList
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: boolean) => this.viewAsList = data);

    // Listen for currentPath change
    this.DatastoreExplorerLocal.search
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { filename: string; }) => this.search = data);

    /**
     * Initialize path
     */
    if (this.application.initData && this.application.initData.path) {
      return this.goToPath(this.application.initData.path);
    }

    this.goToPath('/');
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
    this.DatastoreExplorerLocal.reloadPath();
  }

  /**
   * ngfUpload
   */
  uploadFiles(files: File[]): void {

    files.forEach((file: File, i: number) => {
      this.FileSystemUi.sendUploadToAnyOpsOS({
        dst: this.currentPath,
        file,
        applicationId: this.application.id
      });

      files.splice(i, 1);
    });

  }

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
      application: 'datastore-explorer#local',
      path
    });
  }

}

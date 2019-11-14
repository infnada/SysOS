import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSFile} from '@anyopsos/lib-types';

import {AnyOpsOSAppDatastoreExplorerLocalService} from '../../services/anyopsos-app-datastore-explorer-local.service';

@Component({
  selector: 'sade-body-local',
  templateUrl: './body-local.component.html',
  styleUrls: ['./body-local.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class BodyLocalComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  currentPath: string;
  currentData: AnyOpsOSFile[];
  viewAsList: boolean;
  search: { filename: string } = null;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  constructor(private FileSystem: AnyOpsOSLibFileSystemService,
              private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private Applications: AnyOpsOSLibApplicationService,
              private DatastoreExplorerLocal: AnyOpsOSAppDatastoreExplorerLocalService) {

    this.FileSystemUi.getObserverRefreshPath().pipe(takeUntil(this.destroySubject$)).subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.DatastoreExplorerLocal.currentPath.pipe(takeUntil(this.destroySubject$)).subscribe(path => this.currentPath = path);
    this.DatastoreExplorerLocal.currentData.pipe(takeUntil(this.destroySubject$)).subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.DatastoreExplorerLocal.viewAsList.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.viewAsList = data);
    this.DatastoreExplorerLocal.search.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.search = data);

    if (this.application.initData && this.application.initData.path) {
      return this.goToPath(this.application.initData.path);
    }

    this.goToPath('/');
  }

  ngOnDestroy() {
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
      this.FileSystemUi.sendUploadToanyOpsOS({
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

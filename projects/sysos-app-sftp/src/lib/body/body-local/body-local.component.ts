import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject, Subscription} from 'rxjs';
import {takeUntil} from "rxjs/operators";

import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysosLibApplicationService, Application} from '@sysos/lib-application';
import {SysOSFile} from '@sysos/lib-types';

import {SysosAppSftpLocalService} from '../../services/sysos-app-sftp-local.service';

@Component({
  selector: 'sasftp-body-local',
  templateUrl: './body-local.component.html',
  styleUrls: ['./body-local.component.scss'],
  providers: [SysosLibSelectableService]
})
export class BodyLocalComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  reloadPathSubscription: Subscription;

  currentPath: string;
  currentData: SysOSFile[];
  viewAsList: boolean;
  search: { filename: string } = null;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  constructor(private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private Applications: SysosLibApplicationService,
              private SftpLocal: SysosAppSftpLocalService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().pipe(takeUntil(this.destroySubject$)).subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.SftpLocal.currentPath.pipe(takeUntil(this.destroySubject$)).subscribe(path => this.currentPath = path);
    this.SftpLocal.currentData.pipe(takeUntil(this.destroySubject$)).subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.SftpLocal.viewAsList.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.viewAsList = data);
    this.SftpLocal.search.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.search = data);

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
    this.SftpLocal.reloadPath();
  }

  /**
   * ngfUpload
   */
  uploadFiles(files: File[]): void {

    files.forEach((file: File, i: number) => {
      this.FileSystemUi.sendUploadToSysOS({
        dst: this.currentPath,
        file,
        applicationId: this.application.id
      });

      files.splice(i, 1);
    });

  }

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
      application: 'sftp#local',
      path
    });
  }

}

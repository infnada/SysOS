import {Component, Input, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibApplicationService, Application} from '@sysos/lib-application';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysOSFile} from '@sysos/lib-types';

import {SysosAppDatastoreExplorerLocalService} from '../../services/sysos-app-datastore-explorer-local.service';

@Component({
  selector: 'sade-body-local',
  templateUrl: './body-local.component.html',
  styleUrls: ['./body-local.component.scss'],
  providers: [SysosLibSelectableService]
})
export class BodyLocalComponent implements OnInit {
  @Input() application: Application;

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
              private DatastoreExplorerLocal: SysosAppDatastoreExplorerLocalService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.DatastoreExplorerLocal.currentPath.subscribe(path => this.currentPath = path);
    this.DatastoreExplorerLocal.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.DatastoreExplorerLocal.viewAsList.subscribe(data => this.viewAsList = data);
    this.DatastoreExplorerLocal.search.subscribe(data => this.search = data);

    if (this.application.initData && this.application.initData.path) {
      return this.goToPath(this.application.initData.path);
    }

    this.goToPath('/');
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
      application: 'datastore-explorer#local',
      path
    });
  }

}

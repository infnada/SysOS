import {Component, Input, OnInit} from '@angular/core';
import {HttpResponse, HttpEvent} from '@angular/common/http';

import {Subscription} from 'rxjs';
import {SysosLibLoggerService} from '@sysos/lib-logger';

import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysosLibApplicationService, Application} from '@sysos/lib-application';
import {SysOSFile} from '@sysos/lib-types';

import {SysosAppFileExplorerService} from '../services/sysos-app-file-explorer.service';

@Component({
  selector: 'safe-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  providers: [SysosLibSelectableService]
})
export class BodyComponent implements OnInit {
  @Input() application: Application;

  reloadPathSubscription: Subscription;

  currentPath: string;
  currentData: SysOSFile[];

  viewAsList: boolean;
  search: { filename: string } = null;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;
  httpEmitter: Subscription[] = [];
  httpEvent: HttpEvent<{}>;

  constructor(private logger: SysosLibLoggerService,
              public Selectable: SysosLibSelectableService,
              private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private Applications: SysosLibApplicationService,
              private FileExplorer: SysosAppFileExplorerService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.FileExplorer.currentPath.subscribe(path => this.currentPath = path);
    this.FileExplorer.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.FileExplorer.viewAsList.subscribe(data => this.viewAsList = data);
    this.FileExplorer.search.subscribe(data => this.search = data);

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
    this.FileExplorer.reloadPath();
  }

  /**
   * ngfUpload
   */
  uploadFiles(files: File[]): void {

    files.forEach((file: File, i: number) => {
      this.httpEmitter[i] = this.FileSystem.uploadFile(this.currentPath, file).subscribe(
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

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
      application: 'file-explorer',
      path
    });
  }

  toggleList($event): void {
    $event.currentTarget.parentElement.parentElement.classList.toggle('side__list--open');
  }
}

import {Component, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {Application, SysosLibApplicationService} from '@sysos/lib-application';

import {SysOSFile} from '@sysos/lib-types';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {
  reloadPathSubscription: Subscription;

  openedApplications: Application[];
  taskbarItemOpen: string;

  currentPath: string = '/root/Desktop/';
  currentData: SysOSFile[] = [];

  currentActive: number = 0;

  constructor(private logger: SysosLibLoggerService,
              private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private Applications: SysosLibApplicationService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === '/root/Desktop/') this.reloadPath();
    });
  }

  ngOnInit() {
    this.Applications.openedApplications.subscribe(applications => this.openedApplications = applications);
    this.Applications.taskbarItemOpen.subscribe(application => this.taskbarItemOpen = application);

    this.reloadPath();
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
    this.FileSystem.getFileSystemPath(null, this.currentPath).subscribe(
      (res: { data: SysOSFile[] }) => {
        this.currentData = res.data;
        this.resetActive();
      },
      error => {
        this.logger.error('Desktop', 'Error while getting fileSystemPath', null, error);
      });
  }

  setCurrentHoverApplication(): void {
    this.Applications.setCurrentHoverApplication('desktop');
  }

}

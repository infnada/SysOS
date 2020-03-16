import {Component, OnInit} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {
  openedApplications: Application[];

  readonly currentPath: string = '/home/root/Desktop/';
  currentData: AnyOpsOSFile[] = [];

  currentActive: number = 0;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly LibApplication: AnyOpsOSLibApplicationService) {

    // Reload Desktop data if needed
    this.LibFileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === '/home/root/Desktop/') this.reloadPath();
    });
  }

  ngOnInit(): void {
    this.LibApplication.openedApplications.subscribe((applications: Application[]) => this.openedApplications = applications);

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
    this.LibFileSystem.getFolder(this.currentPath).subscribe(
      (res: BackendResponse & { data: AnyOpsOSFile[]; }) => {
        if (res.status === 'error') return this.logger.error('anyOpsOS', 'Error while reloading desktop files', null, res.data);

        this.currentData = res.data;
        this.resetActive();
      },
      error => {
        this.logger.error('Desktop', 'Error while getting fileSystemPath', null, error);
      });
  }

  setCurrentHoverApplication(): void {
    this.LibApplication.setCurrentHoverApplication('desktop');
  }

}

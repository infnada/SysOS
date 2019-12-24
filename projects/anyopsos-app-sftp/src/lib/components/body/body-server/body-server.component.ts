import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSFile} from '@anyopsos/lib-types';

import {AnyOpsOSAppSftpService} from '../../../services/anyopsos-app-sftp.service';
import {AnyOpsOSAppSftpServerService} from '../../../services/anyopsos-app-sftp-server.service';
import {SftpConnection} from '../../../types/sftp-connection';

@Component({
  selector: 'sasftp-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class BodyServerComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;
  loadingData: boolean;

  currentPath: string;
  currentData: Array<AnyOpsOSFile>;

  viewAsList: boolean;
  search: { filename: string; } = null;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  constructor(private FileSystem: AnyOpsOSLibFileSystemService,
              private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private Applications: AnyOpsOSLibApplicationService,
              private Sftp: AnyOpsOSAppSftpService,
              private SftpServer: AnyOpsOSAppSftpServerService) {
  }

  ngOnInit(): void {

    // Listen for refreshPath call
    this.FileSystemUi.getObserverRefreshPath()
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => {
        if (path === this.currentPath) this.reloadPath();
      });

    // Is loading data from Backend?
    this.SftpServer.getObserverLoadingData()
      .pipe(takeUntil(this.destroySubject$)).subscribe((loadingData: boolean) => this.loadingData = loadingData);

    // Listen for currentPath change
    this.SftpServer.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentPath = path);

    // Listen for currentData change
    this.SftpServer.currentData
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: AnyOpsOSFile[]) => {
        this.currentData = data;
        this.resetActive();
      });

    // Listen for viewAsList change
    this.SftpServer.viewAsList
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: boolean) => this.viewAsList = data);

    // Listen for search change
    this.SftpServer.search
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { filename: string; }) => this.search = data);

    // Listen for activeConnection change
    this.Sftp.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe(activeConnectionUuid => this.activeConnection = activeConnectionUuid);

    /**
     * Initialize root path
     */
    this.goToPath('/');
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
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
    if (!this.getActiveConnection()) return;

    this.SftpServer.reloadPath(this.getActiveConnection().uuid);
  }

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
      application: 'sftp#server',
      path
    });
  }
}

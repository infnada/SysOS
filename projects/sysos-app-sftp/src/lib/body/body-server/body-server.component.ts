import {Component, Input, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysosLibApplicationService, Application} from '@sysos/lib-application';
import {SysOSFile} from '@sysos/lib-types';

import {SysosAppSftpService} from '../../services/sysos-app-sftp.service';
import {SysosAppSftpServerService} from '../../services/sysos-app-sftp-server.service';
import {SftpConnection} from '../../types/sftp-connection';

@Component({
  selector: 'sasftp-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss'],
  providers: [SysosLibSelectableService]
})
export class BodyServerComponent implements OnInit {
  @Input() application: Application;

  reloadPathSubscription: Subscription;

  currentPath: string;
  currentData: Array<SysOSFile>;
  viewAsList: boolean;
  search: { filename: string } = null;
  activeConnection: string;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  constructor(private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private Applications: SysosLibApplicationService,
              private Sftp: SysosAppSftpService,
              private SftpServer: SysosAppSftpServerService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.SftpServer.currentPath.subscribe(path => this.currentPath = path);
    this.SftpServer.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.SftpServer.viewAsList.subscribe(data => this.viewAsList = data);
    this.SftpServer.search.subscribe(data => this.search = data);
    this.Sftp.activeConnection.subscribe(connection => this.activeConnection = connection);

    this.goToPath('/');
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

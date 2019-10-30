import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@sysos/lib-application';
import {SysOSFile} from '@sysos/lib-types';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';

import {SysosAppSftpService} from '../../services/sysos-app-sftp.service';
import {SysosAppSftpServerService} from '../../services/sysos-app-sftp-server.service';
import {SftpConnection} from '../../types/sftp-connection';

@Component({
  selector: 'sasftp-actions-server',
  templateUrl: './actions-server.component.html',
  styleUrls: ['./actions-server.component.scss']
})
export class ActionsServerComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  goPathBackSubscription: Subscription;
  goToPathSubscription: Subscription;

  currentPath: string;
  currentData: SysOSFile[];
  viewAsList: boolean;
  search: {filename: string} = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private FileSystemUi: SysosLibFileSystemUiService,
              private Sftp: SysosAppSftpService,
              private SftpServer: SysosAppSftpServerService) {

    this.goPathBackSubscription = this.SftpServer.getObserverGoPathBack().pipe(takeUntil(this.destroySubject$)).subscribe(() => {
      this.goPathBack();
    });

    this.goToPathSubscription = this.FileSystemUi.getObserverGoToPath().pipe(takeUntil(this.destroySubject$)).subscribe((data) => {
      if (data.application === 'sftp#server') this.goToPath(data.path);
    });
  }

  ngOnInit(): void {
    this.SftpServer.currentPath.pipe(takeUntil(this.destroySubject$)).subscribe(path => this.currentPath = path);
    this.SftpServer.currentData.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.currentData = data);
    this.SftpServer.viewAsList.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.viewAsList = data);
    this.SftpServer.search.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.search = data);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.currentPath, '.window--sftp .window__main', 'linux', { connection: this.getActiveConnection()});
  }

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.SftpServer.toggleView();
  }

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.SftpServer.reloadPath(this.getActiveConnection().uuid, newPath);
    this.searchChange(null);
  }

  /**
   * Checks the last visited path and go to it
   */
  goPathBack(): void {
    if (this.lastPath.length === 0) return;
    const newPath = this.lastPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.nextPath.push(this.currentPath);

    this.reloadPath(newPath);
  }

  /**
   * If called goPathBack this function goes a path forward
   */
  goPathForward(): void {
    if (this.nextPath.length === 0) return;
    const newPath = this.nextPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.lastPath.push(this.currentPath);

    this.reloadPath(newPath);
  }

  /**
   * Go to any folders by a given path
   */
  goToPath(path: string|number): void {
    const newPath = (typeof path === 'string' ? path : this.currentPath.split('/').splice(0, path + 1).join('/') + '/');

    // Push the actual path to lastPath array (used by goPathBack()) when currentPath exists.
    // This happens when the application is opened for 1st time.
    if (typeof this.currentPath !== 'undefined') this.lastPath.push(this.currentPath);

    // Reset nextPath
    this.nextPath = [];

    this.reloadPath(newPath);
  }

  searchChange(event: string): void {
    this.SftpServer.setSearch(event);
  }
}

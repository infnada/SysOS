import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSAppSftpService} from '../../../services/anyopsos-app-sftp.service';
import {AnyOpsOSAppSftpServerService} from '../../../services/anyopsos-app-sftp-server.service';
import {SftpConnection} from '../../../types/sftp-connection';

@Component({
  selector: 'sasftp-actions-server',
  templateUrl: './actions-server.component.html',
  styleUrls: ['./actions-server.component.scss']
})
export class ActionsServerComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  private lastPath: string[] = [];
  private nextPath: string[] = [];

  currentPath: string;
  search: {filename: string} = null;

  constructor(private FileSystemUi: AnyOpsOSLibFileSystemUiService,
              private Sftp: AnyOpsOSAppSftpService,
              private SftpServer: AnyOpsOSAppSftpServerService) {
  }

  ngOnInit(): void {

    // Listen for goToPath calls
    this.FileSystemUi.getObserverGoToPath()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { application: string; path: string; }) => {
        if (data.application === 'sftp#server') this.goToPath(data.path);
      });

    // Listen for goPathBack calls
    this.SftpServer.getObserverGoPathBack()
      .pipe(takeUntil(this.destroySubject$)).subscribe(() => this.goPathBack());

    // Listen for currentPath change
    this.SftpServer.currentPath
      .pipe(takeUntil(this.destroySubject$)).subscribe((path: string) => this.currentPath = path);

    // Listen for search change
    this.SftpServer.search
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: { filename: string; }) => this.search = data);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.currentPath, '.window--sftp .window__main', 'linux', {connection: this.getActiveConnection()});
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
  goToPath(path: string | number): void {
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

  // TODO
  getSshShell() {

  }
}

import {Component, Input, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {Application} from '@sysos/lib-application';
import {SysOSFile} from '@sysos/lib-types';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';

import {SysosAppSftpLocalService} from '../../services/sysos-app-sftp-local.service';

@Component({
  selector: 'sasftp-actions-local',
  templateUrl: './actions-local.component.html',
  styleUrls: ['./actions-local.component.scss']
})
export class ActionsLocalComponent implements OnInit {
  @Input() application: Application;

  goPathBackSubscription: Subscription;
  goToPathSubscription: Subscription;

  currentPath: string;
  currentData: SysOSFile[];
  viewAsList: boolean;
  search: {filename: string} = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private FileSystemUi: SysosLibFileSystemUiService,
              private SftpLocal: SysosAppSftpLocalService) {

    this.goPathBackSubscription = this.SftpLocal.getObserverGoPathBack().subscribe(() => {
      this.goPathBack();
    });

    this.goToPathSubscription = this.FileSystemUi.getObserverGoToPath().subscribe((data) => {
      if (data.application === 'sftp#local') this.goToPath(data.path);
    });
  }

  ngOnInit(): void {
    this.SftpLocal.currentPath.subscribe(path => this.currentPath = path);
    this.SftpLocal.currentData.subscribe(data => this.currentData = data);
    this.SftpLocal.viewAsList.subscribe(data => this.viewAsList = data);
    this.SftpLocal.search.subscribe(data => this.search = data);
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.currentPath, '.window--sftp .window__main');
  }

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.SftpLocal.toggleView();
  }

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.SftpLocal.reloadPath(newPath);
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
    this.SftpLocal.setSearch(event);
  }
}

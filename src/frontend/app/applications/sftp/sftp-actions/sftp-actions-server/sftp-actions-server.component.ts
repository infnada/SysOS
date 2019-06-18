import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Application} from '../../../../interfaces/application';
import {SysOSFile} from '../../../../interfaces/file';
import {FileSystemUiService} from '../../../../services/file-system-ui.service';
import {SftpServerService} from '../../services/sftp-server.service';
import {SftpConnection} from '../../SftpConnection';
import {SftpService} from '../../services/sftp.service';

@Component({
  selector: 'app-sftp-actions-server',
  templateUrl: './sftp-actions-server.component.html',
  styleUrls: ['./sftp-actions-server.component.scss']
})
export class SftpActionsServerComponent implements OnInit {
  @Input() application: Application;

  goPathBackSubscription: Subscription;
  goToPathSubscription: Subscription;

  currentPath: string;
  currentData: SysOSFile[];
  viewAsList: boolean;
  search: {filename: string} = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private FileSystemUi: FileSystemUiService,
              private Sftp: SftpService,
              private SftpServer: SftpServerService) {

    this.goPathBackSubscription = this.SftpServer.getObserverGoPathBack().subscribe(() => {
      this.goPathBack();
    });

    this.goToPathSubscription = this.FileSystemUi.getObserverGoToPath().subscribe((data) => {
      if (data.application === 'sftp#server') this.goToPath(data.path);
    });
  }

  ngOnInit(): void {
    this.SftpServer.currentPath.subscribe(path => this.currentPath = path);
    this.SftpServer.currentData.subscribe(data => this.currentData = data);
    this.SftpServer.viewAsList.subscribe(data => this.viewAsList = data);
    this.SftpServer.search.subscribe(data => this.search = data);
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.getActiveConnection(), this.currentPath, '.window--sftp .window__main');
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

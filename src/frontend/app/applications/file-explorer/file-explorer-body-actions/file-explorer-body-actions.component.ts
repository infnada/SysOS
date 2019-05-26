import {Component, Input, OnInit} from '@angular/core';

import {FileSystemUiService} from "../../../services/file-system-ui.service";
import {FileExplorerService} from "../file-explorer.service";

import {Application} from "../../../interfaces/application";
import {SysOSFile} from "../../../interfaces/file";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-file-explorer-body-actions',
  templateUrl: './file-explorer-body-actions.component.html',
  styleUrls: ['./file-explorer-body-actions.component.scss']
})
export class FileExplorerBodyActionsComponent implements OnInit {
  @Input() application: Application;

  goPathBackSubscription: Subscription;
  goToPathSubscription: Subscription;

  currentPath: string;
  currentData: SysOSFile[];
  viewAsList: boolean;
  search: {filename: string} = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private FileSystemUiService: FileSystemUiService,
              private FileExplorerService: FileExplorerService) {

    this.goPathBackSubscription = this.FileExplorerService.getObserverGoPathBack().subscribe(() => {
      this.goPathBack();
    });

    this.goToPathSubscription = this.FileSystemUiService.getObserverGoToPath().subscribe((data) => {
      if (data.application === 'file-explorer') this.goToPath(data.path);
    });
  }

  ngOnInit(): void {
    this.FileExplorerService.currentPath.subscribe(path => this.currentPath = path);
    this.FileExplorerService.currentData.subscribe(data => this.currentData = data);
    this.FileExplorerService.viewAsList.subscribe(data => this.viewAsList = data);
    this.FileExplorerService.search.subscribe(data => this.search = data);
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUiService.UIcreateFolder(this.currentPath, '.window--file-explorer .window__main');
  };

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.FileExplorerService.toggleView();
  };

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.FileExplorerService.reloadPath(newPath);
    this.searchChange(null);
  };

  /**
   * Checks the last visited path and go to it
   */
  goPathBack(): void {
    console.log();
    if (this.lastPath.length === 0) return;
    let newPath = this.lastPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.nextPath.push(this.currentPath);

    this.reloadPath(newPath);
  };

  /**
   * If called goPathBack this function goes a path forward
   */
  goPathForward(): void {
    if (this.nextPath.length === 0) return;
    let newPath = this.nextPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.lastPath.push(this.currentPath);

    this.reloadPath(newPath);
  };

  /**
   * Go to any folders by a given path
   */
  goToPath(path: string|number): void {
    let newPath = (typeof path === 'string' ? path : this.currentPath.split('/').splice(0, path + 1).join('/') + '/');

    // Push the actual path to lastPath array (used by goPathBack()) when currentPath exists. This happens when the application is opened for 1st time.
    if (typeof this.currentPath !== 'undefined') this.lastPath.push(this.currentPath);

    // Reset nextPath
    this.nextPath = [];

    this.reloadPath(newPath);
  }

  searchChange(event: string): void {
    this.FileExplorerService.setSearch(event);
  }

}

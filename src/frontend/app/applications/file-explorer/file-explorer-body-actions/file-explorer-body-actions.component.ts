import {Component, Input, OnInit} from '@angular/core';

import {FileSystemService} from "../../../services/file-system.service";
import {FileExplorerService} from "../file-explorer.service";

import {Application} from "../../../interfaces/application";
import {File} from "../../../interfaces/file";
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
  currentData: Array<File>;

  search: string = null;
  viewAsList: boolean = false;
  lastPath: Array<string> = [];
  nextPath: Array<string> = [];

  constructor(private FileSystemService: FileSystemService,
              private FileExplorerService: FileExplorerService) {

    this.goPathBackSubscription = this.FileExplorerService.getObserverGoPathBack().subscribe(() => {
      this.goPathBack();
    });

    this.goToPathSubscription = this.FileExplorerService.getObserverGoToPath().subscribe((path) => {
      this.goToPath(path);
    });
  }

  ngOnInit(): void {
    this.FileExplorerService.currentPath.subscribe(path => this.currentPath = path);
    this.FileExplorerService.currentData.subscribe(data => this.currentData = data);
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemService.UIcreateFolder(this.currentPath, '.window--file-explorer .window__main');
  };

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.viewAsList = !this.viewAsList;
  };

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.FileExplorerService.reloadPath(newPath);
    this.search = undefined;
  };

  /**
   * Checks the last visited path and go to it
   */
  goPathBack(): void {
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

    // Push the actual path to lastPath array (used by goPathBack())
    this.lastPath.push(this.currentPath);
    // Reset nextPath
    this.nextPath = [];

    this.reloadPath(newPath);
  }

}

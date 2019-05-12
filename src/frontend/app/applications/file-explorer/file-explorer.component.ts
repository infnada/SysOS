import { Component, OnInit, Input } from '@angular/core';

import {Subscription} from "rxjs";

import {FileSystemService} from "../../services/file-system.service";

import {Application} from "../../interfaces/application";
import {File} from "../../interfaces/file";


@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {
  @Input() application: Application;

  reloadPathSubscription: Subscription;

  currentActive: number = 0;
  pathFiles: { currentPath: string, currentData: Array<File> } = {
    currentPath: '/',
    currentData: []
  };

  constructor(private FileSystemService: FileSystemService) {

    console.log(1);

    this.reloadPathSubscription = this.FileSystemService.getRefreshPath().subscribe(path => {
      if (path === this.pathFiles.currentPath) this.reloadPath();
    });

  }

  ngOnInit() {
    console.log(2);
    this.reloadPath();
  }

  /**
   * Get current path data
   */
  private reloadPath(): void {
    this.FileSystemService.getFileSystemPath(this.pathFiles.currentPath).subscribe(
      (res: Array<any>) => {
        this.pathFiles.currentData = res;
        this.resetActive();
      },
      error => {
        console.error('Desktop -> Error while getting fileSystemPath -> ', error);
        console.error(error);
      });
  };

  /**
   * Sets the fist item in the current path as active
   */
  private resetActive(): void {
    this.currentActive = 0;
    // TODO: $('#desktop_body').focus();
  };

}

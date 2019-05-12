import {Component, Input, OnInit} from '@angular/core';

import {Application} from "../../../interfaces/application";
import {FileSystemService} from "../../../services/file-system.service";

@Component({
  selector: 'app-file-explorer-body-actions',
  templateUrl: './file-explorer-body-actions.component.html',
  styleUrls: ['./file-explorer-body-actions.component.scss']
})
export class FileExplorerBodyActionsComponent implements OnInit {
  @Input() application: Application;

  constructor(private FileSystemService: FileSystemService) { }

  ngOnInit() {
  }

  /**
   * Creates a new folder
   */
  createFolder() {
    /*var modalInstanceCreateFolder = modalFactory.openRegistredModal('input', '.window--fileexplorer .window__main',
      {
        title: function () {
          return 'Create new folder';
        },
        text: function () {
          return 'Folder name';
        },
        button_text: function () {
          return 'Create';
        },
        inputValue: function () {
          return 'NewFolder';
        }
      }
    );
    modalInstanceCreateFolder.result.then(function (res) {

      if (!res) return;

      return fileSystemFactory.createFolder(_this.localFileSystem.currentPath, res, function () {

        $rootScope.$broadcast('refreshPath', _this.localFileSystem.currentPath);

      }).catch(function (e) {
        console.log(e);
      });
    });*/
  };

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView() {
    this.viewAsList = !this.viewAsList;
    this.resetActive();
  };

  /**
   * Checks the last visited path and go to it
   */
  goPathBack() {
    if (this.lastPath.length === 0) return;
    let newPath = this.lastPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.nextPath.push(this.localFileSystem.currentPath);

    this.getFolderContents(newPath);
  };

  /**
   * If called goPathBack this function goes a path forward
   */
  goPathForward() {
    if (this.nextPath.length === 0) return;
    let newPath = this.nextPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.lastPath.push(this.localFileSystem.currentPath);

    this.getFolderContents(newPath);
  };

  /**
   * Get current path data
   */
  reloadPath() {
    this.FileSystemService.getFileSystemPath(this.localFileSystem.currentPath).subscribe(
      (res: Array<any>) => {
        this.search = undefined;
        this.localFileSystem.currentData = data;
        this.resetActive();
      },
      error => {
        console.error('Desktop -> Error while getting fileSystemPath -> ', error);
        console.error(error);
      });

  };

  /**
   * Go to any folders by a given path
   */
  goToPath($index) {
    let newPath = this.localFileSystem.currentPath.split('/').splice(0, $index + 1).join('/') + '/';

    // Push the actual path to lastPath array (used by goPathBack())
    this.lastPath.push(this.localFileSystem.currentPath);
    // Reset nextPath
    this.nextPath = [];

    _this.getFolderContents(newPath);
  }

}

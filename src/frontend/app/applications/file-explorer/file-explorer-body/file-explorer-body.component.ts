import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Subscription} from "rxjs";
import {MatMenuTrigger} from '@angular/material';

import Selectable from 'selectable.js';

import {FileSystemService} from "../../../services/file-system.service";

import {Application} from "../../../interfaces/application";
import {File} from "../../../interfaces/file";
import {ContextMenuItem} from "../../../interfaces/context-menu-item";

@Component({
  selector: 'app-file-explorer-body',
  templateUrl: './file-explorer-body.component.html',
  styleUrls: ['./file-explorer-body.component.scss']
})
export class FileExplorerBodyComponent implements OnInit, AfterViewInit {
  @Input() application: Application;
  @ViewChild('selectableContainer') selectableContainer: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenuBody: MatMenuTrigger;

  contextMenuPosition = {x: '0px', y: '0px'};

  reloadPathSubscription: Subscription;
  selectable: Selectable;

  search: string;
  viewAsList: boolean = false;
  currentActive: number = 0;
  pathFiles: { currentPath: string, currentData: Array<File> } = {
    currentPath: '/',
    currentData: []
  };

  onBodyContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuBody.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem): boolean {
    if (item.disabled) return item.disabled();
    return false;
  }

  contextToText(item: ContextMenuItem, file?: File): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  bodyContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: '<i class="fa fa-download"></i> Download from URL to current folder', action: () => {
        this.UIdownloadFromURL();
      }
    },
    {
      id: 2, text: '<i class="fa fa-folder"></i> Create Folder', action: () => {
        this.UIcreateFolder();
      }
    },
    {id: 3, text: 'divider'},
    {
      id: 4, text: '<i class="fa fa-refresh"></i> Refresh', action: () => {
        this.reloadPath();
      }
    },
    {id: 5, text: 'divider'},
    {
      id: 6, text: '<i class="fa fa-clipboard"></i> Paste', action: () => {
        this.UIpasteFile();
      }, disabled: () => {
        return this.copyFrom === null && this.cutFrom === null;
      }
    },
    {id: 7, text: 'divider'},
    {
      id: 8, text: '<i class="fa fa-lock"></i> Permissions', action: () => {
        //TODO
      }
    }
  ];

  constructor(private FileSystemService: FileSystemService) {
    this.reloadPathSubscription = this.FileSystemService.getRefreshPath().subscribe(path => {
      if (path === this.pathFiles.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.reloadPath();
  }

  ngAfterViewInit() {
    this.selectable = new Selectable({
      appendTo: this.selectableContainer.nativeElement,
      ignore: "a"
    });
  }

  /**
   * Sets the fist item in the current path as active
   */
  private resetActive(): void {
    this.currentActive = 0;
    // TODO: $('#desktop_body').focus();
  };

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
   * On file dragstart
   *
   * @param evt
   * @param ui
   */
  /*this.onStartItem = function (evt, ui) {
    ui.helper.prevObject.scope().$parent.file.dragFrom = _this.localFileSystem.currentPath;
  };*/

  /**
   * On file dropped to desktop
   *
   * @param evt
   * @param ui
   * @returns {*}
   */
  /*this.onDropItem = function (evt, ui) {
    if ($rootScope.currentFileDrop !== 'fileexplorer') return;

    // Fix drop from /root/Desktop
    if (angular.isUndefined(ui.draggable.scope().$parent.file)) ui.draggable.scope().$parent.file = ui.draggable.scope().file;

    // Do not move files to same directory
    if (ui.draggable.scope().$parent.file.dragFrom === _this.localFileSystem.currentPath) return;

    var object = $filter('filter')(_this.localFileSystem.currentData, {
      filename: ui.draggable.scope().$parent.file.filename
    });

    if (object.length !== 0) {
      return modalFactory.openLittleModal('Move file', 'A file with the same name already exists. Can\'t move it.', '.window--fileexplorer .window__main', 'plain');
    }

    _this.cutFrom = ui.draggable.scope().$parent.file.dragFrom + ui.draggable.scope().$parent.file.filename;
    _this.pasteTo = _this.localFileSystem.currentPath;

    return fileSystemFactory.moveFile(_this.cutFrom, _this.pasteTo, function () {
      _this.cutFrom = null;
      _this.pasteTo = null;

      $rootScope.$broadcast('refreshPath', _this.localFileSystem.currentPath);
      $rootScope.$broadcast('refreshPath', ui.helper.prevObject.scope().$parent.file.dragFrom);
    });
  };*/

  UIdownloadFromURL() {
    this.FileSystemService.UIdownloadFromURL(this.desktopFiles.currentPath);
  };

  UIcreateFolder() {
    this.FileSystemService.UIcreateFolder(this.desktopFiles.currentPath);
  };

  UIpasteFile() {
    this.FileSystemService.UIpasteFile(this.desktopFiles.currentPath);
  }

  setNewPath(path: string): void {
    this.pathFiles.currentPath = path;
    this.reloadPath();
  }

  toggleList($event: Event): void {

    angular.element($event.currentTarget.parentElement.parentElement).toggleClass('side__list--open');

    angular.element($event.currentTarget.parentElement.nextElementSibling).animate({
      'height': 'toggle',
      'opacity': 'toggle',
      'display': 'toggle'
    }, 250);
  };

  /**
   * Sets an item file/folder active
   */
  setCurrentActive($index: number): void {
    //TODO $('#desktop_body').focus();
    //$timeout.cancel(this.selectTimeout);

    if ($index > this.pathFiles.currentData.length - 1) {
      this.currentActive = 0;
    } else if ($index < 0) {
      this.currentActive = this.pathFiles.currentData.length - 1;
    } else {
      this.currentActive = $index;
    }

    this.selectable.clear();
    /*this.selectTimeout = $timeout(() => {
      this.selection = true;
    }, 100);*/
  };

  setCurrentFileDrop(app: string) {
    this.currentFileDrop = app;
  }

  handleBodyClick($event): void {

    // TODO
    if ($event.target.attributes.id !== undefined && $event.target.attributes.id.value === 'local_body') {
      _this.currentActive = null;
    }

  };

  /**
   * Keypress on item focus
   */
  /**
   * Keypress on item focus
   */
  handleItemKeyPress(keyEvent): void {
    // Do nothing if some application is active
    if (this.taskbar__item_open !== 'file-explorer') return;

    // Do nothing if there is no active item unless its side arrows
    if (this.currentActive === null && keyEvent.which !== 39 && keyEvent.which === 37) return;

    if (keyEvent.which === 46) {
      let currentFile = this.desktopFiles.currentData[this.currentActive];

      this.UIdeleteSelected(currentFile);
    } else if (keyEvent.which === 113) {
      let currentFile = this.desktopFiles.currentData[this.currentActive];

      this.UIrenameFile(currentFile);
    } else if (keyEvent.which === 39) {

      if (this.currentActive === null) {
        this.currentActive = 0;
      } else {
        this.setCurrentActive(this.currentActive + 1);
      }

    } else if (keyEvent.which === 37) {

      if (this.currentActive === null) {
        this.currentActive = 0;
      } else {
        this.setCurrentActive(this.currentActive - 1);
      }

    } else if (keyEvent.which === 13) {
      let currentFile = this.desktopFiles.currentData[this.currentActive];

      this.UIdoWithFile(currentFile);
    } else if (keyEvent.which === 8) {
      this.goPathBack();
    }
  };

}

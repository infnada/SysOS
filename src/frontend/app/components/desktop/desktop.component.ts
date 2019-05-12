import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

import Selectable from 'selectable.js';

import {FileSystemService} from "../../services/file-system.service";
import {ApplicationsService} from "../../services/applications.service"

import {ContextMenuItem} from "../../interfaces/context-menu-item";
import {Application} from "../../interfaces/application";
import {File} from "../../interfaces/file";

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit, AfterViewInit {
  @ViewChild(MatMenuTrigger) contextMenuDesktop: MatMenuTrigger;
  @ViewChild('selectableContainer') selectableContainer: ElementRef;

  contextMenuPosition = {x: '0px', y: '0px'};

  reloadPathSubscription: Subscription;

  openedApplications: Application[];
  taskbar__item_open: string;

  copyFrom: string = null;
  cutFrom: string = null;
  pasteTo: string = null;

  selectable: Selectable;

  currentFileDrop: string;
  currentActive: number = 0;
  desktopFiles: { currentPath: string, currentData: Array<File> } = {
    currentPath: '/root/Desktop/',
    currentData: []
  };

  onDesktopContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuDesktop.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem): boolean {
    if (item.disabled) return item.disabled();
    return false;
  }

  contextToText(item: ContextMenuItem, file?: File): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  desktopContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: '<i class="fa fa-download"></i> Download from URL to Desktop', action: () => {
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

  constructor(private toastr: ToastrService,
              private FileSystemService: FileSystemService,
              private ApplicationsService: ApplicationsService) {

    this.reloadPathSubscription = this.FileSystemService.getRefreshPath().subscribe(path => {
      if (path === '/root/Desktop/') this.reloadPath();
    });
  }

  ngOnInit() {
    this.ApplicationsService.openedApplications.subscribe(applications => this.openedApplications = applications);
    this.ApplicationsService.taskbar__item_open.subscribe(application => this.taskbar__item_open = application);
    this.reloadPath();
  }

  ngAfterViewInit() {
    this.selectable = new Selectable({
      appendTo: this.selectableContainer.nativeElement,
      ignore: "a"
    });

    /*this.selectable.on('start', (e, item) => {
      console.log(e);
      console.log(item);
    })*/
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
    this.FileSystemService.getFileSystemPath(this.desktopFiles.currentPath).subscribe(
      (res: Array<any>) => {
        this.desktopFiles.currentData = res;
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
  onStartItem(evt, ui): void {
    ui.helper.prevObject.scope().file.dragFrom = '/root/Desktop/';
  };

  /**
   * On file dropped to desktop
   *
   * @param evt
   * @param ui
   * @returns {*}
   */

  /*onDropItem(evt, ui) {
    if ($rootScope.currentFileDrop !== 'desktop') return;

    // Fix drop from /root/Desktop
    if (angular.isUndefined(ui.draggable.scope().$parent.file)) ui.draggable.scope().$parent.file = ui.draggable.scope().file;

    // Do not move files to same directory
    if (ui.draggable.scope().$parent.file.dragFrom === '/root/Desktop/') return;

    var object = $filter('filter')(this.desktopFiles.currentData, {
      filename: ui.draggable.scope().$parent.file.filename
    });

    if (object.length !== 0) {
      return modalFactory.openLittleModal('Move file', 'A file with the same name already exists. Can\'t move it.', '#desktop_body', 'plain');
    }

    this.cutFrom = ui.draggable.scope().$parent.file.dragFrom + ui.draggable.scope().$parent.file.filename;
    this.pasteTo = '/root/Desktop/';

    return this.FileSystemService.moveFile(this.cutFrom, this.pasteTo).subscribe(
      (res: {}) => {
        this.cutFrom = null;
        this.pasteTo = null;

        $rootScope.$broadcast('refreshPath', '/root/Desktop/');
        $rootScope.$broadcast('refreshPath', ui.draggable.scope().$parent.file.dragFrom);
      },
      error => {
        console.error('Desktop -> Error while moving file -> ', error);
        console.error(error);
      });
  };*/

  getFileType(longname: string): string {
    return this.FileSystemService.getFileType(longname);
  };

  UIdownloadFromURL() {
    this.FileSystemService.UIdownloadFromURL(this.desktopFiles.currentPath);
  };

  UIcreateFolder() {
    this.FileSystemService.UIcreateFolder(this.desktopFiles.currentPath);
  };

  UIrenameFile(file: File) {
    this.FileSystemService.UIrenameFile(this.desktopFiles.currentPath, file);
  };

  UIdeleteSelected(file: File) {
    this.FileSystemService.UIdeleteSelected(this.desktopFiles.currentPath, file);
  };

  UIpasteFile() {
    this.FileSystemService.UIpasteFile(this.desktopFiles.currentPath);
  }

  UIdoWithFile(file: File) {
    this.FileSystemService.UIdoWithFile(this.desktopFiles.currentPath, file);
  }

  /**
   * ng-click functions
   */
  handleDesktopClick($event): void {

    if ($event.target.attributes.id !== undefined && $event.target.attributes.id.value === 'desktop_body') {
      this.ApplicationsService.toggleApplication(null);
      this.currentActive = null;
    }

  };

  /**
   * Sets an item file/folder active
   */
  setCurrentActive($index: number): void {
    //TODO $('#desktop_body').focus();
    //$timeout.cancel(this.selectTimeout);

    if ($index > this.desktopFiles.currentData.length - 1) {
      this.currentActive = 0;
    } else if ($index < 0) {
      this.currentActive = this.desktopFiles.currentData.length - 1;
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


  /**
   * Keypress on item focus
   */
  handleItemKeyPress(keyEvent): void {
    // Do nothing if some application is active
    if (this.taskbar__item_open !== null) return;

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
    }
  };

}

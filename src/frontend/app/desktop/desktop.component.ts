import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';

import {Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';

import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {Application, SysosLibApplicationService} from '@sysos/lib-application';

import {ContextMenuItem, SysOSFile} from '@sysos/lib-types';

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
  taskbarItemOpen: string;

  copyFrom: string;
  cutFrom: string;

  currentActive: number = 0;
  desktopFiles: { currentPath: string, currentData: Array<SysOSFile> } = {
    currentPath: '/root/Desktop/',
    currentData: []
  };

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
        // TODO
      }
    }
  ];

  constructor(private logger: NGXLogger,
              public Selectable: SysosLibSelectableService,
              private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private Applications: SysosLibApplicationService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === '/root/Desktop/') this.reloadPath();
    });
  }

  ngOnInit() {
    this.Applications.openedApplications.subscribe(applications => this.openedApplications = applications);
    this.Applications.taskbarItemOpen.subscribe(application => this.taskbarItemOpen = application);

    this.FileSystemUi.copyFrom.subscribe(path => this.copyFrom = path);
    this.FileSystemUi.cutFrom.subscribe(path => this.cutFrom = path);

    this.reloadPath();
  }

  ngAfterViewInit() {
    this.Selectable.init({
      appendTo: this.selectableContainer,
      ignore: 'a'
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
  }

  /**
   * Get current path data
   */
  private reloadPath(): void {
    this.FileSystem.getFileSystemPath(null, this.desktopFiles.currentPath).subscribe(
      (res: { data: SysOSFile[] }) => {
        this.desktopFiles.currentData = res.data;
        this.resetActive();
      },
      error => {
        this.logger.error('Desktop -> Error while getting fileSystemPath -> ', error);
      });
  }

  /**
   * context-menu
   */
  onDesktopContextMenu(event: MouseEvent): void {
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuDesktop.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem): boolean {
    if (item.disabled) return item.disabled();
    return false;
  }

  contextToText(item: ContextMenuItem, file?: SysOSFile): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  /**
   * On file dragstart
   */
  onDragStart(): void {
    this.FileSystemUi.setCurrentFileDrag('/root/Desktop/');
  }

  UIonDropItem($event): void {
    this.FileSystemUi.UIonDropItem('desktop', $event, this.desktopFiles.currentPath);
  }

  UIdownloadFromURL(): void {
    this.FileSystemUi.UIdownloadFromURL(null, this.desktopFiles.currentPath, '.desktop .desktop__body');
  }

  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(null, this.desktopFiles.currentPath, '.desktop .desktop__body');
  }

  UIrenameFile(file: SysOSFile): void {
    this.FileSystemUi.UIrenameFile(null, this.desktopFiles.currentPath, file, '.desktop .desktop__body');
  }

  UIdeleteSelected(file: SysOSFile): void {
    this.FileSystemUi.UIdeleteSelected(null, this.desktopFiles.currentPath, file, '.desktop .desktop__body');
  }

  UIpasteFile(): void {
    this.FileSystemUi.UIpasteFile(null, this.desktopFiles.currentPath);
  }

  UIdoWithFile(file: SysOSFile): void {
    this.FileSystemUi.UIdoWithFile('file-explorer', this.desktopFiles.currentPath, file);
  }

  /**
   * ng-click functions
   */
  handleDesktopClick($event): void {

    if ($event.target.attributes.id !== undefined && $event.target.attributes.id.value === 'desktop_body') {
      this.Applications.toggleApplication(null);
      this.currentActive = null;
    }

  }

  /**
   * Sets an item file/folder active
   */
  setCurrentActive($index: number): void {
    // TODO $('#desktop_body').focus();
    // $timeout.cancel(this.selectTimeout);

    if ($index > this.desktopFiles.currentData.length - 1) {
      this.currentActive = 0;
    } else if ($index < 0) {
      this.currentActive = this.desktopFiles.currentData.length - 1;
    } else {
      this.currentActive = $index;
    }

    this.Selectable.clear();
    /*this.selectTimeout = $timeout(() => {
      this.selection = true;
    }, 100);*/
  }

  setCurrentHoverApplication(): void {
    this.Applications.setCurrentHoverApplication('desktop');
  }

  /**
   * Keypress on item focus
   */
  handleItemKeyPress(keyEvent: KeyboardEvent): void {
    // Do nothing if some application is active
    if (this.taskbarItemOpen !== null) return;

    // Do nothing if there is no active item unless its side arrows
    if (this.currentActive === null && keyEvent.code !== 'ArrowLeft' && keyEvent.code === 'ArrowRight') return;

    if (keyEvent.code === 'Delete') {
      const currentFile = this.desktopFiles.currentData[this.currentActive];

      this.UIdeleteSelected(currentFile);
    } else if (keyEvent.code === 'F2') {
      const currentFile = this.desktopFiles.currentData[this.currentActive];

      this.UIrenameFile(currentFile);
    } else if (keyEvent.code === 'ArrowRight') {

      if (this.currentActive === null) {
        this.currentActive = 0;
      } else {
        this.setCurrentActive(this.currentActive + 1);
      }

    } else if (keyEvent.code === 'ArrowLeft') {

      if (this.currentActive === null) {
        this.currentActive = 0;
      } else {
        this.setCurrentActive(this.currentActive - 1);
      }

    } else if (keyEvent.code === 'Enter') {
      const currentFile = this.desktopFiles.currentData[this.currentActive];

      this.UIdoWithFile(currentFile);
    }
  }

}

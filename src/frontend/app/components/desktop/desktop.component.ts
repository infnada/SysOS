import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

import Selectable from 'selectable.js';

import {FileSystemService} from '../../services/file-system.service';
import {FileSystemUiService} from '../../services/file-system-ui.service';
import {ApplicationsService} from '../../services/applications.service';

import {ContextMenuItem} from '../../interfaces/context-menu-item';
import {Application} from '../../interfaces/application';
import {SysOSFile} from '../../interfaces/file';

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

  copyFrom: string;
  cutFrom: string;

  selectable: Selectable;

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

  constructor(private toastr: ToastrService,
              private FileSystemService: FileSystemService,
              private FileSystemUiService: FileSystemUiService,
              private ApplicationsService: ApplicationsService) {

    this.reloadPathSubscription = this.FileSystemUiService.getRefreshPath().subscribe(path => {
      if (path === '/root/Desktop/') this.reloadPath();
    });
  }

  ngOnInit() {
    this.ApplicationsService.openedApplications.subscribe(applications => this.openedApplications = applications);
    this.ApplicationsService.taskbar__item_open.subscribe(application => this.taskbar__item_open = application);

    this.FileSystemUiService.copyFrom.subscribe(path => this.copyFrom = path);
    this.FileSystemUiService.cutFrom.subscribe(path => this.cutFrom = path);

    this.reloadPath();
  }

  ngAfterViewInit() {
    this.selectable = new Selectable({
      appendTo: this.selectableContainer.nativeElement,
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
    this.FileSystemService.getFileSystemPath(null, this.desktopFiles.currentPath).subscribe(
      (res: Array<any>) => {
        this.desktopFiles.currentData = res;
        this.resetActive();
      },
      error => {
        console.error('Desktop -> Error while getting fileSystemPath -> ', error);
        console.error(error);
      });
  }

  /**
   * On file dragstart
   */
  onDragStart(): void {
    this.FileSystemUiService.setCurrentFileDrag('/root/Desktop/');
  }

  UIonDropItem($event): void {
    this.FileSystemUiService.UIonDropItem(null, $event, this.desktopFiles.currentPath);
  }

  getFileType(longname: string): string {
    return this.FileSystemService.getFileType(longname);
  }

  UIdownloadFromURL(): void {
    this.FileSystemUiService.UIdownloadFromURL(null, this.desktopFiles.currentPath, '.desktop .desktop__body');
  }

  UIcreateFolder(): void {
    this.FileSystemUiService.UIcreateFolder(null, this.desktopFiles.currentPath, '.desktop .desktop__body');
  }

  UIrenameFile(file: SysOSFile): void {
    this.FileSystemUiService.UIrenameFile(null, this.desktopFiles.currentPath, file, '.desktop .desktop__body');
  }

  UIdeleteSelected(file: SysOSFile): void {
    this.FileSystemUiService.UIdeleteSelected(null, this.desktopFiles.currentPath, file, '.desktop .desktop__body');
  }

  UIpasteFile(): void {
    this.FileSystemUiService.UIpasteFile(null, this.desktopFiles.currentPath);
  }

  UIdoWithFile(file: SysOSFile): void {
    this.FileSystemUiService.UIdoWithFile('file-explorer', this.desktopFiles.currentPath, file);
  }

  /**
   * ng-click functions
   */
  handleDesktopClick($event): void {

    if ($event.target.attributes.id !== undefined && $event.target.attributes.id.value === 'desktop_body') {
      this.ApplicationsService.toggleApplication(null);
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

    this.selectable.clear();
    /*this.selectTimeout = $timeout(() => {
      this.selection = true;
    }, 100);*/
  }

  setCurrentHoverApplication(): void {
    this.ApplicationsService.setCurrentHoverApplication('desktop');
  }

  /**
   * Keypress on item focus
   */
  handleItemKeyPress(keyEvent: KeyboardEvent): void {
    // Do nothing if some application is active
    if (this.taskbar__item_open !== null) return;

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

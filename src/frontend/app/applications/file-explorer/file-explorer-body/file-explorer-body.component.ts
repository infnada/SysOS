import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HttpResponse, HttpEvent} from '@angular/common/http';

import {MatMenuTrigger} from '@angular/material';
import {Subscription} from 'rxjs';

import Selectable from 'selectable.js';

import {FileSystemService} from '../../../services/file-system.service';
import {FileSystemUiService} from '../../../services/file-system-ui.service';
import {ApplicationsService} from '../../../services/applications.service';
import {FileExplorerService} from '../file-explorer.service';

import {Application} from '../../../interfaces/application';
import {SysOSFile} from '../../../interfaces/file';
import {ContextMenuItem} from '../../../interfaces/context-menu-item';


@Component({
  selector: 'app-file-explorer-body',
  templateUrl: './file-explorer-body.component.html',
  styleUrls: ['./file-explorer-body.component.scss']
})
export class FileExplorerBodyComponent implements OnInit {
  @Input() application: Application;
  @ViewChild('selectableContainer') selectableContainer: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenuBody: MatMenuTrigger;

  contextMenuPosition = {x: '0px', y: '0px'};

  reloadPathSubscription: Subscription;
  selectable: Selectable;

  taskbarItemOpen: string;
  copyFrom: string;
  cutFrom: string;
  currentPath: string;
  currentData: Array<SysOSFile>;
  viewAsList: boolean;
  search: { filename: string } = null;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;
  httpEmitter: Subscription[] = [];
  httpEvent: HttpEvent<{}>;

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
        // TODO
      }
    }
  ];

  onBodyContextMenu(event: MouseEvent): void {
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuBody.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem): boolean {
    if (item.disabled) return item.disabled();
    return false;
  }

  contextToText(item: ContextMenuItem, file?: SysOSFile): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  constructor(private FileSystem: FileSystemService,
              private FileSystemUi: FileSystemUiService,
              private Applications: ApplicationsService,
              private FileExplorer: FileExplorerService) {

    this.reloadPathSubscription = this.FileSystemUi.getRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.Applications.taskbarItemOpen.subscribe(applications => this.taskbarItemOpen = applications);
    this.FileSystemUi.copyFrom.subscribe(path => this.copyFrom = path);
    this.FileSystemUi.cutFrom.subscribe(path => this.cutFrom = path);
    this.FileExplorer.currentPath.subscribe(path => this.currentPath = path);
    this.FileExplorer.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.FileExplorer.viewAsList.subscribe(data => this.viewAsList = data);
    this.FileExplorer.search.subscribe(data => this.search = data);

    this.selectable = new Selectable({
      appendTo: this.selectableContainer.nativeElement,
      ignore: 'a'
    });

    if (this.application.initData && this.application.initData.path) {
      return this.goToPath(this.application.initData.path);
    }

    this.goToPath('/');
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
    this.FileExplorer.reloadPath();
  }

  /**
   * On file dragstart
   */
  onDragStart(): void {
    this.FileSystemUi.setCurrentFileDrag(this.currentPath);
  }

  UIonDropItem($event): void {
    this.FileSystemUi.UIonDropItem(null, $event, this.currentPath);
  }

  UIdownloadFromURL(): void {
    this.FileSystemUi.UIdownloadFromURL(null, this.currentPath, '.window--file-explorer .window__main');
  }

  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(null, this.currentPath, '.window--file-explorer .window__main');
  }

  UIrenameFile(file: SysOSFile): void {
    this.FileSystemUi.UIrenameFile(null, this.currentPath, file, '.window--file-explorer .window__main');
  }

  UIdeleteSelected(file: SysOSFile): void {
    this.FileSystemUi.UIdeleteSelected(null, this.currentPath, file, '.window--file-explorer .window__main');
  }

  UIpasteFile(): void {
    this.FileSystemUi.UIpasteFile(null, this.currentPath);
  }

  UIdoWithFile(file: SysOSFile): void {
    this.FileSystemUi.UIdoWithFile('file-explorer', this.currentPath, file);
  }

  uploadFiles(files: File[]): void {

    files.forEach((file: File, i: number) => {
      this.httpEmitter[i] = this.FileSystem.uploadFile(this.currentPath, file).subscribe(
        event => {
          this.httpEvent = event;

          if (event instanceof HttpResponse) {
            delete this.httpEmitter[i];
            console.log('request done', event);
          }
        },
        error => console.log('Error Uploading', error)
      );

      files.splice(i, 1);
    });

  }

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
      application: 'file-explorer',
      path
    });
  }

  toggleList($event): void {
    $event.currentTarget.parentElement.parentElement.classList.toggle('side__list--open');
  }

  /**
   * Sets an item file/folder active
   */
  setCurrentActive($index: number): void {
    // TODO $('#desktop_body').focus();
    // $timeout.cancel(this.selectTimeout);

    if ($index > this.currentData.length - 1) {
      this.currentActive = 0;
    } else if ($index < 0) {
      this.currentActive = this.currentData.length - 1;
    } else {
      this.currentActive = $index;
    }

    this.selectable.clear();
    /*this.selectTimeout = $timeout(() => {
      this.selection = true;
    }, 100);*/
  }

  handleBodyClick($event): void {
    if ($event.target.attributes.id !== undefined && $event.target.attributes.id.value === 'local_body') this.currentActive = null;
  }

  /**
   * Keypress on item focus
   */
  handleItemKeyPress(keyEvent: KeyboardEvent): void {
    console.log(keyEvent);
    // Do nothing if some application is active
    if (this.taskbarItemOpen !== 'file-explorer') return;

    // Do nothing if there is no active item unless its side arrows
    if (this.currentActive === null && keyEvent.code !== 'ArrowLeft' && keyEvent.code === 'ArrowRight') return;

    if (keyEvent.code === 'Delete') {
      const currentFile = this.currentData[this.currentActive];

      this.UIdeleteSelected(currentFile);
    } else if (keyEvent.code === 'F2') {
      const currentFile = this.currentData[this.currentActive];

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
      const currentFile = this.currentData[this.currentActive];

      this.UIdoWithFile(currentFile);
    } else if (keyEvent.code === 'Backspace') {
      this.FileExplorer.sendGoPathBack();
    }
  }

}

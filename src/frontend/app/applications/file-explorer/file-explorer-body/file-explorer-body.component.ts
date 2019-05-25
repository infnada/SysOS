import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HttpResponse, HttpEvent} from '@angular/common/http';

import {MatMenuTrigger} from '@angular/material'
import {Subscription} from "rxjs";

import Selectable from 'selectable.js';

import {FileSystemService} from "../../../services/file-system.service";
import {FileSystemUiService} from "../../../services/file-system-ui.service";
import {ApplicationsService} from "../../../services/applications.service";
import {FileExplorerService} from "../file-explorer.service";

import {Application} from "../../../interfaces/application";
import {File} from "../../../interfaces/file";
import {ContextMenuItem} from "../../../interfaces/context-menu-item";


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

  taskbar__item_open: string;
  copyFrom: string;
  cutFrom: string;
  currentPath: string;
  currentData: Array<File>;
  viewAsList: boolean;

  search: string;
  currentActive: number = 0;

  files:File[] = [];
  validComboDrag: any;
  sendableFormData: FormData;
  progress: number;
  httpEmitter: Subscription;
  httpEvent: HttpEvent<{}>;

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

  constructor(private FileSystemService: FileSystemService,
              private FileSystemUiService: FileSystemUiService,
              private ApplicationsService: ApplicationsService,
              private FileExplorerService: FileExplorerService) {

    this.reloadPathSubscription = this.FileSystemUiService.getRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.ApplicationsService.taskbar__item_open.subscribe(applications => this.taskbar__item_open = applications);
    this.FileSystemUiService.copyFrom.subscribe(path => this.copyFrom = path);
    this.FileSystemUiService.cutFrom.subscribe(path => this.cutFrom = path);
    this.FileExplorerService.currentPath.subscribe(path => this.currentPath = path);
    this.FileExplorerService.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.FileExplorerService.viewAsList.subscribe(data => this.viewAsList = data);

    this.selectable = new Selectable({
      appendTo: this.selectableContainer.nativeElement,
      ignore: "a"
    });

    if (this.application.init_data && this.application.init_data.path) {
      return this.goToPath(this.application.init_data.path);
    }

    this.goToPath('/');
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
    this.FileExplorerService.reloadPath();
  };

  /**
   * On file dragstart
   */
  onDragStart(): void {
    this.FileSystemUiService.setCurrentFileDrag(this.currentPath);
  }

  UIonDropItem($event): void {
    this.FileSystemUiService.UIonDropItem($event, this.currentPath);
  };

  UIdownloadFromURL(): void {
    this.FileSystemUiService.UIdownloadFromURL(this.currentPath, '.window--file-explorer .window__main');
  };

  UIcreateFolder(): void {
    this.FileSystemUiService.UIcreateFolder(this.currentPath, '.window--file-explorer .window__main');
  };

  UIrenameFile(file: File): void {
    this.FileSystemUiService.UIrenameFile(this.currentPath, file, '.window--file-explorer .window__main');
  };

  UIdeleteSelected(file: File): void {
    this.FileSystemUiService.UIdeleteSelected(this.currentPath, file, '.window--file-explorer .window__main');
  };

  UIpasteFile(): void {
    this.FileSystemUiService.UIpasteFile(this.currentPath);
  }

  UIdoWithFile(file: File): void {
    this.FileSystemUiService.UIdoWithFile('file-explorer', this.currentPath, file);
  }

  eventHandler(e) {
    console.log(e);
  }

  uploadFiles(): void {
    this.httpEmitter = this.FileSystemService.uploadFile(this.sendableFormData).subscribe(
      event=>{
        this.httpEvent = event;

        if (event instanceof HttpResponse) {
          delete this.httpEmitter;
          console.log('request done', event)
        }
      },
      error=>console.log('Error Uploading',error)
    )

  }

  goToPath(path: string): void {
    this.FileSystemUiService.sendGoToPath({
      application: 'file-explorer',
      path: path
    });
  }

  toggleList($event): void {
    $event.currentTarget.parentElement.parentElement.classList.toggle('side__list--open');
  };

  /**
   * Sets an item file/folder active
   */
  setCurrentActive($index: number): void {
    //TODO $('#desktop_body').focus();
    //$timeout.cancel(this.selectTimeout);

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
  };

  handleBodyClick($event): void {
    if ($event.target.attributes.id !== undefined && $event.target.attributes.id.value === 'local_body') this.currentActive = null;
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
      let currentFile = this.currentData[this.currentActive];

      this.UIdeleteSelected(currentFile);
    } else if (keyEvent.which === 113) {
      let currentFile = this.currentData[this.currentActive];

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
      let currentFile = this.currentData[this.currentActive];

      this.UIdoWithFile(currentFile);
    } else if (keyEvent.which === 8) {
      this.FileExplorerService.sendGoPathBack();
    }
  };

}

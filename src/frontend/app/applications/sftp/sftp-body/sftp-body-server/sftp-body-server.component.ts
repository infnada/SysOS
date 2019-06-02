import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpEvent, HttpResponse} from '@angular/common/http';
import {MatMenuTrigger} from '@angular/material';

import {Subscription} from 'rxjs';
import Selectable from 'selectable.js';

import {FileSystemService} from '../../../../services/file-system.service';
import {FileSystemUiService} from '../../../../services/file-system-ui.service';
import {ApplicationsService} from '../../../../services/applications.service';
import {SftpService} from '../../services/sftp.service';
import {SftpServerService} from '../../services/sftp-server.service';

import {SysOSFile} from '../../../../interfaces/file';
import {Application} from '../../../../interfaces/application';
import {ContextMenuItem} from '../../../../interfaces/context-menu-item';

import {SftpConnection} from '../../SftpConnection';

@Component({
  selector: 'app-sftp-body-server',
  templateUrl: './sftp-body-server.component.html',
  styleUrls: ['./sftp-body-server.component.scss']
})
export class SftpBodyServerComponent implements OnInit {
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
  currentData: Array<SysOSFile>;
  viewAsList: boolean;
  search: { filename: string } = null;
  activeConnection: string;
  viewExchange: boolean;

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

  constructor(private FileSystemService: FileSystemService,
              private FileSystemUiService: FileSystemUiService,
              private ApplicationsService: ApplicationsService,
              private SftpService: SftpService,
              private SftpServerService: SftpServerService) {

    this.reloadPathSubscription = this.FileSystemUiService.getRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.ApplicationsService.taskbar__item_open.subscribe(applications => this.taskbar__item_open = applications);
    this.FileSystemUiService.copyFrom.subscribe(path => this.copyFrom = path);
    this.FileSystemUiService.cutFrom.subscribe(path => this.cutFrom = path);
    this.SftpServerService.currentPath.subscribe(path => this.currentPath = path);
    this.SftpServerService.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.SftpServerService.viewAsList.subscribe(data => this.viewAsList = data);
    this.SftpServerService.search.subscribe(data => this.search = data);
    this.SftpService.activeConnection.subscribe(connection => this.activeConnection = connection);
    this.SftpService.viewExchange.subscribe(view => this.viewExchange = view);

    this.selectable = new Selectable({
      appendTo: this.selectableContainer.nativeElement,
      ignore: 'a'
    });

    if (this.application.init_data && this.application.init_data.path) {
      return this.goToPath(this.application.init_data.path);
    }

    this.goToPath('/');
  }

  getActiveConnection(): SftpConnection {
    return this.SftpService.getActiveConnection();
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
    this.SftpServerService.reloadPath(this.getActiveConnection().uuid);
  }

  /**
   * On file dragstart
   */
  onDragStart(): void {
    this.FileSystemUiService.setCurrentFileDrag(this.currentPath);
  }

  UIonDropItem($event): void {
    this.FileSystemUiService.UIonDropItem(this.getActiveConnection().uuid, $event, this.currentPath);
  }

  UIdownloadFromURL(): void {
    this.FileSystemUiService.UIdownloadFromURL(this.getActiveConnection().uuid, this.currentPath, '.window--sftp .window__main');
  }

  UIcreateFolder(): void {
    this.FileSystemUiService.UIcreateFolder(this.getActiveConnection().uuid, this.currentPath, '.window--sftp .window__main');
  }

  UIrenameFile(file: SysOSFile): void {
    this.FileSystemUiService.UIrenameFile(this.getActiveConnection().uuid, this.currentPath, file, '.window--sftp .window__main');
  }

  UIdeleteSelected(file: SysOSFile): void {
    this.FileSystemUiService.UIdeleteSelected(this.getActiveConnection().uuid, this.currentPath, file, '.window--sftp .window__main');
  }

  UIpasteFile(): void {
    this.FileSystemUiService.UIpasteFile(this.getActiveConnection().uuid, this.currentPath);
  }

  UIdoWithFile(file: SysOSFile): void {
    this.FileSystemUiService.UIdoWithFile('sftp#server', this.currentPath, file);
  }

  uploadFiles(files: File[]): void {

    files.forEach((file: File, i: number) => {
      this.httpEmitter[i] = this.FileSystemService.uploadFile(this.currentPath, file).subscribe(
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
    this.FileSystemUiService.sendGoToPath({
      application: 'sftp#server',
      path
    });
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
    if (this.taskbar__item_open !== 'sftp') return;

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
      this.SftpServerService.sendGoPathBack();
    }
  }

}

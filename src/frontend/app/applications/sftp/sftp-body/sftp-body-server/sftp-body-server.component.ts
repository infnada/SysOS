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

  taskbarItemOpen: string;
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

  constructor(private FileSystem: FileSystemService,
              private FileSystemUi: FileSystemUiService,
              private Applications: ApplicationsService,
              private Sftp: SftpService,
              private SftpServer: SftpServerService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.Applications.taskbarItemOpen.subscribe(applications => this.taskbarItemOpen = applications);
    this.FileSystemUi.copyFrom.subscribe(path => this.copyFrom = path);
    this.FileSystemUi.cutFrom.subscribe(path => this.cutFrom = path);
    this.SftpServer.currentPath.subscribe(path => this.currentPath = path);
    this.SftpServer.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.SftpServer.viewAsList.subscribe(data => this.viewAsList = data);
    this.SftpServer.search.subscribe(data => this.search = data);
    this.Sftp.activeConnection.subscribe(connection => this.activeConnection = connection);
    this.Sftp.viewExchange.subscribe(view => this.viewExchange = view);

    this.selectable = new Selectable({
      appendTo: this.selectableContainer.nativeElement,
      ignore: ['a', '.main_form']
    });

    if (this.application.initData && this.application.initData.path) {
      return this.goToPath(this.application.initData.path);
    }

    this.goToPath('/');
  }

  /**
   * ContextMenu
   */
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

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
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
    if (!this.getActiveConnection()) return;

    this.SftpServer.reloadPath(this.getActiveConnection().uuid);
  }

  /**
   * On file dragstart
   */
  onDragStart(): void {
    this.FileSystemUi.setCurrentFileDrag(this.currentPath);
  }

  UIonDropItem($event): void {
    this.FileSystemUi.UIonDropItem(this.getActiveConnection().uuid, $event, this.currentPath);
  }

  UIdownloadFromURL(): void {
    this.FileSystemUi.UIdownloadFromURL(this.getActiveConnection().uuid, this.currentPath, '.window--sftp .window__main');
  }

  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.getActiveConnection().uuid, this.currentPath, '.window--sftp .window__main');
  }

  UIrenameFile(file: SysOSFile): void {
    this.FileSystemUi.UIrenameFile(this.getActiveConnection().uuid, this.currentPath, file, '.window--sftp .window__main');
  }

  UIdeleteSelected(file: SysOSFile): void {
    this.FileSystemUi.UIdeleteSelected(this.getActiveConnection().uuid, this.currentPath, file, '.window--sftp .window__main');
  }

  UIpasteFile(): void {
    this.FileSystemUi.UIpasteFile(this.getActiveConnection().uuid, this.currentPath);
  }

  UIdoWithFile(file: SysOSFile): void {
    this.FileSystemUi.UIdoWithFile('sftp#server', this.currentPath, file);
  }

  uploadFiles(files: File[]): void {

    files.forEach((file: File, i: number) => {
      this.httpEmitter[i] = this.FileSystem.uploadFile(this.currentPath, file).subscribe(
        event => {
          this.httpEvent = event;

          if (event instanceof HttpResponse) {
            delete this.httpEmitter[i];
          }

          this.reloadPath();
        },
        error => console.log('Error Uploading', error)
      );

      files.splice(i, 1);
    });

  }

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
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
    if (this.taskbarItemOpen !== 'sftp') return;

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
      this.SftpServer.sendGoPathBack();
    }
  }

}

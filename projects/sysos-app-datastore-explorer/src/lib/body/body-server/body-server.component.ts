import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';

import {Subscription} from 'rxjs';

import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysosLibApplicationService, Application} from '@sysos/lib-application';
import {SysOSFile, ContextMenuItem} from '@sysos/lib-types';

import {SysosAppDatastoreExplorerService} from '../../services/sysos-app-datastore-explorer.service';
import {SysosAppDatastoreExplorerServerService} from '../../services/sysos-app-datastore-explorer-server.service';
import {DatastoreExplorerConnection} from '../../types/datastore-explorer-connection';

@Component({
  selector: 'sade-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss'],
  providers: [SysosLibSelectableService]
})
export class BodyServerComponent implements OnInit {
  @Input() application: Application;
  @ViewChild('selectableContainer') selectableContainer: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenuBody: MatMenuTrigger;

  contextMenuPosition = {x: '0px', y: '0px'};

  reloadPathSubscription: Subscription;

  taskbarItemOpen: string;
  copyFrom: string;
  cutFrom: string;
  currentPath: string;
  currentData: Array<SysOSFile>;
  viewAsList: boolean;
  search: { filename: string } = null;
  activeConnection: string;

  currentActive: number = 0;

  files: File[] = [];
  progress: number;

  bodyContextMenuItems: ContextMenuItem[] = [
    {
      id: 0, text: '<i class="fa fa-folder"></i> Create Folder', action: () => {
        this.UIcreateFolder();
      }
    },
    {id: 1, text: 'divider'},
    {
      id: 2, text: '<i class="fa fa-refresh"></i> Refresh', action: () => {
        this.reloadPath();
      }
    },
    {id: 3, text: 'divider'},
    {
      id: 4, text: '<i class="fa fa-clipboard"></i> Paste', action: () => {
        this.UIpasteFile();
      }, disabled: () => {
        return this.copyFrom === null && this.cutFrom === null;
      }
    },
    {id: 5, text: 'divider'},
    {
      id: 6, text: '<i class="fa fa-lock"></i> Permissions', action: () => {
        // TODO
      }
    }
  ];

  constructor(public Selectable: SysosLibSelectableService,
              private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private Applications: SysosLibApplicationService,
              private DatastoreExplorer: SysosAppDatastoreExplorerService,
              private DatastoreExplorerServer: SysosAppDatastoreExplorerServerService) {

    this.reloadPathSubscription = this.FileSystemUi.getObserverRefreshPath().subscribe(path => {
      if (path === this.currentPath) this.reloadPath();
    });
  }

  ngOnInit() {
    this.Applications.taskbarItemOpen.subscribe(applications => this.taskbarItemOpen = applications);
    this.FileSystemUi.copyFrom.subscribe(path => this.copyFrom = path);
    this.FileSystemUi.cutFrom.subscribe(path => this.cutFrom = path);
    this.DatastoreExplorerServer.currentPath.subscribe(path => this.currentPath = path);
    this.DatastoreExplorerServer.currentData.subscribe(data => {
      this.currentData = data;
      this.resetActive();
    });
    this.DatastoreExplorerServer.viewAsList.subscribe(data => this.viewAsList = data);
    this.DatastoreExplorerServer.search.subscribe(data => this.search = data);
    this.DatastoreExplorer.activeConnection.subscribe(connection => this.activeConnection = connection);

    this.Selectable.init({
      appendTo: this.selectableContainer,
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

  getActiveConnection(): DatastoreExplorerConnection {
    return this.DatastoreExplorer.getActiveConnection();
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

    this.DatastoreExplorerServer.reloadPath(this.getActiveConnection().uuid);
  }

  /**
   * On file dragstart
   */
  onDragStart(): void {
    this.FileSystemUi.setCurrentFileDrag(this.currentPath, 'datastore-explorer', this.activeConnection);
  }

  UIonDropItem($event): void {
    this.FileSystemUi.UIonDropItem('datastore-explorer', $event, this.currentPath, this.getActiveConnection().uuid);
  }

  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.getActiveConnection(), this.currentPath, '.window--datastore-explorer .window__main');
  }

  UIrenameFile(file: SysOSFile): void {
    this.FileSystemUi.UIrenameFile(this.getActiveConnection(), this.currentPath, file, '.window--datastore-explorer .window__main');
  }

  UIdeleteSelected(file: SysOSFile): void {
    this.FileSystemUi.UIdeleteSelected(this.getActiveConnection(), this.currentPath, file, '.window--datastore-explorer .window__main');
  }

  UIpasteFile(): void {
    this.FileSystemUi.UIpasteFile(this.getActiveConnection().uuid, this.currentPath);
  }

  UIdoWithFile(file: SysOSFile): void {
    this.FileSystemUi.UIdoWithFile('datastore-explorer#server', this.currentPath, file);
  }

  goToPath(path: string): void {
    this.FileSystemUi.sendGoToPath({
      application: 'datastore-explorer#server',
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

    this.Selectable.clear();
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
    if (this.taskbarItemOpen !== 'datastore-explorer') return;

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
      this.DatastoreExplorerServer.sendGoPathBack();
    }
  }
}

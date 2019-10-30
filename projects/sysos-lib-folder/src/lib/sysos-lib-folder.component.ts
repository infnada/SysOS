import {Component, OnInit, ViewChild, ElementRef, Input, OnDestroy} from '@angular/core';
import {CdkDragStart} from '@angular/cdk/drag-drop';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {MatMenuTrigger} from '@sysos/lib-angular-material';
import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {Application, SysosLibApplicationService} from '@sysos/lib-application';
import {ContextMenuItem, IMConnection, SysOSFile} from '@sysos/lib-types';

@Component({
  selector: 'slfolder-sysos-lib-folder',
  templateUrl: './sysos-lib-folder.component.html',
  styleUrls: ['./sysos-lib-folder.component.scss'],
})
export class SysosLibFolderComponent implements OnDestroy, OnInit {
  @ViewChild(MatMenuTrigger) contextMenuFolder: MatMenuTrigger;
  @ViewChild('selectableContainer') selectableContainer: ElementRef;

  @Input() application: Application;
  // Some applications like SFTP, DatastoreBrowser have 2 file windows. We use this value to know which window this file belongs
  @Input() subApplication: string;
  @Input() connection: IMConnection = null;
  @Input() currentPath: string;
  @Input() currentData: SysOSFile[];
  @Input() currentActive: number;
  @Input() selector: string;

  @Input() viewAsList: boolean = false;
  @Input() search: { filename: string } = null;

  private destroySubject$: Subject<void> = new Subject();

  contextMenuPosition = {x: '0px', y: '0px'};

  copyFile: {
    fileName: string;
    currentPath: string;
    fullPath: string;
  };
  cutFile: {
    fileName: string;
    currentPath: string;
    fullPath: string;
  };

  folderContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: '<i class="fas fa-download"></i> Download from URL to current folder', action: () => {
        this.UIdownloadFromURL();
      }
    },
    {
      id: 2, text: '<i class="fas fa-folder"></i> Create Folder', action: () => {
        this.UIcreateFolder();
      }
    },
    {id: 3, text: 'divider'},
    {
      id: 4, text: '<i class="fas fa-sync-alt"></i> Refresh', action: () => {
        this.reloadPath();
      }
    },
    {id: 5, text: 'divider'},
    {
      id: 6, text: '<i class="fas fa-paste"></i> Paste', action: () => {
        this.UIpasteFile();
      }, disabled: () => {
        return this.copyFile === null && this.cutFile === null;
      }
    },
    {id: 7, text: 'divider'},
    {
      id: 8, text: '<i class="fas fa-lock"></i> Permissions', action: () => {
        // TODO
      }
    }
  ];

  constructor(private logger: SysosLibLoggerService,
              private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private Applications: SysosLibApplicationService,
              public Selectable: SysosLibSelectableService) {
  }

  ngOnInit() {
    this.FileSystemUi.copyFile.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.copyFile = data);
    this.FileSystemUi.cutFile.pipe(takeUntil(this.destroySubject$)).subscribe(data => this.cutFile = data);

    this.Selectable.init({
      appendTo: this.selectableContainer,
      ignore: 'a'
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  /**
   * Get current path data
   */
  private reloadPath(): void {
    this.FileSystemUi.sendGoToPath({
      application: this.application.id,
      path: this.currentPath
    });
  }

  /**
   * ng-click functions
   */
  handleFolderClick($event): void {

    if ($event.target.attributes.class !== undefined && $event.target.attributes.class.value.includes('folders')) {
      if (this.application.id === null) this.Applications.toggleApplication(null);
      this.currentActive = null;
    }

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

  /**
   * context-menu
   */
  onFolderContextMenu(event: MouseEvent): void {
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuFolder.openMenu();
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
  onDragStart($event: CdkDragStart): void {
    this.FileSystemUi.UIcutFile(
      this.currentPath,
      $event.source.data,
      `${this.application.id + (this.subApplication ? '#' + this.subApplication : '')}`,
      (this.connection ? this.connection.uuid : null)
    );
  }

  UIonDropItem(): void {
    this.FileSystemUi.UIpasteFile(
      this.currentPath,
      (this.connection ? this.connection.type : null),
      `${this.application.id + (this.subApplication ? '#' + this.subApplication : '')}`,
      (this.connection ? this.connection.uuid : null)
    );
  }

  UIdownloadFromURL(): void {
    this.FileSystemUi.UIdownloadFromURL(this.currentPath, this.selector, (this.connection ? this.connection.type : null), { connection: this.connection });
  }

  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(this.currentPath, this.selector, (this.connection ? this.connection.type : null), { connection: this.connection });
  }

  UIrenameFile(file: SysOSFile): void {
    this.FileSystemUi.UIrenameFile(this.currentPath, file, this.selector, (this.connection ? this.connection.type : null), { connection: this.connection });
  }

  UIdeleteSelected(file: SysOSFile): void {
    this.FileSystemUi.UIdeleteSelected(this.currentPath, file, this.selector, (this.connection ? this.connection.type : null), { connection: this.connection });
  }

  UIpasteFile(): void {
    this.FileSystemUi.UIpasteFile(this.currentPath, (this.connection ? this.connection.type : null), this.application.id, (this.connection ? this.connection.uuid : null));
  }

  UIdoWithFile(file: SysOSFile): void {
    this.FileSystemUi.UIdoWithFile(`${this.application.id + (this.subApplication ? '#' + this.subApplication : '')}`, this.currentPath, file);
  }

  /**
   * Keypress on item focus
   */
  handleItemKeyPress(keyEvent: KeyboardEvent): void {
    // Do nothing if some application is active
    console.log(this.application.id);
    if (!this.Applications.isActiveApplication(this.application.id)) return;

    let currentFile;

    // Do nothing if there is no active item unless its side arrows
    if (this.currentActive === null && keyEvent.code !== 'ArrowLeft' && keyEvent.code === 'ArrowRight') return;

    if (keyEvent.code === 'Delete') {
      currentFile = this.currentData[this.currentActive];

      this.UIdeleteSelected(currentFile);
    } else if (keyEvent.code === 'F2') {
      currentFile = this.currentData[this.currentActive];

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
      currentFile = this.currentData[this.currentActive];

      this.UIdoWithFile(currentFile);
    } else if (keyEvent.code === 'Backspace') {
      // TODO: this.FileExplorer.sendGoPathBack();
      // this.SftpLocal.sendGoPathBack();
      // this.DatastoreExplorerLocal.sendGoPathBack();
      //  this.DatastoreExplorerServer.sendGoPathBack();
      // this.SftpServer.sendGoPathBack();
    }
  }

}

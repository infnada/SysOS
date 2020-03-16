import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
  ViewContainerRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {MatMenuTrigger, CdkDragStart} from '@anyopsos/lib-angular-material';
import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService, CutCopyFile} from '@anyopsos/lib-file-system-ui';
import {ContextMenuItem} from '@anyopsos/lib-types';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';
import {Connection} from '@anyopsos/backend-core/app/types/connection';

@Component({
  selector: 'alfolder-anyopsos-lib-folder',
  templateUrl: './anyopsos-lib-folder.component.html',
  styleUrls: ['./anyopsos-lib-folder.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class AnyOpsOSLibFolderComponent implements OnDestroy, OnInit, OnChanges {
  @ViewChild(MatMenuTrigger, {static: false}) readonly contextMenuFolder: MatMenuTrigger;
  @ViewChild('selectableContainer', {static: true}) private readonly selectableContainer: ElementRef;
  @ViewChild('modalContainer', {static: false, read: ViewContainerRef}) readonly viewContainerRef: ViewContainerRef;

  @Input() readonly application: Application;
  @Input() readonly connection: Connection = null;

  @Input() readonly currentPath: string = '';
  @Input() readonly currentData: AnyOpsOSFile[] = [];
  @Input() currentActive: number = 0;

  @Input() readonly viewAsList: boolean = false;
  @Input() readonly loadingData: boolean = false;
  @Input() readonly search: { fileName: string; } = null;

  private readonly destroySubject$: Subject<void> = new Subject();

  private connectionType: string = null;
  private connectionUuid: string = null;
  private applicationType: 'local' | 'server' = 'local';

  private copyFile: CutCopyFile;
  private cutFile: CutCopyFile;

  contextMenuPosition = {x: '0px', y: '0px'};
  readonly folderContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: '<i class="fas fa-download"></i> Download from URL to current folder', action: () => {
        this.UIdownloadFromURL();
      }
    },
    {
      id: 2, text: '<i class="fas fa-folder"></i> Create Folder', action: () => {
        this.UIputFolder();
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

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,
              readonly Selectable: AnyOpsOSLibSelectableService) {
  }

  // Sometimes 'connection' input is async. Make sure we read any change
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.connection) return;

    /**
     * Set main info if is remote connection
     */
    if (this.connection) {

      // Some applications like SFTP, DatastoreBrowser have 2 file windows. We use this value to know which window this file belongs
      this.applicationType = 'server';

      // Used to check which handler to use for (copy/move/create...) files & folders
      this.connectionType = this.connection.type;
      this.connectionUuid = this.connection.uuid;
    }
  }

  ngOnInit(): void {

    // Listen for copyFile change
    this.LibFileSystemUi.copyFile
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: CutCopyFile) => this.copyFile = data);

    // Listen for cutFile change
    this.LibFileSystemUi.cutFile
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: CutCopyFile) => this.cutFile = data);

    /**
     * Initialize file Selectable
     */
    this.Selectable.init({
      appendTo: this.selectableContainer,
      ignore: 'a'
    });
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  /**
   * Get current path data
   */
  private reloadPath(): void {
    this.LibFileSystemUi.sendGoToPath({
      application: `${this.application.uuid}#${this.applicationType}`,
      path: this.currentPath
    });
  }

  /**
   * ng-click functions
   */
  // TODO target type?
  handleFolderClick($event: MouseEvent & { target: any; }): void {

    if ($event.target.attributes.class !== undefined && $event.target.attributes.class.value.includes('folders')) {
      if (this.application.uuid === null) this.LibApplication.toggleApplication(null);
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

  contextToText(item: ContextMenuItem, file?: AnyOpsOSFile): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  /**
   * On file dragstart
   */
  onDragStart($event: CdkDragStart): void {
    this.LibFileSystemUi.UIcutFile(
      this.currentPath,
      $event.source.data,
      `${this.application.uuid}#${this.applicationType}`,
      this.connectionUuid
    );
  }

  UIonDropItem(): void {
    this.LibFileSystemUi.UIpasteFile(
      this.currentPath,
      this.connectionType,
      `${this.application.uuid}#${this.applicationType}`,
      this.connectionUuid
    );
  }

  UIdownloadFromURL(): void {
    this.LibFileSystemUi.UIdownloadFromURL(this.currentPath, this.viewContainerRef, this.connectionType, { connection: this.connection });
  }

  UIputFolder(): void {
    this.LibFileSystemUi.UIputFolder(this.currentPath, this.viewContainerRef, this.connectionType, { connection: this.connection });
  }

  UIrenameFile(file: AnyOpsOSFile): void {
    this.LibFileSystemUi.UIrenameFile(this.currentPath, file, this.viewContainerRef, this.connectionType, { connection: this.connection });
  }

  UIdeleteFile(file: AnyOpsOSFile): void {
    this.LibFileSystemUi.UIdeleteFile(this.currentPath, file, this.viewContainerRef, this.connectionType, { connection: this.connection });
  }

  UIpasteFile(): void {
    this.LibFileSystemUi.UIpasteFile(this.currentPath, this.connectionType, `${this.application.uuid}#${this.applicationType}`, this.connectionUuid);
  }

  UIdoWithFile(file: AnyOpsOSFile): void {
    this.LibFileSystemUi.UIdoWithFile(this.currentPath, file, `${this.application.uuid}#${this.applicationType}`);
  }

  /**
   * Keypress on item focus
   */
  handleItemKeyPress(keyEvent: KeyboardEvent): void {
    // Do nothing if some application is active
    console.log(this.application.uuid);
    if (!this.LibApplication.isActiveApplication(this.application.uuid)) return;

    let currentFile;

    // Do nothing if there is no active item unless its side arrows
    if (this.currentActive === null && keyEvent.code !== 'ArrowLeft' && keyEvent.code === 'ArrowRight') return;

    if (keyEvent.code === 'Delete') {
      currentFile = this.currentData[this.currentActive];

      this.UIdeleteFile(currentFile);
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

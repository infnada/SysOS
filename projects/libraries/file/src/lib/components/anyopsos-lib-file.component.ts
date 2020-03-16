import {Component, Input, ViewChild, ElementRef, AfterViewInit, ViewContainerRef, OnChanges, SimpleChanges} from '@angular/core';

import {MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibFileSystemUiService, AnyOpsOSLibFileSystemUiHelpersService} from '@anyopsos/lib-file-system-ui';
import {Application} from '@anyopsos/lib-application';
import {ContextMenuItem} from '@anyopsos/lib-types';
import {Connection} from '@anyopsos/backend-core/app/types/connection';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';

@Component({
  selector: 'alfile-anyopsos-lib-file',
  templateUrl: './anyopsos-lib-file.component.html',
  styleUrls: ['./anyopsos-lib-file.component.scss']
})
export class AnyOpsOSLibFileComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatMenuTrigger, {static: false}) readonly contextMenuFile: MatMenuTrigger;
  @ViewChild('selectableFileElement', {static: false}) private readonly selectableFileElement: ElementRef;

  @Input() private readonly application: Application;
  @Input() private readonly connection: Connection = null;
  @Input() readonly file: AnyOpsOSFile;

  // Where to show the modal box
  @Input() private readonly viewContainerRef: ViewContainerRef;

  @Input() private readonly uploadAllowed: boolean = false; // Instead of this, check if upload handler on FileSystemUI is set
  @Input() private readonly selectable: AnyOpsOSLibSelectableService;
  @Input() private readonly currentPath: string;
  @Input() readonly isCurrentActive: boolean;
  @Input() readonly viewAsList: boolean;

  private connectionType: string = null;
  private connectionUuid: string = null;
  private applicationType: 'local' | 'server' = 'local';

  contextMenuPosition = {x: '0px', y: '0px'};
  readonly fileContextMenuItems: ContextMenuItem[] = [
    {
      id: 0, text: '<i class="fas fa-upload"></i> Upload to Remote', action: (file: AnyOpsOSFile): void => {
        this.UIuploadFile(file);
      }, disabled: () => {
        if (this.connection) return true;
        return false;
      }
    },
    {
      id: 1, text: (
        this.connection && this.connection.uuid !== null ?
          '<i class="fas fa-cloud-download-alt"></i> Download to anyOpsOS' :
          '<i class="fas fa-download"></i> Download to local'
      ), action: (file: AnyOpsOSFile): void => {
        return this.UIdownloadFile(file);
      }
    },
    {
      id: 2, text: (file: AnyOpsOSFile) => {
        const filetype: string = this.getFileType(file.longName);

        if (filetype === 'folder') {
          return '<i class="fas fa-folder-open"></i> Open';
        } else {
          return '<i class="fas fa-edit"></i> Open with Notepad';
        }
      }, action: (file: AnyOpsOSFile): void => {
        return this.UIdoWithFile(file);
      }
    },
    {id: 3, text: 'divider'},
    {
      id: 4, text: '<i class="fas fa-copy"></i> Copy', action: (file: AnyOpsOSFile): void => {
        return this.UIcopyFile(file);
      }
    },
    {
      id: 6, text: '<i class="fas fa-cut"></i> Cut', action: (file: AnyOpsOSFile): void => {
        return this.UIcutFile(file);
      }
    },
    {id: 7, text: 'divider'},
    {
      id: 8, text: '<i class="fas fa-font"></i> Rename', action: (file: AnyOpsOSFile): void => {
        return this.UIrenameFile(file);
      }
    },
    {
      id: 9, text: '<i class="fas fa-trash-alt"></i> Delete', action: (file: AnyOpsOSFile): void => {
        return this.UIdeleteFile(file);
      }
    },
    {id: 10, text: 'divider'},
    {
      id: 11, text: '<i class="fas fa-lock"></i> Permissions', action: (file: AnyOpsOSFile): void => {
        return this.UIfilePermissions(file);
      }
    }
  ];

  constructor(private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly FileSystemUiHelpers: AnyOpsOSLibFileSystemUiHelpersService) {
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

  ngAfterViewInit(): void {
    this.selectable.add(this.selectableFileElement.nativeElement);
  }

  /**
   * ContextMenu
   */
  onFileContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuFile.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem): boolean {
    if (item.disabled) return item.disabled();
    return false;
  }

  contextToText(item: ContextMenuItem, file?: AnyOpsOSFile): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  getFileType(longName: string): string {
    return this.FileSystemUiHelpers.getFileType(longName);
  }

  UIrenameFile(file: AnyOpsOSFile): void {
    this.LibFileSystemUi.UIrenameFile(
      this.currentPath,
      file,
      this.viewContainerRef,
      this.connectionType,
      (this.connection ? { connection: this.connection } : undefined)
    );
  }

  UIdeleteFile(file: AnyOpsOSFile): void {
    this.LibFileSystemUi.UIdeleteFile(
      this.currentPath,
      file,
      this.viewContainerRef,
      this.connectionType,
      (this.connection ? { connection: this.connection } : undefined)
    );
  }

  UIcopyFile(file: AnyOpsOSFile): void {
    this.LibFileSystemUi.UIcopyFile(
      this.currentPath,
      file,
      `${this.application.uuid}#${this.applicationType}`,
     this.connectionUuid
    );
  }

  UIcutFile(file: AnyOpsOSFile): void {
    this.LibFileSystemUi.UIcutFile(
      this.currentPath,
      file,
      `${this.application.uuid}#${this.applicationType}`,
      this.connectionUuid
    );
  }

  UIdownloadFile(file: AnyOpsOSFile): void {
    // TODO get dstPath
    this.LibFileSystemUi.UIdownloadFile(
      this.currentPath + file.fileName,
      (this.connection ? '/' : null) + file.fileName,
      this.connectionType,
      `${this.application.uuid}#${this.applicationType}`,
      (this.connection ? { connection: this.connection } : undefined)
    );

  }

  UIuploadFile(file: AnyOpsOSFile): void {
    // TODO get dstPath
    this.LibFileSystemUi.UIuploadFile(
      this.currentPath + file.fileName,
      '/' + file.fileName,
      null,
      this.connectionType,
      `${this.application.uuid}#${this.applicationType}`,
      (this.connection ? { connection: this.connection } : undefined)
    );
  }

  UIfilePermissions(file: AnyOpsOSFile): void {
    // TODO
  }

  UIdoWithFile(file: AnyOpsOSFile): void {
    this.LibFileSystemUi.UIdoWithFile(this.currentPath, file, `${this.application.uuid}#${this.applicationType}`);
  }

}

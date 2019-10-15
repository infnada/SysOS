import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import {MatMenuTrigger} from '@sysos/lib-angular-material';
import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';

import {SysOSFile, ContextMenuItem} from '@sysos/lib-types';
import {Application} from '@sysos/lib-application';
import {IMConnection, SftpConnection, DatastoreExplorerConnection} from '@sysos/lib-types';

@Component({
  selector: 'slf-sysos-lib-file',
  templateUrl: './sysos-lib-file.component.html',
  styleUrls: ['./sysos-lib-file.component.scss'],
  providers: [SysosLibSelectableService]
})
export class SysosLibFileComponent implements OnInit, AfterViewInit {
  @ViewChild(MatMenuTrigger) contextMenuFile: MatMenuTrigger;
  @ViewChild('selectableFileElement') selectableFileElement: ElementRef;

  @Input() file: SysOSFile;
  @Input() application: Application;
  // Some applications like SFTP, DatastoreBrowser have 2 file windows. We use this value to know which window this file belongs
  @Input() subApplication: string;
  @Input() connection: IMConnection = null;
  @Input() uploadAllowed: boolean = false;
  @Input() selectable: SysosLibSelectableService;
  @Input() isCurrentActive: boolean;
  @Input() currentPath: string;
  @Input() viewAsList: boolean;
  // Where to show the modal box
  @Input() selector: string;

  contextMenuPosition = {x: '0px', y: '0px'};
  fileContextMenuItems: ContextMenuItem[];

  constructor(private FileSystem: SysosLibFileSystemService,
              private FileSystemUi: SysosLibFileSystemUiService) {
  }

  ngOnInit() {
    this.fileContextMenuItems = [
      {
        id: 0, text: '<i class="fas fa-upload"></i> Upload to Remote', action: (file: SysOSFile): void => {
          this.UIuploadFileToRemote(file);
        }, disabled: () => {
          return !this.uploadAllowed;
        }
      },
      {
        id: 1, text: (
          this.connection && this.connection.uuid !== null ?
            '<i class="fas fa-cloud-download-alt"></i> Download to SysOS' :
            '<i class="fas fa-download"></i> Download to local'
        ), action: (file: SysOSFile): void => {
          if (this.connection) return this.UIdownloadFileToSysOS(file);
          return this.UIdownloadFileToLocal(file);
        }
      },
      {
        id: 2, text: (file: SysOSFile) => {
          const filetype = this.getFileType(file.longname);

          if (filetype === 'folder') {
            return '<i class="fas fa-folder-open"></i> Open';
          } else {
            return '<i class="fas fa-edit"></i> Open with Notepad';
          }
        }, action: (file: SysOSFile): void => {
          this.UIdoWithFile(file);
        }
      },
      {id: 3, text: 'divider'},
      {
        id: 4, text: '<i class="fas fa-copy"></i> Copy', action: (file: SysOSFile): void => {
          this.UIcopyFile(file);
        }
      },
      {
        id: 6, text: '<i class="fas fa-cut"></i> Cut', action: (file: SysOSFile): void => {
          this.UIcutFile(file);
        }
      },
      {id: 7, text: 'divider'},
      {
        id: 8, text: '<i class="fas fa-font"></i> Rename', action: (file: SysOSFile): void => {
          return this.UIrenameFile(file);
        }
      },
      {
        id: 9, text: '<i class="fas fa-trash-alt"></i> Delete', action: (file: SysOSFile): void => {
          return this.UIdeleteSelected(file);
        }
      },
      {id: 10, text: 'divider'},
      {
        id: 11, text: '<i class="fas fa-lock"></i> Permissions', action: (file: SysOSFile): void => {
          return this.UIfilePermissions(file);
        }
      }
    ];
  }

  ngAfterViewInit() {
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

  contextToText(item: ContextMenuItem, file?: SysOSFile): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  getFileType(longname: string): string {
    return this.FileSystem.getFileType(longname);
  }

  UIrenameFile(file: SysOSFile): void {
    this.FileSystemUi.UIrenameFile(this.currentPath, file, this.selector, (this.connection ? this.connection.type : null), (this.connection ? { connection: this.connection } : null));
  }

  UIdeleteSelected(file: SysOSFile): void {
    this.FileSystemUi.UIdeleteSelected(this.currentPath, file, this.selector, (this.connection ? this.connection.type : null), (this.connection ? { connection: this.connection } : null));
  }

  UIcopyFile(file: SysOSFile): void {
    this.FileSystemUi.UIcopyFile(this.currentPath, file, `${this.application.id + (this.subApplication ? '#' + this.subApplication : '')}`, (this.connection ? this.connection.uuid : null));
  }

  UIcutFile(file: SysOSFile): void {
    this.FileSystemUi.UIcutFile(this.currentPath, file, `${this.application.id + (this.subApplication ? '#' + this.subApplication : '')}`, (this.connection ? this.connection.uuid : null));
  }

  UIdownloadFileToSysOS(file: SysOSFile): void {
    this.FileSystemUi.sendDownloadRemoteFile({
      path: this.currentPath,
      fileName: file.filename,
      connectionUuid: this.connection.uuid,
      applicationId: this.application.id
    });
  }

  UIdownloadFileToLocal(file: SysOSFile): void {
    // TODO
  }

  UIuploadFileToRemote(file: SysOSFile): void {
    this.FileSystemUi.sendUploadToRemote({
      path: this.currentPath,
      fileName: file.filename,
      applicationId: this.application.id
    });
  }

  UIfilePermissions(file: SysOSFile): void {
    // TODO
  }

  UIdoWithFile(file: SysOSFile): void {
    let realApplication = this.application.id;
    if (this.subApplication) realApplication = this.application.id + '#' + this.subApplication;

    this.FileSystemUi.UIdoWithFile(realApplication, this.currentPath, file);
  }

}

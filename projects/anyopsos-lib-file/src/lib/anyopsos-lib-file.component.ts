import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import {MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSFile, ContextMenuItem} from '@anyopsos/lib-types';
import {Application} from '@anyopsos/lib-application';
import {IMConnection, SftpConnection, DatastoreExplorerConnection} from '@anyopsos/lib-types';

@Component({
  selector: 'slf-anyopsos-lib-file',
  templateUrl: './anyopsos-lib-file.component.html',
  styleUrls: ['./anyopsos-lib-file.component.scss'],
  providers: [AnyOpsOSLibSelectableService]
})
export class AnyOpsOSLibFileComponent implements OnInit, AfterViewInit {
  @ViewChild(MatMenuTrigger) contextMenuFile: MatMenuTrigger;
  @ViewChild('selectableFileElement') selectableFileElement: ElementRef;

  @Input() file: AnyOpsOSFile;
  @Input() application: Application;
  // Some applications like SFTP, DatastoreBrowser have 2 file windows. We use this value to know which window this file belongs
  @Input() subApplication: string;
  @Input() connection: IMConnection = null;
  @Input() uploadAllowed: boolean = false;
  @Input() selectable: AnyOpsOSLibSelectableService;
  @Input() isCurrentActive: boolean;
  @Input() currentPath: string;
  @Input() viewAsList: boolean;
  // Where to show the modal box
  @Input() selector: string;

  contextMenuPosition = {x: '0px', y: '0px'};
  fileContextMenuItems: ContextMenuItem[];

  constructor(private FileSystem: AnyOpsOSLibFileSystemService,
              private FileSystemUi: AnyOpsOSLibFileSystemUiService) {
  }

  ngOnInit() {
    this.fileContextMenuItems = [
      {
        id: 0, text: '<i class="fas fa-upload"></i> Upload to Remote', action: (file: AnyOpsOSFile): void => {
          this.UIuploadFileToRemote(file);
        }, disabled: () => {
          return !this.uploadAllowed;
        }
      },
      {
        id: 1, text: (
          this.connection && this.connection.uuid !== null ?
            '<i class="fas fa-cloud-download-alt"></i> Download to anyOpsOS' :
            '<i class="fas fa-download"></i> Download to local'
        ), action: (file: AnyOpsOSFile): void => {
          if (this.connection) return this.UIdownloadFileToanyOpsOS(file);
          return this.UIdownloadFileToLocal(file);
        }
      },
      {
        id: 2, text: (file: AnyOpsOSFile) => {
          const filetype = this.getFileType(file.longname);

          if (filetype === 'folder') {
            return '<i class="fas fa-folder-open"></i> Open';
          } else {
            return '<i class="fas fa-edit"></i> Open with Notepad';
          }
        }, action: (file: AnyOpsOSFile): void => {
          this.UIdoWithFile(file);
        }
      },
      {id: 3, text: 'divider'},
      {
        id: 4, text: '<i class="fas fa-copy"></i> Copy', action: (file: AnyOpsOSFile): void => {
          this.UIcopyFile(file);
        }
      },
      {
        id: 6, text: '<i class="fas fa-cut"></i> Cut', action: (file: AnyOpsOSFile): void => {
          this.UIcutFile(file);
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
          return this.UIdeleteSelected(file);
        }
      },
      {id: 10, text: 'divider'},
      {
        id: 11, text: '<i class="fas fa-lock"></i> Permissions', action: (file: AnyOpsOSFile): void => {
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

  contextToText(item: ContextMenuItem, file?: AnyOpsOSFile): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }

  getFileType(longname: string): string {
    return this.FileSystem.getFileType(longname);
  }

  UIrenameFile(file: AnyOpsOSFile): void {
    this.FileSystemUi.UIrenameFile(this.currentPath, file, this.selector, (this.connection ? this.connection.type : null), (this.connection ? { connection: this.connection } : null));
  }

  UIdeleteSelected(file: AnyOpsOSFile): void {
    this.FileSystemUi.UIdeleteSelected(this.currentPath, file, this.selector, (this.connection ? this.connection.type : null), (this.connection ? { connection: this.connection } : null));
  }

  UIcopyFile(file: AnyOpsOSFile): void {
    this.FileSystemUi.UIcopyFile(this.currentPath, file, `${this.application.id + (this.subApplication ? '#' + this.subApplication : '')}`, (this.connection ? this.connection.uuid : null));
  }

  UIcutFile(file: AnyOpsOSFile): void {
    this.FileSystemUi.UIcutFile(this.currentPath, file, `${this.application.id + (this.subApplication ? '#' + this.subApplication : '')}`, (this.connection ? this.connection.uuid : null));
  }

  UIdownloadFileToanyOpsOS(file: AnyOpsOSFile): void {
    this.FileSystemUi.sendDownloadRemoteFile({
      path: this.currentPath,
      fileName: file.filename,
      connectionUuid: this.connection.uuid,
      applicationId: this.application.id
    });
  }

  UIdownloadFileToLocal(file: AnyOpsOSFile): void {
    // TODO
  }

  UIuploadFileToRemote(file: AnyOpsOSFile): void {
    this.FileSystemUi.sendUploadToRemote({
      path: this.currentPath,
      fileName: file.filename,
      applicationId: this.application.id
    });
  }

  UIfilePermissions(file: AnyOpsOSFile): void {
    // TODO
  }

  UIdoWithFile(file: AnyOpsOSFile): void {
    let realApplication = this.application.id;
    if (this.subApplication) realApplication = this.application.id + '#' + this.subApplication;

    this.FileSystemUi.UIdoWithFile(realApplication, this.currentPath, file);
  }

}

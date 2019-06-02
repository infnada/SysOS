import {Injectable} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

import {ModalService} from './modal.service';
import {ApplicationsService} from './applications.service';
import {FileSystemService} from './file-system.service';

@Injectable({
  providedIn: 'root'
})
export class FileSystemUiService {

  private subject = new Subject<any>();
  private subjectGoToPath = new Subject<any>();

  private _copyFrom: BehaviorSubject<string>;
  private _cutFrom: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    copyFrom: string,
    cutFrom: string
  };
  copyFrom: Observable<any>;
  cutFrom: Observable<any>;

  currentFileDrag: string = null;

  constructor(private ModalService: ModalService,
              private toastr: ToastrService,
              private FileSystemService: FileSystemService,
              private ApplicationsService: ApplicationsService) {

    this.dataStore = {copyFrom: null, cutFrom: null};
    this._copyFrom = <BehaviorSubject<string>> new BehaviorSubject(null);
    this._cutFrom = <BehaviorSubject<string>> new BehaviorSubject(null);
    this.copyFrom = this._copyFrom.asObservable();
    this.cutFrom = this._cutFrom.asObservable();

  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(connectionUuid: string, currentPath: string, selector: string) {
    this.ModalService.openRegisteredModal('input', selector,
      {
        title: 'Create new folder',
        text: 'Folder name',
        button_text: 'Create',
        inputValue: 'NewFolder'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        return this.FileSystemService.createFolder(connectionUuid, currentPath, name).subscribe(
          () => {
            this.refreshPath(currentPath);
          },
          error => {
            console.error('File System -> Error while creating folder -> ', error);
            console.error(error);
          });
      });

    });

  }

  /**
   * Rename file
   */
  UIrenameFile(connectionUuid: string, currentPath: string, file: { longname: string, filename: string }, selector: string) {
    this.ModalService.openRegisteredModal('input', selector,
      {
        title: 'Rename file',
        text: 'File name',
        button_text: 'Rename',
        inputValue: file.filename
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        return this.FileSystemService.renameFile(connectionUuid, currentPath, file.filename, name).subscribe(
          () => {
            this.refreshPath(currentPath);
          },
          error => {
            console.error('File System -> Error while renaming file -> ', error);
            console.error(error);
          });

      });

    });

  }

  /**
   * Deletes selected files or folders
   */
  UIdeleteSelected(connectionUuid: string, currentPath: string, file: { longname: string, filename: string }, selector: string) {
    this.ModalService.openRegisteredModal('question', selector,
      {
        title: 'Delete file ' + file.filename,
        text: 'Delete ' + file.filename + ' from SysOS?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {
          return this.FileSystemService.deleteFile(connectionUuid, currentPath, file.filename).subscribe(
            () => {
              this.refreshPath(currentPath);
            },
            error => {
              console.error('File System -> Error while deleting folder -> ', error);
              console.error(error);
            });
        }

      });

    });

  }

  /**
   * Paste selected files or folders
   */
  UIpasteFile(connectionUuid: string, currentPath: string) {

    const pasteTo = currentPath;

    if (this.dataStore.cutFrom) {
      return this.FileSystemService.moveFile(connectionUuid, this.dataStore.cutFrom, pasteTo).subscribe(
        () => {
          this.refreshPath(currentPath);
          this.dataStore.cutFrom = null;

          // broadcast data to subscribers
          this._cutFrom.next(Object.assign({}, this.dataStore).cutFrom);
        },
        error => {
          console.error('File System -> Error while moving file -> ', error);
          console.error(error);
        });

    }

    if (this.dataStore.copyFrom) {
      return this.FileSystemService.copyFile(connectionUuid, this.dataStore.copyFrom, pasteTo).subscribe(
        () => {
          this.refreshPath(currentPath);
          this.dataStore.copyFrom = null;

          // broadcast data to subscribers
          this._copyFrom.next(Object.assign({}, this.dataStore).copyFrom);
        },
        error => {
          console.error('File System -> Error while copying file -> ', error);
          console.error(error);
        });

    }
  }

  /**
   * Downloads content from URL
   */
  UIdownloadFromURL(connectionUuid: string, currentPath: string, selector: string) {
    this.ModalService.openRegisteredModal('input', selector,
      {
        title: 'Download file from URL',
        text: 'File URL',
        button_text: 'Download',
        inputValue: ''
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        return this.FileSystemService.downloadFileFromInet(connectionUuid, currentPath, name).subscribe(
          () => {
            this.refreshPath(currentPath);
            this.toastr.success('File downloaded to ' + currentPath, 'Download file from URL');
          },
          error => {
            console.error('Desktop -> Error while downloading file -> ', error);
            console.error(error);
          });

      });

    });

  }

  /**
   * Copy File
   */
  UIcopyFile(currentPath: string, file: { longname: string, filename: string }) {
    this.dataStore.cutFrom = null;
    this.dataStore.copyFrom = currentPath + file.filename;

    // broadcast data to subscribers
    this._cutFrom.next(Object.assign({}, this.dataStore).cutFrom);
    this._copyFrom.next(Object.assign({}, this.dataStore).copyFrom);

  }

  /**
   * Cut file
   */
  UIcutFile(currentPath: string, file: { longname: string, filename: string }) {
    this.dataStore.copyFrom = null;
    this.dataStore.cutFrom = currentPath + file.filename;

    // broadcast data to subscribers
    this._copyFrom.next(Object.assign({}, this.dataStore).copyFrom);
    this._cutFrom.next(Object.assign({}, this.dataStore).cutFrom);
  }

  /**
   * Checks if is a file or folder and do something
   */
  UIdoWithFile(applicationId: string, currentPath: string, file: { longname: string, filename: string }) {
    let realApplication = applicationId;
    const filetype = this.FileSystemService.getFileType(file.longname);

    // Like SFTP application, applicationId could have a 'sub application'. The # symbol separates its values.
    if (applicationId.indexOf('#') !== -1) realApplication = applicationId.substring(0, applicationId.indexOf('#'));

    if (filetype === 'folder') {

      if (!this.ApplicationsService.isApplicationOpened(realApplication)) {
        this.ApplicationsService.openApplication(realApplication, {
          path: currentPath + file.filename + '/'
        });
      } else {

        this.sendGoToPath({
          application: applicationId,
          path: currentPath + file.filename + '/'
        });

      }

    } else {
      const filePath = currentPath + file.filename;

      this.FileSystemService.getFileContents(filePath).subscribe(
        (res: any) => {

          if (!this.ApplicationsService.isApplicationOpened('notepad')) {
            this.ApplicationsService.openApplication('notepad', {
              data: res
            });
          } else {
            // TODO: open new notepad tab
          }

        },
        error => {
          console.error('Desktop -> Error while getting file contents -> ', error);
          console.error(error);
        });
    }
  }

  setCurrentFileDrag(path: string): void {
    this.currentFileDrag = path;
  }

  UIonDropItem(connectionUuid: string, $event: CdkDragDrop<any>, dropPath: string): void {

    this.FileSystemService.moveFile(connectionUuid, this.currentFileDrag + '/' + $event.item.data.filename, dropPath).subscribe(
      () => {

        this.refreshPath(this.currentFileDrag);
        this.refreshPath(dropPath);
      },
      error => {
        console.error('Desktop -> Error while moving file -> ', error);
        console.error(error);
      });
  }

  refreshPath(path: string): void {
    this.subject.next(path);
  }

  getRefreshPath(): Observable<any> {
    return this.subject.asObservable();
  }

  sendGoToPath(data: { application: string, path: string }): void {
    this.subjectGoToPath.next(data);
  }

  getObserverGoToPath(): Observable<any> {
    return this.subjectGoToPath.asObservable();
  }
}

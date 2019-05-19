import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

import {ModalService} from "./modal.service";

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  private _copyFrom: BehaviorSubject<string>;
  private _cutFrom: BehaviorSubject<string>;
  private _currentFileDrop: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    copyFrom: string,
    cutFrom: string,
    currentFileDrop: string
  };
  copyFrom: Observable<any>;
  cutFrom: Observable<any>;
  currentFileDrop: Observable<any>;


  pasteTo: string = null;

  constructor(private http: HttpClient,
              private ModalService: ModalService,
              private toastr: ToastrService) {
    this.dataStore = {copyFrom: null, cutFrom: null, currentFileDrop: null};
    this._copyFrom = <BehaviorSubject<string>>new BehaviorSubject(null);
    this._cutFrom = <BehaviorSubject<string>>new BehaviorSubject(null);
    this._currentFileDrop = <BehaviorSubject<string>>new BehaviorSubject(null);
    this.copyFrom = this._copyFrom.asObservable();
    this.cutFrom = this._cutFrom.asObservable();
    this.currentFileDrop = this._currentFileDrop.asObservable();
  }

  getFileSystemPath(path: string): Observable<any> {
    return this.http.post('/api/folder/get', {
      path: path
    });
  }

  uploadFile() {
    //TODO
  }

  getFileContents(path: string): Observable<any> {
    return this.http.post('/api/file/get', {
      path: path
    });
  }

  renameFile(path: string, oldName: string, newName: string): Observable<any> {
    return this.http.post('/api/file/rename', {
      path: path,
      oldName: oldName,
      newName: newName
    });
  }

  deleteFile(path: string, name: string): Observable<any> {
    return this.http.post('/api/file/delete', {
      path: path,
      name: name
    });
  }

  copyFile(src: string, dst: string): Observable<any> {
    return this.http.post('/api/file/copy', {
      src: src,
      dst: dst
    });
  }

  moveFile(src: string, dst: string): Observable<any> {
    return this.http.post('/api/file/move', {
      src: src,
      dst: dst
    });
  }

  downloadFileFromInet(path: string, url: string, credential: string): Observable<any> {
    return this.http.post('/api/file/download_from_url', {
      url: url,
      path: path,
      credential: credential
    });
  }

  createFolder(path: string, name: string): Observable<any> {
    return this.http.post('/api/folder/create', {
      path: path,
      name: name
    });
  }

  getConfigFile(file: string): Observable<any> {
    return this.http.post('/api/configFiles/get', {
      file: file
    });
  }

  saveConfigFile(data: any, file: string, full_save: boolean): Observable<any> {
    return this.http.post('/api/configFiles/save', {
      data: data,
      file: file,
      full_save: full_save
    });
  }

  getFileType(longname: string): string {
    if (longname.charAt(0) === 'd') return 'folder';
    if (longname.charAt(0) === 'l') return 'folder';
    if (longname.charAt(0) === '-' && (longname.charAt(3) === 'x')) return 'file-code-o';
    if (longname.charAt(0) === '-') return 'file';
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(currentPath: string, selector: string) {
    this.ModalService.openRegisteredModal( 'input', selector,
      {
        title: 'Create new folder',
        text: 'Folder name',
        button_text: 'Create',
        inputValue: 'NewFolder'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        return this.createFolder(currentPath, name).subscribe(
          () => {
            this.refreshPath(currentPath);
          },
          error => {
            console.error('File System -> Error while creating folder -> ', error);
            console.error(error);
          });
      });

    });

  };

  /**
   * Rename file
   */
  UIrenameFile(currentPath: string, file: { longname: string, filename: string }, selector: string) {
    this.ModalService.openRegisteredModal( 'input', selector,
      {
        title: 'Rename file',
        text: 'File name',
        button_text: 'Rename',
        inputValue: file.filename
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        return this.renameFile(currentPath, file.filename, name).subscribe(
          () => {
            this.refreshPath(currentPath);
          },
          error => {
            console.error('File System -> Error while renaming file -> ', error);
            console.error(error);
          });

      });

    });

  };

  /**
   * Deletes selected files or folders
   */
  UIdeleteSelected(currentPath: string, file: { longname: string, filename: string }, selector: string) {
    this.ModalService.openRegisteredModal( 'question', selector,
      {
        title: 'Delete file ' + file.filename,
        text: 'Delete ' + file.filename + ' from SysOS?'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: boolean) => {
        if (name === true) {
          return this.deleteFile(currentPath, file.filename).subscribe(
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

  };

  /**
   * Paste selected files or folders
   */
  UIpasteFile(currentPath: string) {

        let pasteTo = currentPath;

        if (this.dataStore.cutFrom) {
          return this.moveFile(this.dataStore.cutFrom, pasteTo).subscribe(
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
          return this.copyFile(this.dataStore.copyFrom, pasteTo).subscribe(
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
  UIdownloadFromURL(currentPath: string, selector: string) {
    this.ModalService.openRegisteredModal( 'input', selector,
      {
        title: 'Download file from URL',
        text: 'File URL',
        button_text: 'Download',
        inputValue:''
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        return this.downloadFileFromInet(currentPath, name,  '').subscribe(
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
  UIdoWithFile(currentPath: string, file: { longname: string, filename: string }) {
    let filetype = this.getFileType(file.longname);

    if (filetype === 'folder') {
      let newPath = currentPath + file.filename + '/';

      //TODO: open explorer

      //this.getFolderContents(newPath);

    } else {
      let filePath = currentPath + file.filename;

      this.getFileContents(filePath).subscribe(
        (res: any) => {
          //this.ApplicationsService.openApplication('notepad');
          //this.ApplicationsService.toggleApplication('notepad');

          //TODO: $rootScope.$broadcast('notepad__new_data', res);
        },
        error => {
          console.error('Desktop -> Error while getting file contents -> ', error);
          console.error(error);
        });
    }
  };

  private subject = new Subject<any>();
  refreshPath(path: string): void {
    this.subject.next(path);
  }

  getRefreshPath(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * Cut file
   */
  setCurrentFileDrop(app: string): void {
    this.dataStore.currentFileDrop = app;

    // broadcast data to subscribers
    this._currentFileDrop.next(Object.assign({}, this.dataStore).currentFileDrop);
  }

}

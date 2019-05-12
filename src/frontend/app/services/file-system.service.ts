import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  copyFrom: string = null;
  cutFrom: string = null;
  pasteTo: string = null;

  constructor(private http: HttpClient) {
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

  downloadFileFromInet(url: string, path: string, credential: string): Observable<any> {
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
  UIcreateFolder(currentPath: string) {
    /*let modalInstanceCreateFolder = modalFactory.openRegistredModal('input', '.desktop .desktop__body',
      {
        title: () => {
          return 'Create new folder';
        },
        text: () => {
          return 'Folder name';
        },
        button_text: () => {
          return 'Create';
        },
        inputValue: () => {
          return 'NewFolder';
        }
      }
    );
    modalInstanceCreateFolder.result.then((name: string) => {
      if (!name) return;

      return this.FileSystemService.createFolder(this.desktopFiles.currentPath, name).subscribe(
        (res: any) => {
          this.reloadPath();
        },
        error => {
          console.error('Desktop -> Error while creating folder -> ', error);
          console.error(error);
        });

    });*/
  };

  /**
   * Rename file
   */
  UIrenameFile(currentPath: string, file: { longname: string, filename: string }) {
    /*let modalInstanceRenameFile = modalFactory.openRegistredModal('input', '.desktop .desktop__body',
      {
        title: () => {
          return 'Rename file';
        },
        text: () => {
          return 'File name';
        },
        button_text: () => {
          return 'Rename';
        },
        inputValue: () => {
          return this.fileToRename;
        }
      }
    );
    modalInstanceRenameFile.result.then((res: string) => {
      if (!res) return;

      this.modalInputName = res;

      return this.FileSystemService.renameFile(this.desktopFiles.currentPath, this.fileToRename, this.modalInputName).subscribe(
        (res: any) => {
          this.reloadPath();
        },
        error => {
          console.error('Desktop -> Error while renaming file -> ', error);
          console.error(error);
        });
    });*/
  };

  /**
   * Deletes selected files or folders
   */
  UIdeleteSelected(currentPath: string, file: { longname: string, filename: string }) {
    /*let modalInstanceDeleteFile = modalFactory.openRegistredModal('question', '.desktop .desktop__body',
      {
        title: () => {
          return 'Delete file ' + this.modalInputName;
        },
        text: () => {
          return 'Delete ' + this.modalInputName + ' from SysOS?';
        }
      }
    );
    modalInstanceDeleteFile.result.then((res: boolean) => {
      if (res === true) {
        return this.FileSystemService.deleteFile(this.desktopFiles.currentPath, this.modalInputName).subscribe(
          (res: any) => {
            this.reloadPath();
          },
          error => {
            console.error('Desktop -> Error while deleting folder -> ', error);
            console.error(error);
          });
      }
    });*/
  };

  /**
   * Paste selected files or folders
   */
  UIpasteFile(currentPath: string) {
    /*if (angular.isUndefined($itemScope.file)) $itemScope.file = $itemScope.$parent.file;

        this.pasteTo = this.desktopFiles.currentPath;

        if (this.cutFrom) {
          return fileSystemFactory.moveFile(this.cutFrom, this.pasteTo, function () {
            this.reloadPath();
            this.cutFrom = null;
            this.pasteTo = null;
          });
        }

        if (this.copyFrom) {
          return fileSystemFactory.copyFile(_this.copyFrom, _this.pasteTo, function () {
            this.reloadPath();
            this.copyFrom = null;
            this.pasteTo = null;
          });
        }*/
  }

  /**
   * Downloads content from URL
   */
  UIdownloadFromURL(currentPath: string) {
    /*let modalInstanceDownloadFromURL = modalFactory.openRegistredModal('input', '.desktop .desktop__body',
          {
            title: () => {
              return 'Download file from URL';
            },
            text: () => {
              return 'File URL';
            },
            button_text: () => {
              return 'Download';
            },
            inputValue: () => {
              return '';
            }
          }
        );
        modalInstanceDownloadFromURL.result.then((res) => {

          if (!res) return;

          return this.FileSystemService.downloadFileFromInet(res, this.desktopFiles.currentPath, '').subscribe(
            (res: {}) => {
              this.reloadPath();
              this.toastr.success('File downloaded to ' + this.desktopFiles.currentPath, 'Download file from URL');
            },
            error => {
              console.error('Desktop -> Error while downloading file -> ', error);
              console.error(error);
            });

        });
      }*/
  }

  /**
   * Copy File
   */
  UIcopyFile(currentPath: string, file: { longname: string, filename: string }) {
    this.cutFrom = null;
    this.copyFrom = currentPath + file.filename;
  }

  /**
   * Cut file
   */
  UIcutFile(currentPath: string, file: { longname: string, filename: string }) {
    this.copyFrom = null;
    this.cutFrom = currentPath + file.filename;
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

}

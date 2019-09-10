import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysOSFile} from '@sysos/lib-types';

@Injectable({
  providedIn: 'root'
})
export class SysosLibFileSystemUiService {

  private subjectRefreshPath = new Subject<any>();
  private subjectGoToPath = new Subject<any>();
  private subjectDownloadRemoteFile = new Subject<any>();
  private subjectUploadFileToRemote = new Subject<any>();
  private subjectUploadFileToSysOS = new Subject<any>();

  private $copyFile: BehaviorSubject<object>;
  private $cutFile: BehaviorSubject<object>;

  private dataStore: {  // This is where we will store our data in memory
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
  };
  copyFile: Observable<any>;
  cutFile: Observable<any>;

  currentCutCopyApplication: string = null;
  currentCutCopyConnectionUuid: string = null;

  constructor(private logger: SysosLibLoggerService,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private FileSystem: SysosLibFileSystemService,
              private Applications: SysosLibApplicationService) {

    this.dataStore = {copyFile: null, cutFile: null};
    this.$copyFile = new BehaviorSubject(null) as BehaviorSubject<object>;
    this.$cutFile = new BehaviorSubject(null) as BehaviorSubject<object>;
    this.copyFile = this.$copyFile.asObservable();
    this.cutFile = this.$cutFile.asObservable();

  }

  /**
   * handlers by custom Applications
   */
  private createFolderHandlers: {[type: string]: { fn: any }} = {};
  private renameFileHandlers: {[type: string]: { fn: any }} = {};
  private deleteFileHandlers: {[type: string]: { fn: any }} = {};
  private downloadFromURLFileHandlers: {[type: string]: { fn: any }} = {};
  private moveFileHandlers: {[type: string]: { fn: any }} = {};
  private copyFileHandlers: {[type: string]: { fn: any }} = {};

  /**
   * Called by custom Applications
   */
  createHandler(handlerType: 'folder'|'rename'|'delete'|'download'|'move'|'copy', type: string, fn: (data?) => any) {

    if (handlerType === 'folder') this.createFolderHandlers[type] = {fn};
    if (handlerType === 'rename') this.renameFileHandlers[type] = {fn};
    if (handlerType === 'delete') this.deleteFileHandlers[type] = {fn};
    if (handlerType === 'download') this.downloadFromURLFileHandlers[type] = {fn};
    if (handlerType === 'move') this.moveFileHandlers[type] = {fn};
    if (handlerType === 'copy') this.copyFileHandlers[type] = {fn};

  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(currentPath: string, selector: string, type: string = null, data?: any): void {
    const loggerArgs = arguments;

    this.Modal.openRegisteredModal('input', selector,
      {
        title: 'Create new folder',
        text: 'Folder name',
        buttonText: 'Create',
        inputValue: 'NewFolder'
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        // Default SysOS handlers
        if (type === null || type === 'linux') {
          return this.FileSystem.createFolder((type === null ? null : data.connection.uuid), currentPath, name).subscribe(
          () => {
            this.refreshPath(currentPath);
          },
          error => {
            this.logger.error('FileSystemUI', 'UIcreateFolder -> Error while creating folder', loggerArgs, error);
          });
        }

        data.name = name;
        data.currentPath = currentPath;
        data.selector = selector;

        // Application specific handlers
        if (this.createFolderHandlers[type]) this.createFolderHandlers[type].fn(data);
      });
    });
  }

  /**
   * Rename file
   */
  UIrenameFile(currentPath: string, file: SysOSFile, selector: string, type: string = null, data?: any): void {
    const loggerArgs = arguments;

    this.Modal.openRegisteredModal('input', selector,
      {
        title: 'Rename file',
        text: 'File name',
        buttonText: 'Rename',
        inputValue: file.filename
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        // Default SysOS handlers
        if (type === null || type === 'linux') {
          return this.FileSystem.renameFile((type === null ? null : data.connection.uuid), currentPath, file.filename, name).subscribe(
          () => {
            this.refreshPath(currentPath);
          },
          error => {
            this.logger.error('FileSystemUI', 'UIrenameFile -> Error while renaming file', loggerArgs, error);
          });
        }

        data.name = name;
        data.currentPath = currentPath;
        data.file = file;
        data.selector = selector;

        // Application specific handlers
        if (this.renameFileHandlers[type]) this.renameFileHandlers[type].fn(data);
      });
    });
  }

  /**
   * Deletes selected files or folders
   */
  UIdeleteSelected(currentPath: string, file: SysOSFile, selector: string, type: string = null, data?: any): void {
    const loggerArgs = arguments;

    this.Modal.openRegisteredModal('question', selector,
      {
        title: `Delete file ${file.filename}`,
        text: `Delete ${file.filename} from ${
          type === null ? 'SysOS' :
          type === 'linux' ? `${data.connection.host} Server` :
          (data.typeText ? data.typeText : type)
        }?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          // Default SysOS handlers
          if (type === null || type === 'linux') {
            return this.FileSystem.deleteFile((type === null ? null : data.connection.uuid), currentPath, file.filename).subscribe(
            () => {
              this.refreshPath(currentPath);
            },
            error => {
              this.logger.error('FileSystemUI', 'UIdeleteSelected -> Error while deleting folder', loggerArgs, error);
            });
          }

          data.currentPath = currentPath;
          data.file = file;
          data.selector = selector;

          // Application specific handlers
          if (this.deleteFileHandlers[type]) this.deleteFileHandlers[type].fn(data);
        }
      });
    });
  }

  /**
   * Downloads content from URL
   */
  UIdownloadFromURL(currentPath: string, selector: string, type: string = null, data?: any): void {
    const loggerArgs = arguments;

    this.Modal.openRegisteredModal('input', selector,
      {
        title: 'Download file from URL',
        text: 'File URL',
        buttonText: 'Download',
        inputValue: ''
      }
    ).then((modalInstance) => {
      modalInstance.result.then((name: string) => {
        if (!name) return;

        // Default SysOS handlers
        if (type === null || type === 'linux') {
          return this.FileSystem.downloadFileFromInet((type === null ? null : data.connection.uuid), currentPath, name).subscribe(
            () => {
              this.refreshPath(currentPath);
              this.Toastr.success('File downloaded to ' + currentPath, 'Download file from URL');
            },
            error => {
              this.logger.error('FileSystemUI', 'UIdownloadFromURL -> Error while downloading file', loggerArgs, error);
            });
        }

        data.name = name;
        data.currentPath = currentPath;
        data.selector = selector;

        // Application specific handlers
        if (this.downloadFromURLFileHandlers[type]) this.downloadFromURLFileHandlers[type].fn(data);

      });

    });

  }

  /**
   * Paste selected files or folders
   */
  UIpasteFile(currentPath: string, type: string = null, applicationId: string = null, connectionUuid: string = null, data?: any): void {
    const loggerArgs = arguments;

    this.logger.debug('FileSystemUI', 'UIpasteFile', loggerArgs);

    if (this.currentCutCopyApplication && applicationId && this.currentCutCopyConnectionUuid && connectionUuid && this.currentCutCopyApplication !== applicationId) {
      this.logger.error('FileSystemUI', 'UIpasteFile -> C&P, D&D from different applications', arguments);
      this.Toastr.error('Remote to Remote is not allowed', 'Drag&Drop');
      return;
    }

    // Do not cut/copy files to same directory
    if (this.dataStore.cutFile && this.currentCutCopyApplication === applicationId && this.dataStore.cutFile.currentPath === currentPath) return;
    if (this.dataStore.copyFile && this.currentCutCopyApplication === applicationId && this.dataStore.copyFile.currentPath === currentPath) return;

    // Normal handler
    if (type === null || type === 'linux') {

      // Download from remote application
      if (this.currentCutCopyConnectionUuid && !connectionUuid) {
        this.sendDownloadRemoteFile({
          path: (this.dataStore.cutFile ? this.dataStore.cutFile.currentPath : this.dataStore.copyFile.currentPath),
          fileName: (this.dataStore.cutFile ? this.dataStore.cutFile.fileName : this.dataStore.copyFile.fileName),
          connectionUuid: this.currentCutCopyConnectionUuid,
          applicationId: this.currentCutCopyApplication
        });

        return;
        // Always make a copy
      }

      // Upload to remote application
      if (!this.currentCutCopyConnectionUuid && connectionUuid) {
        this.sendUploadToRemote({
          path: (this.dataStore.cutFile ? this.dataStore.cutFile.currentPath : this.dataStore.copyFile.currentPath),
          fileName: (this.dataStore.cutFile ? this.dataStore.cutFile.fileName : this.dataStore.copyFile.fileName),
          applicationId
        });

        return;
        // Always make a copy
      }

      if (this.dataStore.cutFile) {
        this.FileSystem.moveFile(
          (type === null ? null : data.connection.uuid),
          this.dataStore.cutFile.fullPath,
          currentPath + this.dataStore.cutFile.fileName
        ).subscribe(
          () => {
            // Refresh origin and remote paths
            this.refreshPath(this.dataStore.cutFile.currentPath);
            this.refreshPath(currentPath);

            // Reset cut & broadcast data to subscribers
            this.dataStore.cutFile = null;
            this.$cutFile.next(Object.assign({}, this.dataStore).cutFile);
          },
          error => {
            this.logger.error('FileSystemUI', 'UIpasteFile -> Error while moving file', loggerArgs, error);
          });

        return;
      }

      if (this.dataStore.copyFile) {
        this.FileSystem.copyFile(
          (type === null ? null : data.connection.uuid),
          this.dataStore.copyFile.fullPath,
          currentPath + this.dataStore.copyFile.fileName
        ).subscribe(
          () => {
            // Refresh remote path
            this.refreshPath(currentPath);

            // Reset copy & broadcast data to subscribers
            this.dataStore.copyFile = null;
            this.$copyFile.next(Object.assign({}, this.dataStore).copyFile);
          },
          error => {
            this.logger.error('FileSystemUI', 'UIpasteFile -> Error while copying file', loggerArgs, error);
          });

        return;
      }
    }

    // Application specific handlers
    data.cutFrom = this.dataStore.cutFile;
    data.copyFrom = this.dataStore.copyFile;
    data.pasteTo = currentPath;

    if (this.dataStore.cutFile && this.moveFileHandlers[type]) return this.moveFileHandlers[type].fn(data);
    if (this.dataStore.copyFile && this.copyFileHandlers[type]) return this.copyFileHandlers[type].fn(data);
  }

  /**
   * Copy File
   */
  UIcopyFile(currentPath: string, file: SysOSFile, applicationId: string = null, connectionUuid: string = null): void {
    this.logger.debug('FileSystemUI', 'UIcopyFile', arguments);

    this.dataStore.cutFile = null;
    this.dataStore.copyFile = {
      fileName: file.filename,
      currentPath,
      fullPath: currentPath + file.filename
    };

    // broadcast data to subscribers
    this.$cutFile.next(Object.assign({}, this.dataStore).cutFile);
    this.$copyFile.next(Object.assign({}, this.dataStore).copyFile);

  }

  /**
   * Cut file
   */
  UIcutFile(currentPath: string, file: SysOSFile, applicationId: string = null, connectionUuid: string = null): void {
    this.logger.debug('FileSystemUI', 'UIcutFile', arguments);

    this.currentCutCopyApplication = applicationId;
    this.currentCutCopyConnectionUuid = connectionUuid;

    this.dataStore.copyFile = null;
    this.dataStore.cutFile = {
      fileName: file.filename,
      currentPath,
      fullPath: currentPath + file.filename
    };

    // broadcast data to subscribers
    this.$copyFile.next(Object.assign({}, this.dataStore).copyFile);
    this.$cutFile.next(Object.assign({}, this.dataStore).cutFile);
  }

  /**
   * Checks if is a file or folder and do something
   */
  UIdoWithFile(applicationId: string, currentPath: string, file: SysOSFile): void {
    const loggerArgs = arguments;

    // Rewrite desktop folders to open file-explorer when clicking on it
    if (applicationId === null) applicationId = 'file-explorer';

    let realApplication = applicationId;
    const filetype = this.FileSystem.getFileType(file.longname);

    // Like SFTP application, applicationId could have a 'sub application'. The # symbol separates its values. Ex: sftp#local or sftp#server
    if (applicationId.indexOf('#') !== -1) realApplication = applicationId.substring(0, applicationId.indexOf('#'));

    if (filetype === 'folder') {

      if (!this.Applications.isApplicationOpened(realApplication)) {
        this.Applications.openApplication(realApplication, {
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

      // TODO remote applications?
      this.FileSystem.getFileContents(filePath).subscribe(
        (res: any) => {

          if (!this.Applications.isApplicationOpened('notepad')) {
            this.Applications.openApplication('notepad', {
              data: res
            });
          } else {
            // TODO: open new notepad tab
          }

        },
        error => {
          this.logger.error('FileSystemUI', 'UIdoWithFile -> Error while getting file contents', loggerArgs, error);
        });
    }
  }

  refreshPath(path: string): void {
    this.subjectRefreshPath.next(path);
  }

  /**
   * Observers
   */
  getObserverRefreshPath(): Observable<any> {
    return this.subjectRefreshPath.asObservable();
  }

  sendGoToPath(data: { application: string, path: string }): void {
    this.subjectGoToPath.next(data);
  }

  getObserverGoToPath(): Observable<any> {
    return this.subjectGoToPath.asObservable();
  }

  sendDownloadRemoteFile(data: { path: string, fileName: string, connectionUuid: string, applicationId: string }): void {
    this.subjectDownloadRemoteFile.next(data);
  }

  getObserverDownloadRemoteFile(): Observable<any> {
    return this.subjectDownloadRemoteFile.asObservable();
  }

  sendUploadToRemote(data: { path: string, fileName: string, applicationId: string }): void {
    this.subjectUploadFileToRemote.next(data);
  }

  getObserverUploadToRemote(): Observable<any> {
    return this.subjectUploadFileToRemote.asObservable();
  }

  sendUploadToSysOS(data: { dst: string, file: File, applicationId: string }): void {
    this.subjectUploadFileToSysOS.next(data);
  }

  getObserverUploadToSysOS(): Observable<any> {
    return this.subjectUploadFileToSysOS.asObservable();
  }
}

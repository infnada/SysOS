import {Injectable} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {NGXLogger} from 'ngx-logger';

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

  private $copyFrom: BehaviorSubject<string>;
  private $cutFrom: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    copyFrom: string,
    cutFrom: string
  };
  copyFrom: Observable<any>;
  cutFrom: Observable<any>;

  currentCopyCutFile: string = null;
  currentFileDrag: string = null;
  currentFileDragApplication: string = null;
  currentFileDragConnectionUuid: string = null;

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private FileSystem: SysosLibFileSystemService,
              private Applications: SysosLibApplicationService) {

    this.dataStore = {copyFrom: null, cutFrom: null};
    this.$copyFrom = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.$cutFrom = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.copyFrom = this.$copyFrom.asObservable();
    this.cutFrom = this.$cutFrom.asObservable();

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

    if (handlerType === 'folder') this.createFolderHandlers[type] = {fn: fn};
    if (handlerType === 'rename') this.renameFileHandlers[type] = {fn: fn};
    if (handlerType === 'delete') this.deleteFileHandlers[type] = {fn: fn};
    if (handlerType === 'download') this.downloadFromURLFileHandlers[type] = {fn: fn};
    if (handlerType === 'move') this.moveFileHandlers[type] = {fn: fn};
    if (handlerType === 'copy') this.copyFileHandlers[type] = {fn: fn};

  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(currentPath: string, selector: string, type: string = null, data?: any) {

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
            this.logger.error('[FileSystemUI] -> UIcreateFolder -> Error while creating folder -> ', error);
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
  UIrenameFile(currentPath: string, file: { longname: string, filename: string }, selector: string, type: string = null, data?: any) {
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
            this.logger.error('[FileSystemUI] -> UIrenameFile -> Error while renaming file -> ', error);
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
  UIdeleteSelected(currentPath: string, file: { longname: string, filename: string }, selector: string, type: string = null, data?: any) {
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
              this.logger.error('[FileSystemUI] -> UIdeleteSelected -> Error while deleting folder -> ', error);
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
   * Paste selected files or folders
   */
  UIpasteFile(currentPath: string, type: string = null, data?: any) {

    if (this.dataStore.cutFrom) {
      if (type === null || type === 'linux') {
        return this.FileSystem.moveFile((type === null ? null : data.connection.uuid), this.dataStore.cutFrom, currentPath + this.currentCopyCutFile).subscribe(
        () => {
          this.refreshPath(currentPath);
          this.dataStore.cutFrom = null;

          // broadcast data to subscribers
          this.$cutFrom.next(Object.assign({}, this.dataStore).cutFrom);
        },
        error => {
          this.logger.error('[FileSystemUI] -> UIpasteFile -> Error while moving file -> ', error);
        });
      }

      data.currentPath = currentPath;
      data.cutFrom = this.dataStore.cutFrom;
      data.pasteTo = currentPath + this.currentCopyCutFile;

      // Application specific handlers
      if (this.moveFileHandlers[type]) this.moveFileHandlers[type].fn(data);
    }

    if (this.dataStore.copyFrom) {
      if (type === null || type === 'linux') {
        return this.FileSystem.copyFile((type === null ? null : data.connection.uuid), this.dataStore.copyFrom, currentPath + this.currentCopyCutFile).subscribe(
        () => {
          this.refreshPath(currentPath);
          this.dataStore.copyFrom = null;

          // broadcast data to subscribers
          this.$copyFrom.next(Object.assign({}, this.dataStore).copyFrom);
        },
        error => {
          this.logger.error('[FileSystemUI] -> UIpasteFile -> Error while copying file -> ', error);
        });
      }

      data.currentPath = currentPath;
      data.cutFrom = this.dataStore.cutFrom;
      data.pasteTo = currentPath + this.currentCopyCutFile;

      // Application specific handlers
      if (this.copyFileHandlers[type]) this.copyFileHandlers[type].fn(data);
    }
  }

  /**
   * Downloads content from URL
   */
  UIdownloadFromURL(currentPath: string, selector: string, type: string = null, data?: any) {
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
            this.logger.error('[FileSystemUI] -> UIdownloadFromURL -> Error while downloading file -> ', error);
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
   * Copy File
   */
  UIcopyFile(currentPath: string, file: { longname: string, filename: string }) {
    this.dataStore.cutFrom = null;
    this.dataStore.copyFrom = currentPath + file.filename;

    // broadcast data to subscribers
    this.$cutFrom.next(Object.assign({}, this.dataStore).cutFrom);
    this.$copyFrom.next(Object.assign({}, this.dataStore).copyFrom);

  }

  /**
   * Cut file
   */
  UIcutFile(currentPath: string, file: { longname: string, filename: string }) {
    this.dataStore.copyFrom = null;
    this.dataStore.cutFrom = currentPath + file.filename;
    this.currentCopyCutFile = file.filename;

    // broadcast data to subscribers
    this.$copyFrom.next(Object.assign({}, this.dataStore).copyFrom);
    this.$cutFrom.next(Object.assign({}, this.dataStore).cutFrom);
  }

  /**
   * Checks if is a file or folder and do something
   */
  UIdoWithFile(applicationId: string, currentPath: string, file: { longname: string, filename: string }) {
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
          this.logger.error('[FileSystemUI] -> UIdoWithFile -> Error while getting file contents -> ', error);
        });
    }
  }

  /**
   * When dragging a file
   */
  setCurrentFileDrag(path: string, applicationId?: string, connectionUuid?: string): void {
    this.currentFileDrag = path;
    this.currentFileDragApplication = (applicationId ? applicationId : null);
    this.currentFileDragConnectionUuid = (connectionUuid ? connectionUuid : null);
  }

  /**
   * When dropping a dragged file
   */
  UIonDropItem(applicationId: string, $event: CdkDragDrop<any>, dropPath: string, connectionUuid?: string): void {

    // Download from remote application
    if (this.currentFileDragApplication && !connectionUuid) {
      console.log('download from server');
      this.sendDownloadRemoteFile({
        path: this.currentFileDrag,
        file: $event.item.data,
        connectionUuid: this.currentFileDragConnectionUuid,
        applicationId
      });

      return;
    }

    // Upload to remote application
    if (!this.currentFileDragApplication && connectionUuid) {
      console.log('upload to server');
      this.sendUploadToRemote({
        path: this.currentFileDrag,
        file: $event.item.data,
        applicationId
      });

      return;
    }

    if (this.currentFileDragApplication && applicationId && this.currentFileDragApplication !== applicationId) {
      this.logger.error('[FileSystemUI] -> UIonDropItem -> D&D from different applications -> drag [%s], drop [%s]', this.currentFileDragApplication, applicationId);
      this.Toastr.error('Remote to Remote is not allowed', 'Drag&Drop');
      return;
    }

    // Do not move files to same directory
    if (this.currentFileDrag === dropPath) return;

    // D&D from/to same applications or local/local
    // TODO remote application
    this.FileSystem.moveFile(connectionUuid,
      this.currentFileDrag + $event.item.data.filename,
      dropPath + $event.item.data.filename
    ).subscribe(
      () => {

        this.refreshPath(this.currentFileDrag);
        this.refreshPath(dropPath);
      },
      error => {
        this.logger.error('[FileSystemUI] -> UIonDropItem -> Error while moving file -> ', error);
      });
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

  sendDownloadRemoteFile(data: { path: string, file: SysOSFile, connectionUuid: string, applicationId: string }): void {
    this.subjectDownloadRemoteFile.next(data);
  }

  getObserverDownloadRemoteFile(): Observable<any> {
    return this.subjectDownloadRemoteFile.asObservable();
  }

  sendUploadToRemote(data: { path: string, file: SysOSFile, applicationId: string }): void {
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

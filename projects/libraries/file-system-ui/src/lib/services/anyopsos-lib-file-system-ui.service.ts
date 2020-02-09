import {Injectable, ViewContainerRef} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';

import {CutCopyFile} from '../types/cut-copy-file';
import {FileSystemHandler} from '../types/file-system-handler';
import {SendFileExchange} from '../types/send-file-exchange';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibFileSystemUiService {

  private readonly subjectRefreshPath: Subject<string> = new Subject();
  private readonly subjectGoToPath: Subject<{ application: string; path: string; }> = new Subject();
  private readonly subjectFileExchange: Subject<SendFileExchange> = new Subject();

  private readonly $copyFile: BehaviorSubject<CutCopyFile>;
  private readonly $cutFile: BehaviorSubject<CutCopyFile>;
  private dataStore: {
    copyFile: CutCopyFile;
    cutFile: CutCopyFile;
  };
  readonly copyFile: Observable<CutCopyFile>;
  readonly cutFile: Observable<CutCopyFile>;

  private currentCutCopyApplication: string = null;
  private currentCutCopyConnectionUuid: string = null;

  constructor(private readonly logger: AnyOpsOSLibLoggerService) {

    this.dataStore = { copyFile: null, cutFile: null };
    this.$copyFile = new BehaviorSubject(this.dataStore.copyFile);
    this.$cutFile = new BehaviorSubject(this.dataStore.cutFile);
    this.copyFile = this.$copyFile.asObservable();
    this.cutFile = this.$cutFile.asObservable();
  }

  /**
   * handlers by custom Applications
   */
  private doWithFileHandlers: {[type: string]: { fn: any }} = {};

  private getFolderHandlers: {[type: string]: { fn: any }} = {};
  private putFolderHandlers: {[type: string]: { fn: any }} = {};

  private getFileHandlers: {[type: string]: { fn: any }} = {};
  private deleteFileHandlers: {[type: string]: { fn: any }} = {};
  private renameFileHandlers: {[type: string]: { fn: any }} = {};

  private moveFileHandlers: {[type: string]: { fn: any }} = {};
  private copyFileHandlers: {[type: string]: { fn: any }} = {};

  private downloadFileHandlers: {[type: string]: { fn: any }} = {};
  private uploadFileHandlers: {[type: string]: { fn: any }} = {};
  private downloadFromURLFileHandlers: {[type: string]: { fn: any }} = {};

  /**
   * Called by custom Applications
   */
  createHandler(handlerType: FileSystemHandler, type: string, fn: (data?) => Promise<any>) {

    if (handlerType === 'do_with_file') this.doWithFileHandlers[type] = {fn};
    if (handlerType === 'get_folder') this.getFolderHandlers[type] = {fn};
    if (handlerType === 'put_folder') this.putFolderHandlers[type] = {fn};
    if (handlerType === 'get_file') this.getFileHandlers[type] = {fn};
    if (handlerType === 'rename') this.renameFileHandlers[type] = {fn};
    if (handlerType === 'delete') this.deleteFileHandlers[type] = {fn};
    if (handlerType === 'move') this.moveFileHandlers[type] = {fn};
    if (handlerType === 'copy') this.copyFileHandlers[type] = {fn};
    if (handlerType === 'download') this.downloadFileHandlers[type] = {fn};
    if (handlerType === 'upload') this.uploadFileHandlers[type] = {fn};
    if (handlerType === 'download_from_url') this.downloadFromURLFileHandlers[type] = {fn};

  }

  /**
   * ---------
   * Folder API
   * ---------
   */

  /**
   * Creates a new folder
   */
  async UIgetFolder(srcPath: string, connectionType: string = null, data: { [key: string]: any; } = {}): Promise<AnyOpsOSFile[]> {

    if (this.getFolderHandlers[connectionType]) {
      data.srcPath = srcPath;

      return this.getFolderHandlers[connectionType].fn(data).then((pathData: AnyOpsOSFile[]) => {
        return pathData;
      });
    }
  }

  /**
   * Creates a new folder
   */
  async UIputFolder(dstPath: string, viewContainerRef: ViewContainerRef, connectionType: string = null, data: { [key: string]: any; } = {}): Promise<unknown> {

    if (this.putFolderHandlers[connectionType]) {
      data.dstPath = dstPath;
      data.viewContainerRef = viewContainerRef;

      return this.putFolderHandlers[connectionType].fn(data).then((putData: unknown) => {
        return putData;
      });
    }
  }

  /**
   * ---------
   * File API
   * ---------
   */

  /**
   * Deletes selected files or folders
   */
  async UIdeleteFile(srcPath: string, file: AnyOpsOSFile, viewContainerRef: ViewContainerRef, connectionType: string = null, data: { [key: string]: any; } = {}): Promise<unknown> {

    if (this.deleteFileHandlers[connectionType]) {
      data.srcPath = srcPath;
      data.file = file;
      data.viewContainerRef = viewContainerRef;

      return this.deleteFileHandlers[connectionType].fn(data).then((deleteData: unknown) => {
        return deleteData;
      });
    }
  }

  /**
   * Rename file
   */
  async UIrenameFile(srcPath: string, file: AnyOpsOSFile, viewContainerRef: ViewContainerRef, connectionType: string = null, data: { [key: string]: any; } = {}): Promise<unknown> {

    if (this.renameFileHandlers[connectionType]) {
      data.srcPath = srcPath;
      data.file = file;
      data.viewContainerRef = viewContainerRef;

      return this.renameFileHandlers[connectionType].fn(data).then((renameData: unknown) => {
        return renameData;
      });
    }
  }

  /**
   * Paste selected files or folders
   */
  UIpasteFile(dstPath: string, connectionType: string = null, applicationId: string = null, connectionUuid: string = null, data: { [key: string]: any; } = {}): Promise<unknown> {
    this.logger.debug('FileSystemUI', 'UIpasteFile', arguments);

    if (this.currentCutCopyApplication && applicationId && this.currentCutCopyConnectionUuid && connectionUuid && this.currentCutCopyApplication !== applicationId) {
      this.logger.error('FileSystemUI', 'Drag&Drop -> C&P, D&D Remote to Remote is not allowed', arguments);
      return;
    }

    // Do not cut/copy files to same directory
    if (this.dataStore.cutFile && this.currentCutCopyApplication === applicationId && this.dataStore.cutFile.currentPath === dstPath) return;
    if (this.dataStore.copyFile && this.currentCutCopyApplication === applicationId && this.dataStore.copyFile.currentPath === dstPath) return;

    // Download from remote
    if (this.currentCutCopyConnectionUuid && !connectionUuid) {

      if (this.downloadFileHandlers[connectionType]) {
        data.srcPath = (this.dataStore.cutFile ? this.dataStore.cutFile.currentPath : this.dataStore.copyFile.currentPath);
        data.dstPath = dstPath;
        data.applicationId = applicationId;

        return this.downloadFileHandlers[connectionType].fn(data).then((downloadData: unknown) => {
          this.dataStore.copyFile = null;
          this.$copyFile.next(Object.assign({}, this.dataStore).copyFile);
          this.dataStore.cutFile = null;
          this.$cutFile.next(Object.assign({}, this.dataStore).cutFile);

          return downloadData;
        });
      }

      return;
    }

    // Upload to remote
    if (!this.currentCutCopyConnectionUuid && connectionUuid) {

      if (this.uploadFileHandlers[connectionType]) {
        data.srcPath = (this.dataStore.cutFile ? this.dataStore.cutFile.currentPath : this.dataStore.copyFile.currentPath);
        data.dstPath = dstPath;
        data.applicationId = applicationId;

        return this.uploadFileHandlers[connectionType].fn(data).then((uploadData: unknown) => {

          // Reset copyFile & cutFile
          this.dataStore.copyFile = null;
          this.$copyFile.next(Object.assign({}, this.dataStore).copyFile);
          this.dataStore.cutFile = null;
          this.$cutFile.next(Object.assign({}, this.dataStore).cutFile);

          return uploadData;
        });
      }

      return;
    }

    // Normal handlers
    if (this.dataStore.cutFile) {

      if (this.moveFileHandlers[connectionType]) {
        data.cutFile = this.dataStore.cutFile;
        data.dstPath = dstPath;

        return  this.moveFileHandlers[connectionType].fn(data).then((cutData: unknown) => {

          // Reset cutFrom
          this.dataStore.cutFile = null;
          this.$cutFile.next(Object.assign({}, this.dataStore).cutFile);

          return cutData;
        });
      }
    }

    if (this.dataStore.copyFile) {

      if (this.moveFileHandlers[connectionType]) {
        data.copyFile = this.dataStore.copyFile;
        data.dstPath = dstPath;

        return this.moveFileHandlers[connectionType].fn(data).then((copyData: unknown) => {

          // Reset copyFile
          this.dataStore.copyFile = null;
          this.$copyFile.next(Object.assign({}, this.dataStore).copyFile);

          return copyData;
        });
      }
    }
  }

  /**
   * Copy File
   */
  UIcopyFile(srcPath: string, file: AnyOpsOSFile, applicationId: string, connectionUuid: string = null): void {
    this.logger.debug('FileSystemUI', 'UIcopyFile', arguments);

    this.currentCutCopyApplication = applicationId;
    this.currentCutCopyConnectionUuid = connectionUuid;

    this.dataStore.cutFile = null;
    this.dataStore.copyFile = {
      fileName: file.fileName,
      currentPath: srcPath,
      fullPath: srcPath + file.fileName
    };

    // broadcast data to subscribers
    this.$cutFile.next(Object.assign({}, this.dataStore).cutFile);
    this.$copyFile.next(Object.assign({}, this.dataStore).copyFile);
  }

  /**
   * Cut file
   */
  UIcutFile(srcPath: string, file: AnyOpsOSFile, applicationId: string, connectionUuid: string = null): void {
    this.logger.debug('FileSystemUI', 'UIcutFile', arguments);

    this.currentCutCopyApplication = applicationId;
    this.currentCutCopyConnectionUuid = connectionUuid;

    this.dataStore.copyFile = null;
    this.dataStore.cutFile = {
      fileName: file.fileName,
      currentPath: srcPath,
      fullPath: srcPath + file.fileName
    };

    // broadcast data to subscribers
    this.$copyFile.next(Object.assign({}, this.dataStore).copyFile);
    this.$cutFile.next(Object.assign({}, this.dataStore).cutFile);
  }

  /**
   * Downloads content from URL
   */
  async UIdownloadFromURL(dstPath: string, viewContainerRef: ViewContainerRef, connectionType: string = null, data: { [key: string]: any; } = {}): Promise<unknown> {

    if (this.downloadFromURLFileHandlers[connectionType]) {
      data.dstPath = dstPath;
      data.viewContainerRef = viewContainerRef;

      return this.downloadFromURLFileHandlers[connectionType].fn(data).then((downloadFromUrlData: unknown) => {
        return downloadFromUrlData;
      });
    }
  }

  /**
   * Upload file
   */
  async UIuploadFile(srcPath: string, dstPath: string, file: File, connectionType: string = null, applicationId: string = null, data: { [key: string]: any; } = {}): Promise<unknown> {

    if (this.uploadFileHandlers[connectionType]) {
      data.srcPath = srcPath;
      data.dstPath = dstPath;
      data.file = file;
      data.applicationId = applicationId;

      return this.uploadFileHandlers[connectionType].fn(data).then((uploadData: unknown) => {
        return uploadData;
      });
    }
  }

  /**
   * Download file
   */
  async UIdownloadFile(srcPath: string, dstPath: string, connectionType: string = null, applicationId: string = null, data: { [key: string]: any; } = {}): Promise<unknown> {

    if (this.uploadFileHandlers[connectionType]) {
      data.srcPath = srcPath;
      data.dstPath = dstPath;
      data.applicationId = applicationId;

      return this.uploadFileHandlers[connectionType].fn(data).then((uploadData: unknown) => {
        return uploadData;
      });
    }
  }

  /**
   * Checks if is a file or folder and do something
   */
  UIdoWithFile(srcPath: string, file: AnyOpsOSFile, applicationId: string = null, connectionType: string = null, data: { [key: string]: any; } = {}): void {
    if (this.uploadFileHandlers[connectionType]) {
      data.srcPath = srcPath;
      data.file = file;
      data.applicationId = applicationId;

      return this.doWithFileHandlers[connectionType].fn(data).then((doWithFileData: unknown) => {
        return doWithFileData;
      });
    }
  }

  /**
   * ---------
   * Observers
   * ---------
   */

  /**
   * This Observer is fired when data in a certain path changes. So all applications maintain a valid state for the current 'path'
   */
  sendRefreshPath(path: string): void {
    this.subjectRefreshPath.next(path);
  }

  getObserverRefreshPath(): Observable<string> {
    return this.subjectRefreshPath.asObservable();
  }


  /**
   * Workaround to share pathChange between Controllers (like Action and Body Controllers)
   */
  sendGoToPath(data: { application: string; path: string; }): void {
    this.subjectGoToPath.next(data);
  }

  getObserverGoToPath(): Observable<{ application: string; path: string; }> {
    return this.subjectGoToPath.asObservable();
  }

  /**
   * Uploads & Downloads Observers
   *
   * Used by others to see when a files is uploading or downloading
   */
  sendFileExchange(data: SendFileExchange): void {
    this.subjectFileExchange.next(data);
  }

  getObserverSendFileExchange(): Observable<SendFileExchange> {
    return this.subjectFileExchange.asObservable();
  }
}

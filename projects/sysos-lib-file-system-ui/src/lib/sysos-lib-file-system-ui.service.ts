import {Injectable} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {NGXLogger} from 'ngx-logger';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosLibVmwareService} from '@sysos/lib-vmware';
import {SysOSFile} from '@sysos/lib-types';
import {IMConnection, SftpConnection, DatastoreExplorerConnection} from '@sysos/lib-types';


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
              private Applications: SysosLibApplicationService,
              private VMWare: SysosLibVmwareService) {

    this.dataStore = {copyFrom: null, cutFrom: null};
    this.$copyFrom = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.$cutFrom = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.copyFrom = this.$copyFrom.asObservable();
    this.cutFrom = this.$cutFrom.asObservable();

  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(connection: null|IMConnection|SftpConnection|DatastoreExplorerConnection, currentPath: string, selector: string) {
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

        if (connection === null || connection.type === 'linux') {
          this.FileSystem.createFolder((connection === null ? null : connection.uuid), currentPath, name).subscribe(
            () => {
              this.refreshPath(currentPath);
            },
            error => {
              this.logger.error('[FileSystemUI] -> UIcreateFolder -> Error while creating folder -> ', error);
            });
        }

        if (connection.type === 'vmware') {
          this.Modal.openLittleModal('PLEASE WAIT', 'Creating folder...', selector, 'plain');

          this.VMWare.createFolderToDatastore(
            connection.credential,
            connection.host,
            connection.port,
            (connection as DatastoreExplorerConnection).name,
            currentPath + name,
            (connection as DatastoreExplorerConnection).datacenter
          ).then((data) => {
            if (data.status === 'error') throw new Error('Failed to create folder');

            this.Modal.closeModal(selector);

            this.refreshPath(currentPath);
          }).catch((error) => {
            this.logger.error('[DatastoreExplorerServer] -> UIcreateFolder -> Error while creating folder -> ', error);
            this.Modal.closeModal(selector);
          });
        }
      });
    });
  }

  /**
   * Rename file
   */
  UIrenameFile(connection: null|IMConnection|SftpConnection|DatastoreExplorerConnection, currentPath: string, file: { longname: string, filename: string }, selector: string) {
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

        if (connection === null || connection.type === 'linux') {
          this.FileSystem.renameFile((connection === null ? null : connection.uuid), currentPath, file.filename, name).subscribe(
            () => {
              this.refreshPath(currentPath);
            },
            error => {
              this.logger.error('[FileSystemUI] -> UIrenameFile -> Error while renaming file -> ', error);
            });
        }

        if (connection.type === 'vmware') {
          this.Modal.openLittleModal('PLEASE WAIT', 'Moving file...', selector, 'plain');

          this.VMWare.moveFileFromDatastore(
            connection.credential,
            connection.host,
            connection.port,
            (connection as DatastoreExplorerConnection).name,
            currentPath + file.filename, // original file name
            (connection as DatastoreExplorerConnection).datacenter,
            (connection as DatastoreExplorerConnection).name,
            currentPath + name, // new file name
            (connection as DatastoreExplorerConnection).datacenter
          ).then((data) => {
            if (data.status === 'error') throw new Error('Failed to rename the fie');

            this.Modal.closeModal(selector);

            this.refreshPath(currentPath);
          }).catch((error) => {
            this.logger.error('[DatastoreExplorerServer] -> UIcreateFolder -> Error while creating folder -> ', error);
            this.Modal.closeModal(selector);
          });
        }
      });
    });
  }

  /**
   * Deletes selected files or folders
   */
  UIdeleteSelected(connection: null|IMConnection|SftpConnection|DatastoreExplorerConnection, currentPath: string, file: { longname: string, filename: string }, selector: string) {
    this.Modal.openRegisteredModal('question', selector,
      {
        title: `Delete file ${file.filename}`,
        text: `Delete ${file.filename} from ${
          connection === null ? 'SysOS' :
            connection.type === 'linux' ? `${connection.host} Server` :
              `${(connection as DatastoreExplorerConnection).name} Datastore`
          }?`
      }
    ).then((modalInstance) => {
      modalInstance.result.then((result: boolean) => {
        if (result === true) {

          if (connection === null || connection.type === 'linux') {
            this.FileSystem.deleteFile((connection === null ? null : connection.uuid), currentPath, file.filename).subscribe(
              () => {
                this.refreshPath(currentPath);
              },
              error => {
                this.logger.error('[FileSystemUI] -> UIdeleteSelected -> Error while deleting folder -> ', error);
              });
          }

          if (connection.type === 'vmware') {
            this.Modal.openLittleModal('PLEASE WAIT', 'Deleting file...', selector, 'plain');

            this.VMWare.deleteFileFromDatastore(
              connection.credential,
              connection.host,
              connection.port,
              (connection as DatastoreExplorerConnection).name,
              currentPath + file.filename,
              (connection as DatastoreExplorerConnection).datacenter
            ).then((data) => {
              if (data.status === 'error') throw new Error('Failed to delete the fie');

              this.Modal.closeModal(selector);

              this.refreshPath(currentPath);
            }).catch((error) => {
              this.logger.error('[DatastoreExplorerServer] -> UIcreateFolder -> Error while creating folder -> ', error);
              this.Modal.closeModal(selector);
            });
          }
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
      return this.FileSystem.moveFile(connectionUuid, this.dataStore.cutFrom, pasteTo + this.currentCopyCutFile).subscribe(
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

    if (this.dataStore.copyFrom) {
      return this.FileSystem.copyFile(connectionUuid, this.dataStore.copyFrom, pasteTo + this.currentCopyCutFile).subscribe(
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
  }

  /**
   * Downloads content from URL
   */
  UIdownloadFromURL(connectionUuid: string, currentPath: string, selector: string) {
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

        return this.FileSystem.downloadFileFromInet(connectionUuid, currentPath, name).subscribe(
          () => {
            this.refreshPath(currentPath);
            this.Toastr.success('File downloaded to ' + currentPath, 'Download file from URL');
          },
          error => {
            this.logger.error('[FileSystemUI] -> UIdownloadFromURL -> Error while downloading file -> ', error);
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

    // Like SFTP application, applicationId could have a 'sub application'. The # symbol separates its values.
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

  setCurrentFileDrag(path: string, applicationId?: string, connectionUuid?: string): void {
    this.currentFileDrag = path;
    this.currentFileDragApplication = (applicationId ? applicationId : null);
    this.currentFileDragConnectionUuid = (connectionUuid ? connectionUuid : null);
  }

  UIonDropItem(applicationId: string, $event: CdkDragDrop<any>, dropPath: string, connectionUuid?: string): void {

    // Download from server
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

    // Upload to server
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

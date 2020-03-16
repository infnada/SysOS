import {Injectable, ViewContainerRef} from '@angular/core';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemUiHelpersService, AnyOpsOSLibFileSystemUiService, CutCopyFile, SendFileExchange} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSLibFileSystemService} from './anyopsos-lib-file-system.service';


@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibFileSystemFileHandlersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly FileSystemUiHelpers: AnyOpsOSLibFileSystemUiHelpersService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibApplication: AnyOpsOSLibApplicationService) {
  }

  registerFileSystemUiHandlers(): void {

    this.LibFileSystemUi.createHandler(
      'get_folder',
      null,
      (data: { srcPath: string; }
    ): Promise<AnyOpsOSFile[]> => {

      return new Promise((resolve, reject) => {

        this.LibFileSystem.getFolder(data.srcPath).subscribe(
          (res: BackendResponse & { data: AnyOpsOSFile[]; }) => {
            if (res.status === 'error') {
              this.logger.error('LibFileSystemUi', 'UIgetFolder -> Error while getting folder', null, res.data);
              return reject(res.data);
            }

            return resolve(res.data);
          },
          (error: any) => {
            this.logger.error('LibFileSystemUi', 'Error while getting fileSystemPath', null, error);
          });
      });
    });

    this.LibFileSystemUi.createHandler(
      'put_folder',
      null,
      (data: { dstPath: string; viewContainerRef: ViewContainerRef; }
    ): Promise<void> => {

      return new Promise(async (resolve, reject) => {

        const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('input', data.viewContainerRef,
          {
            title: 'Create new folder',
            buttonText: 'Create',
            inputPlaceholder: 'Folder name',
            inputValue: 'NewFolder'
          }
        );

        modalInstance.afterClosed().subscribe((folderName: string) => {
          if (!folderName) return resolve();

          this.LibFileSystem.putFolder(data.dstPath, folderName).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibFileSystemUi', 'UIputFolder -> Error while creating folder', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendRefreshPath(data.dstPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibFileSystemUi', 'UIputFolder -> Error while creating folder', null, error);
              return reject(error);
            });
        });
      });
    });

    this.LibFileSystemUi.createHandler(
      'rename',
      null,
      (data: { srcPath: string; file: AnyOpsOSFile; viewContainerRef: ViewContainerRef; }
    ): Promise<void> => {

      return new Promise(async (resolve, reject) => {

        const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('input', data.viewContainerRef,
          {
            title: 'Rename file',
            buttonText: 'Rename',
            inputPlaceholder: 'File name',
            inputValue: data.file.fileName
          }
        );

        modalInstance.afterClosed().subscribe((fileName: string) => {
          if (!fileName) return resolve();

          this.LibFileSystem.renameFile(data.srcPath, data.file.fileName, fileName).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibFileSystemUi', 'UIrenameFile -> Error while renaming file', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendRefreshPath(data.srcPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibFileSystemUi', 'UIrenameFile -> Error while renaming file', null, error);
              return reject(error);
            });
        });
      });
    });

    this.LibFileSystemUi.createHandler(
      'delete',
      null,
      (data: { srcPath: string; file: AnyOpsOSFile; viewContainerRef: ViewContainerRef; }
    ): Promise<void> => {

      return new Promise(async (resolve, reject) => {

        const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', data.viewContainerRef,
          {
            title: `Delete file ${data.file.fileName}`,
            text: `Delete ${data.file.fileName} from anyOpsOS?`,
            yes: 'Delete',
            yesClass: 'warn',
            no: 'Cancel',
            boxContent: 'This action is permanent.',
            boxClass: 'text-danger',
            boxIcon: 'warning'
          }
        );

        modalInstance.afterClosed().subscribe((result: string) => {
          if (!result) return resolve();

          this.LibFileSystem.deleteFile(data.srcPath, data.file.fileName).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibFileSystemUi', 'UIdeleteFile -> Error while deleting file', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendRefreshPath(data.srcPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibFileSystemUi', 'UIdeleteFile -> Error while deleting folder', null, error);
              return reject(error);
            });
        });
      });
    });

    this.LibFileSystemUi.createHandler(
      'move',
      null,
      (data: { srcPath: string; cutFile: CutCopyFile; }
    ): Promise<void> => {

      return new Promise((resolve, reject) => {

        this.LibFileSystem.moveFile(
          data.cutFile.fullPath,
          data.srcPath + data.cutFile.fileName
        ).subscribe(
          (res: BackendResponse) => {
            if (res.status === 'error') {
              this.logger.error('LibFileSystemUi', 'UIpasteFile -> Error while moving file', null, res.data);
              return reject(res.data);
            }

            // Refresh origin and remote paths
            this.LibFileSystemUi.sendRefreshPath(data.srcPath);
            this.LibFileSystemUi.sendRefreshPath(data.cutFile.currentPath);

            return resolve();
          },
          (error: any) => {
            this.logger.error('LibFileSystemUi', 'UIpasteFile -> Error while moving file', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler(
      'copy',
      null,
      (data: { srcPath: string; copyFile: CutCopyFile; }
    ): Promise<void> => {

      return new Promise((resolve, reject) => {

        this.LibFileSystem.copyFile(
          data.copyFile.fullPath,
          data.srcPath + data.copyFile.fileName
        ).subscribe(
          (res: BackendResponse) => {
            if (res.status === 'error') {
              this.logger.error('LibFileSystemUi', 'UIpasteFile -> Error while copying file', null, res.data);
              return reject(res.data);
            }

            this.LibFileSystemUi.sendRefreshPath(data.srcPath);

            return resolve();
          },
          (error: any) => {
            this.logger.error('LibFileSystemUi', 'UIpasteFile -> Error while copying file', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler(
      'download',
      null,
      (data: { srcPath: string; }
    ): Promise<void> => {

      return new Promise((resolve, reject) => {

        this.LibFileSystem.getFile(data.srcPath).subscribe(
          (res: BackendResponse) => {
            if (res.status === 'error') {
              this.logger.error('LibFileSystemUi', 'UIpasteFile -> Error while downloading file', null, res.data);
              return reject(res.data);
            }

            this.LibFileSystemUi.sendFileExchange({
              type: 'download',
              progress: 0,
              srcPath: data.srcPath,
              dstPath: 'local',
              srcConnectionUuid: null,
              dstConnectionUuid: null,
              srcApplicationId: '',
              dstApplicationId: null
            } as SendFileExchange);

            return resolve();
          },
          (error: any) => {
            this.logger.error('LibFileSystemUi', 'UIpasteFile -> Error while downloading file', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler(
      'upload',
      null,
      (data: { dstPath: string; file: File; }
    ): Promise<void> => {

      return new Promise((resolve, reject) => {

        this.LibFileSystem.putFile(data.dstPath, data.file).subscribe(
          (event: { loaded: number, total: number }) => {
            const percentage: number = parseInt(((event.loaded * 100) / event.total).toFixed(), 10);

            this.LibFileSystemUi.sendFileExchange({
              type: 'upload',
              progress: percentage,
              srcPath: 'local',
              dstPath: data.dstPath,
              srcConnectionUuid: null,
              dstConnectionUuid: null,
              srcApplicationId: null,
              dstApplicationId: ''
            } as SendFileExchange);

            if (percentage === 100) {
              this.LibFileSystemUi.sendRefreshPath(data.dstPath);
              return resolve();
            }

          },
          (error: any) => {
            this.logger.error('LibFileSystemUi', 'UIuploadFileToAnyOpsOS -> Error uploading file', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler('chmod', null, (data: unknown): Promise<void> => {
      return Promise.resolve();
    });

    this.LibFileSystemUi.createHandler('chown', null, (data: unknown): Promise<void> => {
      return Promise.resolve();
    });

    this.LibFileSystemUi.createHandler(
      'download_from_url',
      null,
      (data: { dstPath: string; viewContainerRef: ViewContainerRef; }
    ): Promise<void> => {

      return new Promise(async (resolve, reject) => {

        const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('input', data.viewContainerRef,
          {
            title: 'Download file from URL',
            buttonText: 'Download',
            inputPlaceholder: 'File URL',
            inputValue: ''
          }
        );

        modalInstance.afterClosed().subscribe((url: string) => {
          if (!url) return resolve();

          this.LibFileSystem.downloadFileFromUrl(data.dstPath, url).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibFileSystemUi', 'UIdownloadFromURL -> Error while downloading file', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendFileExchange({
                type: 'download_from_url',
                progress: 0,
                srcPath: url,
                dstPath: data.dstPath,
                srcConnectionUuid: null,
                dstConnectionUuid: '',
                srcApplicationId: null,
                dstApplicationId: ''
              } as SendFileExchange);

              this.LibFileSystemUi.sendRefreshPath(data.dstPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibFileSystemUi', 'UIdownloadFromURL -> Error while downloading file', null, error);
              return reject(error);
            });
        });
      });
    });

    this.LibFileSystemUi.createHandler('do_with_file', null, (data: { srcPath: string; file: AnyOpsOSFile; applicationId: string; }): Promise<void> => {
      console.log(data);

      const filetype: string = this.FileSystemUiHelpers.getFileType(data.file.longName);
      let realApplication: string = data.applicationId.indexOf('#') !== -1 ? data.applicationId.substring(0, data.applicationId.indexOf('#')) : data.applicationId;

      if (filetype === 'folder') {

        // If no applicationId is provided, always open a folder with 'file-explorer' application
        if (data.applicationId === 'null#local') {
          realApplication = 'file-explorer';
          data.applicationId = 'file-explorer#local';
        }

        if (!this.LibApplication.isApplicationOpened(realApplication)) {
          this.LibApplication.openApplication(realApplication, {
            path: data.srcPath + data.file.fileName + '/'
          });

          return Promise.resolve();
        }

        this.LibFileSystemUi.sendGoToPath({
          application: data.applicationId,
          path: data.srcPath + data.file.fileName + '/'
        });

        return Promise.resolve();
      }

      // File, always open with 'notepad' application
      this.LibApplication.openApplication('notepad', {
        data: data.srcPath + data.file.fileName
      });

      return Promise.resolve();
    });

  }

}

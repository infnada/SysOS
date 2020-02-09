import {Injectable, ViewContainerRef} from '@angular/core';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemUiService, CutCopyFile, SendFileExchange} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {ConnectionSftp} from '@anyopsos/module-ssh';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';

import {AnyOpsOSLibSshFileSystemService} from './anyopsos-lib-ssh-file-system.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibSshFileSystemHandlersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly SshFileSystem: AnyOpsOSLibSshFileSystemService) {
  }

  registerFileSystemUiHandlers(): void {

    this.LibFileSystemUi.createHandler(
      'get_folder',
      'sftp',
      (data: { srcPath: string; connection: ConnectionSftp; }
    ): Promise<AnyOpsOSFile[]> => {

      return new Promise((resolve, reject) => {

        this.SshFileSystem.getFolder(data.srcPath, data.connection.uuid).subscribe(
          (res: BackendResponse & { data: AnyOpsOSFile[]; }) => {
            if (res.status === 'error') {
              this.logger.error('LibSsh', 'UIgetFolder -> Error while getting folder', null, res.data);
              return reject(res.data);
            }

            return resolve(res.data);
          },
          (error: any) => {
            this.logger.error('LibSsh', 'Error while getting fileSystemPath', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler(
      'put_folder',
      'sftp',
      (data: { srcPath: string; viewContainerRef: ViewContainerRef; connection: ConnectionSftp; }
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

          this.SshFileSystem.putFolder(data.srcPath, folderName, data.connection.uuid).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibSsh', 'UIputFolder -> Error while creating folder', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendRefreshPath(data.srcPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibSsh', 'UIputFolder -> Error while creating folder', null, error);
              return reject(error);
            });
        });
      });
    });

    this.LibFileSystemUi.createHandler(
      'rename',
      'sftp',
      (data: { srcPath: string; file: AnyOpsOSFile; viewContainerRef: ViewContainerRef; connection: ConnectionSftp; }
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

          this.SshFileSystem.renameFile(data.srcPath, data.file.fileName, fileName, data.connection.uuid).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibSsh', 'UIrenameFile -> Error while renaming file', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendRefreshPath(data.srcPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibSsh', 'UIrenameFile -> Error while renaming file', null, error);
              return reject(error);
            });
        });
      });
    });

    this.LibFileSystemUi.createHandler(
      'delete',
      'sftp',
      (data: { srcPath: string; file: AnyOpsOSFile; viewContainerRef: ViewContainerRef; connection: ConnectionSftp; }
    ): Promise<void> => {

      return new Promise(async (resolve, reject) => {

        const modalInstance: MatDialogRef<any> = await this.LibModal.openRegisteredModal('question', data.viewContainerRef,
          {
            title: `Delete file ${data.file.fileName}`,
            text: `Delete ${data.file.fileName} from ${data.connection.host} Server?`,
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

          this.SshFileSystem.deleteFile(data.srcPath, data.file.fileName, data.connection.uuid).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibSsh', 'UIdeleteFile -> Error while deleting file', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendRefreshPath(data.srcPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibSsh', 'UIdeleteFile -> Error while deleting folder', null, error);
              return reject(error);
            });
        });
      });
    });

    this.LibFileSystemUi.createHandler(
      'move',
      'sftp',
      (data: { cutFile: CutCopyFile; dstPath: string; connection: ConnectionSftp; }
    ): Promise<void> => {

      return new Promise((resolve, reject) => {

        this.SshFileSystem.moveFile(
          data.cutFile.fullPath,
          data.dstPath + data.cutFile.fileName,
          data.connection.uuid
        ).subscribe(
          (res: BackendResponse) => {
            if (res.status === 'error') {
              this.logger.error('LibSsh', 'UIpasteFile -> Error while moving file', null, res.data);
              return reject(res.data);
            }

            // Refresh origin and remote paths
            this.LibFileSystemUi.sendRefreshPath(data.cutFile.currentPath);
            this.LibFileSystemUi.sendRefreshPath(data.dstPath);

            return resolve();
          },
          (error: any) => {
            this.logger.error('LibSsh', 'UIpasteFile -> Error while moving file', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler(
      'copy',
      'sftp',
      (data: { dstPath: string; copyFile: CutCopyFile; connection: ConnectionSftp; }
    ): Promise<void> => {

      return new Promise((resolve, reject) => {

        this.SshFileSystem.copyFile(
          data.copyFile.fullPath,
          data.dstPath + data.copyFile.fileName,
          data.connection.uuid,
        ).subscribe(
          (res: BackendResponse) => {
            if (res.status === 'error') {
              this.logger.error('LibSsh', 'UIpasteFile -> Error while copying file', null, res.data);
              return reject(res.data);
            }

            this.LibFileSystemUi.sendRefreshPath(data.dstPath);
            return resolve();
          },
          (error: any) => {
            this.logger.error('LibSsh', 'UIpasteFile -> Error while copying file', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler(
      'download',
      'sftp',
      (data: { srcPath: string; dstPath: string; connection: ConnectionSftp; }
    ): Promise<void> => {

      return new Promise((resolve, reject) => {

        this.SshFileSystem.getFile(data.srcPath, data.dstPath, data.connection.uuid).subscribe(
          (res: BackendResponse) => {
            if (res.status === 'error') {
              this.logger.error('LibSsh', 'UIpasteFile -> Error while downloading file', null, res.data);
              return reject(res.data);
            }

            this.LibFileSystemUi.sendFileExchange({
              type: 'download',
              progress: 0,
              srcPath: data.srcPath,
              dstPath: data.dstPath,
              srcConnectionUuid: '',
              dstConnectionUuid: '',
              srcApplicationId: '',
              dstApplicationId: ''
            } as SendFileExchange);

            this.LibFileSystemUi.sendRefreshPath(data.dstPath);
            return resolve();
          },
          (error: any) => {
            this.logger.error('LibSsh', 'UIpasteFile -> Error while downloading file', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler(
      'upload',
      'sftp',
      (data: { srcPath: string; dstPath: string; connection: ConnectionSftp; }
    ): Promise<void> => {

      return new Promise((resolve, reject) => {

        this.SshFileSystem.putFile(data.srcPath, data.dstPath, data.connection.uuid).subscribe(
          (res: BackendResponse) => {
            if (res.status === 'error') {
              this.logger.error('LibSsh', 'UIpasteFile -> Error while uploading file', null, res.data);
              return reject(res.data);
            }

            this.LibFileSystemUi.sendFileExchange({
              type: 'upload',
              progress: 0,
              srcPath: data.srcPath,
              dstPath: data.dstPath,
              srcConnectionUuid: '',
              dstConnectionUuid: '',
              srcApplicationId: '',
              dstApplicationId: ''
            } as SendFileExchange);

            this.LibFileSystemUi.sendRefreshPath(data.dstPath);
            return resolve();
          },
          (error: any) => {
            this.logger.error('LibSsh', 'UIpasteFile -> Error while uploading file', null, error);
            return reject(error);
          });
      });
    });

    this.LibFileSystemUi.createHandler('chmod', 'sftp', (data: unknown): Promise<void> => {
      return Promise.resolve();
    });

    this.LibFileSystemUi.createHandler('chown', 'sftp', (data: unknown): Promise<void> => {
      return Promise.resolve();
    });

    this.LibFileSystemUi.createHandler(
      'download_from_url',
      'sftp',
      (data: { dstPath: string; viewContainerRef: ViewContainerRef; connection: ConnectionSftp; }
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

          this.SshFileSystem.downloadFileFromUrl(data.dstPath, url, data.connection.uuid).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibSsh', 'UIdownloadFromURL -> Error while downloading file', null, res.data);
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
              this.logger.error('LibSsh', 'LibSsh -> Error while downloading file', null, error);
              return reject(error);
            });
        });
      });
    });
  }

}

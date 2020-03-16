import {Injectable, ViewContainerRef} from '@angular/core';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemUiService, CutCopyFile, SendFileExchange} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {ConnectionNetapp} from '@anyopsos/module-node-netapp';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';

import {AnyOpsOSLibNodeNetappFileSystemService} from './anyopsos-lib-node-netapp-file-system.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeNetappFileSystemHandlersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly NetappFileSystem: AnyOpsOSLibNodeNetappFileSystemService) {
  }

  registerFileSystemUiHandlers(): void {

    this.LibFileSystemUi.createHandler(
      'get_folder',
      'netapp',
      (data: { srcPath: string; connection: ConnectionNetapp; vfiler: string; }
      ): Promise<AnyOpsOSFile[]> => {

        return new Promise((resolve, reject) => {

          this.NetappFileSystem.getFolder(data.srcPath, data.connection.uuid, data.vfiler).subscribe(
            (res: BackendResponse & { data: AnyOpsOSFile[]; }) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeNetapp', 'UIgetFolder -> Error while getting folder', null, res.data);
                return reject(res.data);
              }

              return resolve(res.data);
            },
            (error: any) => {
              this.logger.error('LibNodeNetapp', 'Error while getting fileSystemPath', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler(
      'put_folder',
      'netapp',
      (data: { srcPath: string; viewContainerRef: ViewContainerRef; connection: ConnectionNetapp; vfiler: string; }
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

            this.NetappFileSystem.putFolder(data.srcPath, folderName, data.connection.uuid, data.vfiler).subscribe(
              (res: BackendResponse) => {
                if (res.status === 'error') {
                  this.logger.error('LibNodeNetapp', 'UIputFolder -> Error while creating folder', null, res.data);
                  return reject(res.data);
                }

                this.LibFileSystemUi.sendRefreshPath(data.srcPath);
                return resolve();
              },
              (error: any) => {
                this.logger.error('LibNodeNetapp', 'UIputFolder -> Error while creating folder', null, error);
                return reject(error);
              });
          });
        });
      });

    this.LibFileSystemUi.createHandler(
      'rename',
      'netapp',
      (data: { srcPath: string; file: AnyOpsOSFile; viewContainerRef: ViewContainerRef; connection: ConnectionNetapp; vfiler: string; }
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

            this.NetappFileSystem.renameFile(data.srcPath, data.file.fileName, fileName, data.connection.uuid, data.vfiler).subscribe(
              (res: BackendResponse) => {
                if (res.status === 'error') {
                  this.logger.error('LibNodeNetapp', 'UIrenameFile -> Error while renaming file', null, res.data);
                  return reject(res.data);
                }

                this.LibFileSystemUi.sendRefreshPath(data.srcPath);
                return resolve();
              },
              (error: any) => {
                this.logger.error('LibNodeNetapp', 'UIrenameFile -> Error while renaming file', null, error);
                return reject(error);
              });
          });
        });
      });

    this.LibFileSystemUi.createHandler(
      'delete',
      'netapp',
      (data: { srcPath: string; file: AnyOpsOSFile; viewContainerRef: ViewContainerRef; connection: ConnectionNetapp; vfiler: string; }
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

            this.NetappFileSystem.deleteFile(data.srcPath, data.file.fileName, data.connection.uuid, data.vfiler).subscribe(
              (res: BackendResponse) => {
                if (res.status === 'error') {
                  this.logger.error('LibNodeNetapp', 'UIdeleteFile -> Error while deleting file', null, res.data);
                  return reject(res.data);
                }

                this.LibFileSystemUi.sendRefreshPath(data.srcPath);
                return resolve();
              },
              (error: any) => {
                this.logger.error('LibNodeNetapp', 'UIdeleteFile -> Error while deleting folder', null, error);
                return reject(error);
              });
          });
        });
      });

    this.LibFileSystemUi.createHandler(
      'move',
      'netapp',
      (data: { cutFile: CutCopyFile; dstPath: string; connection: ConnectionNetapp; vfiler: string; }
      ): Promise<void> => {

        return new Promise((resolve, reject) => {

          this.NetappFileSystem.moveFile(
            data.cutFile.fullPath,
            data.dstPath + data.cutFile.fileName,
            data.connection.uuid,
            data.vfiler
          ).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeNetapp', 'UIpasteFile -> Error while moving file', null, res.data);
                return reject(res.data);
              }

              // Refresh origin and remote paths
              this.LibFileSystemUi.sendRefreshPath(data.cutFile.currentPath);
              this.LibFileSystemUi.sendRefreshPath(data.dstPath);

              return resolve();
            },
            (error: any) => {
              this.logger.error('LibNodeNetapp', 'UIpasteFile -> Error while moving file', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler(
      'copy',
      'netapp',
      (data: { dstPath: string; copyFile: CutCopyFile; connection: ConnectionNetapp; vfiler: string; }
      ): Promise<void> => {

        return new Promise((resolve, reject) => {

          this.NetappFileSystem.copyFile(
            data.copyFile.fullPath,
            data.dstPath + data.copyFile.fileName,
            data.connection.uuid,
            data.vfiler
          ).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeNetapp', 'UIpasteFile -> Error while copying file', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendRefreshPath(data.dstPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibNodeNetapp', 'UIpasteFile -> Error while copying file', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler(
      'download',
      'netapp',
      (data: { srcPath: string; dstPath: string; connection: ConnectionNetapp; vfiler: string; }
      ): Promise<void> => {

        return new Promise((resolve, reject) => {

          this.NetappFileSystem.getFile(data.srcPath, data.dstPath, data.connection.uuid, data.vfiler).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeNetapp', 'UIpasteFile -> Error while downloading file', null, res.data);
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
              this.logger.error('LibNodeNetapp', 'UIpasteFile -> Error while downloading file', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler(
      'upload',
      'netapp',
      (data: { srcPath: string; dstPath: string; connection: ConnectionNetapp; vfiler: string; }
      ): Promise<void> => {

        return new Promise((resolve, reject) => {

          this.NetappFileSystem.putFile(data.srcPath, data.dstPath, data.connection.uuid, data.vfiler).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeNetapp', 'UIpasteFile -> Error while uploading file', null, res.data);
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
              this.logger.error('LibNodeNetapp', 'UIpasteFile -> Error while uploading file', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler('chmod', 'netapp', (data: unknown): Promise<void> => {
      return Promise.resolve();
    });

    this.LibFileSystemUi.createHandler('chown', 'netapp', (data: unknown): Promise<void> => {
      return Promise.resolve();
    });

  }

}

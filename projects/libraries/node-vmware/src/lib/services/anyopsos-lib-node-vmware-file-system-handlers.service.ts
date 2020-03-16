import {Injectable, ViewContainerRef} from '@angular/core';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemUiService, CutCopyFile, SendFileExchange} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {ConnectionVmware} from '@anyopsos/module-node-vmware';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';

import {AnyOpsOSLibNodeVmwareFileSystemService} from './anyopsos-lib-node-vmware-file-system.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeVmwareFileSystemHandlersService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly VmwareFileSystem: AnyOpsOSLibNodeVmwareFileSystemService) {
  }

  registerFileSystemUiHandlers(): void {

    this.LibFileSystemUi.createHandler(
      'get_folder',
      'vmware',
      (data: { srcPath: string; srcDatastoreName: string; datastoreBrowserName: string; connection: ConnectionVmware; }
      ): Promise<AnyOpsOSFile[]> => {

        return new Promise((resolve, reject) => {

          this.VmwareFileSystem.getFolder(data.srcPath, data.srcDatastoreName, data.datastoreBrowserName, data.connection.uuid).subscribe(
            (res: BackendResponse & { data: AnyOpsOSFile[]; }) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeVmware', 'UIgetFolder -> Error while getting folder', null, res.data);
                return reject(res.data);
              }

              return resolve(res.data);
            },
            (error: any) => {
              this.logger.error('LibNodeVmware', 'Error while getting fileSystemPath', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler(
      'put_folder',
      'vmware',
      (data: { srcPath: string; srcDatastoreName: string; srcDatacenterName: string; viewContainerRef: ViewContainerRef; connection: ConnectionVmware; }
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

            this.VmwareFileSystem.putFolder(data.srcPath, folderName, data.srcDatastoreName, data.srcDatacenterName, data.connection.uuid).subscribe(
              (res: BackendResponse) => {
                if (res.status === 'error') {
                  this.logger.error('LibNodeVmware', 'UIputFolder -> Error while creating folder', null, res.data);
                  return reject(res.data);
                }

                this.LibFileSystemUi.sendRefreshPath(data.srcPath);
                return resolve();
              },
              (error: any) => {
                this.logger.error('LibNodeVmware', 'UIputFolder -> Error while creating folder', null, error);
                return reject(error);
              });
          });
        });
      });

    this.LibFileSystemUi.createHandler(
      'rename',
      'vmware',
      (data: { srcPath: string; file: AnyOpsOSFile; srcDatastoreName: string; srcDatacenterName: string; viewContainerRef: ViewContainerRef; connection: ConnectionVmware; }
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

            this.VmwareFileSystem.renameFile(data.srcPath, data.file.fileName, fileName, data.srcDatastoreName, data.srcDatacenterName, data.connection.uuid).subscribe(
              (res: BackendResponse) => {
                if (res.status === 'error') {
                  this.logger.error('LibNodeVmware', 'UIrenameFile -> Error while renaming file', null, res.data);
                  return reject(res.data);
                }

                this.LibFileSystemUi.sendRefreshPath(data.srcPath);
                return resolve();
              },
              (error: any) => {
                this.logger.error('LibNodeVmware', 'UIrenameFile -> Error while renaming file', null, error);
                return reject(error);
              });
          });
        });
      });

    this.LibFileSystemUi.createHandler(
      'delete',
      'vmware',
      (data: { srcPath: string; file: AnyOpsOSFile; srcDatastoreName: string; srcDatacenterName: string; viewContainerRef: ViewContainerRef; connection: ConnectionVmware; }
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

            this.VmwareFileSystem.deleteFile(data.srcPath, data.file.fileName, data.srcDatastoreName, data.srcDatacenterName, data.connection.uuid).subscribe(
              (res: BackendResponse) => {
                if (res.status === 'error') {
                  this.logger.error('LibNodeVmware', 'UIdeleteFile -> Error while deleting file', null, res.data);
                  return reject(res.data);
                }

                this.LibFileSystemUi.sendRefreshPath(data.srcPath);
                return resolve();
              },
              (error: any) => {
                this.logger.error('LibNodeVmware', 'UIdeleteFile -> Error while deleting folder', null, error);
                return reject(error);
              });
          });
        });
      });

    this.LibFileSystemUi.createHandler(
      'move',
      'vmware',
      (data: { cutFile: CutCopyFile; srcDatastoreName: string; srcDatacenterName: string; dstPath: string; dstDatastoreName: string; dstDatacenterName: string; connection: ConnectionVmware; }
      ): Promise<void> => {

        return new Promise((resolve, reject) => {

          this.VmwareFileSystem.moveFile(
            data.cutFile.fullPath,
            data.srcDatastoreName,
            data.srcDatacenterName,
            data.dstPath + data.cutFile.fileName,
            data.dstDatastoreName,
            data.dstDatacenterName,
            data.connection.uuid
          ).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeVmware', 'UIpasteFile -> Error while moving file', null, res.data);
                return reject(res.data);
              }

              // Refresh origin and remote paths
              this.LibFileSystemUi.sendRefreshPath(data.cutFile.currentPath);
              this.LibFileSystemUi.sendRefreshPath(data.dstPath);

              return resolve();
            },
            (error: any) => {
              this.logger.error('LibNodeVmware', 'UIpasteFile -> Error while moving file', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler(
      'copy',
      'vmware',
      (data: { copyFile: CutCopyFile; srcDatastoreName: string; srcDatacenterName: string; dstPath: string; dstDatastoreName: string; dstDatacenterName: string; connection: ConnectionVmware; }
      ): Promise<void> => {

        return new Promise((resolve, reject) => {

          this.VmwareFileSystem.copyFile(
            data.copyFile.fullPath,
            data.srcDatastoreName,
            data.srcDatacenterName,
            data.dstPath + data.copyFile.fileName,
            data.dstDatastoreName,
            data.dstDatacenterName,
            data.connection.uuid,
          ).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeVmware', 'UIpasteFile -> Error while copying file', null, res.data);
                return reject(res.data);
              }

              this.LibFileSystemUi.sendRefreshPath(data.dstPath);
              return resolve();
            },
            (error: any) => {
              this.logger.error('LibNodeVmware', 'UIpasteFile -> Error while copying file', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler(
      'download',
      'vmware',
      (data: { srcPath: string; dstPath: string; connection: ConnectionVmware; }
      ): Promise<void> => {

        return new Promise((resolve, reject) => {

          this.VmwareFileSystem.getFile(data.srcPath, data.dstPath, data.connection.uuid).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeVmware', 'UIpasteFile -> Error while downloading file', null, res.data);
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
              this.logger.error('LibNodeVmware', 'UIpasteFile -> Error while downloading file', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler(
      'upload',
      'vmware',
      (data: { srcPath: string; dstPath: string; connection: ConnectionVmware; }
      ): Promise<void> => {

        return new Promise((resolve, reject) => {

          this.VmwareFileSystem.putFile(data.srcPath, data.dstPath, data.connection.uuid).subscribe(
            (res: BackendResponse) => {
              if (res.status === 'error') {
                this.logger.error('LibNodeVmware', 'UIpasteFile -> Error while uploading file', null, res.data);
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
              this.logger.error('LibNodeVmware', 'UIpasteFile -> Error while uploading file', null, error);
              return reject(error);
            });
        });
      });

    this.LibFileSystemUi.createHandler('chmod', 'vmware', (data: unknown): Promise<void> => {
      return Promise.resolve();
    });

    this.LibFileSystemUi.createHandler('chown', 'vmware', (data: unknown): Promise<void> => {
      return Promise.resolve();
    });
  }

}

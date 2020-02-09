import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibSshFileSystemService {

  constructor(private readonly http: HttpClient,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService) {
  }

  /**
   * Folder API
   */
  getFolder(srcPath: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibSsh', 'getFolder', arguments);

    return this.http.get(`/api/sftp-folder/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}`);
  }

  putFolder(dstPath: string, name: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibSsh', 'createFolder', arguments);

    return this.http.put(`/api/sftp-folder/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(dstPath + name)}`, {});
  }

  /**
   * File API
   *
   * getFile -> dstPath is anyOpsOS local path
   * putFile -> srcPath is anyOpsOS local path
   */
  getFile(srcPath: string, dstPath: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibSsh', 'getFile', arguments);

    return this.http.get(`/api/sftp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}/${encodeURIComponent(dstPath)}`);
  }

  putFile(srcPath: string, dstPath: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibSsh', 'uploadFile', arguments);

    return this.http.put(`/api/sftp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}/${encodeURIComponent(dstPath)}`, {});
  }

  downloadFileFromUrl(dstPath: string, url: string, connectionUuid: string, credentialUuid?: string): Observable<Object> {
    this.logger.debug('LibSsh', 'downloadFileFromUrl', arguments);

    return this.http.post(`/api/sftp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/download_from_url`, {
      url,
      dstPath,
      credentialUuid
    });
  }

  copyFile(srcPath: string, dstPath: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibSsh', 'copyFile', arguments);

    return this.http.patch(`/api/sftp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/copy/${encodeURIComponent(srcPath)}`, { dstPath });
  }

  moveFile(srcPath: string, dstPath: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibSsh', 'moveFile', arguments);

    return this.http.patch(`/api/sftp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/move/${encodeURIComponent(srcPath)}`, { dstPath });
  }

  renameFile(srcPath: string, oldName: string, newName: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibSsh', 'renameFile', arguments);

    return this.http.patch(`/api/sftp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/rename/${encodeURIComponent(srcPath + oldName)}`, { dstPath: srcPath + newName });
  }

  deleteFile(srcPath: string, name: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibSsh', 'deleteFile', arguments);

    return this.http.delete(`/api/sftp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath + name)}`);
  }
}

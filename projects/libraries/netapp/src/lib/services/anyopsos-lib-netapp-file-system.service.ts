import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNetappFileSystemService {

  constructor(private readonly http: HttpClient,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService) {
  }

  /**
   * Folder API
   */
  getFolder(srcPath: string, connectionUuid: string, vfiler: string): Observable<Object> {
    this.logger.debug('LibNetapp', 'getFolder', arguments);

    return this.http.get(`/api/netapp-folder/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}`);
  }

  putFolder(dstPath: string, name: string, connectionUuid: string, vfiler: string): Observable<Object> {
    this.logger.debug('LibNetapp', 'createFolder', arguments);

    return this.http.put(`/api/netapp-folder/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(dstPath + name)}`, {});
  }

  /**
   * File API
   *
   * getFile -> dstPath is anyOpsOS local path
   * putFile -> srcPath is anyOpsOS local path
   */
  getFile(srcPath: string, dstPath: string, connectionUuid: string, vfiler: string): Observable<Object> {
    this.logger.debug('LibNetapp', 'getFile', arguments);

    return this.http.get(`/api/netapp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}/${encodeURIComponent(dstPath)}`);
  }

  putFile(srcPath: string, dstPath: string, connectionUuid: string, vfiler: string): Observable<Object> {
    this.logger.debug('LibNetapp', 'uploadFile', arguments);

    return this.http.put(`/api/netapp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}/${encodeURIComponent(dstPath)}`, {});
  }

  copyFile(srcPath: string, dstPath: string, connectionUuid: string, vfiler: string): Observable<Object> {
    this.logger.debug('LibNetapp', 'copyFile', arguments);

    return this.http.patch(`/api/netapp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/copy/${encodeURIComponent(srcPath)}`, { dstPath });
  }

  moveFile(srcPath: string, dstPath: string, connectionUuid: string, vfiler: string): Observable<Object> {
    this.logger.debug('LibNetapp', 'moveFile', arguments);

    return this.http.patch(`/api/netapp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/move/${encodeURIComponent(srcPath)}`, { dstPath });
  }

  renameFile(srcPath: string, oldName: string, newName: string, connectionUuid: string, vfiler: string): Observable<Object> {
    this.logger.debug('LibNetapp', 'renameFile', arguments);

    return this.http.patch(`/api/netapp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/rename/${encodeURIComponent(srcPath + oldName)}`, { dstPath: srcPath + newName });
  }

  deleteFile(srcPath: string, name: string, connectionUuid: string, vfiler: string): Observable<Object> {
    this.logger.debug('LibNetapp', 'deleteFile', arguments);

    return this.http.delete(`/api/netapp-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath + name)}`);
  }

}

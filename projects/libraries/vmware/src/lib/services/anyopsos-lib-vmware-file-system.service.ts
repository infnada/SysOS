import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareFileSystemService {

  constructor(private readonly http: HttpClient,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService) {
  }

  /**
   * Folder API
   */
  getFolder(srcPath: string, srcDatastoreName: string, datastoreBrowserName: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibVmware', 'getFolder', arguments);

    return this.http.get(`/api/vmware-folder/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}/${encodeURIComponent(srcDatastoreName)}/${encodeURIComponent(datastoreBrowserName)}`);
  }

  putFolder(dstPath: string, name: string, srcDatastoreName: string, srcDatacenterName: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibVmware', 'createFolder', arguments);

    return this.http.put(`/api/vmware-folder/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(dstPath + name)}/${encodeURIComponent(srcDatastoreName)}/${encodeURIComponent(srcDatacenterName)}`, {});
  }

  /**
   * File API
   *
   * getFile -> dstPath is anyOpsOS local path
   * putFile -> srcPath is anyOpsOS local path
   */
  getFile(srcPath: string, dstPath: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibVmware', 'getFile', arguments);

    return this.http.get(`/api/vmware-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}/${encodeURIComponent(dstPath)}`);
  }

  putFile(srcPath: string, dstPath: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibVmware', 'uploadFile', arguments);

    return this.http.put(`/api/vmware-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath)}/${encodeURIComponent(dstPath)}`, {});
  }

  copyFile(srcPath: string, srcDatastoreName: string, srcDatacenterName: string, dstPath: string, dstDatastoreName: string, dstDatacenterName: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibVmware', 'copyFile', arguments);

    return this.http.patch(`/api/vmware-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/copy/${encodeURIComponent(srcPath)}/${encodeURIComponent(srcDatastoreName)}/${encodeURIComponent(srcDatacenterName)}`, { dstPath, dstDatastoreName, dstDatacenterName });
  }

  moveFile(srcPath: string, srcDatastoreName: string, srcDatacenterName: string, dstPath: string, dstDatastoreName: string, dstDatacenterName: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibVmware', 'moveFile', arguments);

    return this.http.patch(`/api/vmware-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/move/${encodeURIComponent(srcPath)}/${encodeURIComponent(srcDatastoreName)}/${encodeURIComponent(srcDatacenterName)}`, { dstPath, dstDatastoreName, dstDatacenterName });
  }

  renameFile(srcPath: string, oldName: string, newName: string, srcDatastoreName: string, srcDatacenterName: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibVmware', 'renameFile', arguments);

    return this.http.patch(`/api/vmware-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/rename/${encodeURIComponent(srcPath + oldName)}/${encodeURIComponent(srcDatastoreName)}/${encodeURIComponent(srcDatacenterName)}`, { dstPath: srcPath + newName });
  }

  deleteFile(srcPath: string, name: string, srcDatastoreName: string, srcDatacenterName: string, connectionUuid: string): Observable<Object> {
    this.logger.debug('LibVmware', 'deleteFile', arguments);

    return this.http.delete(`/api/vmware-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}/${encodeURIComponent(srcPath + name)}/${encodeURIComponent(srcDatastoreName)}/${encodeURIComponent(srcDatacenterName)}`);
  }

  /**
   * Datastore Upload
   */
  uploadFileToDatastore(url, path, credential) {
    return this.http.post('/api/vmware-file/upload_to_datastore', {
      url,
      path,
      credential
    }).pipe(map((data: any) => {
        return data;
      },
      error => {
        this.logger.error('[VMWare] -> uploadFileToDatastore -> Error while doing the call -> ', error);
      }));
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {ConfigFile, ConfigFileData} from '@anyopsos/module-config-file';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibFileSystemService {

  constructor(private readonly http: HttpClient,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService) {
  }

  /**
   * Folder API
   */
  getFolder(srcPath: string): Observable<Object> {
    this.logger.debug('fileSystem', 'getFolder', arguments);

    return this.http.get(`/api/folder/${encodeURIComponent(srcPath)}`);
  }

  putFolder(dstPath: string, name: string): Observable<Object> {
    this.logger.debug('fileSystem', 'createFolder', arguments);

    return this.http.put(`/api/folder/${encodeURIComponent(dstPath + name)}`, {});
  }

  /**
   * File API
   */
  getFile(srcPath: string): Observable<Object> {
    this.logger.debug('fileSystem', 'getFile', arguments);

    return this.http.get(`/api/file/${encodeURIComponent(srcPath)}`, {responseType: 'blob'});
  }

  putFile(dstPath: string, file: File): Observable<Object> {
    this.logger.debug('fileSystem', 'uploadFile', arguments);

    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`/api/file/${encodeURIComponent(dstPath)}`, formData, {
      reportProgress: true
    });
  }

  downloadFileFromUrl(dstPath: string, url: string, credentialUuid?: string): Observable<Object> {
    this.logger.debug('fileSystem', 'downloadFileFromUrl', arguments);

    return this.http.post('/api/file/download_from_url', {
      url,
      dstPath,
      credentialUuid
    });
  }

  copyFile(srcPath: string, dstPath: string): Observable<Object> {
    this.logger.debug('fileSystem', 'copyFile', arguments);

    return this.http.patch(`/api/file/copy/${encodeURIComponent(srcPath)}`, { dstPath });
  }

  moveFile(srcPath: string, dstPath: string): Observable<Object> {
    this.logger.debug('fileSystem', 'moveFile', arguments);

    return this.http.patch(`/api/file/move/${encodeURIComponent(srcPath)}`, { dstPath });
  }

  renameFile(srcPath: string, oldName: string, newName: string): Observable<Object> {
    this.logger.debug('fileSystem', 'renameFile', arguments);

    return this.http.patch(`/api/file/rename/${encodeURIComponent(srcPath + oldName)}`, { dstPath: srcPath + newName });
  }

  deleteFile(srcPath: string, name: string): Observable<Object> {
    this.logger.debug('fileSystem', 'deleteFile', arguments);

    return this.http.delete(`/api/file/${encodeURIComponent(srcPath + name)}`);
  }

  /**
   * Config File API
   *
   * ConfigFiles are locates at /etc. You must exclude /etc from 'fileName'
   */
  getConfigFile(fileName: string, configUuid?: string): Observable<Object> {
    this.logger.debug('fileSystem', 'getConfigFile', arguments);

    if (configUuid) return this.http.get(`/api/config-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(fileName)}/${configUuid}`);
    return this.http.get(`/api/config-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(fileName)}`);
  }

  putConfigFile(data: ConfigFile, fileName: string): Observable<Object>;
  putConfigFile(data: ConfigFileData, fileName: string, configUuid: string): Observable<Object>;
  putConfigFile(data: ConfigFileData | ConfigFileData[], fileName: string, configUuid?: string): Observable<Object> {
    this.logger.debug('fileSystem', 'putConfigFile', arguments);

    if (configUuid) return this.http.put(`/api/config-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(fileName)}/${configUuid}`, {data});
    return this.http.put(`/api/config-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(fileName)}`, {data});
  }

  patchConfigFile(data: ConfigFile, fileName: string): Observable<Object>;
  patchConfigFile(data: ConfigFileData, fileName: string, configUuid: string): Observable<Object>;
  patchConfigFile(data: ConfigFileData | ConfigFileData[], fileName: string, configUuid?: string): Observable<Object> {
    this.logger.debug('fileSystem', 'patchConfigFile', arguments);

    if (configUuid) return this.http.patch(`/api/config-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(fileName)}/${configUuid}`, {data});
    return this.http.patch(`/api/config-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(fileName)}`, {data});
  }

  deleteConfigFile(fileName: string, configUuid?: string): Observable<Object> {
    this.logger.debug('fileSystem', 'deleteConfigFile', arguments);

    if (configUuid) return this.http.delete(`/api/config-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(fileName)}/${configUuid}`);
    return this.http.delete(`/api/config-file/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(fileName)}`);
  }

}

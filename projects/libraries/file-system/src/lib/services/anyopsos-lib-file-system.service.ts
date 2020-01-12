import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

import {ConfigFileData} from '@anyopsos/module-config-file';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibFileSystemService {

  constructor(private http: HttpClient,
              private logger: AnyOpsOSLibLoggerService) {
  }

  /**
   * Folder API
   *
   * Some APIS are local & remote (if connectionUuid is provided)
   */
  getFolder(path: string, connectionUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'getFolder', arguments);

    if (connectionUuid) {
      return this.http.get(`/api/remote-folder/${connectionUuid}/${encodeURIComponent(path)}`);
    }

    return this.http.get(`/api/folder/${encodeURIComponent(path)}`);
  }

  putFolder(path: string, name: string, connectionUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'createFolder', arguments);

    if (connectionUuid) {
      return this.http.post(`/api/remote-folder/${connectionUuid}/${encodeURIComponent(path + name)}`, {});
    }

    return this.http.post(`/api/folder/${encodeURIComponent(path + name)}`, {});
  }

  /**
   * File API
   *
   * Some APIS are local & remote (if connectionUuid is provided)
   */
  getFile(path: string): Observable<any> {
    this.logger.debug('fileSystem', 'getFile', arguments);

    return this.http.get(`/api/file/${encodeURIComponent(path)}`, {responseType: 'blob'});
  }

  putFile(path: string, file: File): Observable<any> {
    this.logger.debug('fileSystem', 'uploadFile', arguments);

    const formData = new FormData();
    formData.append('path', path + file.name);
    formData.append('file', file);

    const req = new HttpRequest<FormData>('PUT', '/api/file', formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  downloadFileFromUrl(path: string, url: string, connectionUuid?: string, credentialUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'downloadFileFromUrl', arguments);

    if (connectionUuid) {
      return this.http.post(`/api/remote-file/${connectionUuid}/download_from_url`, {
        url,
        path,
        credentialUuid
      });
    }

    return this.http.post('/api/file/download_from_url', {
      url,
      path,
      credentialUuid
    });
  }

  copyFile(srcPath: string, dstPath: string, connectionUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'copyFile', arguments);

    if (connectionUuid) {
      return this.http.patch(`/api/remote-file/${connectionUuid}/copy/${encodeURIComponent(srcPath)}`, { dstPath });
    }

    return this.http.patch(`/api/file/copy/${encodeURIComponent(srcPath)}`, { dstPath });
  }

  moveFile(srcPath: string, dstPath: string, connectionUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'moveFile', arguments);

    if (connectionUuid) {
      return this.http.patch(`/api/remote-file/${connectionUuid}/move/${encodeURIComponent(srcPath)}`, { dstPath });
    }

    return this.http.patch(`/api/file/move/${encodeURIComponent(srcPath)}`, { dstPath });
  }

  renameFile(path: string, oldName: string, newName: string, connectionUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'renameFile', arguments);

    if (connectionUuid) {
      return this.http.patch(`/api/remote-file/${connectionUuid}/rename/${encodeURIComponent(path + oldName)}`, { dstPath: path + newName });
    }

    return this.http.patch(`/api/file/rename/${encodeURIComponent(path + oldName)}`, { dstPath: path + newName });
  }

  deleteFile(path: string, name: string, connectionUuid?: string): Observable<any> {
    this.logger.debug('fileSystem Service', 'deleteFile', arguments);

    if (connectionUuid) {
      return this.http.delete(`/api/remote-file/${connectionUuid}/${encodeURIComponent(path + name)}`);
    }

    return this.http.delete(`/api/file/${encodeURIComponent(path + name)}`);
  }

  /**
   * Config File API
   *
   * ConfigFiles are locates at /etc. You must exclude /etc from 'fileName'
   */
  getConfigFile(fileName: string, configUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'getConfigFile', arguments);

    if (configUuid) return this.http.get(`/api/config-file/${configUuid}/${encodeURIComponent(fileName)}`);
    return this.http.get(`/api/config-file/${encodeURIComponent(fileName)}`);
  }

  putConfigFile(data: ConfigFileData, fileName: string, configUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'putConfigFile', arguments);

    if (configUuid) return this.http.put(`/api/config-file/${configUuid}/${encodeURIComponent(fileName)}`, {data});
    return this.http.put(`/api/config-file/${encodeURIComponent(fileName)}`, {data});
  }

  patchConfigFile(data: any, fileName: string, configUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'patchConfigFile', arguments);

    if (configUuid) return this.http.patch(`/api/config-file/${configUuid}/${encodeURIComponent(fileName)}`, {data});
    return this.http.patch(`/api/config-file/${encodeURIComponent(fileName)}`, {data});
  }

  deleteConfigFile(fileName: string, configUuid?: string): Observable<any> {
    this.logger.debug('fileSystem', 'deleteConfigFile', arguments);

    if (configUuid) return this.http.delete(`/api/config-file/${configUuid}/${encodeURIComponent(fileName)}`);
    return this.http.delete(`/api/config-file/${encodeURIComponent(fileName)}`);
  }

  /**
   * Get File type by extension
   */
  getFileType(longName: string): string {
    if (longName.charAt(0) === 'd') return 'folder';
    if (longName.charAt(0) === 'l') return 'folder';
    if (longName.substr(-4) === '.vmx') return 'file-code';
    if (longName.substr(-4) === '.log') return 'file-alt';
    if (longName.substr(-6) === '.nvram') return 'file';
    if (longName.substr(-5) === '.vmdk') return 'hdd';
    if (longName.substr(-5) === '.vmem') return 'file';
    if (longName.substr(-5) === '.vmsd') return 'file';
    if (longName.substr(-5) === '.vmsn') return 'file';
    if (longName.substr(-5) === '.vmss') return 'file';
    if (longName.substr(-5) === '.vmxf') return 'file';
    if (longName.substr(-5) === '.vmtm') return 'file';
    if (longName.substr(-5) === '.iso') return 'file-archive';
    if (longName.charAt(0) === '-' && (longName.charAt(3) === 'x')) return 'file-code';
    if (longName.charAt(0) === '-') return 'file';
    return 'file';
  }

}

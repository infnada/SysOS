import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
  }

  createFolder(connectionUuid: string, path: string, name: string): Observable<any> {
    this.logger.debug('[fileSystem Service] createFolder -> connectionUuid[%s], path[%s], name[%s]', connectionUuid, path, name);

    if (connectionUuid) {
      return this.http.post(`/api/remote-folder/${connectionUuid}/${encodeURIComponent(path + name)}`, {});
    }

    return this.http.post(`/api/folder/${encodeURIComponent(path + name)}`, {});
  }

  getFileSystemPath(connectionUuid: string, path: string): Observable<any> {
    this.logger.debug('[fileSystem Service] getFileSystemPath -> connectionUuid[%s], path[%s]', connectionUuid, path);

    if (connectionUuid) {
      return this.http.get(`/api/remote-folder/${connectionUuid}/${encodeURIComponent(path)}`);
    }

    return this.http.get(`/api/folder/${encodeURIComponent(path)}`);
  }

  uploadFile(path: string, file: File): Observable<any> {
    this.logger.debug('[fileSystem Service] uploadFile -> path[%s] fileName[%s]', path, file.name);

    const formData = new FormData();
    formData.append('path', path + file.name);
    formData.append('file', file);

    const req = new HttpRequest<FormData>('POST', '/api/file/upload', formData, {
      reportProgress: true // , responseType: 'text'
    });

    return this.http.request(req);
  }

  getFileContents(path: string): Observable<any> {
    this.logger.debug('[fileSystem Service] getFileContents -> path[%s]', path);

    return this.http.get(`/api/file/${encodeURIComponent(path)}`, {responseType: 'blob'});
  }

  deleteFile(connectionUuid: string, path: string, name: string): Observable<any> {
    this.logger.debug('[fileSystem Service] deleteFile -> connectionUuid[%s], path[%s], name[%s]', connectionUuid, path, name);

    if (connectionUuid) {
      return this.http.delete(`/api/remote-file/${connectionUuid}/${encodeURIComponent(path + name)}`);
    }

    return this.http.delete(`/api/file/${encodeURIComponent(path + name)}`);
  }

  renameFile(connectionUuid: string, path: string, oldName: string, newName: string): Observable<any> {
    this.logger.debug('[fileSystem Service] renameFile -> connectionUuid[%s], path[%s], oldName[%s], newName[%s]',
      connectionUuid, path, oldName, newName);

    if (connectionUuid) {
      return this.http.patch(`/api/remote-file/rename/${connectionUuid}/${encodeURIComponent(path + oldName)}`, {
        dst: path + newName
      });
    }

    return this.http.patch(`/api/file/rename/${encodeURIComponent(path + oldName)}`, {
      dst: path + newName
    });
  }

  copyFile(connectionUuid: string, src: string, dst: string): Observable<any> {
    this.logger.debug('[fileSystem Service] copyFile -> connectionUuid[%s], src[%s], dst[%s]', connectionUuid, src, dst);

    if (connectionUuid) {
      return this.http.patch(`/api/remote-file/copy/${connectionUuid}/${encodeURIComponent(src)}`, {
        dst
      });
    }

    return this.http.patch(`/api/file/copy/${encodeURIComponent(src)}`, {
      dst
    });
  }

  moveFile(connectionUuid: string, src: string, dst: string): Observable<any> {
    this.logger.debug('[fileSystem Service] moveFile -> connectionUuid[%s], src[%s], dst[%s]', connectionUuid, src, dst);

    if (connectionUuid) {
      return this.http.patch(`/api/remote-file/move/${connectionUuid}/${encodeURIComponent(src)}`, {
        dst
      });
    }

    return this.http.patch(`/api/file/move/${encodeURIComponent(src)}`, {
      dst
    });
  }

  downloadFileFromInet(connectionUuid: string, path: string, url: string,
                       credential?: { username: string, password: string }
                       ): Observable<any> {
    this.logger.debug('[fileSystem Service] downloadFileFromInet -> connectionUuid[%s], path[%s], url[%s], credential[%s]',
      connectionUuid, path, url, credential);

    if (connectionUuid) {
      return this.http.post('/api/remote-file/download_from_url', {
        uuid: connectionUuid,
        url,
        path,
        credential
      });
    }

    return this.http.post('/api/file/download_from_url', {
      url,
      path,
      credential
    });
  }

  getConfigFile(file: string): Observable<any> {
    this.logger.debug('[fileSystem Service] getConfigFile -> file[%s]', file);

    return this.http.get(`/api/config-file/${encodeURIComponent(file)}`);
  }

  saveConfigFile(data: any, file: string, fullSave: boolean): Observable<any> {
    this.logger.debug('[fileSystem Service] saveConfigFile -> data[%s], file[%s], fullSave[%s]', 'any', file, fullSave);

    return this.http.put(`/api/config-file/${encodeURIComponent(file)}`, {
      data,
      fullSave
    });
  }

  deleteConfigFromFile(uuid: string, file: string): Observable<any> {
    this.logger.debug('[fileSystem Service] deleteConfigFromFile -> uuid[%s], file[%s]', uuid, file);

    return this.http.delete(`/api/config-file/${uuid}/${encodeURIComponent(file)}`);
  }

  getFileType(longname: string): string {
    if (longname.charAt(0) === 'd') return 'folder';
    if (longname.charAt(0) === 'l') return 'folder';
    if (longname.substr(-4) === '.vmx') return 'file-code-o';
    if (longname.substr(-4) === '.log') return 'file-text';
    if (longname.substr(-6) === '.nvram') return 'file';
    if (longname.substr(-5) === '.vmdk') return 'hdd-o';
    if (longname.substr(-5) === '.vmem') return 'file';
    if (longname.substr(-5) === '.vmsd') return 'file';
    if (longname.substr(-5) === '.vmsn') return 'file';
    if (longname.substr(-5) === '.vmss') return 'file';
    if (longname.substr(-5) === '.vmxf') return 'file';
    if (longname.substr(-5) === '.vmtm') return 'file';
    if (longname.substr(-5) === '.iso') return 'file-archive-o';
    if (longname.charAt(0) === '-' && (longname.charAt(3) === 'x')) return 'file-code-o';
    if (longname.charAt(0) === '-') return 'file';
    return 'file';
  }

}

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
      return this.http.post(`/api/folder/${connectionUuid}/${path + name}`, {});
    }

    return this.http.post(`/api/folder/${path + name}`, {});
  }

  getFileSystemPath(connectionUuid: string, path: string): Observable<any> {
    this.logger.debug('[fileSystem Service] getFileSystemPath -> connectionUuid[%s], path[%s]', connectionUuid, path);

    if (connectionUuid) {
      return this.http.get(`/api/remoteFolder/${connectionUuid}/${path}`);
    }

    return this.http.get(`/api/folder/${path}`);
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

    return this.http.get(`/api/file/${path}`, {responseType: 'blob'});
  }

  deleteFile(connectionUuid: string, path: string, name: string): Observable<any> {
    this.logger.debug('[fileSystem Service] deleteFile -> connectionUuid[%s], path[%s], name[%s]', connectionUuid, path, name);

    if (connectionUuid) {
      return this.http.delete(`/api/remoteFile/${connectionUuid}/${path + name}`);
    }

    return this.http.delete(`/api/file/${path + name}`);
  }

  renameFile(connectionUuid: string, path: string, oldName: string, newName: string): Observable<any> {
    this.logger.debug('[fileSystem Service] renameFile -> connectionUuid[%s], path[%s], oldName[%s], newName[%s]',
      connectionUuid, path, oldName, newName);

    if (connectionUuid) {
      return this.http.post(`/api/remoteFile/rename/${connectionUuid}/${path + oldName}`, {
        dst: path + newName
      });
    }

    return this.http.post(`/api/file/rename/${path + oldName}`, {
      dst: path + newName
    });
  }

  copyFile(connectionUuid: string, src: string, dst: string): Observable<any> {
    this.logger.debug('[fileSystem Service] copyFile -> connectionUuid[%s], src[%s], dst[%s]', connectionUuid, src, dst);

    if (connectionUuid) {
      return this.http.post(`/api/remoteFile/copy/${connectionUuid}/${src}`, {
        dst
      });
    }

    return this.http.patch(`/api/file/copy/${src}`, {
      dst
    });
  }

  moveFile(connectionUuid: string, src: string, dst: string): Observable<any> {
    this.logger.debug('[fileSystem Service] moveFile -> connectionUuid[%s], src[%s], dst[%s]', connectionUuid, src, dst);

    if (connectionUuid) {
      return this.http.post(`/api/remoteFile/move/${connectionUuid}/${src}`, {
        dst
      });
    }

    return this.http.post(`/api/file/move/${src}`, {
      dst
    });
  }

  downloadFileFromInet(connectionUuid: string, path: string, url: string,
                       credential?: { username: string, password: string }
                       ): Observable<any> {
    this.logger.debug('[fileSystem Service] downloadFileFromInet -> connectionUuid[%s], path[%s], url[%s], credential[%s]',
      connectionUuid, path, url, credential);

    if (connectionUuid) {
      return this.http.post('/api/remoteFile/download_from_url', {
        uuid: connectionUuid,
        url,
        path,
        credential
      });
    }

    return this.http.put('/api/file/download_from_url', {
      url,
      path,
      credential
    });
  }

  getConfigFile(file: string): Observable<any> {
    this.logger.debug('[fileSystem Service] getConfigFile -> file[%s]', file);

    return this.http.get(`/api/configFile/${file}`);
  }

  saveConfigFile(data: any, file: string, fullSave: boolean): Observable<any> {
    this.logger.debug('[fileSystem Service] saveConfigFile -> data[%s], file[%s], fullSave[%s]', 'any', file, fullSave);

    return this.http.post(`/api/configFile/${file}`, {
      data,
      fullSave
    });
  }

  deleteConfigFromFile(uuid: string, file: string): Observable<any> {
    this.logger.debug('[fileSystem Service] deleteConfigFromFile -> uuid[%s], file[%s]', uuid, file);

    return this.http.delete(`/api/configFile/${uuid}/${file}`);
  }

  getFileType(longname: string): string {
    if (longname.charAt(0) === 'd') return 'folder';
    if (longname.charAt(0) === 'l') return 'folder';
    if (longname.charAt(0) === '-' && (longname.charAt(3) === 'x')) return 'file-code-o';
    if (longname.charAt(0) === '-') return 'file';
  }

}

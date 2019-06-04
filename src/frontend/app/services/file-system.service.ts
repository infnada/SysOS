import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private http: HttpClient) {
  }

  getFileSystemPath(connectionUuid: string, path: string): Observable<any> {

    if (connectionUuid) {
      return this.http.post('/api/remoteFolder/get', {
        uuid: connectionUuid,
        path
      });
    }

    return this.http.post('/api/folder/get', {
      path
    });
  }

  uploadFile(path: string, file: File): Observable<any> {

    const formData = new FormData();
    formData.append('path', path + file.name);
    formData.append('file', file);

    const req = new HttpRequest<FormData>('POST', '/api/file/upload', formData, {
      reportProgress: true // , responseType: 'text'
    });

    return this.http.request(req);
  }

  getFileContents(path: string): Observable<any> {
    return this.http.post('/api/file/get', {
      path
    }, {responseType: 'blob'});
  }

  renameFile(connectionUuid: string, path: string, oldName: string, newName: string): Observable<any> {

    if (connectionUuid) {
      return this.http.post('/api/remoteFile/rename', {
        uuid: connectionUuid,
        path,
        oldName,
        newName
      });
    }

    return this.http.post('/api/file/rename', {
      path,
      oldName,
      newName
    });
  }

  deleteFile(connectionUuid: string, path: string, name: string): Observable<any> {

    if (connectionUuid) {
      return this.http.post('/api/remoteFile/delete', {
        uuid: connectionUuid,
        path,
        name // TODO ?=???
      });
    }

    return this.http.post('/api/file/delete', {
      path,
      name
    });
  }

  copyFile(connectionUuid: string, src: string, dst: string): Observable<any> {

    if (connectionUuid) {
      return this.http.post('/api/remoteFile/copy', {
        uuid: connectionUuid,
        src,
        dst
      });
    }

    return this.http.post('/api/file/copy', {
      src,
      dst
    });
  }

  moveFile(connectionUuid: string, src: string, dst: string): Observable<any> {

    if (connectionUuid) {
      return this.http.post('/api/remoteFile/move', {
        uuid: connectionUuid,
        src,
        dst
      });
    }

    return this.http.post('/api/file/move', {
      src,
      dst
    });
  }

  downloadFileFromInet(connectionUuid: string, path: string, url: string,
                       credential?: { username: string, password: string }
                       ): Observable<any> {

    if (connectionUuid) {
      return this.http.post('/api/remoteFile/download_from_url', {
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

  createFolder(connectionUuid: string, path: string, name: string): Observable<any> {

    if (connectionUuid) {
      return this.http.post('/api/folder/create', {
        uuid: connectionUuid,
        path,
        name
      });
    }

    return this.http.post('/api/folder/create', {
      path,
      name
    });
  }

  getConfigFile(file: string): Observable<any> {
    return this.http.post('/api/configFiles/get', {
      file
    });
  }

  saveConfigFile(data: any, file: string, fullSave: boolean): Observable<any> {
    return this.http.post('/api/configFiles/save', {
      data,
      file,
      fullSave
    });
  }

  deleteConfigFromFile(uuid: string, file: string): Observable<any> {
    return this.http.post('/api/configFiles/delete', {
      uuid,
      file
    });
  }

  getFileType(longname: string): string {
    if (longname.charAt(0) === 'd') return 'folder';
    if (longname.charAt(0) === 'l') return 'folder';
    if (longname.charAt(0) === '-' && (longname.charAt(3) === 'x')) return 'file-code-o';
    if (longname.charAt(0) === '-') return 'file';
  }

}

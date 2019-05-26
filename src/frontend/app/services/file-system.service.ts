import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private http: HttpClient) {
  }

  getFileSystemPath(path: string): Observable<any> {
    return this.http.post('/api/folder/get', {
      path: path
    });
}

  uploadFile(path: string, file: File): Observable<any> {

    let formData = new FormData();
    formData.append('path', path + file.name);
    formData.append('file', file);

    const req = new HttpRequest<FormData>('POST', '/api/file/upload', formData, {
      reportProgress: true//, responseType: 'text'
    });

    return this.http.request(req);
  }

  getFileContents(path: string): Observable<any> {
    return this.http.post('/api/file/get', {
      path: path
    });
  }

  renameFile(path: string, oldName: string, newName: string): Observable<any> {
    return this.http.post('/api/file/rename', {
      path: path,
      oldName: oldName,
      newName: newName
    });
  }

  deleteFile(path: string, name: string): Observable<any> {
    return this.http.post('/api/file/delete', {
      path: path,
      name: name
    });
  }

  copyFile(src: string, dst: string): Observable<any> {
    return this.http.post('/api/file/copy', {
      src: src,
      dst: dst
    });
  }

  moveFile(src: string, dst: string): Observable<any> {
    return this.http.post('/api/file/move', {
      src: src,
      dst: dst
    });
  }

  downloadFileFromInet(path: string, url: string, credential: string): Observable<any> {
    return this.http.post('/api/file/download_from_url', {
      url: url,
      path: path,
      credential: credential
    });
  }

  createFolder(path: string, name: string): Observable<any> {
    return this.http.post('/api/folder/create', {
      path: path,
      name: name
    });
  }

  getConfigFile(file: string): Observable<any> {
    return this.http.post('/api/configFiles/get', {
      file: file
    });
  }

  saveConfigFile(data: any, file: string, full_save: boolean): Observable<any> {
    return this.http.post('/api/configFiles/save', {
      data: data,
      file: file,
      full_save: full_save
    });
  }

  getFileType(longname: string): string {
    if (longname.charAt(0) === 'd') return 'folder';
    if (longname.charAt(0) === 'l') return 'folder';
    if (longname.charAt(0) === '-' && (longname.charAt(3) === 'x')) return 'file-code-o';
    if (longname.charAt(0) === '-') return 'file';
  }

}

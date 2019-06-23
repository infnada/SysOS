import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {NGXLogger} from 'ngx-logger';

import {SysOSFile} from '@sysos/libs-types';
import {SysosLibsFileSystemService} from '@sysos/libs-file-system';

@Injectable({
  providedIn: 'root'
})
export class SysosAppSftpLocalService {
  private subjectGoPathBack = new Subject<any>();

  private $currentPath: BehaviorSubject<string>;
  private $currentData: BehaviorSubject<SysOSFile[]>;
  private $viewAsList: BehaviorSubject<boolean>;
  private $search: BehaviorSubject<object>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: SysOSFile[],
    viewAsList: boolean,
    search: {filename: string}
  };
  currentPath: Observable<any>;
  currentData: Observable<any>;
  viewAsList: Observable<any>;
  search: Observable<any>;



  constructor(private logger: NGXLogger,
              private socket: Socket,
              private FileSystem: SysosLibsFileSystemService) {
    this.dataStore = {currentPath: '/', currentData: [], viewAsList: false, search: null};
    this.$currentPath = new BehaviorSubject('/') as BehaviorSubject<string>;
    this.$currentData = new BehaviorSubject([]) as BehaviorSubject<SysOSFile[]>;
    this.$viewAsList = new BehaviorSubject(false) as BehaviorSubject<boolean>;
    this.$search = new BehaviorSubject({filename: null}) as BehaviorSubject<object>;
    this.currentPath = this.$currentPath.asObservable();
    this.currentData = this.$currentData.asObservable();
    this.viewAsList = this.$viewAsList.asObservable();
    this.search = this.$search.asObservable();
  }

  uploadFileToSysOS(dst: string, file: File): Observable<any> {
    this.logger.debug('Sftp -> uploadFileToSysOS -> dst []', dst);
    return this.FileSystem.uploadFile(dst, file);
  }

  uploadFileToRemote(src: string, dst: string, connectionUuid: string): void {
    this.logger.debug('Sftp -> sftp_session__file_upload -> src [], dst [], connectionUuid []', src, dst, connectionUuid);
    this.socket.emit('sftp_session__file_upload', {
      src,
      dst,
      connectionUuid
    });
  }

  reloadPath(path?: string): void {
    this.FileSystem.getFileSystemPath(null, (path ? path : this.dataStore.currentPath)).subscribe(
      (res: { data: SysOSFile[] }) => {
        this.dataStore.currentData = res.data;

        // broadcast data to subscribers
        this.$currentData.next(Object.assign({}, this.dataStore).currentData);

        if (path) {
          this.dataStore.currentPath = path;

          // broadcast data to subscribers
          this.$currentPath.next(Object.assign({}, this.dataStore).currentPath);
        }
      },
      error => {
        console.error('File Explorer -> Error while getting fileSystemPath -> ', error);
        console.error(error);
      });
  }

  toggleView(): void {
    this.dataStore.viewAsList = !this.dataStore.viewAsList;

    // broadcast data to subscribers
    this.$viewAsList.next(Object.assign({}, this.dataStore).viewAsList);
  }

  setSearch(data: string): void {
    this.dataStore.search = {filename: data};

    // broadcast data to subscribers
    this.$search.next(Object.assign({}, this.dataStore).search);
  }

  sendGoPathBack(): void {
    this.subjectGoPathBack.next();
  }

  getObserverGoPathBack(): Observable<any> {
    return this.subjectGoPathBack.asObservable();
  }
}

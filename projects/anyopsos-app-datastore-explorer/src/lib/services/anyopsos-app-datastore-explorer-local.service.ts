import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

import {AnyOpsOSFile} from '@anyopsos/lib-file';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppDatastoreExplorerLocalService {
  private subjectGoPathBack: Subject<void> = new Subject();

  private $currentPath: BehaviorSubject<string>;
  private $currentData: BehaviorSubject<AnyOpsOSFile[]>;
  private $viewAsList: BehaviorSubject<boolean>;
  private $search: BehaviorSubject<object>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: AnyOpsOSFile[],
    viewAsList: boolean,
    search: {filename: string}
  };
  currentPath: Observable<any>;
  currentData: Observable<any>;
  viewAsList: Observable<any>;
  search: Observable<any>;



  constructor(private logger: AnyOpsOSLibLoggerService,
              private socket: Socket,
              private FileSystem: AnyOpsOSLibFileSystemService) {
    this.dataStore = {currentPath: '/', currentData: [], viewAsList: false, search: {filename: null}};
    this.$currentPath = new BehaviorSubject(this.dataStore.currentPath);
    this.$currentData = new BehaviorSubject(this.dataStore.currentData);
    this.$viewAsList = new BehaviorSubject(this.dataStore.viewAsList);
    this.$search = new BehaviorSubject(this.dataStore.search);
    this.currentPath = this.$currentPath.asObservable();
    this.currentData = this.$currentData.asObservable();
    this.viewAsList = this.$viewAsList.asObservable();
    this.search = this.$search.asObservable();
  }

  uploadFileToanyOpsOS(dst: string, file: File): Observable<any> {
    this.logger.debug('Datastore Explorer', 'uploadFileToanyOpsOS', arguments);
    return this.FileSystem.uploadFile(dst, file);
  }

  uploadFileToRemote(src: string, dst: string, connectionUuid: string): void {
    this.logger.debug('Datastore Explorer', 'datastore-explorer_session__file_upload', arguments);
    this.socket.emit('datastore-explorer_session__file_upload', {
      src,
      dst,
      connectionUuid
    });
  }

  reloadPath(path?: string): void {
    this.FileSystem.getFileSystemPath(null, (path ? path : this.dataStore.currentPath)).subscribe(
      (res: { data: AnyOpsOSFile[] }) => {
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

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SysOSFile} from '../../../interfaces/file';
import {FileSystemService} from '../../../services/file-system.service';
import {Socket} from 'ngx-socket-io';
import {SftpService} from './sftp.service';
import {SftpConnection} from '../SftpConnection';

@Injectable({
  providedIn: 'root'
})
export class SftpServerService {
  private subjectGoPathBack = new Subject<any>();

  private $currentPath: BehaviorSubject<string>;
  private $currentData: BehaviorSubject<SysOSFile[]>;
  private $viewAsList: BehaviorSubject<boolean>;
  private $search: BehaviorSubject<object>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: SysOSFile[],
    viewAsList: boolean,
    search: { filename: string }
  };
  currentPath: Observable<any>;
  currentData: Observable<any>;
  viewAsList: Observable<any>;
  search: Observable<any>;

  constructor(private FileSystem: FileSystemService,
              private Sftp: SftpService,
              private socket: Socket) {
    this.dataStore = {currentPath: '/', currentData: [], viewAsList: false, search: null};
    this.$currentPath = new BehaviorSubject('/') as BehaviorSubject<string>;
    this.$currentData = new BehaviorSubject([]) as BehaviorSubject<SysOSFile[]>;
    this.$viewAsList = new BehaviorSubject(false) as BehaviorSubject<boolean>;
    this.$search = new BehaviorSubject({filename: null}) as BehaviorSubject<object>;
    this.currentPath = this.$currentPath.asObservable();
    this.currentData = this.$currentData.asObservable();
    this.viewAsList = this.$viewAsList.asObservable();
    this.search = this.$search.asObservable();

    this.socket
      .fromEvent('sftp__data')
      .subscribe((data: { uuid: string, path: string, text: SysOSFile[] }) => {
        console.log(data);
        const currentConnection: SftpConnection = this.Sftp.getActiveConnection();

        if (currentConnection.uuid === data.uuid) {
          this.dataStore.currentData = data.text;
          this.dataStore.currentPath = data.path;

          // broadcast data to subscribers
          this.$currentPath.next(Object.assign({}, this.dataStore).currentPath);
          this.$currentData.next(Object.assign({}, this.dataStore).currentData);
        }

      });

    this.socket
      .fromEvent('sftp__progress')
      .subscribe(data => console.log(data));

  }

  reloadPath(connectionUuid: string, path?: string): void {
    this.FileSystem.getFileSystemPath(connectionUuid, (path ? path : this.dataStore.currentPath)).subscribe(
      (res: SysOSFile[]) => {
        this.dataStore.currentData = res;

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

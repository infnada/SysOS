import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {NGXLogger} from 'ngx-logger';

import {SysOSFile} from '@sysos/lib-types';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';
import {SysosAppSftpService} from './sysos-app-sftp.service';
import {SftpConnection} from '../types/sftp-connection';

@Injectable({
  providedIn: 'root'
})
export class SysosAppSftpServerService {
  private subjectGoPathBack = new Subject<any>();
  private subjectFileProgress = new Subject<any>();

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

  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private socket: Socket,
              private FileSystem: SysosLibFileSystemService,
              private Sftp: SysosAppSftpService) {
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
      .fromEvent('sftp__prop')
      .subscribe((data: { uuid: string, prop: string, text: string }) => {

        this.Sftp.getConnectionByUuid(data.uuid)[data.prop] = data.text;

        // CONN CLOSE
        if (data.prop === 'status' && data.text === 'CONN CLOSE') {
          this.Sftp.getConnectionByUuid(data.uuid).state = 'disconnected';

          // CON ERROR
        } else if (data.prop === 'status' && data.text !== 'SSH CONNECTION ESTABLISHED') {

          // Error connecting
          if (this.Sftp.getConnectionByUuid(data.uuid).state === 'new') {
            this.Sftp.getConnectionByUuid(data.uuid).state = 'disconnected';
          }
          this.Sftp.getConnectionByUuid(data.uuid).error = data.text;
          this.Toastr.error(data.text, 'Error (' + this.Sftp.getConnectionByUuid(data.uuid).host + ')');

          // CONN OK
        } else if (data.text === 'SSH CONNECTION ESTABLISHED') {
          this.Sftp.getConnectionByUuid(data.uuid).state = 'connected';
          this.Sftp.getConnectionByUuid(data.uuid).error = null;
          this.Toastr.success(data.text, 'Connected (' + this.Sftp.getConnectionByUuid(data.uuid).host + ')');
          // $('#server_body').focus();
        }
      });

    // TODO: sftp exchange
    this.socket
      .fromEvent('sftp__progress')
      .subscribe(data => this.sendFileProgress(data));

  }

  downloadFileToSysOS(src: string, dst: string, connectionUuid: string): void {
    this.logger.debug('Sftp -> sftp_session__file_download -> src [], dst [], connectionUuid []', src, dst, connectionUuid);
    this.socket.emit('sftp_session__file_download', {
      src,
      dst,
      connectionUuid
    });
  }

  reloadPath(connectionUuid: string, path?: string): void {
    this.FileSystem.getFileSystemPath(connectionUuid, (path ? path : this.dataStore.currentPath)).subscribe(
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
        this.logger.error('Sftp -> Error while getting fileSystemPath -> ', error);
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

  sendFileProgress(data): void {
    this.subjectFileProgress.next(data);
  }

  getObserverFileProgress(): Observable<any> {
    return this.subjectFileProgress.asObservable();
  }
}

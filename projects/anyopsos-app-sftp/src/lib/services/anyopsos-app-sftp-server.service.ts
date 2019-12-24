import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSFile} from '@anyopsos/lib-types';

import {AnyOpsOSAppSftpService} from './anyopsos-app-sftp.service';
import {SftpConnection} from '../types/sftp-connection';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppSftpServerService {
  private subjectGoPathBack: Subject<void> = new Subject();
  private subjectFileProgress: Subject<void> = new Subject();
  private subjectLoadingData: Subject<boolean> = new Subject();

  private $currentPath: BehaviorSubject<string>;
  private $currentData: BehaviorSubject<AnyOpsOSFile[]>;
  private $viewAsList: BehaviorSubject<boolean>;
  private $search: BehaviorSubject<{ filename: string; }>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: AnyOpsOSFile[],
    viewAsList: boolean,
    search: { filename: string; }
  };
  currentPath: Observable<string>;
  currentData: Observable<AnyOpsOSFile[]>;
  viewAsList: Observable<boolean>;
  search: Observable<{ filename: string; }>;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private socket: Socket,
              private Modal: AnyOpsOSLibModalService,
              private FileSystem: AnyOpsOSLibFileSystemService,
              private Sftp: AnyOpsOSAppSftpService) {
    this.dataStore = {currentPath: '/', currentData: [], viewAsList: false, search: {filename: null}};
    this.$currentPath = new BehaviorSubject(this.dataStore.currentPath);
    this.$currentData = new BehaviorSubject(this.dataStore.currentData);
    this.$viewAsList = new BehaviorSubject(this.dataStore.viewAsList);
    this.$search = new BehaviorSubject(this.dataStore.search);
    this.currentPath = this.$currentPath.asObservable();
    this.currentData = this.$currentData.asObservable();
    this.viewAsList = this.$viewAsList.asObservable();
    this.search = this.$search.asObservable();

    this.socket
      .fromEvent('sftp__data')
      .subscribe((sockData: { uuid: string, data: { path: string; data: AnyOpsOSFile[]; } }) => {
        const currentConnection: SftpConnection = this.Sftp.getActiveConnection();

        if (currentConnection.uuid === sockData.uuid) {
          this.dataStore.currentData = sockData.data.data;
          this.dataStore.currentPath = sockData.data.path;

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
          this.Sftp.getConnectionByUuid(data.uuid).error = data.text;

          if (this.Modal.isModalOpened('.window--sftp .window__main')) {
            this.Modal.changeModalType('danger', '.window--sftp .window__main');
            this.Modal.changeModalText(data.text, '.window--sftp .window__main');
          } else {
            if (this.Sftp.getActiveConnection().uuid === data.uuid) this.Sftp.setActiveConnection(null);
          }

          // CONN OK
        } else if (data.text === 'SSH CONNECTION ESTABLISHED') {
          this.Sftp.getConnectionByUuid(data.uuid).state = 'connected';
          this.Sftp.getConnectionByUuid(data.uuid).error = null;

          this.Modal.closeModal('.window--sftp .window__main');

          // Set this connection as ActiveConnection
          if (this.Sftp.getActiveConnection() === null) this.Sftp.setActiveConnection(data.uuid);

          // $('#server_body').focus();
        }
      });

    // TODO: sftp exchange
    this.socket
      .fromEvent('sftp__progress')
      .subscribe(data => this.sendFileProgress(data));

  }

  initConnections(): void {
    this.FileSystem.getConfigFile('applications/sftp/config.json').subscribe(
      (res: SftpConnection[]) => {
        this.logger.info('Sftp', 'Get connections successfully');

        res.forEach((connection) => {
          connection.state = 'disconnected';
        });

        this.Sftp.setInitialConnections(res);

        res.forEach((connection) => {
          if (connection.autologin) this.Sftp.sendConnect(connection);
        });

      },
      error => {
        this.logger.error('Sftp', 'Error while getting connections', null, error);
      });
  }

  downloadFileToanyOpsOS(src: string, dst: string, connectionUuid: string): void {
    this.logger.debug('Sftp', 'sftp_session__file_download', arguments);
    this.socket.emit('sftp_session__file_download', {
      src,
      dst,
      connectionUuid
    });
  }

  reloadPath(connectionUuid: string, path?: string): void {
    const loggerArgs = arguments;

    this.subjectLoadingData.next(true);

    this.FileSystem.getFileSystemPath(connectionUuid, (path ? path : this.dataStore.currentPath)).subscribe(
      (res: { data: AnyOpsOSFile[] }) => {
        this.dataStore.currentData = res.data;

        // broadcast data to subscribers
        this.$currentData.next(Object.assign({}, this.dataStore).currentData);

        if (path) {
          this.dataStore.currentPath = path;

          // broadcast data to subscribers
          this.$currentPath.next(Object.assign({}, this.dataStore).currentPath);
        }

        this.subjectLoadingData.next(false);
      },
      error => {
        this.logger.error('Sftp', 'Error while getting fileSystemPath -> ', loggerArgs, error);
        this.subjectLoadingData.next(false);
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

  getObserverGoPathBack(): Observable<void> {
    return this.subjectGoPathBack.asObservable();
  }

  getObserverLoadingData(): Observable<boolean> {
    return this.subjectLoadingData.asObservable();
  }

  sendFileProgress(data): void {
    this.subjectFileProgress.next(data);
  }

  getObserverFileProgress(): Observable<any> {
    return this.subjectFileProgress.asObservable();
  }
}

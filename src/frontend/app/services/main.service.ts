import {Compiler, Injectable, Injector} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

declare const SystemJS: any;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private bootstrapSource = new BehaviorSubject({
    appBootstrapped: false,
  });
  currentBootstrapState = this.bootstrapSource.asObservable();

  setBootstrapState(data: any): void {
    this.bootstrapSource.next(data);
  }

  constructor(private compiler: Compiler,
              private injector: Injector,
              private logger: AnyOpsOSLibLoggerService,
              private FileSystem: AnyOpsOSLibFileSystemService,
              private Applications: AnyOpsOSLibApplicationService,
              private Modal: AnyOpsOSLibModalService,
              private socket: Socket) {
  }

  getInstalledLibs(path?): Promise<void> {
    return new Promise((resolve, reject) => {
      this.FileSystem.getFolder('/bin/libs/' + (path ? path : '')).subscribe(
        async (res: BackendResponse & { data: AnyOpsOSFile[] }) => {
          if (res.status === 'error') return this.logger.fatal('anyOpsOS', `Error while getting installed libs on /bin/libs/${path ? path : ''}`, null, res.data);
          this.logger.info('anyOpsOS', `Got Installed Libs successfully on /bin/libs)${path ? path : ''}`);

          const libPromises = [];
          const libFolders = [];

          res.data.forEach((value) => {
            if (this.FileSystem.getFileType(value.longName) === 'folder') return libFolders.push(this.getInstalledLibs(value.fileName + '/'));
            if (value.fileName.endsWith('.umd.js')) return libPromises.push(this.loadLib(value, path));
          });

          await Promise.all(libPromises);

          // TODO system.js is not returning a real promise.
          //  Hard waiting 1 second before loading next folder dependencies
          await new Promise(r => setTimeout(r, 1000));
          await Promise.all(libFolders);
          return resolve();
        },
        error => {
          this.logger.error('anyOpsOS', 'Error while getting installed libs', null, error);
        });
    });

  }

  async loadLib(lib, path): Promise<void> {
    return SystemJS.import(`/api/file/${encodeURIComponent('/bin/libs/' + (path ? path : '') + lib.fileName)}`);
  }

  init(): void {
    window.addEventListener( 'dragover', (e) => {
      e.preventDefault();
    });

    window.addEventListener( 'drop', (e) => {
      e.preventDefault();
    });

    window.addEventListener( 'contextmenu', (e) => {
      e.preventDefault();
    });

    this.socket.connect();

    this.socket.on('connect', () => {
      this.logger.info('anyOpsOS', 'Socket.io connected', null);
    });
    this.socket.on('disconnect', (err) => {
      this.logger.fatal('anyOpsOS', 'Socket.io disconnect', null, err);
    });
    this.socket.on('error', (err) => {
      this.logger.fatal('anyOpsOS', 'Socket.io error', null, err);
    });

    this.getInstalledLibs().then(() => {
      return this.Applications.getInstalledApplications();
    }).then(() => {
      return Promise.all([
        this.Applications.getTaskBarApplications(),
        this.Modal.getInstalledModals()
      ]);
    }).then(() => {
      this.setBootstrapState({
        appBootstrapped: true
      });
    });

  }
}

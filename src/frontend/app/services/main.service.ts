import {Compiler, Injectable, Injector} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {SysosLibLoggerService} from '@sysos/lib-logger';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibFileSystemService} from '@sysos/lib-file-system';

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
              private logger: SysosLibLoggerService,
              private FileSystem: SysosLibFileSystemService,
              private Applications: SysosLibApplicationService,
              private Modal: SysosLibModalService,
              private socket: Socket) {
  }

  getInstalledLibs(): Promise<null> {
    return new Promise((resolve, reject) => {
      this.FileSystem.getFileSystemPath(null, '/bin/libs').subscribe(
        (res: { data: { filename: string }[] }) => {
          this.logger.info('SysOs', 'Got Installed Libs successfully');

          let libPromises = [];

          res.data.forEach((value) => {
            if (value.filename.endsWith('.umd.js')) {
              libPromises.push(this.loadLib(value));
            }
          });

          return Promise.all(libPromises).then(() => {
            return resolve();
          });

        },
        error => {
          this.logger.error('SysOs', 'Error while getting installed libs', null, error);
        });
    });

  }

  loadLib(lib): Promise<null> {
    return new Promise((resolve) => {
      SystemJS.import(`/api/file/${encodeURIComponent('/bin/libs/' + lib.filename)}`).then((moduleToCompile) => {
        return resolve();
      });
    });
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

    this.socket.on('connect', () => {
      this.logger.info('SysOs', 'Socket.io connected', null);
    });
    this.socket.on('disconnect', (err) => {
      this.logger.fatal('SysOs', 'Socket.io disconnect', null, err);
    });
    this.socket.on('error', (err) => {
      this.logger.fatal('SysOs', 'Socket.io error', null, err);
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

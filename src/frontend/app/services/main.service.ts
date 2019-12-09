import {Compiler, Injectable, Injector} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSFile} from '@anyopsos/lib-types';

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

  getInstalledLibs(path = ''): Promise<void> {
    return new Promise((resolve, reject) => {
      this.FileSystem.getFileSystemPath(null, '/bin/libs/' + path).subscribe(
        (res: { data: AnyOpsOSFile[] }) => {
          this.logger.info('anyOpsOS', 'Got Installed Libs successfully');

          const libPromises = [];
          const libFolders = [];

          res.data.forEach((value) => {
            if (this.FileSystem.getFileType(value.longname) === 'folder') {
              libFolders.push(this.getInstalledLibs(value.filename + '/'));
            } else {
              if (value.filename.endsWith('.umd.js')) {
                libPromises.push(this.loadLib(value, path));
              }
            }
          });

          return Promise.all(libPromises).then(() => {
            return Promise.all(libFolders);
          }).then(() => {
            return resolve();
          }).catch((e: Error) => {
            this.logger.error('anyOpsOS', 'Error while getting installed libs', null, e.message);
          });

        },
        error => {
          this.logger.error('anyOpsOS', 'Error while getting installed libs', null, error);
        });
    });

  }

  async loadLib(lib, path): Promise<void> {
    return await SystemJS.import(`/api/file/${encodeURIComponent('/bin/libs/' + path + lib.filename)}`);
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

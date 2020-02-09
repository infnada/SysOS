import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibLoaderService} from '@anyopsos/lib-loader';
import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {AnyOpsOSLibDesktopTaskBarService} from '@anyopsos/lib-desktop-task-bar';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private bootstrapSource: BehaviorSubject<{ appBootstrapped: boolean; }> = new BehaviorSubject({
    appBootstrapped: false,
  });

  readonly currentBootstrapState: Observable<{ appBootstrapped: boolean; }> = this.bootstrapSource.asObservable();

  constructor(private readonly socket: Socket,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibLoader: AnyOpsOSLibLoaderService,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService,
              private readonly LibDesktopTaskBar: AnyOpsOSLibDesktopTaskBarService) {
  }

  private setBootstrapState(data: { appBootstrapped: boolean; }): void {
    this.bootstrapSource.next(data);
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

    // Load External libraries (dependencies)
    this.LibLoader.loadExternalLibraries().then(() => {

      // Load Application next
      return this.LibLoader.loadApplications();
    }).then(() => {

      // Since some Modals have an Application as a dependency, load it after
      return Promise.all([
        this.LibLoader.loadModals(),
        this.LibWorkspace.loadWorkspaces()
      ]);

    }).then(() => {
      return this.LibDesktopTaskBar.getTaskBarApplications();
    }).then(() => {
      this.setBootstrapState({
        appBootstrapped: true
      });
    });

  }
}

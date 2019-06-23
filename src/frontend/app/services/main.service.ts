import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';
import {NGXLogger} from 'ngx-logger';

import {SysosLibsModalService} from '@sysos/libs-modal';
import {SysosLibsApplicationService} from '@sysos/libs-application';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private logger: NGXLogger,
              private Applications: SysosLibsApplicationService,
              private Modal: SysosLibsModalService,
              private socket: Socket) {
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
      this.logger.info('[SysOs] -> Socket.io connected');
    });
    this.socket.on('disconnect', (err) => {
      this.logger.fatal('[SysOs] -> Socket.io disconnect', err);
    });
    this.socket.on('error', (err) => {
      this.logger.fatal('[SysOs] -> Socket.io error', err);
    });

    this.Applications.getInstalledApplications().then(() => {
      this.Applications.getTaskBarApplications();
    });
    return this.Modal.getInstalledModals();

  }
}

import {Injectable} from '@angular/core';

import {ModalService} from './modal.service';
import {ApplicationsService} from './applications.service';
import {Socket} from 'ngx-socket-io';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private logger: NGXLogger,
              private Applications: ApplicationsService,
              private Modal: ModalService,
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
      this.logger.debug('[SysOs] -> Socket.io connected');
    });
    this.socket.on('disconnect', (err) => {
      this.logger.error('[SysOs] -> Socket.io disconnect', err);
    });
    this.socket.on('error', (err) => {
      this.logger.error('[SysOs] -> Socket.io error', err);
    });

    this.Applications.getInstalledApplications().then(() => {
      this.Applications.getTaskBarApplications();
    });
    return this.Modal.getInstalledModals();

  }
}

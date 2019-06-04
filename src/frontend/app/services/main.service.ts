import {Injectable} from '@angular/core';

import {ModalService} from './modal.service';
import {ApplicationsService} from './applications.service';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private Applications: ApplicationsService,
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
      console.log(e);
      e.preventDefault();
    });

    this.socket.on('connect', () => {
      console.log('SysOs -> Socket.io connected');
    });
    this.socket.on('disconnect', (err) => {
      console.log(err);
    });
    this.socket.on('error', (err) => {
      console.log(err);
    });

    this.Applications.getInstalledApplications().then(() => {
      this.Applications.getTaskBarApplications();
    });
    return this.Modal.getInstalledModals();

  }
}

import {Injectable} from '@angular/core';

import {ModalService} from "./modal.service";
import {ApplicationsService} from "./applications.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private ApplicationsService: ApplicationsService,
              private ModalService: ModalService) {
  }

  init(): void {
    window.addEventListener( "dragover", function(e) {
      e.preventDefault();
    });

    window.addEventListener( "drop", function(e) {
      e.preventDefault();
    });

    window.addEventListener( "contextmenu", function(e) {
      e.preventDefault();
    });

    this.ApplicationsService.getInstalledApplications().then(() => {
      this.ApplicationsService.getTaskBarApplications();
    });
    return this.ModalService.getInstalledModals();

  }
}

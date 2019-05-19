import {Injectable} from '@angular/core';

import {ModalService} from "./modal.service";
import {FileSystemService} from "./file-system.service";
import {ApplicationsService} from "./applications.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private ApplicationsService: ApplicationsService,
              private FileSystemService: FileSystemService,
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
    return this.getInstalledModals();

  }

  /**
   * @description
   * Returns all scripts to load as SysOS applications
   */
  getInstalledModals() {
    this.FileSystemService.getFileSystemPath('/bin/modals').subscribe(
    (res: { filename: string }[]) => {
      console.debug('Modal Factory -> Get Installed Modals successfully');

      res = [
        {
          filename: "input-module.js"
        },
        {
          filename: "plain-module.js"
        },
        {
          filename: "question-module.js"
        }
      ];

      res.forEach((value) => {
        this.ModalService.loadModal(value)
      });

    },
    error => {
      console.error('Modal Factory -> Error while getting installed modals -> ', error);
      console.error(error);
    });
  };
}

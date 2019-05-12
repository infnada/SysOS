import {Injectable} from '@angular/core';

import {ApplicationsService} from "./applications.service";
import {FileSystemService} from "./file-system.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private ApplicationsService: ApplicationsService, private FileSystemService: FileSystemService) {
  }

  init(): void {
    // TODO
    /*angular.element(window).bind('dragover', function (e) {
      e.preventDefault();
    });
    angular.element(window).bind('drop', function (e) {
      e.preventDefault();
    });
    angular.element(window).bind('contextmenu', function (e) {
      e.preventDefault();
    });*/

    this.ApplicationsService.getInstalledApplications();
    this.ApplicationsService.getTaskBarApplications();

    // TODO: not necessary
    // this.FileSystemService.refreshPath('/root/Desktop/');
  }
}

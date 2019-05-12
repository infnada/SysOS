import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationsService} from "../../services/applications.service";
import {SftpComponent} from './sftp.component';
import { SftpActionsComponent } from './sftp-actions/sftp-actions.component';
import { SftpBodyComponent } from './sftp-body/sftp-body.component';
import { SftpMenuComponent } from './sftp-menu/sftp-menu.component';
import { SftpStatusComponent } from './sftp-status/sftp-status.component';

@NgModule({
  declarations: [SftpComponent, SftpActionsComponent, SftpBodyComponent, SftpMenuComponent, SftpStatusComponent],
  imports: [
    CommonModule
  ]
})
export class SftpModule implements OnInit {

  constructor(private ApplicationsService: ApplicationsService) {
    ApplicationsService.registerApplication({
      id: 'sftp',
      ico: 'upload',
      name: 'SFTP',
      menu: true,
      actions: true,
      status: true,
      style: {width:"1275px",height:"600px",top:"9%",left:"10%"}
    });
  }

  ngOnInit() {

  }
}

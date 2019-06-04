import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatMenuModule, MatButtonModule, MatSlideToggleModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {FilterPipeModule} from 'ngx-filter-pipe';

import {ApplicationsService} from '../../services/applications.service';
import {SftpComponent} from './sftp.component';
import {SftpActionsComponent} from './sftp-actions/sftp-actions.component';
import {SftpBodyComponent} from './sftp-body/sftp-body.component';
import {SftpMenuComponent} from './sftp-menu/sftp-menu.component';
import {SftpStatusComponent} from './sftp-status/sftp-status.component';
import {SftpActionsLocalComponent} from './sftp-actions/sftp-actions-local/sftp-actions-local.component';
import {SftpActionsServerComponent} from './sftp-actions/sftp-actions-server/sftp-actions-server.component';
import {SftpBodyLocalComponent} from './sftp-body/sftp-body-local/sftp-body-local.component';
import {SftpBodyServerComponent} from './sftp-body/sftp-body-server/sftp-body-server.component';
import {SftpBodyExchangeComponent} from './sftp-body/sftp-body-exchange/sftp-body-exchange.component';
import {SftpBodyNewConnectionComponent} from './sftp-body/sftp-body-new-connection/sftp-body-new-connection.component';

import {ngfModule} from 'angular-file';
import {FileModule} from '../../shared-modules/file/file.module';
import {SftpService} from './services/sftp.service';

@NgModule({
  declarations: [
    SftpComponent,
    SftpActionsComponent,
    SftpBodyComponent,
    SftpMenuComponent,
    SftpStatusComponent,
    SftpActionsLocalComponent,
    SftpActionsServerComponent,
    SftpBodyLocalComponent,
    SftpBodyServerComponent,
    SftpBodyExchangeComponent,
    SftpBodyNewConnectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    DragDropModule,
    ngfModule,
    // Shared module import
    FileModule
  ]
})
export class SftpModule {

  constructor(private Applications: ApplicationsService,
              private Sftp: SftpService) {
    Applications.registerApplication({
      id: 'sftp',
      ico: 'upload',
      name: 'SFTP',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1275px', height: '600px', top: '9%', left: '10%'}
    });

    this.Sftp.initConnections();
  }

}

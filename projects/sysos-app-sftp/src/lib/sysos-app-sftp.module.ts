import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatMenuModule, MatButtonModule, MatSlideToggleModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {FilterPipeModule} from 'ngx-filter-pipe';
import {ngfModule} from 'angular-file';
import {ToastrModule} from 'ngx-toastr';

import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibFileModule} from '@sysos/lib-file';

import {ActionsComponent} from './actions/actions.component';
import {ActionsLocalComponent} from './actions/actions-local/actions-local.component';
import {ActionsServerComponent} from './actions/actions-server/actions-server.component';
import {BodyComponent} from './body/body.component';
import {BodyLocalComponent} from './body/body-local/body-local.component';
import {BodyServerComponent} from './body/body-server/body-server.component';
import {BodyExchangeComponent} from './body/body-exchange/body-exchange.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {MenuComponent} from './menu/menu.component';
import {StatusComponent} from './status/status.component';
import {SysosAppSftpService} from './services/sysos-app-sftp.service';

@NgModule({
  declarations: [
    ActionsComponent,
    ActionsLocalComponent,
    ActionsServerComponent,
    BodyComponent,
    BodyLocalComponent,
    BodyServerComponent,
    BodyExchangeComponent,
    BodyNewConnectionComponent,
    MenuComponent,
    StatusComponent
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
    ToastrModule.forRoot(),
    // Shared module import
    SysosLibFileModule
  ],
  exports: []
})
export class SysosAppSftpModule {
  constructor(private Applications: SysosLibApplicationService,
              private Sftp: SysosAppSftpService) {
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

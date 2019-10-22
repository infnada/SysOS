import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {FilterPipeModule} from 'ngx-filter-pipe';
import {ngfModule} from 'angular-file';
import {ToastrModule} from 'ngx-toastr';

import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibFileModule} from '@sysos/lib-file';
import {SysosLibFolderModule} from '@sysos/lib-folder';

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
import {SysosAppSftpServerService} from './services/sysos-app-sftp-server.service';

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
    DragDropModule,
    ngfModule,
    ToastrModule.forRoot(),
    // Shared module import
    SysosLibAngularMaterialModule,
    SysosLibFolderModule,
    SysosLibFileModule
  ],
  exports: []
})
export class SysosAppSftpModule {
  constructor(private Applications: SysosLibApplicationService,
              private SftpServer: SysosAppSftpServerService) {
    Applications.registerApplication({
      id: 'sftp',
      ico: 'fas fa-upload',
      name: 'SFTP',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1275px', height: '600px', top: '9%', left: '10%'}
    });

    this.SftpServer.initConnections();
  }
}

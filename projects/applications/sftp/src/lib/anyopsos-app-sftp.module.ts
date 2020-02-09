import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileModule} from '@anyopsos/lib-file';
import {AnyOpsOSLibFolderModule} from '@anyopsos/lib-folder';
import {AnyOpsOSLibFolderExplorerModule} from '@anyopsos/lib-folder-explorer';
import {AnyOpsOSLibPipesModule} from '@anyopsos/lib-pipes';

import {ActionsComponent} from './components/actions/actions.component';
import {BodyComponent} from './components/body/body.component';
import {BodyServerComponent} from './components/body/body-server/body-server.component';
import {BodyExchangeComponent} from './components/body/body-exchange/body-exchange.component';
import {BodyNewConnectionComponent} from './components/body/body-new-connection/body-new-connection.component';
import {MenuComponent} from './components/menu/menu.component';
import {StatusComponent} from './components/status/status.component';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
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
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibFileModule,
    AnyOpsOSLibFolderModule,
    AnyOpsOSLibFolderExplorerModule,
    AnyOpsOSLibPipesModule
  ],
  exports: []
})
export class AnyOpsOSAppSftpModule {
  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService) {

    this.LibApplication.registerApplication({
      uuid: 'sftp',
      ico: 'fas fa-upload',
      name: 'SFTP',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1275px', height: '686px', top: '9%', left: '10%'}
    });

  }
}

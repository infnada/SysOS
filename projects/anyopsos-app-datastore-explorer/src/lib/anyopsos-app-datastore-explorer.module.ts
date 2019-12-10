import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {FilterPipeModule} from 'ngx-filter-pipe';
import {ngfModule} from 'angular-file';
import {ToastrModule} from 'ngx-toastr';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileModule} from '@anyopsos/lib-file';
import {AnyOpsOSLibFolderModule} from '@anyopsos/lib-folder';

import {ActionsComponent} from './components/actions/actions.component';
import {ActionsLocalComponent} from './components/actions/actions-local/actions-local.component';
import {ActionsServerComponent} from './components/actions/actions-server/actions-server.component';
import {BodyComponent} from './components/body/body.component';
import {BodyLocalComponent} from './components/body/body-local/body-local.component';
import {BodyServerComponent} from './components/body/body-server/body-server.component';
import {BodyExchangeComponent} from './components/body/body-exchange/body-exchange.component';
import {BodyNewConnectionComponent} from './components/body/body-new-connection/body-new-connection.component';
import {MenuComponent} from './components/menu/menu.component';
import {StatusComponent} from './components/status/status.component';

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
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibFolderModule,
    AnyOpsOSLibFileModule
  ],
  exports: []
})
export class AnyOpsOSAppDatastoreExplorerModule {
  constructor(private Applications: AnyOpsOSLibApplicationService) {
    Applications.registerApplication({
      id: 'datastore-explorer',
      ico: 'fas fa-database',
      name: 'Datastore Explorer',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1275px', height: '600px', top: '5%', left: '15%'}
    });
  }
}

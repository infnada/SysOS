import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ToastrModule} from 'ngx-toastr';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';
import {AnyOpsOSAppSshService} from './services/anyopsos-app-ssh.service';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {StatusComponent} from './status/status.component';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    MenuComponent,
    StatusComponent,
    BodyNewConnectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: []
})
export class AnyOpsOSAppSshModule {
  constructor(private Applications: AnyOpsOSLibApplicationService,
              private Ssh: AnyOpsOSAppSshService) {
    Applications.registerApplication({
      id: 'ssh',
      ico: 'fas fa-terminal',
      name: 'SSH',
      menu: true,
      actions: true,
      status: true,
      style: {width: '870px', height: '600px', top: '7%', left: '10%'}
    });

    this.Ssh.initConnections();
  }
}

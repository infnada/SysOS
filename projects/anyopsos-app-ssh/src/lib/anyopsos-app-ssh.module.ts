import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ToastrModule} from 'ngx-toastr';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibTerminalModule} from '@anyopsos/lib-terminal';

import {ActionsComponent} from './components/actions/actions.component';
import {BodyComponent} from './components/body/body.component';
import {MenuComponent} from './components/menu/menu.component';
import {AnyOpsOSAppSshService} from './services/anyopsos-app-ssh.service';
import {BodyNewConnectionComponent} from './components/body/body-new-connection/body-new-connection.component';
import {StatusComponent} from './components/status/status.component';

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
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibTerminalModule
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
      style: {width: '900px', height: '686px', top: '7%', left: '10%'}
    });

    this.Ssh.initConnections();
  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatMenuModule, MatButtonModule, MatSlideToggleModule} from '@angular/material';

import {ToastrModule} from 'ngx-toastr';

import {SysosLibApplicationService} from '@sysos/lib-application';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';
import {SysosAppSshService} from './services/sysos-app-ssh.service';
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
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    ToastrModule.forRoot()
  ],
  exports: []
})
export class SysosAppSshModule {
  constructor(private Applications: SysosLibApplicationService,
              private Ssh: SysosAppSshService) {
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

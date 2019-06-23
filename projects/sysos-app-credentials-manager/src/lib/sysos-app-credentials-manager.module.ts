import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {ToastrModule} from 'ngx-toastr';

import {SysosLibsApplicationService} from '@sysos/libs-application';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';
import {StatusComponent} from './status/status.component';

import {SysosAppCredentialsManagerService} from './services/sysos-app-credentials-manager.service';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    MenuComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ToastrModule.forRoot()
  ],
  exports: [],
})
export class SysosAppCredentialsManagerModule {
  constructor(private Applications: SysosLibsApplicationService,
              private CredentialsManager: SysosAppCredentialsManagerService) {

    Applications.registerApplication({
      id: 'credentials-manager',
      ico: 'key',
      name: 'Credentials Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '870px', height: '600px', top: '7%', left: '10%'}
    });

    CredentialsManager.initCredentials();
  }
}

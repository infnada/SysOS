import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ToastrModule} from 'ngx-toastr';

import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';

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
    ToastrModule.forRoot(),
    // Shared module import
    SysosLibAngularMaterialModule
  ],
  exports: []
})
export class SysosAppCredentialsManagerModule {
  constructor(private serviceInjector: SysosLibServiceInjectorService,
              private Applications: SysosLibApplicationService,
              private CredentialsManager: SysosAppCredentialsManagerService) {

    this.serviceInjector.set('SysosAppCredentialsManagerService', this.CredentialsManager);

    Applications.registerApplication({
      id: 'credentials-manager',
      ico: 'fas fa-key',
      name: 'Credentials Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '870px', height: '600px', top: '7%', left: '10%'}
    });

    CredentialsManager.initCredentials();
  }
}

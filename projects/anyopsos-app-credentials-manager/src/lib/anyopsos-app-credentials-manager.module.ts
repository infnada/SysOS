import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';
import {StatusComponent} from './status/status.component';

import {AnyOpsOSAppCredentialsManagerService} from './services/anyopsos-app-credentials-manager.service';

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
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: []
})
export class AnyOpsOSAppCredentialsManagerModule {
  constructor(private readonly serviceInjector: AnyOpsOSLibServiceInjectorService,
              private readonly Applications: AnyOpsOSLibApplicationService,
              private readonly CredentialsManager: AnyOpsOSAppCredentialsManagerService) {

    this.serviceInjector.set('AnyOpsOSAppCredentialsManagerService', this.CredentialsManager);

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

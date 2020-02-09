import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {ActionsComponent} from './components/actions/actions.component';
import {BodyComponent} from './components/body/body.component';
import {MenuComponent} from './components/menu/menu.component';
import {StatusComponent} from './components/status/status.component';

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
  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService) {

    LibApplication.registerApplication({
      uuid: 'credentials-manager',
      ico: 'fas fa-key',
      name: 'Credentials Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '870px', height: '600px', top: '7%', left: '10%'}
    });

  }
}

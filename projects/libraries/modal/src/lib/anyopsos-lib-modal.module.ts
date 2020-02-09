import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

import {BodyComponent} from './components/body/body.component';
import {ButtonsComponent} from './components/buttons/buttons.component';

@NgModule({
  declarations: [
    BodyComponent,
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [
    BodyComponent,
    ButtonsComponent
  ],
  providers: []
})
export class AnyOpsOSLibModalModule {
}

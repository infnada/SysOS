import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

import {AnyOpsOSLibFileComponent} from './anyopsos-lib-file.component';

@NgModule({
  declarations: [
    AnyOpsOSLibFileComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [
    AnyOpsOSLibFileComponent
  ]
})
export class AnyOpsOSLibFileModule {
}

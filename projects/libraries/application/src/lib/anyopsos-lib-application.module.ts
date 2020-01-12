import {CommonModule} from '@angular/common';
import {NgModule, Optional, SkipSelf} from '@angular/core';

import {ResizableModule} from 'angular-resizable-element';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

import {AnyOpsOSLibApplicationComponent} from './components/anyopsos-lib-application.component';

@NgModule({
  declarations: [
    AnyOpsOSLibApplicationComponent
  ],
  imports: [
    CommonModule,
    ResizableModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [
    AnyOpsOSLibApplicationComponent
  ]
})
export class AnyOpsOSLibApplicationModule {
  constructor(@Optional() @SkipSelf() parentModule: AnyOpsOSLibApplicationModule) {
    if (parentModule) {
      throw new Error(
        'AnyOpsOSLibApplicationModule is already loaded. Import it in the root AppModule only');
    }
  }
}

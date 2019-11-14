import {CommonModule} from '@angular/common';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {ResizableModule} from 'angular-resizable-element';
import {ToastrModule} from 'ngx-toastr';

import {AnyOpsOSLibApplicationComponent} from './anyopsos-lib-application.component';

@NgModule({
  declarations: [
    AnyOpsOSLibApplicationComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ResizableModule,
    ToastrModule.forRoot()
  ],
  exports: [
    AnyOpsOSLibApplicationComponent
  ]
})
export class AnyOpsOSLibApplicationModule {
  constructor(@Optional() @SkipSelf() parentModule: AnyOpsOSLibApplicationModule) {
    if (parentModule) {
      throw new Error(
        'AnyOpsOSLibApplicationModule is already loaded. Import it in the AppModule only');
    }
  }
}

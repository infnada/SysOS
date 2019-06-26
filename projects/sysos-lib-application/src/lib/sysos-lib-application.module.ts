import {CommonModule} from '@angular/common';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {ResizableModule} from 'angular-resizable-element';
import {ToastrModule} from 'ngx-toastr';

import {SysosLibApplicationComponent} from './sysos-lib-application.component';

@NgModule({
  declarations: [
    SysosLibApplicationComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ResizableModule,
    ToastrModule.forRoot()
  ],
  exports: [
    SysosLibApplicationComponent
  ]
})
export class SysosLibApplicationModule {
  constructor(@Optional() @SkipSelf() parentModule: SysosLibApplicationModule) {
    if (parentModule) {
      throw new Error(
        'SysosLibApplicationModule is already loaded. Import it in the AppModule only');
    }
  }
}

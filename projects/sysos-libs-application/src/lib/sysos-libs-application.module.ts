import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {ResizableModule} from 'angular-resizable-element';
import {ToastrModule} from 'ngx-toastr';

import {SysosLibsApplicationComponent} from './sysos-libs-application.component';

@NgModule({
  declarations: [
    SysosLibsApplicationComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ResizableModule,
    ToastrModule.forRoot()
  ],
  exports: [
    SysosLibsApplicationComponent
  ]
})
export class SysosLibsApplicationModule {
}

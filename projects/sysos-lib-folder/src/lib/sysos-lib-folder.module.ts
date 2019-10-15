import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FilterPipeModule} from 'ngx-filter-pipe';

import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';
import {SysosLibFileModule} from '@sysos/lib-file';

import {SysosLibFolderComponent} from './sysos-lib-folder.component';

@NgModule({
  declarations: [SysosLibFolderComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FilterPipeModule,
    // Shared module import
    SysosLibAngularMaterialModule,
    SysosLibFileModule
  ],
  exports: [SysosLibFolderComponent]
})
export class SysosLibFolderModule {
}

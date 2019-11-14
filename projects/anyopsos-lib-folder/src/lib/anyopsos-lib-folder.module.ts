import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FilterPipeModule} from 'ngx-filter-pipe';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibFileModule} from '@anyopsos/lib-file';

import {AnyOpsOSLibFolderComponent} from './anyopsos-lib-folder.component';

@NgModule({
  declarations: [AnyOpsOSLibFolderComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FilterPipeModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibFileModule
  ],
  exports: [AnyOpsOSLibFolderComponent]
})
export class AnyOpsOSLibFolderModule {
}

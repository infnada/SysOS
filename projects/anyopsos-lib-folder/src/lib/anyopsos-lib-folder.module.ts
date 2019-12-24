import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibFileModule} from '@anyopsos/lib-file';
import {AnyOpsOSLibPipesModule} from '@anyopsos/lib-pipes';

import {AnyOpsOSLibFolderComponent} from './anyopsos-lib-folder.component';

@NgModule({
  declarations: [AnyOpsOSLibFolderComponent],
  imports: [
    CommonModule,
    DragDropModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibFileModule,
    AnyOpsOSLibPipesModule
  ],
  exports: [AnyOpsOSLibFolderComponent]
})
export class AnyOpsOSLibFolderModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ngfModule} from 'angular-file';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibFileModule} from '@anyopsos/lib-file';
import {AnyOpsOSLibPipesModule} from '@anyopsos/lib-pipes';

import {AnyOpsOSLibFolderComponent} from './components/anyopsos-lib-folder.component';

@NgModule({
  declarations: [AnyOpsOSLibFolderComponent],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibFileModule,
    AnyOpsOSLibPipesModule
  ],
  exports: [
    ngfModule,
    AnyOpsOSLibFolderComponent
  ]
})
export class AnyOpsOSLibFolderModule {
}

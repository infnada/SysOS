import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';

import {SysosLibFileComponent} from './sysos-lib-file.component';

@NgModule({
  declarations: [
    SysosLibFileComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    SysosLibAngularMaterialModule
  ],
  exports: [
    SysosLibFileComponent
  ]
})
export class SysosLibFileModule {
}

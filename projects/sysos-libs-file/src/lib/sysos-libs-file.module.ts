import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatMenuModule, MatDividerModule} from '@angular/material';

import {SysosLibsFileComponent} from './sysos-libs-file.component';

@NgModule({
  declarations: [
    SysosLibsFileComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [
    SysosLibsFileComponent
  ]
})
export class SysosLibsFileModule {
}

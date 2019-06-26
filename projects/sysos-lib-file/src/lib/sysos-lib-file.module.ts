import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatMenuModule, MatDividerModule} from '@angular/material';

import {SysosLibFileComponent} from './sysos-lib-file.component';

@NgModule({
  declarations: [
    SysosLibFileComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [
    SysosLibFileComponent
  ]
})
export class SysosLibFileModule {
}

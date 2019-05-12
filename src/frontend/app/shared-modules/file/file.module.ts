import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileComponent} from './file.component';
import {MatMenuModule, MatDividerModule} from '@angular/material';

@NgModule({
  declarations: [
    FileComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [
    FileComponent
  ]
})
export class FileModule {
}

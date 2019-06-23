import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatMenuModule, MatDividerModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {FilterPipeModule} from 'ngx-filter-pipe';
import {ngfModule} from 'angular-file';

import {SysosLibsApplicationService} from '@sysos/libs-application';
import {SysosLibsFileModule} from '@sysos/libs-file';

import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';
import {ActionsBodyComponent} from './actions/actions-body/actions-body.component';

@NgModule({
  declarations: [
    BodyComponent,
    MenuComponent,
    ActionsBodyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilterPipeModule,
    MatMenuModule,
    MatDividerModule,
    DragDropModule,
    ngfModule,
    // Shared module import
    SysosLibsFileModule
  ],
  exports: []
})
export class SysosAppFileExplorerModule {
  constructor(private Applications: SysosLibsApplicationService) {
    Applications.registerApplication({
      id: 'file-explorer',
      ico: 'folder',
      name: 'File Explorer',
      menu: true,
      actions: false,
      status: false,
      style: {width: '770px', height: '600px', top: '9%', left: '12%'}
    });
  }
}

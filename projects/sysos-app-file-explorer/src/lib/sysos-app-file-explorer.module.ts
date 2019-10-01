import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatMenuModule, MatDividerModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {ngfModule} from 'angular-file';

import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibFileModule} from '@sysos/lib-file';
import {SysosLibFolderModule} from '@sysos/lib-folder';

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
    MatMenuModule,
    MatDividerModule,
    DragDropModule,
    ngfModule,
    // Shared module import
    SysosLibFileModule,
    SysosLibFolderModule
  ],
  exports: []
})
export class SysosAppFileExplorerModule {
  constructor(private Applications: SysosLibApplicationService) {
    Applications.registerApplication({
      id: 'file-explorer',
      ico: 'fas fa-folder',
      name: 'File Explorer',
      menu: true,
      actions: false,
      status: false,
      style: {width: '770px', height: '600px', top: '9%', left: '12%'}
    });
  }
}

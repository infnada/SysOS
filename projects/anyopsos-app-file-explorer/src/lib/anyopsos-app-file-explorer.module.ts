import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {ngfModule} from 'angular-file';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibFileModule} from '@anyopsos/lib-file';
import {AnyOpsOSLibFolderModule} from '@anyopsos/lib-folder';

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
    DragDropModule,
    ngfModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibFileModule,
    AnyOpsOSLibFolderModule
  ],
  exports: []
})
export class AnyOpsOSAppFileExplorerModule {
  constructor(private Applications: AnyOpsOSLibApplicationService) {
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

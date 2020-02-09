import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibFolderExplorerModule} from '@anyopsos/lib-folder-explorer';

import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';

@NgModule({
  declarations: [
    BodyComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // Shared module import
    AnyOpsOSLibFolderExplorerModule
  ],
  exports: []
})
export class AnyOpsOSAppFileExplorerModule {
  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService) {

    this.LibApplication.registerApplication({
      uuid: 'file-explorer',
      ico: 'fas fa-folder',
      name: 'File Explorer',
      menu: true,
      actions: false,
      status: false,
      style: {width: '770px', height: '600px', top: '9%', left: '12%'}
    });

  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSExtLibTheiaModule} from '@anyopsos/ext-lib-theia';

import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';

@NgModule({
  declarations: [
    BodyComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSExtLibTheiaModule
  ],
  exports: []
})
export class AnyOpsOSAppNotepadModule {

  constructor(private Applications: AnyOpsOSLibApplicationService) {

    Applications.registerApplication({
      uuid: 'notepad',
      ico: 'fas fa-pencil-alt',
      name: 'Notepad',
      menu: true,
      style: {width: '600px', height: '300px', top: '10%', left: '30%'}
    });

  }

}

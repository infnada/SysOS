import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MonacoEditorModule} from 'ngx-monaco-editor';

import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

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
    MonacoEditorModule
  ],
  exports: []
})
export class AnyOpsOSAppNotepadModule {
  constructor(private Applications: AnyOpsOSLibApplicationService) {
    Applications.registerApplication({
      id: 'notepad',
      ico: 'fas fa-pencil-alt',
      name: 'Notepad',
      menu: true,
      style: {width: '600px', height: '300px', top: '10%', left: '30%'}
    });
  }
}

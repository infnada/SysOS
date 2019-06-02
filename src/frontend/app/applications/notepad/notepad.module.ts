import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MonacoEditorModule} from 'ngx-monaco-editor';

import {ApplicationsService} from '../../services/applications.service';
import {NotepadBodyComponent} from './notepad-body/notepad-body.component';
import {NotepadMenuComponent} from './notepad-menu/notepad-menu.component';

@NgModule({
  declarations: [
    NotepadBodyComponent,
    NotepadMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule
  ]
})
export class NotepadModule implements OnInit {

  constructor(private ApplicationsService: ApplicationsService) {
    ApplicationsService.registerApplication({
      id: 'notepad',
      ico: 'pencil',
      name: 'Notepad',
      menu: true,
      style: {width: '600px', height: '300px', top: '10%', left: '30%'}
    });
  }

  ngOnInit() {

  }
}

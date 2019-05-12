import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationsService} from "../../services/applications.service";
import {NotepadComponent} from './notepad.component';
import { NotepadBodyComponent } from './notepad-body/notepad-body.component';
import { NotepadMenuComponent } from './notepad-menu/notepad-menu.component';

@NgModule({
  declarations: [NotepadComponent, NotepadBodyComponent, NotepadMenuComponent],
  imports: [
    CommonModule
  ]
})
export class NotepadModule implements OnInit {

  constructor(private ApplicationsService: ApplicationsService) {
    ApplicationsService.registerApplication({
      id: 'notepad',
      ico: 'pencil',
      name: 'Notepad',
      menu: true,
      style: {width:"600px",height:"300px",top:"10%",left:"30%"}
    });
  }

  ngOnInit() {

  }
}

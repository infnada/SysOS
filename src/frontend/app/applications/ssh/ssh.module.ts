import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationsService} from '../../services/applications.service';
import {SshComponent} from './ssh.component';
import {SshActionsComponent} from './ssh-actions/ssh-actions.component';
import {SshBodyComponent} from './ssh-body/ssh-body.component';
import {SshMenuComponent} from './ssh-menu/ssh-menu.component';
import {SshStatusComponent} from './ssh-status/ssh-status.component';

@NgModule({
  declarations: [
    SshComponent,
    SshActionsComponent,
    SshBodyComponent,
    SshMenuComponent,
    SshStatusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SshModule implements OnInit {

  constructor(private Applications: ApplicationsService) {
    Applications.registerApplication({
      id: 'ssh',
      ico: 'terminal',
      name: 'SSH',
      menu: true,
      actions: true,
      status: true,
      style: {width: '870px', height: '600px', top: '7%', left: '10%'}
    });
  }

  ngOnInit() {

  }
}

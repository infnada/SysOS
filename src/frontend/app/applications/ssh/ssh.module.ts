import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatDividerModule, MatMenuModule, MatButtonModule, MatSlideToggleModule} from '@angular/material';

import {ApplicationsService} from '../../services/applications.service';
import {SshComponent} from './ssh.component';
import {SshActionsComponent} from './ssh-actions/ssh-actions.component';
import {SshBodyComponent} from './ssh-body/ssh-body.component';
import {SshMenuComponent} from './ssh-menu/ssh-menu.component';
import {SshStatusComponent} from './ssh-status/ssh-status.component';
import {SshBodyNewConnectionComponent} from './ssh-body/ssh-body-new-connection/ssh-body-new-connection.component';
import {SshService} from './ssh.service';

@NgModule({
  declarations: [
    SshComponent,
    SshActionsComponent,
    SshBodyComponent,
    SshMenuComponent,
    SshStatusComponent,
    SshBodyNewConnectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
  ]
})
export class SshModule  {

  constructor(private Applications: ApplicationsService,
              private Ssh: SshService) {
    Applications.registerApplication({
      id: 'ssh',
      ico: 'terminal',
      name: 'SSH',
      menu: true,
      actions: true,
      status: true,
      style: {width: '870px', height: '600px', top: '7%', left: '10%'}
    });

    this.Ssh.initConnections();
  }

}

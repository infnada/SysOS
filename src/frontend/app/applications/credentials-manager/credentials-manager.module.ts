import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsManagerComponent } from './credentials-manager.component';
import { CredentialsManagerMenuComponent } from './credentials-manager-menu/credentials-manager-menu.component';
import { CredentialsManagerStatusComponent } from './credentials-manager-status/credentials-manager-status.component';
import { CredentialsManagerBodyComponent } from './credentials-manager-body/credentials-manager-body.component';
import { CredentialsManagerActionsComponent } from './credentials-manager-actions/credentials-manager-actions.component';

import {ApplicationsService} from "../../services/applications.service";

@NgModule({
  declarations: [CredentialsManagerComponent, CredentialsManagerBodyComponent, CredentialsManagerActionsComponent, CredentialsManagerMenuComponent, CredentialsManagerStatusComponent],
  imports: [
    CommonModule
  ]
})
export class CredentialsManagerModule implements OnInit {

  constructor(private ApplicationsService: ApplicationsService) {
    ApplicationsService.registerApplication({
      id: 'credentials-manager',
      ico: 'key',
      name: 'Credentials Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width:"870px",height:"600px",top:"7%",left:"10%"}
    });
  }

  ngOnInit() {
  }
}

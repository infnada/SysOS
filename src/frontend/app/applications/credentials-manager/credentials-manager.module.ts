import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {CredentialsManagerMenuComponent} from './credentials-manager-menu/credentials-manager-menu.component';
import {CredentialsManagerStatusComponent} from './credentials-manager-status/credentials-manager-status.component';
import {CredentialsManagerBodyComponent} from './credentials-manager-body/credentials-manager-body.component';
import {CredentialsManagerActionsComponent} from './credentials-manager-actions/credentials-manager-actions.component';

import {ApplicationsService} from '../../services/applications.service';
import {CredentialsManagerService} from './credentials-manager.service';

@NgModule({
  declarations: [
    CredentialsManagerBodyComponent,
    CredentialsManagerActionsComponent,
    CredentialsManagerMenuComponent,
    CredentialsManagerStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class CredentialsManagerModule {

  constructor(private ApplicationsService: ApplicationsService,
              private CredentialsManagerService: CredentialsManagerService) {

    ApplicationsService.registerApplication({
      id: 'credentials-manager',
      ico: 'key',
      name: 'Credentials Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '870px', height: '600px', top: '7%', left: '10%'}
    });

    CredentialsManagerService.initCredentials();
  }

}

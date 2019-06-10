import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatDividerModule, MatMenuModule, MatButtonModule, MatSlideToggleModule} from '@angular/material';

import {ApplicationsService} from '../../services/applications.service';
import {InfrastructureManagerActionsComponent} from './infrastructure-manager-actions/infrastructure-manager-actions.component';
import {InfrastructureManagerBodyComponent} from './infrastructure-manager-body/infrastructure-manager-body.component';
import {InfrastructureManagerMenuComponent} from './infrastructure-manager-menu/infrastructure-manager-menu.component';
import {InfrastructureManagerStatusComponent} from './infrastructure-manager-status/infrastructure-manager-status.component';
import {InfrastructureManagerBodyNewConnectionComponent} from './infrastructure-manager-body/infrastructure-manager-body-new-connection/infrastructure-manager-body-new-connection.component';

@NgModule({
  declarations: [
    InfrastructureManagerActionsComponent,
    InfrastructureManagerBodyComponent,
    InfrastructureManagerMenuComponent,
    InfrastructureManagerStatusComponent,
    InfrastructureManagerBodyNewConnectionComponent
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
export class InfrastructureManagerModule implements OnInit {

  constructor(private Applications: ApplicationsService) {
    Applications.registerApplication({
      id: 'infrastructure-manager',
      ico: 'server',
      name: 'Infrastructure Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1700px', height: '750px', top: '8%', left: '7%'}
    });
  }

  ngOnInit() {

  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatMenuModule, MatButtonModule, MatSlideToggleModule, MatTreeModule, MatIconModule} from '@angular/material';

import {ToastrModule} from 'ngx-toastr';

import {SysosLibsApplicationService} from '@sysos/libs-application';

import {SysosAppInfrastructureManagerService} from './services/sysos-app-infrastructure-manager.service';
import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {MenuComponent} from './menu/menu.component';
import {StatusComponent} from './status/status.component';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    BodyNewConnectionComponent,
    MenuComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  exports: []
})
export class SysosAppInfrastructureManagerModule {
  constructor(private Applications: SysosLibsApplicationService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {
    Applications.registerApplication({
      id: 'infrastructure-manager',
      ico: 'server',
      name: 'Infrastructure Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1700px', height: '750px', top: '8%', left: '7%'}
    });

    this.InfrastructureManager.initConnections();
    this.InfrastructureManager.initLinksMap();
  }
}

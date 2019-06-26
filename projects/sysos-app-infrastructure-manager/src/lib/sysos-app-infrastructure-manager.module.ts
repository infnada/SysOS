import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatMenuModule, MatButtonModule, MatSlideToggleModule, MatTreeModule, MatIconModule} from '@angular/material';

import {ToastrModule} from 'ngx-toastr';

import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {MenuComponent} from './menu/menu.component';
import {StatusComponent} from './status/status.component';

import {SysosAppInfrastructureManagerService} from './services/sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureVmwareService} from './services/sysos-app-infrastructure-vmware.service';

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
  constructor(private serviceInjector: SysosLibServiceInjectorService,
              private Applications: SysosLibApplicationService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureVmwareService: SysosAppInfrastructureVmwareService) {

    this.serviceInjector.set('SysosAppInfrastructureManagerService', this.InfrastructureManager);
    this.serviceInjector.set('SysosAppInfrastructureVmwareService', this.InfrastructureVmwareService);

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

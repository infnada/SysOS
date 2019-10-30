import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {OrderModule} from 'ngx-order-pipe';
import {ToastrModule} from 'ngx-toastr';

import {SysosLibUtilsModule} from '@sysos/lib-utils';
import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';
import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibScrollSpyModule} from '@sysos/lib-scroll-spy';
import {SysosLibSanitizeModule} from '@sysos/lib-sanitize';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibExtWeavescopeModule} from '@sysos/lib-ext-weavescope';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {BodyDashboardComponent} from './body/body-dashboard/body-dashboard.component';
import {MenuComponent} from './menu/menu.component';
import {SysosAppMonitorService} from './services/sysos-app-monitor.service';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    BodyNewConnectionComponent,
    BodyDashboardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderModule,
    ToastrModule.forRoot(),
    // Shared module import
    SysosLibUtilsModule,
    SysosLibAngularMaterialModule,
    SysosLibScrollSpyModule,
    SysosLibSanitizeModule,
    SysosLibExtWeavescopeModule
  ],
  exports: []
})
export class SysosAppMonitorModule {
  constructor(private serviceInjector: SysosLibServiceInjectorService,
              private Applications: SysosLibApplicationService,
              private Monitor: SysosAppMonitorService) {

    this.serviceInjector.set('SysosAppMonitorService', this.Monitor);

    Applications.registerApplication({
      id: 'monitor',
      ico: 'fas fa-chart-pie',
      name: 'Monitor',
      menu: true,
      actions: true,
      status: false,
      style: {width: '1370px', height: '700px', top: '9%', left: '9%'}
    });

    this.Monitor.initConnections();
  }
}

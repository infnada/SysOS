import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule, MatTooltipModule, MatButtonModule} from '@angular/material';

import {OrderModule} from 'ngx-order-pipe';
import {ToastrModule} from 'ngx-toastr';

import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibScrollSpyModule} from '@sysos/lib-scroll-spy';
import {SysosLibSanitizeModule} from '@sysos/lib-sanitize';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {BodyDashboardComponent} from './body/body-dashboard/body-dashboard.component';
import {MenuComponent} from './menu/menu.component';
import {NoCheckDirective} from './directives/no-check.directive';
import {SysosAppMonitorService} from './services/sysos-app-monitor.service';
import {SysosAppMonitorDashboardService} from './services/sysos-app-monitor-dashboard.service';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    BodyNewConnectionComponent,
    BodyDashboardComponent,
    MenuComponent,
    NoCheckDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatButtonModule,
    OrderModule,
    ToastrModule.forRoot(),
    SysosLibScrollSpyModule,
    SysosLibSanitizeModule
  ],
  exports: []
})
export class SysosAppMonitorModule {
  constructor(private serviceInjector: SysosLibServiceInjectorService,
              private Applications: SysosLibApplicationService,
              private Monitor: SysosAppMonitorService,
              private MonitorDashboard: SysosAppMonitorDashboardService) {

    this.serviceInjector.set('SysosAppMonitorService', this.Monitor);
    this.serviceInjector.set('SysosAppMonitorDashboardService', this.MonitorDashboard);

    Applications.registerApplication({
      id: 'monitor',
      ico: 'fas fa-chart-pie',
      name: 'Monitor',
      menu: true,
      actions: true,
      status: false,
      style: {width: '1370px', height: '700px', top: '9%', left: '9%'}
    });
  }
}

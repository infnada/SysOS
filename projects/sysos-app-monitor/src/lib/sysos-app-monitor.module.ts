import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material";

import {OrderModule} from 'ngx-order-pipe';

import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibScrollSpyModule} from '@sysos/lib-scroll-spy';
import {SysosLibSanitizeHtmlModule} from '@sysos/lib-sanitize-html';
import {SysosLibServiceInjectorService} from "@sysos/lib-service-injector";

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {BodyDashboardComponent} from './body/body-dashboard/body-dashboard.component';
import {MenuComponent} from './menu/menu.component';
import {NoCheckDirective} from './directives/no-check.directive';
import {SysosAppMonitorService} from "./services/sysos-app-monitor.service";

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    BodyNewConnectionComponent,
    MenuComponent,
    NoCheckDirective,
    BodyDashboardComponent
  ],
  imports: [
    CommonModule,
    OrderModule,
    ReactiveFormsModule,
    SysosLibScrollSpyModule,
    SysosLibSanitizeHtmlModule,
    MatSlideToggleModule
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
      ico: 'pie-chart',
      name: 'Monitor',
      menu: true,
      actions: true,
      status: false,
      style: {width: '1370px', height: '700px', top: '9%', left: '9%'}
    });
  }
}

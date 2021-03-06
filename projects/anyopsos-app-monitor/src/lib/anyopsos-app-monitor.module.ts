import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {OrderModule} from 'ngx-order-pipe';
import {ToastrModule} from 'ngx-toastr';

import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibScrollSpyModule} from '@anyopsos/lib-scroll-spy';
import {AnyOpsOSLibSanitizeModule} from '@anyopsos/lib-sanitize';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibExtWeavescopeModule} from '@anyopsos/lib-ext-weavescope';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {BodyNewConnectionComponent} from './body/body-new-connection/body-new-connection.component';
import {BodyDashboardComponent} from './body/body-dashboard/body-dashboard.component';
import {MenuComponent} from './menu/menu.component';
import {AnyOpsOSAppMonitorService} from './services/anyopsos-app-monitor.service';

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
    AnyOpsOSLibUtilsModule,
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibScrollSpyModule,
    AnyOpsOSLibSanitizeModule,
    AnyOpsOSLibExtWeavescopeModule
  ],
  exports: []
})
export class AnyOpsOSAppMonitorModule {
  constructor(private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Applications: AnyOpsOSLibApplicationService,
              private Monitor: AnyOpsOSAppMonitorService) {

    this.serviceInjector.set('AnyOpsOSAppMonitorService', this.Monitor);

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

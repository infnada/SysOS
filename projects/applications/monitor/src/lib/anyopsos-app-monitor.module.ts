import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibScrollSpyModule} from '@anyopsos/lib-scroll-spy';
import {AnyOpsOSLibPipesModule} from '@anyopsos/lib-pipes';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSExtLibWeavescopeModule} from '@anyopsos/ext-lib-weavescope';

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
    // Shared module import
    AnyOpsOSLibUtilsModule,
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibScrollSpyModule,
    AnyOpsOSLibPipesModule,
    AnyOpsOSExtLibWeavescopeModule,
    AnyOpsOSLibScrollSpyModule
  ],
  exports: []
})
export class AnyOpsOSAppMonitorModule {
  constructor(private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,
              private Monitor: AnyOpsOSAppMonitorService) {

    this.serviceInjector.set('AnyOpsOSAppMonitorService', this.Monitor);

    this.LibApplication.registerApplication({
      uuid: 'monitor',
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

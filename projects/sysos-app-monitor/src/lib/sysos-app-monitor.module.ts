import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderModule} from 'ngx-order-pipe';

import {SysosLibApplicationService} from '@sysos/lib-application';
import {SysosLibScrollSpyModule} from '@sysos/lib-scroll-spy';

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent, sanitizeHtmlPipe} from './body/body.component';
import {MenuComponent} from './menu/menu.component';
import { NoCheckDirective } from './directives/no-check.directive';


@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    MenuComponent,
    sanitizeHtmlPipe,
    NoCheckDirective
  ],
  imports: [
    CommonModule,
    OrderModule,
    SysosLibScrollSpyModule
  ],
  exports: []
})
export class SysosAppMonitorModule {
  constructor(private Applications: SysosLibApplicationService) {
    Applications.registerApplication({
      id: 'monitor',
      ico: 'pie-chart',
      name: 'Monitor',
      menu: true,
      actions: false,
      status: false,
      style: {width: '1370px', height: '700px', top: '9%', left: '9%'}
    });
  }
}

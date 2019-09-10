import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderModule} from 'ngx-order-pipe';

import {SysosLibApplicationService} from "@sysos/lib-application";

import {ActionsComponent} from './actions/actions.component';
import {BodyComponent, sanitizeHtmlPipe} from './body/body.component';
import {MenuComponent} from './menu/menu.component';


@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    MenuComponent,
    sanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    OrderModule
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
      style: {width: '770px', height: '600px', top: '9%', left: '12%'}
    });
  }
}

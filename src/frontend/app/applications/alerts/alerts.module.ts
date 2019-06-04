import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationsService} from '../../services/applications.service';
import {AlertsComponent} from './alerts.component';
import {AlertsBodyComponent} from './alerts-body/alerts-body.component';
import {AlertsMenuComponent} from './alerts-menu/alerts-menu.component';

@NgModule({
  declarations: [
    AlertsComponent,
    AlertsBodyComponent,
    AlertsMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AlertsModule implements OnInit {

  constructor(private Applications: ApplicationsService) {
    Applications.registerApplication({
      id: 'alerts',
      ico: 'bullhorn',
      name: 'Alerts',
      menu: true,
      actions: false,
      style: {width: '1700px', height: '750px', top: '8%', left: '7%'}
    });
  }

  ngOnInit() {
  }
}

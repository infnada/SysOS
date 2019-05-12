import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationsService} from "../../services/applications.service";
import {InfrastructureManagerComponent} from './infrastructure-manager.component';
import { InfrastructureManagerActionsComponent } from './infrastructure-manager-actions/infrastructure-manager-actions.component';
import { InfrastructureManagerBodyComponent } from './infrastructure-manager-body/infrastructure-manager-body.component';
import { InfrastructureManagerMenuComponent } from './infrastructure-manager-menu/infrastructure-manager-menu.component';
import { InfrastructureManagerStatusComponent } from './infrastructure-manager-status/infrastructure-manager-status.component';

@NgModule({
  declarations: [InfrastructureManagerComponent, InfrastructureManagerActionsComponent, InfrastructureManagerBodyComponent, InfrastructureManagerMenuComponent, InfrastructureManagerStatusComponent],
  imports: [
    CommonModule
  ]
})
export class InfrastructureManagerModule implements OnInit {

  constructor(private ApplicationsService: ApplicationsService) {
    ApplicationsService.registerApplication({
      id: 'infrastructure-manager',
      ico: 'server',
      name: 'Infrastructure Manager',
      menu: true,
      actions: true,
      status: true,
      style: {width:"1700px",height:"750px",top:"8%",left:"7%"}
    });
  }

  ngOnInit() {

  }
}

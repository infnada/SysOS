import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationsService} from "../../services/applications.service";
import {BackupsManagerComponent} from './backups-manager.component';
import { BackupsManagerActionsComponent } from './backups-manager-actions/backups-manager-actions.component';
import { BackupsManagerBodyComponent } from './backups-manager-body/backups-manager-body.component';
import { BackupsManagerMenuComponent } from './backups-manager-menu/backups-manager-menu.component';

@NgModule({
  declarations: [BackupsManagerComponent, BackupsManagerActionsComponent, BackupsManagerBodyComponent, BackupsManagerMenuComponent],
  imports: [
    CommonModule
  ]
})
export class BackupsManagerModule implements OnInit {

  constructor(private ApplicationsService: ApplicationsService) {
    ApplicationsService.registerApplication({
      id: 'backups-manager',
      ico: 'hdd-o',
      name: 'Backups Manager',
      menu: true,
      actions: true,
      style: {width:"1070px",height:"700px",top:"5%",left:"20%"}
    });
  }

  ngOnInit() {

  }
}

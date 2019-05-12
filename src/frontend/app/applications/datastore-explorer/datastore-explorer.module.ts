import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationsService} from "../../services/applications.service";
import {DatastoreExplorerComponent} from './datastore-explorer.component';
import { DatastoreExplorerBodyComponent } from './datastore-explorer-body/datastore-explorer-body.component';
import { DatastoreExplorerActionsComponent } from './datastore-explorer-actions/datastore-explorer-actions.component';
import { DatastoreExplorerMenuComponent } from './datastore-explorer-menu/datastore-explorer-menu.component';

@NgModule({
  declarations: [DatastoreExplorerComponent, DatastoreExplorerBodyComponent, DatastoreExplorerActionsComponent, DatastoreExplorerMenuComponent],
  imports: [
    CommonModule
  ]
})
export class DatastoreExplorerModule implements OnInit {

  constructor(private ApplicationsService: ApplicationsService) {
    ApplicationsService.registerApplication({
      id: 'datastore-explorer',
      ico: 'database',
      name: 'Datastore Explorer',
      menu: true,
      actions: false,
      status: false,
      style: {width:"770px",height:"600px",top:"5%",left:"15%"}
    });
  }

  ngOnInit() {

  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatMenuModule, MatButtonModule, MatSlideToggleModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {FilterPipeModule} from 'ngx-filter-pipe';

import {ApplicationsService} from '../../services/applications.service';
import {DatastoreExplorerActionsComponent} from './datastore-explorer-actions/datastore-explorer-actions.component';
import {DatastoreExplorerBodyComponent} from './datastore-explorer-body/datastore-explorer-body.component';
import {DatastoreExplorerMenuComponent} from './datastore-explorer-menu/datastore-explorer-menu.component';
import {DatastoreExplorerStatusComponent} from './datastore-explorer-status/datastore-explorer-status.component';
import {DatastoreExplorerActionsLocalComponent} from './datastore-explorer-actions/datastore-explorer-actions-local/datastore-explorer-actions-local.component';
import {DatastoreExplorerActionsServerComponent} from './datastore-explorer-actions/datastore-explorer-actions-server/datastore-explorer-actions-server.component';
import {DatastoreExplorerBodyLocalComponent} from './datastore-explorer-body/datastore-explorer-body-local/datastore-explorer-body-local.component';
import {DatastoreExplorerBodyServerComponent} from './datastore-explorer-body/datastore-explorer-body-server/datastore-explorer-body-server.component';
import {DatastoreExplorerBodyExchangeComponent} from './datastore-explorer-body/datastore-explorer-body-exchange/datastore-explorer-body-exchange.component';
import {DatastoreExplorerBodyNewConnectionComponent} from './datastore-explorer-body/datastore-explorer-body-new-connection/datastore-explorer-body-new-connection.component';

import {ngfModule} from 'angular-file';
import {FileModule} from '../../shared-modules/file/file.module';

@NgModule({
  declarations: [
    DatastoreExplorerActionsComponent,
    DatastoreExplorerBodyComponent,
    DatastoreExplorerMenuComponent,
    DatastoreExplorerStatusComponent,
    DatastoreExplorerActionsLocalComponent,
    DatastoreExplorerActionsServerComponent,
    DatastoreExplorerBodyLocalComponent,
    DatastoreExplorerBodyServerComponent,
    DatastoreExplorerBodyExchangeComponent,
    DatastoreExplorerBodyNewConnectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    DragDropModule,
    ngfModule,
    // Shared module import
    FileModule
  ]
})
export class DatastoreExplorerModule {

  constructor(private Applications: ApplicationsService) {
    Applications.registerApplication({
      id: 'datastore-explorer',
      ico: 'database',
      name: 'Datastore Explorer',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1275px', height: '600px', top: '5%', left: '15%'}
    });
  }
}

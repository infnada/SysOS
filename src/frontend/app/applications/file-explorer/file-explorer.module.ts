import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatMenuModule, MatDividerModule} from '@angular/material';

import {FilterPipeModule} from 'ngx-filter-pipe';

import {ApplicationsService} from "../../services/applications.service";

import {FileExplorerComponent} from './file-explorer.component';
import {FileExplorerBodyComponent} from './file-explorer-body/file-explorer-body.component';
import {FileExplorerActionsComponent} from './file-explorer-actions/file-explorer-actions.component';
import {FileExplorerMenuComponent} from './file-explorer-menu/file-explorer-menu.component';

import {FileModule} from '../../shared-modules/file/file.module';
import {FileExplorerBodyActionsComponent} from './file-explorer-body-actions/file-explorer-body-actions.component'

@NgModule({
  declarations: [
    FileExplorerComponent,
    FileExplorerBodyComponent,
    FileExplorerActionsComponent,
    FileExplorerMenuComponent,
    FileExplorerBodyActionsComponent
  ],
  imports: [
    CommonModule,
    FilterPipeModule,
    MatMenuModule,
    MatDividerModule,
    // Shared module import
    FileModule
  ],
  entryComponents: [
    FileExplorerComponent,
  ],
})
export class FileExplorerModule implements OnInit {

  constructor(private ApplicationsService: ApplicationsService) {

    ApplicationsService.registerApplication({
      id: 'file-explorer',
      ico: 'folder',
      name: 'File Explorer',
      menu: true,
      actions: false,
      status: false,
      style: {width: "770px", height: "600px", top: "9%", left: "12%"}
    });

  }

  ngOnInit() {
  }
}

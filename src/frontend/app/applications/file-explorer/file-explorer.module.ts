import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatMenuModule, MatDividerModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {FilterPipeModule} from 'ngx-filter-pipe';
import {ngfModule} from "angular-file"

import {ApplicationsService} from "../../services/applications.service";

import {FileExplorerBodyComponent} from './file-explorer-body/file-explorer-body.component';
import {FileExplorerMenuComponent} from './file-explorer-menu/file-explorer-menu.component';

import {FileModule} from '../../shared-modules/file/file.module';
import {FileExplorerBodyActionsComponent} from './file-explorer-body-actions/file-explorer-body-actions.component'

@NgModule({
  declarations: [
    FileExplorerBodyComponent,
    FileExplorerMenuComponent,
    FileExplorerBodyActionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilterPipeModule,
    MatMenuModule,
    MatDividerModule,
    DragDropModule,
    ngfModule,
    // Shared module import
    FileModule
  ]
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

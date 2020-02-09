import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibFolderModule} from '@anyopsos/lib-folder';

import {FolderExplorerMainComponent} from './components/main.component';
import {FolderExplorerBodyComponent} from './components/body/body.component';
import {FolderExplorerActionsComponent} from './components/actions/actions.component';

@NgModule({
  declarations: [
    FolderExplorerBodyComponent,
    FolderExplorerActionsComponent,
    FolderExplorerMainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibFolderModule
  ],
  exports: [
    FolderExplorerMainComponent
  ]
})

export class AnyOpsOSLibFolderExplorerModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalMonitorImportComponent} from './anyopsos-modal-monitor-import.component';

@NgModule({
  declarations: [
    AnyOpsOSModalMonitorImportComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalMonitorImportComponent
  ]
})
export class AnyOpsOSModalMonitorImportModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'monitor-import',
      size: 'lg'
    });

  }

}

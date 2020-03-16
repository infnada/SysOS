import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalMonitorExportComponent} from './anyopsos-modal-monitor-export.component';

@NgModule({
  declarations: [
    AnyOpsOSModalMonitorExportComponent,
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
    AnyOpsOSModalMonitorExportComponent
  ]
})
export class AnyOpsOSModalMonitorExportModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'monitor-export',
      size: 'lg'
    });

  }

}

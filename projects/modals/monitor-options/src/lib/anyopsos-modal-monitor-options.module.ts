import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalMonitorOptionsComponent} from './anyopsos-modal-monitor-options.component';

@NgModule({
  declarations: [
    AnyOpsOSModalMonitorOptionsComponent,
    EntryComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        // Shared module import
        AnyOpsOSLibAngularMaterialModule,
        AnyOpsOSLibModalModule,
    ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalMonitorOptionsComponent
  ]
})
export class AnyOpsOSModalMonitorOptionsModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'monitor-options',
      size: 'lg'
    });

  }

}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalMonitorHelpComponent} from './anyopsos-modal-monitor-help.component';
import {EntryComponent} from './monitor-export-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalMonitorHelpComponent,
    EntryComponent
  ],
  imports: [
    NgbModalModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    AnyOpsOSModalMonitorHelpComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalMonitorHelpModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-help',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent} from './anyopsos-modal-infrastructure-manager-import-distributed-switch.component';
import {EntryComponent} from './infrastructure-manager-import-distributed-switch-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent,
    EntryComponent
  ],
  imports: [
    NgbModalModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerImportDistributedSwitchModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-import-distributed-switch',
      size: 'lg'
    });

  }
}

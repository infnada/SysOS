import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent} from './anyopsos-modal-infrastructure-manager-new-distributed-switch.component';
import {EntryComponent} from './infrastructure-manager-new-distributed-switch-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent,
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
    AnyOpsOSModalInfrastructureManagerNewDistributedSwitchComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerNewDistributedSwitchModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-distributed-switch',
      size: 'lg'
    });

  }
}

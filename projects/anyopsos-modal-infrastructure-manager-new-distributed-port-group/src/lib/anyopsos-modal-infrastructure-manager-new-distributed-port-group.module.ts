import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent} from './anyopsos-modal-infrastructure-manager-new-distributed-port-group.component';
import {EntryComponent} from './infrastructure-manager-new-distributed-port-group-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent,
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
    AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerNewDistributedPortGroupModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-distributed-port-group',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerNewDatacenterComponent} from './anyopsos-modal-infrastructure-manager-new-datacenter.component';
import {EntryComponent} from './infrastructure-manager-new-datacenter-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerNewDatacenterComponent,
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
    AnyOpsOSModalInfrastructureManagerNewDatacenterComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerNewDatacenterModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-datacenter',
      size: 'lg'
    });

  }
}

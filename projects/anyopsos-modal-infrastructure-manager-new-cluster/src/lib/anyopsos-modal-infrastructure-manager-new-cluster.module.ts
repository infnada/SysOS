import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerNewClusterComponent} from './anyopsos-modal-infrastructure-manager-new-cluster.component';
import {EntryComponent} from './infrastructure-manager-new-cluster-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerNewClusterComponent,
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
    AnyOpsOSModalInfrastructureManagerNewClusterComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerNewClusterModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-cluster',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent} from './anyopsos-modal-infrastructure-manager-new-datastore-cluster.component';
import {EntryComponent} from './infrastructure-manager-new-datastore-cluster-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent,
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
    AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerNewDatastoreClusterModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-datastore-cluster',
      size: 'lg'
    });

  }
}

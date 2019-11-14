import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerNewDatastoreComponent} from './anyopsos-modal-infrastructure-manager-new-datastore.component';
import {EntryComponent} from './infrastructure-manager-new-datastore-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerNewDatastoreComponent,
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
    AnyOpsOSModalInfrastructureManagerNewDatastoreComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerNewDatastoreModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-datastore',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerRescanStorageComponent} from './anyopsos-modal-infrastructure-manager-rescan-storage.component';
import {EntryComponent} from './infrastructure-manager-rescan-storage-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerRescanStorageComponent,
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
    AnyOpsOSModalInfrastructureManagerRescanStorageComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerRescanStorageModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-rescan-storage',
      size: 'lg'
    });

  }
}

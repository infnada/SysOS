import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerRemoveTagComponent} from './anyopsos-modal-infrastructure-manager-remove-tag.component';
import {EntryComponent} from './infrastructure-manager-remove-tag-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerRemoveTagComponent,
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
    AnyOpsOSModalInfrastructureManagerRemoveTagComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerRemoveTagModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-remove-tag',
      size: 'lg'
    });

  }
}

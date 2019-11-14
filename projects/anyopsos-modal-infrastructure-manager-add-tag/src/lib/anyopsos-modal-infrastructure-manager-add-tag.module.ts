import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerAddTagComponent} from './anyopsos-modal-infrastructure-manager-add-tag.component';
import {EntryComponent} from './infrastructure-manager-add-tag-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerAddTagComponent,
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
    AnyOpsOSModalInfrastructureManagerAddTagComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerAddTagModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-add-tag',
      size: 'lg'
    });

  }
}

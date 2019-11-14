import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerAssignTagComponent} from './anyopsos-modal-infrastructure-manager-assign-tag.component';
import {EntryComponent} from './infrastructure-manager-assign-tag-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerAssignTagComponent,
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
    AnyOpsOSModalInfrastructureManagerAssignTagComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerAssignTagModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-assign-tag',
      size: 'lg'
    });

  }
}

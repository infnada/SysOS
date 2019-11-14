import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent} from './anyopsos-modal-infrastructure-manager-edit-default-vm-compatibility.component';
import {EntryComponent} from './infrastructure-manager-edit-default-vm-compatibility-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent,
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
    AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerEditDefaultVmCompatibilityModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-edit-default-vm-compatibility',
      size: 'lg'
    });

  }
}

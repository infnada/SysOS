import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent} from './anyopsos-modal-infrastructure-manager-edit-custom-attributes.component';
import {EntryComponent} from './infrastructure-manager-edit-custom-attributes-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent,
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
    AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerEditCustomAttributesModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-edit-custom-attributes',
      size: 'lg'
    });

  }
}

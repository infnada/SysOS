import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerAssignLicenseComponent} from './anyopsos-modal-infrastructure-manager-assign-license.component';
import {EntryComponent} from './infrastructure-manager-assign-license-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerAssignLicenseComponent,
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
    AnyOpsOSModalInfrastructureManagerAssignLicenseComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerAssignLicenseModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-assign-license',
      size: 'lg'
    });

  }
}

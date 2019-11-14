import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent} from './anyopsos-modal-infrastructure-manager-remediation-pre-check.component';
import {EntryComponent} from './infrastructure-manager-remediation-pre-check-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent,
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
    AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerRemediationPreCheckModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-remediation-pre-check',
      size: 'lg'
    });

  }
}

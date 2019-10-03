import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerRemediationPreCheckComponent} from './sysos-modal-infrastructure-manager-remediation-pre-check.component';
import {EntryComponent} from './infrastructure-manager-remediation-pre-check-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerRemediationPreCheckComponent,
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
    SysosModalInfrastructureManagerRemediationPreCheckComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerRemediationPreCheckModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-remediation-pre-check',
      size: 'lg'
    });

  }
}

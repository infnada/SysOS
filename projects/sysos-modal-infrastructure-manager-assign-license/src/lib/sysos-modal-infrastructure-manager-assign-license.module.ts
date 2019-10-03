import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerAssignLicenseComponent} from './sysos-modal-infrastructure-manager-assign-license.component';
import {EntryComponent} from './infrastructure-manager-assign-license-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerAssignLicenseComponent,
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
    SysosModalInfrastructureManagerAssignLicenseComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerAssignLicenseModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-assign-license',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent} from './sysos-modal-infrastructure-manager-edit-default-vm-compatibility.component';
import {EntryComponent} from './infrastructure-manager-edit-default-vm-compatibility-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerEditDefaultVmCompatibilityComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerEditDefaultVmCompatibilityModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-edit-default-vm-compatibility',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent} from './anyopsos-modal-infrastructure-manager-new-virtual-machine.component';
import {EntryComponent} from './infrastructure-manager-new-virtual-machine-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent,
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
    AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerNewVirtualMachineModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-virtual-machine',
      size: 'lg'
    });

  }
}

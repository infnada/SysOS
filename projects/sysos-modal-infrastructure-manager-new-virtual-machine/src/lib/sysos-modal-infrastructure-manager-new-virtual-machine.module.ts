import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerNewVirtualMachineComponent} from './sysos-modal-infrastructure-manager-new-virtual-machine.component';
import {EntryComponent} from './infrastructure-manager-new-virtual-machine-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerNewVirtualMachineComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerNewVirtualMachineComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerNewVirtualMachineModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-virtual-machine',
      size: 'lg'
    });

  }
}

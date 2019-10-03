import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerNewDistributedSwitchComponent} from './sysos-modal-infrastructure-manager-new-distributed-switch.component';
import {EntryComponent} from './infrastructure-manager-new-distributed-switch-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerNewDistributedSwitchComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerNewDistributedSwitchComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerNewDistributedSwitchModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-distributed-switch',
      size: 'lg'
    });

  }
}

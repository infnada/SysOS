import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerImportDistributedSwitchComponent} from './sysos-modal-infrastructure-manager-import-distributed-switch.component';
import {EntryComponent} from './infrastructure-manager-import-distributed-switch-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerImportDistributedSwitchComponent,
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
    SysosModalInfrastructureManagerImportDistributedSwitchComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerImportDistributedSwitchModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-import-distributed-switch',
      size: 'lg'
    });

  }
}

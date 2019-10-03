import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerNewDatacenterComponent} from './sysos-modal-infrastructure-manager-new-datacenter.component';
import {EntryComponent} from './infrastructure-manager-new-datacenter-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerNewDatacenterComponent,
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
    SysosModalInfrastructureManagerNewDatacenterComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerNewDatacenterModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-datacenter',
      size: 'lg'
    });

  }
}

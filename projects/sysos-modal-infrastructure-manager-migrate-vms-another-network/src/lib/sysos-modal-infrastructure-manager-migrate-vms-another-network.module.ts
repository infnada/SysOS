import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent} from './sysos-modal-infrastructure-manager-migrate-vms-another-network.component';
import {EntryComponent} from './infrastructure-manager-migrate-vms-another-network-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent,
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
    SysosModalInfrastructureManagerMigrateVmsAnotherNetworkComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerMigrateVmsAnotherNetworkModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-migrate-vms-another-network',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent} from './anyopsos-modal-infrastructure-manager-migrate-vms-another-network.component';
import {EntryComponent} from './infrastructure-manager-migrate-vms-another-network-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent,
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
    AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerMigrateVmsAnotherNetworkModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-migrate-vms-another-network',
      size: 'lg'
    });

  }
}

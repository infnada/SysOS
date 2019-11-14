import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerAddPermissionComponent} from './anyopsos-modal-infrastructure-manager-add-permission.component';
import {EntryComponent} from './infrastructure-manager-add-permission-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerAddPermissionComponent,
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
    AnyOpsOSModalInfrastructureManagerAddPermissionComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerAddPermissionModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-add-permission',
      size: 'lg'
    });

  }
}

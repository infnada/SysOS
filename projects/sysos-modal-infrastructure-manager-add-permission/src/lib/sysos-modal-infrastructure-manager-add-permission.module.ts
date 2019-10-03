import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerAddPermissionComponent} from './sysos-modal-infrastructure-manager-add-permission.component';
import {EntryComponent} from './infrastructure-manager-add-permission-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerAddPermissionComponent,
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
    SysosModalInfrastructureManagerAddPermissionComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerAddPermissionModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-add-permission',
      size: 'lg'
    });

  }
}

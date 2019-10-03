import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerNewDistributedPortGroupComponent} from './sysos-modal-infrastructure-manager-new-distributed-port-group.component';
import {EntryComponent} from './infrastructure-manager-new-distributed-port-group-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerNewDistributedPortGroupComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerNewDistributedPortGroupComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerNewDistributedPortGroupModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-distributed-port-group',
      size: 'lg'
    });

  }
}

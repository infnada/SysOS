import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerNewClusterComponent} from './sysos-modal-infrastructure-manager-new-cluster.component';
import {EntryComponent} from './infrastructure-manager-new-cluster-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerNewClusterComponent,
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
    SysosModalInfrastructureManagerNewClusterComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerNewClusterModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-cluster',
      size: 'lg'
    });

  }
}

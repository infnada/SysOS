import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerNewDatastoreClusterComponent} from './sysos-modal-infrastructure-manager-new-datastore-cluster.component';
import {EntryComponent} from './infrastructure-manager-new-datastore-cluster-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerNewDatastoreClusterComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerNewDatastoreClusterComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerNewDatastoreClusterModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-datastore-cluster',
      size: 'lg'
    });

  }
}

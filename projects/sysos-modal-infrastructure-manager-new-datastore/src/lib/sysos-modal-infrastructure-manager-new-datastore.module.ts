import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerNewDatastoreComponent} from './sysos-modal-infrastructure-manager-new-datastore.component';
import {EntryComponent} from './infrastructure-manager-new-datastore-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerNewDatastoreComponent,
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
    SysosModalInfrastructureManagerNewDatastoreComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerNewDatastoreModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-datastore',
      size: 'lg'
    });

  }
}

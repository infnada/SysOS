import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerRescanStorageComponent} from './sysos-modal-infrastructure-manager-rescan-storage.component';
import {EntryComponent} from './infrastructure-manager-rescan-storage-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerRescanStorageComponent,
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
    SysosModalInfrastructureManagerRescanStorageComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerRescanStorageModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-rescan-storage',
      size: 'lg'
    });

  }
}

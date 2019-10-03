import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerRemoveTagComponent} from './sysos-modal-infrastructure-manager-remove-tag.component';
import {EntryComponent} from './infrastructure-manager-remove-tag-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerRemoveTagComponent,
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
    SysosModalInfrastructureManagerRemoveTagComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerRemoveTagModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-remove-tag',
      size: 'lg'
    });

  }
}

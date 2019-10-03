import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerRemoveTagComponent} from './sysos-modal-infrastructure-manager-remove-tag.component';
import {EntryComponent} from './infrastructure-manager-remove-tag-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerRemoveTagComponent,
    EntryComponent
  ],
  imports: [],
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

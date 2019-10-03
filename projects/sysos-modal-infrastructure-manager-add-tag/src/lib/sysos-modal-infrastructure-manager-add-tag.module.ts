import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerAddTagComponent} from './sysos-modal-infrastructure-manager-add-tag.component';
import {EntryComponent} from './infrastructure-manager-add-tag-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerAddTagComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerAddTagComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerAddTagModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-add-tag',
      size: 'lg'
    });

  }
}

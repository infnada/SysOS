import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerAssignTagComponent} from './sysos-modal-infrastructure-manager-assign-tag.component';
import {EntryComponent} from './infrastructure-manager-assign-tag-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerAssignTagComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerAssignTagComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerAssignTagModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-assign-tag',
      size: 'lg'
    });

  }
}

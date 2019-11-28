import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalDefaultPlainComponent} from './anyopsos-modal-default-plain.component';
import {EntryComponent} from './default-plain-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalDefaultPlainComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalDefaultPlainComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalDefaultPlainModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'plain',
      size: 'sm'
    });

  }

}

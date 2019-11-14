import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalPlainComponent} from './anyopsos-modal-plain.component';
import {EntryComponent} from './plain-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalPlainComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalPlainComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalPlainModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'plain',
      size: 'sm'
    });

  }

}

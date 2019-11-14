import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

import {AnyOpsOSModalQuestionComponent} from './anyopsos-modal-question.component';
import {EntryComponent} from './question-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalQuestionComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalQuestionComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalQuestionModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'question',
      size: 'sm'
    });

  }
}

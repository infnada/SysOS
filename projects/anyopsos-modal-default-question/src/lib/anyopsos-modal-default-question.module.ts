import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {AnyOpsOSModalDefaultQuestionComponent} from './anyopsos-modal-default-question.component';
import {EntryComponent} from './default-question-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalDefaultQuestionComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibUtilsModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalDefaultQuestionComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalDefaultQuestionModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'question',
      size: 'sm'
    });

  }
}

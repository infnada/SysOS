import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalQuestionComponent} from './sysos-modal-question.component';
import {EntryComponent} from './question-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalQuestionComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    SysosModalQuestionComponent,
    EntryComponent
  ]
})
export class SysosModalQuestionModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'question',
      size: 'sm'
    });

  }
}

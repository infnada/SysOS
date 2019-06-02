import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {QuestionEntryComponent} from './question-entry/question-entry.component';
import {QuestionComponent} from './question.component';
import {ModalService} from '../../services/modal.service';

@NgModule({
  declarations: [QuestionEntryComponent, QuestionComponent],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  providers: [NgbActiveModal],
  entryComponents: [QuestionEntryComponent, QuestionComponent]
})
export class QuestionModule {

  constructor(private ModalService: ModalService) {

    ModalService.registerModal({
      modalId: 'question',
      size: 'sm'
    });

  }

}

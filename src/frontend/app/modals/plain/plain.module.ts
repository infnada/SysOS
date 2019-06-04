import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {PlainEntryComponent} from './plain-entry/plain-entry.component';
import {PlainComponent} from './plain.component';
import {ModalService} from '../../services/modal.service';

@NgModule({
  declarations: [PlainEntryComponent, PlainComponent],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  providers: [NgbActiveModal],
  entryComponents: [PlainEntryComponent, PlainComponent]
})
export class PlainModule {

  constructor(private Modal: ModalService) {

    Modal.registerModal({
      modalId: 'plain',
      size: 'sm'
    });

  }

}

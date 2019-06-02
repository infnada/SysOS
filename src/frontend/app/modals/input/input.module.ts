import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {InputEntryComponent} from './input-entry/input-entry.component';
import {InputComponent} from './input.component';
import {ModalService} from '../../services/modal.service';

@NgModule({
  declarations: [InputEntryComponent, InputComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule
  ],
  providers: [NgbActiveModal],
  entryComponents: [InputEntryComponent, InputComponent]
})
export class InputModule {

  constructor(private ModalService: ModalService) {

    ModalService.registerModal({
      modalId: 'input',
      size: 'sm'
    });

  }

}

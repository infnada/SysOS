import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInputComponent} from './sysos-modal-input.component';
import {EntryComponent} from './input-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInputComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    SysosModalInputComponent,
    EntryComponent
  ]
})
export class SysosModalInputModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'input',
      size: 'sm'
    });

  }

}

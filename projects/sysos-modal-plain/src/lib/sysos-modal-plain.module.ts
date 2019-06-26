import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalPlainComponent} from './sysos-modal-plain.component';
import {EntryComponent} from './plain-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalPlainComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    SysosModalPlainComponent,
    EntryComponent
  ]
})
export class SysosModalPlainModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'plain',
      size: 'sm'
    });

  }

}

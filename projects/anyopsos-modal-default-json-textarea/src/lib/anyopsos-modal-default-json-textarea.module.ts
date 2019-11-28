import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {AnyOpsOSModalDefaultJsonTextareaComponent} from './anyopsos-modal-default-json-textarea.component';
import {EntryComponent} from './default-json-textarea-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalDefaultJsonTextareaComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibUtilsModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalDefaultJsonTextareaComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalDefaultJsonTextareaModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'json-textarea',
      size: 'lg'
    });

  }
}

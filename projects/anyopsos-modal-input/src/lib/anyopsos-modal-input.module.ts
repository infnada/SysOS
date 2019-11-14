import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

import {AnyOpsOSModalInputComponent} from './anyopsos-modal-input.component';
import {EntryComponent} from './input-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInputComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule,
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalInputComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInputModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'input',
      size: 'sm'
    });

  }

}

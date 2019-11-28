import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

import {AnyOpsOSModalDefaultInputComponent} from './anyopsos-modal-default-input.component';
import {EntryComponent} from './default-input-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalDefaultInputComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalDefaultInputComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalDefaultInputModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'input',
      size: 'sm'
    });

  }

}

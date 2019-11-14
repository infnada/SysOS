import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {EntryComponent} from './recovery-wizard-entry/entry.component';
import {AnyOpsOSModalRecoveryWizardComponent} from './anyopsos-modal-recovery-wizard.component';

@NgModule({
  declarations: [
    AnyOpsOSModalRecoveryWizardComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [],
  providers: [
    NgbActiveModal
  ],
  entryComponents: [
    AnyOpsOSModalRecoveryWizardComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalRecoveryWizardModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'recovery-wizard',
      size: 'lg'
    });

  }

}

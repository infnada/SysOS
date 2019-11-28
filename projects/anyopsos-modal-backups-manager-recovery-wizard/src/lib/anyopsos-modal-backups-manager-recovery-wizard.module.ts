import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {EntryComponent} from './backups-manager-recovery-wizard-entry/entry.component';
import {AnyOpsOSModalBackupsManagerRecoveryWizardComponent} from './anyopsos-modal-backups-manager-recovery-wizard.component';

@NgModule({
  declarations: [
    AnyOpsOSModalBackupsManagerRecoveryWizardComponent,
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
    AnyOpsOSModalBackupsManagerRecoveryWizardComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalBackupsManagerRecoveryWizardModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'backups-manager-recovery-wizard',
      size: 'lg'
    });

  }

}

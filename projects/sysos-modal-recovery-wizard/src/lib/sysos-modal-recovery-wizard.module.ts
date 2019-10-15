import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';
import {SysosLibModalService} from '@sysos/lib-modal';

import {EntryComponent} from './recovery-wizard-entry/entry.component';
import {SysosModalRecoveryWizardComponent} from './sysos-modal-recovery-wizard.component';

@NgModule({
  declarations: [
    SysosModalRecoveryWizardComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    // Shared module import
    SysosLibAngularMaterialModule
  ],
  exports: [],
  providers: [
    NgbActiveModal
  ],
  entryComponents: [
    SysosModalRecoveryWizardComponent,
    EntryComponent
  ]
})
export class SysosModalRecoveryWizardModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'recovery-wizard',
      size: 'lg'
    });

  }

}

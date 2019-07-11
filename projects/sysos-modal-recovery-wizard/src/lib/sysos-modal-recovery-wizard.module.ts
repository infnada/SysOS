import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule, MatButtonModule, MatRadioModule, MatSelectModule, MatDividerModule, MatInputModule, MatSlideToggleModule} from '@angular/material';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

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
    MatButtonModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    MatInputModule,
    MatSlideToggleModule
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

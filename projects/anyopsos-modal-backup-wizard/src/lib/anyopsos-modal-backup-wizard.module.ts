import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalBackupWizardComponent} from './anyopsos-modal-backup-wizard.component';
import {EntryComponent} from './backup-wizard-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalBackupWizardComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
  ],
  exports: [],
  providers: [
    NgbActiveModal
  ],
  entryComponents: [
    AnyOpsOSModalBackupWizardComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalBackupWizardModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'backup-wizard',
      size: 'sm'
    });

  }

}

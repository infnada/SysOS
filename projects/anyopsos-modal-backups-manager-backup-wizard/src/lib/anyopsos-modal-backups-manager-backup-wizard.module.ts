import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalBackupsManagerBackupWizardComponent} from './anyopsos-modal-backups-manager-backup-wizard.component';
import {EntryComponent} from './backups-manager-backup-wizard-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalBackupsManagerBackupWizardComponent,
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
    AnyOpsOSModalBackupsManagerBackupWizardComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalBackupsManagerBackupWizardModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'backups-manager-backup-wizard',
      size: 'sm'
    });

  }

}

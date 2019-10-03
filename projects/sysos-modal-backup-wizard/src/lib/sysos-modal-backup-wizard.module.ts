import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalBackupWizardComponent} from './sysos-modal-backup-wizard.component';
import {EntryComponent} from './backup-wizard-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalBackupWizardComponent,
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
    SysosModalBackupWizardComponent,
    EntryComponent
  ]
})
export class SysosModalBackupWizardModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'backup-wizard',
      size: 'sm'
    });

  }

}

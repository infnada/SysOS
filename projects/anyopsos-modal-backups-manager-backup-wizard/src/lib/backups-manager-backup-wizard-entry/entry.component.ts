import {Component, Input, Output} from '@angular/core';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSModalBackupsManagerBackupWizardComponent} from '../anyopsos-modal-backups-manager-backup-wizard.component';

@Component({
  template: ''
})
export class EntryComponent {
  @Input() size: 'sm' | 'lg';
  @Input() selector: string;
  @Output() OutputNgbModalRef: NgbModalRef;

  constructor(private ngbModal: NgbModal) {
    setTimeout(() => {
      this.launchModal();
    }, 0);
  }

  launchModal(): void {
    this.OutputNgbModalRef = this.ngbModal.open(
      AnyOpsOSModalBackupsManagerBackupWizardComponent,
      {
        centered: true,
        backdrop: 'static',
        backdropClass: 'absolute',
        windowClass: 'absolute',
        size: this.size,
        container: this.selector
      }
    );
  }
}

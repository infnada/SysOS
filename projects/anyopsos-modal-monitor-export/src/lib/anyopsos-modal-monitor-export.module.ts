import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalMonitorExportComponent} from './anyopsos-modal-monitor-export.component';
import {EntryComponent} from './monitor-export-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalMonitorExportComponent,
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
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    AnyOpsOSModalMonitorExportComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalMonitorExportModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-export',
      size: 'lg'
    });

  }
}

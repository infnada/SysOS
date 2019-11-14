import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalMonitorImportComponent} from './anyopsos-modal-monitor-import.component';
import {EntryComponent} from './monitor-import-entry/entry.component';


@NgModule({
  declarations: [
    AnyOpsOSModalMonitorImportComponent,
    EntryComponent
  ],
  imports: [
    NgbModalModule,
    CommonModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    AnyOpsOSModalMonitorImportComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalMonitorImportModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-import',
      size: 'lg'
    });

  }
}

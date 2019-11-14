import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent} from './anyopsos-modal-infrastructure-manager-export-system-logs.component';
import {EntryComponent} from './infrastructure-manager-export-system-logs-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent,
    EntryComponent
  ],
  imports: [
    NgbModalModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerExportSystemLogsModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-export-system-logs',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerExportSystemLogsComponent} from './sysos-modal-infrastructure-manager-export-system-logs.component';
import {EntryComponent} from './infrastructure-manager-export-system-logs-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerExportSystemLogsComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerExportSystemLogsComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerExportSystemLogsModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-export-system-logs',
      size: 'lg'
    });

  }
}

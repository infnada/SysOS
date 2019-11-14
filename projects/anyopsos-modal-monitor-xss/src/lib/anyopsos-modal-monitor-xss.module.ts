import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalMonitorXssComponent} from './anyopsos-modal-monitor-xss.component';
import {EntryComponent} from './monitor-export-entry/entry.component';
@NgModule({
  declarations: [
    AnyOpsOSModalMonitorXssComponent,
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
    AnyOpsOSModalMonitorXssComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalMonitorXssModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-xss',
      size: 'lg'
    });

  }
}

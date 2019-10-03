import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalMonitorXssComponent} from './sysos-modal-monitor-xss.component';
import {EntryComponent} from './monitor-export-entry/entry.component';
@NgModule({
  declarations: [
    SysosModalMonitorXssComponent,
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
    SysosModalMonitorXssComponent,
    EntryComponent
  ]
})
export class SysosModalMonitorXssModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-xss',
      size: 'lg'
    });

  }
}

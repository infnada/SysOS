import {NgModule} from '@angular/core';
import {MatTabsModule} from "@angular/material";

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalMonitorHelpComponent} from './sysos-modal-monitor-help.component';
import {EntryComponent} from "./monitor-export-entry/entry.component";

@NgModule({
  declarations: [
    SysosModalMonitorHelpComponent,
    EntryComponent
  ],
  imports: [
    NgbModalModule,
    MatTabsModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalMonitorHelpComponent,
    EntryComponent
  ]
})
export class SysosModalMonitorHelpModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-help',
      size: 'lg'
    });

  }
}

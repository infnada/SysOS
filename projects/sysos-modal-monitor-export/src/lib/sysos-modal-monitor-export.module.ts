import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatSliderModule, MatProgressBarModule} from "@angular/material";

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalMonitorExportComponent} from './sysos-modal-monitor-export.component';
import {EntryComponent} from "./monitor-export-entry/entry.component";

@NgModule({
  declarations: [
    SysosModalMonitorExportComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatProgressBarModule,
    NgbModalModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalMonitorExportComponent,
    EntryComponent
  ]
})
export class SysosModalMonitorExportModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-export',
      size: 'lg'
    });

  }
}

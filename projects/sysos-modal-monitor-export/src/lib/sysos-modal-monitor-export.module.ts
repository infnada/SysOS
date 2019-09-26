import {NgModule} from '@angular/core';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalMonitorExportComponent} from './sysos-modal-monitor-export.component';
import {EntryComponent} from "./monitor-export-entry/entry.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    SysosModalMonitorExportComponent,
    EntryComponent
  ],
  imports: [
    NgbModalModule,
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatProgressBarModule
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

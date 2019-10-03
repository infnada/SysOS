import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule, MatProgressBarModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatRadioModule} from '@angular/material';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalMonitorExportComponent} from './sysos-modal-monitor-export.component';
import {EntryComponent} from './monitor-export-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalMonitorExportComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
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

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalMonitorImportComponent} from './sysos-modal-monitor-import.component';
import {EntryComponent} from './monitor-import-entry/entry.component';


@NgModule({
  declarations: [
    SysosModalMonitorImportComponent,
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
    SysosModalMonitorImportComponent,
    EntryComponent
  ]
})
export class SysosModalMonitorImportModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-import',
      size: 'lg'
    });

  }
}

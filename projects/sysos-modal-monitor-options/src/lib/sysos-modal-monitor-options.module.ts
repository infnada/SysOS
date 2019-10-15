import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';
import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalMonitorOptionsComponent} from './sysos-modal-monitor-options.component';
import {EntryComponent} from './monitor-options-entry/entry.component';


@NgModule({
  declarations: [
    SysosModalMonitorOptionsComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    // Shared module import
    SysosLibAngularMaterialModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalMonitorOptionsComponent,
    EntryComponent
  ]
})
export class SysosModalMonitorOptionsModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-options',
      size: 'lg'
    });

  }
}

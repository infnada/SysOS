import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalMonitorOptionsComponent} from './anyopsos-modal-monitor-options.component';
import {EntryComponent} from './monitor-options-entry/entry.component';


@NgModule({
  declarations: [
    AnyOpsOSModalMonitorOptionsComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    AnyOpsOSModalMonitorOptionsComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalMonitorOptionsModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'monitor-options',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';
import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalMonitorHelpComponent} from './sysos-modal-monitor-help.component';
import {EntryComponent} from './monitor-export-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalMonitorHelpComponent,
    EntryComponent
  ],
  imports: [
    NgbModalModule,
    // Shared module import
    SysosLibAngularMaterialModule
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

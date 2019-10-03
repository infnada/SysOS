import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerNewAlarmDefinitionComponent} from './sysos-modal-infrastructure-manager-new-alarm-definition.component';
import {EntryComponent} from './infrastructure-manager-new-alarm-definition-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerNewAlarmDefinitionComponent,
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
    SysosModalInfrastructureManagerNewAlarmDefinitionComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerNewAlarmDefinitionModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-alarm-definition',
      size: 'lg'
    });

  }
}

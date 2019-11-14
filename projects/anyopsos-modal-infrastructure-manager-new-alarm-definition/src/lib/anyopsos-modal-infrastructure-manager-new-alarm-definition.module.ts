import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent} from './anyopsos-modal-infrastructure-manager-new-alarm-definition.component';
import {EntryComponent} from './infrastructure-manager-new-alarm-definition-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent,
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
    AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-new-alarm-definition',
      size: 'lg'
    });

  }
}

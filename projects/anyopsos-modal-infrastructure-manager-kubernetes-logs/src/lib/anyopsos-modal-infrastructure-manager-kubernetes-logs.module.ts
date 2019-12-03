import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibTerminalModule} from '@anyopsos/lib-terminal';

import {AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent} from './anyopsos-modal-infrastructure-manager-kubernetes-logs.component';
import {EntryComponent} from './infrastructure-manager-kubernetes-logs-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibTerminalModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerKubernetesLogsModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-kubernetes-logs',
      size: 'lg'
    });

  }
}

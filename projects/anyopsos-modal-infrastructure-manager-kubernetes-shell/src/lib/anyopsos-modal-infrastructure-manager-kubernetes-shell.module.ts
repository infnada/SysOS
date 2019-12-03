import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibTerminalModule} from '@anyopsos/lib-terminal';


import {AnyOpsOSModalInfrastructureManagerKubernetesShellComponent} from './anyopsos-modal-infrastructure-manager-kubernetes-shell.component';
import {EntryComponent} from './infrastructure-manager-kubernetes-shell-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerKubernetesShellComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibTerminalModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalInfrastructureManagerKubernetesShellComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerKubernetesShellModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-kubernetes-shell',
      size: 'lg'
    });

  }
}

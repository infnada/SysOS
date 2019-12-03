import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent} from './anyopsos-modal-infrastructure-manager-kubernetes-edit-resource.component';
import {EntryComponent} from './infrastructure-manager-kubernetes-edit-resource-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibUtilsModule
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerKubernetesEditResourceModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-kubernetes-edit-resource',
      size: 'lg'
    });

  }
}

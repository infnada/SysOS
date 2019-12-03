import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {EntryComponent} from './infrastructure-manager-kubernetes-scale-resource-entry/entry.component';
import {AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent} from './anyopsos-modal-infrastructure-manager-kubernetes-scale-resource.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule,
    // Shared module import
    AnyOpsOSLibUtilsModule,
    AnyOpsOSLibAngularMaterialModule,

  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerKubernetesScaleResourceModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-kubernetes-scale-resource',
      size: 'lg'
    });

  }
}

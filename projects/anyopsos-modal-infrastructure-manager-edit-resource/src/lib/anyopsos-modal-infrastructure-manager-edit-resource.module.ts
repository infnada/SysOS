import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibUtilsModule} from "@anyopsos/lib-utils";

import {AnyOpsOSModalInfrastructureManagerEditResourceComponent} from './anyopsos-modal-infrastructure-manager-edit-resource.component';
import {EntryComponent} from './infrastructure-manager-edit-resource-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerEditResourceComponent,
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
    AnyOpsOSModalInfrastructureManagerEditResourceComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerEditResourceModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-edit-resource',
      size: 'lg'
    });

  }
}

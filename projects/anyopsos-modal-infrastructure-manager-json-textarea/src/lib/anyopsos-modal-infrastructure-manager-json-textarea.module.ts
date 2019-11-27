import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {AnyOpsOSModalInfrastructureManagerJsonTextareaComponent} from './anyopsos-modal-infrastructure-manager-json-textarea.component';
import {EntryComponent} from './infrastructure-manager-json-textarea-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerJsonTextareaComponent,
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
    AnyOpsOSModalInfrastructureManagerJsonTextareaComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerJsonTextareaModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-json-textarea',
      size: 'lg'
    });

  }
}

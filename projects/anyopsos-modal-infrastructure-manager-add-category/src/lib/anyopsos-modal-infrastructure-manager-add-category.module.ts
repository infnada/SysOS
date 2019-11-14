import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerAddCategoryComponent} from './anyopsos-modal-infrastructure-manager-add-category.component';
import {EntryComponent} from './infrastructure-manager-add-category-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerAddCategoryComponent,
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
    AnyOpsOSModalInfrastructureManagerAddCategoryComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerAddCategoryModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-add-category',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerAddCategoryComponent} from './sysos-modal-infrastructure-manager-add-category.component';
import {EntryComponent} from './infrastructure-manager-add-category-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerAddCategoryComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerAddCategoryComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerAddCategoryModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-add-category',
      size: 'lg'
    });

  }
}

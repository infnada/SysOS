import {NgModule} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerEditCustomAttributesComponent} from './sysos-modal-infrastructure-manager-edit-custom-attributes.component';
import {EntryComponent} from './infrastructure-manager-edit-custom-attributes-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerEditCustomAttributesComponent,
    EntryComponent
  ],
  imports: [],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    SysosModalInfrastructureManagerEditCustomAttributesComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerEditCustomAttributesModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-edit-custom-attributes',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalDefaultPlainComponent} from './anyopsos-modal-default-plain.component';

@NgModule({
  declarations: [
    AnyOpsOSModalDefaultPlainComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalDefaultPlainComponent
  ]
})
export class AnyOpsOSModalDefaultPlainModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'plain',
      size: 'sm'
    });

  }

}

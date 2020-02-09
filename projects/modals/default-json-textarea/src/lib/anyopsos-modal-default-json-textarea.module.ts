import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalDefaultJsonTextareaComponent} from './anyopsos-modal-default-json-textarea.component';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

@NgModule({
  declarations: [
    AnyOpsOSModalDefaultJsonTextareaComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule,
    AnyOpsOSLibUtilsModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalDefaultJsonTextareaComponent
  ]
})
export class AnyOpsOSModalDefaultJsonTextareaModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'json-textarea',
      size: 'lg'
    });

  }

}

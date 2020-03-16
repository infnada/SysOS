import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalDefaultQuestionComponent} from './anyopsos-modal-default-question.component';

@NgModule({
  declarations: [
    AnyOpsOSModalDefaultQuestionComponent,
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
    AnyOpsOSModalDefaultQuestionComponent
  ]
})
export class AnyOpsOSModalDefaultQuestionModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'question',
      size: 'sm'
    });

  }

}

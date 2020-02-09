import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalDefaultInputComponent} from './anyopsos-modal-default-input.component';

@NgModule({
  declarations: [
    AnyOpsOSModalDefaultInputComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalDefaultInputComponent
  ]
})
export class AnyOpsOSModalDefaultInputModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'input',
      size: 'sm'
    });

  }

}

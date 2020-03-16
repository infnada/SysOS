import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibTerminalModule} from '@anyopsos/lib-terminal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalKubernetesLogsComponent} from './anyopsos-modal-kubernetes-logs.component';

@NgModule({
  declarations: [
    AnyOpsOSModalKubernetesLogsComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule,
    AnyOpsOSLibTerminalModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalKubernetesLogsComponent
  ]
})
export class AnyOpsOSModalKubernetesLogsModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'kubernetes-logs',
      size: 'lg'
    });

  }

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibTerminalModule} from '@anyopsos/lib-terminal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalKubernetesShellComponent} from './anyopsos-modal-kubernetes-shell.component';

@NgModule({
  declarations: [
    AnyOpsOSModalKubernetesShellComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule,
    AnyOpsOSLibTerminalModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalKubernetesShellComponent
  ]
})
export class AnyOpsOSModalKubernetesShellModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'kubernetes-shell',
      size: 'lg'
    });

  }

}

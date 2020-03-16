import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalKubernetesEditResourceComponent} from './anyopsos-modal-kubernetes-edit-resource.component';

@NgModule({
  declarations: [
    AnyOpsOSModalKubernetesEditResourceComponent,
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
    AnyOpsOSModalKubernetesEditResourceComponent
  ]
})
export class AnyOpsOSModalKubernetesEditResourceModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'kubernetes-edit-resource',
      size: 'lg'
    });

  }

}

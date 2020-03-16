import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalKubernetesScaleResourceComponent} from './anyopsos-modal-kubernetes-scale-resource.component';

@NgModule({
  declarations: [
    AnyOpsOSModalKubernetesScaleResourceComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule,
    AnyOpsOSLibUtilsModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalKubernetesScaleResourceComponent
  ]
})
export class AnyOpsOSModalKubernetesScaleResourceModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'kubernetes-scale-resource',
      size: 'lg'
    });

  }

}

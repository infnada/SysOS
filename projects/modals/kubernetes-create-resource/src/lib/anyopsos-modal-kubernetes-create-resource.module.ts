import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';

import {EntryComponent} from './entry/entry.component';
import {AnyOpsOSModalKubernetesCreateResourceComponent} from './anyopsos-modal-kubernetes-create-resource.component';
import {CreateFromFileComponent} from './components/create-from-file/create-from-file.component';
import {CreateFromFormComponent} from './components/create-from-form/create-from-form.component';
import {CreateFromInputComponent} from './components/create-from-input/create-from-input.component';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

@NgModule({
  declarations: [
    AnyOpsOSModalKubernetesCreateResourceComponent,
    EntryComponent,
    CreateFromFileComponent,
    CreateFromFormComponent,
    CreateFromInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule,
    AnyOpsOSLibUtilsModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AnyOpsOSModalKubernetesCreateResourceComponent
  ]
})
export class AnyOpsOSModalKubernetesCreateResourceModule {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: 'kubernetes-create-resource',
      size: 'lg'
    });

  }

}

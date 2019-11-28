import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialFileInputModule} from 'ngx-material-file-input';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent} from './anyopsos-modal-infrastructure-manager-kubernetes-create-resource.component';
import {EntryComponent} from './infrastructure-manager-kubernetes-create-resource-entry/entry.component';
import {CreateFromInputComponent} from './components/create-from-input/create-from-input.component';
import {CreateFromFileComponent} from './components/create-from-file/create-from-file.component';
import {CreateFromFormComponent} from './components/create-from-form/create-from-form.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent,
    EntryComponent,
    CreateFromInputComponent,
    CreateFromFileComponent,
    CreateFromFormComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibUtilsModule,
  ],
  exports: [],
  providers: [NgbActiveModal],
  entryComponents: [
    AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-kubernetes-create-resource',
      size: 'lg'
    });

  }
}

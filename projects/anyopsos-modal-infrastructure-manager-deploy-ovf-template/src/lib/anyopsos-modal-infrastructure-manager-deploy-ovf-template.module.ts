import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';

import {AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent} from './anyopsos-modal-infrastructure-manager-deploy-ovf-template.component';
import {EntryComponent} from './infrastructure-manager-deploy-ovf-template-entry/entry.component';

@NgModule({
  declarations: [
    AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent,
    EntryComponent
  ],
  imports: [
    NgbModalModule
  ],
  providers: [
    NgbActiveModal
  ],
  exports: [],
  entryComponents: [
    AnyOpsOSModalInfrastructureManagerDeployOvfTemplateComponent,
    EntryComponent
  ]
})
export class AnyOpsOSModalInfrastructureManagerDeployOvfTemplateModule {

  constructor(private Modal: AnyOpsOSLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-deploy-ovf-template',
      size: 'lg'
    });

  }
}

import {NgModule} from '@angular/core';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalInfrastructureManagerDeployOvfTemplateComponent} from './sysos-modal-infrastructure-manager-deploy-ovf-template.component';
import {EntryComponent} from './infrastructure-manager-deploy-ovf-template-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalInfrastructureManagerDeployOvfTemplateComponent,
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
    SysosModalInfrastructureManagerDeployOvfTemplateComponent,
    EntryComponent
  ]
})
export class SysosModalInfrastructureManagerDeployOvfTemplateModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'infrastructure-manager-deploy-ovf-template',
      size: 'lg'
    });

  }
}

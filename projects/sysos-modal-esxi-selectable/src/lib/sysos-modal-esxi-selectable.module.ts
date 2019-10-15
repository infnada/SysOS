import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';
import {SysosLibModalService} from '@sysos/lib-modal';

import {SysosModalEsxiSelectableComponent} from './sysos-modal-esxi-selectable.component';
import {EntryComponent} from './esxi-selectable-entry/entry.component';

@NgModule({
  declarations: [
    SysosModalEsxiSelectableComponent,
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    // Shared module import
    SysosLibAngularMaterialModule
  ],
  exports: [],
  providers: [
    NgbActiveModal
  ],
  entryComponents: [
    SysosModalEsxiSelectableComponent,
    EntryComponent
  ]
})
export class SysosModalEsxiSelectableModule {

  constructor(private Modal: SysosLibModalService) {

    Modal.registerModal({
      modalId: 'esxi-selectable',
      size: 'lg'
    });

  }

}

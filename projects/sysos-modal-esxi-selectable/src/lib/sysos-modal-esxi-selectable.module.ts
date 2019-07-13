import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatSelectModule, MatSlideToggleModule} from '@angular/material';

import {NgbModalModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
    MatSelectModule,
    MatSlideToggleModule
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

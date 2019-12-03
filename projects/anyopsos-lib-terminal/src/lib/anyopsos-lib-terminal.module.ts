import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {TerminalComponent} from './terminal.component';

@NgModule({
  declarations: [TerminalComponent],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibUtilsModule
  ],
  exports: [TerminalComponent]
})
export class AnyOpsOSLibTerminalModule {
}

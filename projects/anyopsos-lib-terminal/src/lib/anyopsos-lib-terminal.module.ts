import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TerminalComponent} from './components/terminal.component';

@NgModule({
  declarations: [TerminalComponent],
  imports: [
    CommonModule
  ],
  exports: [TerminalComponent]
})
export class AnyOpsOSLibTerminalModule {
}
